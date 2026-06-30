module.exports = {
  root: true,
  extends: '@react-native',
  overrides: [
    {
      files: ['mock/**/*.{js,ts}'],
      env: {
        jest: true,
      },
    },
  ],
};
