import { Body, Headline, margin, textSize, Title } from './theme/constants';
import styled, { DefaultTheme } from 'styled-components/native';
import { Image, ScrollView } from 'react-native';
import { ActivityIndicator, RefreshControl } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { width } from '../utils/deviceUi';
import Animated from 'react-native-reanimated';
import Icon from '../components/Icon';

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
  color: ${(props) => props.theme.colors.Gray[0]};
`;
export const Headline2 = styled.Text`
  ${Headline.Heading2}
  color: ${(props) => props.theme.colors.Gray[0]};
`;
export const Headline3 = styled.Text`
  ${Headline.Heading3}
  color: ${(props) => props.theme.colors.Gray[0]};
`;
export const Headline4 = styled.Text`
  ${Headline.Heading4}
  color: ${(props) => props.theme.colors.Gray[0]};
`;
export const Headline5 = styled.Text`
  ${Headline.Heading5}
  color: ${(props) => props.theme.colors.Gray[0]};
`;
///////////////////////////////////////////////////////
export const TitleLarge = styled.Text`
  ${Title.Large}
  color: ${(props) => props.theme.colors.Gray[0]};
`;
export const TitleRegular = styled.Text`
  ${Title.Regular}
  color: ${(props) => props.theme.colors.Gray[0]};
`;
export const TitleSmall = styled.Text`
  ${Title.Small}
  color: ${(props) => props.theme.colors.Gray[0]};
`;
export const TitleXLarge = styled.Text`
  ${Title.xLarge}
  color: ${(props) => props.theme.colors.Gray[0]};
`;
export const titleXSmall = styled.Text`
  ${Title.xSmall}
  color: ${(props) => props.theme.colors.Gray[0]}; //change to 0
`;
///////////////////////////////////////////////////////
export const BodyLarge = styled.Text`
  ${Body.Large}
  color: ${(props) => props.theme.colors.Gray[0]};
`;
export const BodyRegular = styled.Text`
  ${Body.Regular}
  color: ${(props) => props.theme.colors.Gray[0]};
`;
export const BodySmall = styled.Text`
  ${Body.Small}
  color: ${(props) => props.theme.colors.Gray[0]};
`;
export const BodyXLarge = styled.Text`
  ${Body.xLarge}
  color: ${(props) => props.theme.colors.Gray[0]};
`;
export const BodyXSmall = styled.Text`
  ${Body.xSmall}
  color: ${(props) => props.theme.colors.Gray[0]};
`;
///////////////////////////////////////////////////////
export const HIT_SLOP: number = 20;

export const Container = styled(SafeAreaView).attrs({})`
  flex: 1;
  background-color: ${(p) => p.theme.colors.Gray.White};
`;
export const ScrollViewContainer = styled(ScrollView).attrs({
  showsVerticalScrollIndicator: false,
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
export const LoadingIndicatorPrimary = styled(ActivityIndicator).attrs((p) => ({
  color: p.color || p.theme.colors.Primary.Main,
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
  top: 12px;
  width: 182px;
  height: 162px;
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
  /* padding: 0 ${margin.xThin}px; */
`;
export const ButtonTabLabel = styled(BodySmall)`
  color: ${(p: { theme: DefaultTheme; focused: boolean }) =>
    p.focused ? p.theme.colors.Info.Main : p.theme.colors.Gray[50]};
`;
export const Item = styled.TouchableOpacity.attrs((p) => ({
  activeOpacity: 1,
}))`
  width: 90%;
  align-self: center;
  height: 56px;
  align-items: center;
  margin: ${margin.thin}px 0;
  padding: 0 ${margin.normal}px;
  flex-direction: row-reverse;
  justify-content: space-between;
  shadow-color: black;
  shadow-radius: 2px;
  shadow-opacity: 0.16;
  shadow-offset: 0px 1px;
  elevation: 2;
  border-radius: 10px;
  background-color: ${(p) => p.theme.colors.Gray.White};
`;
export const CenterView = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;
export const EmptyImageIcon = styled.Image.attrs({
  source: { uri: 'fooddefault' },
})`
  height: 100%;
  width: 100%;
  /* overflow: hidden; */
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
