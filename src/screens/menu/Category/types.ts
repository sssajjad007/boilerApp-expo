import { CategoryItem } from '../../../api/types';

export interface ICategoryItemComponentProps {
  data: CategoryItem;
  isDragActive?: boolean;
  onDrag?: () => void;
}
