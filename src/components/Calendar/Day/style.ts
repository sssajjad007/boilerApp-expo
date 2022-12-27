import styled, { css } from 'styled-components/native';

export const Container = styled.TouchableOpacity`
  height: 36px;
  width: 100%;
  align-items: center;
`;
export type IWrapperProps = {
  single?: boolean;
  betweenDay?: boolean;
  startingDay?: boolean;
  endingDay?: boolean;
};
export const Wrapper = styled.View<IWrapperProps>`
  height: 44px;
  justify-content: center;
  z-index: 10;
  overflow: hidden;
  width: ${(p) => (p.single ? '44px' : '100%')};

  ${(p) =>
    (p.single || p.betweenDay || p.startingDay || p.endingDay) &&
    css`
      background-color: ${p.theme.colors.Primary.Main};
    `}

  ${(p) =>
    p.single &&
    css`
      border-radius: 22px;
    `}

	${(p) =>
    p.startingDay &&
    css`
      border-top-left-radius: 22px;
      border-bottom-left-radius: 22px;
    `}

	${(p) =>
    p.endingDay &&
    css`
      border-top-right-radius: 22px;
      border-bottom-right-radius: 22px;
    `}
`;

// const getDayColor = ({ state, selected }) => {
//   if (selected) {
//     return theme.white;
//   } else if (state === 'disabled') {
//     return theme.gray.xLight;
//   } else if (state === 'today') {
//     return theme.link;
//   } else {
//     return theme.text;
//   }
// };
export type ITextProps = {
  state: '' | 'disabled' | 'today' | 'selected';
  selected: boolean;
};
export const Text = styled.Text<ITextProps>`
  text-align: center;
  color: ${(p) =>
    (p.selected && p.theme.colors.Gray.White) ||
    (p.state === 'disabled' && p.theme.colors.Gray[70]) ||
    (p.state === 'today' && p.theme.colors.Secondary.Main) ||
    p.theme.colors.Gray.Black};
`;
