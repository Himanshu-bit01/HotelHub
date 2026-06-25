import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const { height } = Dimensions.get('window');

const HERO_HEIGHT = height * 0.44;

const HeroSection = () => {
  return (
    <View style={styles.heroBlock}>
      <Image
        source={require('../../assets/images/background.jpeg')}
        style={styles.heroBgImage}
        resizeMode="cover"
      />

      <View style={styles.darkBase} />

      <LinearGradient
        colors={[
          '#1A0533',
          'rgba(43,11,79,0.75)',
          'rgba(60,15,100,0.40)',
          'rgba(80,20,130,0.10)',
          'transparent',
        ]}
        locations={[0, 0.30, 0.45, 0.58, 0.72, 0.85, 1]}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
        style={StyleSheet.absoluteFill}
      />

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
  heroBgImage: {
    position: 'absolute',
    top: 0,
    right: 0,
    width:'100%',
    height: '140%',
  },
  darkBase: {
    ...StyleSheet.absoluteFill,
    backgroundColor: 'rgba(26,5,51,0.35)',
  },
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
