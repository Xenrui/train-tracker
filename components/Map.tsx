import StationCodeBadge from '@/components/ui/StationCodeBadge';
import { colors } from '@/constants/colors';
import trackGeoJSON from '@/data/trains/lrt2/route.json';
import stationsJSON from '@/data/trains/lrt2/stations.json';
import Mapbox from '@rnmapbox/maps';
import Constants from 'expo-constants';
import { useCallback, useMemo, useRef, useState } from 'react';
import { Platform, StyleSheet, View } from 'react-native';

const mapboxToken = Constants.expoConfig?.extra?.mapboxAccessToken;
Mapbox.setAccessToken(mapboxToken);

const getMapCenter = () => {
  const latitudes = stationsJSON.stations.map((s) => s.latitude);
  const longitudes = stationsJSON.stations.map((s) => s.longitude);

  return {
    latitude: (Math.min(...latitudes) + Math.max(...latitudes)) / 2,
    longitude: (Math.min(...longitudes) + Math.max(...longitudes)) / 2,
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

// Station marker size
const MARKER_SIZE = 14;
const MARKER_SELECTED_SIZE = 18;
const MARKER_BORDER_WIDTH = 2.5;

export default function TrainMap() {
  const [selectedStation, setSelectedStation] = useState<string | null>(null);
  const cameraRef = useRef<Mapbox.Camera>(null);
  const center = useMemo(() => getMapCenter(), []);

  const handleMarkerPress = useCallback((stationCode: string) => {
    setSelectedStation((prev) => (prev === stationCode ? null : stationCode));
  }, []);

  const handleMapPress = useCallback(() => {
    setSelectedStation(null);
  }, []);

  return (
    <Mapbox.MapView
      style={styles.map}
      styleURL={Mapbox.StyleURL.Light}
      logoEnabled={false}
      attributionEnabled={false}
      scaleBarEnabled={false}
      compassEnabled={true}
      compassPosition={{ top: 16, right: 16 }}
      onPress={handleMapPress}
    >
      <Mapbox.Camera
        ref={cameraRef}
        defaultSettings={{
          centerCoordinate: [center.longitude, center.latitude],
          zoomLevel: 11.5,
        }}
        minZoomLevel={10}
        maxZoomLevel={16}
        animationMode="flyTo"
        animationDuration={300}
      />

      {/* Track Line with glow effect */}
      <Mapbox.ShapeSource id="route" shape={getTrackGeoJSON()}>
        <Mapbox.LineLayer
          id="routeLineGlow"
          style={{
            lineColor: colors.primary[200],
            lineWidth: 10,
            lineCap: 'round',
            lineJoin: 'round',
            lineOpacity: 0.4,
            lineBlur: 3,
          }}
        />
        {/* Main track line */}
        <Mapbox.LineLayer
          id="routeLine"
          style={{
            lineColor: colors.primary[500],
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
          <Mapbox.MarkerView
            key={station.code}
            id={`marker-${station.code}`}
            coordinate={[station.longitude, station.latitude]}
            anchor={{ x: 0.5, y: 0.5 }}
            allowOverlap={true}
            allowOverlapWithPuck={true}
          >
            <View
              style={styles.markerWrapper}
              onTouchEnd={() => handleMarkerPress(station.code)}
            >
              {/* Station marker */}
              <View
                style={[
                  styles.markerOuter,
                  {
                    width: isSelected
                      ? MARKER_SELECTED_SIZE + 6
                      : MARKER_SIZE + 4,
                    height: isSelected
                      ? MARKER_SELECTED_SIZE + 6
                      : MARKER_SIZE + 4,
                    backgroundColor: isSelected
                      ? colors.primary[100]
                      : 'transparent',
                  },
                ]}
              >
                <View
                  style={[
                    styles.marker,
                    {
                      width: isSelected ? MARKER_SELECTED_SIZE : MARKER_SIZE,
                      height: isSelected ? MARKER_SELECTED_SIZE : MARKER_SIZE,
                      backgroundColor: isSelected
                        ? colors.primary[600]
                        : colors.primary[700],
                      borderColor: 'white',
                      borderWidth: MARKER_BORDER_WIDTH,
                      ...Platform.select({
                        ios: {
                          shadowColor: '#000',
                          shadowOffset: { width: 0, height: 2 },
                          shadowOpacity: isSelected ? 0.3 : 0.2,
                          shadowRadius: isSelected ? 4 : 2,
                        },
                        android: {
                          elevation: isSelected ? 6 : 3,
                        },
                      }),
                    },
                  ]}
                >
                  {/* Inner dot for terminal stations */}
                  {station.is_terminal && (
                    <View
                      style={[
                        styles.terminalDot,
                        {
                          width: isSelected ? 6 : 4,
                          height: isSelected ? 6 : 4,
                        },
                      ]}
                    />
                  )}
                </View>
              </View>
            </View>
          </Mapbox.MarkerView>
        );
      })}

      {selectedStation &&
        (() => {
          const station = stationsJSON.stations.find(
            (s) => s.code === selectedStation,
          );
          if (!station) return null;

          return (
            <Mapbox.MarkerView
              key={`callout-${station.code}`}
              id={`callout-${station.code}`}
              coordinate={[station.longitude, station.latitude]}
              anchor={{ x: 0.5, y: 1 }}
              allowOverlap={true}
              allowOverlapWithPuck={true}
            >
              <View style={styles.calloutContainer}>
                <StationCodeBadge
                  trackLine="LRT-2"
                  stationCode={station.code}
                  stationName={station.name}
                />
                {/* Callout arrow */}
                <View style={styles.calloutArrow} />
              </View>
            </Mapbox.MarkerView>
          );
        })()}
    </Mapbox.MapView>
  );
}

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
  markerWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  calloutContainer: {
    alignItems: 'center',
    paddingBottom: 16, // Space between callout and marker
  },
  calloutArrow: {
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderLeftWidth: 8,
    borderRightWidth: 8,
    borderTopWidth: 8,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderTopColor: 'white',
    marginTop: -1,
  },
  markerOuter: {
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  marker: {
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  terminalDot: {
    borderRadius: 50,
    backgroundColor: 'white',
  },
});
