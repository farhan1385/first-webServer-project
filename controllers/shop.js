const product = require('../models/product');
const Product = require('../models/product');

exports.getIndex = (req, res) => {
    Product.find().then(products => {
        res.render("shop/index", {
            path: "/",
            pageTitle: "Shop",
            prods: products
        })
    })
}


exports.getProduct = (req, res) => {
    const prodId = req.params.productId;

    Product.findById(prodId).then(product => {
        res.render('shop/product-details', {
            product: product,
            pageTitle: product.title,
            path: "/products"
        })
    }).catch(err => (
        console.log(err)
    ));
}