import styled from 'styled-components/native';
import { BodyLarge, BodySmall, margin, TitleLarge, TitleRegular } from '../../../styles';

export const PaymentContainer = styled.View`
  width: 100%;
  min-height: 120px;
  flex-direction: row-reverse;
`;
export const PaymentItem = styled.View`
  flex: 1;
  align-items: center;
  justify-content: space-evenly;
`;
export const LineHorizontal = styled.View`
  width: 100%;
  height: 1px;
  background-color: ${(p) => p.theme.colors.Gray[90]};
`;
export const LineVertical = styled.View`
  width: 1px;
  height: 80%;
  align-self: center;
  background-color: ${(p) => p.theme.colors.Gray[90]};
`;
export const PaymentTitle = styled(TitleRegular)`
  color: ${(p) => p.theme.colors.Primary.Main};
`;
export const DetailsTitle = styled(BodySmall)`
  color: ${(p) => p.theme.colors.Gray[50]};
`;
export const Row = styled.View`
  flex-direction: row-reverse;
  align-items: center;
  justify-content: space-between;
  padding: 0 24px;
  width: 100%;
`;
export const DetailContainer = styled.View`
  width: 100%;
  min-height: 120px;
  justify-content: space-between;
  align-items: center;
  margin: ${margin.normal}px 0;
`;

export const Col = styled.View`
  flex: 1;
  flex-direction: column;
  padding: 0 ${margin.normal}px;
  justify-content: space-evenly;
`;
export const LegendContainer = styled.View`
  height: 160px;
`;
export const WhiteCircle = styled.View`
  position: absolute;
  width: 80px;
  height: 80px;
  border-radius: 40px;
  background-color: ${(p) => p.theme.colors.Gray.White};
  z-index: 100;
`;
