var express = require('express');
var router = express.Router();

//Call category Database Model
var CategoryModel = require('../schema/category_table');

router.get('/addcategory', function (req, res, next) {
    res.render('category/category-add');
});

//Add Form Processing using Post Method 
router.post('/addcategory', function (req, res, next) {
    console.log(req.body);
    //Create an Array 
    const mybodydata = {
        category_name: req.body.category_name,
        category_label: req.body.category_label
    }
    var data = CategoryModel(mybodydata);
    data.save(function (err) {
        if (err) {
            console.log("Error in Insert Record");
        } else {
            res.redirect('/category');
        }
    });
});

// category list page
router.get('/', function (req, res, next) {
    CategoryModel.find(function (err, db_category_array) {
        if (err) {
            console.log("Error in Fetch Data " + err);
        } else {
            //Print Data in Console
            console.log(db_category_array);
            //Render category Array in HTML Table
            res.render('category/category-list', { category_array: db_category_array });
        }
    });
});

//Delete category By ID
router.get('/delete/:id', function (req, res) {
    CategoryModel.findOneAndDelete(req.params.id, function (err, project) {
        if (err) {
            console.log("Error in Record Delete " + err);
            res.redirect('/category');
        } else {
            console.log(" Record Deleted ");
            res.redirect('/category');
        }
    });
});

//Get Single category By ID
router.get('/view/:id', function (req, res) {
    console.log(req.params.id);
    CategoryModel.findById(req.params.id, function (err, db_category_array) {
        if (err) {
            console.log("Error in Single Record Fetch" + err);
        } else {
            console.log(db_category_array);
            res.render('category/category-view', { category: db_category_array });
        }
    });
});

//Get category User for Edit Record
router.get('/edit/:id', function (req, res) {
    CategoryModel.findById(req.params.id, function (err, db_category_array) {
        if (err) {
            console.log("Edit Fetch Error " + err);
        } else {
            console.log(db_category_array);
            res.render('category/category-edit', { category: db_category_array });
        }
    });
});

//Update category Using Post Method
router.post('/edit/:id', function (req, res) {
    const mybodydata = {
        category_name: req.body.category_name,
        category_label: req.body.category_label
    }
    CategoryModel.findByIdAndUpdate(req.params.id, mybodydata, function (err) {
        if (err) {
            res.redirect('/category');
        } else {
            res.redirect('/category');
        }
    });
});

module.exports = router;