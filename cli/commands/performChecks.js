import { checkInvalidDateTimes } from "@chrisburnell/check-invalid-datetimes"
import { CheckHtmlLinksCli } from "check-html-links"

export default async (directory = "_site") => {
	// Check for broken links/references
	const siteLinksCheck = new CheckHtmlLinksCli()
	siteLinksCheck.setOptions({
		rootDir: directory,
	})
	await siteLinksCheck.run()

	// eslint-disable-next-line no-undef
	console.log("\n")

	// Check for instances of "Invalid DateTime"
	const siteDateTimesCheck = new checkInvalidDateTimes()
	siteDateTimesCheck.setOptions({
		directory: directory,
	})
	await siteDateTimesCheck.run()
}
