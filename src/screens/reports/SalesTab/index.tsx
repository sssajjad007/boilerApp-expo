import React, { useEffect, useState, memo } from 'react';
import {
  BodyLarge,
  BodyRegular,
  BodySmall,
  CenterView,
  LoadingIndicatorPrimary,
  RefreshLoading,
  ScrollViewContainer,
  TitleLarge,
} from '../../../styles';
import Cart from '../../../components/Cart';
import { RootState, useSelector } from '../../../redux/store';
import {
  Col,
  DetailContainer,
  DetailsTitle,
  LegendContainer,
  LineHorizontal,
  LineVertical,
  PaymentContainer,
  PaymentItem,
  PaymentTitle,
  Row,
  WhiteCircle,
} from './styles';
import { currency } from '../../../utils/currency';
import { getSalesReportType } from '../../../redux/slices/sales';
import { PieChart } from 'react-native-chart-kit';
import { width } from '../../../utils/deviceUi';
import { View } from 'react-native';
import { ReportBranchBestSelling, ReportBranchSell } from '../../../api/types';
import EmptyState from '../../../components/EmptyState';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ReportTab } from '../../../navigation/type';
import ContactUs from '../../../components/ContanctUs';

const SUMMARY_SALES = 'خلاصه فروش';
const TOTAL_SALES = 'مجموع سفارش ها ';
const ONLINE_PAYMENT = 'پرداخت آنلاین';
const CASH_PAYMENT = 'پرداخت نقدی';
const DELINO_FEES = 'کارمزد دلینو';
const DISCOUNT = 'تخفیف';
const DELINO_PAY_TO_RESTAURANT = 'پرداختی به مجموعه';
const MOST_SELLS = 'پرفروش ترین ها';
const NO_DELINO = 'رستوران شما در دلینو فعال نیست';
const CONTACT_US = 'برای ثبت درخواست یا پیگیری با کارشناسان ما در ارتباط باشید';
const NO_VENDO = 'رستوران شما در وندو فعال نیست';

const colors = ['#F15B41', '#BADBFA', '#9b89e3', '#f59aff', '#FFE16A', '#B4E8A0'];
const chartConfig = {
  backgroundColor: '#e26a00',
  backgroundGradientFrom: '#fb8c00',
  backgroundGradientTo: '#ffa726',
  decimalPlaces: 2, // optional, defaults to 2dp
  color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
  labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
  style: {
    borderRadius: 16,
  },
  propsForDots: {
    r: '6',
    strokeWidth: '2',
    stroke: '#ffa726',
  },
};
function SalesTab() {
  const reportType = useSelector((state: RootState) => state.sales.reportType);
  const branchId = useSelector((state: RootState) => state.branch.currentBranchId);
  const dateRange = useSelector((state: RootState) => state.sales.dateRange);
  const topSixFoods = useSelector((state: RootState) => state.sales.topSixFoods);
  const [error, setError] = useState<string>('');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation<NativeStackNavigationProp<ReportTab>>();

  const refresh = async () => {
    setIsRefreshing(true);
    await fetchData();
    setIsRefreshing(false);
  };
  const [data, setData] = useState<ReportBranchSell>({
    totalTransactionSum: 0,
    totalFoodiranShare: 0,
    totalDiscount: 0,
    totalPayToBranch: 0,
    onlinePay: {
      count: 0,
      sum: 0,
    },
    cashPay: {
      count: 0,
      sum: 0,
    },
  });
  async function fetchData() {
    setLoading(true);
    const { reportData, error } = await getSalesReportType({
      fromDate: dateRange.startingDay,
      toDate: dateRange.endingDay,
      branchId: branchId.id,
      reportType,
    });
    if (reportData) {
      setData(reportData);
    } else if (error) {
      setError(error);
    }
    setLoading(false);
  }
  useEffect(() => {
    if (branchId.id >= 0) {
      fetchData();
    }
  }, [dateRange, branchId.id, reportType]);

  function getReportType() {
    switch (reportType) {
      case 'Delino':
        return 'دلینو';
      case 'Exclusive':
        return 'وندو';
      default:
        return 'دلینو';
    }
  }

  function renderChartData() {
    return topSixFoods.map((item, index) => {
      return {
        name: item.title,
        population: item.quantity,
        color: colors[index],
      };
    });
  }
  if (loading && !isRefreshing) {
    return (
      <CenterView>
        <LoadingIndicatorPrimary />
      </CenterView>
    );
  }
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
  return (
    <ScrollViewContainer refreshControl={<RefreshLoading refreshing={isRefreshing} onRefresh={refresh} />}>
      {data.totalTransactionSum !== 0 ? (
        <>
          <Cart title={`${SUMMARY_SALES} ${getReportType()}`}>
            <PaymentContainer>
              <Item type={'online'} data={data} />
              <LineVertical />
              <Item type={'cash'} data={data} />
            </PaymentContainer>
            <LineHorizontal />
            <Details data={data} />
          </Cart>
          <Cart title={MOST_SELLS}>
            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
              <WhiteCircle />
              <PieChart
                data={renderChartData()}
                width={width}
                height={220}
                chartConfig={chartConfig}
                accessor={'population'}
                backgroundColor={'transparent'}
                paddingLeft={'0'}
                hasLegend={false}
                center={[width / 4, 0]}
                // absolute
              />
            </View>
            <LegendContainer>
              <LegendComponent items={topSixFoods} colors={colors} />
            </LegendContainer>
          </Cart>
        </>
      ) : (
        <View style={{ paddingTop: 100 }}>
          <EmptyState message="فروشی انجام نشده است" image="sales" />
        </View>
      )}
    </ScrollViewContainer>
  );
}

