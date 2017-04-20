var express = require('express');
var router = express.Router();
var monk = require('monk');

/* GET home page. */
router.get('/main', function (req, res, next) {
    //retrieve data from MongoDB
    var users = req.db.collection('usercollection').find({});
    res.render('main', {
        title: 'main',
        "users": users
    });
    next();
});

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('login', {
        title: 'login'
    });
    next();
});
module.exports = router;
