import memoize from 'fast-memoize';
import styled from 'styled-components/native';
import { IIconStyleGen } from './type';

function iconStyleGenFunc(args: IIconStyleGen) {
  const { color, size, theme } = args;
  const iconColor: string = color ? color : theme.colors.Gray[0];
  const iconSize: number = size ? size : 24;
  const Container = styled.View`
    width: ${size ? size + 4 : 24}px;
    height: ${size ? size + 4 : 24}px;
    align-items: center;
    justify-content: center;
  `;
  return {
    Container,
    iconColor,
    iconSize,
  };
}

export const iconStyleGen = memoize(iconStyleGenFunc);
