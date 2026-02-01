import Card from '@/components/Card';
import { colors } from '@/constants/colors';
import { useStation } from '@/context/StationContext';
import { calculateFare } from '@/utils/fareCalculator';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

type FareCardProps = {
  price?: number;
};

const FareCard = ({ price }: FareCardProps) => {
  const {
    fromStation,
    toStation,
    fareType,
    isDiscounted,
    setFareType,
    setIsDiscounted,
  } = useStation();

  const [fare, setFare] = useState<number | null>(null);

  useEffect(() => {
    setFare(calculateFare(fromStation, toStation, fareType, isDiscounted));
  }, [fromStation, toStation, fareType, isDiscounted]);

  return (
    <Card className="">
      {/* Header */}
      <View className="mb-2">
        <Text className="font-interSemiBold text-2xl">Your Fare</Text>
      </View>

      {/* Fare Type Toggle */}
      <View className="flex-row bg-gray-200 rounded-xl">
        <TouchableOpacity
          className="flex-1 rounded-xl p-3 items-center justify-center px-25"
          style={[
            fareType === 'beep' && {
              backgroundColor: colors.primary[500],
            },
          ]}
          onPress={() => setFareType('beep')}
          activeOpacity={0.7}
        >
          <Text
            className="text-gray-600 font-interMedium"
            style={[fareType === 'beep' && { color: '#fff' }]}
          >
            Beep Card
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          className="flex-1 rounded-xl p-3 items-center justify-center"
          style={[
            fareType === 'sjt' && {
              backgroundColor: colors.primary[500],
            },
          ]}
          onPress={() => setFareType('sjt')}
          activeOpacity={0.7}
        >
          <Text
            className="text-gray-600 font-interMedium "
            style={[fareType === 'sjt' && { color: '#fff' }]}
          >
            Single Journey
          </Text>
        </TouchableOpacity>
      </View>

      {/* Discount Toggle */}
      {fareType === 'beep' && (
        <View className="mt-5">
          <View className="flex-row justify-between items-center">
            <Text className="font-inter text-sm">PWD/Senior/Student</Text>
            <TouchableOpacity
              className="w-10 h-6 rounded-2xl py-1 justify-center "
              style={[
                {
                  backgroundColor: isDiscounted
                    ? colors.primary[400]
                    : colors.gray[200],
                },
              ]}
              onPress={() => setIsDiscounted(!isDiscounted)}
              activeOpacity={0.7}
            >
              <View
                className="w-5 h-5 rounded-xl bg-white"
                style={[isDiscounted && styles.discountToggleCircleActive]}
              />
            </TouchableOpacity>
          </View>
        </View>
      )}

      {/* Price Display */}
      <View className="mt-5">
        <View className="flex-row gap-2 items-center">
          <Text className="font-interBold text-5xl">
            ₱{fare?.toFixed(2) ?? 'N/A'}
          </Text>
          {isDiscounted && fareType === 'beep' && (
            <View
              className="px-3 py-2 rounded-lg"
              style={[{ backgroundColor: colors.primary[500] }]}
            >
              <Text className="font-interBold text-sm text-white">50% OFF</Text>
            </View>
          )}
        </View>
      </View>
    </Card>
  );
};

export default FareCard;

const styles = StyleSheet.create({
  discountToggleCircleActive: {
    alignSelf: 'flex-end',
  },
});
