---
date: 2024-03-24T19:26:00+0800
title: How I shaved 1.5 minutes off my Eleventy build time
description: I had a revelation earlier today that solved a long-standing performance issue I’ve been having with the initial build of my Eleventy website, and here’s how it saved me a bunch of time!
tags:
  - eleventy
  - javascript
syndicate_to:
  - https://fediverse.repc.co/@chrisburnell/112150957494199196
---

<div class=" [ box ] [ line-length ] " style="margin-block-end: var(--size-large);">
    <p>Just want to learn how to speed up your build?</p>
    <p>Jump to the code: <a href="#memoizing-assets">Memoizing Assets</a></p>
</div>

Back in January, I had the pleasure of watching [Zach Leatherman’s](https://zachleat.com) amazing talk, [<q>Lessons learned moving Eleventy from CommonJS to ESM in 2024</q>](https://www.youtube.com/watch?v=LsN6TBx9Hxo), at [TheJam.dev 2024](https://cfe.dev/events/the-jam-2024/). As with so much of Zach’s work, it was truly inspiring and helped stoke the embers of motivation into a roaring flame.

He spoke (*unsurprisingly*) about all the work that went into getting ESM support into [Eleventy](https://11ty.dev) (available on [version 3’s alpha releases](https://www.npmjs.com/package/@11ty/eleventy?activeTab=versions)); some behind-the-scenes work that makes Eleventy so forgiving and easy for developers to work with, in particular, the ability to mix both CommonJS and ESM JavaScript; and some tips, tricks, and how-tos to get started using ESM in Eleventy today.

Naturally, I was chomping at the bit to convert my CommonJS over to ESM, so with the alpha releases being available, I decided to take the opportunity to start a **complete website refactor**.

## <q>If it ain’t broke, don’t fix it.</q>

Well, I felt like breaking things. If it meant the end result would be more maintainable than what I started with, I tore my website apart and put it back together with the knowledge I’d accumulated in the many years since I first built it.

It wasn’t much of a chore at all to convert things over to the ESM syntax, so a majority of the work ahead of me had more to do with brushing aside cobwebs and picking apart code that had been left untouched for a long time.

Reviewing all the code that makes up my Eleventy build *was* a slow and sometimes tedious process but also a cathartic one, and I’m glad I took the time to do it. I’m even more proud of my website as a result. <c-emoji>☺️</c-emoji>

But after a *tonne* of refactoring, I found my build times getting bigger and bigger.

## Trudging Along

It’s certainly worth mentioning that there are nearly 1,300 files being written by Eleventy for my website, so I don’t expect everything to be built *instantly*! However, when my local build times started climbing to **2–3 minutes** and **~10 minutes** in my GitHub Action that builds and deploys my website… I knew something was wrong.

Or, more likely, *I* was doing something wrong.

I battled against these excruciating build times for a couple of weeks as I tinkered on the rebuild here and there, but the mental overhead and waiting around was *more* than getting to me.

**Enough is enough!**

It was time to get to the bottom of things.

I had noticed, through using [Eleventy’s Debug Mode](https://www.11ty.dev/docs/debugging/), that the [Bundler Plugin](https://github.com/11ty/eleventy-plugin-bundle) was taking up a massive chunk of the build time. This probably wasn’t an issue coming just from using the Bundle plugin, and much more likely to be a result calling the `renderFile` shortcode from the [Render Plugin](https://www.11ty.dev/docs/plugins/render/) inside the `css` and `js` shortcodes from the Bundler plugin on every page:

{% raw %}
```twig
{% css -%}
	{% renderFile 'src/css/main.scss' %}
{%- endcss %}

{% js -%}
	{% renderFile 'src/js/main.js' %}
{%- endjs %}
```
{% endraw %}

Painfully, Eleventy was taking around **50 milliseconds** to process the asset bundling for *every single page*. With ~1,200 pages, this meant that **~60 seconds** of the initial build was spent just preparing asset bundles on each page.

**Not great. Not great at all.**

## Lightning Strikes

During the rebuild, I looked to the community’s troves of Eleventy projects, starter sites, and many tutorials for inspiration and ideas. There are so many talented developers in the Eleventy community; it’s a real blessing to be part of!

As I tinkered on bits and pieces of the rebuild, I picked up and started using a technique called [Memoization](https://en.wikipedia.org/wiki/Memoization) from [Nicolas Hoizey’s](https://nicolas-hoizey.com) superbly-built Eleventy template, [Pack11ty](https://pack11ty.dev/).

The gist of memoization is that instead of making repeated (possibly expensive) calls to files, functions, etc., the result of some function/process is made once and saved to a cache. This means that future calls with identical parameters that would return the same information come from a cache, bypassing computing work that can be a performance hog.

Here’s an example:

```javascript
// Set up an object to store cached data
const cachedResults = {}

const myFunction = (value) => {
	// Check if the cached data exists
	if (value in cachedResults) {
		// And if it does, return it
		return cachedResults[value]
	}

	// Otherwise, perform some operations with `value`
	const result = someExpensiveFunction(value)

	// Then cache the result
	cachedResults[value] = result
	// And return it
	return result
}
```

I had already been memoizing bits and pieces in my Eleventy build like custom [Collections](https://www.11ty.dev/docs/collections/). For example, my [Replies](/replies/) collection was an area where memoization definitely saved some computing power. The collection is populated by pages containing an `in_reply_to` key, rather than having a specific tag (for which Eleventy would automatically build a collection) or being in a specific location in the file system, so by generating the contents of this collection once and serving future `collections.replies` calls from the cache, I was seeing some not-insignificant performance gains.

<p style="font-size: var(--font-size-gamma-min); font-weight: var(--font-weight-bold);"><c-emoji style="font-size: var(--font-size-beta-max);">⚡</c-emoji> Hold on…</p>

Something finally clicked in my brain and I realised this would be a perfect opportunity to introduce memoization to asset bundling! Because *most* pages on my website reference the exact same set of CSS and/or JavaScript, the first page to be built with a given set of CSS/JS would be computed, the result saved to a cache, and all other pages referencing the same set of CSS/JS could skip the costly ~50ms of computation.

By caching the result of the `renderFile` shortcodes pointing to CSS and JavaScript assets, I found that my initial build times were sliced down to just 30 seconds!

Between all the cobwebs and (admittedly) spaghetti code in the previous iteration of my website, I hadn’t seen build times this short in *years*, not since I had many hundreds fewer pages and bottlenecks like this weren’t as obvious and painful!

<h2 id="memoizing-assets">Memoizing Build Assets</h2>

Part of my build already included a plugin that adds JavaScript as a templating language and allows me to pump JavaScript files through [esbuild](https://esbuild.github.io/) which spits out a bundled blob of JavaScript. Slotting memoization into this build process was quite straightforward, and instantly cut down my build times by a tremendous amount!

```javascript
import esbuild from "esbuild"

let cachedJS = {}

export default function (eleventyConfig) {
	// Recognise JS as a "template language"
	eleventyConfig.addTemplateFormats("js")

	// Compile JS
	eleventyConfig.addExtension("js", {
		outputFileExtension: "js",
		read: false,
		compile: async function (inputContent, inputPath) {
			// Ignore anything outside the front end JS folder
			if (!inputPath.includes("src/js/")) {
				return
			}

			return async () => {
				const inputPathNormalized = inputPath.replace(/^\.\//, "")
				// Skip processing and grab from the memoized cache
				if (inputPathNormalized in cachedJS) {
					return cachedJS[inputPathNormalized]
				}

				// Pass JS through esbuild to resolve imports and minify
				const esbuildResult = await esbuild.build({
					entryPoints: [inputPath],
					nodePaths: ["src/js", "node_modules"],
					external: ["fs"],
					format: "esm",
					target: "es6",
					bundle: true,
					minify: true,
					keepNames: true,
					write: false,
				})

				// Cache the result
				cachedJS[inputPathNormalized] = esbuildResult.outputFiles[0].text

				return esbuildResult.outputFiles[0].text
			}
		},
	})
}
```

<c-details>
    <summary>The same, but for SCSS</summary>

```javascript
import dotenv from "dotenv"
dotenv.config()

import autoprefixer from "autoprefixer"
import path from "node:path"
import postcss from "postcss"
import * as sass from "sass"

let cachedCSS = {}

export default function (eleventyConfig) {
	// Recognise SCSS as a "template language"
	eleventyConfig.addTemplateFormats("scss")

	// Compile SCSS
	eleventyConfig.addExtension("scss", {
		outputFileExtension: "css",
		compile: async function (inputContent, inputPath) {
			// Ignore anything outside the front end CSS folder
			if (!inputPath.includes("src/css/")) {
				return
			}

			// Ignore partials
			let parsed = path.parse(inputPath)
			if (parsed.name.startsWith("_")) {
				return
			}

			return async () => {
				const inputPathNormalized = inputPath.replace(/^\.\//, "")
				// Skip processing and grab from the memoized cache
				if (inputPathNormalized in cachedCSS) {
					return cachedCSS[inputPathNormalized]
				}

				// Pass SCSS through sass to resolve imports and minify
				const sassResult = sass.compileString(inputContent, {
					loadPaths: [parsed.dir || ".", "src/css", "node_modules"],
					style: "compressed",
					sourceMap: false,
				})

				// For builds, pass CSS through PostCSS and plugins
				if (process.env.ELEVENTY_RUN_MODE === "build") {
					const postcssResult = await postcss([autoprefixer]).process(sassResult.css, {
						from: inputPath,
					})

					// Cache the result
					cachedCSS[inputPathNormalized] = postcssResult.css

					return postcssResult.css
				}

				// Cache the result
				cachedCSS[inputPathNormalized] = sassResult.css

				return sassResult.css
			}
		},
	})
}
```

</c-details>

And with that relatively small addition, the initial build time of my website was zapped down from 2–3 minutes to just **30 seconds**!

Monumental savings, if you ask me!

I’m still searching for more places to apply memoization to see if I can reduce the amount of computation required by my build and squeeze my build times even further. Please get in touch if you have any ideas or insights!

If you want to explore adding memoization to your asset bundling, you can check out my [JavaScript build process](https://github.com/chrisburnell/chrisburnell.com/blob/e435e0c9bda73557ec0ec4e00b67d3a6c9c81e73/src/eleventy/plugins/javascript.js) and [SCSS build process](https://github.com/chrisburnell/chrisburnell.com/blob/e435e0c9bda73557ec0ec4e00b67d3a6c9c81e73/src/eleventy/plugins/scss.js) in my [git repository on GitHub](https://github.com/chrisburnell/chrisburnell.com).

There are also a couple of issues about memoization being part of Eleventy core on GitHub that you might want to check out:

- [Would it make sense to memoize some functions in Eleventy core?](https://github.com/11ty/eleventy/issues/2861)
- [Can Eleventy cache filters or template includes?](https://github.com/11ty/eleventy/issues/840)
