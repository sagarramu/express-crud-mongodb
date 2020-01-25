var express = require('express');
var router = express.Router();

//Call Product Database Model
var ProductModel = require('../schema/product_table');
var CategoryModel = require('../schema/category_table');

router.get('/addproduct', function (req, res, next) {

    CategoryModel.find(function (err, db_category_array) {
        if (err) {
            console.log("Error in Fetch Data " + err);
        } else {
            //Print Data in Console
            console.log(db_category_array);
            //Render User Array in HTML Table
            res.render('product/product-add', { category: db_category_array });

        }
    });
});

//Add Form Processing using Post Method 
router.post('/addproduct', function (req, res, next) {
    console.log(req.body);
    //Create an Array 
    const mybodydata = {
        product_name: req.body.product_name,
        product_label: req.body.product_label,
        _category: req.body.category,
    }
    var data = ProductModel(mybodydata);
    data.save(function (err) {
        if (err) {
            console.log("Error in Insert Record");
        } else {
            res.redirect('/product');
        }
    });
});

// product list page
router.get('/', function (req, res, next) {

    ProductModel.find(function (err, db_product_array) {

        console.log("Product Data " + db_product_array);
        if (err) res.json({ message: 'Error in Fetch Data.' });
        ProductModel.find({})
            .populate('_category')
            .exec(function (err, db_product_array) {
                //Print Data in Console
                console.log(" Next Last Task " + db_product_array);
                //Render Product Array in HTML Table
                res.render("product/product-list", { product_array: db_product_array });
            })
    });
});

//Delete Product By ID
router.get('/delete/:id', function (req, res) {
    ProductModel.findOneAndDelete(req.params.id, function (err, project) {
        if (err) {
            console.log("Error in Record Delete " + err);
            res.redirect('/product');
        } else {
            console.log(" Record Deleted ");
            res.redirect('/product');
        }
    });
});

//Get Single Product By ID
router.get('/view/:id', function (req, res) {
    console.log(req.params.id);
    ProductModel.findById(req.params.id, function (err, db_product_array) {
        console.log("Product Data " + db_product_array);
        if (err) res.json({ message: 'Error in Single Record Fetch.' });
        ProductModel.findById(req.params.id)
            .populate('_category')
            .exec(function (err, db_product_array) {
                //Print Data in Console
                console.log(" Next Last Task " + db_product_array);
                //Render Product Array in HTML Table
                res.render("product/product-view", { product: db_product_array });
            })
    });
});

//Get Product User for Edit Record
router.get('/edit/:id', function (req, res) {
    ProductModel.findById(req.params.id, function (err, db_product_array) {
        // console.log("Product Data " + db_product_array);
        if (err) res.json({ message: 'Error in Single Record Fetch.' });
        CategoryModel.find(function (err, db_category_array) {
            ProductModel.findById(req.params.id)
                .populate('_category')
                .exec(function (err, db_product_array) {
                    //Print Data in Console
                    // console.log(" Next Last Task " + db_product_array);
                    //Render Product Array in HTML Table
                    res.render("product/product-edit", { product: db_product_array, category: db_category_array });
                })
        });
    });
});

//Update Product Using Post Method
router.post('/edit/:id', function (req, res) {
    const mybodydata = {
        product_name: req.body.product_name,
        product_label: req.body.product_label,
        _category: req.body.category,
    }
    ProductModel.findByIdAndUpdate(req.params.id, mybodydata, function (err) {
        if (err) {
            res.redirect('/product');
        } else {
            res.redirect('/product');
        }
    });
});

module.exports = router;