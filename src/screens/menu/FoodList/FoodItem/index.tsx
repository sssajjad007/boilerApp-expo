import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useEffect, useState, useRef } from 'react';
import { FlatList, Image, StyleSheet, View } from 'react-native';
import { Easing, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { DelinoIcon } from '../../../../components/Icon';
import { Tap } from '../../../../components/Tap';
import { BodySmall, EmptyImageIcon } from '../../../../styles';
import { currency } from '../../../../utils/currency';
import { imageSize } from '../../../../utils/helper';
import { IScreenParamList } from '../FoodModal/types';
import { IFoodItemComponentProps } from '../types';
import { FoodItem, IconContainer, ImageContainer, OutOrder, Price, TitleItem, Wrapper } from './styles';

export default function FoodItemComponent(props: IFoodItemComponentProps) {
  const { data, onDrag, isDragActive, editMode } = props;
  const { image, title, price, isFoodEnable } = data;
  const navigation = useNavigation<NativeStackNavigationProp<IScreenParamList>>();
  const scale = useSharedValue(1);
  useEffect(() => {
    if (isDragActive) {
      scale.value = 1.05;
    } else {
      scale.value = 1;
    }
  }, [isDragActive]);

  const activeStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: withTiming(scale.value, { duration: 200, easing: Easing.ease }) }],
    };
  });
  return (
    <Tap
      onPress={() => {
        navigation.push('FoodModal', { data });
      }}>
      <FoodItem
        style={activeStyle}
        isDragActive={!!isDragActive}
        // onPress={() => {
        //   navigation.push('FoodModal', { data });
        // }}
      >
        <ImageContainer>
          {image ? (
            <Image
              source={{
                uri: imageSize(image, '80x50'),
              }}
              style={styles.image}
            />
          ) : (
            <EmptyImageIcon style={{ borderTopRightRadius: 8, borderBottomRightRadius: 8 }} />
          )}
        </ImageContainer>
        <Wrapper>
          <TitleItem
            ellipsizeMode={'tail'}
            numberOfLines={1}
            style={{ overflow: 'hidden', maxWidth: isFoodEnable ? '100%' : '72%' }}
            isFoodEnable={isFoodEnable}>
            {title}
          </TitleItem>
          <Price>{currency(price)}</Price>
        </Wrapper>
        <IconContainer
          onLongPress={onDrag}
          onPress={
            editMode
              ? () => {}
              : () => {
                  navigation.push('FoodModal', { data });
                }
          }>
          {!isFoodEnable && (
            <OutOrder>
              <BodySmall style={{ fontSize: 9 }}>{'اتمام موجودی'}</BodySmall>
            </OutOrder>
          )}
          <DelinoIcon name={editMode ? 'icon_drag' : 'icon_angle-left'} size={16} color={'black'} />
        </IconContainer>
      </FoodItem>
    </Tap>
  );
}

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: '100%',
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
  },
});
