import styled from 'styled-components/native';
import { BodySmall } from '../../styles';

export const Wrapper = styled.View`
  margin-left: -25px;
`;
export const TooltipContainer = styled.View.attrs((p: { left: number; ssss: number }) => {})`
  top: ${(p) => p.top + 4}px;
  left: ${(p: { left: number }) => p.left - 65}px;
  position: absolute;
  width: 130px;
  background-color: ${(p) => p.theme.colors.Gray.White};
  border-radius: 10px;
  padding: 5px 10px;
  /* flex-direction: column; */
  align-items: center;
  shadow-color: black;
  shadow-radius: 5px;
  shadow-opacity: 0.2;
  shadow-offset: 0 0;
  elevation: 3;
`;

export const TooltipCount = styled(BodySmall)`
  text-align: left;
`;

export const TooltipLabel = styled(BodySmall)`
  flex-direction: row;
`;
