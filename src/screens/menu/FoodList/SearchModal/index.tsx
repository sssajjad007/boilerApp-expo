import { Keyboard, TextInput, View } from 'react-native';
import React, { useEffect, useRef, useState, useMemo } from 'react';
import { CancelButton, InputContainer, TopBarContainer } from './styles';
import { BodyLarge, CenterView, Container, LoadingIndicatorPrimary } from '../../../../styles';
import { Button } from '../../../../components/Button';
import { Controller, useForm } from 'react-hook-form';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootState, useSelector } from '../../../../redux/store';
import Fuse from 'fuse.js';
import { debounce } from 'lodash';
import { FlashList } from '@shopify/flash-list';
import FoodItemComponent from '../FoodItem';
import { FoodItem } from '../../../../api/types';
import { SearchBar } from '../../../../components/Search';

type FormValues = {
  search: string;
};
export default function SearchModal() {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const timer = useRef<number>(0);
  const searchRef = useRef<TextInput>(null);
  const foodList = useSelector((state: RootState) => state.menu.foods);
  const [state, setState] = useState<{ query: string; list: FoodItem[] | null; loading: boolean }>({
    query: '',
    list: null,
    loading: false,
  });

  const methods = useForm<FormValues>({
    defaultValues: {
      search: '',
    },
  });
  const { control, getValues } = methods;

  useEffect(() => {
    searchRef.current?.focus();
    return () => {
      clearTimeout(timer.current);
      Keyboard.dismiss();
    };
  }, []);

  //The onChangeFood function is then defined, which clears the timeout and sets a new timeout for the searchFood function after 600ms.
  const onChangeFood = () => {
    clearTimeout(timer.current);
    timer.current = setTimeout(searchFood(), 600);
  };
  //The searchFood function is then defined, which retrieves the search query from the form and passes it to the onSearchHandler function.
  const searchFood = () => () => {
    let list: any[] = [];
    const query = getValues('search');
    if (query) {
      setState((s: any) => ({ ...s, loading: true }));
      onSearchHandler(query);
    }
  };

  //The setClear function is then defined, which resets the state when the clear button is pressed.
  const setClear = () => {
    //get clearbutton ref from input
    setState({ query: '', list: [], loading: false });
  };
  //The onSearchHandler function is then defined using the useMemo hook, which debounces the function and performs the search using the Fuse library.
  //It then sets the state with the search results.
  const onSearchHandler = useMemo(
    () =>
      debounce((query: string) => {
        const fuse = new Fuse(foodList, {
          keys: ['title', 'ingredient'],
          minMatchCharLength: 3,
        });
        fuse.setCollection(foodList);
        const result: any = fuse.search(query);
        const list: any[] = [];
        for (let index = 0; index < result.length; index++) {
          const { item, matches, score, refIndex } = result[index];
          list.push(item);
        }
        setState((s: any) => ({ ...s, list, loading: false }));
      }, 250),
    []
  );
  function renderData() {
    if (state.list?.length === 0) {
      return (
        <CenterView>
          <BodyLarge>{'موردی یافت نشد'}</BodyLarge>
        </CenterView>
      );
    }
    if (state.loading) {
      return <LoadingIndicatorPrimary />;
    }
    return (
      <FlashList
        keyExtractor={(item: FoodItem) => `d${item.id}`}
        data={state.list}
        estimatedItemSize={64}
        renderItem={({ item }) => {
          return <FoodItemComponent data={item} />;
        }}
      />
    );
  }

  return (
    <Container>
      <TopBarContainer>
        <InputContainer>
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <SearchBar
                ref={searchRef}
                onBlur={onBlur}
                onChangeText={(text) => {
                  onChange(text);
                  onChangeFood();
                }}
                value={value}
                onClear={setClear}
              />
            )}
            name="search"
          />
        </InputContainer>
        <CancelButton>
          <Button
            mode="Text"
            size="Small"
            onPress={() => {
              navigation.goBack();
            }}>
            {'انصراف'}
          </Button>
        </CancelButton>
      </TopBarContainer>
      <View style={{ flex: 1 }}>{renderData()}</View>
    </Container>
  );
}
