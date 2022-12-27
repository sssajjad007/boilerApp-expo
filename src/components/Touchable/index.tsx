import React, { forwardRef, Ref } from 'react';
import { StyleSheet } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import { useThrottled } from '../../utils';
import { ITouchableProps } from './type';

function TouchableComponent(props: ITouchableProps, ref: Ref<RectButton>) {
  const { rippleColor, onPress } = props;
  const { onTouchablePress } = useThrottled();
  return (
    <RectButton
      ref={ref}
      onPress={() => {
        onTouchablePress(onPress);
      }}
      rippleColor={rippleColor}
      style={StyleSheet.absoluteFill}
    />
  );
}

export const Touchable = forwardRef(TouchableComponent);
