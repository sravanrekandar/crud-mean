var _ = require('lodash-node');
var products = require('../data/products.json');
var generateNewId = function () {
    var id,
        limit = products.length;
    id = 'prod' + limit;
    while (_.find(products, {id: id})) {
        id = 'prod' + (++limit);
    }
    return id;
}

var getProduct = function(id) {
	var product;
	if (id === undefined) {
        return products;
    } else {
        product = _.find(products, {id: id});
        return product;
    }
};

exports.getProduct = getProduct;
// To handle requests from client
exports.get = function (req, res) {
    var id = req.param('id');
    res.send(getProduct(id));
};

exports.update = function (req, res) {
    var id = req.param('id'),
        product = _.find(products, {id: id});

    _.extend(product, req.body);

    var dataString = JSON.stringify(product);
    res.json({
        message: 'Edits the product with id ' + id + '. The existing object is..' + dataString
    });
};


exports.create = function (req, res) {
    var newId = generateNewId(),
        newProduct = _.extend({}, req.body, {id: newId});

    products.push(newProduct)
    res.json({
        message: 'Created a new product, id :  ' + newProduct.id
    });
};

exports.delete = function (req, res) {
    var id = req.param('id');
    _.pull(products, _.find(products, {id: id}));
    res.json({
        message: 'Deletes the product with id ' + id
    });
};

exports.filter = function (req, res) {
    var filter = req.query;
    var results = _.filter(products, function (item) {
        var key,
            str;
        for (key in filter) {
            if (filter.hasOwnProperty((key))) {
                if (typeof  filter[key] === 'string') {
                    str = filter[key].toUpperCase();
                    if (item[key].toUpperCase().indexOf(str) !== -1) {
                        return true;
                    }
                }
            }
        }
        return false;
    });
    res.json(results);
};