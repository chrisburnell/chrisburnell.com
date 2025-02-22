---
date: 2024-05-25T23:10:30+0800
title: Spongebob Sentiment
description: I’ve got a bit of a SiLLy POsT for you today.
tags:
  - weblogpomo
  - weblogpomo2024
  - eleventy
  - javascript
post_includes:
  - weblogpomo2024.njk
---

In today’s quick post, I’m going to show how to use a couple of npm packages—[natural](https://www.npmjs.com/package/natural) and [random-case](https://www.npmjs.com/package/random-case)—to build a rudimentary sentiment analyser that transforms the case of programmatically-determined *unsavoury* text to read like a <q>moCkING SPOnGEBOB MEme</q>.

<figure>
    {% image './images/content/spongebob-meme.jpeg', "Mocking Spongebob Meme that reads 'This is the dumbest idea I’ve ever seen'" %}
</figure>

<hr style="--rule-space: var(--size-medium);">

I built this filter using ESM JavaScript:

```javascript
import Natural from "natural"
import randomCase from "random-case"

const sentimentAnalyzer = new Natural.SentimentAnalyzer("English", Natural.PorterStemmer, "afinn")

export const sentimentCheck = (string, threshold = -0.3) => {
	const words = string.match(/\b(\w+)\b/g)
	if (sentimentAnalyzer.getSentiment(words) <= threshold) {
		return randomCase(string)
	}
	return string
}
```

The `sentimentCheck` function splits the passed-in string into an array of just the words inside, and this array is analyzed for its sentiment and given a score from `-5` (extremely negative) to `5` (extremely positive). If the computed sentiment is less than a given threshold (`-0.3` in this case), then the string will be transformed into a random assortment of lowercase and uppercase characters!

This function can be used as an Eleventy Filter by pulling it into your Eleventy config file. By keeping the code in a file *outside* of the config file, it can be applied to strings in other JavaScript files *and* as a Nunjucks/Liquid Filter by importing it from the file that it lives in.

```javascript
import filters from "filters.js"

export default async function(eleventyConfig) {
	eleventyConfig.addFilter("sentimentCheck", filters.sentimentCheck)
}
```

This might be a good Filter to run against comments or Webmentions to spite anyone who writes nasty or snarky things on your website. For example, let’s say we’re using Nunjucks to loop through and print out replies to a post:

{% raw %}
```twig
{% for reply in replies %}
	<h4>{{ reply.name }}</h4>
	<p>{{ reply.content | sentimentCheck }}</p>
{% endfor %}
```
{% endraw %}

The sentiment analyzer isn’t as complex or powerful as one would hope, as it seems to work by building a tally of negative and positive words in a given string versus its length to get a computed sentiment value. For example, the phrase, <q>This is terribly smart</q> receives a score of `-0.5` because it contains the word <q>terribly</q>, even though it also contains the word <q>smart</q>. I guess the pre-defined vocabulary of positive and negative words scores <q>terribly</q> as more negative than <q>smart</q> is possible.

On the other hand, we might start finding ourselves in LLM territory if we wanted to implement something more complex than that. I’d rather avoid that, so it may be a good idea to tune the `threshold` value so that only extremely negative strings are transformed.

Feel free to dig into the [source code](https://github.com/NaturalNode/natural) if you want to experiment with your own vocabularies.

Either way, this might be a dumb idea, but it is pretty funny. 😆
