import { darkTheme, lightTheme } from '@/constants/theme';
import { TextProps, ViewProps } from 'react-native';

export interface ThemeProps {
  lightColor?: string;
  darkColor?: string;
}

export interface ThemedTextProps extends TextProps, ThemeProps {
  color?: keyof typeof lightTheme & keyof typeof darkTheme;
  type?:
    | 'small'
    | 'default'
    | 'title'
    | 'defaultSemiBold'
    | 'subtitle'
    | 'link';
}

export interface ThemedViewProps extends ViewProps, ThemeProps {}
