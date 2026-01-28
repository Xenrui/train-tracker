/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

import { Platform } from 'react-native';

const palette = {
  primary: {
    50: '#e6f0fd',
    100: '#cce0fb',
    200: '#99c2f7',
    300: '#66a3f3',
    400: '#3385ef',
    500: '#0066eb',
    600: '#0052bc',
    700: '#003d8d',
    800: '#00295e',
    900: '#00142f',
  },
  secondary: {
    50: '#ffede6',
    100: '#ffdbcc',
    200: '#ffb799',
    300: '#ff9466',
    400: '#ff7033',
    500: '#ff4d00',
    600: '#cc3e00',
    700: '#992e00',
    800: '#661f00',
    900: '#330f00',
  },
  gray: {
    50: '#f8f9fa',
    100: '#f1f3f5',
    200: '#e9ecef',
    300: '#dee2e6',
    400: '#ced4da',
    500: '#adb5bd',
    600: '#868e96',
    700: '#495057',
    800: '#343a40',
    900: '#212529',
  },
};

export const lightTheme = {
  'primary-light': palette.primary[300],
  'primary-default': palette.primary[500],
  'primary-dark': palette.primary[700],

  'secondary-light': palette.secondary[300],
  'secondary-default': palette.secondary[500],
  'secondary-dark': palette.secondary[700],

  'neutral-light': palette.gray[200],
  'neutral-default': palette.gray[500],
  'neutral-dark': palette.gray[900],

  background: palette.gray[50],
  surface: '#fff',
  textPrimary: palette.gray[900],
  textSecondary: palette.gray[600],
  textTertiary: palette.gray[500],
  iconDefault: '#687076',
  iconSelected: palette.primary[500],
  tint: palette.primary[500],
};

export const darkTheme = {
  primary: {
    light: palette.primary[300],
    DEFAULT: palette.primary[500],
    dark: palette.primary[700],
  },
  secondary: {
    light: palette.secondary[300],
    DEFAULT: palette.secondary[500],
    dark: palette.secondary[700],
  },
  gray: {
    light: palette.gray[200],
    DEFAULT: palette.gray[500],
    dark: palette.gray[900],
  },

  background: '#151718',
  surface: '#1A1C1D',
  textPrimary: '#ECEDEE',
  textSecondary: palette.gray[500],
  textTertiary: palette.gray[600],
  iconDefault: '#9BA1A6',
  iconSelected: palette.gray[900],
  tint: palette.gray[900],
};

export const themeFonts = {
  default: 'Inter_400Regular',
  defaultSemiBold: 'Inter_600SemiBold',
  title: 'Inter_700Bold',
  subtitle: 'Inter_600SemiBold',
  link: 'Inter_500Medium',
};

export const Fonts = Platform.select({
  ios: {
    /** iOS `UIFontDescriptorSystemDesignDefault` */
    sans: 'system-ui',
    /** iOS `UIFontDescriptorSystemDesignSerif` */
    serif: 'ui-serif',
    /** iOS `UIFontDescriptorSystemDesignRounded` */
    rounded: 'ui-rounded',
    /** iOS `UIFontDescriptorSystemDesignMonospaced` */
    mono: 'ui-monospace',
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
  web: {
    sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    serif: "Georgia, 'Times New Roman', serif",
    rounded:
      "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
    mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  },
});
