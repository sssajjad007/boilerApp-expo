import styled from 'styled-components/native';
import { BodyLarge, TitleLarge } from '../../styles';

export const EmptyTitle = styled(TitleLarge)`
  color: ${(p) => p.theme.colors.Gray[40]};
`;
export const EmptyDescription = styled(BodyLarge)`
  color: ${(p) => p.theme.colors.Gray[40]};
  width: 270px;
  padding-top: 8px;
  padding-bottom: 16px;
  text-align: center;
`;
