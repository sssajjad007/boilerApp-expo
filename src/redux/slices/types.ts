import { BranchItemResponse, ReportBranchChartData, ReportBranchSell } from '../../api/types';

export interface IUserSlice {
  isInitialized?: boolean;
  isAuthenticated: boolean;
  refreshTokenFailed: boolean;
}
export type ISalesProp = {
  data: ReportBranchSell;
  error?: string;
};
export type ISalesPropDelino = {
  data: ReportBranchSell;
  error?: string;
};
export type ISalesPropVendo = {
  data: ReportBranchSell;
  error?: string;
};

export enum IReportTypeList {
  'Delino',
  'Exclusive',
}

export type IChartData = {
  chartData: ReportBranchChartData;
  error?: string;
};
export type DateRange = {
  startingDay: string;
  endingDay: string;
};
export type IBranchCode = {
  data: number[];
};
export type IBranchList = {
  data: BranchItemResponse[];
};
