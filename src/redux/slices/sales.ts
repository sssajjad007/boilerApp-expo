import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import moment from 'moment-jalaali';
import { getReportBranchSell, getSellReportChart } from '../../api/sales';
import { ReportBranchChartData, ReportBranchSell, ReportBranchSellResponse } from '../../api/types';
import { dispatch } from '../store';

type State = {
  data: ReportBranchSell;
  chartData: ReportBranchChartData;
  errorMsg: string;
};
type ISalesProp = {
  data: ReportBranchSell;
  error?: string;
};
type IChartData = {
  chartData: ReportBranchChartData;
  error?: string;
};

const initialState: State = {
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
  errorMsg: '',
  chartData: { x: [], y: [], label: [] },
};

const salesSlice = createSlice({
  name: 'sales',
  initialState,
  reducers: {
    setSalesData(state, action: PayloadAction<ISalesProp>) {
      state.data = action.payload.data;
      state.errorMsg = action.payload.error || '';
    },
    setChartData(state, action: PayloadAction<IChartData>) {
      state.chartData = action.payload.chartData;
      state.errorMsg = action.payload.error || '';
    },
  },
});

export default salesSlice.reducer;
export const { setSalesData } = salesSlice.actions;
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
    dispatch(salesSlice.actions.setChartData({ chartData }));
  } else {
    dispatch(salesSlice.actions.setChartData({ chartData, error }));
  }
}
export function getSalesReport({
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
  return async () => {
    Promise.all([
      getReportBranchSell(fromDate, toDate, 'Delino', branchId),
      getReportBranchSell(fromDate, toDate, 'Exclusive', branchId),
    ])
      .then(([resDelino, resVendo]) => {
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
            totalDiscount: resDelinoResult.totalTransactionSum + resVendoResult.totalTransactionSum,
            totalFoodiranShare: resDelinoResult.totalTransactionSum + resVendoResult.totalTransactionSum,
            totalPayToBranch: resDelinoResult.totalTransactionSum + resVendoResult.totalTransactionSum,
          };
          dispatch(salesSlice.actions.setSalesData({ data }));
        }
      })
      .catch((error) => {
        dispatch(
          salesSlice.actions.setSalesData({
            data: {
              cashPay: { count: 0, sum: 0 },
              onlinePay: { count: 0, sum: 0 },
              totalDiscount: 0,
              totalFoodiranShare: 0,
              totalPayToBranch: 0,
              totalTransactionSum: 0,
            },
            error,
          })
        );
      });
  };
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
