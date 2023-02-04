import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DashboardScreen from '../screens/dashboard';
import { DashboardTab } from './type';

const dashboardStack = createNativeStackNavigator<DashboardTab>();

export default function DashboardNavigation() {
  return (
    <dashboardStack.Navigator initialRouteName={'DashboardScreen'} screenOptions={{ headerShown: false }}>
      <dashboardStack.Screen name={'DashboardScreen'} component={DashboardScreen} />
    </dashboardStack.Navigator>
  );
}
