export default [
	{
		title: "NYT Cooking",
		url: "http://cooking.nytimes.com",
	},
].sort((a, b) => {
	return a.title.localeCompare(b.title, undefined, {
		numeric: true,
		ignorePunctuation: true,
		sensitivity: "base",
	});
});
