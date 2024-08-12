const addDefaultScheme = (input) => {
	if (input.match(/^(?!https?:).+\..+/)) {
		return `https://${input.replace(/\/$/, "")}`;
	}
	return input.replace(/\/$/, "");
};

const setConfig = (outputElement, domainInput, type) => {
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

const configForm = document.querySelector("#config-form");
const inputDomain = document.querySelector("#domain");
const selectType = document.querySelector("#type");
const outputCommonJS = document.querySelector("#config-commonjs-output");
const outputESM = document.querySelector("#config-esm-output");

configForm.addEventListener("submit", (event) => {
	event.preventDefault();
	setConfig(outputCommonJS, inputDomain.value, "CommonJS");
	setConfig(outputESM, inputDomain.value, "ESM");
});
inputDomain.addEventListener("change", () => {
	setConfig(outputCommonJS, inputDomain.value, "CommonJS");
	setConfig(outputESM, inputDomain.value, "ESM");
});
selectType.addEventListener("change", () => {
	setConfig(outputCommonJS, inputDomain.value, "CommonJS");
	setConfig(outputESM, inputDomain.value, "ESM");
});
