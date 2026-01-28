import { darkTheme, lightTheme } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Station } from '@/types/types';
import React from 'react';
import {
  FlatList,
  Modal,
  Pressable,
  StyleSheet,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from 'react-native';
import { ThemedText } from './ThemedText';
import { ThemedView } from './ThemedView';

interface StationPickerModalProps {
  visible: boolean;
  stations: Station[];
  onClose: () => void;
  onSelectStation: (station: Station) => void;
  title: string;
  selectedStationId?: string;
}

export default function StationPickerModal({
  visible,
  stations,
  onClose,
  onSelectStation,
  title,
  selectedStationId,
}: StationPickerModalProps) {
  const colorScheme = useColorScheme();
  const theme = colorScheme === 'dark' ? darkTheme : lightTheme;

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <Pressable style={styles.overlay} onPress={onClose}>
        <Pressable
          style={styles.modalContainer}
          onPress={(e) => e.stopPropagation()}
        >
          <ThemedView style={styles.modalContent}>
            {/* Header */}
            <View style={styles.header}>
              <ThemedText type="title" style={styles.title}>
                {title}
              </ThemedText>
              <TouchableOpacity onPress={onClose}>
                <ThemedText type="subtitle" color="textPrimary">
                  ✕
                </ThemedText>
              </TouchableOpacity>
            </View>

            {/* Station List */}
            <FlatList
              data={stations}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => {
                const isSelected = item.id === selectedStationId;
                return (
                  <TouchableHighlight
                    underlayColor={theme['neutral-light']}
                    style={[
                      styles.stationItem,
                      {
                        backgroundColor: isSelected
                          ? theme['primary-default']
                          : 'transparent',
                      },
                    ]}
                    onPress={() => {
                      onSelectStation(item);
                      onClose();
                    }}
                  >
                    <ThemedText
                      type="defaultSemiBold"
                      style={[
                        styles.stationName,
                        isSelected && { color: '#fff' },
                      ]}
                    >
                      {item.name}
                    </ThemedText>
                  </TouchableHighlight>
                );
              }}
              style={styles.list}
              contentContainerStyle={styles.listContent}
            />
          </ThemedView>
        </Pressable>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContainer: {
    maxHeight: '80%',
  },
  modalContent: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingBottom: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    paddingBottom: 10,
  },
  title: {
    fontSize: 20,
  },
  list: {
    paddingHorizontal: 20,
  },
  listContent: {
    paddingBottom: 40,
  },
  stationItem: {
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderRadius: 12,
    marginVertical: 4,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  stationName: {
    fontSize: 16,
  },
});
