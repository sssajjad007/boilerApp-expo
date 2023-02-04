import React, { useRef } from 'react';
import { ButtonContainer, TopBarContainer } from './styles';
import { Container } from '../../../../styles';
import DraggableFlatList from 'react-native-draggable-flatlist';
import { debounced } from '../../../../utils';
import { sortFood } from '../../../../api/food';
import { FoodItem } from '../../../../api/types';
import { dispatch, RootState, useSelector } from '../../../../redux/store';
import FoodItemComponent from '../FoodItem';
import { Button } from '../../../../components/Button';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { setFoodList } from '../../../../redux/slices/menu';
import { useAppModals } from '../../../../components/AlertModal/hook';

const SUCCESS = 'تغییرات با موفقیت انجام شد!';
const FAILED = 'متاسفانه تغییرات انجام نشد!';

export default function EditModal() {
  const foodList = useSelector((state: RootState) => state.menu.foodList);
  const activeIndex = useSelector((state: RootState) => state.menu.currentCategory);
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const branchCode = useSelector((state: RootState) => state.branch.currentBranchId.branchCode);
  const sortData = useRef<FoodItem>();
  const modal = useAppModals();

  const openSuccessAlert = () => {
    modal.show('customModal', {
      title: '',
      description: SUCCESS,
      autoHide: true,
      buttons: [
        {
          onPress: () => {
            navigation.goBack();
          },
          title: 'متوجه شدم',
        },
      ],
    });
  };
  const openFailedAlert = () => {
    modal.show('customModal', {
      title: '',
      description: FAILED,
      autoHide: true,
      buttons: [
        {
          onPress: () => {
            navigation.goBack();
          },
          title: 'متوجه شدم',
        },
      ],
    });
  };
  const onDragEnd = ({ data }: { data: any }) => {
    console.log('done');
    let temp = [...foodList]; //deepCopy
    temp[activeIndex] = data;
    dispatch(setFoodList(temp));
    sortData.current = data;
  };
  const onSort = useRef(
    debounced(async (sortedFoodItems: FoodItem[], foodItems: FoodItem[]) => {
      try {
        await sortFood(foodItems, sortedFoodItems, branchCode);
        openSuccessAlert();
      } catch (e) {
        openFailedAlert();
      }
    })
  ).current;

  return (
    <Container>
      <TopBarContainer>
        <ButtonContainer>
          <Button
            mode="Filled"
            size="Small"
            onPress={() => {
              onSort(sortData.current, foodList[activeIndex]);
            }}>
            {'ذخیره'}
          </Button>
        </ButtonContainer>
        <ButtonContainer>
          <Button
            minWidth={100}
            mode="Text"
            size="Small"
            onPress={() => {
              navigation.goBack();
            }}>
            {'انصراف'}
          </Button>
        </ButtonContainer>
      </TopBarContainer>
      {foodList[activeIndex] && (
        <DraggableFlatList
          containerStyle={{ flex: 1 }}
          contentContainerStyle={{ paddingBottom: 24 }}
          onDragEnd={onDragEnd}
          style={{ paddingTop: 10 }}
          keyExtractor={(item: FoodItem) => `draggable-item-${item.id}`}
          //@ts-ignore
          data={foodList[activeIndex]}
          renderItem={({ item, drag, getIndex, isActive }) => {
            return <FoodItemComponent onDrag={drag} isDragActive={isActive} data={item} editMode={true} />;
          }}
        />
      )}
    </Container>
  );
}
