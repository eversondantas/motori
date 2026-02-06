import js from '@eslint/js';
import tseslint from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import prettier from 'eslint-config-prettier';
import globals from 'globals';

const common = {
  files: ['**/*.{ts,tsx}'],
  languageOptions: {
    parser: tsParser,
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: {
    '@typescript-eslint': tseslint,
  },
  rules: {
    ...tseslint.configs.recommended.rules,
  },
};

export default [
  js.configs.recommended,
  {
    ignores: ['dist/**', 'node_modules/**', 'coverage/**'],
  },
  {
    ...common,
    languageOptions: {
      ...common.languageOptions,
      globals: {
        ...globals.node,
      },
    },
  },
  {
    ...common,
    files: ['apps/web/**/*.{ts,tsx}'],
    languageOptions: {
      ...common.languageOptions,
      globals: {
        ...globals.browser,
      },
    },
  },
  prettier,
];
