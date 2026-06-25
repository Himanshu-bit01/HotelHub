module.exports = {
  preset: '@react-native/jest-preset',
  transformIgnorePatterns: [
    'node_modules/(?!(react-native|@react-native|react-redux|@reduxjs|immer|@react-navigation|react-native-linear-gradient|react-native-safe-area-context|react-native-vector-icons|react-native-image-picker)/)',
  ],
};