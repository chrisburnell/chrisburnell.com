module.exports = function keyFilter(array, key, values) {
    return array.filter(item => {
        if ("key" in item) {
            if (typeof values === "string" && item[key] == values) {
                return true;
            }
            else {
                for (let value of values) {
                    if (item[key] == value) {
                        return true;
                    }
                }
            }
        }
        return false;
    });
};
