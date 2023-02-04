import { View, Text, Alert } from 'react-native';
import React from 'react';

export default function EmptyScreen() {
  console.log('empty');
  return <View style={{ flex: 1, backgroundColor: '#EF4123' }} />;
}
