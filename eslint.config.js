import { defineConfig, globalIgnores } from 'eslint/config';
import prettier from 'eslint-plugin-prettier/recommended';
import reactRefresh from 'eslint-plugin-react-refresh';
import reactHooks from 'eslint-plugin-react-hooks';
import globals from 'globals';
import js from '@eslint/js';

export default defineConfig([
  globalIgnores(['dist', 'build']),
  {
    files: ['**/*.{js,jsx}'],
    extends: [
      js.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
      prettier
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: 'latest',
        ecmaFeatures: { jsx: true },
        sourceType: 'module'
      }
    },
    rules: {
      'jsx-quotes': ['error', 'prefer-double'],
      'react-hooks/exhaustive-deps': 'off',
      'react/prop-types': 'off',
      'no-unused-vars': 'off',
      'react-refresh/only-export-components': ['error', { extraHOCs: ['observer'] }],
      'prettier/prettier': [
        'error',
        {
          printWidth: 100,
          trailingComma: 'none',
          singleQuote: true,
          endOfLine: 'auto',
          semi: true
        }
      ]
    }
  }
]);
