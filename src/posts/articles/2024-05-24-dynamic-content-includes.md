---
date: 2024-05-24T18:55:11+0800
title: Dynamic Content Includes
description: In this post, I explain how I solved two issues at the same time by introducing a feature to my post layout that I’m calling <q>pre</q> and <q>post</q> includes.
tags:
  - eleventy
  - weblogpomo
  - weblogpomo2024
post_includes:
  - weblogpomo2024.njk
---

Those of you who have been following along with my posts this month may have noticed that I’m participating in Weblog Posting Month 2024. At the end of each of my posts this month, I’ve included [a little blurb](#weblogpomo) about what it is and where to go to learn more about it.

Until yesterday, I was manually adding a chunk of HTML to the bottom of each post’s content by using an [include](https://mozilla.github.io/nunjucks/templating.html#include):

{% raw %}
```markdown
Lorem ipsum dolor sit amet, consectetur adipiscing elit.

{% include 'weblogpomo2024.njk' %}
```
{% endraw %}

While this was a straightforward task, I kept forgetting to do it!

I really wanted a smoother way to do this, and in doing some refactoring of my [RSS Feeds](/feeds/) yesterday, I found some things I wanted to tidy up in my `post.njk` layout:

{% raw %}
```twig
{% if category == 'recipe' %}
	{% include 'post/recipe.njk' %}
{% endif %}

{{ content | safe }}

{% if category == 'music' -%}
	{% include 'post/listen-of.njk' %}
{%- endif %}
```
{% endraw %}

These conditional checks are in the layout file used by *all* the posts on my website, which means that only a fraction of posts actually resolve these checks and include the respective HTML. It also doesn’t feel like the best place to store this logic.

That’s when I had an idea to help smoothen out the process of adding the Weblog Posting Month blurb and tidy up the logic in my `post.njk` layout file by killing two birds with one stone.

## Setting up

I decided to implement a small but dynamic feature into the layout file that I’m calling <q>pre</q> and <q>post</q> includes.

The idea here is that every post now has two additional properties—`pre_includes` and `post_includes`—which can contain a list of includes that should appear above or below the main of a post, respectively. `post.njk` then loops through each of these lists, inserting any desired includes into the page.

To start with, I’ll set these two new properties to an empty array for *all* posts using [Eleventy’s Computed Data](https://www.11ty.dev/docs/data-computed/) in my `posts.11tydata.js` file:

```javascript
export default {
	// ...
	pre_includes: [],
	post_includes: [],
}
```

<aside class=" [ flow ] " style="background-color: color-mix(in oklab, currentColor, transparent 95%); padding: var(--size-medium);">

**Aside:** Let’s take a quick look at the folder structure for my posts:

```
posts
├── posts.11tydata.js
├── music
│   ├── music.11tydata.js
│   └── ...
├── recipes
│   ├── recipes.11tydata.js
│   └── ...
└── ...
```

This folder structure means that any computed data applied to posts via my `posts.11tydata.js` file *also* applies to posts within the `music` and `recipes` folders.

</aside>

The next step in this implementation is to make some replacements in `post.njk` to loop through these new properties and insert an include for each value in both arrays:

{% raw %}
```twig
{% for pre_include in pre_includes -%}
	{% include pre_include %}
{%- endfor %}

{{ content | safe }}

{% for post_include in post_includes -%}
	{% include post_include %}
{%- endfor %}
```
{% endraw %}

## Using this new feature

*Here’s where the real magic happens.*

<p>Now I can instruct entire swathes of posts to use a particular set of includes.</p>

For example, instead of the previous `category == 'recipe'` check in my post layout, I can again use Eleventy Computed Data by adding a value to the  `pre_includes` array inside my `recipes.11tydata.js` file.

```javascript
export default {
	// ...
	pre_includes: ["post/recipe.njk"],
}
```

And in `music.11tydata.js`, I can set a value to the `post_includes` array to use the `post/listen-of.njk` include:

```javascript
export default {
	// ...
	post_includes: ["post/listen-of.njk"],
}
```

Jumping back to the Weblog Posting Month blurb, I can add a value to the `post_includes` array in each post’s front matter:

```yaml
post_includes:
  - weblogpomo2024.njk
```

Using [Eleventy’s Data Deep Merge](https://www.11ty.dev/docs/data-deep-merge/) allows the values I set in these arrays to be *merged* as you traverse down the tree from `posts.11tydata.js` to `music.11tydata.js` to an individual post.

This means that I don’t have to redefine values in the `post_includes` array for posts that should inherit some value(s) defined in a `*.11tydata.js` file. [Yesterday’s post in the Music category](/music/endtroducing/) is an example of this, where the value `post/listen-of.njk` is added by `music.11tydata.js` and I can *append* `weblogpomo2024.njk` to this array in the front matter (as above).

If I want to, I can also prefix either of these two new properties with `override:` which will cut off the Data Deep Merge for that post:

```yaml
override:post_includes:
  - no-merging-here.njk
  - only-these-includes.njk
```

<hr style="--rule-space: var(--size-medium);">

Let me know if you try out this concept, or if you have any suggestions or ideas to improve it!
