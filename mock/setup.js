jest.mock('react-native-reanimated', () => {
  const React = require('react');
  const View = React.forwardRef((props, ref) => {
    return React.createElement('View', { ...props, ref });
  });
  return {
    __esModule: true,
    default: View,
    useSharedValue: (val) => ({ value: val }),
    useAnimatedStyle: (fn) => ({}),
    withTiming: (val) => val,
    withRepeat: (val) => val,
    withSequence: (...args) => args[args.length - 1],
    withSpring: (val) => val,
    Easing: {
      linear: (t) => t,
    },
    runOnJS: (fn) => fn,
    FadeIn: { duration: () => ({}) },
    FadeOut: { duration: () => ({}) },
    SlideInRight: { duration: () => ({}) },
    SlideOutLeft: { duration: () => ({}) },
    Layout: { duration: () => ({}) },
  };
});

jest.mock('react-native-linear-gradient', () => {
  const React = require('react');
  const { View } = require('react-native');
  const LinearGradient = (props) => React.createElement(View, props);
  LinearGradient.displayName = 'LinearGradient';
  return LinearGradient;
});

jest.mock('react-native-safe-area-context', () => {
  const React = require('react');
  const { View } = require('react-native');
  const SafeAreaView = React.forwardRef((props, ref) => {
    const { edges, ...rest } = props;
    return React.createElement(View, { ...rest, ref });
  });
  SafeAreaView.displayName = 'SafeAreaView';
  return {
    __esModule: true,
    SafeAreaView,
    SafeAreaProvider: ({ children }) => children,
    useSafeAreaInsets: () => ({ top: 0, bottom: 0, left: 0, right: 0 }),
    useSafeAreaFrame: () => ({ x: 0, y: 0, width: 0, height: 0 }),
  };
});

jest.mock('react-native-image-picker', () => ({
  launchCamera: jest.fn(),
  launchImageLibrary: jest.fn(),
}));

jest.mock('react-native-screens', () => {
  const React = require('react');
  const { View } = require('react-native');
  return {
    __esModule: true,
    Screen: View,
    ScreenContainer: View,
    ScreenStack: View,
    ScreenStackHeaderConfig: View,
    NativeScreen: View,
    NativeScreenNavigationContainer: View,
  };
});

jest.mock('react-native-svg', () => {
  const React = require('react');
  const { View } = require('react-native');
  const Svg = (props) => React.createElement(View, props);
  return {
    __esModule: true,
    default: Svg,
    SvgXml: Svg,
    Circle: View,
    Ellipse: View,
    G: View,
    Text: View,
    Path: View,
    Polygon: View,
    Polyline: View,
    Line: View,
    Rect: View,
    Use: View,
    Defs: View,
    LinearGradient: View,
    Stop: View,
    ClipPath: View,
    Pattern: View,
    Mask: View,
    Image: View,
  };
});

jest.mock('@react-navigation/native', () => {
  const actual = jest.requireActual('@react-navigation/native');
  return {
    ...actual,
    NavigationContainer: ({ children }) => children,
    useNavigation: () => ({
      navigate: jest.fn(),
      goBack: jest.fn(),
      replace: jest.fn(),
      getParent: jest.fn(() => null),
      getState: jest.fn(() => ({
        routes: [{ name: 'Home' }],
        index: 0,
      })),
    }),
    useRoute: () => ({
      params: {},
      name: 'Home',
    }),
    useFocusEffect: jest.fn(),
    CommonActions: {
      navigate: jest.fn(),
      goBack: jest.fn(),
    },
  };
});

jest.mock('@react-navigation/native-stack', () => {
  const React = require('react');
  const { View } = require('react-native');
  return {
    __esModule: true,
    createNativeStackNavigator: () => ({
      Navigator: ({ children }) => children,
      Screen: ({ children }) => children,
    }),
    NativeStackView: View,
  };
});

jest.mock('@react-navigation/bottom-tabs', () => {
  const React = require('react');
  const { View } = require('react-native');
  return {
    __esModule: true,
    createBottomTabNavigator: () => ({
      Navigator: ({ children }) => children,
      Screen: ({ children }) => children,
    }),
    BottomTabView: View,
  };
});

jest.mock('@react-native-community/slider', () => {
  const React = require('react');
  const { View } = require('react-native');
  const Slider = (props) => React.createElement(View, props);
  return { __esModule: true, default: Slider };
});
