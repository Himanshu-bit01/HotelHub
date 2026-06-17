import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  StatusBar,
  Dimensions,
  Easing,
} from 'react-native';
import Svg, { Path, Rect, Circle, Line, Polyline, G } from 'react-native-svg';

const { width, height } = Dimensions.get('window');

// ── Cityscape SVG drawn to match the screenshot silhouette ──
const CityscapeSVG = () => (
  <Svg width={width} height={160} viewBox={`0 0 ${width} 160`}>
    {/* Sky background fade — handled by container */}

    {/* ── Far-left: palm tree ── */}
    <G opacity="0.55">
      {/* trunk */}
      <Rect x="28" y="95" width="5" height="40" rx="2" fill="none" stroke="#fff" strokeWidth="1.2" />
      {/* fronds */}
      <Path d="M30 95 Q10 75 5 65" fill="none" stroke="#fff" strokeWidth="1.2" />
      <Path d="M30 95 Q15 72 18 60" fill="none" stroke="#fff" strokeWidth="1.2" />
      <Path d="M30 95 Q30 70 28 58" fill="none" stroke="#fff" strokeWidth="1.2" />
      <Path d="M30 95 Q45 73 50 63" fill="none" stroke="#fff" strokeWidth="1.2" />
      <Path d="M30 95 Q48 78 55 72" fill="none" stroke="#fff" strokeWidth="1.2" />
    </G>

    {/* ── Small low building left ── */}
    <G opacity="0.55">
      <Rect x="55" y="108" width="30" height="27" rx="2" fill="none" stroke="#fff" strokeWidth="1.2" />
      {/* windows row */}
      <Rect x="61" y="114" width="5" height="5" rx="1" fill="none" stroke="#fff" strokeWidth="1" />
      <Rect x="72" y="114" width="5" height="5" rx="1" fill="none" stroke="#fff" strokeWidth="1" />
      <Rect x="61" y="124" width="5" height="5" rx="1" fill="none" stroke="#fff" strokeWidth="1" />
      <Rect x="72" y="124" width="5" height="5" rx="1" fill="none" stroke="#fff" strokeWidth="1" />
    </G>

    {/* ── Medium building left-center ── */}
    <G opacity="0.55">
      <Rect x="90" y="85" width="42" height="50" rx="2" fill="none" stroke="#fff" strokeWidth="1.2" />
      {/* grid windows */}
      {[95, 105, 115, 125].map((y, i) => (
        [96, 106, 116].map((x, j) => (
          <Rect key={`w${i}${j}`} x={x} y={y} width="6" height="6" rx="1" fill="none" stroke="#fff" strokeWidth="0.9" />
        ))
      ))}
      {/* rooftop antenna */}
      <Line x1="111" y1="85" x2="111" y2="75" stroke="#fff" strokeWidth="1.2" />
      <Circle cx="111" cy="74" r="2" fill="none" stroke="#fff" strokeWidth="1" />
    </G>

    {/* ── Tall center-left building ── */}
    <G opacity="0.55">
      <Rect x="140" y="55" width="52" height="80" rx="2" fill="none" stroke="#fff" strokeWidth="1.2" />
      {[62, 72, 82, 92, 102, 112].map((y, i) => (
        [147, 158, 169, 180].map((x, j) => (
          <Rect key={`tc${i}${j}`} x={x} y={y} width="6" height="6" rx="1" fill="none" stroke="#fff" strokeWidth="0.9" />
        ))
      ))}
      {/* roof detail */}
      <Rect x="152" y="50" width="28" height="6" rx="1" fill="none" stroke="#fff" strokeWidth="1" />
    </G>

    {/* ── Tallest center building ── */}
    <G opacity="0.55">
      <Rect x="200" y="35" width="58" height="100" rx="2" fill="none" stroke="#fff" strokeWidth="1.2" />
      {[42, 52, 62, 72, 82, 92, 102, 112].map((y, i) => (
        [206, 217, 228, 239, 248].map((x, j) => (
          <Rect key={`tall${i}${j}`} x={x} y={y} width="5" height="6" rx="1" fill="none" stroke="#fff" strokeWidth="0.9" />
        ))
      ))}
      {/* antenna */}
      <Line x1="229" y1="35" x2="229" y2="22" stroke="#fff" strokeWidth="1.4" />
      <Circle cx="229" cy="21" r="2.5" fill="none" stroke="#fff" strokeWidth="1" />
    </G>

    {/* ── Medium right-center building ── */}
    <G opacity="0.55">
      <Rect x="265" y="68" width="44" height="67" rx="2" fill="none" stroke="#fff" strokeWidth="1.2" />
      {[75, 85, 95, 105, 115].map((y, i) => (
        [271, 282, 293].map((x, j) => (
          <Rect key={`mr${i}${j}`} x={x} y={y} width="6" height="6" rx="1" fill="none" stroke="#fff" strokeWidth="0.9" />
        ))
      ))}
    </G>

    {/* ── Right small building ── */}
    <G opacity="0.55">
      <Rect x="315" y="90" width="35" height="45" rx="2" fill="none" stroke="#fff" strokeWidth="1.2" />
      {[97, 108, 119].map((y, i) => (
        [321, 333].map((x, j) => (
          <Rect key={`rs${i}${j}`} x={x} y={y} width="6" height="6" rx="1" fill="none" stroke="#fff" strokeWidth="0.9" />
        ))
      ))}
    </G>

    {/* ── Far-right palm tree ── */}
    <G opacity="0.55">
      <Rect x={width - 35} y="95" width="5" height="40" rx="2" fill="none" stroke="#fff" strokeWidth="1.2" />
      <Path d={`M${width - 33} 95 Q${width - 10} 75 ${width - 5} 65`} fill="none" stroke="#fff" strokeWidth="1.2" />
      <Path d={`M${width - 33} 95 Q${width - 18} 72 ${width - 20} 60`} fill="none" stroke="#fff" strokeWidth="1.2" />
      <Path d={`M${width - 33} 95 Q${width - 33} 70 ${width - 31} 58`} fill="none" stroke="#fff" strokeWidth="1.2" />
      <Path d={`M${width - 33} 95 Q${width - 48} 73 ${width - 53} 63`} fill="none" stroke="#fff" strokeWidth="1.2" />
    </G>

    {/* Ground line */}
    <Line x1="0" y1="135" x2={width} y2="135" stroke="#fff" strokeWidth="1" opacity="0.3" />
  </Svg>
);

