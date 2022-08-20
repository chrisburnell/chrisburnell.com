import commonjs from "@rollup/plugin-commonjs"
import { nodeResolve } from "@rollup/plugin-node-resolve"
import { terser } from "rollup-plugin-terser"

// Load .env variables with dotenv
require("dotenv").config()

export default [
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
		input: "src/js/simple.js",
		output: {
			dir: "js",
			format: "iife",
			name: "simple",
		},
		plugins: process.env.ELEVENTY_PRODUCTION ? [commonjs(), nodeResolve(), terser()] : [commonjs(), nodeResolve()],
	},
	{
		input: "src/js/common/navigator.js",
		output: {
			dir: "js",
			format: "iife",
			name: "navigator",
		},
	},
	{
		input: "src/js/modules/librarian.js",
		output: {
			dir: "js",
		},
	},
	{
		input: "src/js/modules/url-input.js",
		output: {
			dir: "js",
		},
	},
	{
		input: "src/js/vendor/speedlify-score.js",
		output: {
			dir: "js",
		},
	},
	{
		input: "src/js/vendor/indieconfig.js",
		output: {
			dir: "js",
		},
	},
	{
		input: "src/js/vendor/webaction.js",
		output: {
			dir: "js",
		},
	},
	{
		input: "node_modules/@chrisburnell/spark-line/spark-line.js",
		output: {
			dir: "js",
		},
	},
	{
		input: "node_modules/@zachleat/details-utils/details-utils.js",
		output: {
			dir: "js",
		},
	},
]
