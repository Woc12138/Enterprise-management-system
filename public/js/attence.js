//监听对于下拉菜单的选择
window.onload=function(){
    //首先部门选择的下拉箭头结点
    var arrow=document.getElementById("arrow_right");
    //获取部门选择下拉菜单结点实时的显示和隐藏
    var option=document.getElementById("optionDIV1");
    //获取信息中心结点
    var infoCenter=document.getElementById("infoCenter");
    //获取部门信息结点具体信息的div结点块
    var detailInfo=document.getElementById("optionDIV2");
    //获取图片箭头结点，防止移动到该图片上时触发意外
    var arrowRight=document.getElementById("arrowRight");
    //获取其余部门选择的三个选项结点
    var option1=document.getElementById("option1");
    var option2=document.getElementById("option2");
    var option3=document.getElementById("option3");
    //获取文件下载结点以便进行监听
    var file=document.getElementById("detailDownload");
    //获取搜索框对象结点进行监听，点击搜索放大镜图片触发搜索
    var searchImg=document.getElementById("searchImg");
    var search=document.getElementById("search");

    /******************单个监听器事件*********************/
    //添加监听器,当部门选择箭头被点击时展示列表框
    arrow.addEventListener("click",function(){
        option.style.display="block";
    });

    //添加监听器，当悬浮部门选择具体到信息中心时展示div浮动块
    infoCenter.addEventListener("mouseover",function(){
        detailInfo.style.display="block";
    });

    //添加监听器，用来触发下载文件
    file.addEventListener("click",function(){
        fileDownload(getAllTable(),'test.html');
    });

    //监听搜索框的事件，触发按照名字搜索
    searchImg.addEventListener("click",function(){
        onSearch(search,1);
    })


    /*************************监听页面的所有相关事件****************************/
    //监听所有的点击事件
    document.onclick=function(event){
        var e=event||window.event;  //兼容ie和非ie的event
        var aim=e.srcElement||e.target; //兼容ie和非ie的事件源

        if(e.srcElement){
            var aim=e.srcElement;
            if(aim!=arrow && aim!=option && aim!=infoCenter){
                option.style.display="none";
                detailInfo.style.display="none";
            }
        }else{
            if(aim!=arrow && aim!=option && aim!=infoCenter){
                option.style.display="none";
                detailInfo.style.display="none";
            }
        }
    }

    //监听所有的鼠标移进事件
    document.onmouseover=function(event){
        var e=event||window.event;  //兼容ie和非ie的event
        var aim=e.srcElement||e.target; //兼容ie和非ie的事件源

        if(e.srcElement){
            var aim=e.srcElement;
            if(aim==option1 || aim==option2 || aim==option3){
                detailInfo.style.display="none";
            }
        }else{
            if(aim==option1 || aim==option2 || aim==option3){
                detailInfo.style.display="none";
            }
        }
    }
}


//切换部门选择框
function changeDepartment(department) {
    //获取模拟select框结点对象
    var text_left=document.getElementById("text_left");
    text_left.innerText=department;
}


//用来选择时间范围
function changeTime(time) {
    //先获取所有的时间范围节点
    var nodes=new Array();
    nodes=document.getElementById("time").getElementsByTagName("a");

    //先将所有结点置于未选中状态
    for(var i=0;i<nodes.length;i++){
        nodes[i].classList.remove("active");
    }
    //获取选择结点元素
    var selectNode=document.getElementById(time);
    selectNode.classList.add("active");
}


//用来选择查看状态
function changeStatus(status) {
    //先获取所有的状态节点
    var nodes=new Array();
    nodes=document.getElementById("status").getElementsByTagName("a");

    //先将所有结点置于未选中状态
    for(var i=0;i<nodes.length;i++){
        nodes[i].classList.remove("active");
    }
    //获取选择结点元素
    var selectNode=document.getElementById(status);
    selectNode.classList.add("active");
}


//将日期的text框被点击时转换为date框
function textToDate(dateName){
    document.getElementById(dateName).type='date';
}


//获取整个表格信息包括表头和table标签在内，用于辅助生成文件
function getAllTable(){
    //获取表格对象
    var listTable=document.getElementById("listTable");
    //定义html文件的相应的内容基础前缀
    var dataStr='<html><head><style>.gray{background-color: #F8F8F8;}'+
        '.exceptionTime{border:1px solid #ff6600; color:#ff6600; padding:2px}'+
        '.exceptionStatus{background-color:#ff6600; padding-left: 2px;padding-right: 2px;}'+
        'td{text-align: left; width:16%; height:38px;}'+
        '</style></head><body><table>';
    //基础结构开始标签追加表格内容
    dataStr +=listTable.innerHTML;
    //加上后缀结束标签
    dataStr +='</table width="100%"></body></html>';
    return dataStr;
}


