import Icon from '../components/Icon';
import { PixelRatio, Platform } from 'react-native';

const replaceSuffixPattern = /--(active|big|small|very-big)/g;
// ex.  "md-cash--big":            [40, '#FFFFFF'],
const ICON_SIZE = !__DEV__ && Platform.OS === 'android' ? PixelRatio.getPixelSizeForLayoutSize(25) : 25;

const icons = {
  'icon_angle-left': [ICON_SIZE, '#000000'],
  icon_discount: [ICON_SIZE, '#000000'],
  icon_bookmark: [ICON_SIZE, '#000000'],
  icon_camera: [ICON_SIZE, '#000000'],
};

const defaultIconProvider = Icon;

let iconsMap = {};
let iconsLoaded = () => {
  return new Promise((resolve, reject) => {
    new Promise.all(
      Object.keys(icons).map((iconName) => {
        const Provider = icons[iconName][2] || defaultIconProvider; // Ionicons
        return Provider.getImageSource(
          iconName.replace(replaceSuffixPattern, ''),
          icons[iconName][0],
          icons[iconName][1]
        );
      })
    )
      .then((sources) => {
        Object.keys(icons).forEach((iconName, idx) => (iconsMap[iconName] = sources[idx]));

        // Call resolve (and we are done)
        resolve(true);
      })
      .catch(reject);
  });
};
export { iconsMap, iconsLoaded };
