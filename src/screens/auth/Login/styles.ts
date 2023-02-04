import { Platform, StyleSheet } from 'react-native';
import styled, { css } from 'styled-components/native';

export const TitleContainer = styled.View`
  align-items: flex-end;
  justify-content: center;
  height: 100px;
  width: 90%;
  align-self: center;
`;
export const InputContainer = styled.View`
  width: 90%;
  padding: 8px 0;
  align-self: center;
`;
export const ButtonContainer = styled.View<{ inset: number }>`
  width: 90%;
  align-self: center;
  padding-bottom: ${(p) => (Platform.OS === 'ios' ? (p.inset > 0 ? 0 : 24) : 24)}px; //fix for ios
  background-color: ${(p) => p.theme.colors.Gray.White};
  z-index: 10;
`;

export const Header = styled.View`
  width: 100%;
  height: 72px;
  flex-direction: row-reverse;
  justify-content: center;
  align-items: center;
  background-color: ${(p) => p.theme.colors.Gray.White};
  elevation: 3;
  shadow-color: black;
  shadow-opacity: 0.1;
  shadow-offset: 0px 4px;
  shadow-radius: 2px;
  z-index: 99;
`;
