import React from 'react';
import { TapGestureHandler } from 'react-native-gesture-handler';
import { HIT_SLOP } from '../../styles';
import { ITapProps } from './type';

export function Tap(props: ITapProps) {
  const { children, onPress } = props;
  function onTapPress(event: { nativeEvent: { state: number } }) {
    const { state } = event.nativeEvent;
    if (onPress && state === 4) {
      onPress();
    }
  }
  return (
    <TapGestureHandler onHandlerStateChange={onTapPress} hitSlop={HIT_SLOP}>
      {children}
    </TapGestureHandler>
  );
}
