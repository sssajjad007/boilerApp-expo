import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MenuScreen from '../screens/menu';
import { RootStackParamList } from './type';

const menuStack = createNativeStackNavigator<RootStackParamList>(); //need type

export default function menuNavigation() {
  return (
    <menuStack.Navigator initialRouteName={'DashboardScreen'}>
      <menuStack.Screen
        name={'MenuScreen'}
        component={MenuScreen}
        // options={{ ...headerOptions, title: 'ویرایش پروفایل' }}
      />
    </menuStack.Navigator>
  );
}
