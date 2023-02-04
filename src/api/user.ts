import { api, apiAuth, authParams } from './index';
import { CreateToken } from './types';

export const userLogin = async (username: string, password: string) => {
  try {
    const { data } = await api.post<CreateToken>('token/CreateToken', {
      ...authParams,
      username,
      password,
    });
    return data;
  } catch (e: any) {
    let errText = 'خطایی رخ داده است';
    if (e.response.status === 412) {
      return { errorMessage: 'نام کاربری یا رمز عبور صحیح نیست ' };
    }
    throw errText;
  }
};
export const userTempToken = async () => {
  try {
    const { data } = await apiAuth.post('user/loginToken');
    return data.token;
  } catch (e) {
    return { error: 'درخواست با خطا مواجه شد' };
  }
};

export const getUserProfile = async () => {
  const result = { success: true, message: '' };
  try {
    const { data } = await apiAuth.get<number[]>('restaurant/getRestaurantIdBranchCodeList');
    if (!data) {
      result.success = false;
      result.message = 'یوزر یافت نشد!';
    }
  } catch (e) {
    result.success = false;
    result.message = 'درخواست با خطا مواجه شد';
  }
  return result;
};
