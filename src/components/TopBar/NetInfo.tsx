import React, { useEffect } from 'react';
import { Platform } from 'react-native';
import { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { RootState, useSelector } from '../../redux/store';
import { TitleRegular } from '../../styles';
import { InfoContainer, NetInfoContainer } from './styles';

const translateNetInfoStart = -56;

export function NetInfoComponent() {
  const translateY = useSharedValue(translateNetInfoStart);
  const isConnected = useSelector((state: RootState) => state.app.isConnected);
  const internetAvailable = useSelector((state: RootState) => state.app.internetAvailable);
  const vpn = useSelector((state: RootState) => state.app.vpn);
  const insets = useSafeAreaInsets();
  const netInfoStyles = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: translateY.value }],
    };
  });
  useEffect(() => {
    if (vpn) {
      translateY.value = withTiming(0, { duration: 500 });
      return;
    }
    if (isConnected && internetAvailable) {
      translateY.value = withTiming(translateNetInfoStart, { duration: 500 });
    } else {
      translateY.value = withTiming(0, { duration: 500 });
    }
  }, [isConnected, internetAvailable]);
  function contentGen() {
    if (vpn) {
      return 'وی پی ان شما روشن است، ممکن است در کار با اپلیکیشن اختلال ایجاد کند';
    }
    return 'اتصال به اینترنت یافت نشد.';
  }
  return (
    <NetInfoContainer style={netInfoStyles} top={Platform.OS === 'ios' ? insets.top : 0}>
      <InfoContainer>
        <TitleRegular>{contentGen()}</TitleRegular>
      </InfoContainer>
    </NetInfoContainer>
  );
}
