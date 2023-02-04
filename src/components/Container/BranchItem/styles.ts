import styled, { DefaultTheme } from 'styled-components/native';
import { margin, TitleRegular } from '../../../styles';

export const ItemText = styled(TitleRegular)`
  color: ${(p: { selected: boolean; theme: DefaultTheme }) =>
    p.selected ? p.theme.colors.Primary.Main : p.theme.colors.Gray.Black};
`;
export const Item = styled.TouchableOpacity`
  width: 100%;
  flex-direction: row-reverse;
  align-items: center;
  justify-content: space-between;
  padding: ${margin.normal}px;
  /* border-bottom-width: 1px; */
  /* border-color: ${(p) => p.theme.colors.Gray[90]}; */
`;
export const LineHorizontal = styled.View`
  width: 90%;
  height: 1px;
  background-color: ${(p) => p.theme.colors.Gray[90]};
  align-self: center;
`;
