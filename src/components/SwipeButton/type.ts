export interface ISwipeButtonProps {
  onPress?: () => void;
  actionLeft: () => void;
  actionRight: () => void;
  wide?: boolean;
}
