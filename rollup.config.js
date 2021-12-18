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
		input: "src/js/main-dev.js",
		output: {
			dir: "js",
			format: "iife",
			name: "mainDev",
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
		plugins: process.env.ELEVENTY_PRODUCTION ? [commonjs(), nodeResolve(), terser()] : [commonjs(), nodeResolve()],
	},
	{
		input: "src/js/speedlify-score.js",
		output: {
			dir: "js",
		},
	},
]
