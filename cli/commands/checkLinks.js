import { CheckHtmlLinksCli } from "check-html-links";

/**
 * Check for broken links/references
 */
export default async (directory = "_site") => {
	const siteLinksCheck = new CheckHtmlLinksCli();
	siteLinksCheck.setOptions({
		rootDir: directory,
	});
	await siteLinksCheck.run();
};
