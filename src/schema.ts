import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const post = sqliteTable('post', {
	id: text('id').primaryKey(),
	createdAt: integer('createdAt', { mode: 'timestamp_ms' }),
	title: text('title'),
	content: text('content'),
});
