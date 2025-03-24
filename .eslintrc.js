module.exports = {
  root: true,
  // extends: '@react-native',
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
  ],
  plugins: ['react', '@typescript-eslint', 'prettier'],
  rules: {
    'prettier/prettier': ['error', {singleQuote: true}],
    quotes: ['error', 'single'],
  },
};
