/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run `npm run dev` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `npm run deploy` to publish your worker
 *
 * Bind resources to your worker in `wrangler.jsonc`. After adding bindings, a type definition for the
 * `Env` object can be regenerated with `npm run cf-typegen`.
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */


// It's possible to have both fetch and scheduled functions in the same worker.

// test curl "http://localhost:8787/cdn-cgi/handler/scheduled?cron=*/5+*+*+*+*"

export default {
	async scheduled(
		controller: ScheduledController,
		env: Env,
		ctx: ExecutionContext
	) {
		switch (controller.cron) {
			case "*/1 * * * *":
				console.log("Running every minute");
				break;
			case "*/5 * * * *":
				console.log("Running every 5 minutes");
				break;
			case "0 0 * * *":
				console.log("Running every hour");
				break;
			
			default:
				break;
		}
	},
} satisfies ExportedHandler<Env>;