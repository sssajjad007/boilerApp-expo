import React from 'react';
import { EmptyIcon, TopBarContainer } from './styles';
import { ITopBarProps } from './types';
import { IconButton } from '../IconButton';
import { useNavigation } from '@react-navigation/native';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { DelinoIcon } from '../Icon';
import { RootState, useSelector } from '../../redux/store';
import { TitleRegular } from '../../styles';
import { NetInfoComponent } from './NetInfo';
import { Tap } from '../Tap';

export default function TopBar(props: ITopBarProps) {
  const { isMenuIcon, branchListAction, currentBranchId, handlePresentModalPress, title } = props;
  const branchList = useSelector((state: RootState) => state.branch.branchList);
  const navigation = useNavigation<DrawerNavigationProp<any>>();
  const MenuIconRender = () => {
    if (isMenuIcon) {
      return (
        <IconButton
          onPress={() => {
            navigation.toggleDrawer();
          }}
          size={24}
          color={'black'}
          Icon={({ size, color }) => {
            return (
              <DelinoIcon name="icon_menu" size={size} color={color} style={{ transform: [{ rotateY: '180deg' }] }} />
            );
          }}
        />
      );
    }
    return <EmptyIcon />;
  };
  const BranchListRender = () => {
    if (branchListAction) {
      return (
        currentBranchId.id >= 0 && (
          <Tap onPress={handlePresentModalPress}>
            <TitleRegular>
              {`${currentBranchId.restaurantTitle} ${currentBranchId.restaurantName}${
                currentBranchId.branchName ? ` (${currentBranchId.branchName})` : ''
              }`}
            </TitleRegular>
          </Tap>
        )
      );
    }
    return <EmptyIcon />;
  };
  const CloseIcon = () => {
    return <EmptyIcon />;
  };
  return (
    <>
      <NetInfoComponent />
      <TopBarContainer>
        {MenuIconRender()}
        {BranchListRender()}
        {CloseIcon()}
      </TopBarContainer>
    </>
  );
}
