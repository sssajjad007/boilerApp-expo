import styled, { DefaultTheme } from 'styled-components/native';
import { margin, TitleRegular } from '../../../styles';

export const Item = styled.TouchableOpacity.attrs((p) => ({
  activeOpacity: 1,
}))`
  width: 90%;
  align-self: center;
  height: 56px;
  align-items: center;
  margin: ${margin.thin}px 0;
  padding: 0 ${margin.normal}px;
  flex-direction: row-reverse;
  justify-content: space-between;
  shadow-color: black;
  shadow-radius: 2px;
  shadow-opacity: 0.16;
  shadow-offset: 0px 1px;
  elevation: 2;
  border-radius: 10px;
  background-color: ${(p) => p.theme.colors.Gray.White};
`;
export const ItemText = styled(TitleRegular)`
  color: ${(p: { selected: boolean; theme: DefaultTheme }) =>
    p.selected ? p.theme.colors.Primary.Main : p.theme.colors.Gray.Black};
`;
