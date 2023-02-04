import { View } from 'react-native';
import React from 'react';
import { styleGen } from './styles';
import { IChipsProps } from './types';
import { useTheme } from 'styled-components/native';
import { DelinoIcon } from '../Icon';
import { Touchable } from '../Touchable';
import { BodyLarge } from '../../styles';
import shareData from '../../screens/menu/FoodList/shareData';

export function Chips(props: IChipsProps) {
  const { backgroundColor, selected, primaryMode, IconRight, iconName, children, onPress, id, index } = props;
  const theme = useTheme();
  const { styles } = styleGen({
    backgroundColor,
    selected,
    theme,
    primaryMode,
  });
  return (
    <View style={styles.container}>
      <View style={styles.chips}>
        {IconRight && (
          <DelinoIcon
            name={iconName || 'icon_plus'}
            size={16}
            color={selected ? theme.colors.Gray[0] : theme.colors.Gray.White}
          />
        )}
        <View pointerEvents="none" style={styles.text}>
          <BodyLarge style={{ color: selected ? theme.colors.Gray.White : theme.colors.Gray[0] }}>{children}</BodyLarge>
          {IconRight ? (
            <DelinoIcon name={iconName || 'icon_cross'} size={16} color={selected ? 'white' : 'black'} />
          ) : null}
        </View>
        {!selected && <Touchable onPress={onPress} rippleColor={theme.colors.Gray[90]} />}
      </View>
    </View>
  );
}
