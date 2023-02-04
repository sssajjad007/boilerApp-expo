import Animated from 'react-native-reanimated';
import styled from 'styled-components/native';
import { margin } from '../../styles';
export const TopBarContainer = styled.View`
  width: 100%;
  height: 56px;
  flex-direction: row-reverse;
  justify-content: space-between;
  align-items: center;
  padding: 0 5%;
  shadow-color: ${(p) => p.theme.colors.Gray[50]};
  shadow-opacity: 0.1;
  shadow-offset: 0px 3px;
  shadow-radius: 2px;
  background-color: ${(p) => p.theme.colors.Gray.White};
  elevation: 3;
  z-index: 2;
`;
export const EmptyIcon = styled.View`
  width: 24px;
  height: 24px;
`;
export const NetInfoContainer = styled(Animated.View)`
  position: absolute;
  min-width: 50%;
  align-self: center;
  height: 42px;
  bottom: -60px;
  flex-direction: row-reverse;
  align-items: center;
  justify-content: center;
  background-color: ${(p) => p.theme.colors.Gray.White};
  border-radius: 8px;
  shadow-color: ${(p) => p.theme.colors.Gray.Black};
  shadow-opacity: 0.4;
  shadow-offset: 0px 3px;
  shadow-radius: 4px;
  elevation: 3;
  z-index: 20;
`;
export const IconContainer = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;
export const InfoContainer = styled.View`
  flex: 1;
  width: 90%;
  justify-content: center;
  padding-right: ${margin.normal}px;
`;
