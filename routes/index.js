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
        var dato = req.body.newDato;
        var paragraph = req.body.newParagraph;
        
        //var ID = 0;
        //var thisCollection = db.get('newscollection').find({});    
//        var newsList = thisCollection[0].news;
//        
//        for (i = 0; i < newsList.length; i++) {
//            if (newsList.ID.parseInt() >= ID)
//            {
//                ID = newsList.ID.parseInt() + 1;
//                ID = ID.toString();
//            }
//        }
        
        // Submit to the DB
        db.get('newscollection').update({}, {
                "$push": {
                    "news": {
                        "title": title,
                        "paragraph": paragraph,
                        "dato": dato,
//                        "ID": ID
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
