module.exports = {
  env: {
    node: true,
    es2021: true,
  },
  extends: [
    'airbnb-base',
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  rules: {
    // ChainRivals CLI specific rules
    'no-console': 'off', // Allow console.log for CLI output
    'no-process-exit': 'off', // Allow process.exit for CLI
    'prefer-destructuring': ['error', { object: true, array: false }],
    'no-underscore-dangle': 'off', // Allow underscore dangle for private methods
    'class-methods-use-this': 'off', // Allow static methods
    'no-param-reassign': 'off', // Allow parameter reassignment for convenience
    'max-len': ['error', { code: 120, ignoreComments: true }],
    'indent': ['error', 2],
    'quotes': ['error', 'single'],
    'semi': ['error', 'always'],
    'comma-dangle': ['error', 'always-multiline'],
    'object-curly-spacing': ['error', 'always'],
    'array-bracket-spacing': ['error', 'never'],
    'space-before-function-paren': ['error', 'never'],
    'arrow-parens': ['error', 'always'],
    'no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    'no-restricted-syntax': [
      'error',
      'ForInStatement',
      'LabeledStatement',
      'WithStatement',
    ],
    'no-continue': 'off',
    'no-plusplus': 'off',
    'no-bitwise': 'off',
    'no-mixed-operators': 'off',
    'no-await-in-loop': 'off',
    'no-loop-func': 'off',
    'no-nested-ternary': 'off',
    'no-multi-assign': 'off',
    'no-cond-assign': 'off',
    'no-constant-condition': 'off',
    'no-empty': 'off',
    'no-extra-boolean-cast': 'off',
    'no-extra-semi': 'off',
    'no-func-assign': 'off',
    'no-inner-declarations': 'off',
    'no-irregular-whitespace': 'off',
    'no-obj-calls': 'off',
    'no-sparse-arrays': 'off',
    'no-unexpected-multiline': 'off',
    'no-unreachable': 'off',
    'no-unsafe-finally': 'off',
    'no-unsafe-negation': 'off',
    'use-isnan': 'off',
    'valid-jsdoc': 'off',
    'valid-typeof': 'off',
  },
  overrides: [
    {
      files: ['test/**/*.js', '**/*.test.js'],
      env: {
        jest: true,
      },
      rules: {
        'no-console': 'off',
        'no-process-exit': 'off',
      },
    },
  ],
}; 