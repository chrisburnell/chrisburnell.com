import { checkInvalidDateTimes } from "@chrisburnell/check-invalid-datetimes";

/**
 * Check for instances of "Invalid DateTime"
 */
export default async (options) => {
	options = Object.assign({}, { directory: "_site", quiet: false }, options);

	const siteDateTimesCheck = new checkInvalidDateTimes();
	siteDateTimesCheck.setOptions({
		directory: options.directory,
		continueOnError: false,
		quiet: options.quiet,
	});
	await siteDateTimesCheck.run();
};
