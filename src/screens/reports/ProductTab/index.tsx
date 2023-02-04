import React, { useEffect, useRef, useState, memo } from 'react';
import { getReportProductData } from '../../../redux/slices/sales';
import { dispatch, RootState, useSelector } from '../../../redux/store';
import { BodyRegular, CenterView, LoadingIndicatorPrimary, RefreshLoading, ScrollViewContainer } from '../../../styles';
import Cart from '../../../components/Cart';
import { Item } from './styles';
import EmptyState from '../../../components/EmptyState';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ReportTab } from '../../../navigation/type';
import ContactUs from '../../../components/ContanctUs';

const NO_DELINO = 'رستوران شما در دلینو فعال نیست';
const CONTACT_US = 'برای ثبت درخواست یا پیگیری با کارشناسان ما در ارتباط باشید';
const NO_VENDO = 'رستوران شما در وندو فعال نیست';

function ProductTab() {
  const branchId = useSelector((state: RootState) => state.branch.currentBranchId);
  const reportType = useSelector((state: RootState) => state.sales.reportType);
  const dateRange = useSelector((state: RootState) => state.sales.dateRange);
  const productData = useSelector((state: RootState) => state.sales.reportProductData);
  const loading = useSelector((state: RootState) => state.sales.reportProductLoading);
  const error = useSelector((state: RootState) => state.sales.reportProductError);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const navigation = useNavigation<NativeStackNavigationProp<ReportTab>>();
  const refresh = () => {
    setIsRefreshing(true);
    fetchData();
  };
  useEffect(() => {
    if (!loading) {
      setIsRefreshing(false);
    }
  }, [loading]);

  async function fetchData() {
    dispatch(
      getReportProductData({
        fromDate: dateRange.startingDay,
        toDate: dateRange.endingDay,
        branchId: branchId.id,
        reportType,
      })
    );
  }
  useEffect(() => {
    if (branchId.id > 0) {
      fetchData();
    }
  }, [branchId, reportType, dateRange]);

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

  function renderItem() {
    if (productData.length === 0 && !loading && !error) {
      return (
        <EmptyState iconName={'icon_add-restaurant'} message={'هیچ محصولی موجود نیست'} style={{ paddingTop: 140 }} />
      );
    }
    const result: JSX.Element[] = [];
    for (let index = 0; index < productData.length; index++) {
      const item = productData[index];
      result.push(
        <Item key={index}>
          <BodyRegular>{item.title}</BodyRegular>
          <BodyRegular>{item.quantity}</BodyRegular>
        </Item>
      );
    }
    return <Cart>{result}</Cart>;
  }
  if (loading && !isRefreshing) {
    return (
      <CenterView>
        <LoadingIndicatorPrimary />
      </CenterView>
    );
  }
  return (
    <ScrollViewContainer refreshControl={<RefreshLoading refreshing={isRefreshing} onRefresh={refresh} />}>
      {renderItem()}
    </ScrollViewContainer>
  );
}
export default memo(ProductTab, () => true);
