import Image from "@11ty/eleventy-img";
import dotenv from "dotenv";
import { getMastodonHandle } from "../../functions/utils.js";
import { cacheDurations, url as siteURL } from "../data/site.js";
import { getHost } from "../filters/urls.js";
dotenv.config();

// Avatar Dimensions
const size = 96; // 48 * 2

const getImageOptions = (name) => {
	return {
		widths: [size],
		formats:
			process.env.ELEVENTY_RUN_MODE === "build"
				? ["avif", "webp", "jpeg"]
				: ["webp", "jpeg"],
		urlPath: "/images/avatars/",
		outputDir: "./_site/images/avatars/",
		duration: cacheDurations.monthly,
		sharpOptions: {
			quality: 100,
		},
		filenameFormat: (id, src, width, format, options) => {
			return `${String(name).toLowerCase()}.${format}`;
		},
	};
};

const fetchImageData = (options, src) => {
	if (!src) {
		throw new Error("src property required in `image` shortcode.");
	}

	Image(src, getImageOptions(options)).then(() => {
		// return nothing, even though this returns a promise
	});
};

const storeAvatar = async (id, classes = "") => {
	// We know where the images will be
	const fakeUrl = `/images/avatars/${id}.jpeg`;
	const metadata = Image.statsByDimensionsSync(
		fakeUrl,
		size,
		size,
		getImageOptions(id),
	);
	const markup = Image.generateHTML(
		metadata,
		{
			alt: `${id}’s avatar`,
			title: `${id}’s avatar`,
			class:
				" [ avatar ] [ u-author ] " +
				(classes ? `[ ${classes} ] ` : ""),
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
	let mastodonHandles, domains;

	eleventyConfig.on("beforeBuild", () => {
		mastodonHandles = new Set();
		domains = new Set();
	});

	if (process.env.ELEVENTY_RUN_MODE === "build") {
		eleventyConfig.on("afterBuild", () => {
			let array;

			array = Array.from(mastodonHandles);
			console.log(
				`[${getHost(siteURL)}] Generating ${array.length} Mastodon avatars.`,
			);
			for (let mastodonHandle of array) {
				fetchImageData(mastodonHandle.handle, mastodonHandle.photo);
			}

			array = Array.from(domains);
			console.log(
				`[${getHost(siteURL)}] Generating ${array.length} domain avatars.`,
			);
			for (let domain of array) {
				fetchImageData(domain.url, domain.photo);
			}
		});
	}

	eleventyConfig.addNunjucksAsyncShortcode(
		"avatar",
		async (photo, url, authorUrl, classes = "") => {
			if (
				authorUrl?.includes("chrisburnell.com") ||
				authorUrl?.includes("repc.co/@chrisburnell") ||
				authorUrl?.includes("twitter.com/iamchrisburnell")
			) {
				return `<picture><source srcset="/images/avatar.avif 1x, /images/avatar@2x.avif 2x, /images/avatar@3x.avif 3x, /images/avatar@4x.avif 4x" type="image/avif"><source srcset="/images/avatar.webp 1x, /images/avatar@2x.webp 2x, /images/avatar@3x.webp 3x, /images/avatar@4x.webp 4x" type="image/webp"><img src="/images/avatar.jpeg" srcset="/images/avatar.jpeg 1x, /images/avatar@2x.jpeg 2x, /images/avatar@3x.jpeg 3x, /images/avatar@4x.jpeg 4x" alt="Chris Burnell" class="[ avatar ] [ canada ]" width="48" height="48"></picture>`;
			}
			const mastodonHandle = authorUrl
				? getMastodonHandle(authorUrl)
				: null;
			if (photo && mastodonHandle && mastodonHandle != authorUrl) {
				mastodonHandles.add({
					handle: mastodonHandle,
					photo: photo.toLowerCase(),
				});
				return storeAvatar(mastodonHandle, classes);
			} else if (photo && !url.includes("https://twitter.com")) {
				let domain = getHost(authorUrl || url);
				domains.add({
					url: domain,
					photo: photo.toLowerCase(),
				});
				return storeAvatar(domain, classes);
			}

			return `<picture><source type="image/avif" srcset="/images/default-profile.avif 48w"><source type="image/webp" srcset="/images/default-profile.webp 48w"><img src="/images/default-profile.jpeg" alt="default/anonymous avatar" class="[ avatar ]" loading="lazy" decoding="async" width="48" height="48"></picture>`;
		},
	);
}
