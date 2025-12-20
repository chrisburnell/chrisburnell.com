export default {
	pagination: {
		data: "collections.posts",
		size: 1,
		before: function (paginationData) {
			return paginationData.slice(0, 1);
		},
	},
};
