import moment from 'moment-jalaali';
import { apiAuth } from './index';
import { RestPaymentReport } from './types';

// custom = NULL همه دیتاها
// custom = false دلینو
// custom = true اختصاصی

export const getRestPaymentReport = async ({
  fromDate,
  toDate,
  branchId,
  custom,
}: {
  fromDate: string;
  toDate: string;
  branchId: number;
  custom: boolean | '';
}) => {
  try {
    let params = [
      `df=${moment(fromDate).format('jYYYY/jMM/jDD')}`,
      `dt=${moment(toDate).format('jYYYY/jMM/jDD')}`,
      `rid=${branchId}`,
      `custom=${custom}`,
    ];
    const { data } = await apiAuth.get<RestPaymentReport[]>(`report/getRestPaymentReports?${params.join('&')}`);

    return { data };
  } catch (e) {
    return { error: 'درخواست با خطا مواجه شد' };
  }
};
