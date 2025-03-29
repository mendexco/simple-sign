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
  ...compat.extends('next/core-web-vitals', 'next/typescript', 'plugin:import/recommended'),
  {
    rules: {
      'import/order': [
        'warn',
        {
          groups: ['type', 'builtin', 'object', 'external', 'internal', 'parent', 'sibling', 'index'],
          pathGroups: [
            {
              pattern: '~/**',
              group: 'external',
              position: 'after'
            }
          ],
          'newlines-between': 'always'
        }
      ]
    }
  }
]

export default eslintConfig
