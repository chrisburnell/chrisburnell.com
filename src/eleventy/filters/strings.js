const markdownIt = require('markdown-it')({
    html: true,
    breaks: true,
    linkify: true
})
const capitalizers = require("../../data/capitalizers.json")

const truncate = (() => {
    const truncate = (at, str = "", count = 1, end = "…") =>
        (at === "" ? str.substring(0, count) : str.split(at).splice(0, count).join(at)) + (str.split(at).length > count ? end : '')
    return Object.freeze({
        sentences: (...args) => truncate(".", ...args),
        words: (...args) => truncate(" ", ...args),
        characters: (...args) => truncate("", ...args)
    })
})()

module.exports = {
    capitalizeFormat: (input) => {
        return capitalizers.reduce((output, capitalizer) => {
            const regex = new RegExp(capitalizer, "gi")
            return output.replace(regex, capitalizer)
        }, input)
    },
    markdownFormat: (value) => {
        return markdownIt.render(value)
    },
    numberStringFormat: (number) => {
        let strings = ["zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine"]
        if (number < strings.length) {
            return strings[number]
        }
        return number
    },
    smartjoin: (array, joiner = ", ") => {
        const last = array.pop()
        return array.join(joiner) + (array.length > 1 ? "," : "") + " and " + last
    },
    maxSentences: (string, count, condition = true) => {
        return (condition ? truncate.sentences(string, count) : string)
    },
    maxWords: (string, count, condition = true) => {
        return (condition ? truncate.words(string, count) : string)
    },
    maxChars: (string, count, condition = true) => {
        return (condition ? truncate.characters(string, count) : string)
    }
}
