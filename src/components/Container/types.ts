import { PropsWithChildren } from 'react';

export type IRootContainer = PropsWithChildren<{
  isMenuIcon?: boolean;
  branchListAction?: boolean;
  title?: string;
  isBackIcon?: boolean;
  isSearchIcon?: boolean;
  isCloseIcon?: boolean;
  pageSheet?: boolean;
  isEditIcon?: boolean;
  loading?: boolean;
  onEditPress?: () => void;
  onSearchPress?: () => void;
}>;
