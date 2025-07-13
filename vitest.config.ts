import { defineConfig } from 'vitest/config';

const testTargets = (process.env.TEST_TARGETS ?? '').split(',');

export default defineConfig({
	test: {
		exclude: [
			'node_modules/**',

			// Optional targets
			...(testTargets.includes('all')
				? []
				: [
						...(testTargets.includes('integration')
							? []
							: ['**/*.integration.test.ts']),
					]),
		],
		globals: true,
		environment: 'jsdom',
	},
});
