import { isMidwinterPeriod } from "./global.js";

export default [
	{
		id: isMidwinterPeriod ? "ravenous" : "",
		title: "Ravenous",
		selected: !isMidwinterPeriod,
	},
	{
		id: "sepia",
		title: "Sepia",
	},
	{
		id: "koala",
		title: "Koala",
	},
	{
		id: "red-alert",
		title: "Red Alert",
	},
	{
		id: "nineties",
		title: "90s",
	},
	{
		id: "matrix",
		title: "Rabbit Hole",
	},
	{
		id: "midwinter",
		title: "Midwinter",
		selected: isMidwinterPeriod,
	},
	{
		id: "custom",
		title: "Custom",
	},
];
