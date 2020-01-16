module.exports = {
  env: {
    es6: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'airbnb-base'
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly'
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module'
  },
  plugins: ['@typescript-eslint'],
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx']
      }
    }
  },
  rules: {
    'import/extensions': [
      'error',
      'ignorePackages',
      { ts: 'never', js: 'never' }
    ],
    'class-methods-use-this': [0],
    'import/prefer-default-export': [0],
    'no-console': 0,
    'import/no-extraneous-dependencies': 0,
    'max-len': ["error", { "code": 80 }],
    'no-param-reassign': ["error", {
      props: true,
      ignorePropertyModificationsFor: ['req', 'request', 'session']
    }],
    'implicit-arrow-linebreak': 0,
  },
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      rules: {
        '@typescript-eslint/no-unused-vars': [2, { args: 'none' }]
      }
    },
    {
      "files": [
        "**/*.spec.js",
        "**/*.spec.jsx",
        "**/*.test.ts",
      ],
      "env": {
        "jest": true
      }
    }
  ]
};
