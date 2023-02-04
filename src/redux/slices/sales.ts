import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import moment from 'moment-jalaali';
import { getReportBranchBestSelling, getReportBranchSell, getSellReportChart } from '../../api/sales';
import {
  ReportBranchBestSelling,
  ReportBranchChartData,
  ReportBranchSell,
  ReportBranchSellResponse,
} from '../../api/types';
import { dateFormatted } from '../../utils';
import { dispatch } from '../store';
import type { DateRange, IReportTypeList } from './types';
const today = dateFormatted();
type ICalendarButton = 'today' | '' | 'week' | 'month' | 'year' | 'custom';
type State = {
  reportProductError: string;
  reportProductData: ReportBranchBestSelling[];
  data: ReportBranchSell;
  dateRange: DateRange;
  reportType: keyof typeof IReportTypeList;
  totalFoods: number;
  topSixFoods: ReportBranchBestSelling[];
  reportProductLoading: boolean;
  calendarButton: ICalendarButton;
};

const initialState: State = {
  reportProductError: '',
  topSixFoods: [],
  totalFoods: 0,
  reportProductData: [],
  reportType: 'Delino',
  reportProductLoading: false,
  calendarButton: 'today',
  //today data
  data: {
    onlinePay: {
      count: 0,
      sum: 0,
    },
    cashPay: {
      count: 0,
      sum: 0,
    },
    totalTransactionSum: 0,
    totalDiscount: 0,
    totalFoodiranShare: 0,
    totalPayToBranch: 0,
  },
  dateRange: { startingDay: today, endingDay: today },
};

const salesSlice = createSlice({
  name: 'sales',
  initialState,
  reducers: {
    setDateRange(state, action: PayloadAction<DateRange>) {
      state.dateRange = action.payload;
    },
    setReportType(state, action: PayloadAction<keyof typeof IReportTypeList>) {
      state.reportType = action.payload;
    },
    setReportProductData(state, action: PayloadAction<ReportBranchBestSelling[]>) {
      state.reportProductData = action.payload;
    },
    setTotalFoods(state, action: PayloadAction<number>) {
      state.totalFoods = action.payload;
    },
    setTopSixFoods(state, action: PayloadAction<ReportBranchBestSelling[]>) {
      state.topSixFoods = action.payload;
    },
    setReportProductLoading(state, action: PayloadAction<boolean>) {
      state.reportProductLoading = action.payload;
    },
    setReportProductError(state, action: PayloadAction<string>) {
      state.reportProductError = action.payload;
    },
    setCalendarButton(state, action: PayloadAction<ICalendarButton>) {
      state.calendarButton = action.payload;
    },
    setClearSalesSlice: () => initialState,
  },
});
export default salesSlice.reducer;
export const { setDateRange, setReportType, setClearSalesSlice, setCalendarButton } = salesSlice.actions;
export function getReportProductData({
  fromDate,
  toDate,
  branchId,
  reportType,
}: {
  fromDate: string;
  toDate: string;
  branchId?: number;
  reportType: keyof typeof IReportTypeList;
}) {
  return async () => {
    function reportTypeConverter() {
      if (reportType === 'Delino') {
        return 1;
      }
      if (reportType === 'Exclusive') {
        return 2;
      }
      return 0;
    }

    dispatch(salesSlice.actions.setReportProductLoading(true));
    const { data, error } = await getReportBranchBestSelling(fromDate, toDate, branchId, reportTypeConverter());
    let total: number = 0;
    if (data) {
      dispatch(salesSlice.actions.setReportProductData(data));
      const filtered = data.slice(0, 6);
      dispatch(salesSlice.actions.setTopSixFoods(filtered));
      dispatch(salesSlice.actions.setReportProductLoading(false));
      for (let index = 0; index < data.length; index++) {
        const element = data[index];
        total += element.quantity;
      }
      dispatch(salesSlice.actions.setTotalFoods(total));
      return;
    }
    if (error) {
      dispatch(salesSlice.actions.setReportProductData([]));
      dispatch(salesSlice.actions.setReportProductError(error));
      dispatch(salesSlice.actions.setReportProductLoading(false));
      return;
    }
  };
}

