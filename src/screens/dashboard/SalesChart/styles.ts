import styled from 'styled-components/native';
import { BodySmall, margin } from '../../../styles';

export const Wrapper = styled.View`
  width: 100%;
  padding: ${margin.normal}px 0;
  min-height: 270px;
`;
export const Actions = styled.View`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: row-reverse;
  padding: 0 ${margin.thin}px;
  margin-bottom: 30px;
`;

export const ActionWeek = styled.TouchableOpacity.attrs({ activeOpacity: 1 })`
  align-items: center;
  flex-direction: row-reverse;
`;

export const ActionText = styled(BodySmall)`
  padding: 0 ${margin.xThin}px;
  color: ${(p) => p.theme.colors.Gray[50]};
`;

export const CurrentWeek = styled(BodySmall)`
  color: ${(p) => p.theme.colors.Primary.Main};
`;
