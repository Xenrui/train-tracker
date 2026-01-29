import Card from '@/components/Card';
import { colors } from '@/constants/colors';
import faresData from '@/data/trains/lrt2/fares.json';
import { FaresData, FareType, Station } from '@/types/types';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

type FareCardProps = {
  fromStation: Station | null;
  toStation: Station | null;
  price?: number;
};

const FareCard = ({ fromStation, toStation, price }: FareCardProps) => {
  const [fare, setFare] = useState<number | null>(null);
  const [fareType, setFareType] = useState<FareType>('beep');
  const [isDiscounted, setIsDiscounted] = useState(false);

  useEffect(() => {
    const getFare = (): number | null => {
      if (fromStation === null || toStation === null) {
        return null;
      }

      const from = fromStation.id;
      const to = toStation.id;

      const fares = (faresData as FaresData).fares;

      const forwardFare = fares?.[from]?.[to]?.[fareType];
      if (forwardFare !== undefined) {
        if (isDiscounted) {
          return forwardFare / 2;
        }
        return forwardFare;
      }

      // Check reverse direction
      const reverseFare = fares?.[to]?.[from]?.[fareType];
      if (reverseFare !== undefined) {
        if (isDiscounted) {
          return reverseFare / 2;
        }
        return reverseFare;
      }

      return null;
    };
    setFare(getFare());
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
      <View className="my-5">
        <View className="flex-row justify-between items-center">
          <Text className="font-inter text-sm">PWD/Senior/Student</Text>
          <TouchableOpacity
            style={[
              styles.discountToggle,
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
              style={[
                styles.discountToggleCircle,
                { backgroundColor: '#fff' },
                isDiscounted && styles.discountToggleCircleActive,
              ]}
            />
          </TouchableOpacity>
        </View>
      </View>

      {/* Price Display */}
      <View>
        <View className="flex-row gap-2 items-center">
          <Text className="font-interBold text-5xl">₱{fare ?? 'N/A'}</Text>
          {isDiscounted && (
            <View
              style={[
                styles.discountBadge,
                { backgroundColor: colors.primary[500] },
              ]}
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
  discountToggle: {
    width: 40,
    height: 24,
    borderRadius: 14,
    padding: 2,
    justifyContent: 'center',
  },
  discountToggleCircle: {
    width: 20,
    height: 20,
    borderRadius: 12,
  },
  discountToggleCircleActive: {
    alignSelf: 'flex-end',
  },

  card: {
    padding: 24,
  },
  header: {
    marginBottom: 4,
  },
  toggleContainer: {
    flexDirection: 'row',
    borderRadius: 12,
    padding: 2,
  },
  toggleButton: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  discountSection: {
    marginTop: 20,
    marginBottom: 8,
  },
  discountToggleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  priceSection: {
    marginTop: 24,
    alignItems: 'center',
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  priceAmount: {
    fontSize: 48,
    fontWeight: 'bold',
    letterSpacing: -1,
  },
  fareLabel: {
    marginTop: 8,
  },
  discountBadge: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
  },
  discountText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
});
