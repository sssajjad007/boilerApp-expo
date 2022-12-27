import React, { useCallback, useMemo, useRef } from 'react';
import { HeaderTitleProps } from '@react-navigation/elements';
import { IconButton } from '../components/IconButton';
import { DelinoIcon } from '../components/Icon';
import { textSize } from '../styles';
import { Button } from '../components/Button';
import { BottomTabNavigationOptions } from '@react-navigation/bottom-tabs';
import BottomSheet, { BottomSheetScrollView } from '@gorhom/bottom-sheet';
import { RootState, useSelector } from '../redux/store';
import { Text, View } from 'react-native';

export const headerOptions: BottomTabNavigationOptions = {
  headerStyle: { backgroundColor: 'white' },
  headerTitleAlign: 'center',
  headerRightContainerStyle: { paddingRight: '5%' },
  headerTitleContainerStyle: { paddingLeft: '5%' },
  headerTintColor: 'white',
};

export function HeaderTitle() {
  const sheetRef = useRef<BottomSheet>(null);
  const branchData = useSelector((state: RootState) => state.branch.branchList);
  const handleSheetChange = useCallback((index: any) => {
    console.log('handleSheetChange', index);
  }, []);

  const handleClosePress = useCallback(() => {
    sheetRef.current?.close();
  }, []);
  const data = useMemo(
    () =>
      Array(50)
        .fill(0)
        .map((_, index) => `index-${index}`),
    []
  );
  const renderItem = useCallback(
    (item: any) => (
      <View key={item} style={{ padding: 6, margin: 6, backgroundColor: '#eee' }}>
        <Text>{item}</Text>
      </View>
    ),
    []
  );
  const snapPoints = useMemo(() => ['100%', '100%'], []);
  return (
    <>
      <Button
        mode="Text"
        size="Default"
        onPress={() => {
          handleClosePress();
        }}>
        {'test'}
      </Button>
      <BottomSheet ref={sheetRef} index={0} snapPoints={snapPoints} onChange={handleSheetChange}>
        <BottomSheetScrollView contentContainerStyle={{ flex: 1, zIndex: 999 }}>
          {data.map(renderItem)}
        </BottomSheetScrollView>
      </BottomSheet>
    </>
  );
}

export function HeaderRight({ navigation }: { navigation: any }) {
  return (
    <IconButton
      size={textSize.ultraLarge}
      color={'black'}
      Icon={({ size, color }) => {
        return <DelinoIcon name="icon_menu" size={size} color={color} style={{ transform: [{ scaleX: -1 }] }} />;
      }}
      onPress={() => {
        navigation.toggleDrawer();
      }}
    />
  );
}
