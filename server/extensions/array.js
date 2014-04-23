module.exports = function () {
    Array.prototype.findElements = Array.prototype.findElements || function (config) {
        var i,
            j,
            key,
            keys = [],
            isFound,
            el = null,
            results = [];

        for (key in config) {
            if (config.hasOwnProperty(key)) {
                keys.push(key);
            }
        }

        for (i = 0; i < this.length; i++) {
            isFound = true;
            for (j in keys) {
                key = keys[j];
                if (config && config.hasOwnProperty(key) && config[key] !== this[i][key]) {
                    isFound = false;
                    break;
                }
            }
            if (isFound) {
                results.push(this[i]);
            }
        }

        return results;
    };

    return Array;
};