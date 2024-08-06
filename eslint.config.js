import js from "@eslint/js";
import globals from "globals";

export default [
	js.configs.recommended,
	{
		files: ["src/**/*.js"],
		languageOptions: {
			ecmaVersion: 6,
			globals: {
				...globals.browser,
				...globals.node,
			},
		},
		rules: {
			"no-process-env": 0,
		},
	},
];
