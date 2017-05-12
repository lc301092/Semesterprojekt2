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

        // Push data to newscollection
        db.get('newscollection').update({}, {
                "$push": {
                    "news": {
                        "title": title,
                        "paragraph": paragraph,
                        "dato": dato,
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
    .delete(function (req, res, next) {
        console.log("delete function works");
        console.log(req.body);
        var index = req.body.index;

        // Require our DB variable
        var db = req.db;

        db.get('newscollection').find({}).then((data) => {
            console.log('[ *** ');
            console.log(data[0].news);
            var i = data[0].news.length - index;
            console.log(i, data[0].news[i]);
            console.log(' *** ]');

            data[0].news.splice(i, 1);
            console.log('new array', data[0].news);
            // delete data to newscollection
            db.get('newscollection').update({}, {
                    "$set": {
                        "news": data[0].news
                    }
                },
                function (err, doc) {
                    if (err) {
                        // If it failed, return error
                        res.send("There was a problem deleting the object in the database.");
                    } else {
                        // And respond with complete
                        res.send("Collection updated");
                    }
                });
        });
    });
//route to edit news in newsbox
router.route('/editnews')
    /* POST route for main page. */
    .post(function (req, res) {
        //Define title, date and paragraph from inputs on main page
        var index = req.body.index;
        var title = req.body.title;
        var paragraph = req.body.paragraph;
        // Request our DB variable
        var db = req.db;
        db.get('newscollection').find({}).then((data) => {
            console.log('[ *** ');
            console.log(data[0].news);
            var i = data[0].news.length - index;
            console.log(i, data[0].news[i]);
            console.log(' *** ]');

            data[0].news[i].title = title;
            data[0].news[i].paragraph = paragraph;

            console.log(i, data[0].news[i]);

            db.get('newscollection').update({}, {
                    $set: {
                        "news": data[0].news
                    }
                }),
                function (err, doc) {
                    if (err) {
                        // If it failed, return error
                        res.send("There was a problem adding the information to the database.");
                    } else {
                        // And forward to success page
                        res.send("editNews complete");
                    }
                }
        });
    });

//route to INIT/GET bookings in calendar 
router.route('/calendarbooking')
    //GET route for calendar
    .post(function (req, res) {
        console.log('request ', req.body);
        // getcollectionfind iterate over users etc
        var db = req.db;
        db.get('usercollection').find({}).then((data) => {
            var t = [];
            for (var i = 0; i < data[0].users.length; i++) {
                var user = data[0].users[i].username;

                for (var j = 0; j < data[0].users[i].bookings.length; j++) {
                    var dates = data[0].users[i].bookings[j];

                    t.push({
                        status: user,
                        date: dates
                    });
                }

            }
            //			console.log("t ", t);
            res.send(JSON.stringify(t));
        });
    });

// route to bookings in calendar POST
router.route('/calendarbookingpost')
    /* POST route for main page. */
    .post(function (req, res) {
        console.log('request ', req.body);
        var date = req.body;
        // Request our DB variable
        var db = req.db;
        db.get('usercollection').find({}).then((data) => {
            console.log('[ *** ');
            //placeholder: index for datoen bookningen skal ske
            console.log(' *** ]');
            //console.log(i, data[0].news[i]);
            db.get('usercollection').update({}, {
                    //scope er med users ikke med bookings. DET SKAL FIKSES 
                    $push: {
                        "bookings": {
                            date
                        }
                    }
                }),
                function (err, doc) {
                    if (err) {
                        // If it failed, return error
                        res.send("There was a problem adding the information to the database.");
                    } else {
                        // And forward to success page
                        res.send("editNews complete");
                    }
                }
        });
    });
//



/* Login page. */
router.route('/')
    /* GET route for login page. */
    .get(function (req, res) {
        //Load login page
        res.render('login', {
            title: 'login'
        });
    });

router.route('/signin')
    .post(function (req, res) {
        var x = req.body.User;
        var y = req.body.Password;
        // getcollectionfind iterate over users etc
        var db = req.db;
        db.get('usercollection').find({}).then((data) => {
            console.log("Server username and password:");
            console.log("username: " + data[0].username, "password: " + data[0].userPassword);
            console.log("Form username and password:");
            console.log("username x: " + x, "password y: " + y);
            for (var i = 0; i < data.length; i++) {
                if (x == data[i].username && y == data[i].userPassword) {
                    return res.redirect("/main");
                } else {
                    return res.redirect('/');
                }
            }
        });
    });

module.exports = router;
