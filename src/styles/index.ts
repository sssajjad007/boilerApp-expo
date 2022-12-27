import { Body, Headline, margin, Title } from './theme/constants';
import styled from 'styled-components/native';
import { ScrollView } from 'react-native';
import { ActivityIndicator, RefreshControl } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { width } from '../utils/deviceUi';
import Animated from 'react-native-reanimated';

export * from './theme/constants';
// export const LoadingIndicator = styled(ActivityIndicator).attrs((p) => ({
//   color: p.color || p.theme.colors.primary,
//   size: p.size || 'large',
// }))`
//   /* margin-bottom: ${margin.large}; */
//   ${(props) => (props.Icon ? { position: 'absolute', right: 16 } : null)}
// `;
export const Headline1 = styled.Text`
  ${Headline.Heading1}
  color: ${(props) => props.theme.colors.Gray.Black};
`;
export const Headline2 = styled.Text`
  ${Headline.Heading2}
  color: ${(props) => props.theme.colors.Gray.Black};
`;
export const Headline3 = styled.Text`
  ${Headline.Heading3}
  color: ${(props) => props.theme.colors.Gray.Black};
`;
export const Headline4 = styled.Text`
  ${Headline.Heading4}
  color: ${(props) => props.theme.colors.Gray.Black};
`;
export const Headline5 = styled.Text`
  ${Headline.Heading5}
  color: ${(props) => props.theme.colors.Gray.Black};
`;
///////////////////////////////////////////////////////
export const TitleLarge = styled.Text`
  ${Title.Large}
  color: ${(props) => props.theme.colors.Gray.Black};
`;
export const TitleRegular = styled.Text`
  ${Title.Regular}
  color: ${(props) => props.theme.colors.Gray.Black};
`;
export const TitleSmall = styled.Text`
  ${Title.Small}
  color: ${(props) => props.theme.colors.Gray.Black};
`;
export const TitleXLarge = styled.Text`
  ${Title.xLarge}
  color: ${(props) => props.theme.colors.Gray.Black};
`;
export const titleXSmall = styled.Text`
  ${Title.xSmall}
  color: ${(props) => props.theme.colors.Gray.Black};
`;
///////////////////////////////////////////////////////
export const BodyLarge = styled.Text`
  ${Body.Large}
  color: ${(props) => props.theme.colors.Gray.Black};
`;
export const BodyRegular = styled.Text`
  ${Body.Regular}
  color: ${(props) => props.theme.colors.Gray.Black};
`;
export const BodySmall = styled.Text`
  ${Body.Small}
  color: ${(props) => props.theme.colors.Gray.Black};
`;
export const BodyXLarge = styled.Text`
  ${Body.xLarge}
  color: ${(props) => props.theme.colors.Gray.Black};
`;
export const BodyXSmall = styled.Text`
  ${Body.xSmall}
  color: ${(props) => props.theme.colors.Gray.Black};
`;
///////////////////////////////////////////////////////
export const HIT_SLOP: number = 10;

export const Container = styled(SafeAreaView)`
  flex: 1;
  background-color: ${(p) => p.theme.colors.Gray.White};
`;

export const ScrollViewContainer = styled(ScrollView).attrs({
  showsVerticalScrollIndicator: false,
  contentContainerStyle: { alignItems: 'center' },
})`
  flex: 1;
  background-color: ${(p) => p.theme.colors.Gray.White};
`;
export const TextError = styled(BodySmall)`
  width: 100%;
  padding-top: 4px;
  color: ${(props) => props.theme.colors.Error.Main};
`;
export const LoadingIndicator = styled(ActivityIndicator).attrs((p) => ({
  color: p.color || p.theme.colors.Gray.White,
  size: p.size || 'small',
}))`
  ${(props: { hasIcon?: boolean }) => (props.hasIcon ? { position: 'absolute', right: 16 } : null)}
`;
export const Logo = styled.ImageBackground.attrs((p) => ({
  source: { uri: 'logo' },
  resizeMode: 'contain',
}))`
  align-self: center;
  height: 80px;
  width: 80px;
`;
export const LogoWhite = styled.ImageBackground.attrs((p) => ({
  source: { uri: 'logowhite' },
  resizeMode: 'contain',
}))`
  align-self: center;
  height: 200px;
  width: 200px;
`;

export const RefreshLoading = styled(RefreshControl).attrs((p) => ({
  tintColor: p.theme.colors.Primary.Main,
  colors: [p.theme.colors.Primary.Main],
}))``;
export const SplashBackground = styled(Animated.View)`
  flex: 1;
  width: ${width}px;
  justify-content: center;
  align-items: center;
  background-color: ${(p) => p.theme.colors.Primary.Main};
  padding: 0 ${margin.xThin}px;
`;

// export const HyperLink = styled.Text`
//   ${text.normal};
//   /* width: 80%; */
//   color: ${(props) => props.theme.textColor};
//   /* padding: ${margin.large}px 0; */
//   text-align: center;
//   align-self: center;
// `;
// export const TitleModal = styled(Normaltitle)`
//   text-align: center;
//   margin: ${margin.normal}px 0;
// `;
// export const Line = styled.View`
//   width: 90%;
//   align-self: center;
//   height: ${1}px;
//   margin: 20px 0;
//   background-color: ${(p) => p.theme.line};
// `;
// export const Row = styled.View`
//   flex: 1;
//   ${(p) => (p.inline ? { flexDirection: 'row', justifyContent: 'space-evenly' } : null)}
// `;

// export const Col = styled.View`
//   flex: 1;
//   ${(p) => (p.lastItem ? { paddingEnd: 0 } : { paddingEnd: 16 })}
// `;
