import { View, Text } from 'react-native';
import React from 'react';
import { CenterView, Container } from '../../../styles';

export default function IntroScreen() {
  return (
    <Container>
      <CenterView>
        <Text>{'Intro'}</Text>
      </CenterView>
    </Container>
  );
}
