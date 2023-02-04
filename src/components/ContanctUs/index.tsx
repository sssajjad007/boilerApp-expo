import { View, Text } from 'react-native';
import React from 'react';
import { CenterView } from '../../styles';
import { EmptyDescription, EmptyTitle } from './styles';
import { Button } from '../Button';
import { IContactUsProps } from './types';

export default function ContactUs(props: IContactUsProps) {
  const { buttonTitle, description, onPress, title } = props;
  return (
    <CenterView>
      <EmptyTitle>{title}</EmptyTitle>
      <EmptyDescription>{description}</EmptyDescription>
      <Button mode="Filled" size="Default" onPress={onPress}>
        {buttonTitle}
      </Button>
    </CenterView>
  );
}
