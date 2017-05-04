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
        // Set our internal DB variable
        var db = req.db;
        var title = req.body.newTitle;
        var paragraph = req.body.newParagraph;
        // Submit to the DB
        db.get('newscollection').update({}, {
                "$push": {
                    "news": {
                        "title": title,
                        "paragraph": paragraph
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
    })
    .delete(function (req, res, next) {});

/* GET login page. */
router.route('/')
    .get(function (req, res) {
        res.render('login', {
            title: 'login'
        });
    });
module.exports = router;
