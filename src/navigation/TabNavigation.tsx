import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { DelinoIcon } from '../components/Icon';
import MenuScreen from '../screens/menu';
import { RootStackParamList } from './type';
import { ButtonTabLabel } from '../styles';
import { useTheme } from 'styled-components/native';
import ReportNavigation from './reportStack';
import DashboardNavigation from './dashboardStack';
import MenuNavigation from './menuStack';

type ITabParamList = {
  MyTabs: undefined;
};
const Tab = createBottomTabNavigator<RootStackParamList>();
const Stack = createNativeStackNavigator<ITabParamList>();

export default function MyTabs() {
  const theme = useTheme();
  return (
    <Tab.Navigator backBehavior={'initialRoute'} initialRouteName="DashboardTab" screenOptions={{ lazy: false }}>
      <Tab.Screen
        name="MenuTab"
        component={MenuNavigation}
        options={({ navigation }) => ({
          // tabBarStyle: { display: 'none' },
          headerShown: false,
          tabBarLabel: ({ focused }) => {
            return <ButtonTabLabel focused={focused}>{'منوی غذایی'}</ButtonTabLabel>;
          },
          tabBarIcon: ({ color, size, focused }: { focused: boolean; color: string; size: number }) => (
            <DelinoIcon
              name={'icon_rest-menu'}
              color={focused ? theme.colors.Info.Main : theme.colors.Gray[50]}
              size={size}
            />
          ),
        })}
      />
      <Tab.Screen
        name="ReportTab"
        component={ReportNavigation}
        options={({ navigation }) => ({
          headerShown: false,
          tabBarLabel: ({ focused }) => {
            return <ButtonTabLabel focused={focused}>{'گزارشات'}</ButtonTabLabel>;
          },
          tabBarIcon: ({ color, size, focused }: { focused: boolean; color: string; size: number }) => (
            <DelinoIcon
              name={'icon_orders'}
              color={focused ? theme.colors.Info.Main : theme.colors.Gray[50]}
              size={size}
            />
          ),
        })}
      />
      <Tab.Screen
        name="DashboardTab"
        component={DashboardNavigation}
        options={({ navigation }) => ({
          headerShown: false,
          tabBarLabel: ({ focused }) => {
            return <ButtonTabLabel focused={focused}>{'داشبورد'}</ButtonTabLabel>;
          },
          tabBarIcon: ({ color, size, focused }: { focused: boolean; color: string; size: number }) => (
            <DelinoIcon
              name={'icon_dashboard'}
              color={focused ? theme.colors.Info.Main : theme.colors.Gray[50]}
              size={size}
            />
          ),
          // tabBarBadge: 3,
        })}
      />
    </Tab.Navigator>
  );
}

// export const RootScreen = () => {
//   return (
//     <BottomSheetModalProvider>
//       <Stack.Navigator initialRouteName="MyTabs" screenOptions={{ headerShown: false }}>
//         <Stack.Screen name="MyTabs" component={MyTabs} />
//       </Stack.Navigator>
//     </BottomSheetModalProvider>
//   );
// };
