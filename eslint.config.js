import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import prettier from 'eslint-plugin-prettier';
import react from 'eslint-plugin-react';
import unusedImports from 'eslint-plugin-unused-imports';

export default [
  {
    ignores: ['node_modules/', 'build/', 'dist/', '.vscode/', '.next/'],
  },
  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parser: tsParser,
    },
    plugins: {
      '@typescript-eslint': tseslint,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      prettier: prettier,
      react: react,
      'unused-imports': unusedImports,
    },
    settings: {
      next: {
        rootDir: './src',
      },
    },
    rules: {
      // TypeScript rules
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': ['error', {
        'vars': 'all',
        'args': 'after-used',
        'ignoreRestSiblings': false,
        'varsIgnorePattern': '^actionTypes$'
      }],
      'unused-imports/no-unused-imports': 'error',

      // React Hooks rules
      ...reactHooks.configs.recommended.rules,
      'react-hooks/exhaustive-deps': 'off',

      // React Refresh rule
      'react-refresh/only-export-components': 'off',

      // Other custom rules
      'arrow-body-style': ['error', 'as-needed'],
      'class-methods-use-this': 'off',
      'import/no-dynamic-require': 'off',
      'import/no-extraneous-dependencies': 'off',
      'import/no-named-as-default': 'off',
      'import/no-webpack-loader-syntax': 'off',
      'import/prefer-default-export': 'off',
      'prettier/prettier': [
        'error',
        {
          printWidth: 80,
          tabWidth: 2,
          useTabs: false,
          semi: true,
          singleQuote: true,
          trailingComma: 'all',
          endOfLine: 'auto',
        },
      ],
      'react/destructuring-assignment': 'off',
      'react/jsx-closing-tag-location': 'off',
      'react/forbid-prop-types': 'off',
      'react/jsx-first-prop-new-line': ['error', 'multiline'],
      'react/jsx-filename-extension': 'off',
      'react/jsx-no-target-blank': 'off',
      'react/jsx-uses-vars': 'error',
      'react/require-default-props': 'off',
      'react/require-extension': 'off',
      'react/self-closing-comp': 'off',
      'react/sort-comp': 'off',
      'require-yield': 'off',
    },
  },
];