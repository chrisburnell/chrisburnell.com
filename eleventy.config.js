import dotenv from "dotenv";
dotenv.config({ quiet: true });

import { styleText } from "node:util";
import builders from "./src/eleventy/builders.js";
import collections from "./src/eleventy/collections.js";
import config from "./src/eleventy/config.js";
import { url as siteURL } from "./src/eleventy/data/site.js";
import { filtersAsync, filtersSync } from "./src/eleventy/filters.js";
import plugins from "./src/eleventy/plugins.js";
import shortcodes from "./src/eleventy/shortcodes.js";
import transforms from "./src/eleventy/transforms.js";

/**
 * @param {import("@11ty/eleventy/src/UserConfig").default} eleventyConfig
 */
export default async function (eleventyConfig) {
	/**
	 * Layouts
	 */
	eleventyConfig.addLayoutAlias("base", "base.njk");
	eleventyConfig.addLayoutAlias("page", "page.njk");
	eleventyConfig.addLayoutAlias("archive", "archive.njk");
	eleventyConfig.addLayoutAlias("httpstatus", "httpstatus.njk");
	eleventyConfig.addLayoutAlias("post", "post.njk");
	eleventyConfig.addLayoutAlias("feed", "feed.njk");

	/**
	 * Collections
	 */
	Object.keys(collections).forEach((collectionName) => {
		eleventyConfig.addCollection(
			collectionName,
			collections[collectionName],
		);
	});

	/**
	 * Collection Builders
	 */
	eleventyConfig.addCollection("categories", builders.categories);
	eleventyConfig.addCollection("tags", builders.tags);

	/**
	 * Shortcodes
	 */
	Object.keys(shortcodes).forEach((shortcodeName) => {
		eleventyConfig.addShortcode(shortcodeName, shortcodes[shortcodeName]);
	});

	/**
	 * Plugins
	 */
	eleventyConfig.addPlugin(plugins.avatar);
	eleventyConfig.addPlugin(plugins.browserSupport);
	eleventyConfig.addPlugin(plugins.EleventyRenderPlugin);
	eleventyConfig.addPlugin(plugins.image);
	eleventyConfig.addPlugin(plugins.javascript);
	eleventyConfig.addPlugin(plugins.markdown);
	eleventyConfig.addPlugin(plugins.ogImage, config.ogImage);
	eleventyConfig.addPlugin(plugins.rss);
	eleventyConfig.addPlugin(plugins.scss);
	eleventyConfig.addPlugin(plugins.syntaxHighlight, config.syntaxHighlight);
	eleventyConfig.addPlugin(plugins.webc, config.webc);
	if (process.env.WEBMENTION_IO_TOKEN) {
		eleventyConfig.addPlugin(plugins.webmentions, config.webmentions);
	}
	// if (process.env.ELEVENTY_RUN_MODE === "build") {
	// 	eleventyConfig.addPlugin(plugins.eleventyImageTransformPlugin, {
	// 		// which file extensions to process
	// 		extensions: "html",
	// 		// optional, output image formats
	// 		formats: ["avif", "webp", "auto"],
	// 		// optional, output image widths
	// 		// widths: ["auto"],
	// 		// optional, attributes assigned on <img> override these values.
	// 		defaultAttributes: {
	// 			loading: "lazy",
	// 			decoding: "async"
	// 		}
	// 	})
	// }
	if (process.env.DIRECTORY_OUTPUT) {
		eleventyConfig.addPlugin(plugins.inclusiveLanguage);
	}
	if (process.env.DIRECTORY_OUTPUT) {
		eleventyConfig.addPlugin(
			plugins.directoryOutput,
			config.directoryOutput,
		);
	}
	if (process.env.PREGENERATE_IMAGES) {
		eleventyConfig.addPlugin(plugins.pregenerateImages);
	}

	/**
	 * Filters
	 */
	Object.keys(filtersSync).forEach((filterType) => {
		Object.keys(filtersSync[filterType]).forEach((filterName) => {
			eleventyConfig.addFilter(
				filterName,
				filtersSync[filterType][filterName],
			);
		});
	});
	Object.keys(filtersAsync).forEach((filterType) => {
		Object.keys(filtersAsync[filterType]).forEach((filterName) => {
			eleventyConfig.addAsyncFilter(
				filterName,
				filtersAsync[filterType][filterName],
			);
		});
	});

	/**
	 * Transforms
	 */
	eleventyConfig.addTransform("html", transforms.html);

	/**
	 * Static Files
	 */
	eleventyConfig.addPassthroughCopy("audio");
	eleventyConfig.addPassthroughCopy("fonts");
	eleventyConfig.addPassthroughCopy("images");
	eleventyConfig.addPassthroughCopy("static");
	eleventyConfig.addPassthroughCopy("video");
	eleventyConfig.addPassthroughCopy({
		files: ".",
		"src/js/components": "js/components/",
		"node_modules/@chrisburnell/event-countdown/event-countdown.js":
			"js/components/event-countdown.js",
		"node_modules/@chrisburnell/cow-pen/cow-pen.js":
			"js/components/cow-pen.js",
		"node_modules/@chrisburnell/instant-photo/instant-photo.js":
			"js/components/instant-photo.js",
		"node_modules/@chrisburnell/paper-stamp/paper-stamp.js":
			"js/components/paper-stamp.js",
		"node_modules/@chrisburnell/relative-time/relative-time.js":
			"js/components/relative-time.js",
		"node_modules/@chrisburnell/spark-line/spark-line.js":
			"js/components/spark-line.js",
		"node_modules/@chrisburnell/svg-sparkline/svg-sparkline.js":
			"js/components/svg-sparkline.js",
		"node_modules/@chrisburnell/url-input/url-input.js":
			"js/components/url-input.js",
		"node_modules/@daviddarnes/link-peek/link-peek.js":
			"js/components/link-peek.js",
		"node_modules/@zachleat/details-utils/details-utils.js":
			"js/components/details-utils.js",
		"node_modules/@zachleat/seven-minute-tabs/seven-minute-tabs.js":
			"js/components/seven-minute-tabs.js",
		"node_modules/lite-youtube-embed/src/lite-yt-embed.css":
			"css/components/lite-yt-embed.css",
		"node_modules/lite-youtube-embed/src/lite-yt-embed.js":
			"js/components/lite-yt-embed.js",
	});

	/**
	 * Build Settings
	 */
	eleventyConfig.addBundle("css");
	eleventyConfig.addWatchTarget("./src/css");
	eleventyConfig.addBundle("js");
	eleventyConfig.addWatchTarget("./src/js");
	eleventyConfig.setDataDeepMerge(true);
	eleventyConfig.setServerPassthroughCopyBehavior("passthrough");
	eleventyConfig.setQuietMode(true);
	eleventyConfig.on("beforeBuild", () => {
		console.log(
			styleText(
				"grey",
				`[${filtersSync.urls.getHost(siteURL)}] Building...`,
			),
		);
	});

	return {
		htmlTemplateEngine: false,
		markdownTemplateEngine: "njk",
		dir: {
			input: "src",
			output: "_site",
			data: "eleventy/data",
			includes: "eleventy/includes",
			layouts: "eleventy/layouts",
		},
	};
}
