import React, { useEffect, useState, useRef } from 'react';
import { RootContainer } from '../../../components/Container';
import { LoadingIndicatorPrimary, RefreshLoading } from '../../../styles';
import { FlatList, View } from 'react-native';
import { dispatch, RootState, useSelector } from '../../../redux/store';
import CategoryList from './CategoryList';
import type { CategoryItem, FoodItem as FoodItemType } from '../../../api/types';
import shareData from './shareData';
import { FlashList } from '@shopify/flash-list';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { getFoodListData, setCurrentCategory, setFoodList } from '../../../redux/slices/menu';
import FoodItemComponent from './FoodItem';
import EmptyState from '../../../components/EmptyState';

const GET_DATA_ERROR = 'دریافت اطلاعات با خطا مواجه شد';

export default function FoodList() {
  const branchId = useSelector((state: RootState) => state.branch.currentBranchId.id);
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const foodList = useSelector((state: RootState) => state.menu.foods);
  const [error, setError] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  async function fetchData() {
    setLoading(true);
    const { success } = await getFoodListData(branchId);
    if (success) {
      setError(false);
    } else {
      setError(true);
    }
    // better user experience
    setTimeout(() => {
      setLoading(false);
    }, 50);
    return success;
  }
  useEffect(() => {
    fetchData();
  }, [branchId]);

  if (error) {
    return <EmptyState image="network" message={GET_DATA_ERROR} onPress={fetchData} />;
  }

  return (
    <RootContainer
      isSearchIcon
      isBackIcon
      branchListAction
      isEditIcon
      loading={loading}
      onSearchPress={() => {
        navigation.push('SearchModal');
      }}
      onEditPress={() => {
        navigation.push('EditModal');
      }}>
      <View style={{ height: 60 }}>
        <CategoryList />
      </View>
      <FoodItemList foodList={foodList} branchId={branchId} />
    </RootContainer>
  );
}

function FoodItemList({ foodList, branchId }: { foodList: any; branchId: number }) {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const categories = useSelector((state: RootState) => state.menu.category);
  const categoriesList = useRef<number[]>([-1]);
  const [list, setList] = useState<FoodItemType[]>([]);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  useEffect(() => {
    categoriesList.current = categories.map((item: CategoryItem) => item.id);
    return () => {
      categoriesList.current = [-1];
    };
  }, [categories, branchId]);

  useEffect(() => {
    if (categoriesList.current) {
      const temp: FoodItemType[] = [];
      for (let i = 0; i < categoriesList.current.length; i++) {
        temp.push(foodList.filter((item: any) => item.ssG_FoodCategoryID === categoriesList.current[i]));
      }
      setList(temp);
      dispatch(setFoodList(temp));
    }
    return () => {
      setList([]);
    };
  }, [foodList, categories, branchId]);

  useEffect(() => {
    shareData.categoryId.activateId = (index) => {
      setActiveIndex(index);
      dispatch(setCurrentCategory(index));
    };
    // return () => {
    //   shareData.category.activated = () => {};
    // };
  }, []);
  const refresh = async () => {
    setIsRefreshing(true);
    const { success } = await getFoodListData(branchId);
    setIsRefreshing(false);
  };
  return (
    <View style={{ flex: 1 }}>
      {list[activeIndex] ? (
        <FlashList
          keyExtractor={(item: FoodItemType) => `${item.id}`}
          //@ts-ignore
          data={list[activeIndex]}
          refreshControl={<RefreshLoading refreshing={isRefreshing} onRefresh={refresh} />}
          estimatedItemSize={64}
          renderItem={({ item }) => {
            return <FoodItemComponent data={item} />;
          }}
        />
      ) : (
        <LoadingIndicatorPrimary />
      )}
    </View>
  );
}
