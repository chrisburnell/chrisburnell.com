const fetchFilter = require("#filters/fetch")

const author = require("#data/author")
const site = require("#data/site")

module.exports = async () => {
	return {
		information: async () => {
			return await fetchFilter.githubData(`${author.github}/${site.repository}`)
		},
		contributors: async () => {
			return await fetchFilter.githubData(`${author.github}/${site.repository}/contributors`)
		},
	}
}
