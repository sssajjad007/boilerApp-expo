import styled from 'styled-components/native';
import { BodyLarge, TitleLarge } from '../../styles';

export const Message = styled(BodyLarge)`
  width: 80%;
  color: ${(p) => p.theme.colors.Gray[40]};
  padding-top: 12px;
  text-align: center;
`;
export const Title = styled(TitleLarge)`
  color: ${(p) => p.theme.colors.Gray[40]};
  padding-top: 12px;
`;
export const ButtonContainer = styled.View`
  padding-top: 18px;
`;
