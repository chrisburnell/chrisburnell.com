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
		.catch((error) => {
			console.error("GitHub Repository Information Error", error)
			return {}
		})

	const contributors = await getGithubData(`${github}/${repository}/contributors`)
		.then((contributors) => contributors)
		.catch((error) => {
			console.error("GitHub Contributors Error", error)
			return {}
		})

	return {
		information: information,
		contributors: contributors,
	}
}
