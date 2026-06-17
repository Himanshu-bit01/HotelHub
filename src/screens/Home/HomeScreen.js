import React from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  StatusBar,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import SearchAndStays from '../../components/Home-Screen/SearchAndStays';
import HeroSection from '../../components/Home-Screen/HeroSection';

// Extra space to clear the bottom tab bar. If your tab bar has a custom
// fixed height, you can replace this constant with that exact number.
const TAB_BAR_CLEARANCE = 90;

const HomeScreen = ({ navigation }) => {
  const insets = useSafeAreaInsets();

  return (
    <View style={styles.root}>
      <StatusBar barStyle="light-content" backgroundColor="#1A0533" translucent />

      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.scroll}
        contentContainerStyle={{
          paddingBottom: insets.bottom + TAB_BAR_CLEARANCE,
        }}
      >
        {/* ── Hero Block (top nav + search tabs + hero text) ── */}
        <HeroSection navigation={navigation} />

        {/* ── Search Card + Recent Stays ── */}
        <SearchAndStays />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  scroll: {
    flex: 1,
  },
});

export default HomeScreen;