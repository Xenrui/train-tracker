import ThemedCard from '@/components/ThemedCard';
import { ThemedText } from '@/components/ThemedText';
import { darkTheme, lightTheme } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

type FareCardProps = {
  price: number;
  style: any;
};

type FareType = 'beep' | 'single';

const FareCard = ({ price, style }: FareCardProps) => {
  const [fareType, setFareType] = useState<FareType>('beep');
  const [isDiscounted, setIsDiscounted] = useState(false);
  const colorScheme = useColorScheme();
  const theme = colorScheme === 'dark' ? darkTheme : lightTheme;

  // Calculate fare (20% discount for discounted fare)
  const regularFare = price;
  const discountedFare = price * 0.5;
  const displayFare = isDiscounted ? discountedFare : regularFare;

  return (
    <ThemedCard style={[styles.card, style]}>
      {/* Header */}
      <View style={styles.header}>
        <ThemedText type="subtitle" color="textSecondary">
          Your Fare
        </ThemedText>
      </View>

      {/* Fare Type Toggle */}
      <View
        style={[
          styles.toggleContainer,
          { backgroundColor: theme['neutral-light'] },
        ]}
      >
        <TouchableOpacity
          style={[
            styles.toggleButton,
            fareType === 'beep' && {
              backgroundColor: theme['primary-default'],
            },
          ]}
          onPress={() => setFareType('beep')}
          activeOpacity={0.7}
        >
          <ThemedText
            type="defaultSemiBold"
            style={[
              styles.toggleText,
              { color: theme['neutral-default'] },
              fareType === 'beep' && { color: theme['textNeutral'] },
            ]}
          >
            Beep Card
          </ThemedText>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.toggleButton,
            fareType === 'single' && {
              backgroundColor: theme['primary-default'],
            },
          ]}
          onPress={() => setFareType('single')}
          activeOpacity={0.7}
        >
          <ThemedText
            type="defaultSemiBold"
            style={[
              styles.toggleText,
              { color: theme['neutral-default'] },
              fareType === 'single' && { color: theme['textNeutral'] },
            ]}
          >
            Single Journey
          </ThemedText>
        </TouchableOpacity>
      </View>

      {/* Discount Toggle */}
      <View style={styles.discountSection}>
        <View style={styles.discountToggleContainer}>
          <ThemedText type="small" color="textPrimary">
            PWD/Senior/Student
          </ThemedText>
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
                { backgroundColor: theme['textNeutral'] },
                isDiscounted && styles.discountToggleCircleActive,
              ]}
            />
          </TouchableOpacity>
        </View>
      </View>

      {/* Price Display */}
      <View style={styles.priceSection}>
        <View style={styles.priceRow}>
          <ThemedText style={styles.priceAmount}>
            ₱{displayFare.toFixed(2)}
          </ThemedText>
          {isDiscounted && (
            <View
              style={[
                styles.discountBadge,
                { backgroundColor: theme['primary-default'] },
              ]}
            >
              <ThemedText type="small" style={styles.discountText}>
                50% OFF
              </ThemedText>
            </View>
          )}
        </View>
        <ThemedText type="small" color="textSecondary" style={styles.fareLabel}>
          {fareType === 'beep' ? 'Beep Card Fare' : 'Single Journey Ticket'}
        </ThemedText>
      </View>
    </ThemedCard>
  );
};

export default FareCard;

const styles = StyleSheet.create({
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
  toggleText: {
    fontSize: 14,
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
