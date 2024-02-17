const musicalArtists = [
	{
		title: "Kendrick Lamar",
		url: "https://open.spotify.com/artist/2YZyLoL8N0Wb9xBt1NhZWg",
		twitter: "kendricklamar",
	},
	{
		title: "Ocean Wisdom",
		url: "https://open.spotify.com/artist/0D9N9NxMbXKjmoRI1JVdz8",
		twitter: "Ocean_Wisdom",
	},
	{
		title: "Skepta",
		url: "https://open.spotify.com/artist/2p1fiYHYiXz9qi0JJyxBzN",
		twitter: "Skepta",
	},
	{
		title: "Mitch Murder",
		url: "https://mitchmurder.bandcamp.com",
		twitter: "mitch_murder",
	},
	{
		title: "Yelawolf",
		url: "https://open.spotify.com/artist/68DWke2VjdDmA75aJX5C57",
		twitter: "Yelawolf",
	},
	{
		title: "D Double E",
		url: "https://open.spotify.com/artist/6bwkMlweHsBCpI2a0C5nnN",
		twitter: "DDoubleE7",
	},
].sort((a, b) => {
	return a.title.localeCompare(b.title)
})

export default musicalArtists
