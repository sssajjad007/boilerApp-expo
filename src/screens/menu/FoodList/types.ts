import { FoodItem } from '../../../api/types';

export interface IFoodItemComponentProps {
  data: FoodItem;
  editMode?: boolean;
  isDragActive?: boolean;
  onDrag?: () => void;
}
