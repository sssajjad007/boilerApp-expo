import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MenuScreen from '../screens/menu';
import Category from '../screens/menu/Category';
import FoodList from '../screens/menu/FoodList';
import { MenuTab } from './type';

const menuStack = createNativeStackNavigator<MenuTab>();

export default function MenuNavigation() {
  return (
    <menuStack.Navigator initialRouteName={'MenuScreen'} screenOptions={{ headerShown: false }}>
      <menuStack.Screen name={'MenuScreen'} component={MenuScreen} />
      <menuStack.Screen name={'Category'} component={Category} />
      <menuStack.Screen name={'FoodList'} component={FoodList} />
    </menuStack.Navigator>
  );
}