export async function getChartData({
  fromDate,
  toDate,
  branchId,
}: {
  fromDate: string;
  toDate: string;
  branchId?: number;
}) {
  const { data, error } = await getSellReportChart(fromDate, toDate, branchId);
  let chartData: ReportBranchChartData = { x: [], y: [], label: [] };

  if (data) {
    for (const day = moment(fromDate); day.isSameOrBefore(moment(toDate)); day.add(1, 'd')) {
      const found = data.find((r) => moment(r.dateTime).isSame(day));
      const item = day.format('dddd jD jMMMM jYYYY');
      chartData.x.push(item.charAt(0));
      chartData.y.push(found?.quantity || 0);
      chartData.label.push(item);
    }
    return { chartData, error: '' };
  } else {
    return { chartData: { x: [], y: [], label: [] }, error };
  }
}
export async function getSalesReport({
  fromDate,
  toDate,
  branchId,
}: {
  fromDate: string;
  toDate: string;
  branchId?: number;
}) {
  let resDelinoResult: ReportBranchSell;
  let resVendoResult: ReportBranchSell;
  const resDelino = await getReportBranchSell(fromDate, toDate, 'Delino', branchId);
  const resVendo = await getReportBranchSell(fromDate, toDate, 'Exclusive', branchId);
  if (resDelino.data && resVendo.data) {
    resDelinoResult = transactionCal(resDelino.data);
    resVendoResult = transactionCal(resVendo.data);

    const data: ReportBranchSell = {
      onlinePay: {
        count: resDelinoResult.onlinePay.count + resVendoResult.onlinePay.count,
        sum: resDelinoResult.onlinePay.sum + resVendoResult.onlinePay.sum,
      },
      cashPay: {
        count: resDelinoResult.cashPay.count + resVendoResult.cashPay.count,
        sum: resDelinoResult.cashPay.sum + resVendoResult.cashPay.sum,
      },
      totalTransactionSum: resDelinoResult.totalTransactionSum + resVendoResult.totalTransactionSum,
      //unused values in report
      totalDiscount: resDelinoResult.totalDiscount + resVendoResult.totalDiscount,
      totalFoodiranShare: resDelinoResult.totalFoodiranShare + resVendoResult.totalFoodiranShare,
      totalPayToBranch: resDelinoResult.totalPayToBranch + resVendoResult.totalPayToBranch,
    };
    return { data };
  } else {
    return { error: resVendo.error || resVendo.error };
  }
}
export async function getSalesReportType({
  fromDate,
  toDate,
  branchId,
  reportType,
}: {
  fromDate: string;
  toDate: string;
  branchId?: number;
  reportType: keyof typeof IReportTypeList;
}) {
  const { data, error } = await getReportBranchSell(fromDate, toDate, reportType, branchId);
  if (data) {
    const result = transactionCal(data);
    const reportData: ReportBranchSell = {
      onlinePay: {
        count: result.onlinePay.count,
        sum: result.onlinePay.sum,
      },
      cashPay: {
        count: result.cashPay.count,
        sum: result.cashPay.sum,
      },
      totalTransactionSum: result.totalTransactionSum,
      //unused values in report
      totalDiscount: result.totalDiscount,
      totalFoodiranShare: result.totalFoodiranShare,
      totalPayToBranch: result.totalPayToBranch,
    };
    return { reportData };
  } else {
    return { error };
  }
}

function transactionCal(data: ReportBranchSellResponse) {
  const result: ReportBranchSell = {
    totalTransactionSum: data.totalTransactionSum,
    totalDiscount: data.totalDiscount,
    totalFoodiranShare: data.totalFoodiranShare,
    totalPayToBranch: data.totalTransactionSum - data.totalFoodiranShare - data.totalDiscount,
    onlinePay: {
      count: 0,
      sum: 0,
    },
    cashPay: {
      count: 0,
      sum: 0,
    },
  };
  data.restaurantSellListViewModelDetailList.forEach((item) => {
    if (item.payMethod.name.indexOf('اینترنتی') !== -1) {
      result.onlinePay = {
        count: item.onlinePaymentCount,
        sum: item.transactionSum,
      };
    } else if (item.payMethod.name.indexOf('نقدی') !== -1) {
      result.cashPay = {
        count: item.cashPaymentCount,
        sum: item.transactionSum,
      };
    }
  });
  return result;
}
