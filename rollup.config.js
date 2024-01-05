require("dotenv").config()
const commonjs = require("@rollup/plugin-commonjs")
const { nodeResolve } = require("@rollup/plugin-node-resolve")
const { terser } = require("rollup-plugin-terser")

module.exports = [
	{
		input: "src/js/critical.js",
		output: {
			dir: "js",
			format: "module",
			name: "critical",
		},
		plugins: process.env.ELEVENTY_PRODUCTION ? [commonjs(), nodeResolve(), terser()] : [commonjs(), nodeResolve()],
	},
	{
		input: "src/js/defer.js",
		output: {
			dir: "js",
			format: "module",
			name: "defer",
		},
		plugins: process.env.ELEVENTY_PRODUCTION ? [commonjs(), nodeResolve(), terser()] : [commonjs(), nodeResolve()],
	},
]
