import { github } from "./author.js"
import { repository } from "./site.js"

import { githubData } from "../filters/fetch.js"

const getGithubData = async (repository) => {
	const data = await githubData(repository)
	return data
}

export default async function () {
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
