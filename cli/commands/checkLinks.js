import { CheckHtmlLinksCli } from "check-html-links";

/**
 * Check for broken links/references
 */
export default async (options) => {
	options = Object.assign({}, { directory: "_site", quiet: false }, options);

	const siteLinksCheck = new CheckHtmlLinksCli();
	siteLinksCheck.setOptions({
		rootDir: options.directory,
		continueOnError: false,
		quiet: options.quiet,
	});
	await siteLinksCheck.run();
};
