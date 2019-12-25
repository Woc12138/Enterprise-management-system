const express = require('express');
const router = express.Router();
const mysql = require('../sql/mysql');

const {
  login,
  reg,
} = mysql;


/**
 *  api
 */
router.get('/', function(req, res, next) {
  res.send('/api');
});

router.post('/login', function (req, res) {
  login(req, res);
});

router.post('/reg', function (req, res) {
  reg(req, res);
});

/**
 *  api --- end
 */


module.exports = router;
