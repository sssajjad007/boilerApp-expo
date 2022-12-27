import styled from 'styled-components/native';
import { margin } from '../../../styles';

export const Container = styled.View`
  flex: 1;
`;
export const IconWrapper = styled.View`
  width: 90%;
  flex-direction: row-reverse;
  padding: ${margin.normal}px 0;
  align-self: center;
  align-items: center;
  justify-content: space-between;
`;
