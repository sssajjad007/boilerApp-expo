import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getCategoryList } from '../../api/category';
import { getFoodList } from '../../api/food';
import { CategoryItem, FoodItem } from '../../api/types';
import { dispatch } from '../store';

type State = {
  category: CategoryItem[];
  currentCategory: number;
  foodList: FoodItem[];
  foods: any;
};
const initialState: State = {
  category: [],
  currentCategory: 0,
  foodList: [],
  foods: [],
};
const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {
    setCategory(state, action: PayloadAction<CategoryItem[]>) {
      state.category = action.payload;
    },
    setCurrentCategory(state, action: PayloadAction<number>) {
      state.currentCategory = action.payload;
    },
    setFoodList(state, action: PayloadAction<FoodItem[]>) {
      state.foodList = action.payload;
    },
    setFoods(state, action: PayloadAction<FoodItem[]>) {
      state.foods = action.payload;
    },
    setFoodsUpdate(state, action: PayloadAction<{ id: number; imageUrl: string }>) {
      const { id, imageUrl } = action.payload;
      const index = state.foods.findIndex((item: FoodItem) => item.id === id);
      if (index !== -1) {
        state.foods[index].image = imageUrl;
      }
    },

    setClearBranchSlice: () => initialState,
  },
});
export default categorySlice.reducer;
export const { setCategory, setClearBranchSlice, setCurrentCategory, setFoodList, setFoods, setFoodsUpdate } =
  categorySlice.actions;

export async function getCategoryListData(branchId: number, branchCode: number) {
  const data = await getCategoryList(branchId, branchCode);
  // dispatch(setCurrentCategory(data[0].id));
  dispatch(setCategory(data));
  if (data) {
    return data;
  }
}

export async function getFoodListData(branchId: number) {
  const data = await getFoodList(branchId);
  if (data) {
    dispatch(setFoods(data));
    return { success: true };
  }
  return { success: false };
}
