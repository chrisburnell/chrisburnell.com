import { codepen, discord_id, eleventy, github, lastfm, linkedin, mastodon, mastodon_domain, nintendo, npm, speakerdeck, spotify, untappd, xmpp } from "./author.js"

export default [
	{
		title: "RSS",
		url: "/feed.xml",
		show: true,
	},
	{
		title: "CodePen",
		url: `https://codepen.io/${codepen}`,
		show: true,
	},
	{
		title: "GitHub",
		url: `https://github.com/${github}`,
		show: true,
	},
	{
		title: "LinkedIn",
		url: `https://www.linkedin.com/in/${linkedin}`,
		show: true,
		fill: "#0a66c2",
	},
	{
		title: "Mastodon",
		url: `https://${mastodon_domain}/@${mastodon.split("@")[1]}`,
		show: true,
		fill: "#595aff",
	},
	{
		title: "Discord",
		url: `https://discordapp.com/users/${discord_id}`,
	},
	{
		title: "Eleventy Community",
		url: `https://11ty.dev/authors/${eleventy}`,
	},
	{
		title: "Last.fm",
		url: `https://last.fm/user/${lastfm}`,
	},
	{
		title: "npm",
		url: `https://npmjs.com/~${npm}`,
	},
	{
		title: "Speakerdeck",
		url: `https://speakerdeck.com/${speakerdeck}`,
	},
	{
		title: "Spotify",
		url: `https://open.spotify.com/user/${spotify}`,
	},
	{
		title: "Untappd",
		url: `https://untappd.com/user/${untappd}`,
	},
	{
		title: "XMPP",
		value: xmpp,
	},
	{
		title: "Nintendo Switch ID",
		value: nintendo,
	},
]
