import styled from 'styled-components/native';

export const Item = styled.TouchableOpacity.attrs({ activeOpacity: 0.8 })`
  min-height: 60px;
  width: 90%;
  align-self: center;
  flex-direction: row-reverse;
  align-items: center;
  justify-content: space-between;
`;
export const TitleContainer = styled.View`
  min-width: 70%;
  flex-direction: row-reverse;
  align-items: center;
`;
