module.exports = {
  env: {
    browser: true,
    es6: true,
    jest: true
  },
  extends: 'airbnb',
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
    fetch: false,
  },
  parser: 'babel-eslint',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: [
    'react',
  ],
  rules: {
    'arrow-parens': [ 'error', 'as-needed' ],
    'space-in-parens': [ 'error', 'always' ],
    'array-bracket-spacing': [ 'error', 'always' ],
    'computed-property-spacing': [ 'error', 'always' ],
    'spaced-comment': 'off',
    'no-trailing-spaces': 'off',
    'object-curly-newline': 'off',
    'key-spacing': 'off',
    'max-len': 'off',
    'padded-blocks': 'off',
    'brace-style': 'off',
    'new-cap': 'off',
    'template-curly-spacing': 'off',
    'arrow-body-style': 'off',
    'jsx-quotes': 'off',
    'quote-props': 'off',

    // react specific rules
    'react/jsx-filename-extension': [ 1, { 'extensions': [ '.js', '.jsx' ] } ],
    'react/jsx-curly-spacing': [ 2, { 'when': 'always' } ],
    'react/jsx-one-expression-per-line': 'off',
    'react/forbid-prop-types': 'off',
    'react/require-default-props': 'off',
    'react/destructuring-assignment': 'off',

    // import
    'import/no-extraneous-dependencies': 'off',
    'import/prefer-default-export': 'off',
  }
};
