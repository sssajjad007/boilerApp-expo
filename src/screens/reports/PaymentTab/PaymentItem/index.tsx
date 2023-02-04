import { View } from 'react-native';
import React, { useCallback, useMemo, useRef, useState } from 'react';
import { BodyLarge, BodyRegular, Item, TitleXLarge } from '../../../../styles';
import { IPaymentProps } from './types';
import { currency } from '../../../../utils/currency';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { CustomBackdrop } from '../../../../components/CustomebackDrop';
import { ButtonContainer, LineDashed, LineHorizontal, Row, TitlePrimary } from './styles';
import { Button } from '../../../../components/Button';
import { ScrollView } from 'react-native-gesture-handler';
import { userTempToken } from '../../../../api/user';
import { reportPanelUrl } from '../../../../api';
import moment from 'moment-jalaali';
import { RootState, useSelector } from '../../../../redux/store';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ReportTab } from '../../../../navigation/type';

const FACTOR = 'شماره فاکتور';
const DATE = 'تاریخ';
const RESTAURANT = 'رستوران';
const ONLINE_SALES = 'فروش آنلاین';
const CACHE_SALES = 'فروش نقدی';
const TAX = 'مالیات';
const DELIVERY_COST = 'هزینه پیک';
const DISCOUNT = 'تخفیف';
const TOTAL = 'مجموع';
const SHOW_DETAILS_FACTOR = 'نمایش ریز فاکتور';

export default function PaymentItem(props: IPaymentProps) {
  const { data } = props;
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const snapPoints = useMemo(() => ['75 %'], []);
  const [loading, setLoading] = useState<boolean>(false);
  const close = useCallback(() => {
    bottomSheetModalRef.current?.close();
  }, []);
  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);
  const handleSheetChanges = useCallback((index: number) => {
    console.log('handleSheetChanges', index);
  }, []);
  const dateRange = useSelector((state: RootState) => state.sales.dateRange);
  const branchId = useSelector((state: RootState) => state.branch.currentBranchId.id);
  const reportType = useSelector((state: RootState) => state.sales.reportType);
  const navigation = useNavigation<NativeStackNavigationProp<ReportTab>>();

  const showWebView = async () => {
    setLoading(true);
    try {
      const token = await userTempToken();
      const url = reportPanelUrl({
        fromDate: moment(dateRange.startingDay).format('jYYYY/jMM/jDD'),
        toDate: moment(dateRange.endingDay).format('jYYYY/jMM/jDD'),
        restId: branchId,
        reportType,
        token: token,
      });
      navigation.push('WebView', { url, title: 'گزارش تسویه' });
    } catch (e) {
      console.log(e);
    }
    setLoading(false);
    close();
  };
  function renderPaymentDetails() {
    return (
      <ScrollView>
        <Row>
          <BodyLarge>{FACTOR}</BodyLarge>
          <View style={{ paddingLeft: '5%' }}>
            <BodyLarge>{DATE}</BodyLarge>
          </View>
        </Row>
        <Row noPadding>
          <TitleXLarge>{`#${data.amount}`}</TitleXLarge>
          <TitleXLarge>{data.dateToShow}</TitleXLarge>
        </Row>
        <LineDashed />
        <Row>
          <BodyLarge>{RESTAURANT}</BodyLarge>
          <BodyLarge>{`${data.restaurantName}${data.branchName ? ` (${data.branchName})` : ''}`}</BodyLarge>
        </Row>
        <LineHorizontal />
        <Row>
          <BodyLarge>{ONLINE_SALES}</BodyLarge>
          <BodyLarge>{currency(data.onlinePayment)}</BodyLarge>
        </Row>
        <LineHorizontal />
        <Row>
          <BodyLarge>{CACHE_SALES}</BodyLarge>
          <BodyLarge>{currency(data.cashPayment)}</BodyLarge>
        </Row>
        <LineHorizontal />
        <Row>
          <BodyLarge>{TAX}</BodyLarge>
          <BodyLarge>{currency(data.taxAmount)}</BodyLarge>
        </Row>
        <LineHorizontal />
        <Row>
          <BodyLarge>{DELIVERY_COST}</BodyLarge>
          <BodyLarge>{currency(data.deliveryAmount)}</BodyLarge>
        </Row>
        <LineHorizontal />
        <Row>
          <BodyLarge>{DISCOUNT}</BodyLarge>
          <BodyLarge>{currency(data.couponDiscountAmount)}</BodyLarge>
        </Row>
        <LineHorizontal />
        <Row>
          <TitlePrimary>{TOTAL}</TitlePrimary>
          <TitlePrimary>{currency(data.total)}</TitlePrimary>
        </Row>
      </ScrollView>
    );
  }
  return (
    <>
      <Item onPress={handlePresentModalPress}>
        <BodyRegular>{currency(data.total)}</BodyRegular>
        <BodyRegular>{data.dateToShow}</BodyRegular>
      </Item>
      <BottomSheetModal
        ref={bottomSheetModalRef}
        index={0}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}
        backdropComponent={({ animatedIndex, animatedPosition, style }) => {
          return (
            <CustomBackdrop
              animatedIndex={animatedIndex}
              animatedPosition={animatedPosition}
              style={style}
              close={close}
              index={1}
            />
          );
        }}>
        <View style={{ flex: 1 }}>
          <View style={{ flex: 1 }}>{renderPaymentDetails()}</View>
          <ButtonContainer>
            <Button mode="Filled" size="Large" onPress={showWebView} loading={loading}>
              {SHOW_DETAILS_FACTOR}
            </Button>
          </ButtonContainer>
        </View>
      </BottomSheetModal>
    </>
  );
}
