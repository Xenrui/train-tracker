import { colors } from '@/constants/colors';
import { useStation } from '@/context/StationContext';
import { StyleSheet, View } from 'react-native';
import MapView, { Marker, Polyline, PROVIDER_GOOGLE } from 'react-native-maps';

// Import the GeoJSON track from OSM
import trackGeoJSON from '@/data/trains/lrt2/route.json';
import stationsJSON from '@/data/trains/lrt2/stations.json';

const LRT2_TRACK_FROM_GEOJSON = (
  trackGeoJSON.geometry.coordinates as [number, number][]
)
  .map((coord) => ({
    latitude: coord[1],
    longitude: coord[0],
  }))
  .reverse(); // Reverse to go from Recto → Antipolo

// Calculate region to fit all stations
const getMapRegion = () => {
  const latitudes = stationsJSON.stations.map((s) => s.latitude);
  const longitudes = stationsJSON.stations.map((s) => s.longitude);

  const minLat = Math.min(...latitudes);
  const maxLat = Math.max(...latitudes);
  const minLng = Math.min(...longitudes);
  const maxLng = Math.max(...longitudes);

  return {
    latitude: (minLat + maxLat) / 2,
    longitude: (minLng + maxLng) / 2,
    latitudeDelta: (maxLat - minLat) * 1.4,
    longitudeDelta: (maxLng - minLng) * 1.4,
  };
};

interface TrainMapProps {
  height?: number;
}

export default function TrainMap({ height = 300 }: TrainMapProps) {
  const { fromStation, toStation } = useStation();

  const getMarkerColor = (stationId: string) => {
    if (fromStation?.id === stationId) return '#10b981'; // green - origin
    if (toStation?.id === stationId) return '#ef4444'; // red - destination
    return colors.primary[500]; // purple - default
  };

  return (
    <View style={[styles.container, { height }]}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={StyleSheet.absoluteFillObject}
        initialRegion={getMapRegion()}
        mapType="standard"
      >
        {/* LRT-2 Track Line from GeoJSON */}
        <Polyline
          coordinates={LRT2_TRACK_FROM_GEOJSON}
          strokeColor={colors.primary[500]}
          strokeWidth={5}
          lineCap="round"
          lineJoin="round"
        />

        {/* Station Markers */}
        {stationsJSON.stations.map((station) => {
          const isSelected =
            station.id === fromStation?.id || station.id === toStation?.id;

          const markerSize = isSelected ? 20 : 14;

          return (
            <Marker
              key={station.id}
              coordinate={{
                latitude: station.latitude,
                longitude: station.longitude,
              }}
              title={station.name}
              description={station.is_terminal ? 'Terminal Station' : undefined}
              centerOffset={{ x: 0, y: 0 }}
            >
              <View
                style={[
                  styles.marker,
                  {
                    backgroundColor: getMarkerColor(station.id),
                    borderWidth: isSelected ? 3 : 2,
                    width: markerSize,
                    height: markerSize,
                  },
                ]}
              />
            </Marker>
          );
        })}
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    borderRadius: 12,
    overflow: 'hidden',
  },
  marker: {
    borderRadius: 50,
    borderColor: 'white',
  },
});