const SplashScreen = ({ navigation }) => {
  const logoOpacity    = useRef(new Animated.Value(0)).current;
  const logoScale      = useRef(new Animated.Value(0.85)).current;
  const textOpacity    = useRef(new Animated.Value(0)).current;
  const cityOpacity    = useRef(new Animated.Value(0)).current;
  const spinValue      = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Spinner loop
    Animated.loop(
      Animated.timing(spinValue, {
        toValue: 1,
        duration: 900,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();

    // Entrance sequence
    Animated.sequence([
      Animated.parallel([
        Animated.timing(logoOpacity, { toValue: 1, duration: 700, useNativeDriver: true }),
        Animated.spring(logoScale, { toValue: 1, friction: 7, useNativeDriver: true }),
      ]),
      Animated.parallel([
        Animated.timing(textOpacity, { toValue: 1, duration: 500, useNativeDriver: true }),
        Animated.timing(cityOpacity, { toValue: 1, duration: 700, useNativeDriver: true }),
      ]),
    ]).start();

    const timer = setTimeout(() => {
      navigation.replace('Bottom');
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#8B2FC9" />

      {/* ── Logo + brand name ── */}
      <Animated.View style={[styles.logoBlock, { opacity: logoOpacity, transform: [{ scale: logoScale }] }]}>
        <Text style={styles.brandName}>
          <Text style={styles.brandWhite}>Hotel</Text>
          <Text style={styles.brandOrange}>Hub</Text>
        </Text>
      </Animated.View>

      {/* ── Spinning loader ── */}
      <Animated.View style={[styles.loaderWrap, { opacity: textOpacity }]}>
        <Animated.View style={[styles.loaderRing, { transform: [{ rotate: spin }] }]} />
      </Animated.View>

      {/* ── Tagline ── */}
      <Animated.Text style={[styles.tagline, { opacity: textOpacity }]}>
        Finding best stays{'\n'}for you...
      </Animated.Text>

      {/* ── Cityscape at bottom ── */}
      <Animated.View style={[styles.cityWrap, { opacity: cityOpacity }]}>
        <CityscapeSVG />
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#8B2FC9',   // vibrant purple matching the screenshot
    justifyContent: 'center',
    alignItems: 'center',
  },

  logoBlock: {
    alignItems: 'center',
    marginBottom: 48,
  },

  brandName: {
    fontSize: 42,
    fontWeight: '800',
    letterSpacing: 1,
  },
  brandWhite: {
    color: '#FFFFFF',
  },
  brandOrange: {
    color: '#FF53F6',  // warm orange-red accent visible in screenshot
  },

  loaderWrap: {
    marginBottom: 28,
    width: 36,
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loaderRing: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 3,
    borderColor: 'rgba(255,255,255,0.25)',
    borderTopColor: '#FFFFFF',
  },

  tagline: {
    fontSize: 20,
    color: '#FFFFFF',
    textAlign: 'center',
    lineHeight: 30,
    fontWeight: '400',
    letterSpacing: 0.3,
    marginBottom: 60,
  },

  cityWrap: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
});

export default SplashScreen;