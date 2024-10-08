import { EleventyRenderPlugin } from "@11ty/eleventy";
import { eleventyImageTransformPlugin } from "@11ty/eleventy-img";
import directoryOutput from "@11ty/eleventy-plugin-directory-output";
import inclusiveLanguage from "@11ty/eleventy-plugin-inclusive-language";
import rss from "@11ty/eleventy-plugin-rss";
import syntaxHighlight from "@11ty/eleventy-plugin-syntaxhighlight";
import webc from "@11ty/eleventy-plugin-webc";
import webmentions from "@chrisburnell/eleventy-cache-webmentions";
import ogImage from "eleventy-plugin-og-image";
import avatar from "./plugins/avatar.js";
import browserSupport from "./plugins/browser-support.js";
import image from "./plugins/image.js";
import javascript from "./plugins/javascript.js";
import markdown from "./plugins/markdown.js";
import pregenerateImages from "./plugins/pregenerateImages.js";
import scss from "./plugins/scss.js";

export default {
	EleventyRenderPlugin,
	eleventyImageTransformPlugin,
	directoryOutput,
	inclusiveLanguage,
	rss,
	syntaxHighlight,
	webc,
	webmentions,
	avatar,
	browserSupport,
	image,
	javascript,
	ogImage,
	pregenerateImages,
	markdown,
	scss,
};
