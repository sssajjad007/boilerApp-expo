import React, { useEffect, useState } from 'react';
import { useRef } from 'react';
import { LayoutChangeEvent } from 'react-native';
import { Easing, SharedValue, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { RootState, useSelector } from '../../redux/store';
import { Container, LeftText, RightText, SwipeAbleButton, TitleButton } from './styles';
import { ISwipeButtonProps } from './type';

export function SwipeButton(props: ISwipeButtonProps) {
  const { onPress, actionLeft, actionRight, wide = false } = props;
  const reportType = useSelector((state: RootState) => state.sales.reportType);
  const inner = useRef(0);
  const outer = useRef(0);
  const [active, setActive] = useState(reportType === 'Delino' ? true : false);
  const toggle: SharedValue<number> = useSharedValue(reportType === 'Delino' ? 0 : 80);
  const firstTime = useRef(true);

  useEffect(() => {
    if (firstTime) {
      if (reportType === 'Exclusive') {
        toggle.value = 80;
        setActive(false);
      } else {
        toggle.value = 0;
        setActive(true);
      }
    }
  }, [reportType]);

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
    if (toggle.value === 80) {
      if (typeof actionLeft === 'function') {
        firstTime.current = false;
        setActive(true);
        actionLeft();
      }
      toggle.value = 0;
    } else {
      toggle.value = 80;
      if (typeof actionRight === 'function') {
        firstTime.current = false;
        setActive(false);
        actionRight();
      }
    }
  };
  return (
    <Container
      wide={wide}
      onPress={() => {
        onTogglePress();
      }}
      onLayout={(e: LayoutChangeEvent) => {
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
        onLayout={(e: LayoutChangeEvent) => {
          inner.current = e.nativeEvent.layout.width;
        }}
      />
    </Container>
  );
}
