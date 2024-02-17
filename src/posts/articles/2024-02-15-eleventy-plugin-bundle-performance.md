---
draft: true
date: 2024-02-15T22:17:00+0800
title: How I shaved 1.5 minutes off my Eleventy build time
description: I had a revelation earlier today that solved a long-standing performance issue I’ve been having with the initial build of my Eleventy website, and here’s how it saved me a bunch of time!
tags:
  - eleventy
  - javascript
wide: true
---

<div class=" [ box ] [ line-length ] " style="margin-block-end: var(--size-large);">
    <p>Jump to the code: <a href="#memoizing-assets">Memoizing Assets</a></p>
</div>

I recently had the pleasure of watching [Zach Leatherman’s](https://zachleat.com) amazing talk, [<q>Lessons learned moving Eleventy from CommonJS to ESM in 2024</q>](https://www.youtube.com/watch?v=LsN6TBx9Hxo), at [TheJam.dev 2024](https://cfe.dev/events/the-jam-2024/). As with all of Zach’s work, it was truly inspiring and stoked the embers of motivation into a roaring flame.

He spoke—*unsurprisingly*—about all the work that went into getting ESM support into [Eleventy](https://11ty.dev) (available on [version 3’s alpha releases](https://www.npmjs.com/package/@11ty/eleventy?activeTab=versions)); some behind-the-scenes stuff that makes Eleventy so forgiving and easy for developers to work with, mixing both CommonJS and ESM, in particular; and some tips, tricks, and how-tos to get started using ESM in Eleventy today.

Naturally, I was chomping at the bit to convert my CommonJS over to ESM, so with the alpha releases being available, I decided to take the opportunity to start a *big old refactor* of my website. It wasn’t much of a chore at all to convert things over to the ESM syntax, so a majority of the work ahead of me had more to do with brushing aside cobwebs and picking apart code that had been left untouched for a long time.

<q>If it ain’t broke, don’t fix it.</q>

Well, I felt like breaking things. If it meant the end result would be more maintainable than what I started with, I tore it apart and put it back together with the knowledge I’d accumulated in the many years since I first built it.

It was a slow and sometimes tedious process but also a cathartic one, and I’m glad I took the time to do it. I’m even more proud of my website, my favourite thing that I own, as a result. Good vibes all around. <c-emoji>☺️</c-emoji>

But after a *tonne* of refactoring, I found my build times getting bigger and bigger.

## Trudging Along

It’s definitely worth mentioning that there are over 1,200 files being written by Eleventy for my website, so I don’t expect everything to be built *instantly*! However, when the initial build started taking **2–3 minutes**, I knew something was wrong.

Or, more likely, *I* was doing something wrong.

I battled against these excruciating build times for a couple of weeks as I tinkered on the rebuild here and there, and the mental and waiting around was *more* than getting to me.

**Enough is enough!**

It was time to get to the bottom of things.

I had noticed, through using [Eleventy’s Debug Mode](https://www.11ty.dev/docs/debugging/), that the [Bundler Plugin](https://github.com/11ty/eleventy-plugin-bundle) was taking huge chunk of the 2–3 minute build time. This probably wasn’t an issue coming just from using the Bundle plugin, and much more likely to be a result calling the `renderFile` shortcode from the [Render Plugin](https://www.11ty.dev/docs/plugins/render/) inside the `css` and `js` shortcodes from the Bundler plugin on every page:

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

Painfully, Eleventy was taking around **50 milliseconds** to process the asset bundling for each page. With **~1,100 pages**, this meant that **~55 seconds** of the initial build was spent preparing asset bundles for all the pages.

**Not great.**

## Lightning Strikes

I had picked up and been using a technique from [Nicolas Hoizey’s](https://nicolas-hoizey.com) superbly-built Eleventy template, [Pack11ty](https://pack11ty.dev/), called [Memoization](https://en.wikipedia.org/wiki/Memoization).

The gist of memoization is that instead of making repeated (possibly expensive) calls to files, functions, etc., the request is made once and saved to a cache. That way, future calls that would return the same information simply come from the cache, bypassing computing work that can be a performance hog.

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

I was already doing this for bits and pieces in my Eleventy build like caching custom [Collections](https://www.11ty.dev/docs/collections/). For example, my [Replies](/replies/) collection was a good spot for memoization to happen. The collection is populated by pages containing an `in_reply_to` key, rather than having a specific tag (for which Eleventy would automatically build a collection) or being in a specific location in the file system, so by generating the contents of this collection once and serving future `collections.replies` calls from the cache, I was seeing some not insignificant performance gains.

<p style="font-size: 1.125em; font-weight: var(--font-weight-bold);"><c-emoji>⚡</c-emoji> Hold on…</p>

Something finally clicked in my brain and I realised this would be a perfect opportunity to introduce memoization to asset bundling!

By caching the result of the `renderFile` shortcodes pointing to CSS and JavaScript assets, I found that my initial build times were sliced down to just 30 seconds! Between all the cobwebs and (admittedly) spaghetti code in the previous iteration of my website, I hadn’t seen build times this short in *years*, not since I had many hundreds fewer pages and bottlenecks like this weren’t as obvious and painful so as to initiate an major refactoring project!

## Memoizing Build Assets

Part of my build already included a plugin that added JavaScript as a templating language, pumps rendered JS files through [esbuild](https://esbuild.github.io/), and spits out the result. This allowed me to

So here it is, the contents of my plugin that adds JavaScript as a templating language, pumps rendered JS files through [esbuild](https://esbuild.github.io/), and adds memoization so that repeated calls are pulled from a cached object.

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

And with that small addition, the initial build time of my website was zapped down to just 30 seconds. Monumental savings, if you ask me!
