import Card from '@/components/Card';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { colors } from '@/constants/colors';
import { darkTheme, lightTheme } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Station } from '@/types/types';
import React, { useState } from 'react';
import { Text, TouchableHighlight, TouchableOpacity, View } from 'react-native';
import StationPickerModal from './StationPickerModal';

interface RouteCardProps {
  stations: Station[];
  fromStation: Station | null;
  toStation: Station | null;
  onFromStationChange: (station: Station) => void;
  onToStationChange: (station: Station) => void;
}

export default function RouteCard({
  stations,
  fromStation,
  toStation,
  onFromStationChange,
  onToStationChange,
}: RouteCardProps) {
  const [showFromModal, setShowFromModal] = useState(false);
  const [showToModal, setShowToModal] = useState(false);

  const colorScheme = useColorScheme();
  const theme = colorScheme === 'dark' ? darkTheme : lightTheme;

  const handleSwapStations = () => {
    if (toStation === null || fromStation === null) {
      return;
    }

    const temp = fromStation;
    onFromStationChange(toStation);
    onToStationChange(temp);
  };

  return (
    <>
      <Card className="flex-row">
        {/* Timeline */}
        <View className="items-center justify-center h-24 mr-2 top-9">
          <View className="w-4 h-4 rounded-full bg-primary-700" />
          <View className="w-0.5 flex-1 my-1 bg-primary-700" />
          <View className="w-4 h-4 rounded-full bg-primary-700" />
        </View>
        <View className="flex-1">
          {/* From Station */}
          <View>
            <View className="absolute top-2">
              <Text className="font-inter text-sm">From</Text>
            </View>
            <TouchableOpacity
              className="flex-row items-center justify-between pt-6 rounded-xl"
              onPress={() => setShowFromModal(true)}
            >
              <Text className="font-interSemiBold text-2xl">
                {fromStation ? fromStation.name : 'Select station'}
              </Text>
              <IconSymbol
                name="chevron.down"
                color={colors.gray[500]}
                size={30}
              />
            </TouchableOpacity>
          </View>

          {/* Swap Button */}
          <View className="items-end">
            <TouchableHighlight
              className="w-10 h-10 rounded-md justify-center items-center mr-[20%] z-10 bg-white"
              onPress={handleSwapStations}
              activeOpacity={0.6}
              underlayColor={colors.gray[200]}
              disabled={!fromStation && !toStation}
            >
              <IconSymbol
                name="arrow.up.arrow.down"
                color={theme['primary-dark']}
                size={30}
              />
            </TouchableHighlight>
            <View className="w-full border-[0.5px] -mt-5 border-gray-100" />
          </View>

          {/* To Station */}
          <View>
            <View className="absolute top-2">
              <Text className="font-inter text-sm">To</Text>
            </View>
            <TouchableOpacity
              className="flex-row items-center justify-between pt-6 rounded-xl"
              onPress={() => setShowToModal(true)}
            >
              <Text className="font-interSemiBold text-2xl">
                {toStation ? toStation.name : 'Select station'}
              </Text>
              <IconSymbol
                name="chevron.down"
                color={colors.gray[500]}
                size={30}
              />
            </TouchableOpacity>
          </View>
        </View>
      </Card>

      {/* Modals */}
      <StationPickerModal
        visible={showFromModal}
        stations={stations}
        onClose={() => setShowFromModal(false)}
        onSelectStation={onFromStationChange}
        title="Select Starting Station"
        selectedStationId={fromStation?.id}
      />

      <StationPickerModal
        visible={showToModal}
        stations={stations}
        onClose={() => setShowToModal(false)}
        onSelectStation={onToStationChange}
        title="Select Destination Station"
        selectedStationId={toStation?.id}
      />
    </>
  );
}
