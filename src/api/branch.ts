import { apiAuth } from './index';
import { BranchItemResponse } from './types';

export const getBranchList = async () => {
  try {
    const { data } = await apiAuth.get<BranchItemResponse[]>('restaurant/getRestaurantList');
    return { data };
  } catch (e) {
    return { error: 'درخواست با خطا مواجه شد' };
  }
};

export const getBranchCodeList = async () => {
  try {
    const { data } = await apiAuth.get<number[]>('restaurant/getRestaurantIdBranchCodeList');
    return { data };
  } catch (e) {
    return { error: 'درخواست با خطا مواجه شد' };
  }
};
