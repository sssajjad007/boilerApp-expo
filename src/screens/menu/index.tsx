import React from 'react';
import { MenuScreenProps } from '../../navigation/type';
import { RootContainer } from '../../components/Container';
import { Item, TitleContainer } from './styles';
import { DelinoIcon } from '../../components/Icon';
import { useTheme } from 'styled-components/native';
import { BodyRegular } from '../../styles';
import { IIemProps } from './types';

const MANAGE_FOODS = 'مدیریت غذاها';
const MANAGE_CATEGORY = 'مدیریت گروه های غذایی';

export default function MenuScreen({ route, navigation }: MenuScreenProps) {
  return (
    <RootContainer branchListAction isMenuIcon>
      <ItemRender
        title={MANAGE_CATEGORY}
        icon={'icon_rest-menu'}
        onPress={() => {
          navigation.push('Category');
        }}
      />
      <ItemRender
        title={MANAGE_FOODS}
        icon={'icon_food'}
        onPress={() => {
          navigation.push('FoodList');
        }}
      />
    </RootContainer>
  );
}

function ItemRender(props: IIemProps) {
  const { icon, title, onPress } = props;
  const theme = useTheme();
  return (
    <Item onPress={onPress}>
      <DelinoIcon name={icon} size={22} color={theme.colors.Gray.Black} />
      <TitleContainer>
        <BodyRegular>{title}</BodyRegular>
      </TitleContainer>
      <DelinoIcon name={'icon_arrow-left'} size={16} color={theme.colors.Gray.Black} />
    </Item>
  );
}
