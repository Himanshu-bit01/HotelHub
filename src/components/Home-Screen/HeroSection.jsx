import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const { height, width } = Dimensions.get('window');

// Hero height — tall enough so the search card overlaps it visibly
const HERO_HEIGHT = height * 0.44;

const HeroSection = () => {
  return (
    <View style={styles.heroBlock}>
      {/* ── Hotel background image (right-aligned, full height) ── */}
      <Image
        source={require('../../assets/images/background.jpeg')}
        style={styles.heroBgImage}
        resizeMode="cover"
      />

      {/*
        ── Layer 1: deep dark base so the left side is always #1A0533 ──
        Covers the whole block at low opacity so the image still bleeds
        through on the right half.
      */}
      <View style={styles.darkBase} />

      {/*
        ── Layer 2: LinearGradient sweeping left→right ──
        Left:   fully opaque #1A0533  (text area is completely dark)
        Center: semi-transparent #2B0B4F  (transition zone)
        Right:  transparent  (the hotel image glow shows through)
        This replicates the dual-color blended look in the screenshot.
      */}
      <LinearGradient
        colors={[
          '#1A0533',          // hard left edge — opaque          'rgba(26,5,51,0.92)',
          'rgba(43,11,79,0.75)',
          'rgba(60,15,100,0.40)',
          'rgba(80,20,130,0.10)',
          'transparent',      // far right — image fully visible
        ]}
        locations={[0, 0.30, 0.45, 0.58, 0.72, 0.85, 1]}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
        style={StyleSheet.absoluteFill}
      />

      {/*
        ── Layer 3: top-to-bottom gradient ──
        Darkens the very bottom of the hero so the white search card
        appears to lift off a dark surface (matching the screenshot).
      */}
      <LinearGradient
        colors={[
          'transparent',
          'rgba(26,5,51,0.30)',
          'rgba(26,5,51,0.65)',
        ]}
        locations={[0, 0.65, 1]}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={StyleSheet.absoluteFill}
      />

      {/* ── Hero Text ── */}
      <View style={styles.heroContent}>
        <View style={styles.heroBadge}>
          <Text style={styles.heroBadgeIcon}>✦</Text>
          <Text style={styles.heroBadgeText}> STAY BEYOND EXPECTATION</Text>
        </View>

        <Text style={styles.heroTitle}>Your Perfect</Text>
        <View style={styles.heroTitleRow}>
          <Text style={styles.heroTitleAccent}>Stay </Text>
          <Text style={styles.heroTitle}>Awaits</Text>
        </View>

        <Text style={styles.heroSub}>
          Discover luxury hotels, vacation{'\n'}rentals, and unique{'\n'}accommodations worldwide.
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  heroBlock: {
    width: '100%',
    height: HERO_HEIGHT,
    overflow: 'hidden',
    backgroundColor: '#1A0533',
  },

  // Hotel image — fills the right ~60% of the block
  heroBgImage: {
    position: 'absolute',
    top: 0,
    right: 0,
    width:'100%',
    height: '140%',
  },

  // Thin dark base so the image never bleeds fully through on left
  darkBase: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(26,5,51,0.35)',
  },

  // ── Hero Text ──
  heroContent: {
    paddingHorizontal: 20,
    paddingTop: 16,
    zIndex: 10,
  },
  heroBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(90, 33, 170, 0.95)',
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 20,
    marginBottom: 14,
  },
  heroBadgeIcon: {
    fontSize: 10,
    color: '#ffffff',
  },
  heroBadgeText: {
    fontSize: 12,
    color: '#ffffff',
    fontWeight: '700',
    letterSpacing: 1.2,
    marginLeft: 4,
  },
  heroTitle: {
    fontSize: 30,
    fontFamily: 'PortLligatSlab-Regular',
    color: '#FFFFFF',
    lineHeight: 36,
    fontWeight: '400',
  },
  heroTitleRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    flexWrap: 'nowrap',
    marginTop: 0,
  },
  heroTitleAccent: {
    fontSize: 40,
    color: '#9B6DD4',
    fontFamily: 'PetitFormalScript-Regular',
    lineHeight: 52,
  },
  heroSub: {
    fontSize: 14,
    color: '#E8E0F0',
    marginTop: 10,
    fontFamily: 'PortLligatSlab-Regular',
    lineHeight: 20,
    maxWidth: '58%',
  },
});

export default HeroSection;