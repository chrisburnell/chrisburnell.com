import EleventyFetch from "@11ty/eleventy-fetch";
import Image from "@11ty/eleventy-img";
import dotenv from "dotenv";
dotenv.config();

const getImageOptions = () => {
	return {
		width: [400],
		formats:
			process.env.ELEVENTY_RUN_MODE === "build"
				? ["avif", "webp", "jpeg"]
				: ["webp", "jpeg"],
		urlPath: "/images/covers/",
		outputDir: "./_site/images/covers",
		duration: "*",
		sharpOptions: {
			quality: 100,
		},
	};
};

const fetchImageData = (options, src) => {
	if (!src) {
		throw new Error("src property required in `tmdbImage` shortcode.");
	}

	Image(src, getImageOptions(options)).then(() => {
		// return nothing, even though this returns a promise
	});
};

const storePoster = async (id) => {
	// We know where the images will be
	const fakeUrl = `/images/covers/${id}.jpeg`;
	const metadata = Image.statsByDimensionsSync(
		fakeUrl,
		size,
		size,
		getImageOptions(),
	);
	const markup = Image.generateHTML(
		metadata,
		{
			alt: `TODO`,
			title: `TODO`,
			sizes: "100vw",
			loading: "lazy",
			decoding: "async",
		},
		{
			whitespaceMode: "inline",
		},
	);

	return markup;
};

export default function (eleventyConfig) {
	let posters;

	eleventyConfig.on("beforeBuild", () => {
		posters = new Set();
	});

	if (process.env.ELEVENTY_RUN_MODE === "build") {
		eleventyConfig.on("afterBuild", () => {
			let array = Array.from(posters);
			console.log(
				`[${getHost(siteURL)}] Generating ${array.length} movie/TV posters.`,
			);
			for (let poster of array) {
				fetchImageData(poster.url, poster.photo);
			}
		});
	}

	eleventyConfig.addNunjucksAsyncShortcode("tmdbImage", async (id) => {
		const dataURL = `https://api.themoviedb.org/3/tv/${id}?api_key=${process.env.TMDB_API_KEY}`;
		const dataJSON = await EleventyFetch(dataURL, {
			duration: "*",
			type: "json",
		});
	});
}
