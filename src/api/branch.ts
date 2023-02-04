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
