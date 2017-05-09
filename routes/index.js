var express = require('express');
var router = express.Router();

/* main page. */
router.route('/main')
    /* GET route for main page. */
    .get(function (req, res) {
        // Require our DB variable
        var db = req.db;
        // Get the newscollection and make it accesible in main through ejs
        db.get('newscollection').find({}).then((data) => {
            //Load main page
            res.render('main', {
                "newslist": data[0].news,
                title: 'mainpage'
            });
        });
    })
    /* POST route for main page. */
    .post(function (req, res) {
        // Require our DB variable
        var db = req.db;
        //Define title, date and paragraph from inputs on main page
        var title = req.body.newTitle;
        var dato = req.body.newDato;
        var paragraph = req.body.newParagraph;

        //Jamie WIP
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

        // Push data to newscollection
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
    /* DELETE route for main page. */
    .delete(function (req, res, next) {});

/* Login page. */
router.route('/')
    /* GET route for login page. */
    .get(function (req, res) {
        //Load login page
        res.render('login', {
            title: 'login'
        });
    });
module.exports = router;
