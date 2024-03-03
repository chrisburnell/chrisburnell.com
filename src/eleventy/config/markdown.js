import markdownParser from "markdown-it"
import markdownAbbr from "markdown-it-abbr"
import markdownFootnote from "markdown-it-footnote"

const markdown = markdownParser({
	html: true,
	breaks: true,
	linkify: true,
})
	.use(markdownAbbr)
	.use(markdownFootnote)
	.disable("code")

markdown.renderer.rules.footnote_block_open = () => {
	return `<hr>
	<nav aria-label="Footnotes">
		<ol>`
}

markdown.renderer.rules.footnote_block_close = () => {
	return `</ol>
	</nav>`
}

markdown.renderer.rules.footnote_caption = (tokens, idx) => {
	let n = Number(tokens[idx].meta.id + 1).toString()
	if (tokens[idx].meta.subId > 0) {
		n += ":" + tokens[idx].meta.subId
	}
	return n
}

markdown.renderer.rules.footnote_open = (tokens, idx, options, env, slf) => {
	var id = slf.rules.footnote_anchor_name(tokens, idx, options, env, slf)
	if (tokens[idx].meta.subId > 0) {
		id += ":" + tokens[idx].meta.subId
	}
	return `<li id="fn${id}" class=" [ flow ] ">`
}

markdown.renderer.rules.footnote_ref = (tokens, idx, options, env, slf) => {
	const id = slf.rules.footnote_anchor_name(tokens, idx, options, env, slf)
	const caption = slf.rules.footnote_caption(tokens, idx, options, env, slf)
	let refid = id

	if (tokens[idx].meta.subId > 0) refid += `:${tokens[idx].meta.subId}`

	return `<a href="#fn${id}" id="fnref${refid}"><sup>${caption}</sup></a>`
}

markdown.renderer.rules.footnote_anchor = (tokens, idx, options, env, slf) => {
  let id = slf.rules.footnote_anchor_name(tokens, idx, options, env, slf)

  if (tokens[idx].meta.subId > 0) id += `:${tokens[idx].meta.subId}`

  // ↩ with escape code to prevent display as Apple Emoji on iOS
  return ` <a href="#fnref${id}">\u21a9\uFE0E</a>`
}

export default markdown
