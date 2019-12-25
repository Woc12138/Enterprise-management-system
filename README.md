# 企业考勤系统

## 启动方式

先创建一个"enterprise"数据库,
然后把/sql目录下的mysql.js的"数据库连接"配置改成自己的数据库信息,
在enterprise数据库里创建user表,
user表新增user_id(自增),username,account,department_id 4个字段,
启动自己的数据库,
然后执行下面的操作.

``` bash
# 1.安装node.js (下载安装即可)

# 2.安装依赖
npm install express mysql --save-dev

# 3.运行服务
npm run dev

```

然后打开浏览器访问: <http://localhost:3000/>




