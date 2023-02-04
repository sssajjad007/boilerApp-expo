import { multiSort } from '../utils/helper';
import { apiAuth } from './index';
import { FoodInfo, FoodItem, IUploadImage } from './types';

export const getFoodList = async (branchId: number) => {
  try {
    const { data } = await apiAuth.get<FoodItem[] | ''>(`foodItems/list/${branchId}`);
    return data !== ''
      ? multiSort(
          data.map((d) => ({ ...d, orderIndex: d.orderIndex || 0 })),
          ['ssG_FoodCategoryID', 'orderIndex', 'id'],
          false
        )
      : [];
  } catch (e) {
    throw e;
  }
};

export const getFood = async (id: number, branch: number) => {
  try {
    const { data } = await apiAuth.get<FoodInfo>(`foodItems/getItemViewById/${id}/${branch}`);
    return data;
  } catch (e) {
    throw e;
  }
};

export const sortFood = async (foods: FoodItem[], sortedFoods: FoodItem[], branchCode: number) => {
  const sortedCatId = sortedFoods[0].ssG_FoodCategoryID;
  const filteredFoods = foods.filter((f: FoodItem) => f.ssG_FoodCategoryID !== sortedCatId);
  const mergeFoodItems = [...filteredFoods, ...sortedFoods];
  const orderedIdList = mergeFoodItems.map((f: FoodItem, index: number) => ({
    id: f.id,
    orderIndex: index + 1,
    // catId: f.catID,
  }));

  try {
    const { data } = await apiAuth.put<any>(`foodItems/sort/${branchCode}`, { orderedIdList });
    return data;
  } catch (e) {
    throw e;
  }
};

export const uploadImage = async (id: number, imageData: string) => {
  try {
    const { data } = await apiAuth.post<IUploadImage>(
      'foodItems/uploadImage',
      { id, imageData, type: 'fooditem' },
      { timeout: 60000 }
    );
    return { success: data.successful, imageUrl: data.imageUrl };
  } catch (e) {
    console.log(e);
    throw e;
  }
};

export const deleteImage = async (id: number, branchCode: number) => {
  try {
    const { data } = await apiAuth.delete<any>(`foodItems/deleteImage?branchCode=${branchCode}&foodItemId=${id}`);
    return data;
  } catch (e) {
    throw e;
  }
};

// export const updateFood = async (payload: FoodInfo, branchCode: number) => {
//   try {
//     delete payload.image;
//     const { data } = await apiAuth.put<any>(`foodItems/${branchCode}`, payload);
//     return data;
//   } catch (e) {
//     throw e;
//   }
// };
