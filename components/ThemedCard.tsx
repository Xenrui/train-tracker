import { useThemeColor } from '@/hooks/use-theme-color';
import { ThemedViewProps } from '@/types/types';
import React from 'react';
import { StyleSheet, View } from 'react-native';

const ThemedCard = ({
  style,
  lightColor,
  darkColor,
  ...otherProps
}: ThemedViewProps) => {
  const backgroundColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    'surface',
  );

  const borderColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    'neutral-light',
  );

  return (
    <View
      style={[{ backgroundColor, borderColor }, style, styles.card]}
      {...otherProps}
    />
  );
};

export default ThemedCard;

const styles = StyleSheet.create({
  card: {
    marginHorizontal: 10,
    padding: 20,
    borderRadius: 16,
    height: '100%',
  },
});
