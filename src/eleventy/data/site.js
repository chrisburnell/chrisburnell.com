import env from "./env.js";

export const title = env.DEV_MODE ? "Chris Burnell (Dev)" : "Chris Burnell";
export const tagline = `<span class=" [ canada ] ">Ravenous</span> for CSS`;
export const description = `I’m <span class=" [ canada ] ">Chris Burnell</span>, a <span class="p-job-title">Front End Developer</span> / Software Engineer based in <span class=" [ canada ] [ p-locality ] ">Halifax, Canada</span>. <wbr>This is where I think, write, and share my passion for front end development and the web.`;
export const catchphrase =
	"We were riding the crest of a high and meaningless wave";
export const url = env.DEV_MODE
	? "https://dev.chrisburnell.com"
	: "https://chrisburnell.com";
export const repository = "chrisburnell.com";
export const branch = env.DEV_MODE ? "development" : "main";
export const dir = "ltr";
export const locale = "en";
export const localeSpecific = "en-GB";
export const timezone = "America/Halifax";
export const established = "2008";
export const favicon = "/images/favicon-256.png";
export const logo = "/images/raven.svg";
export const speedlify = "chrisburnell";
export const fathom_siteid = "NMGWH";

export const limits = {
	deck: 2,
	shelf: 3,
	feature: 2,
	homepage: 4,
	feed: 10,
	sparkline: 15,
	maxWords: 40,
	recentDays: 14,
	upcomingDays: 7,
	rssOnlyDays: 3,
	minimumResponsesRequired: 5,
};

export const sitemap = {
	changefreq: "monthly",
	priority: 0.5,
};

export const weights = {
	count: 0.5,
	deltas: 1,
};

export const cacheDurations = {
	hourly: "1h",
	daily: "23h",
	weekly: "167h",
	monthly: "671h",
};

export const urls = {
	fathom: "https://logs.chrisburnell.com",
	license: "https://creativecommons.org/licenses/by-nc-sa/4.0/legalcode",
	indieauth_endpoint: "https://indieauth.com/auth",
	indieauth_token: "https://tokens.indieauth.com/token",
	micropub: "https://corvus.chrisburnell.com",
	openid: "https://openid.indieauth.com/openid",
	speedlify: "https://speedlify.chrisburnell.com",
	superfeedr: "https://chrisburnell.superfeedr.com",
	switchboard: "https://switchboard.p3k.io",
	treo: "https://treo.sh/sitespeed/chrisburnell.com",
};

export const conferences = {
	sotb: {
		date: "2026-02-28T09:30:00+0000",
		end: "2026-02-28T16:30:00+0000",
	},
};

export default {
	title,
	tagline,
	description,
	catchphrase,
	url,
	repository,
	branch,
	dir,
	locale,
	localeSpecific,
	timezone,
	established,
	favicon,
	logo,
	speedlify,
	limits,
	sitemap,
	weights,
	cacheDurations,
	urls,
	conferences,
};
