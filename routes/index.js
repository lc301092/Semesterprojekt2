var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/main', function (req, res, next) {
    res.render('main', {
        title: 'main'
    });
});

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('login', {
        title: 'login'
    });
});
module.exports = router;
