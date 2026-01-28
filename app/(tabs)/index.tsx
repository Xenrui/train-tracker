import { StyleSheet } from 'react-native';

import ParallaxScrollView from '@/components/ParallaxScrollView';
import RouteCard from '@/components/RouteCard';
import ThemedCard from '@/components/ThemedCard';
import { ThemedView } from '@/components/ThemedView';
import stationsData from '@/data/trains/lrt2/stations.json';
import MapView from 'react-native-maps';

export default function HomeScreen() {
  return (
    <ParallaxScrollView headerBackgroundColor={'primary-default'}>
      <ThemedView style={styles.mapContainer}>
        <MapView
          style={StyleSheet.absoluteFill}
          initialRegion={{
            latitude: 14.5995,
            longitude: 120.9842,
            latitudeDelta: 0.05,
            longitudeDelta: 0.05,
          }}
        />
      </ThemedView>
      <RouteCard stations={stationsData.stations} />
      <ThemedCard style={styles.fareCard} />
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  mapContainer: {
    backgroundColor: '#ddd',
    height: 250,
    width: 'auto',
    borderRadius: 10,
    overflow: 'hidden',
  },
  fareCard: {
    height: 600,
    width: 'auto',
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});
