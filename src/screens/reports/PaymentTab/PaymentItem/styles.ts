import { Platform } from 'react-native';
import styled from 'styled-components/native';
import { margin, TitleXLarge } from '../../../../styles';

export const Row = styled.View`
  width: 90%;
  align-self: center;
  flex-direction: row-reverse;
  justify-content: space-between;
  padding: ${(p: { noPadding?: boolean }) => (p.noPadding ? 0 : margin.normal)}px 0;
`;
export const LineHorizontal = styled.View`
  width: 90%;
  height: 1px;
  background-color: ${(p) => p.theme.colors.Gray[90]};
  align-self: center;
`;
export const LineDashed = styled.View`
  width: 90%;
  border-color: ${(p) => p.theme.colors.Gray[90]};
  align-self: center;
  border-width: 1px;
  border-style: dashed;
  margin-top: 16px;
  margin-bottom: 4px;
`;
export const TitlePrimary = styled(TitleXLarge)`
  color: ${(p) => p.theme.colors.Primary.Main};
`;
export const ButtonContainer = styled.View`
  width: 90%;
  align-self: center;
  padding: ${Platform.OS === 'ios' ? 24 : 24}px 0;
  background-color: ${(p) => p.theme.colors.Gray.White};
  z-index: 10;
`;
