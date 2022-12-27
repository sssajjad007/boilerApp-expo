import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { DelinoIcon } from '../components/Icon';
import DashboardScreen from '../screens/dashboard';
import MenuScreen from '../screens/menu';
import ReportScreen from '../screens/reports';
import { RootStackParamList } from './type';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';

type ITabParamList = {
  MyTabs: undefined;
};
const Tab = createBottomTabNavigator<RootStackParamList>();
const Stack = createNativeStackNavigator<ITabParamList>();

export default function MyTabs() {
  return (
    <Tab.Navigator backBehavior={'initialRoute'} initialRouteName="DashboardScreen" screenOptions={{ lazy: false }}>
      <Tab.Screen
        name="MenuScreen"
        component={MenuScreen}
        options={({ navigation }) => ({
          headerShown: false,
          tabBarLabel: 'Menu',
          tabBarIcon: ({ color, size }: { focused: boolean; color: string; size: number }) => (
            <DelinoIcon name={'icon_dish'} color={color} size={size} />
          ),
        })}
      />
      <Tab.Screen
        name="ReportScreen"
        component={ReportScreen}
        options={({ navigation }) => ({
          headerShown: false,
          tabBarLabel: 'Report',
          tabBarIcon: ({ color, size }: { focused: boolean; color: string; size: number }) => (
            <DelinoIcon name={'icon_terms'} color={color} size={size} />
          ),
        })}
      />
      <Tab.Screen
        name="DashboardScreen"
        component={DashboardScreen}
        options={({ navigation }) => ({
          headerShown: false,
          tabBarLabel: 'Dashboard',
          tabBarIcon: ({ color, size }: { focused: boolean; color: string; size: number }) => (
            <DelinoIcon name={'icon_grid-f'} color={color} size={size} />
          ),
          tabBarBadge: 3,
        })}
      />
    </Tab.Navigator>
  );
}
export const RootScreen = () => {
  return (
    <BottomSheetModalProvider>
      <Stack.Navigator initialRouteName="MyTabs" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="MyTabs" component={MyTabs} />
      </Stack.Navigator>
    </BottomSheetModalProvider>
  );
};
