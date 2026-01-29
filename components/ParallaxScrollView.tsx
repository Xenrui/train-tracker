import { ScrollViewProps, Text, View } from 'react-native';
import Animated, {
  interpolate,
  useAnimatedRef,
  useAnimatedStyle,
  useScrollOffset,
} from 'react-native-reanimated';

const HEADER_HEIGHT = 150;

type Props = ScrollViewProps;

export default function ParallaxScrollView({ children }: Props) {
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
      className="bg-primary-500"
      contentContainerStyle={{ flexGrow: 1 }}
      scrollEventThrottle={16}
    >
      <Animated.View style={[{ height: HEADER_HEIGHT }, headerAnimatedStyle]}>
        <View className="p-5 justify-end h-full flex flex-col">
          <Text className="text-white text-5xl font-interBold align-bottom leading-normal">
            Lakbay
          </Text>
          <Text className="text-white font-inter">
            A Commuter&apos;s Guide for the Filipinos
          </Text>
        </View>
      </Animated.View>
      <View className="flex-1 p-3 rounded-t-3xl gap-5 bg-gray-50 ">
        {children}
      </View>
    </Animated.ScrollView>
  );
}
