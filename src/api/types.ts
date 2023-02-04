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
  'Delino',
  'Exclusive',
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
  urlList: string[];
  updateNeeded: boolean;
  forceUpdate: boolean;
}
export interface ReportBranchBestSelling {
  quantity: number;
  restaurantID: number;
  title: string;
}
export interface RestPaymentReport {
  id: number;
  restaurantId: number;
  brandID: number;
  dateToShow: string;
  restaurantName: string;
  branchName: string;
  amount: number;
  total: number;
  onlinePayment: number;
  cashPayment: number;
  foodiranShare: number;
  wagePercentage: number;
  successful: boolean;
  tracking: string;
  remainedCashShare: number;
  conflictDeptor: number;
  conflictCreditor: number;
  isCustom: boolean;
  taxAmount: number;
  deliveryAmount: number;
  smartClubAmount: number;
  couponDiscountAmount: number;
  discountAmount: number;
  paymentDate: string;
  accountNumber: string;
  bankName: string;
  delinoTaxAmount: number;
  delinoTaxPercentage: number;
}
export interface CategoryItem {
  id: number;
  orderIndex: number;
  title: string;
  isEnable: boolean;
  isDeleted: boolean;
  submissionDate: string | null;
  modificationDate: string | null;
  restaurantId: number;
  foodItems: any;
  forRamadan: boolean;
}

export interface CategoryItemResponse extends CategoryItem {
  restaurantID: number;
}

export interface UpdateCategoryPayload {
  id: number;
  restaurantId: number;
  title: string;
  orderIndex: number;
  isEnable: boolean;
  isDeleted: boolean;
}

export interface UpdateCategorySuccess {
  id: number;
  orderIndex: number;
  title: string;
  isEnable: boolean;
  isDeleted: boolean;
  submissionDate: string | null;
  modificationDate: string | null;
  restaurantID: number;
  foodItems: any;
}
export interface FoodItem {
  id: number;
  title: string;
  price: number;
  breakfast: boolean;
  lunch: boolean;
  dinner: boolean;
  stock: boolean;
  ingredients: string | null;
  isFoodEnable: boolean;
  ssG_FoodCategoryID: number;
  image: string | null;
  orderIndex: number;
}

export interface FoodInfo {
  id: number;
  title: string | null;
  ssG_FoodItemName: string | null;
  ingredients: string | null;
  catID: number;
  categoryTitle: string;
  price: number;
  foodPackagingPrice: number | null;
  clientFoodItemID: number;
  d0: boolean;
  d1: boolean;
  d2: boolean;
  d3: boolean;
  d4: boolean;
  d5: boolean;
  d6: boolean;
  restId: number;
  image: string | null;
  isFoodEnable: boolean;
  stockInWeb: boolean;
  saleOnRamadan: boolean;
  orderIndex: number;
  saleInNoon: boolean;
  saleInNight: boolean;
  saleOnBreakfast: boolean;
  isTaxable: boolean;
  ssG_FoodCategoryID: number;
  needVerify: boolean;
}
export interface IUploadImage {
  imageUrl: string;
  successful: boolean;
}
