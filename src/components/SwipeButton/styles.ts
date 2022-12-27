import Animated from 'react-native-reanimated';
import styled, { DefaultTheme } from 'styled-components/native';
import { BodyRegular } from '../../styles';

export const Container = styled.TouchableOpacity.attrs({
  activeOpacity: 1,
})`
  width: ${(p: { wide: boolean }) => (p.wide ? '100%' : '168px')};
  flex-direction: row;
  min-width: 174px;
  height: 40px;
  border-radius: 8px;
  align-items: center;
  justify-content: center;
  /* margin-left: 16px; */
  background-color: ${(p) => p.theme.colors.Gray[100]};
`;
export const SwipeAbleButton = styled(Animated.View)`
  position: absolute;
  left: 0;
  top: 4px;
  width: 50%;
  height: 32px;
  border-radius: 8px;
  background-color: ${(p) => p.theme.colors.Gray.White};
  shadow-color: black;
  shadow-opacity: 0.2;
  shadow-offset: 0px 1px;
  shadow-radius: 2px;
  elevation: 3;
  margin: 0 4px;
`;
export const LeftText = styled.View`
  flex: 1;
  align-items: center;
  z-index: 999;
`;
export const RightText = styled.View`
  flex: 1;
  align-items: center;
  z-index: 999;
`;
export const TitleButton = styled(BodyRegular)`
  color: ${(p: { active: boolean; theme: DefaultTheme }) =>
    p.active ? p.theme.colors.Gray.Black : p.theme.colors.Gray[50]};
`;
