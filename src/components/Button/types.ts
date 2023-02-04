import { PropsWithChildren, ReactElement, Ref } from 'react';
import { RectButton } from 'react-native-gesture-handler';
import { DefaultTheme } from 'styled-components/native';
import { IconEnums } from '../Icon/type';

export type tMode = 'Filled' | 'Outlined' | 'Text';

interface IIconProps {
  color: string;
  size: number;
}

export type tSize = 'Small' | 'Default' | 'Large';

export type IButtonProps = PropsWithChildren<{
  mode: tMode;
  size: tSize;
  onPress: () => void;
  loading?: boolean;
  IconRight?: boolean;
  IconLeft?: boolean;
  iconName?: keyof typeof IconEnums;
  disabled?: boolean;
  disabledWithAction?: boolean;
  textColor?: string;
  backgroundColor?: string;
  fullRadius?: boolean;
  iconSize?: number;
  minWidth?: number;
  gestureDisabled?: boolean;
  maxWidth?: number;
}>;

export interface IActivityProps {
  mode: tMode;
  size: tSize; //replace with tSize
  activityColor?: string;
  hasIcon?: boolean;
}

export type IButtonStyles = PropsWithChildren<{
  mode: tMode;
  size: tSize;
  disabled?: boolean;
  textColor?: string;
  backgroundColor?: string;
  fullRadius?: boolean;
  theme: DefaultTheme;
  IconRight?: boolean;
  IconLeft?: boolean;
  minWidth?: number;
  maxWidth?: number;
}>;
