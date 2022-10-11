const fetchFilter = require("#filters/fetch")

module.exports = async () => {
	return [
		{
			url: "https://weather.chrisburnell.com",
			data: {
				title: "Weather",
				description: "Not the most interesting of project titles, this is a personalised weather web app.",
				description_markdown: true,
				emoji: "⛈️",
			},
		},
		{
			url: "https://ownyourbeer.chrisburnell.com",
			data: {
				title: "OwnYourBeer",
				description: "An IndieWeb tool to help you pull check-ins from [Untappd](https://untappd.com). Still a work-in-progress.",
				description_markdown: true,
				stargazers: async () => {
					const github = await fetchFilter.githubData("chrisburnell/OwnYourBeer")
					return parseFloat(github["stargazers_count"]) || 0
				},
				emoji: "🍻",
			},
		},
		{
			url: "https://repc.co",
			data: {
				title: "Reptile C",
				description: "My personal (and automatic) URL-shortening service based on Tantek Çelik’s base-60 numbering system, NewBase60. <em>Note: the homepage just redirects to this website, but you can read about how it works here: [LiquidBase60](https://chrisburnell.com/article/liquid-base-60/)</em>.",
				description_markdown: true,
				emoji: "🔗",
			},
		},
		{
			url: "https://corvus.chrisburnell.com",
			data: {
				title: "Corvus",
				description: "My personal [micropub](https://indieweb.org/micropub) endpoint.",
				description_markdown: true,
				stargazers: async () => {
					const github = await fetchFilter.githubData("chrisburnell/corvus")
					return parseFloat(github["stargazers_count"]) || 0
				},
				emoji: "🐦",
			},
		},
		{
			url: "https://media.chrisburnell.com",
			data: {
				title: "Media Controls",
				description: "Play native web media and utilise keyboard controls à la YouTube.",
				description_markdown: true,
				stargazers: async () => {
					const github = await fetchFilter.githubData("chrisburnell/mediaControls")
					return parseFloat(github["stargazers_count"]) || 0
				},
				emoji: "🎧",
			},
		},
		{
			url: "https://ww.chrisburnell.com",
			data: {
				title: "Viewport Dimensions",
				description: "A very simple tool to measure your viewport dimensions.",
				description_markdown: true,
				emoji: "📐",
			},
		},
		{
			url: "https://codepen.io/collection/hfqlg",
			data: {
				title: "My Featured Pens on CodePen",
				description: "Pens of mine that were featured on Codepen’s homepage.",
				description_markdown: true,
				emoji: "💻",
			},
		},
	]
}
