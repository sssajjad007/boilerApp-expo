import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getBranchCodeList, getBranchList } from '../../api/branch';
import { BranchItemResponse } from '../../api/types';
import { dispatch } from '../store';
import { userLoginSuccess } from './user';

type State = {
  branchCode: number[];
  branchList: BranchItemResponse[];
  errorMsg: string;
  currentBranchId: BranchItemResponse;
};
type IBranchCode = {
  data: number[];
};
type IBranchList = {
  data: BranchItemResponse[];
};
const initialState: State = {
  branchCode: [],
  branchList: [],
  errorMsg: '',
  currentBranchId: {
    id: -1,
    branchCode: -1,
    branchName: null,
    userFullName: null,
    restaurantName: null,
    restaurantTitle: null,
    imageLink: null,
    currentDate: null,
    adminEnableOrdering: false,
    showInFoodiran: false,
    hasCustomizedEngine: false,
  },
};
const branchSlice = createSlice({
  name: 'branch',
  initialState,
  reducers: {
    setBranchCode(state, action: PayloadAction<IBranchCode>) {
      state.branchCode = action.payload.data;
    },
    setBranchList(state, action: PayloadAction<IBranchList>) {
      state.branchList = action.payload.data;
    },
    setErrorMsg(state, action: PayloadAction<string>) {
      state.errorMsg = action.payload;
    },
    setCurrentBranchId(state, action: PayloadAction<BranchItemResponse>) {
      state.currentBranchId = action.payload;
    },
  },
});
export default branchSlice.reducer;
export const { setCurrentBranchId } = branchSlice.actions;

export async function getBranchCode() {
  const { data, error } = await getBranchCodeList();
  if (data) {
    dispatch(branchSlice.actions.setBranchCode({ data }));
    return { success: true };
  } else {
    dispatch(branchSlice.actions.setErrorMsg(error));
    return { success: false };
  }
}
export async function getBranches(callback: (arg: any) => void = () => {}) {
  const { data, error } = await getBranchList();
  if (data) {
    dispatch(userLoginSuccess());
    dispatch(branchSlice.actions.setBranchList({ data }));
    dispatch(branchSlice.actions.setCurrentBranchId(data[0]));
  } else {
    dispatch(branchSlice.actions.setErrorMsg(error));
  }
  callback(data);
}
