import React from 'react';
import { View } from 'react-native';
import { useTheme } from 'styled-components/native';
import { BodyRegular } from '../../styles';
import { Tap } from '../Tap';
import { Checkbox } from './CheckBox';
import { Radio } from './Radio/index';
import { styleGen } from './styles';
import { ISelectButtonProps } from './type';

export function SelectButton(props: ISelectButtonProps) {
  const { id, mode, children, selected, size, onPress } = props;
  const theme = useTheme();
  function renderSelector() {
    if (mode === 'checkbox') {
      return <Checkbox checked={selected} size={size} />;
    }
    return <Radio checked={selected} size={size} />;
  }
  function onButtonPress() {
    if (onPress) {
      onPress(id || '');
    }
  }
  function renderChild() {
    if (typeof children === 'string') {
      return (
        <BodyRegular style={selected ? { color: theme.colors.Gray[50] } : { color: theme.colors.Gray[80] }}>
          {children ? children : null}
        </BodyRegular>
      );
    }
    return children;
  }
  const styles = styleGen(size);
  return (
    <Tap onPress={onButtonPress}>
      <View style={styles.container}>
        <View style={styles.selectorContainer}>{renderSelector()}</View>
        <View style={styles.labelContainer}>{children ? renderChild() : null}</View>
      </View>
    </Tap>
  );
}
