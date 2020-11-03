var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Green GIS Server' });
});

/* Test. */
router.get('/test', function(req, res, next) {
    res.status(200).json({
        data: "Hello World"
    });
});

module.exports = router;
