import { StyleSheet, Platform } from 'react-native';
import memoize from 'fast-memoize';
import { IInputStyleGen, tInputMode } from './types';
import { Body, Title } from '../../styles';

const WITH_LABEL_TITLE_HEIGHT = 28;
const ERROR_CONTAINER_HEIGHT = 24;
const FLAT_INPUT_HEIGHT = 56;
const INPUT_NORMAL_HEIGHT = 56;

function containerHeightGen(mode: tInputMode) {
  if (mode === 'with-label') {
    // 28 for title
    // 56 for input
    // 34 for errors
    return WITH_LABEL_TITLE_HEIGHT + INPUT_NORMAL_HEIGHT + ERROR_CONTAINER_HEIGHT;
  }
  if (mode === 'outlined') {
    // 56 for input
    // 34 for errors
    return INPUT_NORMAL_HEIGHT + ERROR_CONTAINER_HEIGHT;
  }
  if (mode === 'flat') {
    return FLAT_INPUT_HEIGHT + ERROR_CONTAINER_HEIGHT;
  }

  return INPUT_NORMAL_HEIGHT + ERROR_CONTAINER_HEIGHT;
}
export function inputHeightGen(mode: tInputMode) {
  if (mode === 'outlined') {
    // 56 for input
    // 34 for title
    return INPUT_NORMAL_HEIGHT;
  }
  if (mode === 'flat') {
    return FLAT_INPUT_HEIGHT;
  }
  return INPUT_NORMAL_HEIGHT;
}
function inputBorderGen(mode: tInputMode) {
  // if (mode === 'flat') {
  //   return {
  //     borderTopWidth: 0,
  //     borderLeftWidth: 0,
  //     borderRightWidth: 0,
  //     borderBottomWidth: 1,
  //     borderTopLeftRadius: 8,
  //     borderTopRightRadius: 8,
  //   };
  // }
  return {
    borderWidth: 1,
    borderRadius: 12,
  };
}

function containerStyleGen(mode: tInputMode, height: number) {
  return {
    width: '100%',
    height,
  };
}

function styleGenerator(args: IInputStyleGen) {
  const { mode, focused, inputHeightState, multiline, numberOfLines, hasError, limit, value, style, theme } = args;
  const inputHeight = inputHeightGen(mode);
  const height = containerHeightGen(mode);
  const isFlat = mode === 'flat';
  // const flatBackgroundColor = isFlat ? 'rgba(0,0,0,0.12)' : undefined;

  const styles = StyleSheet.create({
    container: containerStyleGen(mode, height),
    titleContainer: {
      width: '100%',
      height: WITH_LABEL_TITLE_HEIGHT,
      flexDirection: 'row-reverse',
      alignItems: 'flex-start',
      justifyContent: 'space-between',
    },

    focusedTitle: {
      color: theme.colors.Secondary.Main,
    },
    inputContainer: {
      flexDirection: 'row',
      width: '100%',
      height: inputHeight,
      // backgroundColor: flatBackgroundColor,
      paddingRight: 14,
      ...inputBorderGen(mode),
    },
    input: {
      flex: 1,
      top: 10, // input value going down for some stupid reason
      // backgroundColor: 'pink',
    },
    inputFont: {
      ...Title.Regular,
      lineHeight: 18,
      color: hasError ? theme.colors.Error.Main : theme.colors.Gray[0],
    },
    activeBorderColor: {
      borderColor: theme.colors.Secondary.Main,
    },
    disabledBorderColor: {
      borderColor: theme.colors.Gray[90],
    },
    limit: { position: 'absolute', top: -18, left: 0 },
    limitActive: {
      color: theme.colors.Error.Dark,
    },
    limitReached: {
      color: theme.colors.Error.Main,
    },
    clearButtonContainer: {
      flex: 1,
      zIndex: 1,
      alignItems: 'flex-end',
      justifyContent: 'center',
    },
    errorContainer: {
      marginBottom: 16,
    },
    error: {
      width: '100%',
      height: '100%',
      color: theme.colors.Error.Main,
      marginLeft: 8,
    },
    inputError: {
      borderColor: theme.colors.Error.Main,
    },
    animatedTextContainer: {
      position: 'absolute',
      // zIndex: 1,
      // paddingHorizontal: 10,
      backgroundColor: isFlat ? undefined : theme.colors.Gray.White,
      top: inputHeight / 2 - 10,
      right: 18,
      overflow: 'hidden',
    },
    animatedText: {
      // ...material.subheadingObject,
      ...Title.Regular,
      lineHeight: 18,
      textAlign: 'right',
    },
    animatedTextActive: {
      color: theme.colors.Secondary.Main,
    },
    animatedTextError: {
      color: theme.colors.Error.Main,
    },
  });

  // theses styles are based on states
  // they change on state changes and should be passed like this
  const containerStyles = [
    styles.container,
    /**
     * if input is not in raw mode and multiline is enabled
     * if number of lines is defined, for each line 16 size is added to
     * container style
     */
    // multiline && numberOfLines
    //   ? {
    //       height:
    //         inputHeight +
    //         numberOfLines * 16 +
    //         (mode === 'with-label' ? WITH_LABEL_TITLE_HEIGHT + ERROR_CONTAINER_HEIGHT : ERROR_CONTAINER_HEIGHT),
    //     }
    //   : undefined,
    // /**
    //  * if input is not in raw mode and multiline is enabled
    //  * if number of lines is NOT defined, text input will grow
    //  * based on content size dynamically
    //  */
    // multiline && !numberOfLines
    //   ? {
    //       height:
    //         inputHeightState +
    //         (mode === 'with-label' ? WITH_LABEL_TITLE_HEIGHT + ERROR_CONTAINER_HEIGHT : ERROR_CONTAINER_HEIGHT),
    //     }
    //   : undefined,
  ];
  const inputContainerStyles = [
    styles.inputContainer,
    focused ? styles.activeBorderColor : styles.disabledBorderColor,
    value ? styles.activeBorderColor : undefined,
    hasError ? styles.inputError : undefined,
    // multiline && numberOfLines ? { height: inputHeight + numberOfLines * 16 } : undefined,
    // multiline && !numberOfLines ? { height: inputHeightState } : undefined,
  ];
  const inputStyles = [
    styles.input,
    // multiline && numberOfLines ? { height: inputHeight + numberOfLines * 16 } : undefined,
    // multiline && !numberOfLines ? { height: inputHeightState } : undefined,
    styles.inputFont,
    style,
  ];
  const limitStyle = [
    styles.limit,
    focused ? styles.limitActive : undefined,
    Number(value?.length) === Number(limit) ? styles.limitReached : undefined,
  ];
  const animatedTextStyle = [
    styles.animatedText,
    focused ? styles.animatedTextActive : undefined,
    hasError ? styles.animatedTextError : undefined,
  ];
  const selectionColor = theme.colors.Gray[10];
  return {
    styles,
    containerStyles,
    inputContainerStyles,
    inputStyles,
    limitStyle,
    animatedTextStyle,
    selectionColor,
    INPUT_HEIGHT: inputHeight,
    clearIconSize: 24,
    clearIconColor: hasError ? theme.colors.Error.Main : undefined,
  };
}

export const styleGen = memoize(styleGenerator);
