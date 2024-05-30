export default [
	{
		title: "ShopTalk Show",
		url: "https://shoptalkshow.com",
		rss: "https://shoptalkshow.com/feed/podcast/",
	},
	{
		title: "Ruminate",
		url: "https://ruminatepodcast.com",
		rss: "https://feeds.libsyn.com/517508/rss",
	},
	{
		title: "No Such Thing As A Fish",
		url: "https://nosuchthingasafish.com",
		rss: "https://audioboom.com/channels/2399216.rss",
	},
	{
		title: "Tuesdays with Stories!",
		url: "https://www.youtube.com/channel/UCsE74YJvPJpaquzTPMO8hAA",
		rss: "https://www.youtube.com/feeds/videos.xml?channel_id=UCsE74YJvPJpaquzTPMO8hAA",
	},
	{
		title: "We Might Be Drunk",
		url: "https://www.youtube.com/@WeMightBeDrunkPod",
		rss: "https://www.youtube.com/feeds/videos.xml?channel_id=UCy6A9WMN43DrtBkID7nMXJw",
	},
].sort((a, b) => {
	return a.title.localeCompare(b.title)
})
