import React, { useEffect, useRef } from 'react';
import {
  Text,
  StyleSheet,
  Animated,
  StatusBar,
  Easing,
  Image,
  Dimensions,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const { height: SCREEN_H } = Dimensions.get('window');

type SplashScreenProps = {
  navigation: any;
};

const SplashScreen = ({ navigation }: SplashScreenProps) => {
  const logoOpacity = useRef(new Animated.Value(0)).current as any;
  const logoScale   = useRef(new Animated.Value(0.85)).current as any;
  const textOpacity = useRef(new Animated.Value(0)).current as any;
  const cityOpacity = useRef(new Animated.Value(0)).current as any;
  const spinValue   = useRef(new Animated.Value(0)).current as any;

  useEffect(() => {
    const spinAnim = Animated.loop(
      Animated.timing(spinValue, {
        toValue: 1,
        duration: 900,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    );
    spinAnim.start();

    const entranceAnim = Animated.sequence([
      Animated.parallel([
        Animated.timing(logoOpacity, { toValue: 1, duration: 700, useNativeDriver: true }),
        Animated.spring(logoScale, { toValue: 1, friction: 7, useNativeDriver: true }),
      ]),
      Animated.parallel([
        Animated.timing(textOpacity, { toValue: 1, duration: 500, useNativeDriver: true }),
        Animated.timing(cityOpacity, { toValue: 1, duration: 700, useNativeDriver: true }),
      ]),
    ]);
    entranceAnim.start();

    const timer = setTimeout(() => {
      navigation.replace('Bottom');
    }, 3000);

    return () => {
      clearTimeout(timer);
      spinAnim.stop();
      entranceAnim.stop();
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  const imageSource = require('../../assets/images/image 31.png');

  return (
    <LinearGradient
      colors={['#7F2DFE', '#CD4DFB']}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
      style={styles.container}
    >
      <StatusBar barStyle="light-content" backgroundColor="#7F2DFE" />

      <Animated.View
        style={[styles.logoBlock, { opacity: logoOpacity, transform: [{ scale: logoScale }] }]}
      >
        <Text style={styles.brandName}>
          <Text style={styles.brandWhite}>Hotel</Text>
          <Text style={styles.brandOrange}>Hub</Text>
        </Text>
      </Animated.View>

      <Animated.View style={[styles.loaderWrap, { opacity: textOpacity }]}>
        <Animated.View style={[styles.loaderRing, { transform: [{ rotate: spin }] }]} />
      </Animated.View>

      <Animated.Text style={[styles.tagline, { opacity: textOpacity }]}>
        Finding best stays{'\n'}for you...
      </Animated.Text>

      <Animated.View style={[styles.cityWrap, { opacity: cityOpacity }]}>
        <Image source={imageSource} style={styles.cityImage} resizeMode="contain" />
      </Animated.View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  logoBlock: {
    alignItems: 'center',
    marginTop: SCREEN_H * 0.264,
    marginBottom: SCREEN_H * 0.069,
  },
  brandName: {
    fontSize: 34,
    fontWeight: '800',
    letterSpacing: 0.4,
  },
  brandWhite: {
    color: '#FFFFFF',
  },
  brandOrange: {
    color: '#FF5AF6',
  },
  loaderWrap: {
    marginBottom: SCREEN_H * 0.068,
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loaderRing: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 3,
    borderColor: 'rgba(255,255,255,0.25)',
    borderTopColor: '#FFFFFF',
  },
  tagline: {
    fontSize: 20,
    color: '#FFFFFF',
    textAlign: 'center',
    lineHeight: 32,
    fontWeight: '400',
    letterSpacing: 0.3,
  },
  cityWrap: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: SCREEN_H * 0.347,
  },
  cityImage: {
    width: '100%',
    height: 440 as any,
    position: 'absolute',
    bottom:1,

  },
});

export default SplashScreen;
