import React, { useEffect, useState } from 'react';
import { Platform } from 'react-native';
import { Easing, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { RootState, useSelector } from '../../redux/store';
import { BodyRegular, TitleRegular } from '../../styles';
import { Button } from '../Button';
import { InfoContainer, NetInfoContainer } from './styles';

export function NetInfoComponent() {
  const translateY = useSharedValue(0);
  const opacity = useSharedValue(0);
  const isConnected = useSelector((state: RootState) => state.app.isConnected);
  const internetAvailable = useSelector((state: RootState) => state.app.internetAvailable);
  const vpn = useSelector((state: RootState) => state.app.vpn);

  const netInfoStyles = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: translateY.value }],
      opacity: opacity.value,
    };
  });
  useEffect(() => {
    if (vpn) {
      translateY.value = withTiming(0, { duration: 200, easing: Easing.ease });
      return;
    }
    if (isConnected && internetAvailable) {
      translateY.value = withTiming(0, { duration: 200, easing: Easing.ease });
      opacity.value = withTiming(0, { duration: 200, easing: Easing.ease });
    } else {
      translateY.value = withTiming(-80, { duration: 200, easing: Easing.ease });
      opacity.value = withTiming(1, { duration: 200, easing: Easing.ease });
    }
  }, [isConnected, internetAvailable]);
  function contentGen() {
    if (vpn) {
      return 'وی پی ان شما روشن است، ممکن است در کار با اپلیکیشن اختلال ایجاد کند';
    }
    return 'اتصال به اینترنت یافت نشد.';
  }
  return (
    <NetInfoContainer style={netInfoStyles}>
      <BodyRegular>{contentGen()}</BodyRegular>
    </NetInfoContainer>
  );
}
