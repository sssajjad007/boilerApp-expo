import { createNavigationContainerRef } from '@react-navigation/native';
import React, { useEffect, useRef, useState } from 'react';
import { DashboardScreenProps } from '../../navigation/type';
import { BodySmall, RefreshLoading, ScrollViewContainer, TitleLarge } from '../../styles';
import moment from 'moment-jalaali';
import { HeaderTitle } from './styles';
import { SalesReport } from './SalesReport';
import { SalesChart } from './SalesChart';
import { IRef } from './types';
import { RootContainer } from '../../components/Container';
import { Button } from '../../components/Button';
import { setAuth } from '../../api';
import { retrieve } from '../../core/mmkv';

export const navigationRef = createNavigationContainerRef();
const TODAY_REPORT_SALES = 'گزارش فروش امروز';

export default function DashboardScreen({ route, navigation }: DashboardScreenProps) {
  console.log('DashboardScreen');
  const salesRef = useRef<IRef>(null);
  const chartRef = useRef<IRef>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const refresh = () => {
    setIsRefreshing(true);
    salesRef.current?.refreshData();
    chartRef.current?.refreshData();
    setIsRefreshing(false);
  };
  return (
    <RootContainer branchListAction isMenuIcon>
      <ScrollViewContainer refreshControl={<RefreshLoading refreshing={isRefreshing} onRefresh={refresh} />}>
        <HeaderTitle>
          <TitleLarge>{TODAY_REPORT_SALES}</TitleLarge>
          <BodySmall>{moment().format('dddd، jD jMMMM jYYYY')}</BodySmall>
        </HeaderTitle>
        <SalesReport ref={salesRef} />
        <SalesChart ref={chartRef} />
        {/* <Button
          mode={'Filled'}
          size={'Default'}
          onPress={() => {
            console.log('cahnge');
            const refreshToken = retrieve('refreshToken', 'string');
            setAuth({ token: '2', refreshToken });
          }}>
          {'change jwt'}
        </Button> */}
      </ScrollViewContainer>
    </RootContainer>
  );
}
