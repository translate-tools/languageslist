// eslint.config.js
import importPlugin from 'eslint-plugin-import';
import unusedImports from 'eslint-plugin-unused-imports';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import prettier from 'eslint-config-prettier';

import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import { readFileSync } from 'fs';

// Use ignore rules from `.prettierignore`
readFileSync('.prettierignore', { encoding: 'utf8' })
	.split('\n')
	.filter((rule) => rule && !rule.startsWith('#'));

export default tseslint.config(
	eslint.configs.recommended,
	tseslint.configs.recommended,
	tseslint.configs.recommendedTypeChecked,
	{
		files: ['**/*.ts', '**/*.tsx'],
		languageOptions: {
			parserOptions: {
				projectService: true,
				tsconfigRootDir: import.meta.dirname,
			},
			globals: {
				window: 'readonly',
				document: 'readonly',
			},
		},
		plugins: {
			import: importPlugin,
			'unused-imports': unusedImports,
			'simple-import-sort': simpleImportSort,
		},
		settings: {
			'import/resolver': {
				typescript: {
					alwaysTryTypes: true,
					project: './tsconfig.json',
				},
			},
		},
		rules: {
			'import/no-useless-path-segments': ['error', { noUselessIndex: true }],
			'import/no-unresolved': ['error', { ignore: ['^vitest/config'] }],
			'import/export': 'off',
			'import/namespace': 'warn',
			'import/no-duplicates': ['error', { 'prefer-inline': true }],
			'import/newline-after-import': ['error', { count: 1 }],

			'unused-imports/no-unused-imports': 'error',

			'simple-import-sort/imports': [
				'error',
				{
					groups: [
						['^\\u0000'],
						['^node:'],
						['^react', '^\\w', '^@\\w'],
						['^'],
						['^../../'],
						['^../', '^./', '^\\.'],
						['\\.css$'],
					],
				},
			],

			'function-call-argument-newline': ['error', 'consistent'],
			'no-var': 'error',
			'no-bitwise': 'error',
			'no-multi-spaces': 'error',
			'no-multiple-empty-lines': 'error',
			'space-in-parens': 'error',
			semi: 'error',
			'prefer-const': 'error',

			'no-use-before-define': 'off',
			'@typescript-eslint/no-use-before-define': 'error',
			"@typescript-eslint/no-unused-vars": [
				"error",
				{
					"args": "all",
					"argsIgnorePattern": "^_",
					"caughtErrors": "all",
					"caughtErrorsIgnorePattern": "^_",
					"destructuredArrayIgnorePattern": "^_",
					"varsIgnorePattern": "^_",
					"ignoreRestSiblings": true
				}
			],

			camelcase: [
				'error',
				{
					allow: ['^UNSAFE_', '^UNSTABLE_'],
				},
			],
			'arrow-parens': ['error', 'always'],
			'operator-linebreak': [
				'error',
				'after',
				{
					overrides: {
						'?': 'before',
						':': 'before',
					},
				},
			],
			'space-before-function-paren': [
				'error',
				{
					asyncArrow: 'always',
					anonymous: 'never',
					named: 'never',
				},
			],
		},
	},
	prettier,
);
