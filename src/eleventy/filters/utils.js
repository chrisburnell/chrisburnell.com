const Natural = require('natural');
const analyze = new Natural.SentimentAnalyzer("English", Natural.PorterStemmer, "afinn");

const site = require("../../data/site.json");

const allowedHTML = {
    allowedTags: ['b', 'i', 'em', 'strong', 'a'],
    allowedAttributes: {
        a: ['href']
    }
};

module.exports = {
    limit: (array, limit) => {
        return array.slice(0, limit);
    },
    keySort: (array, key) => {
        return array.sort((a, b) => {
            return a[key].localeCompare(b[key]);
        });
    },
    toArray: (value) => {
        if (Array.isArray(value)) {
            return value;
        }
        return [value];
    },
    absoluteURL: (url, base) => {
        if (!base) {
            base = site.url;
        }
        try {
            return (new URL(url, base)).toString();
        } catch(e) {
            console.log(`Trying to convert ${url} to be an absolute url with base ${base} and failed.`);
            return url;
        }
    },
    getSentimentValue: (content) => {
        if( content ) {
            const tokenizer = new Natural.WordTokenizer();
            return analyze.getSentiment(tokenizer.tokenize(content));
        }

        return 0;
    }
};
