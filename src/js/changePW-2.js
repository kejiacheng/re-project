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

        //创建ajax并向php发送post请求并从php返回一个验证码

        if(phoneValue == ""){
            return;
        }

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

    var xhr = createXMLHttpRequest();
    xhr.open("post","changePW-2",true);
    xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
    xhr.onreadystatechange = function(){
        if(xhr.readyState == 4 && xhr.status == 200){
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