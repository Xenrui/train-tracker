import StationCodeBadge from '@/components/ui/StationCodeBadge';
import { colors } from '@/constants/colors';
import trackGeoJSON from '@/data/trains/lrt2/route.json';
import stationsJSON from '@/data/trains/lrt2/stations.json';
import Mapbox from '@rnmapbox/maps';
import Constants from 'expo-constants';
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';

const mapboxToken =
  Constants.expoConfig?.extra?.EXPO_PUBLIC_MAPBOX_ACCESS_TOKEN;
Mapbox.setAccessToken(mapboxToken);

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
  };
};

// Convert track to proper GeoJSON LineString
const getTrackGeoJSON = () => {
  return {
    type: 'Feature' as const,
    properties: {},
    geometry: {
      type: 'LineString' as const,
      coordinates: trackGeoJSON.geometry.coordinates,
    },
  };
};

export default function TrainMap() {
  const [selectedStation, setSelectedStation] = useState<string | null>(null);
  const center = getMapRegion();

  return (
    <Mapbox.MapView style={{ flex: 1 }}>
      <Mapbox.Camera
        zoomLevel={12}
        centerCoordinate={[center.longitude, center.latitude]}
      />

      {/* Track Line */}
      <Mapbox.ShapeSource id="route" shape={getTrackGeoJSON()}>
        <Mapbox.LineLayer
          id="routeLine"
          style={{
            lineColor: colors.primary[300],
            lineWidth: 5,
            lineCap: 'round',
            lineJoin: 'round',
          }}
        />
      </Mapbox.ShapeSource>

      {/* Station Markers */}
      {stationsJSON.stations.map((station) => {
        const isSelected = selectedStation === station.code;

        return (
          <Mapbox.PointAnnotation
            key={station.code}
            id={station.code}
            coordinate={[station.longitude, station.latitude]}
            onSelected={() => setSelectedStation(station.code)}
            onDeselected={() => setSelectedStation(null)}
          >
            <View style={styles.markerContainer}>
              {/* Show badge above marker when selected */}
              {isSelected && (
                <View style={styles.badgeWrapper}>
                  <StationCodeBadge
                    trackLine="LRT-2"
                    stationCode={station.code}
                    stationName={station.name}
                  />
                </View>
              )}

              {/* Marker pin */}
              <View
                style={[
                  styles.marker,
                  {
                    backgroundColor: colors.primary[700],
                    width: isSelected ? 18 : 15,
                    height: isSelected ? 18 : 15,
                  },
                ]}
              />
            </View>
          </Mapbox.PointAnnotation>
        );
      })}
    </Mapbox.MapView>
  );
}

const styles = StyleSheet.create({
  markerContainer: {
    alignItems: 'center',
  },
  badgeWrapper: {
    marginBottom: 8,
  },
  marker: {
    borderRadius: 50,
    borderWidth: 2,
    borderColor: 'white',
  },
});
