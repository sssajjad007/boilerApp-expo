import type { NativeStackScreenProps } from '@react-navigation/native-stack';
export type RootStackParamList = {
  DashboardScreen: undefined; //{routeProps}
  ReportScreen: undefined;
  MenuScreen: undefined;
};
export type DashboardStack = {
  DashboardScreen: undefined; //{routeProps}
  DrawerNavigation: undefined;
};
export type ReportStack = {
  ReportScreen: undefined;
};
export type MenuStack = {
  MenuScreen: undefined;
};

export type DashboardScreenProps = NativeStackScreenProps<DashboardStack, 'DashboardScreen'>;
export type ReportScreenProps = NativeStackScreenProps<RootStackParamList, 'ReportScreen'>;
export type MenuScreenProps = NativeStackScreenProps<RootStackParamList, 'MenuScreen'>;
