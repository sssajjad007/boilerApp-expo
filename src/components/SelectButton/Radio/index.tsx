import React, { useEffect } from 'react';
import { View } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { useTheme } from 'styled-components/native';
import { styleGen } from './styles';
import { IRadioButtonProps } from './type';

export function Radio(props: IRadioButtonProps) {
  const { checked, size } = props;
  const theme = useTheme();
  const animation = useSharedValue(checked ? 1 : 0);
  useEffect(() => {
    animation.value = checked ? 1 : 0;
  }, [checked]);
  const { containerStyle, dotStyle } = styleGen({ checked, size, theme });
  const dotAnimationStyle = useAnimatedStyle(() => {
    return {
      opacity: withTiming(animation.value, { duration: 180 }),
      transform: [
        {
          scale: animation.value === 1 ? withTiming(1, { duration: 180 }) : withTiming(0.6, { duration: 180 }),
        },
      ],
    };
  });
  return (
    <View style={containerStyle}>
      <Animated.View style={[dotStyle, dotAnimationStyle]} />
    </View>
  );
}
