import { PropsWithChildren } from 'react';

export type IRootContainer = PropsWithChildren<{
  isMenuIcon: boolean;
  branchListAction: boolean;
  title?: string;
}>;
