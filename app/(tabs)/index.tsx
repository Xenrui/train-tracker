import { StyleSheet, View } from 'react-native';

import FareCard from '@/components/FareCard';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import RouteCard from '@/components/RouteCard';
import stationsData from '@/data/trains/lrt2/stations.json';
import MapView from 'react-native-maps';

export default function HomeScreen() {
  return (
    <ParallaxScrollView>
      <View style={styles.mapContainer}>
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
      <RouteCard stations={stationsData.stations} />
      <FareCard price={14} />
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
});
