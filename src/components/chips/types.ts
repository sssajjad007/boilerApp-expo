import { PropsWithChildren } from 'react';
import { DefaultTheme } from 'styled-components/native';
import { IconEnums } from '../Icon/type';

export interface IChipsStyles {
  primaryMode?: boolean;
  selected: boolean;
  theme: DefaultTheme;
  backgroundColor?: string;
}
export type IChipsProps = PropsWithChildren<{
  primaryMode?: boolean;
  selected: boolean;
  backgroundColor?: string;
  IconRight: boolean;
  iconName?: keyof typeof IconEnums;
  onPress?: () => void;
  id: number;
  index: number;
}>;

export interface ISegmentProps extends Omit<IChipsProps, 'selected'> {
  items: Array<{ label: string; selected: boolean }>;
}
