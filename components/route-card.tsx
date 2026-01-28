import ThemedCard from '@/components/themed-card';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { darkTheme, lightTheme } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Station } from '@/types/types';
import React, { useState } from 'react';
import {
  StyleSheet,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from 'react-native';
import StationPickerModal from './station-picker-modal';
import { ThemedText } from './themed-text';

interface RouteCardProps {
  stations: Station[];
  style?: any;
}

export default function RouteCard({ stations, style }: RouteCardProps) {
  const [fromStation, setFromStation] = useState<Station | null>(null);
  const [toStation, setToStation] = useState<Station | null>(null);
  const [showFromModal, setShowFromModal] = useState(false);
  const [showToModal, setShowToModal] = useState(false);

  const colorScheme = useColorScheme();
  const theme = colorScheme === 'dark' ? darkTheme : lightTheme;

  const handleSwapStations = () => {
    const temp = fromStation;
    setFromStation(toStation);
    setToStation(temp);
  };

  return (
    <>
      <ThemedCard style={[styles.card, style]}>
        <View>
          {/* From Station */}
          <View>
            <View style={styles.labelContainer}>
              <View
                style={[
                  styles.dot,
                  { backgroundColor: theme['primary-default'] },
                ]}
              />
              <ThemedText type="small" color="textPrimary">
                From
              </ThemedText>
            </View>
            <TouchableOpacity
              style={[styles.stationButton]}
              onPress={() => setShowFromModal(true)}
            >
              <ThemedText type="subtitle" color="textSecondary">
                {fromStation ? fromStation.name : 'Select starting station'}
              </ThemedText>
            </TouchableOpacity>
          </View>

          {/* Swap Button */}
          <View style={styles.swapContainer}>
            <TouchableHighlight
              style={[styles.swapButton, { backgroundColor: theme['surface'] }]}
              onPress={handleSwapStations}
              activeOpacity={0.6}
              underlayColor={theme['neutral-light']}
              disabled={!fromStation && !toStation}
            >
              <IconSymbol
                name="arrow.up.arrow.down"
                color={theme['primary-dark']}
                size={30}
              />
            </TouchableHighlight>
            <View style={styles.divider} />
          </View>

          {/* To Station */}
          <View>
            <View style={styles.labelContainer}>
              <View style={[styles.dot, {}]} />
              <ThemedText type="small" color="textSecondary">
                To
              </ThemedText>
            </View>
            <TouchableOpacity
              style={[styles.stationButton]}
              onPress={() => setShowToModal(true)}
            >
              <ThemedText type="subtitle" color="textSecondary">
                {toStation ? toStation.name : 'Select destination station'}
              </ThemedText>
            </TouchableOpacity>
          </View>
        </View>

        {/* Route Info */}
        {/* {fromStation && toStation && (
          <View style={styles.routeInfo}>
            <View
              style={[
                styles.routeInfoBox,
                { backgroundColor: theme['surface-secondary'] },
              ]}
            >
              <ThemedText type="small" color="text-muted">
                Stations
              </ThemedText>
              <ThemedText type="defaultSemiBold">
                {Math.abs(toStation.order - fromStation.order)}
              </ThemedText>
            </View>
            <View
              style={[
                styles.routeInfoBox,
                { backgroundColor: theme['surface-secondary'] },
              ]}
            >
              <ThemedText type="small" color="text-muted">
                Direction
              </ThemedText>
              <ThemedText type="defaultSemiBold">
                {toStation.order > fromStation.order ? '→' : '←'}
              </ThemedText>
            </View>
          </View>
        )} */}
      </ThemedCard>

      {/* Modals */}
      <StationPickerModal
        visible={showFromModal}
        stations={stations}
        onClose={() => setShowFromModal(false)}
        onSelectStation={setFromStation}
        title="Select Starting Station"
        selectedStationId={fromStation?.id}
      />

      <StationPickerModal
        visible={showToModal}
        stations={stations}
        onClose={() => setShowToModal(false)}
        onSelectStation={setToStation}
        title="Select Destination Station"
        selectedStationId={toStation?.id}
      />
    </>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 20,
    borderRadius: 16,
  },
  cardTitle: {
    fontSize: 22,
    marginBottom: 20,
  },
  labelContainer: {
    flexDirection: 'row',
    position: 'absolute',
    insetBlockStart: -5,
    alignItems: 'center',
    gap: 8,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  stationButton: {
    padding: 16,
    borderRadius: 12,
  },
  swapContainer: {
    alignItems: 'flex-end',
    margin: 0,
  },
  swapButton: {
    width: 40,
    height: 40,
    borderRadius: 10,
    justifyContent: 'center',
    insetInlineEnd: '20%',
    alignItems: 'center',
    zIndex: 10,
  },
  divider: {
    width: '100%',
    borderTopColor: '#000',
    borderWidth: 0.5,
    insetBlock: '-50%',
  },
  routeInfo: {
    flexDirection: 'row',
    gap: 12,
  },
  routeInfoBox: {
    flex: 1,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
});
