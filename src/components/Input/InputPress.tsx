import React from 'react';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import type { IInputPress } from './types';

export default function InputPress(props: IInputPress) {
  const { children, onPress } = props;
  // const tap = Gesture.Tap().onEnd(onPress);
  const tap = Gesture.Tap().onStart(() => {
    console.log('tap');
  });
  return <GestureDetector gesture={tap}>{children}</GestureDetector>;
}
