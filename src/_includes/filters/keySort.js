module.exports = function keySort(array, key) {
    return array.sort((a, b) => {
        return a[key].localeCompare(b[key]);
    });
};
