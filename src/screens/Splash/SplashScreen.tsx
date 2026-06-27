import React, { useEffect } from 'react';
import {
  Text,
  StyleSheet,
  StatusBar,
  Image,
  useWindowDimensions,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withRepeat,
  withSequence,
  withSpring,
  Easing,
  runOnJS,
} from 'react-native-reanimated';
import LinearGradient from 'react-native-linear-gradient';

type SplashScreenProps = {
  navigation: any;
};

const SplashScreen = ({ navigation }: SplashScreenProps) => {
  useWindowDimensions();
  const logoOpacity = useSharedValue(0);
  const logoScale = useSharedValue(0.85);
  const textOpacity = useSharedValue(0);
  const cityOpacity = useSharedValue(0);
  const spinValue = useSharedValue(0);

  const navigateToHome = () => {
    navigation.replace('Bottom');
  };

  useEffect(() => {
    spinValue.value = withRepeat(
      withTiming(1, { duration: 900, easing: Easing.linear }),
      -1,
      false
    );

    logoOpacity.value = withTiming(1, { duration: 700 });
    logoScale.value = withSpring(1, { damping: 7 });

    textOpacity.value = withSequence(
      withTiming(0, { duration: 700 }),
      withTiming(1, { duration: 500 })
    );

    cityOpacity.value = withTiming(1, { duration: 700 });

    const timer = setTimeout(() => {
      runOnJS(navigateToHome)();
    }, 3000);

    return () => clearTimeout(timer);
    // eslint-disable-next-line react-doctor/exhaustive-deps
  }, []);

  // const logoAnimatedStyle = useAnimatedStyle(() => ({
  //   opacity: logoOpacity.value,
  //   transform: [{ scale: logoScale.value }],
  // }));

  const loaderAnimatedStyle = useAnimatedStyle(() => ({
    opacity: textOpacity.value,
  }));

  const spinAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${spinValue.value * 360}deg` }],
  }));

  const taglineAnimatedStyle = useAnimatedStyle(() => ({
    opacity: textOpacity.value,
  }));

  const cityAnimatedStyle = useAnimatedStyle(() => ({
    opacity: cityOpacity.value,
  }));

  const imageSource = require('../../assets/images/image 31.png');

  return (
    <LinearGradient
      colors={['#7F2DFE', '#CD4DFB']}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
      style={styles.container}
    >
      <StatusBar barStyle="light-content" backgroundColor="#7F2DFE" />

      <Animated.View style={styles.logoBlock}>
        <Text style={styles.brandName}>
          <Text style={styles.brandWhite}>Hotel</Text>
          <Text style={styles.brandOrange}>Hub</Text>
        </Text>
      </Animated.View>

      <Animated.View style={[styles.loaderWrap, loaderAnimatedStyle]}>
        <Animated.View style={[styles.loaderRing, spinAnimatedStyle]} />
      </Animated.View>

      <Animated.Text style={[styles.tagline, taglineAnimatedStyle]}>
        Finding best stays{'\n'}for you...
      </Animated.Text>

      <Animated.View style={[styles.cityWrap, cityAnimatedStyle]}>
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
    marginTop: '26.4%',
    marginBottom: '6.9%',
  },
  brandName: {
    paddingTop:200,
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
    marginBottom: '6.8%',
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
    height: '34.7%',
  },
  cityImage: {
    width: '100%',
    height: 440,
    position: 'absolute',
    bottom: 1,
  },
});

export default SplashScreen;
