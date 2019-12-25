$$("#name").value = user_info.username;
//通过按钮实现头像的上传，隐藏丑陋的文件框
function changeAvatar(){
    var avatarUpload=document.getElementById("avatarUpload");
    avatarUpload.click();
}


//实现信息选择的切换工作
function changeOption(option){
    //获取导航栏选项
    var nodes=document.getElementById("optionToInfo").children;
    //取消导航栏中所有的选中状态
    for(var i=0;i<nodes.length;i++){
        node=nodes[i];
        node.classList.remove("active");
    }

    //将被选中的选项置于被选中状态
    document.getElementById(option).classList.add("active");
}


//根据选中不同的信息，切换不同的div
function show1(){
    document.getElementById("div2").style.display="none";
    document.getElementById("div3").style.display="none";
    document.getElementById("div1").style.display="block";
}

function show2() {
    document.getElementById("div1").style.display="none";
    document.getElementById("div3").style.display="none";
    document.getElementById("div2").style.display="block";
}

function show3() {
    document.getElementById("div1").style.display="none";
    document.getElementById("div2").style.display="none";
    document.getElementById("div3").style.display="block";
}


//用于处理表单的清空
function reset(name){
    document.getElementById(name).reset();
}


//对于表单一提交进行验证
function check1() {
    //获取表单中的相应元素
    var nodes=new Array();      //使用数组进行存储
    nodes[0]=document.getElementById("name");     //获取姓名
    nodes[1]=document.getElementById("sex");       //获取性别
    nodes[2]=document.getElementById("date");     //获取入职日期
    nodes[3]=document.getElementById("work");     //获取工作部门
    nodes[4]=document.getElementById("telephone");    //电话号码
    nodes[5]=document.getElementById("job");       //职务
    nodes[6]=document.getElementById("email");    //邮箱
    nodes[7]=document.getElementById("address");     //现居住地

    //获取警告提示框
    var waringInfo=document.getElementById("waringInfo1");
    //考虑到先前提示框可能报错，因此先将提示消息置空
    waringInfo.innerText="";

    //先将所有的输入框边框置为正常颜色
    for (var i=0;i<nodes.length;i++){
        nodes[i].style.border="1px solid #ccddef";
    }

    //判断姓名是否为空
    if(nodes[0].value==""){
        waringInfo.innerText="姓名不能为空";
        nodes[0].style.border="1px solid red";
        return;
    }

    //判断性别是否为空
    if(nodes[1].value==""){
        waringInfo.innerText="性别不能为空";
        nodes[1].style.border="1px solid red";
        return;
    }

    //判断入职时间
    var date=nodes[2].value;
    if(date=""){
        waringInfo.innerText="请填写您的入职时间";
        nodes[2].style.border="1px solid red";
        return;
    }

    //判断工作部门是否正确
    var work=nodes[3].value;
    if(!checkWork(work)){
        waringInfo.innerText="该部门不存在，请重新填写噢";
        nodes[3].style.border="1px solid red";
        return;
    }

    //判断电话号码是否正确
    var tel=nodes[4].value;
    if(tel==""){
        waringInfo.innerText="电话号码不能为空，请注意填写";
        nodes[4].style.border="1px solid red";
        return;
    }else if(!checkTel(tel)){
        waringInfo.innerText="您输入的电话号码格式不正确，请重新输入";
        nodes[4].style.border="1px solid red";
        return;
    }

    //判断职务是否为空
    var job=nodes[5].value;
    if(job==""){
        waringInfo.innerText="职务不能为空";
        nodes[5].style.border="1px solid red";
        return;
    }

        //判断电子邮箱格式是否正确
    var email=nodes[6].value;
    if(email==""){
        waringInfo.innerText="邮箱不能为空";
        nodes[6].style.border="1px solid red";
        return;
    }else if (!checkEmail(email)){
        waringInfo.innerText="您输入的邮箱格式不正确，请重新输入";
        nodes[6].style.border="1px solid red";
        return;
    }

    window.alert("修改成功！！！");


}


//检查工作部门是否正确
function checkWork(work){
    switch (work) {
        case "运维部": return true; break;
        case "营销部": return true; break;
        case "采编部": return true; break;
        default: return false;

    }
}

//判断电话号码是否正确
function checkTel(tel){
    //判断是否等于十一位
    if(!(tel.length==11))
        return false;
    //如果存在字母则错误
    for(var i=0;i<tel.length;i++){
        if(!(tel[i]>='0' && tel[i]<='9')){
            return false;
        }
    }
    return true;
}

//判断邮箱的格式是否正确
function checkEmail(mail){
    var apos=mail.indexOf("@");
    var dotpos=mail.indexOf(".");
    //如果两个字符存在且满足条件则返回true
    if(apos!=(-1) && dotpos!=(-1))
        if(apos!=0 && dotpos!=(mail.length-1)
            && apos!=(dotpos+1) && apos!=(dotpos-1))
            return true;
    return false;
}


//验证修改密码
function check3(){
    //获取表单中的相应元素
    var nodes=new Array();      //使用数组进行存储
    nodes[0]=document.getElementById("password");
    nodes[1]=document.getElementById("newPassword");
    nodes[2]=document.getElementById("rePassword");
    //获取当前密码，新密码以及确认新密码
    var password=nodes[0].value;
    var newPassword=nodes[1].value;
    var rePassword=nodes[2].value;

    //获取提示框
    var waringInfo3=document.getElementById("waringInfo3");
    //考虑到先前提示框可能报错，因此先将提示消息置空
    waringInfo3.innerText="";

    //先将所有的输入框边框置为正常颜色
    for (var i=0;i<nodes.length;i++){
        nodes[i].style.border="1px solid #ccddef";
    }

    if(password!="123456"){
        waringInfo3.innerText="您输入的当前密码不正确";
        nodes[0].style.border="1px solid red";
        return;
    }else if(newPassword==""){
        waringInfo3.innerText="请输入您需要修改的新密码";
        nodes[1].style.border="1px solid red";
        return;
    }else if(newPassword.length<6){
        waringInfo3.innerText="密码必须大于等于6位，请重新输入";
        nodes[1].style.border="1px solid red";
        return;
    }else if(password==newPassword){
        waringInfo3.innerText="您的新密码与当前密码一致，无法修改";
        nodes[1].style.border="1px solid red";
        return;
    }else if(newPassword!=rePassword){
        waringInfo3.innerText="您两次输入的密码不一致，请重新输入";
        nodes[2].style.border="1px solid red";
        return;
    }

    window.alert("修改密码成功");

}