import js from '@eslint/js';
import nextPlugin from '@next/eslint-plugin-next';

export default [
  js.configs.recommended,
  {
    plugins: {
      next: nextPlugin
    },
    rules: {
      'next/core-web-vitals': 'error'
    }
  }
];

