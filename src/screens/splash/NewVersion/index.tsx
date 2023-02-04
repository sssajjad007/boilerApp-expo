import React, { useRef } from 'react';
import { Container } from '../../../styles';
import EmptyState from '../../../components/EmptyState';
import { ButtonContainer } from '../styles';
import { Button } from '../../../components/Button';
import { INewVersionProps } from './types';
import { throttled } from '../../../utils';
import { Linking } from 'react-native';
import { useRoute } from '@react-navigation/native';

export default function VersionScreen(props: INewVersionProps) {
  const { onIgnoreHandler, onRetry, loading, updateUrl } = props;

  const onDownloadHandler = useRef(
    throttled(async () => {
      try {
        await Linking.openURL('https://google.com');
        // setTimeout(() => setDownloading(true), 500);
        return;
      } catch (e) {}
    })
  ).current;

  return (
    <Container>
      <EmptyState
        image="update"
        message="در این آپدیت برخی باگ‌ها برطرف شده و تجربه کاربری بهبود یافته"
        title={'نسخه جدید'}
      />
      <ButtonContainer>
        <Button mode="Filled" size="Large" gestureDisabled onPress={onDownloadHandler}>
          {'آپدیت میکنم'}
        </Button>
        <Button mode="Text" size="Large" gestureDisabled onPress={onIgnoreHandler} loading={loading}>
          {'فعلا نه'}
        </Button>
      </ButtonContainer>
    </Container>
  );
}
