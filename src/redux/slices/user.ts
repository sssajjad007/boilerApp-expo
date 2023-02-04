import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { removeAuth, setAuth } from '../../api';
import { userLogin } from '../../api/user';
import { getUserProfile } from '../../api/user';
import { CreateToken } from '../../api/types';
import { remove, retrieve } from '../../core/mmkv';
import { dispatch } from '../store';
import { getBranches, setClearBranchSlice } from './branch';
import { setClearSalesSlice } from './sales';
import { IUserSlice } from './types';

const initialState: IUserSlice = {
  isInitialized: false,
  isAuthenticated: false,
  refreshTokenFailed: false,
};
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    userLoginSuccess(state: IUserSlice, action: PayloadAction<boolean>) {
      state.isInitialized = true;
      if (action.payload) {
        console.log('userLogin success');
        state.isAuthenticated = true;
      }
    },
    setUserData(state, action: PayloadAction<null>) {
      state.isInitialized = true;
    },
    failRefreshTokenAction(state, action: PayloadAction<boolean>) {
      state.refreshTokenFailed = action.payload;
    },
    userLogout(state: IUserSlice) {
      state.isAuthenticated = false;
    },
  },
});
export default authSlice.reducer;
export const { userLoginSuccess, setUserData, failRefreshTokenAction } = authSlice.actions;
//////////////////////////////////////////////////
export async function userInit(callback: (arg: any) => void) {
  const token = retrieve('token', 'string');
  const refreshToken = retrieve('refreshToken', 'string');
  let data: boolean = false;

  if (refreshToken && token) {
    setAuth({ refreshToken, token }, false);
    const { success } = await getUserProfile();
    if (success) {
      data = true;
    }
  }
  dispatch(userLoginSuccess(data));
  callback(data);
}

export const login = async (username: string, password: string) => {
  const response = await userLogin(username, password);
  const { branchCodeList, errorMessage, refreshToken, token } = response as CreateToken;
  if (token) {
    setAuth({ token, refreshToken });
    await getBranches();
    dispatch(userLoginSuccess(!!token));
    return { success: true, errorMessage };
  }
  return { success: false, errorMessage };
};

export function _Logout() {
  return async () => {
    removeAuth();
    remove('currentBranchId');
    dispatch(authSlice.actions.userLogout());
    dispatch(setClearBranchSlice());
    dispatch(setClearSalesSlice());
  };
}
