import React from 'react';
import { View, ViewProps } from 'react-native';

const Card = ({ children, className }: ViewProps) => {
  return (
    <View className={`p-5 rounded-2xl bg-white border-gray-200 ${className}`}>
      {children}
    </View>
  );
};

export default Card;
