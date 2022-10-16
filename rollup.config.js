require("dotenv").config()
const commonjs = require("@rollup/plugin-commonjs")
const { nodeResolve } = require("@rollup/plugin-node-resolve")
const { terser } = require("rollup-plugin-terser")

module.exports = [
	{
		input: "src/js/main.js",
		output: {
			dir: "js",
			format: "iife",
			name: "main",
		},
		plugins: process.env.ELEVENTY_PRODUCTION ? [commonjs(), nodeResolve(), terser()] : [commonjs(), nodeResolve()],
	},
	{
		input: "src/js/navigator.js",
		output: {
			dir: "js",
			name: "navigator",
		},
	},
	{
		input: "src/js/modules/librarian.js",
		output: {
			dir: "js",
			name: "librarian",
		},
	},
	{
		input: "src/js/modules/url-input.js",
		output: {
			dir: "js",
			name: "url-input",
		},
	},
	{
		input: "node_modules/speedlify-score/speedlify-score.js",
		output: {
			dir: "js",
			name: "speedlify-score",
		},
	},
	{
		input: "node_modules/@chrisburnell/spark-line/spark-line.js",
		output: {
			dir: "js",
			name: "spark-line",
		},
	},
	{
		input: "node_modules/@zachleat/details-utils/details-utils.js",
		output: {
			dir: "js",
		},
	},
	{
		input: "node_modules/@zachleat/seven-minute-tabs/seven-minute-tabs.js",
		output: {
			dir: "js",
		},
	},
]
