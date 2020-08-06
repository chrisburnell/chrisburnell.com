module.exports = function titleSort(array) {
    return array.sort((a, b) => {
        return a.title.localeCompare(b.title);
    });
};
