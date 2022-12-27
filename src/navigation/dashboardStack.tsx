import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DashboardScreen from '../screens/dashboard';

type IDashboardStackParamList = {
  DashboardScreen: undefined;
};
const dashboardStack = createNativeStackNavigator<IDashboardStackParamList>();

export default function dashboardNavigation() {
  return (
    <dashboardStack.Navigator initialRouteName={'DashboardScreen'}>
      <dashboardStack.Screen name={'DashboardScreen'} component={DashboardScreen} />
    </dashboardStack.Navigator>
  );
}
