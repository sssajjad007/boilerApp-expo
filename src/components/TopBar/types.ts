import { BranchItemResponse } from '../../api/types';

export interface ITopBarProps {
  title?: string;
  isMenuIcon?: boolean;
  branchListAction?: boolean;
  currentBranchId: BranchItemResponse;
  handlePresentModalPress: () => void;
}
