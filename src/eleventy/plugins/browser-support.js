import { AssetCache } from "@11ty/eleventy-fetch";
import caniuse from "caniuse-api";
import minifier from "html-minifier";
import { createRequire } from "node:module";
import browsersByType from "../../eleventy/data/browsersByType.js";
import browserFeatures from "../data/browserFeatures.js";
import { nowISO } from "../data/global.js";
import { cacheDurations } from "../data/site.js";
import { formattedDate, friendlyDate } from "../filters/dates.js";
const require = createRequire(import.meta.url);
const mdnBrowserData = require("../../../node_modules/@mdn/browser-compat-data/data.json");
// import mdnBrowserData from "@mdn/browser-compat-data" assert { type: "json" }

const pkg = require("../../../package.json");

const getCaniuseSupport = async (feature) => {
	let asset = new AssetCache(`caniuse_${feature}`, ".cache");

	if (asset.isCacheValid(cacheDurations.daily)) {
		return await asset.getCachedValue();
	}

	const caniuseSupport = caniuse.getSupport(feature, true);
	await asset.save(caniuseSupport, "json");
	return caniuseSupport;
};

const getBrowserslistSupport = async (feature) => {
	const featureData = browserFeatures.filter(
		(browserFeature) => feature === browserFeature.id,
	)[0];
	const featureSet = mdnBrowserData[featureData.language][featureData.type];
	const browserslistData = featureData["key"]
		.split(".")
		.reduce((object, key) => {
			return object[key];
		}, featureSet);
	return browserslistData["__compat"]["support"];
};

