import { StyleSheet } from 'react-native';
import memoize from 'fast-memoize';
import { tMode, IButtonStyles, tSize } from './types';
import styled, { DefaultTheme } from 'styled-components/native';
import { Body } from '../../styles';
import { hexToRgba } from '../../styles/mixins';

function buttonHeightCalc(size: tSize) {
  switch (size) {
    case 'Small':
      return 34;
    case 'Default':
      return 40;
    case 'Large':
      return 56;
    default:
      return 40;
  }
}

function buttonMinWidthCalc(size: tSize) {
  switch (size) {
    case 'Small':
      return 34;
    case 'Default':
      return 40;
    case 'Large':
      return 56;
    default:
      return 40;
  }
}

function buttonTextColor(
  mode: tMode,
  textColor: string | undefined,
  disabled: boolean | undefined,
  theme: DefaultTheme
) {
  if (disabled) {
    return theme.colors.Gray[10];
  }
  if (textColor) {
    return textColor;
  }
  if (mode === 'Filled') {
    return theme.colors.Gray.White;
  }
  if (mode === 'Outlined' || mode === 'Text') {
    return theme.colors.Gray[0];
  }
  return theme.colors.Gray[0];
}

function buttonBackgroundColor(
  mode: tMode,
  disabled: boolean | undefined,
  backgroundColor: string | undefined,
  theme: DefaultTheme
) {
  if (disabled) {
    return hexToRgba(theme.colors.Gray[10], 0.15);
  }
  if (mode === 'Filled') {
    if (backgroundColor) {
      return backgroundColor;
    }
    return theme.colors.Primary.Main;
  }
  if (mode === 'Outlined') {
    return theme.colors.Gray.White;
  }
  if (mode === 'Text') {
    return 'transparent';
  }
  return theme.colors.Primary.Main;
}
function buttonBorderColor(mode: tMode, theme: DefaultTheme, disabled: boolean | undefined) {
  if (disabled && mode === 'Outlined') {
    return hexToRgba(theme.colors.Gray[10], 0.15);
  }
  if (mode === 'Outlined') {
    return theme.colors.Gray[0];
  }
  return 'transparent';
}
function titleFontSize(size: tSize) {
  if (size === 'Small') {
    return Body.Regular.fontSize;
  }
  if (size === 'Default') {
    return Body.Large.fontSize;
  }
  if (size === 'Large') {
    return Body.xLarge.fontSize;
  }
}
function titlelineHeight(size: tSize) {
  if (size === 'Small') {
    return 18;
  }
  if (size === 'Default') {
    return 20;
  }
  if (size === 'Large') {
    return 24;
  }
}
// function buttonElevation(mode: tMode, disabled: boolean | undefined) {
//   if (disabled) {
//     return {};
//   }
//   if (mode === 'contained' || mode === 'contained-grey' || mode === 'contained-secondary') {
//     if (Platform.OS === 'android') {
//       return {
//         elevation: 2,
//       };
//     }
//     if (Platform.OS === 'ios') {
//       return {
//         shadowColor: '#000',
//         shadowOffset: {
//           width: 0,
//           height: 1,
//         },
//         shadowOpacity: 0.2,
//         shadowRadius: 1.41,
//       };
//     }
//   }
// }
function justifyContent(arg: { IconLeft?: boolean; IconRight?: boolean; children: React.ReactNode }) {
  const { IconLeft, IconRight, children } = arg;
  if ((IconLeft || IconRight) && children) {
    return 'space-between';
  }
  if ((IconLeft || IconRight) && !children) {
    return 'center';
  }
  if (!(IconLeft || IconRight) && children) {
    return 'center';
  }
}
function buttonStyle(args: IButtonStyles) {
  const {
    mode,
    size,
    disabled,
    textColor,
    backgroundColor,
    fullRadius,
    theme,
    IconLeft,
    IconRight,
    children,
    minWidth,
  } = args;

  const buttonHeight = buttonHeightCalc(size);
  const styles = StyleSheet.create({
    container: {
      minWidth: minWidth ? minWidth : buttonMinWidthCalc(size),
      // maxWidth: '90%',
      height: buttonHeight,
      borderWidth: mode === 'Outlined' ? 1 : 0,
      backgroundColor: buttonBackgroundColor(mode, disabled, backgroundColor, theme),
      borderColor: buttonBorderColor(mode, theme, disabled),
      borderRadius: fullRadius ? buttonHeight / 2 : 8,
      flexDirection: IconLeft ? 'row' : 'row-reverse',
      alignItems: 'center',
      justifyContent: justifyContent({ IconLeft, IconRight, children }),
      paddingHorizontal: 16,
      overflow: 'hidden',
      // ...buttonElevation(mode, disabled),
    },
    text: {
      fontSize: titleFontSize(size),
      lineHeight: titlelineHeight(size),
      fontFamily: 'IRANSansMobileFaNum',
      color: buttonTextColor(mode, textColor, disabled, theme),
    },
  });
  const iconStyle = {
    color: buttonTextColor(mode, textColor, disabled, theme),
  };
  return { styles, iconStyle, buttonTextColor };
}
export const styleGen = memoize(buttonStyle);
