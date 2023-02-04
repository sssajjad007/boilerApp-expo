import { createDrawerNavigator, DrawerContentComponentProps, DrawerContentScrollView } from '@react-navigation/drawer';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import styled from 'styled-components/native';
import { DelinoIcon } from '../components/Icon';
import { _Logout } from '../redux/slices/user';
import { dispatch, RootState, useSelector } from '../redux/store';
import LoginScreen from '../screens/auth/Login';
import { BodyLarge, margin, textSize, TitleLarge } from '../styles';
import { imageSize } from '../utils/helper';
import MyTabs from './TabNavigation';
import { IDrawerParamList } from './type';

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
      <Drawer.Screen name="MyTabs" options={{ drawerLabel: 'MyTabs Option' }} component={MyTabs} />
      {/* <Drawer.Screen name="LoginScreen" options={{ drawerLabel: 'Setting Screen Option' }} component={LoginScreen} /> */}
    </Drawer.Navigator>
  );
}
function CustomDrawerContent(props: DrawerContentComponentProps) {
  const currentBranchId = useSelector((state: RootState) => state.branch.currentBranchId);
  const {
    imageLink,
    adminEnableOrdering,
    branchCode,
    branchName,
    currentDate,
    hasCustomizedEngine,
    id,
    restaurantName,
    restaurantTitle,
    showInFoodiran,
    userFullName,
  } = currentBranchId;
  return (
    <DrawerContentScrollView {...props} style={{ paddingTop: 16 }}>
      {/* <Logo style={styles.logo} /> */}
      {imageLink && (
        <Image
          style={styles.logo}
          source={{
            uri: imageSize(imageLink, '80x80'),
          }}
        />
      )}
      <View style={styles.resDetails}>
        <TitleLarge>{userFullName}</TitleLarge>
        <BranchName>{`${restaurantTitle} ${restaurantName}${branchName ? ` (${branchName})` : ''}`}</BranchName>
      </View>
      <TouchableOpacity
        onPress={() => {
          dispatch(_Logout());
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
    marginTop: 16,
  },
  logo: {
    width: 80,
    height: 80,
    alignSelf: 'center',
  },
});
const BranchName = styled(BodyLarge)`
  color: ${(p) => p.theme.colors.Gray[50]};
`;
