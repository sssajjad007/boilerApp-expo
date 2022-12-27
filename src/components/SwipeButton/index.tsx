import React, { useState } from 'react';
import { useRef } from 'react';
import { Easing, SharedValue, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { Container, LeftText, RightText, SwipeAbleButton, TitleButton } from './styles';
import { ISwipeButtonProps } from './type';

export function SwipeButton(props: ISwipeButtonProps) {
  const { onPress, actionLeft, actionRight, wide = false } = props;
  const inner = useRef(0);
  const outer = useRef(0);
  const [active, setActive] = useState(true);
  const toggle: SharedValue<number> = useSharedValue(0);
  const activeStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: withTiming(toggle?.value, {
            duration: 200,
            easing: Easing.ease,
          }),
        },
      ],
    };
  });

  const onTogglePress = () => {
    if (toggle.value === outer.current - inner.current - 8) {
      if (typeof actionLeft === 'function') {
        setActive(true);
        actionLeft();
      }
      toggle.value = 0;
    } else {
      toggle.value = outer.current - inner.current - 8;
      if (typeof actionRight === 'function') {
        setActive(false);
        actionRight();
      }
    }
    // if (typeof onPress === 'function') {
    //   onPress();
    // }
  };
  return (
    <Container
      wide={wide}
      onPress={() => {
        onTogglePress();
      }}
      onLayout={(e) => {
        outer.current = e.nativeEvent.layout.width;
      }}>
      <LeftText>
        <TitleButton active={active}>{'دلینو'}</TitleButton>
      </LeftText>
      <RightText>
        <TitleButton active={!active}>{'وندو'}</TitleButton>
      </RightText>

      <SwipeAbleButton
        style={activeStyle}
        onLayout={(e) => {
          inner.current = e.nativeEvent.layout.width;
        }}
      />
    </Container>
  );
}
