var product = require('./../products/index');

module.exports = function (app) {
    // Data responses
    //Product
    app.get('/product/filter', product.filter);
    app.get('/product/:id', product.get);
    app.get('/product', product.get);
    app.post('/product/:id', product.update);
    app.post('/product', product.create);
    app.delete('/product/:id', product.delete);


    // File responses
    app.get('/bower_components/*', function (req, res) {
        res.sendfile(req.url.substr(1)); // removing the first character '/'
    });
};

