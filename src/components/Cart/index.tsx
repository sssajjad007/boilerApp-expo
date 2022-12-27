import React from 'react';
import { CardContainer, Content, Header } from './styles';
import { TitleRegular } from '../../styles';
import { ICardProps } from './types';

export default function Cart(props: ICardProps) {
  const { title, children } = props;
  return (
    <CardContainer>
      {title && (
        <Header>
          <TitleRegular>{title}</TitleRegular>
        </Header>
      )}
      <Content>{children}</Content>
    </CardContainer>
  );
}
