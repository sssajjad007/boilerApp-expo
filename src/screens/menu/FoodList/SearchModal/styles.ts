import styled from 'styled-components/native';

export const TopBarContainer = styled.View`
  width: 100%;
  height: 70px;
  flex-direction: row-reverse;
  justify-content: space-between;
  align-items: center;
  padding: 0 5%;
  shadow-color: ${(p) => p.theme.colors.Gray[50]};
  background-color: ${(p) => p.theme.colors.Gray.White};
  shadow-opacity: 0.1;
  shadow-offset: 0px 3px;
  shadow-radius: 2px;
  elevation: 3;
  z-index: 10;
`;
export const CancelButton = styled.View`
  width: 100px;
`;
export const InputContainer = styled.View`
  width: 80%;
  flex-direction: row-reverse;
  justify-content: center;
`;
