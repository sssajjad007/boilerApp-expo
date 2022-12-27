import { StyleSheet } from 'react-native';
import styled, { DefaultTheme } from 'styled-components/native';
import { BodyLarge, BodyRegular, margin } from '../../styles';

export const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: 'white',
    shadowColor: 'black',
    shadowRadius: 4,
    shadowOpacity: 0.2,
    elevation: 3,
  },
});
export const ActionBar = styled.View`
  width: 100%;
  height: 40px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  background-color: ${(p) => p.theme.colors.Gray.White};
  z-index: 10;
  align-self: center;
  padding: 0 5%;
`;

export const TabBarLabel = styled(BodyLarge)`
  color: ${(p: { theme: DefaultTheme; selected: boolean }) =>
    p.selected ? p.theme.colors.Primary.Main : p.theme.colors.Gray[50]};
`;
export const CalendarButton = styled.TouchableOpacity.attrs(() => ({
  activeOpacity: 0.9,
}))`
  height: 40px;
  min-width: 40px;
  flex-direction: row-reverse;
  align-items: center;
  justify-content: flex-start;
  padding: 0 ${margin.thin}px;
  background-color: ${(p) => p.theme.colors.Gray[90]};
  border-radius: 8px;
`;
export const DateText = styled(BodyRegular)`
  padding: 0 ${margin.normal}px;
`;
