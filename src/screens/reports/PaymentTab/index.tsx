import { FlatList, View } from 'react-native';
import React, { useEffect, useState, memo } from 'react';
import { RootState, useSelector } from '../../../redux/store';
import { getRestPaymentReport } from '../../../api/payment';
import { RestPaymentReport } from '../../../api/types';
import PaymentItem from './PaymentItem';
import { PaymentContainer } from './styles';
import { CenterView, LoadingIndicatorPrimary, RefreshLoading, ScrollViewContainer, TextError } from '../../../styles';
import EmptyState from '../../../components/EmptyState';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ReportTab } from '../../../navigation/type';
import ContactUs from '../../../components/ContanctUs';

const NO_DELINO = 'رستوران شما در دلینو فعال نیست';
const CONTACT_US = 'برای ثبت درخواست یا پیگیری با کارشناسان ما در ارتباط باشید';
const NO_VENDO = 'رستوران شما در وندو فعال نیست';

function PaymentTab() {
  const branchId = useSelector((state: RootState) => state.branch.currentBranchId);
  const dateRange = useSelector((state: RootState) => state.sales.dateRange);
  const reportType = useSelector((state: RootState) => state.sales.reportType);
  const navigation = useNavigation<NativeStackNavigationProp<ReportTab>>();
  const [reportData, setReportData] = useState<RestPaymentReport[]>([]);
  const [reportError, setReportError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  function reportTypeToBoolean() {
    if (reportType === 'Delino') {
      return false;
    }
    if (reportType === 'Exclusive') {
      return true;
    }
    return '';
  }
  async function fetchData() {
    setLoading(true);
    const { data, error } = await getRestPaymentReport({
      fromDate: dateRange.startingDay,
      toDate: dateRange.endingDay,
      branchId: branchId.id,
      custom: reportTypeToBoolean(),
    });
    if (data) {
      setReportData(data);
    } else {
      setReportError(error);
    }
    setLoading(false);
  }
  useEffect(() => {
    fetchData();
  }, [branchId, dateRange, reportType]);

  if (!branchId.showInFoodiran && reportType === 'Delino') {
    return (
      <ContactUs
        buttonTitle="تماس با دلینو"
        title={NO_DELINO}
        description={CONTACT_US}
        onPress={() =>
          navigation.navigate('WebView', {
            url: 'https://www.delino.com/contact?appview',
            title: 'تماس با دلینو',
            loadingImmediately: true,
          })
        }
      />
    );
  }
  if (!branchId.hasCustomizedEngine && reportType === 'Exclusive') {
    return (
      <ContactUs
        buttonTitle="تماس با وندو"
        title={NO_VENDO}
        description={CONTACT_US}
        onPress={() =>
          navigation.navigate('WebView', {
            url: 'https://www.vendo.online?appview',
            title: 'تماس با وندو',
          })
        }
      />
    );
  }
  const refresh = async () => {
    setIsRefreshing(true);
    await fetchData();
    setIsRefreshing(false);
  };

  if (reportData.length === 0 && !loading && !reportError) {
    return (
      <ScrollViewContainer refreshControl={<RefreshLoading refreshing={isRefreshing} onRefresh={refresh} />}>
        <EmptyState iconName={'icon_add-restaurant'} message={'تسویه صورت نگرفته است'} style={{ paddingTop: 140 }} />
      </ScrollViewContainer>
    );
  }
  return (
    <PaymentContainer>
      {loading && !isRefreshing ? (
        <CenterView>
          <LoadingIndicatorPrimary />
        </CenterView>
      ) : (
        <FlatList
          data={reportData}
          refreshControl={<RefreshLoading refreshing={isRefreshing} onRefresh={refresh} />}
          renderItem={({ item, index }) => {
            return <PaymentItem data={item} key={index} />;
          }}
        />
      )}
      {reportError && <TextError>{reportError}</TextError>}
    </PaymentContainer>
  );
}
export default memo(PaymentTab, () => true);
