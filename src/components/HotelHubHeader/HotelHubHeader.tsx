import React, { ReactNode } from 'react';
import { View, Text, StyleSheet } from 'react-native';

type HotelHubHeaderProps = {
  theme?: 'dark' | 'light';
  rightIcons?: ReactNode;
  children?: ReactNode;
};

const HotelHubHeader = ({ theme = 'dark', rightIcons, children }: HotelHubHeaderProps) => {
  const isDark = theme === 'dark';

  return (
    <View style={[styles.container, isDark ? styles.containerDark : styles.containerLight]}>
      <View style={styles.topBar}>
        <Text style={styles.brandName}>
          <Text style={isDark ? styles.brandWhite : styles.brandDark}>Hotel</Text>
          <Text style={styles.brandPurple}>Hub</Text>
        </Text>
        {rightIcons && <View style={styles.topIcons}>{rightIcons}</View>}
      </View>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingBottom: 14,
  },
  containerDark: {
    backgroundColor: '#ffffff',
  },
  containerLight: {
    backgroundColor: '#FFFFFF',
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 35,
    paddingBottom: 12,
  },
  brandName: {
    fontSize: 22,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  brandWhite: {
    fontSize: 24,
    color: '#000000',
  },
  brandDark: {
    fontSize: 24,
    color: '#111827',
  },
  brandPurple: {
    fontSize: 24,
    color: '#A855F7',
  },
  topIcons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
});

export default HotelHubHeader;
