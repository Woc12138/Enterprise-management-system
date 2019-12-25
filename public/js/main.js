//$$tool工具
function $$(s) {
  if (document.querySelectorAll(s).length === 1) {
    return document.querySelector(s);
  }
  return document.querySelectorAll(s);
}

//得到用户信息
let user_info = JSON.parse(localStorage.getItem('user_info'));
let user_id = user_info.user_id;
$$('#welcome').textContent = user_info.username;

//dropdown下拉框的显示与隐藏
var ul = $$(".el-dropdown-menu")
function btn_toggle() {
  var sh = $$(".el-dropdown-menu").classList.contains('show');
  if (sh) {
    $$(".el-dropdown-menu").classList.remove('show');
    $$(".el-dropdown-menu").classList.add('hide');
  } else {
    $$(".el-dropdown-menu").classList.remove('hide');
    $$(".el-dropdown-menu").classList.add('show');
  }
}
