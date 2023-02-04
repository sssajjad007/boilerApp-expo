import { AppTheme, UnicornModalsComponents } from './types';
import { useModals, useTheme } from 'react-native-unicorn-modals';

export function useAppModals() {
  return useModals<UnicornModalsComponents>();
}
export function useAppTheme() {
  return useTheme<AppTheme>();
}
