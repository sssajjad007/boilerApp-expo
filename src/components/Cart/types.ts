import { PropsWithChildren } from 'react';

export type ICardProps = PropsWithChildren<{
  title?: string;
  onPress?: () => void;
  titleButton?: string;
}>;
