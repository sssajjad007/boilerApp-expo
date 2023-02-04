import { StyleSheet } from 'react-native';
import memoize from 'fast-memoize';
export function styleGenerator(size: number) {
  return StyleSheet.create({
    container: {
      minWidth: size,
      height: size,
      // margin: 8,
      flexDirection: 'row-reverse',
    },
    selectorContainer: {
      width: size,
      height: size,
      alignItems: 'center',
      justifyContent: 'center',
    },
    labelContainer: {
      paddingRight: 8,
      alignItems: 'center',
      justifyContent: 'center',
    },
  });
}
export const styleGen = memoize(styleGenerator);
