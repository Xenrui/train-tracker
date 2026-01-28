import type { PropsWithChildren, ReactElement } from 'react';
import { StyleSheet } from 'react-native';
import Animated, {
  interpolate,
  useAnimatedRef,
  useAnimatedStyle,
  useScrollOffset,
} from 'react-native-reanimated';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { lightTheme } from '@/constants/theme';
import { useThemeColor } from '@/hooks/use-theme-color';

const HEADER_HEIGHT = 150;

type Props = PropsWithChildren<{
  headerImage?: ReactElement;
  headerBackgroundColor: keyof typeof lightTheme;
}>;

export default function ParallaxScrollView({
  children,
  headerImage,
  headerBackgroundColor,
}: Props) {
  const primary = useThemeColor({}, headerBackgroundColor);
  const background = useThemeColor({}, 'background');
  const scrollRef = useAnimatedRef<Animated.ScrollView>();
  const scrollOffset = useScrollOffset(scrollRef);
  const headerAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: interpolate(
            scrollOffset.value,
            [-HEADER_HEIGHT, 0, HEADER_HEIGHT],
            [-HEADER_HEIGHT / 2, 0, HEADER_HEIGHT * 0.75],
          ),
        },
        {
          scale: interpolate(
            scrollOffset.value,
            [-HEADER_HEIGHT, 0, HEADER_HEIGHT],
            [2, 1, 1],
          ),
        },
      ],
    };
  });

  return (
    <Animated.ScrollView
      ref={scrollRef}
      style={{ backgroundColor: primary, flex: 1 }}
      contentContainerStyle={{ flexGrow: 1 }}
      scrollEventThrottle={16}
    >
      <Animated.View
        style={[
          styles.header,
          { backgroundColor: primary },
          headerAnimatedStyle,
        ]}
      >
        <ThemedView
          style={[styles.headerContent, { backgroundColor: primary }]}
        >
          <ThemedText type="title" lightColor="#fff">
            Lakbay
          </ThemedText>
          <ThemedText type="small" lightColor="#fff">
            A Commuter&apos;s Guide for the Filipinos
          </ThemedText>
        </ThemedView>
      </Animated.View>
      <ThemedView style={[styles.content, { backgroundColor: background }]}>
        {children}
      </ThemedView>
    </Animated.ScrollView>
  );
}

const styles = StyleSheet.create({
  header: {
    height: HEADER_HEIGHT,
    justifyContent: 'center',
    overflow: 'hidden',
  },
  headerContent: {
    flexDirection: 'column',
    height: HEADER_HEIGHT,
    justifyContent: 'flex-end',
    paddingBlockEnd: 20,
    gap: 8,
    overflow: 'hidden',
    paddingHorizontal: 20,
  },
  content: {
    flex: 1,
    padding: 32,
    gap: 16,
    overflow: 'hidden',
    borderTopStartRadius: 20,
    borderTopEndRadius: 20,
  },
});
