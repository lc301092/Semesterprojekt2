var express = require('express');
var router = express.Router();

/* GET home page. */
router.route('/main')
    .get(function (req, res) {
        // Set our internal DB variable
        var db = req.db;
        // Get the DB
        db.get('newscollection').find({}).then((data) => {
            res.render('main', {
                "newslist": data[0].news
            });
        });
    })
    .post(function (req, res) {

    });
//    .delete(function (req, res, next) {
//
//    });

/* GET login page. */
router.route('/')
    .get(function (req, res) {
        res.render('login', {
            title: 'login'
        });
    });
module.exports = router;
