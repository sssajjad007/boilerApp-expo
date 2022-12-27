import React, { forwardRef, useEffect, useImperativeHandle } from 'react';
import { getSalesReport } from '../../../redux/slices/sales';
import { dispatch, RootState, useSelector } from '../../../redux/store';
import { dateFormatted } from '../../../utils';
import { currency } from '../../../utils/currency';
import { IRef, IRefProps } from '../types';
import { Body, IncomeBox, Loading, OrderBox, Price, Title, Wrapper } from './styles';

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
  const data = useSelector((state: RootState) => state.sales.data);
  function fetchData() {
    dispatch(getSalesReport({ fromDate: today, toDate: today, branchId }));
  }
  useEffect(() => {
    if (branchId >= 0) {
      fetchData();
    }
  }, [branchId]);
  return (
    <Wrapper>
      <IncomeBox>
        <Title>{TODAY_INCOME}</Title>
        <Body>{WITHOUT_PURSUANT}</Body>
        {data ? <Price>{currency(data.totalPayToBranch)}</Price> : <Loading />}
      </IncomeBox>
      <OrderBox>
        <Title>{TODAY_ORDERS}</Title>
        <Body>{SUCCESS_ORDERS}</Body>
        {data ? <Price>{data.cashPay.count + data.onlinePay.count}</Price> : <Loading />}
      </OrderBox>
    </Wrapper>
  );
});
