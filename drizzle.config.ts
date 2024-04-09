import type { Config } from 'drizzle-kit';
export default {
	schema: './src/schema.ts',
	out: './migrations',
	driver: 'd1',
} satisfies Config;