export default function (eleventyConfig) {
	eleventyConfig.addNunjucksAsyncShortcode(
		"browserSupport",
		async (featureID) => {
			const caniuseSupport = await getCaniuseSupport(featureID)
				.then((caniuseSupport) => caniuseSupport)
				.catch(() => {
					// console.error("No CanIUse Support", error)
					return false;
				});

			if (caniuseSupport) {
				// We'll rewrite these as we go
				let fullSupport = true;
				let zeroSupport = true;

				const browserList = ["Desktop", "Mobile"].reduce(
					(output, type) => {
						return (output += `
					<p class="strong">${type} support:</p>
					<ul class=" [ browser-support ] ">
						${browsersByType.reduce((output, browser) => {
							if (browser.type === type) {
								const support = caniuseSupport[browser.id];
								const featureClass = support.y
									? "supported"
									: support.a
										? "partial"
										: "unsupported";
								const featureText = support.y
									? support.y
									: support.a
										? support.a
										: "No";
								fullSupport = !fullSupport
									? false
									: support.y
										? true
										: false;
								zeroSupport = !zeroSupport
									? false
									: support.y || support.a
										? false
										: true;
								return (
									output +
									`<li class=" [ ${featureClass} ] ">${browser.name}: ${featureText}</li>`
								);
							}
							return output;
						}, "")}
					</ul>
				`);
					},
					"",
				);

				return minifier.minify(
					`<div class=" [ support ] [ box ${fullSupport ? " box--success " : zeroSupport ? " box--error " : " box--warning "}] ">
					<div class=" [ support__data ] [ flow ] ">
						${browserList}
					</div>
					<div class=" [ support__meta ] ">
						<p class=" [ monospace  strong ] " style="font-size: var(--font-size-gamma-min);">${featureID}</p>
						<p class="small">Browser support data for <code>${featureID}</code> comes from <a href="https://caniuse.com/#feat=${featureID}" rel="external nofollow">caniuse.com</a> and is up-to-date as of <time datetime="${formattedDate(nowISO)}">${friendlyDate(nowISO)}</time>.</p>
					</div>
				</div>`,
					{ collapseWhitespace: true },
				);
			} else {
				const browserslistSupport = await getBrowserslistSupport(
					featureID,
				)
					.then((browserslistSupport) => browserslistSupport)
					.catch(() => {
						// console.error("No Browserslist Support", error)
						return false;
					});

				if (browserslistSupport) {
					// We'll rewrite these as we go
					let fullSupport = true;
					let zeroSupport = true;

					const browserList = ["Desktop", "Mobile"].reduce(
						(output, type) => {
							return (output += `
						<p class="strong">${type} support:</p>
						<ul class=" [ browser-support ] ">
							${browsersByType.reduce((output, browser) => {
								if (browser.type === type) {
									const support = Array.isArray(
										browserslistSupport[browser.key],
									)
										? browserslistSupport[browser.key][0]
										: browserslistSupport[browser.key];
									const featureClass =
										(support.version_added &&
											support.flags) ||
										(support?.version_added + "").match(
											/preview/,
										)
											? "partial"
											: support.version_added
												? "supported"
												: "unsupported";
									const featureText = support.version_added
										? support.version_added
												.replace("≤", "")
												.replace("preview", "Preview")
										: "No";
									fullSupport = !fullSupport
										? false
										: support.version_added
											? true
											: false;
									zeroSupport = !zeroSupport
										? false
										: support.version_added
											? false
											: true;
									return (
										output +
										`<li class=" [ ${featureClass} ] ">${browser.name}: ${featureText}</li>`
									);
								}
								return output;
							}, "")}
						</ul>
					`);
						},
						"",
					);

					return minifier.minify(
						`<div class=" [ support ] [ box ${fullSupport ? " box--success " : zeroSupport ? " box--error " : " box--warning "}] ">
						<div class=" [ support__data ] [ flow ] ">
							${browserList}
						</div>
						<div class=" [ support__meta ] ">
							<p class=" [ monospace  strong ] " style="font-size: var(--font-size-gamma-min);">${featureID}</p>
							<p class="small">Browser support data for <code>${featureID}</code> comes from <a href="https://github.com/mdn/browser-compat-data">MDN’s <code>browser-compat-data</code></a> and is up-to-date as of <a href="https://www.npmjs.com/package/@mdn/browser-compat-data" rel="external nofollow">version ${pkg.dependencies["@mdn/browser-compat-data"].replace("^", "")}</a>.</p>
						</div>
					</div>`,
						{ collapseWhitespace: true },
					);
				}
			}

			return `<div class=" [ box ] [ flow ] "><p class="italic">Because this is still an experimental feature, data is currently unavailable.</p></div>`;
		},
	);

	eleventyConfig.addNunjucksAsyncShortcode(
		"browserSupportRow",
		async (feature) => {
			const caniuseSupport = await getCaniuseSupport(feature.id)
				.then((caniuseSupport) => caniuseSupport)
				.catch(() => {
					// console.error("No CanIUse Support", error)
					return false;
				});

			if (caniuseSupport) {
				// We'll rewrite these as we go
				let fullSupport = true;
				let zeroSupport = true;

				const browserList = browsersByType.reduce((output, browser) => {
					const support = caniuseSupport[browser.id];
					const featureClass = support.y
						? "supported"
						: support.a
							? "partial"
							: "unsupported";
					const featureText = support.y
						? support.y
						: support.a
							? support.a
							: "No";
					fullSupport = !fullSupport
						? false
						: support.y
							? true
							: false;
					zeroSupport = !zeroSupport
						? false
						: support.y || support.a
							? false
							: true;
					return (
						output +
						`<td class=" [ center ] [ ${featureClass} ] ">${featureText}</td>`
					);
				}, "");

				return minifier.minify(
					`<tr>
					<th><a href="#${feature.id}">${feature.title}</a></th>
					${browserList}
				</tr>`,
					{ collapseWhitespace: true },
				);
			} else {
				const browserslistSupport = await getBrowserslistSupport(
					feature.id,
				)
					.then((browserslistSupport) => browserslistSupport)
					.catch(() => {
						// console.error("No Browserslist Support", error)
						return false;
					});

				if (browserslistSupport) {
					// We'll rewrite these as we go
					let fullSupport = true;
					let zeroSupport = true;

					const browserList = browsersByType.reduce(
						(output, browser) => {
							const support = Array.isArray(
								browserslistSupport[browser.key],
							)
								? browserslistSupport[browser.key][0]
								: browserslistSupport[browser.key];
							const featureClass =
								(support.version_added && support.flags) ||
								(support?.version_added + "").match(/preview/)
									? "partial"
									: support.version_added
										? "supported"
										: "unsupported";
							const featureText = support.version_added
								? support.version_added
										.replace("≤", "")
										.replace(
											"preview",
											`<abbr title="Preview" style="color: inherit">P</abbr>`,
										)
								: "No";
							fullSupport = !fullSupport
								? false
								: support.version_added
									? true
									: false;
							zeroSupport = !zeroSupport
								? false
								: support.version_added
									? false
									: true;
							return (
								output +
								`<td class=" [ center ] [ ${featureClass} ] ">${featureText}</td>`
							);
						},
						"",
					);

					return minifier.minify(
						`<tr>
						<th><a href="#${feature.id}">${feature.title}</a></th>
						${browserList}
					</tr>`,
						{ collapseWhitespace: true },
					);
				}
			}

			return "";
		},
	);
}
