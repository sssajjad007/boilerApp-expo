import { DefaultTheme } from 'styled-components/native';

export interface IRadioButtonProps {
  checked: boolean;
  size: number;
}

export interface IRadioButtonStyles {
  size: number;
  checked: boolean;
  theme: DefaultTheme;
}
