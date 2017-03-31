//事件绑定事件 
var addEvents = (target,type,func) => {
	if(target.addEventListener){
		target.addEventListener(type,func,false);
	}else if(target.attachEvent){
		target.attachEvent("on",type,func);
	}
}

//事件取消绑定事件
var removeEvents = (target,type,func) => {
	if(target.removeEventListener){
		target.removeEventListener(type,func,false);
	}else if(target.detachEvent){
		target.detachEvent("on",type,func);
	}
}

//判断对象是否有这个class函数
var hasClass = (obj,cls) => {
	return obj.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'));
}

//给对象添加class函数
var addClass = (obj,cls) => {
	if (!this.hasClass(obj,cls)) obj.className += " " + cls;
}

//给对象删除class函数
var removeClass = (obj,cls) => {
	if (this.hasClass(obj, cls)) {  
	    let reg = new RegExp('(\\s|^)' + cls + '(\\s|$)');  
	    obj.className = obj.className.replace(reg, ' ');  
	}	
}

//对象toggleClass事件函数
var toggleClass = (obj,cls) => {
	if(this.hasClass(obj,cls)){  
        this.removeClass(obj, cls);  
    }else{  
        this.addClass(obj, cls);  
    } 
}

//cookie方法
var cookieUtil = () => {
	console.log('xixi');
	return {
		get: function (name){
			const cookieName = encodeURIComponent(name) + '=';
			const cookieStart = document.cookie.indexOf(cookieName);
			let cookieValue;

			if(cookieStart > -1){
				let cookieEnd = document.cookie.indexOf(';', cookieStart);
				if(cookieEnd == -1){
					cookieEnd = document.cookie.length;
				}
				cookieValue = decodeURIComponent(document.cookie.substring(cookieStart + cookieName.length, cookieEnd));
			}
			return cookieValue;
		},
		set: function (name, value, expires, path, domain, secure){
			let cookieText = encodeURIComponent(name) + '=' + encodeURIComponent(value);
			let date = new Date();
			date.setTime(date.getTime() + expires * 1000);
			cookieText += '; expires=' + date.toGMTString();

			if(path){
				cookieText += '; path=' + path;
			}
			if(domain){
				cookieText += '; domain' + domain;
			}
			if(secure){
				cookieText += '; secure';
			}
			document.cookie = cookieText;
		},
		unset: function (name, path, domain, secure){
			this.set(name, "", new Date(0), path, domain, secure);
		}
	}	
}

//格式化时间，变成XXXX-XX-XX的格式
function format_time(time){
	var year = time.getFullYear();
	var month = time.getMonth()+1;
	var day = time.getDate();
	if(month < 10){
		month = "0" + month;
	}
	if(day < 10){
		day = "0" + day;
	}
	return year + "-" + month + "-" + day;
}
export {addEvents, removeEvents, hasClass, addClass, removeClass, toggleClass, cookieUtil, format_time}