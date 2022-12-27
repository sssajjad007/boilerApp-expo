import { ReactNode, ReactElement } from 'react';
import type { BorderlessButtonProps } from 'react-native-gesture-handler';
import { DefaultTheme } from 'styled-components/native';

export interface IIconProps {
  size: number;
  color: string;
}

export interface IIconButtonProps {
  onPress: () => void;
  Icon: (props: IIconProps) => ReactElement;
  color?: string;
  size?: number;
}

export interface IIconStyleGen {
  color?: string;
  size?: number;
  theme: DefaultTheme;
}

export interface IBorderlessProps extends BorderlessButtonProps {
  children: ReactNode;
}
