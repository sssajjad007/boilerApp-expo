import { BranchItemResponse } from '../../../api/types';

export interface IBranchItem {
  data: BranchItemResponse;
  currentBranchId: BranchItemResponse;
  close: () => void;
}
