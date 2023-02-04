import { IconEnums } from '../../components/Icon/type';

export interface IIemProps {
  title: string;
  icon: keyof typeof IconEnums;
  onPress: () => void;
}
