Object.prototype.extend = Object.prototype.extend || function(obj) {
    for(i in obj)
        this[i] = obj[i];
};