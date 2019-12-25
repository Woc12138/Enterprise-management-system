    var on = document.getElementById("on");
    var off = document.getElementById("off");
    var offWork = document.getElementById("offWork");
    var onTime = document.getElementById("onTime");
    var offTime = document.getElementById("offTime");
    
    offWork.style.display = "none";
   
    // 设置实时变化的时间
    var mytime = setInterval(function () {
        getTime();
    },1000);

    // 得到当前时间，并在相应位置显示
    function getTime() {
        var nowDate = new Date();
        var hour = nowDate.getHours()<10 ? "0" + nowDate.getHours() : nowDate.getHours();
        var minute = nowDate.getMinutes()<10 ? "0" + nowDate.getMinutes() : nowDate.getMinutes();
        var second = nowDate.getSeconds()<10 ? "0" + nowDate.getSeconds() : nowDate.getSeconds();
        var t = hour + ":" + minute + ":" + second;
        document.getElementById("t1").innerHTML = t;
        document.getElementById("t2").innerHTML = t;
    }  
    
    // 上班打卡
    on.onclick = function() {
        onTime = document.getElementById("onTime");
        var currTime = document.getElementById("t1").innerHTML;
        currTime = currTime.substr(0,currTime.length-3);
        var h3 = document.createElement("h3");
        h3.innerHTML = "打卡时间 "+currTime;
        var span = document.createElement("span");
        if(currTime <= onTime.innerHTML.trim()) {
            span.innerHTML = "正常";
            span.className = "tab normal";
        } else {
            span.innerHTML = "迟到";
            span.className = "tab late";    
        }
        h3.appendChild(span);
        this.insertAdjacentElement("beforebegin",h3);
        this.style.display = "none";
        offWork.style.display = "block";
        off.style.display = "inline-block";
    }

    // 下班打卡
    off.onclick = function() {
        offTime = document.getElementById("offTime");
        var currTime = document.getElementById("t2").innerHTML;
        currTime = currTime.substr(0,currTime.length-3);
        var h3 = document.createElement("h3");
        h3.innerHTML = "打卡时间 "+currTime;
        var span = document.createElement("span");
       
        if(currTime >= offTime.innerHTML.trim()) {
            span.innerHTML = "正常";
            span.className = "tab normal";
        } else {
            span.innerHTML = "早退";
            span.className = "tab early";    
        }
        h3.appendChild(span);
        this.insertAdjacentElement("beforebegin",h3);  
        this.style.display = "none";  
    }

    var list = document.querySelectorAll(".list");

    // 手风琴效果的列表
    function accordion(e) {
        e.stopPropagation();
        if (this.classList.contains("active")) {
            this.classList.remove("active");
        } 
        else if (this.parentElement.parentElement.classList.contains("active")) {
            this.classList.add("active");
        } 
        else {
            for (i = 0; i < list.length; i++) {
                list[i].classList.remove("active");
            }
            this.classList.add("active");
        }
    }
    for (i = 0; i < list.length; i++) {
        list[i].addEventListener("click", accordion);
    }

    // 模态框的实现
    var btn = document.getElementById('showModel');
    var close = document.getElementsByClassName('close')[0];
    var cancel = document.getElementById('cancel');
    var modal = document.getElementById('modal');
    var sure = document.getElementById('sure');
    btn.addEventListener('click', function(){
        modal.style.display = "block";
    });
    close.addEventListener('click', function(){
        modal.style.display = "none";
    });
    cancel.addEventListener('click', function(){
        modal.style.display = "none";
    });
    sure.addEventListener('click', function(){
        var newOn = document.getElementById('newOn').value;
        var newOff = document.getElementById('newOff').value;
        onTime.innerHTML = newOn;
        offTime.innerHTML = newOff;
        modal.style.display = "none";
        on.previousSibling.remove();
        on.style.display = "inline-block";
        off.previousSibling.remove();
        offWork.style.display = "none";
    })