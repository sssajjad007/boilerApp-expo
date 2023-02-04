import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { FoodItem, RestPaymentReport } from '../api/types';
export type RootStackParamList = {
  DashboardTab: undefined; //{routeProps}
  ReportTab: undefined;
  MenuTab: undefined;
};
export type DashboardTab = {
  DashboardScreen: undefined; //{routeProps}
  DrawerNavigation: undefined;
};
export type ReportTab = {
  ReportScreen: undefined;
  PaymentDetails: { data: RestPaymentReport };
  WebView: { url: string; title: string; loadingImmediately?: boolean };
};
export type MenuTab = {
  MenuScreen: undefined;
  FoodList: undefined;
  // FoodModal: { data: FoodItem };
  Category: undefined;
};

export type DashboardScreenProps = NativeStackScreenProps<DashboardTab>;
export type ReportScreenProps = NativeStackScreenProps<ReportTab>;
export type MenuScreenProps = NativeStackScreenProps<MenuTab>;

export type PaymentDetailsProps = NativeStackScreenProps<ReportTab, 'PaymentDetails'>;
export type WebViewProps = NativeStackScreenProps<ReportTab, 'WebView'>;
// export type FoodModalViewProps = NativeStackScreenProps<MenuTab, 'FoodModal'>;
export type IDrawerParamList = {
  MyTabs: undefined;
  LoginScreen: undefined;
};
