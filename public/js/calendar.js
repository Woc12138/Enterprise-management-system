var date = new Date();
var year = date.getFullYear();
var month = date.getMonth(); // 得到 0-11 
var day = date.getDate();    
var allday; // 标识需要显示的月份天数
var pre = document.getElementById("pre");
var next = document.getElementById("next");
var title = document.getElementById("calendar-title");
var cal_year = document.getElementById("calendar-year");

window.onload = function() {
    showCal();
};

// 得到月份的天数
function Month() {
    // month是实际月份减一
    var mon = month+1;
    if(mon != 2) {
        if(mon==4 || mon==6 || mon==9 || mon==11)
            allday = 30;
        else 
            allday = 31;
    } else {
        // 判断是否是闰年
        if((year%4==0 && year%100!=0) || year%400==0)
            allday = 29;
        else
            allday = 28;
    }
}

// 设置日历格子被选中的颜色改变事件
function selectCell() {
    var everydays = document.querySelectorAll(".everyday");
    for(var i in everydays) {
        if (everydays[i].classList.contains("selected")) {
            everydays[i].classList.remove("selected");
            if(everydays[i].innerHTML.trim() == day)
                everydays[i].classList.add("today");
            break;
        } 
    }
    this.classList.add("selected");
    if(this.innerHTML.trim() == day)
        this.classList.remove("today");          
}

// 给指定行tr添加td
function insertTd(val,tr_id) {
    var row = document.getElementById(tr_id);
    var cell = document.createElement("td");
    cell.className = "everyday";
    cell.innerHTML = val;
    if(val == day)
        cell.classList.add("selected");
    row.appendChild(cell);    
}

// 显示日历
function showCal() {
    title.innerHTML = (month+1)+"月";
    cal_year.innerHTML = year;
    Month();
    var firstday = new Date(year,month,1);
    var fday = firstday.getDay();   // 0-6星期几  
    if(fday != 0) {
        // 设置日历第一行前面的空位
        for(var i=0;i<fday;i++) 
           insertTd("","row-1"); 
    }
    
    for(var i=1;i<=allday;i++) {
        var c = Math.ceil((fday+i)/7);
        var tr_id;
        switch(c) {
            case 1: tr_id = "row-1"; break;
            case 2: tr_id = "row-2"; break;
            case 3: tr_id = "row-3"; break;
            case 4: tr_id = "row-4"; break;
            case 5: tr_id = "row-5"; 
        }
        insertTd(i,tr_id);
    }
    // 绑定日历格子的点击事件
    var everydays = document.querySelectorAll(".everyday");
    for(var i=0;i<everydays.length;i++) {
        if(everydays[i].innerHTML.trim() != "")
            everydays[i].addEventListener("click" , selectCell);
    }
}

function clearCal() {
    var rows = document.getElementsByClassName("row");
    for(var i in rows) {
        rows[i].innerHTML = "";
    }
}

pre.onclick = function (e) {
    clearCal();
    month--;
    if(month < 0) {
        month = 11;
        year--;
    }
    Month();
    showCal();
}

next.onclick = function (e) {
    clearCal()
    month++;
    if(month > 11) {
        month = 0;
        year++;
    }
    Month();
    showCal();
}
