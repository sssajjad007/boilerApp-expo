import { StyleSheet } from 'react-native';
import memoize from 'fast-memoize';

function styleGenerator(boxSize?: number, boxColor?: string) {
  const radiusRatio = 16 / 40;
  const iconSizeRatio = 24 / 40;
  const size = boxSize ? boxSize : 40;
  const styles = StyleSheet.create({
    container: {
      width: size,
      height: size,
      backgroundColor: boxColor ? boxColor : 'white',
      borderRadius: size * radiusRatio,
      alignItems: 'center',
      justifyContent: 'center',
    },
  });
  const iconSize = size * iconSizeRatio;
  return {
    styles,
    iconSize,
  };
}

export const styleGen = memoize(styleGenerator);
