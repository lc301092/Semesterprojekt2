var express = require('express');
var router = express.Router();

/* GET home page. */
router.route('/main')
    .get(function (req, res) {
        // Set our internal DB variable
        var db = req.db;
        // Get the DB
        db.get('usercollection').find({}).then((data) => {
            res.render('main', {
                "userlist": data[0].users
            });
        });
    })
    .post(function (req, res) {
        // Set our internal DB variable
        var db = req.db;
        // Get our form values. These rely on the "name" attributes
        var userName = req.body.username;
        var userEmail = req.body.email;
        // Submit to the DB
        db.get('usercollection').update({}, {
                "$push": {
                    "users": {
                        "username": userName,
                        "email": userEmail
                    }
                }
            },
            function (err, doc) {
                if (err) {
                    // If it failed, return error
                    res.send("There was a problem adding the information to the database.");
                } else {
                    // And forward to success page
                    res.redirect("main");
                }
            });
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
