var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/share', function(req, res, next) {
	res.render('share')
})

module.exports = router;
