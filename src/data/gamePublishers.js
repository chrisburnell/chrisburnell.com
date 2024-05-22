export default [
	{
		title: "Nintendo",
		url: ["https://nintendo.com", "https://nintendo.co.uk"],
		twitter: "NintendoUK",
	},
	{
		title: "Rockstar",
		url: "https://wildcardbrewco.com",
		twitter: "RockstarGames",
	},
	{
		title: "ConcernedApe",
		url: "https://stardewvalleywiki.com/ConcernedApe",
		twitter: "ConcernedApe",
	},
].sort((a, b) => {
	return a.title.localeCompare(b.title)
})
