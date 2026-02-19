const Product = require('../models/product')


exports.getAddProduct = (req, res) => {
    res.render('admin/add-product', {
        path: "/admin/add-product",
        pageTitle: "Add product"
    });
};

exports.postAddProduct = (req, res) => {
    const title = req.body.title;
    const price = req.body.price;
    const description = req.body.description;
    const imageURL = req.body.imageURL


    const product = new Product({
        title: title,
        price: price,
        description: description,
        imageURL: imageURL
    })

    product.save()
        .then(result => {
            console.log("created product");
            res.redirect("/");
        })
        .catch(err => console.log(err));
}

exports.getProducts = (req, res) => {
    Product.find()
        .then(products => {
            res.render('admin/products', {
                products: products,
                path: "/admin/products",
                pageTitle: "Admin Products"
            });
        })
        .catch(err => console.log(err));
}

exports.getEditProduct = (req, res) => {
    const editMode = req.query.edit;
    if (!editMode) {
        return res.redirect("/");
    }
    const prodId = req.params.productId;
    Product.findById(prodId)
        .then(product => {
            if (!product) {
                return res.redirect("/");
            }
            res.render('admin/add-product', {
                product: product,
                path: "/admin/edit-product",
                pageTitle: "Edit Product",
                editing: editMode
            });
        })
        .catch(err => console.log(err));
}