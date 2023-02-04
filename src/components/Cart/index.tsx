import React from 'react';
import { CardContainer, Content, Header } from './styles';
import { TitleLarge } from '../../styles';
import { ICardProps } from './types';
import { Button } from '../Button';

export default function Cart(props: ICardProps) {
  const { title, children, onPress, titleButton } = props;
  return (
    <CardContainer>
      {title && (
        <Header>
          <TitleLarge>{title}</TitleLarge>
          {onPress && titleButton && (
            <Button mode="Filled" size="Default" onPress={onPress}>
              {titleButton}
            </Button>
          )}
        </Header>
      )}
      <Content>{children}</Content>
    </CardContainer>
  );
}
