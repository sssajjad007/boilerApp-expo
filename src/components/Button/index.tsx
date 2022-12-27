import React, { Ref, forwardRef } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import { useTheme } from 'styled-components/native';
import { useThrottled } from '../../utils';
import { DelinoIcon } from '../Icon';
import { Touchable } from '../Touchable';
import { Loading } from './loading';
import { styleGen } from './styles';
import { IButtonProps, tMode } from './types';
function ButtonComponent(props: IButtonProps, ref: Ref<RectButton>) {
  const theme = useTheme();
  const {
    mode,
    size,
    IconLeft,
    IconRight,
    disabledWithAction,
    loading,
    onPress,
    disabled,
    children,
    fullRadius,
    textColor,
    backgroundColor,
    iconSize,
    iconName,
    minWidth,
  } = props;
  const { styles, iconStyle, buttonTextColor } = styleGen({
    disabled,
    mode,
    size,
    fullRadius,
    textColor,
    backgroundColor,
    theme,
    IconLeft,
    IconRight,
    children,
    minWidth,
  });
  const { onTouchablePress } = useThrottled();
  function iconSizeCal() {
    if (size === 'Small') {
      return 16;
    }
    if (size === 'Default') {
      return 20;
    }
    if (size === 'Large') {
      return 24;
    }
    return 20;
  }
  function rippleColorRender() {
    if (mode === 'Filled') {
      return theme.colors.Primary.Dark;
    }
    if (mode === 'Outlined') {
      return theme.colors.Gray[90];
    }
    if (mode === 'Text') {
      return theme.colors.Gray[90];
    }
    return theme.colors.Gray[90];
  }
  return (
    <View style={styles.container}>
      {(IconLeft || IconRight) && !loading && (
        <DelinoIcon name={iconName || 'icon_plus'} size={iconSizeCal() || iconSize} color={iconStyle.color} />
      )}
      {loading ? (
        <Loading mode={mode} size={size} activityColor={buttonTextColor(mode, textColor, disabled, theme)} />
      ) : (
        <View pointerEvents="none" style={{ zIndex: 10 }}>
          <Text numberOfLines={1} style={styles.text}>
            {children}
          </Text>
        </View>
      )}
      {disabledWithAction && disabled && (
        <TouchableOpacity style={StyleSheet.absoluteFill} onPress={onPress} activeOpacity={1} />
      )}
      {disabled || loading ? null : <Touchable ref={ref} onPress={onPress} rippleColor={rippleColorRender()} />}
    </View>
  );
}

export const Button = forwardRef(ButtonComponent);
