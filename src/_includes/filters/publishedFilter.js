module.exports = function publishedFilter(array) {
    return array.filter(item => {
        return !item.data.draft;
    });
};
