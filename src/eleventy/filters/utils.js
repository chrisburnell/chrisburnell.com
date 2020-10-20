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
    }
};
