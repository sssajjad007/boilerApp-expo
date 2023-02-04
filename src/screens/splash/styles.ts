import { Platform } from 'react-native';
import styled from 'styled-components/native';

export const ButtonContainer = styled.View`
  width: 90%;
  align-self: center;
  padding-bottom: ${(p) => (Platform.OS === 'ios' ? 24 : 24)}px; //fix for ios
  background-color: ${(p) => p.theme.colors.Gray.White};
  z-index: 10;
`;
