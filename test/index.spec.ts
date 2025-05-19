import { env, createExecutionContext, waitOnExecutionContext, SELF } from 'cloudflare:test';
import { describe, it, expect } from 'vitest';
import worker from '../src/index';

// For now, you'll need to do something like this to get a correctly-typed
// `Request` to pass to `worker.fetch()`.
const IncomingRequest = Request<unknown, IncomingRequestCfProperties>;


describe("Photo service", () => {
	it("return a 404 if a non-existent image is requested", async () => {
		const response = await SELF.fetch("http://localhost:8787/images/100");
		expect(response.status).toBe(404);
	});
});


describe("GET /images", () => {
	it("return a 200 response", async () => {
		const response = await SELF.fetch("http://localhost:8787/images");
		expect(response.status).toEqual(200);
	});

	it("should return images in the response body", async () => {
		const response = await SELF.fetch("http://localhost:8787/images");
		const json = await response.json();
		expect(json).toEqual(
			expect.arrayContaining([
				expect.objectContaining({
					id:2,
					url: "http://bar.com/img2",
					author: "alice",
				}),
			])
		);
	});

	it("should return a set of number of images if count is provided", async () => {
		const response = await SELF.fetch("http://localhost:8787/images?count=2");
		const json = await response.json();
		expect(json).toHaveLength(2);
	});
});



