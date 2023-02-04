import styled from 'styled-components/native';
import { BodyLarge, margin } from '../../../../styles';
import { width } from '../../../../utils/deviceUi';

export const ImageContainer = styled.TouchableOpacity.attrs({ activeOpacity: 1 })`
  width: 100%;
  height: ${width / 1.6}px;
`;
export const DetailsContainer = styled.View`
  min-height: 160px;
  padding: ${margin.normal}px;
`;
export const Row = styled.View`
  padding: ${margin.thin}px 0;
  flex-direction: row-reverse;
  justify-content: space-between;
  align-items: center;
`;
export const RowWeek = styled.View`
  width: 100px;
  flex-direction: row-reverse;
  align-items: center;
  padding: 8px;
`;
export const WeekContainer = styled.View`
  margin-top: 8px;
  flex-direction: row-reverse;
  flex-wrap: wrap;
`;
export const Col = styled.View`
  align-items: flex-end;
`;
export const DeleteIcon = styled.TouchableOpacity.attrs({
  activeOpacity: 0.8,
})`
  position: absolute;
  width: 120px;
  height: 40px;
  left: 56px;
  bottom: 4px;
  border-radius: 20px;
  align-items: center;
  justify-content: space-evenly;
  flex-direction: row-reverse;
  background-color: ${(p) => p.theme.colors.Gray.White};
`;
export const UploadIcon = styled.TouchableOpacity.attrs({
  activeOpacity: 0.8,
})`
  position: absolute;
  width: 40px;
  height: 40px;
  left: 8px;
  bottom: 8px;
  border-radius: 20px;
  align-items: center;
  justify-content: center;
  background-color: ${(p) => p.theme.colors.Gray.White};
  shadow-color: ${(p) => p.theme.colors.Gray[50]};
  shadow-opacity: 0.2;
  shadow-offset: 1px 1px;
  shadow-radius: 2px;
  elevation: 2;
`;

export const Item = styled.TouchableOpacity.attrs({
  activeOpacity: 1,
})`
  width: 90%;
  align-items: center;
  align-self: center;
  justify-content: flex-start;
  flex-direction: row-reverse;
  padding: 16px ${margin.thin}px;
`;
export const LineHorizontal = styled.View`
  width: 90%;
  height: 1px;
  background-color: ${(p) => p.theme.colors.Gray[90]};
  align-self: center;
  margin: 8px 0;
`;
export const ErrorText = styled(BodyLarge)`
  color: ${(p) => p.theme.colors.Error.Main};
  padding-right: ${margin.normal}px;
`;
export const TitleCardItem = styled(BodyLarge)`
  color: ${(p) => p.theme.colors.Gray[40]};
`;

export const TitleItem = styled(BodyLarge)`
  padding-right: ${margin.normal}px;
`;
