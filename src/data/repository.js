const fetchFilter = require("#filters/fetch")

const author = require("#data/author")
const site = require("#data/site")

const getGithubData = async (repository) => {
	const github = await fetchFilter.githubData(repository)
	return github
}

module.exports = async () => {
	const information = await getGithubData(`${author.github}/${site.repository}`)
		.then((information) => information)
		.catch(() => { return {} })

	const contributors = await getGithubData(`${author.github}/${site.repository}/contributors`)
		.then((contributors) => contributors)
		.catch(() => { return {} })

	return {
		information: information,
		contributors: contributors
	}
}
