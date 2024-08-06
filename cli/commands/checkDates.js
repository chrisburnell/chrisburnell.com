import { checkInvalidDateTimes } from "@chrisburnell/check-invalid-datetimes";

/**
 * Check for instances of "Invalid DateTime"
 */
export default async (directory = "_site") => {
	const siteDateTimesCheck = new checkInvalidDateTimes();
	siteDateTimesCheck.setOptions({
		directory: directory,
		continueOnError: false,
	});
	await siteDateTimesCheck.run();
};