function Details({ data }: { data: any }) {
  return (
    <DetailContainer>
      <Row>
        <BodyRegular>{TOTAL_SALES}</BodyRegular>
        <BodyRegular>{currency(data.totalTransactionSum)}</BodyRegular>
      </Row>
      <Row>
        <BodyRegular>{DELINO_FEES}</BodyRegular>
        <BodyRegular>{currency(data.totalFoodiranShare)}</BodyRegular>
      </Row>
      <Row>
        <BodyRegular>{DISCOUNT}</BodyRegular>
        <BodyRegular>{currency(data.totalDiscount)}</BodyRegular>
      </Row>
      <Row>
        <TitleLarge>{DELINO_PAY_TO_RESTAURANT}</TitleLarge>
        <TitleLarge>{currency(data.totalPayToBranch)}</TitleLarge>
      </Row>
    </DetailContainer>
  );
}

function Item(props: { type: 'cash' | 'online'; data: any }) {
  const { type, data } = props;
  return (
    <PaymentItem>
      <PaymentTitle>{type === 'online' ? ONLINE_PAYMENT : CASH_PAYMENT}</PaymentTitle>
      <Row>
        <BodyLarge>{type === 'online' ? data.onlinePay.count : data.cashPay.count}</BodyLarge>
        <BodyLarge>
          {type === 'online' ? currency(data.onlinePay.sum, false) : currency(data.cashPay.sum, false)}
        </BodyLarge>
      </Row>
      <Row>
        <DetailsTitle>{'تعداد'}</DetailsTitle>
        <DetailsTitle>{'درآمد (تومان)'}</DetailsTitle>
      </Row>
    </PaymentItem>
  );
}

function LegendComponent(props: { items: ReportBranchBestSelling[]; colors: string[] }) {
  const { colors, items } = props;
  const totalFoodCount = useSelector((state: RootState) => state.sales.totalFoods);
  const length: number = items.length;

  function renderItemLeft() {
    const resultLeft: JSX.Element[] = [];
    for (let index = 0; index < items.length; index++) {
      const element = items[index];
      if (index >= 3) {
        resultLeft.push(
          <LegendItem
            key={index}
            title={element.title}
            color={colors[index]}
            percent={Math.round((element.quantity * 100) / totalFoodCount)}
            length={length}
          />
        );
      }
    }
    return resultLeft;
  }

  function renderItemRight() {
    const resultRight: JSX.Element[] = [];
    for (let index = 0; index < items.length; index++) {
      const element = items[index];
      if (index < 3) {
        resultRight.push(
          <LegendItem
            key={index}
            title={element.title}
            color={colors[index]}
            percent={Math.round((element.quantity * 100) / totalFoodCount)}
            length={length}
          />
        );
      }
    }
    return resultRight;
  }
  return (
    <View style={{ flex: 1, flexDirection: 'row-reverse' }}>
      <Col>{renderItemRight()}</Col>
      <Col>{renderItemLeft()}</Col>
    </View>
  );
}

function LegendItem({
  title,
  color,
  percent,
  length,
}: {
  title: string;
  color: string;
  percent: number;
  length: number;
}) {
  return (
    <View style={{ flexDirection: 'row-reverse', alignItems: 'center' }}>
      <View style={[{ width: 16, height: 16, borderRadius: 8 }, { backgroundColor: color }]} />
      <BodySmall style={{ paddingHorizontal: 4 }}>{`${percent}%`}</BodySmall>
      <BodySmall numberOfLines={1} ellipsizeMode={'tail'} style={{ paddingRight: 4, maxWidth: length > 3 ? 110 : 200 }}>
        {title}
      </BodySmall>
    </View>
  );
}
export default memo(SalesTab, () => true);
