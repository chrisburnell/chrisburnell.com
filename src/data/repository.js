const author = require("#data/author")
const site = require("#data/site")

const { githubData } = require("#filters/fetch")

const getGithubData = async (repository) => {
	const github = await githubData(repository)
	return github
}

module.exports = async () => {
	const information = await getGithubData(`${author.github}/${site.repository}`)
		.then((information) => information)
		.catch(() => {
			return {}
		})

	const contributors = await getGithubData(`${author.github}/${site.repository}/contributors`)
		.then((contributors) => contributors)
		.catch(() => {
			return {}
		})

	return {
		information: information,
		contributors: contributors,
	}
}
