import Animated from 'react-native-reanimated';
import styled from 'styled-components/native';
import { BodyRegular, margin, TitleRegular } from '../../../../styles';

export const FoodItem = styled(Animated.View)<{ isDragActive: boolean }>`
  width: 90%;
  height: 64px;
  align-self: center;
  flex-direction: row-reverse;
  margin: ${margin.thin}px;
  shadow-color: ${(p) => p.theme.colors.Gray[0]};
  shadow-radius: ${(p) => (p.isDragActive ? 8 : 2)}px;
  shadow-opacity: ${(p) => (p.isDragActive ? 0.3 : 0.2)};
  shadow-offset: 0 0;
  /* transform: scale(${(p) => (p.isDragActive ? 1.05 : 1)}); */
  elevation: ${(p) => (p.isDragActive ? 6 : 3)};
  border-radius: 8px;
  background-color: ${(p) => p.theme.colors.Gray.White};
`;
export const ImageContainer = styled.View`
  width: 80px;
  align-items: center;
  justify-content: center;
`;
export const Wrapper = styled.View`
  flex: 4;
  align-items: flex-end;
  justify-content: space-evenly;
  padding-right: ${margin.thin}px;
`;
export const Price = styled(BodyRegular)`
  color: ${(p) => p.theme.colors.Gray[50]};
`;
export const IconContainer = styled.TouchableOpacity.attrs({
  activeOpacity: 0.9,
  delayLongPress: 200,
})`
  flex: 1;
  align-items: center;
  justify-content: center;
  flex-direction: row-reverse;
`;
// export const IconDragAble = styled.TouchableOpacity.attrs({
//   activeOpacity: 0.9,
//   delayLongPress: 200,
// })`
//   flex: 1;
//   align-items: center;
//   justify-content: center;
// `;

export const TitleItem = styled(TitleRegular)<{ isFoodEnable: boolean }>`
  text-align: right;
  text-decoration: ${(p) => (p.isFoodEnable ? 'none' : 'line-through')};
  text-decoration-color: ${(p) => p.theme.colors.Primary.Main};
  color: ${(p) => (p.isFoodEnable ? p.theme.colors.Gray[0] : p.theme.colors.Error.Main)};
`;

export const OutOrder = styled.View`
  position: absolute;
  top: 20px;
  right: 42px;
  width: 70px;
  height: 20px;
  align-items: center;
  justify-content: center;
  border-width: 1px;
  border-radius: 4px;
  border-color: ${(p) => p.theme.colors.Gray[90]};
`;
