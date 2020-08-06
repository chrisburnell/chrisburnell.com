module.exports = function getCountByYear(items, year) {
    return items.filter(item => {
        return !item.data.draft;
    }).filter(item => {
        return item.data.page.date.getFullYear() === parseInt(year, 10);
    }).length;
};
