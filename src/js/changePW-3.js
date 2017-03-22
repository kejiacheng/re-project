var password = document.getElementsByClassName('password')[0];
var cf_pw = document.getElementsByClassName('cf_pw')[0];
var confirm_user_bt = document.getElementsByClassName('confirm_user_bt')[0];
var pass_password = false;
var pass_cf_pw = false;

var pwFocus = function (){
	origin(password);
}

var pwBlur = function (){
	var passwordValue = password.value;
	var cf_pwValue = cf_pw.value;
	var reg = /^\w{6,10}$/g;
	//当密码为空时
	if(passwordValue == ""){
		pass_password = false;
		return;
	}
	//当密码格式不正确时
	if(!reg.test(passwordValue)){
		pass_password = false;
        error(password);
        return;
    }
    //密码正确	
    pass_password = true;
    //判断当前确认密码是否与密码一致，并修改验证码样式及pass_cf_pw
    if(passwordValue !== cf_pwValue && cf_pwValue != ""){
    	pass_cf_pw = false;
    	error(cf_pw);
    }else if(passwordValue == cf_pwValue){
    	pass_cf_pw = true;
    	origin(cf_pw);
    }
}
//添加获取焦点失去焦点事件
addEvents(password, "focus", pwFocus);
addEvents(password, "blur", pwBlur);

var cf_pwFocus = function (){
	origin(cf_pw);
}

var cf_pwBlur = function (){
	var passwordValue = password.value;
	var cf_pwValue = cf_pw.value;
	//判断确认密码是否与密码一致
	if(passwordValue == cf_pwValue){
		pass_cf_pw = true;
	}else{
		pass_cf_pw = false;
    	error(cf_pw);
	}
}
//添加获取焦点失去焦点事件
addEvents(cf_pw, "focus", cf_pwFocus);
addEvents(cf_pw, "blur", cf_pwBlur);


var confirmClick = function (){
	//判断密码与确认密码是否通过,并发送信号给后台
	if(pass_password && pass_cf_pw){
        var phone = document.getElementsByClassName('phone')[0];
        var phoneValue = phone.value;
        var passwordValue = password.value;
		var xhr = createXMLHttpRequest();

        xhr.open('post', 'changePW-3', true);

        xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
        xhr.onreadystatechange = function(){
            if(xhr.readyState == 4 && xhr.status == 200){
                if(xhr.responseText == '修改完成'){
                    window.location = 'index.html';
                }
            }
        };
        xhr.send("phone="+phoneValue+"&password="+passwordValue);
	}
}
//添加点击事件
addEvents(confirm_user_bt, "click", confirmClick);

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