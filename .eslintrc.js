// https://docs.expo.dev/guides/using-eslint/
module.exports = {
  extends: 'expo',
  ignorePatterns: ['/dist/*', '/expo-env.d.ts'],
  rules: {
    'indent': ['error', 2],
    'no-tabs': ['error'],
    'quotes': ['error', 'single'],
    'semi': ['error', 'always'],
    'no-unused-vars': ['warn'],
    'eqeqeq': ['error', 'always'],
    'curly': ['error', 'all'],
    'brace-style': ['error', '1tbs'],
    'comma-dangle': ['error', 'always-multiline'],
    'no-trailing-spaces': ['error'],
    'space-before-function-paren': ['error', 'never'],
    'keyword-spacing': ['error', { 'before': true, 'after': true }],
    'space-infix-ops': ['error'],
    'eol-last': ['error', 'always'],
    'react-hooks/exhaustive-deps': 'off',
  },
};
