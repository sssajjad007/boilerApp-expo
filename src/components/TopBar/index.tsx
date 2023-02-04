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
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { IDrawerParamList } from '../../navigation/type';
import { View } from 'react-native';

export default function TopBar(props: ITopBarProps) {
  const {
    isMenuIcon,
    branchListAction,
    currentBranchId,
    handlePresentModalPress,
    title,
    isBackIcon,
    isCloseIcon,
    isSearchIcon,
    isEditIcon,
    pageSheet,
    onEditPress,
    onSearchPress,
  } = props;

  const branchList = useSelector((state: RootState) => state.branch.branchList);
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const drawerNavigation = useNavigation<DrawerNavigationProp<IDrawerParamList>>();

  const MenuIconRender = () => {
    if (isMenuIcon) {
      return (
        <IconButton
          onPress={() => {
            drawerNavigation.toggleDrawer();
          }}
          size={20}
          color={'black'}
          Icon={({ size, color }) => {
            return (
              <DelinoIcon name="icon_menu" size={size} color={color} style={{ transform: [{ rotateY: '180deg' }] }} />
            );
          }}
        />
      );
    }
    if (isBackIcon) {
      return (
        <IconButton
          onPress={() => {
            navigation.goBack();
          }}
          size={16}
          color={'black'}
          Icon={({ size, color }) => {
            return <DelinoIcon name="icon_angle-right" size={size} color={color} />;
          }}
        />
      );
    }
    return <EmptyIcon />;
  };
  const BranchListRender = () => {
    if (branchListAction && currentBranchId && branchList) {
      if (branchList.length === 1) {
        return (
          <TitleRegular>
            {`${currentBranchId.restaurantName}${
              currentBranchId.branchName ? ` (${currentBranchId.branchName})` : ''
            }   `}
          </TitleRegular>
        );
      }
      return (
        currentBranchId.id >= 0 && (
          <Tap onPress={handlePresentModalPress}>
            <TitleRegular>
              {`${currentBranchId.restaurantName}${
                currentBranchId.branchName ? ` (${currentBranchId.branchName})` : ''
              }   `}
              <DelinoIcon name={'icon_angle-down'} size={12} color={'black'} />
            </TitleRegular>
          </Tap>
        )
      );
    }
    return <EmptyIcon />;
  };
  const LeftIcon = () => {
    if (isCloseIcon) {
      return (
        <IconButton
          onPress={() => {
            navigation.goBack();
          }}
          size={20}
          color={'black'}
          Icon={({ size, color }) => {
            return <DelinoIcon name="icon_cross" size={size} color={color} />;
          }}
        />
      );
    }
    if (isSearchIcon && onSearchPress) {
      return (
        <>
          <IconButton
            onPress={onSearchPress}
            size={24}
            color={'black'}
            Icon={({ size, color }) => {
              return <DelinoIcon name="icon_search" size={size} color={color} />;
            }}
          />
          {isEditIcon && onEditPress && (
            <View style={{ position: 'absolute', right: 64 }}>
              <IconButton
                onPress={onEditPress}
                size={20}
                color={'black'}
                Icon={({ size, color }) => {
                  return <DelinoIcon name="icon_sort" size={size} color={color} />;
                }}
              />
            </View>
          )}
        </>
      );
    }
    return <EmptyIcon />;
  };
  return (
    <>
      <NetInfoComponent />
      <TopBarContainer>
        {MenuIconRender()}
        {BranchListRender()}
        {LeftIcon()}
      </TopBarContainer>
    </>
  );
}
