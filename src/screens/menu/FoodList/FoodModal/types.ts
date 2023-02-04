import { RouteProp } from '@react-navigation/native';
import { FoodItem } from '../../../../api/types';

export type IScreenParamList = {
  FoodModal: { data: FoodItem };
};
export type FoodModalRouteProp = RouteProp<IScreenParamList, 'FoodModal'>;
