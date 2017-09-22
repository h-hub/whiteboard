var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/home', function(req, res, next) {
  res.render('home', { title: 'White Board Home' });
});

router.get('/', function(req, res, next) {
  res.render('index', { title: 'White Board Login' });
});

module.exports = router;
