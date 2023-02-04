import { Platform } from 'react-native';
import { scaleSize, fontSize } from '../mixins';
export const HIT_SLOP: number = 6;

export const margin = {
  large: scaleSize(32),
  normal: scaleSize(16),
  thin: scaleSize(8),
  xThin: scaleSize(4),
};

export const radius = {
  small: scaleSize(5),
  normal: scaleSize(10),
  large: scaleSize(15),
  full: scaleSize(100),
};

export const textSize = {
  xxSmall: fontSize(10),
  xSmall: fontSize(11),
  small: fontSize(13),
  normal: fontSize(14),
  large: fontSize(17), //icon for button
  xLarge: fontSize(22),
  xxLarge: fontSize(24),
  xxxLarge: fontSize(28),
  ultraLarge: fontSize(30),
  xUltraLarge: fontSize(40),
  xxUltraLarge: fontSize(45),
  xxxUltraLarge: fontSize(50),
};

export const lineHeight = {
  xxSmall: `${fontSize(10)}px`,
  xSmall: `${fontSize(13)}px`,
  small: `${fontSize(15)}px`,
  normal: `${fontSize(16)}px`,
  large: `${fontSize(20)}px`,
  xLarge: `${fontSize(25)}px`,
  xxLarge: `${fontSize(24)}px`,
  xxxLarge: `${fontSize(28)}px`,
  ultraLarge: `${fontSize(30)}px`,
  xUltraLarge: `${fontSize(40)}px`,
  xxUltraLarge: `${fontSize(45)}px`,
  xxxUltraLarge: `${fontSize(50)}px`,
};

export const fontStyle = {
  bold: {
    ...Platform.select({
      ios: {
        fontFamily: 'IRANSansMobileFaNum',
        fontWeight: '800',
      },
      android: {
        fontFamily: 'IRANSansMobileFaNum_Bold',
      },
    }),
  },
  normal: {
    ...Platform.select({
      ios: {
        fontFamily: 'IRANSansMobileFaNum',
        fontWeight: '400',
      },
      android: {
        fontFamily: 'IRANSansMobileFaNum',
      },
    }),
  },
};

const writingDirection = {
  writingDirection: 'rtl',
};

export const Headline = {
  Heading1: {
    ...fontStyle.bold,
    fontSize: 48,
    lineHeight: '52px',
    // ...writingDirection,
  },
  Heading2: {
    ...fontStyle.bold,
    fontSize: 36,
    lineHeight: '40px',
    // ...writingDirection,
  },
  Heading3: {
    ...fontStyle.bold,
    fontSize: 32,
    lineHeight: '36px',
    // ...writingDirection,
  },
  Heading4: {
    ...fontStyle.bold,
    fontSize: 28,
    lineHeight: '32px',
    // ...writingDirection,
  },
  Heading5: {
    ...fontStyle.bold,
    fontSize: 24,
    lineHeight: '28px',
    // ...writingDirection,
  },
};

export const Title = {
  xLarge: {
    ...fontStyle.bold,
    fontSize: 20,
    lineHeight: '24px',
    // ...writingDirection,
  },
  Large: {
    ...fontStyle.bold,
    fontSize: 16,
    lineHeight: '20px',
    // ...writingDirection,
  },
  Regular: {
    ...fontStyle.bold,
    fontSize: 14,
    lineHeight: '18px',
    // ...writingDirection,
  },
  Small: {
    ...fontStyle.bold,
    fontSize: 12,
    lineHeight: '16px',
    // ...writingDirection,
  },
  xSmall: {
    ...fontStyle.bold,
    fontSize: 10,
    lineHeight: '14px',
    // ...writingDirection,
  },
};

export const Body = {
  xLarge: {
    ...fontStyle.normal,
    fontSize: 20,
    lineHeight: '24px',
    // ...writingDirection,
  },
  Large: {
    ...fontStyle.normal,
    fontSize: 16,
    lineHeight: '20px',
    // ...writingDirection,
  },
  Regular: {
    ...fontStyle.normal,
    fontSize: 14,
    lineHeight: '18px',
    // ...writingDirection,
  },
  Small: {
    ...fontStyle.normal,
    fontSize: 12,
    lineHeight: '16px',
    // ...writingDirection,
  },
  xSmall: {
    ...fontStyle.normal,
    fontSize: 10,
    lineHeight: '14px',
    // ...writingDirection,
  },
};
