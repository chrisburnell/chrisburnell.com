const languageMap = {
	css: "CSS",
	html: "HTML",
	javascript: "JavaScript",
	typescript: "Typescript",
	json: "JSON",
	jsx: "JSX",
	liquid: "Liquid",
	markdown: "Markdown",
	nunjucks: "Nunjucks",
	twig: "Nunjucks",
	php: "PHP",
	scss: "SCSS",
	webc: "WebC",
	yaml: "YAML",
	plaintext: "Plaintext",
	text: "Plaintext",
};

const getParts = (language) => language.replace("diff-", "").split("-");

export default {
	preAttributes: {
		class: function ({ language }) {
			const parts = getParts(language);
			return `language-${language.replace(`-${parts[1]}`, "")}`;
		},
		"data-language": function ({ language }) {
			const parts = getParts(language);
			return (languageMap[parts[0]] ?? parts[0]).toLowerCase();
		},
		"data-language-friendly": function ({ language }) {
			const parts = getParts(language);
			return languageMap[parts[0]] ?? parts[0];
		},
		"data-filename": function ({ language }) {
			const parts = getParts(language);
			return parts.length > 1 ? parts.slice(1).join("-") : "";
		},
	},
	codeAttributes: {
		class: function ({ language }) {
			const parts = getParts(language);
			return `language-${language.replace(`-${parts[1]}`, "")}`;
		},
	},
};
