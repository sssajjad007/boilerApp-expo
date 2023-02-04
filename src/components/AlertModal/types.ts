import type { AlertData, MenuData, Theme } from 'react-native-unicorn-modals';

// Components
export interface CustomModalData {
  title: string;
  description: string;
  buttons: ButtonsType[];
  autoHide?: boolean;
}
export interface ButtonsType {
  title: string;
  onPress: () => void;
}
export interface UnicornModalsComponents {
  alert: AlertData;
  customModal: CustomModalData;
  menu: MenuData;
}

// Theme
interface AdditionalThemeProps {
  buttonColor: string;
}
export type AppTheme = Theme<AdditionalThemeProps>;
