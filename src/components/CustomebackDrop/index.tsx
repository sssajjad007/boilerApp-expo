import React, { useMemo } from 'react';
import { BottomSheetBackdropProps } from '@gorhom/bottom-sheet';
import Animated, { Extrapolate, interpolate, useAnimatedStyle } from 'react-native-reanimated';
import { Tap } from '../Tap';
import { ICustomBackdropProps } from './types';

export function CustomBackdrop({ animatedIndex, style, animatedPosition, close }: ICustomBackdropProps) {
  // animated variables
  const containerAnimatedStyle = useAnimatedStyle(() => ({
    opacity: interpolate(animatedIndex.value, [-1, 0, 1], [0, 1, 1], Extrapolate.CLAMP),
  }));

  // styles
  const containerStyle = useMemo(
    () => [
      style,
      {
        backgroundColor: 'rgba(0, 0, 0, 0.36)',
      },
      containerAnimatedStyle,
    ],
    [style, containerAnimatedStyle]
  );

  return (
    <Tap onPress={close}>
      <Animated.View style={containerStyle} />
    </Tap>
  );
}