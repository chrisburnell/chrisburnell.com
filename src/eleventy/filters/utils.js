const Natural = require('natural')
const analyze = new Natural.SentimentAnalyzer("English", Natural.PorterStemmer, "afinn")

const allowedHTML = {
    allowedTags: ['b', 'i', 'em', 'strong', 'a'],
    allowedAttributes: {
        a: ['href']
    }
}

module.exports = {
    limit: (array, limit) => {
        return array.slice(0, limit)
    },
    arrayKeyEquals: (array, key, value) => {
        return array.filter(a => {
            return a[key] === value
        })
    },
    keyValue: (object, key) => {
        return object[key]
    },
    keySort: (array, key) => {
        return array.sort((a, b) => {
            return a[key].localeCompare(b[key])
        })
    },
    toArray: (value) => {
        if (Array.isArray(value)) {
            return value
        }
        return [value]
    },
    getSentimentValue: (content) => {
        if (content) {
            const tokenizer = new Natural.WordTokenizer()
            return analyze.getSentiment(tokenizer.tokenize(content))
        }
        return 0
    }
}
