import React, { forwardRef } from 'react';
import { useTheme } from 'styled-components/native';
import { useThrottled } from '../../utils';
import { Tap } from '../Tap';
import { iconStyleGen } from './styles';
import { IIconButtonProps } from './type';

function IconButtonComponent(props: IIconButtonProps) {
  const { Icon, onPress, color, size } = props;
  const theme = useTheme();
  const { Container, iconColor, iconSize } = iconStyleGen({
    color,
    size,
    theme,
  });
  const { onTouchablePress } = useThrottled();
  return (
    <Tap
      onPress={() => {
        onTouchablePress(onPress);
      }}>
      <Container>
        <Icon color={iconColor} size={iconSize} />
      </Container>
    </Tap>
  );
}

export const IconButton = IconButtonComponent;
