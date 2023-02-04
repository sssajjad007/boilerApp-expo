import { View } from 'react-native';
import React, { useCallback, useMemo, useRef, useState } from 'react';
import { ReportScreenProps } from '../../navigation/type';
import { RootContainer } from '../../components/Container';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import { NavigationState, SceneRendererProps } from 'react-native-tab-view/lib/typescript/src/types';
import { ActionBar, CalendarButton, DateText, styles, TabBarLabel } from './styles';
import { useTheme } from 'styled-components/native';
import { height, width } from '../../utils/deviceUi';
import { SwipeButton } from '../../components/SwipeButton';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { CustomBackdrop } from '../../components/CustomebackDrop';
import { DelinoIcon } from '../../components/Icon';
import DatePicker from './DatePicker';
import { dispatch, RootState, useSelector } from '../../redux/store';
import moment from 'moment-jalaali';
import SalesTab from './SalesTab';
import { setReportType } from '../../redux/slices/sales';
import PaymentTab from './PaymentTab';
import ProductTab from './ProductTab';

const renderScene = SceneMap({
  first: SalesTab,
  second: ProductTab,
  third: PaymentTab,
});

export default function ReportScreen({ navigation }: ReportScreenProps) {
  const theme = useTheme();
  const dateRange = useSelector((state: RootState) => state.sales.dateRange);
  const [index, setIndex] = useState(0);
  const routes = [
    { key: 'first', title: 'فروش' },
    { key: 'second', title: 'محصولات' },
    { key: 'third', title: 'تسویه' },
  ];
  const customFormatted = (d?: string) => moment(d).format('jD jMMMM');

  function DateRender() {
    const { endingDay, startingDay } = dateRange;
    let text = customFormatted(startingDay);
    if (startingDay !== endingDay) {
      const startMoment = moment(startingDay);
      const endMoment = moment(endingDay);
      if (startMoment.format('jMMMM') === endMoment.format('jMMMM')) {
        return (text = `${startMoment.format('jD')} - ${customFormatted(endingDay)}`);
      } else {
        return (text = `${text} - ${customFormatted(endingDay)}`);
      }
    } else if (text === customFormatted()) {
      return (text = 'امروز');
    } else {
      return text;
    }
  }
  function snapPoint() {
    if (height < 650) {
      return '90%';
    }
    if (height < 670) {
      return '84%';
    } else {
      return '75%';
    }
  }

  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const snapPoints = useMemo(() => [snapPoint()], []);
  const close = useCallback(() => {
    bottomSheetModalRef.current?.close();
  }, []);
  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  const renderTabBar = (
    props: SceneRendererProps & {
      navigationState: NavigationState<{
        key: string;
        title: string;
      }>;
    }
  ) => (
    <TabBar
      {...props}
      indicatorStyle={{ backgroundColor: theme.colors.Primary.Main }}
      style={styles.tabBar}
      renderLabel={({ color, focused, route }) => {
        return (
          <TabBarLabel style={{ transform: [{ scaleX: -1 }] }} selected={focused}>
            {route.title}
          </TabBarLabel>
        );
      }}
      pressColor={'white'}
    />
  );
  return (
    <RootContainer branchListAction isMenuIcon>
      <ActionBar>
        <SwipeButton
          actionLeft={() => {
            dispatch(setReportType('Delino'));
            console.log('delino');
          }}
          actionRight={() => {
            dispatch(setReportType('Exclusive'));
            console.log('exclusive');
          }}
        />
        <CalendarButton onPress={handlePresentModalPress}>
          <DelinoIcon name={'icon_calendar'} size={24} color={'black'} />
          <DateText ellipsizeMode={'tail'} numberOfLines={1} style={{ overflow: 'hidden', maxWidth: 110 }}>
            {DateRender()}
          </DateText>
          <DelinoIcon name={'icon_angle-down'} size={12} color={'black'} />
        </CalendarButton>
      </ActionBar>
      <TabView
        renderTabBar={renderTabBar}
        style={{ transform: [{ scaleX: -1 }] }}
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        sceneContainerStyle={{ transform: [{ scaleX: -1 }] }}
        initialLayout={{ width }}
      />
      <BottomSheetModal
        ref={bottomSheetModalRef}
        index={0}
        snapPoints={snapPoints}
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
          <DatePicker closeModal={close} />
        </View>
      </BottomSheetModal>
    </RootContainer>
  );
}
