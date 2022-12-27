import React, { useCallback, useMemo, useRef } from 'react';
import { Container } from '../../styles';
import TopBar from '../TopBar';
import { IRootContainer } from './types';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { CustomBackdrop } from '../CustomebackDrop';
import { RootState, useSelector } from '../../redux/store';
import { FlatList } from 'react-native-gesture-handler';
import BranchItem from './BranchItem';
import { View } from 'react-native';

export function RootContainer(props: IRootContainer) {
  const { isMenuIcon, title, children, branchListAction } = props;
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const snapPoints = useMemo(() => ['50%', '75 %'], []);
  const branchList = useSelector((state: RootState) => state.branch.branchList);
  const currentBranchId = useSelector((state: RootState) => state.branch.currentBranchId);
  const close = useCallback(() => {
    bottomSheetModalRef.current?.close();
  }, []);
  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);
  const handleSheetChanges = useCallback((index: number) => {
    console.log('handleSheetChanges', index);
  }, []);

  return (
    <Container>
      <TopBar
        branchListAction={branchListAction}
        isMenuIcon={isMenuIcon}
        title={title}
        currentBranchId={currentBranchId}
        handlePresentModalPress={handlePresentModalPress}
      />
      {children}
      <BottomSheetModal
        ref={bottomSheetModalRef}
        index={1}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}
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
          <FlatList
            data={branchList}
            renderItem={({ item }: { item: any }) => {
              return <BranchItem data={item} currentBranchId={currentBranchId} close={close} />;
            }}
            // keyExtractor={keyExtractor}
          />
        </View>
      </BottomSheetModal>
    </Container>
  );
}
// const keyExtractor = (item: any) => `${item.id}`;
