import { themeFonts } from '@/constants/theme';
import { useThemeColor } from '@/hooks/use-theme-color';
import { ThemedTextProps } from '@/types/types';
import { StyleSheet, Text } from 'react-native';

export function ThemedText({
  style,
  color,
  lightColor,
  darkColor,
  type = 'default',
  ...rest
}: ThemedTextProps) {
  const themeColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    color ?? 'textPrimary',
  );

  return (
    <Text
      style={[
        { color: themeColor, fontFamily: themeFonts[type] },
        styles[type],
        style,
      ]}
      {...rest}
    />
  );
}

const styles = StyleSheet.create({
  small: {
    fontSize: 14,
  },
  default: {
    fontSize: 16,
  },
  defaultSemiBold: {
    fontSize: 20,
  },
  title: {
    fontSize: 36,
  },
  subtitle: {
    fontSize: 24,
  },
  link: {
    fontSize: 16,
    color: '#0a7ea4',
  },
});
