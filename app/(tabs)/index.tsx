import { Pressable, StyleSheet, Text, View } from 'react-native';

import FareCard from '@/components/FareCard';
import TrainMap from '@/components/Map';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import RouteCard from '@/components/RouteCard';
import { colors } from '@/constants/colors';
import { useStation } from '@/context/StationContext';
import stationsData from '@/data/trains/lrt2/stations.json';

export default function HomeScreen() {
  const { fromStation, toStation } = useStation();

  return (
    <ParallaxScrollView>
      <View style={styles.mapContainer}>
        {/* Change Train Track: soon */}
        <Pressable className="absolute w-full top-2 left-0 right-0 z-10 items-center">
          <View
            className="rounded-xl"
            style={[
              styles.trackLabel,
              { backgroundColor: 'rgba(255, 255, 255, 0.9)' },
            ]}
          >
            <Text className="font-inter text-sm text-gray-100">
              Current Line
            </Text>
            <Text className="font-interSemiBold text-2xl ">
              {stationsData.line}
            </Text>
          </View>
        </Pressable>
        <TrainMap height={300} />
      </View>
      <RouteCard />
      {fromStation && toStation && <FareCard />}
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  mapContainer: {
    height: 250,
    width: 'auto',
    borderRadius: 10,
    overflow: 'hidden',
  },
  trackLabel: {
    width: '90%',
    marginHorizontal: 10,
    paddingBlock: 7,
    paddingInline: 10,
    borderLeftColor: colors.primary[500],
    borderLeftWidth: 10,
  },
});
