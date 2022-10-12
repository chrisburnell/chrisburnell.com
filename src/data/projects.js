const fetchFilter = require("#filters/fetch")

const getGithubData = async (repository) => {
	const github = await fetchFilter.githubData(repository)
	return github
}

module.exports = async () => {
	const personal = [
		{
			url: "https://dnd.chrisburnell.com",
			data: {
				date: "2021-04-26T12:00:00+0000",
				title: "Fëonir’s Workshop",
				description: 'Another <abbr title="Dungeons & Dragons">D&D</abbr>-related labour of love, this time a general site for all things D&D, including the draft of my new 12-chapter campaign for 5<sup>th</sup> Edition.',
				description_markdown: true,
				emoji: "🦎",
			},
		},
		{
			url: "https://micro.bloodbuilder.online",
			data: {
				date: "2020-03-31T12:00:00+0000",
				title: "Micrathene",
				description: "Super Simple PWA for building [Microlite20](https://micro.bloodbuilder.online/docs/Microlite20.pdf) characters.",
				description_markdown: true,
				emoji: "🔬",
				show_responses: true,
				updated: await getGithubData("chrisburnell/micrathene")
					.then((github) => github["updated_at"])
					.catch(() => false),
				// stargazers: await getGithubData("chrisburnell/micrathene")
				// 	.then((github) => parseFloat(github["stargazers_count"]))
				// 	.catch(() => 0),
			},
		},
		{
			url: "https://waterdeep.bloodbuilder.online",
			data: {
				date: "2019-09-05T12:00:00+0000",
				title: "Waterdeep, A Curated Guide",
				description: 'I’m the Game Master for a <abbr title="Dungeons & Dragons">D&D</abbr> campaign of Waterdeep: Dragon Heist. This is a chronicle of my players’ time spent in Waterdeep.',
				description_markdown: true,
				emoji: "🐉",
			},
		},
		{
			url: "https://dnd.chrisburnell.com/feonir",
			data: {
				date: "2018-03-12T12:00:00+0000",
				title: "BloodBuilder",
				description: "Super Simple PWA for [1e Pathfinder](https://paizo.com/pathfinder) Pure Core Classes.",
				description_markdown: true,
				emoji: "🗡️",
			},
		},
		{
			url: "https://gifs.chrisburnell.com",
			data: {
				title: "GIFs on GIFs on GIFs",
				description: "A curated list of sick GIFs.",
				description_markdown: true,
				emoji: "🌠",
			},
		},
		{
			url: "https://dizzy.chrisburnell.com",
			data: {
				title: "Feelin’ Dizzy",
				description: "Feelin’ dizzy or blue? This should sort you right out.",
				description_markdown: true,
				emoji: "🌪️",
			},
		},
	]

	const previousVersions = [
		{
			url: "https://v2.chrisburnell.com",
			data: {
				date: "2013-05-30T12:00:00+0000",
				updated: "2020-08-02T12:00:00+0000",
				title: "Version 2",
				description: "The second version of my personal site that I used for over six years and laid the groundwork and mentality for the next version.",
				description_markdown: true,
				emoji: "🐓"
			}
		},
		{
			url: "https://v1.chrisburnell.com/",
			data: {
				date: "2008-04-21T12:00:00+0000",
				updated: "2013-05-30T12:00:00+0000",
				title: "Version 1",
				description: "The first-ever version of my personal site. Things have changed slightly since 2008.",
				description_markdown: true,
				emoji: "🐣"
			}
		}
	]

	const web = [
		{
			url: "https://weather.chrisburnell.com",
			data: {
				date: "2020-02-20T12:00:00+0000",
				title: "Weather",
				description: "Not the most interesting of project titles, this is a personalised weather web app.",
				description_markdown: true,
				emoji: "⛈️",
			},
		},
		{
			url: "https://ownyourbeer.chrisburnell.com",
			data: {
				date: "2019-05-15T12:00:00+0000",
				title: "OwnYourBeer",
				description: "An IndieWeb tool to help you pull check-ins from [Untappd](https://untappd.com). Still a work-in-progress.",
				description_markdown: true,
				emoji: "🍻",
				show_responses: true,
				updated: await getGithubData("chrisburnell/OwnYourBeer")
					.then((github) => github["updated_at"])
					.catch(() => false),
				// stargazers: await getGithubData("chrisburnell/OwnYourBeer")
				// 	.then((github) => parseFloat(github["stargazers_count"]))
				// 	.catch(() => 0),
			},
		},
		{
			url: "https://repc.co",
			data: {
				date: "2019-03-04T12:00:00+0000",
				title: "Reptile C",
				description: "My personal (and automatic) URL-shortening service based on Tantek Çelik’s base-60 numbering system, NewBase60. <em>Note: the homepage just redirects to this website, but you can read about how it works here: [LiquidBase60](https://chrisburnell.com/article/liquid-base-60/)</em>.",
				description_markdown: true,
				emoji: "🔗",
			},
		},
		{
			url: "https://corvus.chrisburnell.com",
			data: {
				date: "2019-05-15T12:00:00+0000",
				title: "Corvus",
				description: "My personal [micropub](https://indieweb.org/micropub) endpoint.",
				description_markdown: true,
				emoji: "🐦",
				show_responses: true,
				updated: await getGithubData("chrisburnell/corvus")
					.then((github) => github["updated_at"])
					.catch(() => false),
				// stargazers: await getGithubData("chrisburnell/corvus")
				// 	.then((github) => parseFloat(github["stargazers_count"]))
				// 	.catch(() => 0),
			},
		},
		{
			url: "https://media.chrisburnell.com",
			data: {
				date: "2018-02-21T12:00:00+0000",
				title: "Media Controls",
				description: "Play native web media and utilise keyboard controls à la YouTube.",
				description_markdown: true,
				emoji: "🎧",
				show_responses: true,
				updated: await getGithubData("chrisburnell/mediaControls")
					.then((github) => github["updated_at"])
					.catch(() => false),
				// stargazers: await getGithubData("chrisburnell/mediaControls")
				// 	.then((github) => parseFloat(github["stargazers_count"]))
				// 	.catch(() => 0),
			},
		},
		{
			url: "https://ww.chrisburnell.com",
			data: {
				date: "2017-11-08T12:00:00+0000",
				title: "Viewport Dimensions",
				description: "A very simple tool to measure your viewport dimensions.",
				description_markdown: true,
				emoji: "📐",
			},
		},
		{
			url: "https://codepen.io/collection/hfqlg",
			data: {
				date: "2013-04-08T12:00:00+0000",
				updated: "2018-02-01T12:00:00+0000",
				title: "My Featured Pens on CodePen",
				description: "Pens of mine that were featured on Codepen’s homepage.",
				description_markdown: true,
				emoji: "💻",
			},
		},
	]

	return {
		personal: personal,
		previousVersions: previousVersions,
		web: web
	}
}
