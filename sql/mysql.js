/**
 *  数据库连接
 */
let my_mysql = require('mysql');
let conn = my_mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '123456789.',
  database: 'enterprise'
});
conn.connect();

/**
 * 各种处理函数
 * @param req
 * @param res
 */
function login(req, res) {
  let loginData = req.body;
  let LoginResult = null;
  let sql = 'SELECT * FROM user';
  conn.query(sql, function (err, result) {
    if (err) {
      res.send({
        code: 1,
        msg: '查询数据库错误'
      });
      console.log('[SELECT ERROR] - ', err.message);
      return;
    }
    // console.log("-------------所有注册用户的数据----------------: ");
    // console.log(result);
    // console.log("-------------所有注册用户的数据 end----------------: ");
    LoginResult = {
      code: 1,
      msg: '账号或者密码不对 (-_-)'
    };

    for (let i = 0; i < result.length; i++) {
      if (result[i].account === loginData.account && result[i].pwd === loginData.pwd) {
        LoginResult = {
          code: 0,
          msg: '登录成功',
          data: {
            user_id: result[i].user_id,
            username: result[i].username
          }
        };
        break;
      }
    }
    res.send(LoginResult)
  });
}

function reg(req, res) {
  console.log("req.body: ", req.body);

  // 查询用户名是否已经存在
  conn.query('SELECT * FROM user where account =' + req.body.account, function (err, result) {
    if (err) {
      res.send({
        code: 1,
        msg: '查询数据库错误'
      });
      console.log('[SELECT ERROR] - ', err.message);
      return;
    }
      if (result) {
        res.send({
          code: 1,
          msg: '用户名已经存在'
        });
        console.log("用户名已经存在");
        return;
      }
    console.log("register");
    register();
  });

  function register() {
    let sql = "INSERT INTO user(username, account, pwd) VALUES(?,?,?)";
    let sqlVal = [req.body.username, req.body.account, req.body.pwd];
    conn.query(sql, sqlVal, function (err, result) {
      if (err) {
        res.send({
          code: 1,
          msg: err
        });
        console.log("err: ", err);
      } else {
        res.send({
          code: 0,
          msg: '注册成功'
        });
      }
    })
  }
}

module.exports = {
  login,
  reg,
};