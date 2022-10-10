const fetchFilter = require("#filters/fetch")

module.exports = async () => {
	return [
		{
			url: "https://dnd.chrisburnell.com",
			data: {
				title: "Fëonir’s Workshop",
				description: 'Another <abbr title="Dungeons & Dragons">D&D</abbr>-related labour of love, this time a general site for all things D&D, including the draft of my new 12-chapter campaign for 5<sup>th</sup> Edition.',
				description_markdown: true,
				emoji: "🦎",
			},
		},
		{
			url: "https://micro.bloodbuilder.online",
			data: {
				title: "Micrathene",
				description: "Super Simple PWA for building [Microlite20](https://micro.bloodbuilder.online/docs/Microlite20.pdf) characters.",
				description_markdown: true,
				stargazers: async () => {
					const github = await fetchFilter.githubData("micrathene")
					return parseFloat(github["stargazers_count"]) || 0
				},
				emoji: "🔬",
			},
		},
		{
			url: "https://waterdeep.bloodbuilder.online",
			data: {
				title: "Waterdeep, A Curated Guide",
				description: 'I’m the Game Master for a <abbr title="Dungeons & Dragons">D&D</abbr> campaign of Waterdeep: Dragon Heist. This is a chronicle of my players’ time spent in Waterdeep.',
				description_markdown: true,
				emoji: "🐉",
			},
		},
		{
			url: "https://dnd.chrisburnell.com/feonir",
			data: {
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
}
