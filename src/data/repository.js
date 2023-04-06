const { github } = require("#data/author")
const { repository } = require("#data/site")

const { githubData } = require("#filters/fetch")

const getGithubData = async (repository) => {
	const github = await githubData(repository)
	return github
}

module.exports = async () => {
	const information = await getGithubData(`${github}/${repository}`)
		.then((information) => information)
		.catch(() => {
			return {}
		})

	const contributors = await getGithubData(`${github}/${repository}/contributors`)
		.then((contributors) => contributors)
		.catch(() => {
			return {}
		})

	return {
		information: information,
		contributors: contributors,
	}
}
