import { ActivityIndicator } from 'react-native';
import styled from 'styled-components/native';
import { BodyRegular, BodySmall, margin, TitleLarge, TitleRegular } from '../../../styles';

export const Wrapper = styled.View`
  width: 90%;
  justify-content: space-around;
  flex-direction: row-reverse;
  align-self: center;
`;
const Box = styled.TouchableOpacity.attrs({
  activeOpacity: 1,
})`
  height: 130px;
  /* width: 100px; */
  border-radius: ${margin.normal}px;
  padding: ${margin.normal}px;
`;
export const IncomeBox = styled(Box)`
  flex: 1;
  background-color: ${(p) => p.theme.colors.Success.Main};
  margin-left: ${margin.thin}px;
`;
export const OrderBox = styled(Box)`
  flex: 1;
  background-color: ${(p) => p.theme.colors.Info.Dark};
  margin-right: ${margin.thin}px;
`;
export const Body = styled(BodySmall)`
  color: ${(p) => p.theme.colors.Gray.White};
  padding-top: 8px;
  text-align: right;
`;
export const Title = styled(TitleLarge)`
  color: ${(p) => p.theme.colors.Gray.White};
  padding-top: 8px;
  text-align: right;
`;
export const Price = styled(BodyRegular)`
  color: ${(p) => p.theme.colors.Gray.White};
  position: absolute;
  bottom: 16px;
  left: 16px;
`;
export const Loading = styled(ActivityIndicator).attrs((p) => ({
  color: p.color || p.theme.colors.Gray.White,
  size: 'small',
}))`
  position: absolute;
  bottom: 16px;
  left: 16px;
`;
