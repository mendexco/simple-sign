import { dirname } from 'path'
import { fileURLToPath } from 'url'

import { FlatCompat } from '@eslint/eslintrc'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const compat = new FlatCompat({
  baseDirectory: __dirname
})

// Existing config extended to include the import plugin and rules:
const eslintConfig = [
  ...compat.extends('next/core-web-vitals', 'next/typescript', 'plugin:import/recommended', 'plugin:react/recommended'),
  {
    rules: {
      'import/order': [
        'error',
        {
          groups: ['type', 'builtin', 'object', 'external', 'internal', 'parent', 'sibling', 'index'],
          'newlines-between': 'always',
          pathGroups: [
            {
              group: 'external',
              pattern: '~/**',
              position: 'after'
            }
          ]
        }
      ],
      'no-multi-spaces': [
        'error',
        {
          ignoreEOLComments: false
        }
      ],
      'react/jsx-max-props-per-line': [
        'error',
        {
          maximum: 2,
          when: 'multiline'
        }
      ],
      'react/jsx-sort-props': [
        'error',
        {
          callbacksLast: true,
          reservedFirst: true,
          shorthandFirst: true
        }
      ],
      'react/react-in-jsx-scope': 'off',
      'sort-keys': ['error', 'asc', { caseSensitive: true, natural: false }]
    }
  }
]

export default eslintConfig
