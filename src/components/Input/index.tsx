/* eslint-disable react-hooks/rules-of-hooks */
// import { View, Text, TextInput } from 'react-native';
// import React, { useRef } from 'react';
// import { IInputProps } from './type';
// import { InputContainer, InputTitle, StyledTextInput } from './styles';
// import { TextError } from '../../styles';

// export default function Input(props: IInputProps) {
//   const inputRef = useRef<TextInput>(null);
//   const { title, errors } = props;

//   return (
//     <InputContainer>
//       <InputTitle>{title}</InputTitle>
//       <StyledTextInput ref={inputRef} {...props} />
//       <TextError>{errors}</TextError>
//     </InputContainer>
//   );
// }
import React, { useRef, useState } from 'react';
import { View, TextInput } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';
import { Tap } from '../Tap';
import { IconButton } from '../IconButton';

import InputPress from './InputPress';

import { styleGen, inputHeightGen } from './styles';
import { IInputProps, tOnContentSize, tNativeEvent } from './types';
import { useTheme } from 'styled-components/native';
import { BodySmall, TextError, TitleRegular } from '../../styles';
import { digitsEnToFa } from '@persian-tools/persian-tools';
import { DelinoIcon } from '../Icon';

export default function Input(props: IInputProps) {
  const {
    multiline,
    title,
    style,
    mode,
    errors,
    value,
    numberOfLines,
    onChangeText,
    onBlur,
    editable,
    placeholder,
    clearButton,
    limit,
  } = props;
  const inputRef = useRef<TextInput>(null);
  /**
   * clearRef is used for gesture handler components, Tap uses this ref
   * to wait for IconButton to react to touch, if IconButton does not recognize anything
   * then Tap executes onPress event, more information available in
   * react native gesture handler documents
   * https://docs.swmansion.com/react-native-gesture-handler/docs/interactions#awaiting-other-handlers
   */
  const clearRef = useRef(null);
  const theme = useTheme();
  const [focused, setFocused] = useState<boolean>(false);
  const [inputHeight, setHeight] = useState<number>(inputHeightGen(mode));
  const {
    styles,
    containerStyles,
    inputContainerStyles,
    inputStyles,
    limitStyle,
    animatedTextStyle,
    selectionColor,
    clearIconSize,
    clearIconColor,
    INPUT_HEIGHT,
  } = styleGen({
    mode,
    focused,
    inputHeightState: inputHeight,
    multiline,
    numberOfLines,
    hasError: !!errors?.length,
    limit,
    value,
    style,
    theme,
  });

  let animation: Animated.SharedValue<number> | undefined;
  // define animated shared value when needed
  if (mode !== 'with-label') {
    // if value is defined and not empty
    // animation should be at active stage
    animation = useSharedValue(value ? 1 : 0);
  }
  function onPress() {
    if (editable === false) {
      return;
    }
    if (inputRef) {
      setFocused(true);
      inputRef.current?.focus();
    }
    // start animation on focus
    if (animation) {
      animation.value = 1;
    }
  }
  function onBlurPress(event: tNativeEvent) {
    setFocused(false);
    /**
     * if text input is empty
     * onBlur animation should reset to default value
     */
    if (!value && animation) {
      animation.value = 0;
    }
    if (onBlur) {
      onBlur(event);
    }
  }
  function onChangeValue(text: string) {
    if (limit && text.length > limit) {
      return;
    }
    if (onChangeText) {
      onChangeText(text);
    }
  }
  function onClear() {
    if (onChangeText) {
      onChangeText('');
    }
  }
  function onContentSize(event: tOnContentSize) {
    if (numberOfLines) {
      return;
    }
    const { height } = event.nativeEvent.contentSize;
    // prevent from fist resize, height is returned 62
    // and default height is 58 in maximum.
    if (height > INPUT_HEIGHT * 1.4) {
      setHeight(height);
    } else {
      setHeight(INPUT_HEIGHT);
    }
  }
  function renderTitle() {
    if (mode === 'with-label') {
      return (
        <View style={styles.titleContainer}>
          <TitleRegular style={focused ? styles.focusedTitle : undefined}>{title}</TitleRegular>
        </View>
      );
    }
    const isFlat = mode === 'flat';
    // translateX for flat and outline-material mode
    // I found the numbers with simple calculation and testing
    const reduceX = isFlat ? -14 : 2;
    const center = INPUT_HEIGHT / 2 + reduceX;
    const animatedStyle = useAnimatedStyle(() => {
      return {
        transform: [
          {
            translateX: withTiming(animation?.value === 1 ? 4 : 0, { duration: 200 }),
          },
          { translateY: withTiming(animation?.value === 1 ? -center : 0, { duration: 200 }) },
          { scale: withTiming(animation?.value === 1 ? 0.8 : 1, { duration: 200 }) },
        ],
      };
    });
    return (
      <Animated.View style={[styles.animatedTextContainer, animatedStyle]}>
        <Tap onPress={onPress}>
          <Animated.Text style={animatedTextStyle}>{title}</Animated.Text>
        </Tap>
      </Animated.View>
    );
  }
  function renderErrors() {
    // if (!errors) {
    //   return null;
    // }
    // let errorText = '';
    // for (let index = 0; index < errors.length; index++) {
    //   const text = errors[index];
    //   errorText += `*${text}    `;
    // }
    return <BodySmall style={styles.error}>{errors}</BodySmall>;
  }

  function renderLimit() {
    if (!limit) {
      return null;
    }

    return (
      <BodySmall style={limitStyle}>{`${digitsEnToFa(limit)}/${
        value ? digitsEnToFa(value.length) : digitsEnToFa(0)
      }`}</BodySmall>
    );
  }
  function renderClearButton() {
    if (value && clearButton) {
      return (
        <View style={styles.clearButtonContainer}>
          <IconButton
            // ref={clearRef}
            size={clearIconSize}
            color={clearIconColor}
            Icon={({ size, color }) => {
              return <DelinoIcon name="icon_cross-circle" size={size} color={color} />;
            }}
            onPress={onClear}
          />
        </View>
      );
    }
  }

  function renderPlaceHolder() {
    if (mode === 'with-label' || focused) {
      return placeholder;
    }
    return undefined;
  }
  return (
    <View style={containerStyles}>
      {renderLimit()}
      {renderTitle()}
      {/* <InputPress onPress={onPress}> */}
      {/* <Tap onPress={onPress}> */}
      <View style={inputContainerStyles}>
        {renderClearButton()}
        <TextInput
          {...props}
          placeholder={renderPlaceHolder()}
          ref={inputRef}
          onPressIn={onPress}
          textAlign={'right'}
          style={[inputStyles]}
          onBlur={onBlurPress}
          onChangeText={onChangeValue}
          textAlignVertical={multiline ? 'top' : 'center'}
          underlineColorAndroid={'transparent'}
          // selectionColor={selectionColor}
          onContentSizeChange={multiline ? onContentSize : undefined}
        />
      </View>
      {/* </Tap> */}
      {/* </InputPress> */}
      <View
        style={{
          paddingHorizontal: 16,
        }}>
        <TextError>{errors}</TextError>
      </View>
    </View>
  );
}
