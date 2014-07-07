var product = require('./../products/index');
var customer = require('./../customers/index');

module.exports = function (app) {
    // Data responses
    //Product
    app.get('/product/filter', product.filter);
    app.get('/product/:id', product.get);
    app.get('/product', product.get);
    app.post('/product/:id', product.update);
    app.post('/product', product.create);
    app.delete('/product/:id', product.delete);

    //customer
    app.get('/customer/filter', customer.filter);
    app.get('/customer/:id', customer.get);
    app.get('/customer', customer.get);
    app.post('/customer/:id', customer.update);
    app.post('/customer', customer.create);
    app.delete('/customer/:id', customer.delete);

    // File responses
    app.get('/bower_components/*', function (req, res) {
        res.sendfile(req.url.substr(1)); // removing the first character '/'
    });
};