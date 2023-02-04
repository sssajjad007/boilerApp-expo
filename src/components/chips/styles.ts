import memoize from 'fast-memoize';
import { StyleSheet } from 'react-native';
import styled, { DefaultTheme } from 'styled-components/native';
import { IChipsStyles } from './types';
import { width } from '../../utils/deviceUi';
import { ScrollView } from 'react-native';

function chipStyle(args: IChipsStyles) {
  const { primaryMode, selected, theme, backgroundColor } = args;

  const styles = StyleSheet.create({
    chips: {
      minWidth: 24,
      height: 35,
      borderWidth: 1,
      backgroundColor: buttonBackgroundColor(selected, backgroundColor, theme, primaryMode),
      borderColor: buttonBorderColor(theme, selected, primaryMode),
      borderRadius: 100,
      flexDirection: 'row-reverse',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: 16,
      overflow: 'hidden',
    },
    container: {
      marginHorizontal: 4,
    },
    text: {
      zIndex: 10,
      transform: [{ scaleX: -1 }],
    },
  });
  return { styles };
}
function buttonBackgroundColor(
  selected: boolean,
  backgroundColor: string | undefined,
  theme: DefaultTheme,
  primaryMode: boolean | undefined
) {
  if (backgroundColor) {
    return backgroundColor;
  }
  if (primaryMode) {
    return theme.colors.Primary.Main;
  }
  if (selected) {
    return theme.colors.Secondary.Main;
  }
  return theme.colors.Gray.White;
}
function buttonBorderColor(theme: DefaultTheme, selected: boolean, primaryMode: boolean | undefined) {
  if (selected) {
    return theme.colors.Secondary.Main;
  }
  if (primaryMode) {
    return theme.colors.Primary.Main;
  }
  return theme.colors.Gray[90];
}
export const styleGen = memoize(chipStyle);

export const ListScrollHorizontal = styled(ScrollView).attrs({
  horizontal: true,
  showsHorizontalScrollIndicator: false,
  scrollEventThrottle: 50,
  contentContainerStyle: { alignSelf: 'center' },
})`
  width: ${width}px;
  transform: scaleX(-1);
`;
