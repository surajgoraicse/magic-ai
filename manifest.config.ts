import { defineManifest } from "@crxjs/vite-plugin";

export default defineManifest({
	manifest_version: 3,
	name: "Linkedin++",
	description: "Generate beautiful comments",
	version: "1.0.0",
	action: {
		default_popup: "index.html",
		default_icon: {
			"128": "icon.png",
		},
	},
	icons: {
		"128": "icon.png",
	},
	permissions: ["storage", "scripting", "tabs"],
	host_permissions: ["https://*.linkedin.com/*"],
	options_page: "src/options/options.html",
	content_scripts: [
		{
			matches: ["https://*.linkedin.com/*"],
			js: ["src/content/content.ts"],
		},
	],
	background: {
		service_worker: "src/background/background.ts",
	},
});
