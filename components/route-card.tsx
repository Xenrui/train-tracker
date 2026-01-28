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
        <View style={styles.timelineContainer}>
          <View
            style={[
              styles.timelineDot,
              { backgroundColor: theme['primary-dark'] },
            ]}
          />
          <View
            style={[
              styles.timelineLine,
              { backgroundColor: theme['primary-dark'] },
            ]}
          />
          <View
            style={[
              styles.timelineDot,
              { backgroundColor: theme['primary-dark'] },
            ]}
          />
        </View>
        <View style={styles.routeContainer}>
          {/* From Station */}
          <View>
            <View style={styles.labelContainer}>
              <ThemedText type="small" color="textSecondary">
                From
              </ThemedText>
            </View>
            <TouchableOpacity
              style={[styles.stationButton]}
              onPress={() => setShowFromModal(true)}
            >
              <ThemedText type="subtitle" color="textSecondary">
                {fromStation ? fromStation.name : 'Select station'}
              </ThemedText>
              <IconSymbol
                name="chevron.down"
                color={theme['neutral-default']}
                size={30}
              />
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
            <View
              style={[
                styles.divider,
                { borderColor: theme['neutral-default'] },
              ]}
            />
          </View>

          {/* To Station */}
          <View>
            <View style={styles.labelContainer}>
              <ThemedText type="small" color="textSecondary">
                To
              </ThemedText>
            </View>
            <TouchableOpacity
              style={[styles.stationButton]}
              onPress={() => setShowToModal(true)}
            >
              <ThemedText type="subtitle" color="textSecondary">
                {toStation ? toStation.name : 'Select station'}
              </ThemedText>
              <IconSymbol
                name="chevron.down"
                color={theme['neutral-default']}
                size={30}
              />
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
    flexDirection: 'row',
    flex: 1,
  },
  cardTitle: {
    fontSize: 22,
    marginBottom: 20,
  },
  routeContainer: {
    flex: 1,
  },
  timelineContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
    alignSelf: 'center',
    height: '65%',
  },
  timelineLine: {
    width: 3,
    flex: 1,
    marginVertical: 4,
  },
  timelineDot: {
    width: 14,
    height: 14,
    borderRadius: 7,
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
    flexDirection: 'row',
    alignContent: 'center',
    justifyContent: 'space-between',
    paddingBlock: 16,
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
