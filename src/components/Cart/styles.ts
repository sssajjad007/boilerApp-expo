import styled from 'styled-components/native';
import { margin, radius } from '../../styles';

export const CardContainer = styled.View`
  width: 90%;
  border-radius: ${radius.large}px;
  background-color: ${(p) => p.theme.colors.Gray.White};
  margin: ${margin.normal}px 0;
  align-self: center;
  shadow-color: black;
  shadow-radius: 4px;
  shadow-opacity: 0.2;
  shadow-offset: 0 0;
  elevation: 3;
`;
export const Header = styled.View`
  width: 100%;
  height: 50px;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  padding: 0 ${margin.normal}px;
  border-bottom-color: ${(p) => p.theme.colors.Gray[90]};
  border-bottom-width: 1px;
`;
export const Content = styled.View`
  width: 100%;
  padding: 0 ${margin.thin}px;
`;
