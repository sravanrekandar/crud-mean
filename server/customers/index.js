var _ = require('lodash-node');
var customers = require('../data/customers.json');
var products = require('../products/index.js');

var generateNewId = function () {
    var id,
        limit = customers.length;
    id = 'prod' + limit;
    while (_.find(customers, {id: id})) {
        id = 'prod' + (++limit);
    }
    return id;
};

/* This method updates the product list in the customer*/
var syncProducts = function(cust){
	var i, proId, product, index, removedProds = [];
	if(cust.products && cust.products.length === 0) {
		return;
	}
	for(i = 0; i < cust.products.length; i++) {
		proId = cust.products[i].id;
		product = products.getProduct(proId);
		if(product) {
			cust.products[i] = products.getProduct(proId);
		} else {
			// remove the prod if the product does not exits
			removedProds.push(cust.products[i]);
		}
	}
	
	for(i = 0; i < removedProds.length; i++) {
		index = cust.products.indexOf(removedProds[i]);
		cust.products.splice(index, 1);
	}
};

exports.get = function (req, res) {
    var id = req.param('id'),
        customer;
    if (id === undefined) {
		for(i = 0; i < customers.length; i++){
			syncProducts(customers[i]);
		}
        res.send(customers);
    } else {
        customer = _.find(customers, {id: id});
		syncProducts(customer);
        res.json(customer);
    }
};

exports.update = function (req, res) {
    var id = req.param('id'),
        customer = _.find(customers, {id: id});

    _.extend(customer, req.body);
	syncProducts(customer);
    res.json({
		success: 'OK',
        message: 'Updated a customer',
		data: customer
    });
};

exports.create = function (req, res) {
    var newId = generateNewId(),
        newcustomer = _.extend({}, req.body, {id: newId});

    customers.push(newcustomer)
    res.json({
		success: 'OK',
        message: 'A new customer is created',
		data: newcustomer
    });
};

exports.delete = function (req, res) {
    var id = req.param('id');
    _.pull(customers, _.find(customers, {id: id}));
    res.json({
		success: 'OK',
        message: 'A customer is deleted'
    });
};

exports.filter = function (req, res) {
    var filter = req.query;
    var results = _.filter(customers, function (item) {
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