import React, { forwardRef, useEffect, useImperativeHandle, useState } from 'react';
import { LoadingIndicatorPrimary, TextError, textSize } from '../../../styles';
import { Actions, ActionText, ActionWeek, CurrentWeek, Wrapper } from './styles';
import Chart from '../../../components/Chart';
import Cart from '../../../components/Cart';
import moment from 'moment-jalaali';
import { WeekRange } from './types';
import { RootState, useSelector } from '../../../redux/store';
import { getChartData } from '../../../redux/slices/sales';
import { dateFormatted, throttled, useThrottled } from '../../../utils';
import { DelinoIcon } from '../../../components/Icon';
import { useTheme } from 'styled-components/native';
import { IRef, IRefProps } from '../types';
import { ReportBranchChartData } from '../../../api/types';

const TODAY_REPORT_ORDERS = 'گزارش تعداد سفارش ها';

export const SalesChart = forwardRef<IRef, IRefProps>((props, ref) => {
  useImperativeHandle(ref, () => ({
    refreshData: fetchData,
  }));
  const branchId = useSelector((state: RootState) => state.branch.currentBranchId.id);
  const theme = useTheme();
  const [weekRange, setWeekRange] = useState<WeekRange>();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [chartData, setChartData] = useState<ReportBranchChartData>({ label: [], x: [], y: [] });
  const { onTouchablePress } = useThrottled();

  function disableNextWeek() {
    if (weekRange) {
      const dateTo = weekRange.to;
      if (String(dateTo).slice(0, 10) === String(new Date()).slice(0, 10)) {
        return true;
      }
    }
    return false;
  }
  const onNextWeek = () => {
    if (weekRange) {
      const dateFrom = weekRange.from;
      const dateTo = weekRange.to;
      if (String(dateTo).slice(0, 10) === String(new Date()).slice(0, 10)) {
        return;
      }
      setWeekRange({
        from: dateFrom.add(7, 'd'),
        to: dateTo.add(7, 'd'),
      });
    }
  };
  const onPrevWeek = () => {
    if (weekRange) {
      const dateFrom = weekRange.from;
      const dateTo = weekRange.to;
      console.log('t');
      setWeekRange({
        from: dateFrom.subtract(7, 'd'),
        to: dateTo.subtract(7, 'd'),
      });
    }
  };
  useEffect(() => {
    setWeekRange({
      from: moment().subtract(6, 'd'),
      to: moment(),
    });
  }, []);

  useEffect(() => {
    if (branchId >= 0) {
      fetchData();
    }
  }, [weekRange, branchId]);

  async function fetchData() {
    if (weekRange) {
      setLoading(true);
      const { chartData, error } = await getChartData({
        fromDate: dateFormatted(weekRange.from),
        toDate: dateFormatted(weekRange.to),
        branchId,
      });
      if (error) {
        setError(error);
      }
      if (chartData) {
        setChartData(chartData);
      }
      setLoading(false);
    }
  }

  return (
    <Cart title={TODAY_REPORT_ORDERS}>
      <Wrapper>
        {weekRange && (
          <Actions>
            <ActionWeek
              onPress={() => {
                onTouchablePress(onNextWeek);
              }}>
              <DelinoIcon name="icon_angle-right" color={theme.colors.Gray[50]} size={textSize.xxSmall} />
              <ActionText active={disableNextWeek()}>هفته بعد</ActionText>
            </ActionWeek>
            <CurrentWeek>
              {weekRange.from.format('jD jMMMM')} - {weekRange.to.format('jD jMMMM')}
            </CurrentWeek>
            <ActionWeek
              onPress={() => {
                onTouchablePress(onPrevWeek);
              }}>
              <ActionText>هفته قبل</ActionText>
              <DelinoIcon name="icon_angle-left" color={theme.colors.Gray[50]} size={textSize.xxSmall} />
            </ActionWeek>
          </Actions>
        )}
        {chartData.x.length > 0 && !loading ? (
          <Chart data={chartData} />
        ) : error ? (
          <TextError>{error}</TextError>
        ) : (
          <LoadingIndicatorPrimary />
        )}
      </Wrapper>
    </Cart>
  );
});
