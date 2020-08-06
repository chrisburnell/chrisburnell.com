module.exports = function numberStringFormat(number) {
    let strings = ["zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine"];
    if (number < strings.length) {
        return strings[number];
    }
    return number;
};
