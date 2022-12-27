import { StatusBar } from 'react-native';
import { width, deviceHeight, platform } from '../utils/deviceUi.js';
// import Navigation from 'navigation/library';

const guidelineBaseWidth = 350; // (375?) //standard width which will be used as base for calculating the scale.
const guidelineBaseHeight = 680; // guideline height for standard 5" device screen is 680 .standard height which will be used as base for calculating the scale.

export const hexToRgba = (hex, a = 1) => {
  // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
  const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
  hex = hex.replace(shorthandRegex, function (m, r, g, b) {
    return r + r + g + g + b + b;
  });

  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? `rgba(${parseInt(result[1], 16)},
    ${parseInt(result[2], 16)},
    ${parseInt(result[3], 16)}, ${a})`
    : hex;
};

// let statusBarHeight = 0;
// CustomNavigation.constants().then((constants) => {
//   statusBarHeight = constants.statusBarHeight;
// });
// export const getStatusBarHeight = () => statusBarHeight;
// platform === 'ios' ? 40 : StatusBar.currentHeight;

export const fontPercent = (percent) => {
  const heightPercent = (percent * deviceHeight) / 100;
  return Math.round(heightPercent);
};

export const fontSize = (size) => {
  const heightPercent = (size * deviceHeight) / guidelineBaseHeight;
  return Math.round(heightPercent);
};

export const scaleSize = (size) => Math.round((width / guidelineBaseWidth) * size); // size * PixelRatio.getFontScale();
