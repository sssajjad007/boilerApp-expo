import { apiAuth } from './index';
import { CategoryItem, CategoryItemResponse, UpdateCategorySuccess } from './types';

export const getCategoryList = async (branchId: number, branchCode: number): Promise<CategoryItem[]> => {
  try {
    const { data } = await apiAuth.get<CategoryItemResponse[] | ''>(`foodCategory/fullList/${branchId}/${branchCode}`);
    return data !== ''
      ? data.map((d) => ({ ...d, restaurantId: d.restaurantID })).sort((a, b) => a.orderIndex - b.orderIndex)
      : [];
  } catch (e) {
    throw e;
  }
};

export const updateCategory = async (branchCode: number, payload: CategoryItem) => {
  try {
    const { data } = await apiAuth.put<UpdateCategorySuccess>(`foodCategory/${branchCode}`, payload);
    return data;
  } catch (e) {
    throw e;
  }
};

export const sortCategory = async (ids: number[], branchCode: number) => {
  try {
    const { data } = await apiAuth.put<any>(`foodCategory/sort/${branchCode}`, {
      orderedIdList: ids.map((id, index) => ({ id, orderIndex: index + 1 })),
    });
    return data;
  } catch (e) {
    throw e;
  }
};
