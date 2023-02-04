import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { forwardRef, useEffect, useImperativeHandle, useState } from 'react';
import { ReportBranchSell } from '../../../api/types';
import { RootStackParamList } from '../../../navigation/type';
import { getSalesReport, setDateRange } from '../../../redux/slices/sales';
import { dispatch, RootState, useSelector } from '../../../redux/store';
import { dateFormatted } from '../../../utils';
import { currency } from '../../../utils/currency';
import { IRef, IRefProps } from '../types';
import { Body, IncomeBox, Loading, OrderBox, Price, Title, Wrapper } from './styles';
import { TabActions } from '@react-navigation/native';

const TODAY_INCOME = 'درآمد امروز';
const WITHOUT_PURSUANT = 'بعد از کسر کمیسیون';
const TODAY_ORDERS = 'سفارش‌های امروز';
const SUCCESS_ORDERS = 'تعداد سفارش‌های موفق';

export const SalesReport = forwardRef<IRef, IRefProps>((props, ref) => {
  useImperativeHandle(ref, () => ({
    refreshData: fetchData,
  }));
  const branchId = useSelector((state: RootState) => state.branch.currentBranchId.id);
  const today = dateFormatted();
  const [data, setData] = useState<ReportBranchSell>();
  const [error, setError] = useState<string>('');
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const jumpToAction = TabActions.jumpTo('ReportTab');

  async function fetchData() {
    const { data, error } = await getSalesReport({
      fromDate: today,
      toDate: today,
      branchId,
    });
    if (data) {
      setData(data);
    } else if (error) {
      setError(error);
    }
  }
  useEffect(() => {
    if (branchId >= 0) {
      fetchData();
    }
  }, [branchId]);
  return (
    <Wrapper>
      <IncomeBox
        onPress={() => {
          dispatch(setDateRange({ startingDay: today, endingDay: today }));
          navigation.dispatch(jumpToAction);
        }}>
        <Title>{TODAY_INCOME}</Title>
        <Body>{WITHOUT_PURSUANT}</Body>
        {data ? <Price>{currency(data.totalPayToBranch)}</Price> : <Loading />}
      </IncomeBox>
      <OrderBox
        onPress={() => {
          dispatch(setDateRange({ startingDay: today, endingDay: today }));
          navigation.dispatch(jumpToAction);
        }}>
        <Title>{TODAY_ORDERS}</Title>
        <Body>{SUCCESS_ORDERS}</Body>
        {data ? <Price>{data.cashPay.count + data.onlinePay.count}</Price> : <Loading />}
      </OrderBox>
    </Wrapper>
  );
});
