import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getBranchList } from '../../api/branch';
import { BranchItemResponse } from '../../api/types';
import { has, retrieve } from '../../core/mmkv';
import { dispatch } from '../store';
import { setReportType } from './sales';
import { IBranchCode, IBranchList } from './types';
import { userLoginSuccess } from './user';

type State = {
  branchCode: number[];
  branchList: BranchItemResponse[] | null;
  errorMsg: string;
  currentBranchId: BranchItemResponse;
};

const initialState: State = {
  branchCode: [],
  branchList: null,
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
    setCurrentBranch(state, action: PayloadAction<BranchItemResponse>) {
      state.currentBranchId = action.payload;
    },
    setClearBranchSlice: () => initialState,
  },
});
export default branchSlice.reducer;
export const { setCurrentBranch, setClearBranchSlice } = branchSlice.actions;

export async function getBranches(callback: (arg: any) => void = () => {}) {
  const { data, error } = await getBranchList();
  if (data) {
    dispatch(branchSlice.actions.setBranchList({ data }));
    if (has('currentBranchId')) {
      const currentBranch = retrieve('currentBranchId', 'number');
      const currentBranchData = data.find((item) => item.id === currentBranch);
      if (currentBranchData) {
        dispatch(branchSlice.actions.setCurrentBranch(currentBranchData));
      }
    } else {
      dispatch(branchSlice.actions.setCurrentBranch(data[0]));
    }
    dispatch(setReportType(data[0].showInFoodiran ? 'Delino' : 'Exclusive'));
  } else {
    dispatch(branchSlice.actions.setErrorMsg(error));
  }
  callback(data);
}
