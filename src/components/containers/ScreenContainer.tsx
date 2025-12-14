import React, { ReactNode } from 'react';
import { View, ViewStyle, StyleProp, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface Props {
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
}

const ScreenContainer = ({ children, style }: Props) => {
  const insets = useSafeAreaInsets();
  const styles = StyleSheet.create({
    base: {
      flex: 1,
    },
  });

  return (
    <View
      style={[
        styles.base,
        {
          paddingTop: insets.top,
          paddingBottom: insets.bottom,
          paddingLeft: insets.left,
          paddingRight: insets.right,
        },
        style,
      ]}
    >
      {children}
    </View>
  );
};

export default ScreenContainer;