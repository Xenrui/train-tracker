import Card from '@/components/Card';
import { colors } from '@/constants/colors';
import { darkTheme, lightTheme } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

type FareCardProps = {
  price: number;
  style?: any;
};

type FareType = 'beep' | 'single';

const FareCard = ({ price, style }: FareCardProps) => {
  const [fareType, setFareType] = useState<FareType>('beep');
  const [isDiscounted, setIsDiscounted] = useState(false);
  const colorScheme = useColorScheme();
  const theme = colorScheme === 'dark' ? darkTheme : lightTheme;

  // Calculate fare (50% discount for discounted fare)
  const regularFare = price;
  const discountedFare = price * 0.5;
  const displayFare = isDiscounted ? discountedFare : regularFare;

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
            fareType === 'single' && {
              backgroundColor: colors.primary[500],
            },
          ]}
          onPress={() => setFareType('single')}
          activeOpacity={0.7}
        >
          <Text
            className="text-gray-600 font-interMedium "
            style={[fareType === 'single' && { color: '#fff' }]}
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
                  ? theme['primary-default']
                  : theme['neutral-light'],
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
          <Text className="font-interBold text-5xl">
            ₱{displayFare.toFixed(2)}
          </Text>
          {isDiscounted && (
            <View
              style={[
                styles.discountBadge,
                { backgroundColor: theme['primary-default'] },
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
