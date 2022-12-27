import { View, Text } from 'react-native';
import React, { useCallback, useMemo, useRef, useState } from 'react';
import { ReportScreenProps } from '../../navigation/type';
import { RootContainer } from '../../components/Container';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import { NavigationState, SceneRendererProps } from 'react-native-tab-view/lib/typescript/src/types';
import { ActionBar, CalendarButton, DateText, styles, TabBarLabel } from './styles';
import { useTheme } from 'styled-components/native';
import { width } from '../../utils/deviceUi';
import { SwipeButton } from '../../components/SwipeButton';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { CustomBackdrop } from '../../components/CustomebackDrop';
import { DelinoIcon } from '../../components/Icon';
import DatePicker from './DatePicker';

export default function ReportScreen({ navigation }: ReportScreenProps) {
  const theme = useTheme();
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'first', title: 'فروش' },
    { key: 'second', title: 'محصولات' },
    { key: 'third', title: 'تسویه' },
  ]);
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const snapPoints = useMemo(() => ['75 %'], []);
  const close = useCallback(() => {
    bottomSheetModalRef.current?.close();
  }, []);
  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);
  const FirstRoute = () => <View style={{ flex: 1, backgroundColor: 'white' }} />;
  const SecondRoute = () => <View style={{ flex: 1, backgroundColor: 'white' }} />;
  const ThirdRoute = () => <View style={{ flex: 1, backgroundColor: 'white' }} />;
  const renderScene = SceneMap({
    first: FirstRoute,
    second: SecondRoute,
    third: ThirdRoute,
  });
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
            console.log('left');
          }}
          actionRight={() => {
            console.log('right');
          }}
        />
        {/* <CalendarButton onPress={handlePresentModalPress}>
          <DelinoIcon name={'icon_calendar'} size={24} color={'black'} />
          <DateText>{'امروز'}</DateText>
          <DelinoIcon name={'icon_angle-down'} size={14} color={'black'} />
        </CalendarButton> */}
      </ActionBar>
      <TabView
        renderTabBar={renderTabBar}
        style={{ transform: [{ scaleX: -1 }] }}
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width: width }}
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
            />
          );
        }}>
        <View style={{ flex: 1 }}>
          <DatePicker />
        </View>
      </BottomSheetModal>
    </RootContainer>
  );
}
