import React from 'react';
import {
  View,
  StyleSheet,
  ViewStyle,
  StyleProp,
  StatusBar,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

type SafeAreaEdges = {
  top?: boolean;
  bottom?: boolean;
  left?: boolean;
  right?: boolean;
};

type StatusBarConfig = {
  translucent?: boolean;
  backgroundColor?: string;
};

interface Props {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  barStyle?: 'light-content' | 'dark-content';

  /**
   * Override parcial:
   * - Por defecto: left/right/bottom = true, top = true
   * - Si envías { top:false } => solo top cambia, el resto se mantiene true
   */
  safeArea?: SafeAreaEdges;

  /**
   * Config opcional de StatusBar
   */
  statusBar?: StatusBarConfig;
}

const DEFAULT_SAFE_AREA: Required<SafeAreaEdges> = {
  top: true,
  bottom: true,
  left: true,
  right: true,
};

const DEFAULT_STATUS_BAR: Required<StatusBarConfig> = {
  translucent: true,
  backgroundColor: 'transparent',
};

const BaseScreen = ({
  children,
  style,
  barStyle = 'dark-content',
  safeArea,
  statusBar,
}: Props) => {
  const insets = useSafeAreaInsets();

  // ✅ merge: defaults + override parcial
  const edges = { ...DEFAULT_SAFE_AREA, ...(safeArea ?? {}) };
  const sb = { ...DEFAULT_STATUS_BAR, ...(statusBar ?? {}) };

  const paddingTop = edges.top ? insets.top : 0;
  const paddingBottom = edges.bottom ? insets.bottom : 0;
  const paddingLeft = edges.left ? insets.left : 0;
  const paddingRight = edges.right ? insets.right : 0;

  return (
    <View style={styles.root}>
      <StatusBar
        translucent={sb.translucent}
        backgroundColor={sb.backgroundColor}
        barStyle={barStyle}
      />

      <View
        style={[
          styles.base,
          { paddingTop, paddingBottom, paddingLeft, paddingRight },
          style,
        ]}
      >
        {children}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: 'transparent' },
  base: { flex: 1 },
});

export default BaseScreen;
