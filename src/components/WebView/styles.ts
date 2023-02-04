import Animated from 'react-native-reanimated';
import styled from 'styled-components/native';

export const FadeView = styled(Animated.View).attrs({ pointerEvents: 'none' })`
  position: absolute;
  z-index: 1;
  top: 0px;
  left: 0;
  right: 0;
  bottom: 0;
  justify-content: center;
  align-items: center;
`;
export const Loading = styled.ActivityIndicator.attrs({
  size: 'large',
})`
  flex: 1;
  width: 100%;
  background-color: ${(p) => p.theme.colors.Gray.White};
  color: ${(p) => p.theme.colors.Primary.Main};
`;
export const Error = styled.View`
  position: absolute;
  z-index: 2;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  align-items: center;
  justify-content: center;
  background-color: ${(p) => p.theme.colors.Gray.White};
`;
