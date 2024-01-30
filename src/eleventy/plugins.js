import { EleventyRenderPlugin } from "@11ty/eleventy"
import bundler from "@11ty/eleventy-plugin-bundle"
import syntaxHighlight from "@11ty/eleventy-plugin-syntaxhighlight"
import webmentions from "@chrisburnell/eleventy-cache-webmentions"
import avatar from "./plugins/avatar.js"
import browserSupport from "./plugins/browser-support.js"
import image from "./plugins/image.js"
import pregenerateImages from "./plugins/pregenerateImages.js"
// import javascript from "./plugins/javascript.js"
import markdown from "./plugins/markdown.js"
import sass from "./plugins/sass.js"

export default {
	avatar,
	browserSupport,
	bundler,
	EleventyRenderPlugin,
	image,
	// javascript,
	markdown,
	pregenerateImages,
	sass,
	syntaxHighlight,
	webmentions,
}
