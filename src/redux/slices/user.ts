import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { removeAuth, setAuth } from '../../api';
import { userLogin } from '../../api/auth';
import { CreateToken } from '../../api/types';
import { dispatch } from '../store';
import { getBranches } from './branch';
import { IUserSlice } from './types';

const initialState: IUserSlice = {
  isInitialized: false,
  isAuthenticated: false,
};
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    userLoginSuccess(state: IUserSlice) {
      state.isAuthenticated = true;
    },
    setUserData(state, action: PayloadAction<IUserSlice>) {},
    userLogout(state: IUserSlice) {
      removeAuth();
      // need remove sales data
      state.isAuthenticated = false;
    },
  },
});
export default authSlice.reducer;
export const { userLoginSuccess, setUserData, userLogout } = authSlice.actions;
//////////////////////////////////////////////////
export const login = async (username: string, password: string) => {
  const response = await userLogin(username, password);
  const { branchCodeList, errorMessage, refreshToken, token } = response as CreateToken;
  if (token) {
    setAuth({ token, refreshToken });
    await getBranches();
    dispatch(authSlice.actions.userLoginSuccess());

    return { success: true, response };
  }
  return { success: false, errorMessage };
};
