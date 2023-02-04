import { StyleProp, ViewStyle } from 'react-native';
import { IconEnums } from '../Icon/type';

export interface IEmptyStateProps {
  iconName?: keyof typeof IconEnums;
  message: string;
  style?: StyleProp<ViewStyle>;
  image?: 'sales' | 'product' | 'payment' | 'update' | 'network';
  title?: string;
  onPress?: () => void;
}
