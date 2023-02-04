import React, { useEffect, useState } from 'react';
import { WebView } from 'react-native-webview';
import { FadeView, Loading } from './styles';
import { SharedValue, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { IWebviewProps } from './types';
import { View } from 'react-native';
import { BodyRegular, TextError } from '../../styles';

export function WebviewScreen(props: IWebviewProps) {
  const {
    url,
    title,
    cache = false,
    loadingImmediately = false,
    fadeDelay = 400,
    isModal = true,
    pageSheet = false,
  } = props;
  const [error, setError] = useState(false);
  const [show, setShow] = useState(false);
  const fadeAnim: SharedValue<number> = useSharedValue(1);
  useEffect(() => {
    setTimeout(() => {
      setShow(true);
    }, 400);
    if (loadingImmediately) {
      setTimeout(() => {
        startFade();
      }, 500);
    }
  }, []);
  const activeStyle = useAnimatedStyle(() => {
    return {
      opacity: withTiming(fadeAnim.value, {
        duration: 400,
      }),
    };
  });
  const startFade = () => {
    setTimeout(() => {
      fadeAnim.value = 0;
    }, 1000);
  };

  return (
    <View style={{ flex: 1 }}>
      {show ? (
        <WebView
          source={{ uri: url }}
          javaScriptEnabled={true}
          originWhitelist={['*']}
          cacheEnabled={cache}
          onError={() => {
            console.log('error');
            setError(true);
          }}
          onLoad={() => startFade()}
          onMessage={(e) => {
            console.log(e);
            const data = JSON.parse(e.nativeEvent.data);
            console.log(data);
            if (data.loaded) {
              console.log('loaded');
              startFade();
            } else {
              console.log('data not loaded');
            }
          }}
        />
      ) : null}
      <FadeView
        style={[
          {
            opacity: 1,
          },
          activeStyle,
        ]}>
        <Loading />
      </FadeView>

      {error && (
        <TextError>
          <BodyRegular>{'اطلاعاتی جهت نمایش موجود نیست!'}</BodyRegular>
        </TextError>
      )}
    </View>
  );
}
