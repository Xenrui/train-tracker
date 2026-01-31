import React from 'react';
import { Text, View } from 'react-native';
type StationCodeProps = {
  trackLine: 'LRT-1' | 'LRT-2' | 'MRT-3';
  stationCode: string;
  stationName: string;
};

const StationCodeBadge = ({
  trackLine,
  stationCode,
  stationName,
}: StationCodeProps) => {
  return (
    <View
      className="flex-col gap-2 p-2 rounded-md bg-white"
      style={{
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5, // Android shadow
      }}
    >
      <View className="bg-purple-800 p-2 rounded-xl">
        <Text className="font-inter text-white text-xs text-nowrap">
          {stationCode}
        </Text>
      </View>
      <Text className="font-interMedium text-xs text-nowrap">
        {stationName}
      </Text>
    </View>
  );
};

export default StationCodeBadge;
