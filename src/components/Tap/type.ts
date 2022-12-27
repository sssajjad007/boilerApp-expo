import { ReactNode } from 'react';

export interface ITapProps {
  children: ReactNode;
  onPress?: () => void;
  //   waitFor?: Ref<unknown> | Ref<unknown>[] | undefined;
}
