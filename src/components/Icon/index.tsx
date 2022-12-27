import icoMoonConfig from './selection.json';
import React from 'react';
import { styleGen } from './styles';
import { View } from 'react-native';
import { IIconProps } from './type';
import { createIconSetFromIcoMoon } from '@expo/vector-icons';
export default createIconSetFromIcoMoon(icoMoonConfig, 'DelinoIcon', 'delino-icon.ttf');
const Icon = createIconSetFromIcoMoon(icoMoonConfig, 'DelinoIcon', 'delino-icon.ttf');
export function DelinoIcon(props: IIconProps) {
  const { style, name, size, color, svg, boxed, boxColor, boxSize } = props;
  if (svg) {
    return <Icon style={style} name={name} size={size} color={color} />;
  }
  if (boxed) {
    const { styles, iconSize } = styleGen(boxSize, boxColor);
    return (
      <View style={[styles.container, style]}>
        <Icon name={name} size={iconSize} color={color} />
      </View>
    );
  }
  return <Icon style={style} name={name} size={size} color={color} />;
}