//获取详情表格内的内容
function getTable(){
    //获取表格对象
    var listTable=document.getElementById("listTable");
    //获取表格从正文第一行到第八行的数据
    var data=new Array();
    //读取第1~8行
    for(var i=0;i<8;i++){
        //遍历读取每一行中的所有数据
        for(var j=0;j<listTable.rows[i+1].cells.length;j++){
            //若当前二维数组为开辟则开辟空间
            if(!data[i]){
                data[i]=new Array();
            }
            //进行数据赋值
            data[i][j] = listTable.rows[i+1].cells[j].innerHTML;
        }
    }
    return data;
}


//使用给表格添加内容来模拟后台获取数据并显示更多内容
function addTable(){
    //先获取到原先表格的前八行数据以模拟后台传输过来的数据
    var data=getTable();
    //获取表对象的最后一行子节点
    var lastNode=document.getElementById("listTable").lastChild;

    //获取总的有多少条记录
    var totalDisplay=document.getElementById("totalDisplay").innerText;
    totalDisplay=parseInt(totalDisplay);    //化为数字进行处理

    //获取当前记录条数
    var nowDisplay=document.getElementById("nowDisplay").innerText;
    nowDisplay=parseInt(nowDisplay);     //化为数字进行处理

    if(nowDisplay==totalDisplay){
        window.alert("已显示全部信息");
        return;
    }

    //遍历该数组将所有的行添加到表格中
    for(var i=0;i<data.length;i++){
        //创建一个行结点
        var newNode=document.createElement("tr");
        //如果是奇数行，则添加灰色背景
        if(i%2==1)
            newNode.classList.add("gray");
        //定义需要添加到tr标签中的内容
        str="";
        //遍历每一列的数据
        for(var j=0;j<data[i].length;j++){
            str += '<td>'+data[i][j]+'</td>';
        }
        //设置tr的内容
        newNode.innerHTML=str;
        //将该新结点追加到最后一个结点后面
        lastNode.appendChild(newNode);
        //在此重新赋值新结点
        lastNode=document.getElementById("listTable").lastChild;
        //每添加一行当前计数加一
        nowDisplay++;
        if(nowDisplay==totalDisplay)    //如果已经显示全部则不再添加
            break;
    }

    document.getElementById("nowDisplay").innerText=nowDisplay; //重新修改显示条数
}

//用于提供文件下载的函数实现
function fileDownload(content, filename){
    //创建隐藏的可下载链接
    var eleLink = document.createElement('a');
    eleLink.download=filename;
    eleLink.style.display='none';
    //将字符内容转变为blob地址
    var blob=new Blob([content]);
    eleLink.href=URL.createObjectURL(blob);
    //触发点击事件
    //首先将该结点加入到body体中
    document.body.appendChild(eleLink);
    eleLink.click();    //触发点击下载事件
    //触发完下载事件以后移除
    document.body.removeChild(eleLink);
}


//实现名字搜索功能
//参数为需要获取值的内容，以及搜索表格的第几行
//如果搜索第一行则按照名字搜索
//搜索第四行则按照异常状态搜索
function onSearch(obj,searchCol){
    //定义布尔变量进行判断是按照名字查询还是异常状态查询
    var nameSearch= (searchCol==1) ? true: false;

    //首先获取表格对象
    var table=document.getElementById("listTable");
    var rowLength=table.rows.length;    //获取行数
    var key;        //存储关键字
    if(nameSearch)
        key=obj.value;  //获取输入框的值
    else
        key=obj.innerText;  //按名字搜索


    //为了保证当前显示数量的正确性，需要对计数进行计算
    //获取总的有多少条记录结点
    var totalDisplay=document.getElementById("totalDisplay");
    //获取当前记录条数结点
    var nowDisplay=document.getElementById("nowDisplay");
    //用来记录当前符合条件的条数
    var num=0;

    //按表的行数进行循环搜索，由于第一行是表头跳过搜索
    for(var i=1;i<rowLength;i++){
        //取得table行，列的值
        var searchText=table.rows[i].cells[searchCol].innerHTML;
        //使用match函数进行筛选，如果匹配则显示
        if(searchText.match(key)){
            table.rows[i].style.display="";    //显示行操作
            num++;
        }else{
            table.rows[i].style.display="none";     //隐藏行操作
        }
        if("全部".match(key) && !nameSearch){        //对应于查询全部操作需要另外进行处理
            table.rows[i].style.display="";
            num++;
        }
    }

    //显示当前条数计数进行赋值
    if(num<24 && ("".match(key) || "全部".match(key))){ //若显示未满24条且查看全部
        totalDisplay.innerText=24;
        nowDisplay.innerText=num;
    }else{
        totalDisplay.innerText=nowDisplay.innerText=num;
    }
}





















