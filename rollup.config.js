import commonjs from "@rollup/plugin-commonjs"
import { nodeResolve } from "@rollup/plugin-node-resolve"

export default [
	{
		input: "src/js/main.js",
		output: {
			dir: "js",
			format: "iife",
			name: "main",
		},
		plugins: [commonjs(), nodeResolve()],
	},
	{
		input: "src/js/simple.js",
		output: {
			dir: "js",
			format: "iife",
			name: "simple",
		},
		plugins: [commonjs()],
	},
	{
		input: "src/js/speedlify-score.js",
		output: {
			dir: "js",
		},
	},
]
