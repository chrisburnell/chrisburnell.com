import { metadata } from "chrisburnell"

export const name = metadata.name
export const pronouns = metadata.pronouns
export const location = metadata.location
export const website = metadata.website
export const thirtytwobitcafe = metadata.thirtytwobitcafe
export const bluesky = metadata.bluesky
export const buymeacoffee = metadata.buymeacoffee
export const codepen = metadata.codepen
export const chess = metadata.chess
export const discord = metadata.discord
export const discord_id = metadata.discord_id
export const eleventy = metadata.eleventy
export const github = metadata.github
export const indieweb = metadata.indieweb
export const lastfm = metadata.lastfm
export const linkedin = metadata.linkedin
export const mastodon = metadata.mastodon
export const mastodon_domain = metadata.mastodon_domain
export const nintendo = metadata.nintendo
export const notist = metadata.notist
export const npm = metadata.npm
export const opencollective = metadata.opencollective
export const pronouns_page = metadata.pronouns_page
export const pgp = metadata.pgp
export const speakerdeck = metadata.speakerdeck
export const spotify = metadata.spotify
export const trakt = metadata.trakt
export const twitter = metadata.twitter
export const untappd = metadata.untappd
export const websub = metadata.websub
export const xmpp = metadata.xmpp

export const firstname = "Chris"
export const lastname = "Burnell"
export const shortname = "chrisburnell"
export const role = "Front End Developer"
export const nationality = "Canadian"
export const email = "me@chrisburnell.com"
export const avatar = "/images/avatar@4x.jpeg"
export const description = `I’m <span class=" [ canada ] ">${name}</span> <button id="name" class=" [ anchor  small ] [ js-name-button  no-feed ] " title="Hear my name read aloud" tabindex="-1">/<span title="'k' in 'kind'">k</span><span title="'r' in 'rye'">r</span><span title="'i' in 'rabbit'">ɪ</span><span title="'s' in 'sigh'">s</span> <span title="'b' in 'buy'">b</span><span title="/ɜːr/: 'ur' in 'fur'">ɜːr</span><span title="/ˈ/: primary stress follows">ˈ</span><span title="'n' in 'nigh'">n</span><span title="/ɛ/: 'e' in 'dress'">ɛ</span><span title="'l' in 'lie'">l</span>/</button> (<a href="https://en.pronouns.page/@${pronouns_page}">${pronouns}</a>), a <span class=" [ canada ] ">Canadian</span> <span class="p-job-title">${role}</span> / Software Engineer living in <a href="https://www.openstreetmap.org/#map=14/1.3156/103.9425" class="p-locality">Singapore</a>. I’m often found <a href="/projects/">rabbit hole deep-diving</a>. This is where I think, write, and share my passion for front end development and the web.`
export const pgp_styled = pgp.replace(/(.{4})/g, `<span style="margin-inline-end: 1ex;">$1</span>`)

export const _employer = {
	title: "",
	role: "",
	url: "",
}

export default Object.assign({}, metadata, {
	firstname,
	lastname,
	shortname,
	role,
	nationality,
	email,
	avatar,
	description,
	pgp_styled,
	_employer,
})
