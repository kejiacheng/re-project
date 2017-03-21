//创建cookie对象
var CookieUtil = {
    get: function(name){
        var cookieName = encodeURIComponent(name) + "=",
            cookieStart = document.cookie.indexOf(cookieName),
            cookieValue;
        if(cookieStart > -1){
            var cookieEnd = document.cookie.indexOf(";" , cookieStart);
            if(cookieEnd == -1){
                cookieEnd = document.cookie.length;
            }
            cookieValue = decodeURIComponent(document.cookie.substring(cookieStart + cookieName.length , cookieEnd));
        }
        return cookieValue;
    },

    set: function(name , value , expires , path , domain , secure){
        var cookieText = encodeURIComponent(name) + "=" + encodeURIComponent(value);


        var date = new Date();
        date.setTime(date.getTime() + expires*1000);
        cookieText += "; expires=" + date.toGMTString();

        if(path){
            cookieText += "; path=" + path;
        }
        if(domain){
            cookieText += "; domain=" + domain;
        }
        if(secure){
            cookieText += "; secure";
        }
        document.cookie = cookieText;
    },

    unset: function(name , path , domain , secure){
        this.set(name , "" , new Date(0) , path , domain , secure);
    }
};

var vertify_text = document.getElementsByClassName("vertify_text")[0],
    phone = document.getElementsByClassName("phone")[0],
    phoneValue = phone.value,
    vertify = document.getElementsByClassName("vertify")[0],
    pass_vertify = 0;

//获取cookie里的过期时间，并写入
(function(){
    var outTime = CookieUtil.get("date"),//获取过期时间ms
        nowTime = new Date(),
        nowTime = nowTime.getTime();//获取当前时间ms

    if(outTime){
        var time = Math.floor((outTime - nowTime)/1000);//得到剩余时间s

        //写入时间
        vertify_text.innerHTML = time--;
        //定时器事件
        var timing = setInterval(function(){
                //将时间写入vertify_text
                vertify_text.innerHTML = time--;

                //当时间小于0时，清楚定时器，并改变vertify_text的值
                if(time <= 0){
                    clearInterval(timing);
                    vertify_text.innerHTML = "获取验证码";
                }
            },1000)
    }
})();

var get_vertify = function (){
    if(!CookieUtil.get('date')){
        var date = new Date(),//获取当前时间
            expires = 60, //过期时间为60s
            time = expires //将expires的值赋给time

        date  = date.getTime() + expires*1000;//过期时间

        //将到期时间写入cookie
        CookieUtil.set('date',date,expires);

        //写入时间
        vertify_text.innerHTML = time--;

        //定时器事件
        var timing = setInterval(function(){
            //将时间写入vertify_text
            vertify_text.innerHTML = time--;

            //当时间小于0时，清楚定时器，并改变vertify_text的值
            if(time <= 0){
                clearInterval(timing);
                vertify_text.innerHTML = "获取验证码";
            }
        },1000)

        if(phoneValue == ""){
            return;
        }
        //将手机号发送给后台，并让后台随机生成一个4位数验证码并发送这验证码给当前手机
        var xhr = createXMLHttpRequest();

        xhr.open("post","changePW-2",true);
        xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
        xhr.onreadystatechange = function(){
            if(xhr.readyState == 4 && xhr.status == 200){
            
            }
        };
        xhr.send("phone="+phoneValue+"&index=0");
    }
}

addEvents(vertify_text, 'click', get_vertify);

var confirm_user_bt = document.getElementsByClassName('confirm_user_bt')[0];

var confirmClick = function (){
    window.location = 'changePW-3?phone=' + phoneValue;
}

var blurEvent = function (){
    var vertifyValue = vertify.value;
    //将输入的验证码发给后台验证
    var xhr = createXMLHttpRequest();
    xhr.open("post","changePW-2",true);
    xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
    xhr.onreadystatechange = function(){
        if(xhr.readyState == 4 && xhr.status == 200){
            //收到后台的信号添加移除点击事件
            if(xhr.responseText == '通过！'){
                addEvents(confirm_user_bt, 'click', confirmClick);
            }else{
                removeEvents(confirm_user_bt, 'click', confirmClick);
                error(vertify);
            }
        }
    };
    xhr.send("vertify="+vertifyValue+"&index=1");
}

addEvents(vertify, 'blur', blurEvent);

var focusEvent = function (){
    origin(vertify);
}

addEvents(vertify, 'focus', focusEvent);

//添加监听事件
function addEvents(target, type, func){
    if(target.addEventListener){
        target.addEventListener(type, func, false);
    }else if(target.attachEvent){
        target.attachEvent('on', type, func);
    }
}

//移除监听事件
function removeEvents(target, type, func){
    if(target.removeEventListener){
        target.removeEventListener(type, func, false);
    }else if(target.detachEvent){
        target.detachEvent('on', type, func);
    }
}

//创建XMLHttpRequest
function createXMLHttpRequest(){
    var xhr;
    try{
        xhr = new XMLHttpRequest();
    }
    catch(e){
        xhr = new ActiveXObject("Microsoft.XMLHTTP");
    }
    return xhr;
}

//错误特效
function error(obj){

    obj.style.borderColor = "#cc0000";
    obj.style.borderStyle = "solid";
    obj.style.background = "#fef0ef";
    obj.style.color = "#cc0000";
}

//原始特效
function origin(obj){

    obj.style.borderColor = "";
    obj.style.borderStyle = "";
    obj.style.background = "";
    obj.style.color= "black";
}