import moment from 'moment-jalaali';
import { apiAuth } from './index';
import { ReportBranchChartData, ReportBranchDaySell, ReportBranchSellResponse, ReportTypeList } from './types';

export const getReportBranchSell = async (
  fromDate: string,
  toDate: string,
  type: keyof typeof ReportTypeList,
  branchId?: number
) => {
  try {
    let params = [`fromDate=${fromDate}`, `toDate=${toDate}`, `type=${type}`];
    if (branchId) {
      params.push(`restaurantId=${branchId}`);
    }
    const { data } = await apiAuth.get<ReportBranchSellResponse>(`report/getRestaurantSell?${params.join('&')}`);
    return { data };
  } catch (e) {
    return { error: 'درخواست با خطا مواجه شد' };
  }
};

export const getSellReportChart = async (fromDate: string, toDate: string, branchId?: number) => {
  try {
    let params = [`fromDate=${fromDate}`, `toDate=${toDate}`];

    if (branchId) {
      params.push(`restaurantId=${branchId}`);
    }
    const { data } = await apiAuth.get<ReportBranchDaySell[]>(`report/getRestaurantDaySelling?${params.join('&')}`);
    return { data };
  } catch (e) {
    return { error: 'درخواست با خطا مواجه شد' };
  }
};
