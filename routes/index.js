var express = require('express');
var router = express.Router();
var monk = require('monk');

/* GET home page. */
router.route('/main')
    .get(function (req, res, next) {
        //retrieve data from MongoDB
        var usercollection = req.db.collection('usercollection').find({});
        res.render('main', {
            title: 'main',
            "usercollection": usercollection
        });
    });
//    .post(function (req, res, next) {
//
//    })
//    .delete(function (req, res, next) {
//
//    });

/* GET login page. */
router.route('/')
    .get(function (req, res, next) {
        res.render('login', {
            title: 'login'
        });
    });
module.exports = router;
