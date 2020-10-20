const markdownIt = require('markdown-it')({
    html: true,
    breaks: true,
    linkify: true
});
const capitalizers = require("../../data/capitalizers.json");

const truncate = (() => {
    const truncate = (at, str = "", count = 1, end = "…") =>
        (at === "" ? str.substring(0, count) : str.split(at).splice(0, count).join(at)) + (str.split(at).length > count ? end : '');
    return Object.freeze({
        sentences: (...args) => truncate(".", ...args),
        words: (...args) => truncate(" ", ...args),
        characters: (...args) => truncate("", ...args)
    });
})();

module.exports = {
    capitalize: (string) => {
        for (let capitalizer of capitalizers) {
            let regex = new RegExp(capitalizer, 'gi');
            string = string.replace(regex, capitalizer);
        }

        return string;
    },
    markdown: (value) => {
        return markdownIt.render(value);
    },
    numberString: (number) => {
        let strings = ["zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine"];
        if (number < strings.length) {
            return strings[number];
        }
        return number;
    },
    maxSentences: (string, count, condition = true) => {
        return (condition ? truncate.sentences(string, count) : string);
    },
    maxWords: (string, count, condition = true) => {
        return (condition ? truncate.words(string, count) : string);
    },
    maxChars: (string, count, condition = true) => {
        return (condition ? truncate.characters(string, count) : string);
    }
};
