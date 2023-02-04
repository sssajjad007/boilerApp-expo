import Animated from 'react-native-reanimated';
import styled from 'styled-components/native';
import { margin } from '../../../styles';

export const CategoryItem = styled(Animated.View)<{ isDragActive?: boolean; isVisible?: boolean }>`
  width: 90%;
  height: 64px;
  align-self: center;
  flex-direction: row-reverse;
  align-items: center;
  margin: ${margin.thin}px;
  shadow-color: ${(p) => p.theme.colors.Gray[0]};
  shadow-radius: ${(p) => (p.isDragActive ? 8 : 2)}px;
  shadow-opacity: ${(p) => (p.isDragActive ? 0.2 : 0.2)};
  shadow-offset: 0 0;
  elevation: ${(p) => (p.isDragActive ? 5 : 3)};
  border-radius: 8px;
  opacity: ${(p) => (p.isVisible ? 1 : 0.6)};
  background-color: ${(p) => p.theme.colors.Gray.White};
`;
export const IconContainer = styled.TouchableOpacity.attrs({
  activeOpacity: 0.9,
  delayLongPress: 200,
})`
  margin: 0 16px;
`;
