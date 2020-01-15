var express = require('express');
var router = express.Router();

//Call Product Database Model
var ProductModel = require('../schema/product_table');

router.get('/addproduct', function (req, res, next) {
    res.render('product/product-add');
});

//Add Form Processing using Post Method 
router.post('/addproduct', function (req, res, next) {
    console.log(req.body);
    //Create an Array 
    const mybodydata = {
        product_name: req.body.product_name,
        product_label: req.body.product_label
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
        if (err) {
            console.log("Error in Fetch Data " + err);
        } else {
            //Print Data in Console
            console.log(db_product_array);
            //Render Product Array in HTML Table
            res.render('product/product-list', { product_array: db_product_array });
        }
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
        if (err) {
            console.log("Error in Single Record Fetch" + err);
        } else {
            console.log(db_product_array);
            res.render('product/product-view', { product: db_product_array });
        }
    });
});

//Get Product User for Edit Record
router.get('/edit/:id', function (req, res) {
    ProductModel.findById(req.params.id, function (err, db_product_array) {
        if (err) {
            console.log("Edit Fetch Error " + err);
        } else {
            console.log(db_product_array);
            res.render('product/product-edit', { product: db_product_array });
        }
    });
});

//Update Product Using Post Method
router.post('/edit/:id', function (req, res) {
    const mybodydata = {
        product_name: req.body.product_name,
        product_label: req.body.product_label
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