import { ReactNode } from 'react';

export interface ISelectButtonProps {
  id?: string;
  mode: 'checkbox' | 'radio';
  children?: ReactNode;
  selected: boolean;
  size: number;
  onPress?: (id: string) => void;
}
