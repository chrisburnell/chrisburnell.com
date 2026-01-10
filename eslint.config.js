import js from "@eslint/js";
import jsdoc from "eslint-plugin-jsdoc";
import { defineConfig, globalIgnores } from "eslint/config";
import globals from "globals";

export default defineConfig([
	js.configs.recommended,
	globalIgnores([
		"**/*.min.js",
		"**/*.test.js",
		"src/eleventy/plugins/tmdbImage.js",
		"src/js/imports/speedlify-score.js",
	]),
	{
		files: ["src/**/*.js"],
		plugins: { jsdoc },
		languageOptions: {
			ecmaVersion: "latest",
			globals: {
				...globals.browser,
				...globals.node,
			},
		},
		rules: {
			"no-process-env": 0,
			"jsdoc/check-access": "warn",
			"jsdoc/check-alignment": "warn",
			"jsdoc/check-indentation": "warn",
			"jsdoc/check-param-names": "warn",
			"jsdoc/check-tag-names": "warn",
			"jsdoc/check-types": "warn",
			"jsdoc/implements-on-classes": "warn",
			"jsdoc/no-undefined-types": "warn",
			"jsdoc/require-jsdoc": [
				"warn",
				{
					require: {
						FunctionDeclaration: true,
						MethodDefinition: true,
						ClassDeclaration: true,
					},
				},
			],
			"jsdoc/require-param": "warn",
			"jsdoc/require-param-type": "warn",
			"jsdoc/require-returns": "warn",
			"jsdoc/require-returns-type": "warn",
		},
	},
]);
