var yuan = document.getElementsByClassName("icon-yuan");
var wancheng = document.getElementsByClassName("icon-wancheng");
var del = document.getElementsByClassName("icon-shanchu");
var list = document.getElementById("list");
var add = document.getElementById("add");

binding();

// 为图标切换绑定事件
function binding() {
    for(var i in yuan) {
        yuan[i].onclick = function() {
            this.setAttribute("class","icon-wancheng");
            this.innerHTML = "<svg class='icon' aria-hidden='true'><use xlink:href='#icon-wancheng'></use></svg>";
            binding();
        }
    }

    for(var i in wancheng) {
        wancheng[i].onclick = function() {
            this.setAttribute("class","icon-yuan");
            this.innerHTML = "<svg class='icon' aria-hidden='true'><use xlink:href='#icon-yuan'></use></svg>";
            binding();
        }
    }  

    for(var i in del) {
        del[i].onclick = function() {
            list.removeChild(this.parentElement);
        }
    }
}


add.onkeydown = function(e) {
    var keyCode = null;
    var text = add.value;
    if(e.which)
        keyCode = e.which;
    else if(e.keyCode)
        keyCode = e.keyCode;

    if(keyCode == 13) {
        if(text == "") {
            alert("内容不得为空");
            return false;
        }
        var li = document.createElement("li");
        li.draggable = "true";
        li.innerHTML = "<span class='icon-yuan'><svg class='icon' aria-hidden='true'><use xlink:href='#icon-yuan'></use></svg></span><p class='conotent'>"+text+"</p><svg class='icon icon-shanchu' aria-hidden='true'><use xlink:href='#icon-shanchu'></use></svg>";
        list.appendChild(li);
        add.value = "";
        binding();
    }
    return true;
}

add.onfocus = function() {
    add.style.backgroundImage = "url('img/yuan.png')";
    add.style.backgroundSize = "26px 26px";
    add.style.backgroundPosition = "7px 7px";
    add.value = "";
}

add.onblur = function() {
    add.value = "添加任务";
    add.setAttribute("style","");
}