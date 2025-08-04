import js from "@eslint/js";
import jsdoc from "eslint-plugin-jsdoc";
import globals from "globals";

export default [
	js.configs.recommended,
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
			"jsdoc/require-returns": "warn",
		},
	},
];
