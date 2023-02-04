import { BranchItemResponse } from '../../api/types';

export interface ITopBarProps {
  title?: string;
  isMenuIcon?: boolean;
  branchListAction?: boolean;
  currentBranchId?: BranchItemResponse;
  handlePresentModalPress?: () => void;
  isBackIcon?: boolean;
  isCloseIcon?: boolean;
  isSearchIcon?: boolean;
  pageSheet?: boolean;
  isEditIcon?: boolean;
  onEditPress?: () => void;
  onSearchPress?: () => void;
}
