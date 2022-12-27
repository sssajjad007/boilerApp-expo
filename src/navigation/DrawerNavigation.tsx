import { createDrawerNavigator, DrawerContentComponentProps, DrawerContentScrollView } from '@react-navigation/drawer';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import styled from 'styled-components/native';
import { DelinoIcon } from '../components/Icon';
import { userLogout } from '../redux/slices/user';
import { dispatch, RootState, useSelector } from '../redux/store';
import LoginScreen from '../screens/auth/Login';
import { BodyLarge, Logo, margin, textSize, TitleLarge } from '../styles';
import { RootScreen } from './TabNavigation';

type IDrawerParamList = {
  RootScreen: undefined;
  LoginScreen: undefined;
};
const Drawer = createDrawerNavigator<IDrawerParamList>();

export default function DrawerNavigation() {
  return (
    <Drawer.Navigator
      drawerContent={CustomDrawerContent}
      screenOptions={{
        drawerPosition: 'right',
        drawerType: 'front',
        headerShown: false,
        drawerActiveTintColor: '#e91e63',
        // drawerItemStyle: { marginVertical: 5 },
      }}>
      <Drawer.Screen name="RootScreen" options={{ drawerLabel: 'RootScreen Option' }} component={RootScreen} />
      <Drawer.Screen name="LoginScreen" options={{ drawerLabel: 'Setting Screen Option' }} component={LoginScreen} />
    </Drawer.Navigator>
  );
}
function CustomDrawerContent(props: DrawerContentComponentProps) {
  const currentBranchId = useSelector((state: RootState) => state.branch.currentBranchId);
  return (
    <DrawerContentScrollView {...props}>
      <Logo style={{ width: 120, height: 120 }} />
      <View style={styles.resDetails}>
        <TitleLarge>{currentBranchId.userFullName}</TitleLarge>
        <BranchName>
          {`${currentBranchId.restaurantTitle} ${currentBranchId.restaurantName}${
            currentBranchId.branchName ? ` (${currentBranchId.branchName})` : ''
          }`}
        </BranchName>
      </View>
      <TouchableOpacity
        onPress={() => {
          dispatch(userLogout());
        }}
        activeOpacity={1}
        style={styles.exit}>
        <TitleLarge>{'خروج'}</TitleLarge>
        <DelinoIcon name={'icon_logout'} size={textSize.large} color={'black'} />
      </TouchableOpacity>
    </DrawerContentScrollView>
  );
}
const styles = StyleSheet.create({
  exit: {
    width: '100%',
    paddingTop: 32,
    flexDirection: 'row-reverse',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: margin.normal,
  },
  resDetails: {
    height: 50,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});
const BranchName = styled(BodyLarge)`
  color: ${(p) => p.theme.colors.Gray[50]};
`;
