import memoize from 'fast-memoize';
import { StyleSheet } from 'react-native';
import { IRadioButtonStyles } from './type';
export function styleGenerator(args: IRadioButtonStyles) {
  const { checked, size, theme } = args;
  const buttonSize = size - 2;
  const styles = StyleSheet.create({
    container: {
      width: buttonSize,
      height: buttonSize,
      borderRadius: buttonSize / 2,
      alignItems: 'center',
      justifyContent: 'center',
      borderWidth: 2,
    },
    activeContainer: {
      borderColor: theme.colors.Primary.Main,
    },
    deActiveContainer: {
      borderColor: theme.colors.Gray[90],
    },
    dot: {
      width: buttonSize - Math.floor(buttonSize / 2),
      height: buttonSize - Math.floor(buttonSize / 2),
      borderRadius: (buttonSize - Math.floor(buttonSize / 2)) / 2,
    },
    activeDot: {
      backgroundColor: theme.colors.Primary.Main,
    },
    deActiveDot: {
      backgroundColor: theme.colors.Gray[90],
    },
  });
  const containerStyle = [styles.container, checked ? styles.activeContainer : styles.deActiveContainer];
  const dotStyle = [styles.dot, checked ? styles.activeDot : styles.deActiveDot];
  return {
    containerStyle,
    dotStyle,
  };
}
export const styleGen = memoize(styleGenerator);
