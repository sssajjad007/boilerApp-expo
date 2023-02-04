import { View } from 'react-native';
import React from 'react';
import { WebviewScreen } from '../../components/WebView';
import { WebViewProps } from '../../navigation/type';
import { RootContainer } from '../../components/Container';

export default function WebView({ navigation, route }: WebViewProps) {
  const { url, title, loadingImmediately = false } = route.params;
  return (
    <RootContainer isCloseIcon pageSheet={true}>
      <WebviewScreen url={route.params.url} title={title} loadingImmediately={loadingImmediately} />
    </RootContainer>
  );
}
