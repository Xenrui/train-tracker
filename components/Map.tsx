import { colors } from '@/constants/colors';
import { useStation } from '@/context/StationContext';
import trackGeoJSON from '@/data/trains/lrt2/route.json';
import stationsJSON from '@/data/trains/lrt2/stations.json';
import { StyleSheet, View } from 'react-native';
import MapView, { Marker, Polyline, PROVIDER_GOOGLE } from 'react-native-maps';

const LRT2_TRACK = (trackGeoJSON.geometry.coordinates as [number, number][])
  .map((coord) => ({
    latitude: coord[1],
    longitude: coord[0],
  }))
  .reverse(); // Reverse to go from Recto → Antipolo

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
    latitudeDelta: (maxLat - minLat) * 1.1,
    longitudeDelta: (maxLng - minLng) * 1.1,
  };
};

interface TrainMapProps {
  height?: number;
}

export default function TrainMap({ height = 250 }: TrainMapProps) {
  const { fromStation, toStation } = useStation();

  const getMarkerColor = (stationId: string) => {
    if (fromStation?.id === stationId) return colors.success[500];
    if (toStation?.id === stationId) return colors.error[500];
    return colors.primary[500];
  };

  return (
    <MapView
      key="lrt2-map"
      provider={PROVIDER_GOOGLE}
      style={StyleSheet.absoluteFillObject}
      region={getMapRegion()}
      mapType="standard"
    >
      {/* Trackline */}
      <Polyline
        coordinates={LRT2_TRACK}
        strokeColor={colors.primary[500]}
        strokeWidth={5}
        lineCap="round"
        lineJoin="round"
      />

      {/* Station Markers */}
      {stationsJSON.stations.map((station) => {
        const isSelected =
          station.id === fromStation?.id || station.id === toStation?.id;

        return (
          <Marker
            key={station.id}
            coordinate={{
              latitude: station.latitude,
              longitude: station.longitude,
            }}
            title={station.name}
            description={station.is_terminal ? 'Terminal Station' : undefined}
            anchor={{ x: 0.5, y: 0.5 }}
            centerOffset={{ x: 0, y: 0 }}
          >
            <View
              style={[
                styles.marker,
                {
                  backgroundColor: getMarkerColor(station.id),
                  borderWidth: isSelected ? 3 : 2,
                  width: 25,
                  height: 25,
                },
              ]}
            />
          </Marker>
        );
      })}
    </MapView>
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
