var express = require('express');
var router = express.Router();

/* GET home page. */
router.route('/main')
    .get(function (req, res) {
        //retrieve data from MongoDB
        var db = req.db;
        db.get('usercollection').find({}).then((data) => {
            res.render('main', {
                "userlist": data[0].users
            });
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
    .get(function (req, res) {
        res.render('login', {
            title: 'login'
        });
    });
module.exports = router;
