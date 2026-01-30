import { Pressable, StyleSheet, Text, View } from 'react-native';

import FareCard from '@/components/FareCard';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import RouteCard from '@/components/RouteCard';
import { colors } from '@/constants/colors';
import stationsData from '@/data/trains/lrt2/stations.json';
import MapView from 'react-native-maps';

export default function HomeScreen() {
  return (
    <ParallaxScrollView>
      <View style={styles.mapContainer}>
        {/* Change Train Tack: soon */}
        <Pressable className="absolute w-full top-2 left-0 right-0 z-10 items-center">
          <View className="rounded-xl bg-white" style={styles.trackLabel}>
            <Text className="font-inter text-sm text-gray-100">
              Current Line
            </Text>
            <Text className="font-interSemiBold text-2xl ">
              {stationsData.line}
            </Text>
          </View>
        </Pressable>
        <MapView
          style={StyleSheet.absoluteFillObject}
          initialRegion={{
            latitude: 14.5995,
            longitude: 120.9842,
            latitudeDelta: 0.05,
            longitudeDelta: 0.05,
          }}
        />
      </View>
      <RouteCard />
      <FareCard />
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
