import { darkTheme, lightTheme } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

export function useThemeColor(
  props: { light?: string; dark?: string },
  colorPath: keyof typeof lightTheme & keyof typeof darkTheme,
) {
  const scheme = useColorScheme() ?? 'light';
  const theme = scheme === 'light' ? lightTheme : darkTheme;

  return props[scheme] ?? theme[colorPath];
}
