const addDefaultScheme = (input) => {
	if (input.match(/^(?!https?:).+\..+/)) {
		return `https://${input.replace(/\/$/, "")}`;
	}
	return input.replace(/\/$/, "");
};

const setConfigWM = (outputElement, domainInput, type) => {
	if (!/\S+\.\S+/.test(domainInput)) {
		return;
	}

	const importStatement =
		type === "ESM"
			? `<span class="token keyword">import</span> <span class="token punctuation">{</span> defaults <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">"@chrisburnell/eleventy-cache-webmentions"</span>`
			: `<span class="token keyword">const</span> <span class="token punctuation">{</span> defaults <span class="token punctuation">}</span> <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">"@chrisburnell/eleventy-cache-webmentions"</span><span class="token punctuation">)</span>`;

	const exportStatement =
		type === "ESM"
			? `<span class="token keyword">export</span> <span class="token keyword">default</span>`
			: `module<span class="token punctuation">.</span>exports <span class="token operator">=</span>`;

	const domain = addDefaultScheme(domainInput);

	const hostname = new URL(domain).hostname;

	outputElement.innerHTML = `${importStatement}\n\n${exportStatement} Object<span class="token punctuation">.</span><span class="token function">assign</span><span class="token punctuation">(</span><span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">,</span> defaults<span class="token punctuation">,</span> <span class="token punctuation">{</span>\n\t<span class="token literal-property property">domain</span><span class="token operator">:</span> <span class="token string">"${domain}"</span><span class="token punctuation">,</span>\n\t<span class="token literal-property property">feed</span><span class="token operator">:</span> <span class="token string">"https://webmention.io/api/mentions.jf2?domain=${hostname}&amp;token=\${process.env.WEBMENTION_IO_TOKEN}"</span><span class="token punctuation">,</span>\n\t<span class="token literal-property property">key</span><span class="token operator">:</span> <span class="token string">"children"</span><span class="token punctuation">,</span>\n<span class="token punctuation">}</span><span class="token punctuation">)</span>`;
};

const setConfigGJ = (outputElement, domainInput, serverInput, type) => {
	if (!/\S+\.\S+/.test(domainInput) || !/\S+\.\S+/.test(serverInput)) {
		return;
	}

	const importStatement =
		type === "ESM"
			? `<span class="token keyword">import</span> pluginWebmentions <span class="token keyword">from</span><span class="token string">"@chrisburnell/eleventy-cache-webmentions"</span><span class="token punctuation">;</span>`
			: `<span class="token keyword">const</span> pluginWebmentions <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">"@chrisburnell/eleventy-cache-webmentions"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>`;

	const exportStatement =
		type === "ESM"
			? `<span class="token keyword">export</span> <span class="token keyword">default</span>`
			: `module<span class="token punctuation">.</span>exports <span class="token operator">=</span>`;

	const domain = addDefaultScheme(domainInput);
	const server = addDefaultScheme(serverInput);

	const hostname = new URL(domain).hostname;

	outputElement.innerHTML = `${importStatement}\n\n${exportStatement} <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">eleventyConfig</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	eleventyConfig<span class="token punctuation">.</span><span class="token function">addPlugin</span><span class="token punctuation">(</span>pluginWebmentions<span class="token punctuation">,</span> <span class="token punctuation">{</span>
		<span class="token literal-property property">domain</span><span class="token operator">:</span> <span class="token string">"${domain}"</span><span class="token punctuation">,</span>
		<span class="token literal-property property">feed</span><span class="token operator">:</span> <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">${server}/webmention/${hostname}/</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>process<span class="token punctuation">.</span>env<span class="token punctuation">.</span><span class="token constant">GO_JAMMING_TOKEN</span><span class="token interpolation-punctuation punctuation">}</span></span><span class="token template-punctuation string">\`</span></span><span class="token punctuation">,</span>
		<span class="token literal-property property">key</span><span class="token operator">:</span> <span class="token string">"json"</span><span class="token punctuation">,</span>
	<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>`;
};

const configForms = document.querySelectorAll("[id*='config-form']");

configForms.forEach((configForm) => {
	const type = configForm.id.split("-")[0];
	const inputDomain = configForm.querySelector("#domain");
	const inputServer = configForm.querySelector("#server");
	const outputCommonJS = document.querySelector(
		`#${type}-config-commonjs-output`,
	);
	const outputESM = document.querySelector(`#${type}-config-esm-output`);

	configForm.addEventListener("submit", (event) => {
		event.preventDefault();

		if (type === "webmentionio") {
			setConfigWM(outputCommonJS, inputDomain.value, "CommonJS");
			setConfigWM(outputESM, inputDomain.value, "ESM");
		} else {
			setConfigGJ(
				outputCommonJS,
				inputDomain.value,
				serverDomain.value,
				"CommonJS",
			);
			setConfigGJ(
				outputESM,
				inputDomain.value,
				serverDomain.value,
				"ESM",
			);
		}
	});

	inputDomain.addEventListener("change", () => {
		if (type === "webmentionio") {
			setConfigWM(outputCommonJS, inputDomain.value, "CommonJS");
			setConfigWM(outputESM, inputDomain.value, "ESM");
		} else {
			setConfigGJ(
				outputCommonJS,
				inputDomain.value,
				inputServer.value,
				"CommonJS",
			);
			setConfigGJ(outputESM, inputDomain.value, inputServer.value, "ESM");
		}
	});

	if (type === "gojamming") {
		inputServer.addEventListener("change", () => {
			setConfigGJ(
				outputCommonJS,
				inputDomain.value,
				inputServer.value,
				"CommonJS",
			);
			setConfigGJ(outputESM, inputDomain.value, inputServer.value, "ESM");
		});
	}
});
