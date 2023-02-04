import React, { useEffect } from 'react';
import { Container } from '../../../styles';
import EmptyState from '../../../components/EmptyState';
import { ButtonContainer } from '../styles';
import { Button } from '../../../components/Button';
import { RootState, useSelector } from '../../../redux/store';
import { INetworkProps } from './types';

export default function NetworkScreen(props: INetworkProps) {
  const { loading, onRetry } = props;
  const isConnected = useSelector((state: RootState) => state.app.isConnected);
  const internetAvailable = useSelector((state: RootState) => state.app.internetAvailable);
  useEffect(() => {
    if (isConnected && internetAvailable) {
      onRetry();
    }
  }, [isConnected, internetAvailable]);

  return (
    <Container>
      <EmptyState
        image="network"
        message="لطفا از روشن بودن wi-fi یا اینترنت همراه خود مطمئن شوید و مجدد تلاش کنید "
        title={'اینترنت وصل نیست'}
      />
      <ButtonContainer>
        <Button mode="Filled" size="Large" gestureDisabled onPress={onRetry} loading={loading}>
          {'تلاش مجدد'}
        </Button>
      </ButtonContainer>
    </Container>
  );
}
