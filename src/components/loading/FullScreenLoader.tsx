import React from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';

type Props = {
  visible: boolean;
  text?: string;
};

export default function FullScreenLoader({ visible }: Props) {
  if (!visible) return null;

  return (
    <View style={styles.overlay} pointerEvents="auto">
      <ActivityIndicator size="large" color="#FFFFFF" />
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.45)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 9999,
    elevation: 9999, // Android
  },
});
