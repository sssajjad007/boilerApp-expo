import React from 'react';
import { Image } from 'react-native';
import { useTheme } from 'styled-components/native';
import { CenterView } from '../../styles';
import { DelinoIcon } from '../Icon';
import { ButtonContainer, Message, Title } from './styles';
import { IEmptyStateProps } from './types';
import { Payment, Product, Sale, Network, Update } from './assets/index';
import { Button } from '../Button';

const TRY_AGAIN = 'تلاش مجدد';

export default function EmptyState(props: IEmptyStateProps) {
  const { iconName, message, style, image, title, onPress } = props;
  function imageRender() {
    switch (image) {
      case 'payment':
        return Payment;
      case 'product':
        return Product;
      case 'sales':
        return Sale;
      case 'network':
        return Network;
      case 'update':
        return Update;
      default:
        return null;
    }
  }
  const theme = useTheme();
  return (
    <CenterView>
      {iconName && <DelinoIcon name={iconName} size={120} color={theme.colors.Gray[70]} style={style} />}
      {image && <Image source={imageRender()} style={{ width: '80%', height: 160 }} resizeMode={'contain'} />}
      {title && <Title>{title}</Title>}
      <Message>{message}</Message>
      {onPress && (
        <ButtonContainer>
          <Button mode="Filled" size="Default" onPress={onPress}>
            {TRY_AGAIN}
          </Button>
        </ButtonContainer>
      )}
    </CenterView>
  );
}
