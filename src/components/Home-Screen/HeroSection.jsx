import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
} from 'react-native';

const { height } = Dimensions.get('window');

const HeroSection = () => {
  return (
    <View style={styles.heroBlock}>
      {/* Background hotel image */}
      <Image
        source={require('../../assets/images/background.jpeg')}
        style={styles.heroBgImage}
        resizeMode="cover"
      />

      {/* Dark purple overlay */}
      <View style={styles.heroOverlay} />

      {/* ── Hero Text ── */}
      <View style={styles.heroContent}>
        <View style={styles.heroBadge}>
          <Text style={styles.heroBadgeIcon}>✦</Text>
          <Text style={styles.heroBadgeText}> STAY BEYOND EXPECTATION</Text>
        </View>

        <Text style={styles.heroTitle}>Your Perfect</Text>
        <Text style={styles.heroTitleRow}>
          <Text style={styles.heroTitleAccent}>Stay </Text>
          <Text style={styles.heroTitle}>Awaits</Text>
        </Text>

        <Text style={styles.heroSub}>
          Discover luxury hotels, vacation rentals, and unique accommodations worldwide.
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  heroBlock: {
    width: '100%',
    height: height * 0.56,
    overflow: 'hidden',
    backgroundColor: '#1A0533',
  },
  heroBgImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
  },
  heroOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: '#1A0533',
    opacity: 0.65,
  },

  // ── Hero Text ──
  heroContent: {
    paddingHorizontal: 24,
    paddingTop: 60,
    zIndex: 10,
  },
  heroBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(90, 33, 170, 0.95)',
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    marginBottom: 14,
  },
  heroBadgeIcon: { fontSize: 10, color: '#ffffff' },
  heroBadgeText: {
    fontSize: 15,
    color: '#ffffff',
    width: 246,
    height: 34,
    paddingTop: 5,
    paddingBottom: 6,
    paddingLeft: 9,
    paddingRight: 3,
    fontWeight: '600',
    letterSpacing: 1,
  },
  heroTitleRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    flexWrap: 'nowrap',
  },
  heroTitle: {
    fontSize: 32,
    fontFamily: 'PortLligatSlab-Regular',
    color: '#FFFFFF',
    lineHeight: 38,
  },
  heroTitleAccent: {
    fontSize: 40,
    color: '#945ec9f1',
    fontFamily: 'PetitFormalScript-Regular',
    lineHeight: 50,
  },
  heroSub: {
    fontSize: 15,
    color: '#f8f6fa',
    marginTop: 15,
    fontFamily: 'PortLligatSlab-Regular',
    lineHeight: 20,
    maxWidth: '60%',
  },
});

export default HeroSection;