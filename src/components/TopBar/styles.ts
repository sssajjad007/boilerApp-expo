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
  shadow-color: black;
  shadow-opacity: 0.1;
  shadow-offset: 0px 4px;
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
  top: ${(p: { top: number }) => 56 + p.top}px;
  width: 100%;
  height: 40px;
  flex-direction: row-reverse;
  background-color: ${(p) => p.theme.colors.Error.Dark};
  z-index: 1;
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
