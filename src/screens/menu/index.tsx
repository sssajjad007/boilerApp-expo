import { View, Text } from 'react-native';
import React from 'react';
import { MenuScreenProps } from '../../navigation/type';
import { RootContainer } from '../../components/Container';

export default function MenuScreen({ route, navigation }: MenuScreenProps) {
  return (
    <RootContainer branchListAction isMenuIcon>
      <Text>Menu</Text>
    </RootContainer>
  );
}
