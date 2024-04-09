import { drizzle } from 'drizzle-orm/d1';
import { Hono } from 'hono';
import * as schema from './schema';
import { eq } from 'drizzle-orm';

/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run `npm run dev` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `npm run deploy` to publish your worker
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */

type Bindings = {
	// Example binding to KV. Learn more at https://developers.cloudflare.com/workers/runtime-apis/kv/
	// MY_KV_NAMESPACE: KVNamespace;
	//
	// Example binding to Durable Object. Learn more at https://developers.cloudflare.com/workers/runtime-apis/durable-objects/
	// MY_DURABLE_OBJECT: DurableObjectNamespace;
	//
	// Example binding to R2. Learn more at https://developers.cloudflare.com/workers/runtime-apis/r2/
	// MY_BUCKET: R2Bucket;
	//
	// Example binding to a Service. Learn more at https://developers.cloudflare.com/workers/runtime-apis/service-bindings/
	// MY_SERVICE: Fetcher;
	//
	// Example binding to a Queue. Learn more at https://developers.cloudflare.com/queues/javascript-apis/
	// MY_QUEUE: Queue;

	DB: D1Database;
};

const app = new Hono<{ Bindings: Bindings }>();

app.get('/', async (c) => {
	const db = drizzle(c.env.DB);

	const id = crypto.randomUUID();

	const now = performance.now();
	await db.insert(schema.post).values({
		id,
		createdAt: new Date(),
		title: 'Hello World',
		content: 'This is a test post.',
	});

	const elapsed = performance.now() - now;
	return c.text(`created ${id} in ${elapsed}ms`);
});

app.get('/posts/:id', async (c) => {
	const db = drizzle(c.env.DB);
	const id = c.req.param('id');
	const now = performance.now();
	await db.select().from(schema.post).where(eq(schema.post.id, id)).get();
	const elapsed = performance.now() - now;

	return c.text(`retrieved ${id} in ${elapsed}ms`);
});

export default app;
