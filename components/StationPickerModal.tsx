import { colors } from '@/constants/colors';
import { Station, StationsData } from '@/types/types';
import React from 'react';
import {
  FlatList,
  Pressable,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';
import Modal from 'react-native-modal';
import stationData from '@/data/trains/lrt2/stations.json';

interface StationPickerModalProps {
  visible: boolean;
  onClose: () => void;
  onSelectStation: (station: Station) => void;
  title: string;
  selectedStationId?: string;
}

export default function StationPickerModal({
  visible,
  onClose,
  onSelectStation,
  title,
  selectedStationId,
}: StationPickerModalProps) {

  const stations = (stationData as StationsData).stations;

  return (
    <Modal
      isVisible={visible}
      onBackdropPress={onClose}
      onBackButtonPress={onClose}
      animationIn="slideInUp"
      animationOut="slideOutDown"
      className=""
      backdropOpacity={0.5}
    >
      <View className="bg-gray-200 rounded-3xl p-5">
        {/* Header */}
        <View className="flex-row justify-between items-center mb-5">
          <Text className="font-interBold text-2xl">{title}</Text>
          <Pressable onPress={onClose} className="p-2">
            <Text className="text-2xl">✕</Text>
          </Pressable>
        </View>

        {/* Station List */}
        <FlatList
          data={stations}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => {
            const isSelected = item.id === selectedStationId;
            return (
              <TouchableHighlight
                underlayColor={colors.gray[400]}
                className="rounded-xl my-1 mr-2"
                style={{
                  backgroundColor: isSelected
                    ? colors.primary[500]
                    : 'transparent',
                }}
                onPress={() => {
                  onSelectStation(item);
                  onClose();
                }}
              >
                <View className="py-4 px-4">
                  <Text
                    className="font-interSemiBold text-base"
                    style={
                      isSelected
                        ? { color: '#fff' }
                        : { color: colors.gray[700] }
                    }
                  >
                    {item.name}
                  </Text>
                </View>
              </TouchableHighlight>
            );
          }}
          className="max-h-[500px]"
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      </View>
    </Modal>
  );
}
