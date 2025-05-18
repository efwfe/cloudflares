import { env, createExecutionContext, waitOnExecutionContext, SELF } from 'cloudflare:test';
import { describe, it, expect } from 'vitest';


describe("POST /images", () => {
	it("should return a 201 response when a new image is created", async () => {
		const payload = {
			id: 4,
			url: "http://bar.com/img4",
			author: "bob",
		};
		const response = await SELF.fetch("http://localhost:8787/images", {
			method: "POST",
			body: JSON.stringify(payload),
		});

		expect(response.status).toEqual(201);

	});

	it("should return the creatd image in the response body", async () => {
		const payload = {
			id: 4,
			url: "http://bar.com/img4",
			author: "bob",
		};
		const response = await SELF.fetch("http://localhost:8787/images", {
			method: "POST",
			body: JSON.stringify(payload),
		});

		expect(response.status).toEqual(201);

		const json = await response.json();
		expect(json).toEqual(
			expect.objectContaining(payload)
		);
	});
});