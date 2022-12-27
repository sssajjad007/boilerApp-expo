export interface CreateToken {
  token: string;
  refreshToken: string;
  branchCodeList: number[];
  errorMessage: string;
}
export type ReportBranchSellDetails = {
  payMethod: {
    id: number;
    code: null;
    name: string; // ex: پرداخت اینترنتی | پرداخت نقدی به پیک
  };
  onlinePaymentCount: number;
  cashPaymentCount: number;
  transactionSum: number;
};

export interface ReportBranchSellResponse {
  restaurantSellListViewModelDetailList: ReportBranchSellDetails[];
  totalTransactionSum: number;
  totalDiscount: number;
  totalFoodiranShare: number;
}

export interface ReportBranchSell {
  onlinePay: {
    count: number;
    sum: number;
  };
  cashPay: {
    count: number;
    sum: number;
  };
  totalTransactionSum: number;
  totalDiscount: number;
  totalFoodiranShare: number;
  totalPayToBranch: number;
}

export interface ReportBranchBestSelling {
  quantity: number;
  restaurantID: number;
  title: string;
}
export interface ReportBranchDaySell {
  quantity: number;
  dateTime: string;
  persianDate: string;
}

export type ReportBranchChartData = {
  x: string[];
  y: number[];
  label: string[];
};

export enum ReportTypeList {
  'Delino' = 'Delino',
  'Exclusive' = 'Exclusive',
}
export interface BranchItemResponse {
  id: number;
  branchCode: number;
  branchName: string | null;
  userFullName: string | null;
  restaurantName: string | null;
  restaurantTitle: string | null;
  imageLink: string | null;
  currentDate: string | null;
  adminEnableOrdering: boolean;
  showInFoodiran: boolean;
  hasCustomizedEngine: boolean;
}

export interface BranchItem {
  id: number;
  code: number;
  name: string | null;
  owner: string | null;
  logo: string | null;
  restaurantName: string | null;
  restaurantType: string | null;
  isEnabled: boolean;
  hasDelino: boolean;
  hasExclusive: boolean;
}
export interface Version {
  version: string;
  urlList: any | null;
  updateNeeded: boolean;
  forceUpdate: boolean;
}
