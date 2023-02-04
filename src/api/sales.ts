import { apiAuth } from './index';
import { ReportBranchBestSelling, ReportBranchDaySell, ReportBranchSellResponse, ReportTypeList } from './types';

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
export const getReportBranchBestSelling = async (
  fromDate: string,
  toDate: string,
  branchId?: number,
  delinoOrVendo = 0 || 1 || 2
  // for some stupid reason, the api is not working with the boolean type, use this instead
  // delinoOrVendo = 0 => Get All Reports
  // delinoOrVendo = 1 => Only Delino Reports
  // delinoOrVendo = 2 => Only Vendo(Exclusive) Reports
) => {
  try {
    let params = [`fromDate=${fromDate}`, `toDate=${toDate}`, `delinoOrVendo=${delinoOrVendo}`];

    if (branchId) {
      params.push(`restaurantId=${branchId}`);
    }

    const { data } = await apiAuth.get<ReportBranchBestSelling[]>(
      `report/getRestaurantBestSelling?${params.join('&')}`
    );

    // if (data) {
    return { data };
    // }
  } catch (e) {
    return { error: 'درخواست با خطا مواجه شد' };
  }
};
