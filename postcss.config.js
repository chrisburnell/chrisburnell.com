import autoprefixer from "autoprefixer";
import cssnano from "cssnano";
import atImport from "postcss-import";
import utopia from "postcss-utopia";
import utopiaClampToContainer from "./src/js/postcss/postcss-utopia-cqi.js";
import fixPseudoElements from "./src/js/postcss/postcss-fix-pseudo-elements.js";
import normalizeWhitespace from "./src/js/postcss/postcss-normalize-whitespace.js";

export default {
	plugins: [
		atImport,
		utopiaClampToContainer,
		utopia({
			minWidth: 500,
			maxWidth: 1200,
		}),
		normalizeWhitespace,
		autoprefixer,
		cssnano({
			preset: [
				"default",
				{
					calc: false,
					reduceInitial: false,
				},
			],
		}),
		fixPseudoElements,
	],
};
