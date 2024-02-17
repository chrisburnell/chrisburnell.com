const publications = [
	{
		title: "NYT Cooking",
		url: "http://cooking.nytimes.com",
	},
].sort((a, b) => {
	return a.title.localeCompare(b.title)
})

export default publications
