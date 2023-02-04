import { Platform } from 'react-native';
import styled from 'styled-components/native';
import { margin } from '../../../styles';

export const Container = styled.View`
  flex: 1;
`;
export const IconWrapper = styled.View`
  width: 90%;
  flex-direction: row-reverse;
  /* padding: ${margin.normal}px 0; */
  align-self: center;
  align-items: center;
  justify-content: space-between;
`;
export const ButtonContainer = styled.View`
  width: 90%;
  align-self: center;
  margin-bottom: ${Platform.OS === 'ios' ? 44 : 16}px;
  background-color: ${(p) => p.theme.colors.Gray.White};
  z-index: 10;
`;
