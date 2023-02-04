import { defaultThemeLight } from 'react-native-unicorn-modals';

// 2. Extend it with your properties
export const AlertTheme = {
  ...defaultThemeLight,
  overlayBackgroundColor: 'rgba(0, 0, 0, 0.36)',
  actionButtonColor: {
    ...defaultThemeLight.actionButtonColor,
    // destructive: 'red', // Change default destructive button color
  },
  //   titleTextColor: '#111', // Change default title color
  //   myCustomColor: 'red', // Add new property to use in your component
};
