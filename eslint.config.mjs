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
  ...compat.extends(
    'next/core-web-vitals',
    'next/typescript',
    'plugin:import/recommended',
    'plugin:react/recommended',
    'plugin:@tanstack/query/recommended'
  ),
  {
    rules: {
      'import/order': [
        'error',
        {
          alphabetize: {
            caseInsensitive: true,
            order: 'asc'
          },
          groups: ['type', 'builtin', 'external', 'internal', ['parent', 'sibling', 'index'], 'object'],
          'newlines-between': 'always',
          pathGroups: [
            {
              group: 'external',
              pattern: 'react',
              position: 'before'
            },
            {
              group: 'external',
              pattern: 'react-dom',
              position: 'before'
            },
            {
              group: 'internal',
              pattern: '@actions/**',
              position: 'after'
            },
            {
              group: 'internal',
              pattern: '@app/**',
              position: 'after'
            },
            {
              group: 'internal',
              pattern: '@components/**',
              position: 'after'
            },
            {
              group: 'internal',
              pattern: '@entities/**',
              position: 'after'
            },
            {
              group: 'internal',
              pattern: '@hooks/**',
              position: 'after'
            },
            {
              group: 'internal',
              pattern: '@providers/**',
              position: 'after'
            },
            {
              group: 'internal',
              pattern: '@styles/**',
              position: 'after'
            },
            {
              group: 'internal',
              pattern: '@utils/**',
              position: 'after'
            }
          ],
          pathGroupsExcludedImportTypes: []
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
