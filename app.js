var express = require('express');
var path = require('path');
var app = express();
var apiRouter = require('./routes/api');

const bodyParser = require('body-parser');
app.use(bodyParser.json()); //数据JSON类型
app.use(bodyParser.urlencoded({
  extended: false
})); //解析post请求数据

app.use('/api', apiRouter);
app.use(express.static(path.join(__dirname, 'public')));

/**
 *  router
 */
app.get('/', function (req, res) {
  res.redirect('./login.html');
});

app.get('/404.html', function (req, res) {
  // redirect
  res.redirect('./login.html');
});
/**
 *  router --- end ---
 */

app.listen(3000);