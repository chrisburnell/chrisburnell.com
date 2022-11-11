require("dotenv").config()
const commonjs = require("@rollup/plugin-commonjs")
const { nodeResolve } = require("@rollup/plugin-node-resolve")
const { terser } = require("rollup-plugin-terser")

module.exports = [
	{
		input: "src/js/main.js",
		output: {
			dir: "js",
			format: "module",
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
	}
]
