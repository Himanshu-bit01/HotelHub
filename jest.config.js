module.exports = {
  preset: '@react-native/jest-preset',
  transformIgnorePatterns: [
    'node_modules/(?!(react-native|@react-native|react-redux|@reduxjs|immer|@react-navigation|react-native-linear-gradient|react-native-safe-area-context|react-native-vector-icons|react-native-image-picker|react-native-reanimated|react-native-screens|react-native-svg|lucide-react-native)/)',
  ],
  setupFiles: ['./mock/setup.js'],
  moduleNameMapper: {
    '\\.(png|jpg|jpeg|gif|webp)$': '<rootDir>/mock/imageMock.js',
  },
};
