<template>
	<div id="content">
		<div class="box_header">
			<div class="new_user_head">
				新用户注册
			</div>
			<div class="back_index">
				<img src="../../../img/home.png">
				<a href="index.html"><span>返回首页</span></a>
			</div>
		</div>
		<div class="new_tip">
			<img src="../../../img/new-tip.png">
			<span>贴心提示：请勿设置过于简单的登录密码或支付密码，防止不法分子窃取您的账户信息</span>
            <span class="catious">谨防诈骗！</span>
		</div>
		<div class="register_content">
			<form>
				<div class="input_box">
					<label>手机号码</label><input class="input_obj phone" type="text" placeholder="请输入您的手机号码" @focus="phoneFocus" @blur="phoneBlur" v-model="phone"><i class="r_x r_x_phone"></i><br>
                    <p class="tip tip_phone">{{ phoneTip }}</p>
				</div>
				<div class="input_box">
                    <label>账号名</label><input class="input_obj username" type="text" @focus="usernameFocus" @blur="usernameBlur" v-model="username"><i class="r_x r_x_username"></i><br>
                    <p class="tip tip_username">{{ usernameTip }}</p>
                </div>
                <div class="input_box">
                    <label>登录密码</label><input class="input_obj password" type="password" @focus="passwordFocus" @blur="passwordBlur" v-model="password"><i class="r_x r_x_password"></i><br>
                    <p class="tip tip_password">{{ passwordTip }}</p>
                </div>
                <div class="input_box">
                    <label>确认密码</label><input class="input_obj confirm_password" type="password" @focus="confirm_passwordFocus" @blur="confirm_passwordBlur" v-model="confirm_password"><i class="r_x r_x_confirm_password"></i><br>
                    <p class="tip tip_confirm_password">{{ confirm_passwordTip }}</p>
                </div>
                <div class="input_box">
                    <label>获取验证码</label><input class="input_obj vertify" type="text" placeholder="请输入您的手机验证码" @focus="vertifyFocus" @blur="vertifyBlur" v-model="vertify"><i class="r_x r_x_vertify"></i><div class="get_vertify" @click="get_vertify">{{ countdown }}</div><br>
                    <p class="tip tip_vertify">{{ vertifyTip }}</p>
                </div>
                <a class="register_bt">立即注册</a>
			</form>
		</div>
	</div>
</template>
<script type="text/javascript">
	export default{
		components: {
			
		},
		mounted(){
			const that = this;
			const cookie = that.cookieUtil();
			console.log(cookie.get('vertify'));
			//过期时间
			const outTime = cookie.get('vertify');
			
			if(outTime){
				//当前时间
				const nowTime = new Date().getTime();

				let time = Math.floor((outTime - nowTime) / 1000);

				that.countdown = time--;

				//定时器事件，倒计时
				var timer = setInterval(() => {
					that.countdown = time--;

					if(time <= 0){
						clearInterval(timer);
						that.countdown = '获取验证码';
					}
				}, 1000)
			}
		},
		methods: {
			phoneFocus(e){
				const that = this;
				const phone = document.getElementsByClassName('phone')[0];
				that.phoneTip = '手机号可用于登录、找回密码等服务';
				//返回初始样式
				that.origin(phone, "phone");
			},
			phoneBlur(){
				const that = this;
				const reg = /^1[3|4|5|7|8]\d{9}$/g;
				const tip_phone = document.getElementsByClassName('tip_phone')[0];
				const phone = document.getElementsByClassName('phone')[0];
				const r_x_phone = document.getElementsByClassName('r_x_phone')[0];
				const index = 0;

				//当输入为空时
				if(that.phone == ""){
					that.phoneTip = '手机号可用于登录、找回密码等服务';
					that.condition.phone = false;
					return;
				}

				//判断格式是否正确
				if(!reg.test(that.phone)){
					that.phoneTip = '手机格式不正确，请重新输入';
					//输入错误样式
					that.error(phone,"phone");
					that.condition.phone = false;
					return;
				}
				
				//通过后台数据库判断手机是否已被注册
				that.$http.post('/register.html', { 'index': index, 'phone': that.phone })
				.then((result) => {
					if(result.body == '通过！'){
						r_x_phone.style.background = "url(../../../img/r.png)";
						that.condition.phone = true;
					}else{
						that.error(phone,"phone");
						that.condition.phone = false;
					}
					that.phoneTip = result.body;
				})
			},
			usernameFocus(){
				const that = this;
				const username = document.getElementsByClassName('username')[0];

				that.usernameTip = '请输入2-8位账号名';

				//返回初始样式
				that.origin(username, "username");
			},
			usernameBlur(){
				const that = this;
				const reg = /^[A-Za-z0-9\u4E00-\u9FA5-]{2,8}$/g;
       			const reg1 = /^\d{2,8}$/g;
       			const username = document.getElementsByClassName('username')[0];
       			const r_x_username = document.getElementsByClassName('r_x_username')[0];
       			const index = 1;

       			//用户名为空时
       			if(that.username == ""){
       				that.usernameTip = '请输入2-8位账号名';
       				that.condition.username = false;
       				return;
       			}

       			//判断用户名是否为纯数字
       			if(reg1.test(that.username)){
       				that.usernameTip = '账号名不能纯数字';
       				that.error(username, "username");
       				that.condition.username = false;
       				return;
       			}

       			//判断用户名格式是否正确
       			if(!reg.test(that.username)){
       				that.usernameTip = '用户名格式不正确';
       				that.error(username, "username");
       				that.condition.username = false;
       				return;
       			}

       			//通过后台数据库判断该用户名是否已被注册
       			that.$http.post('/register.html', { 'index': index, 'username': that.username })
       			.then((result) => {
       				if(result.body == '通过！'){
						r_x_username.style.background = "url(../../../img/r.png)";
						that.condition.username = true;
					}else{
						that.error(username,"username");
						that.condition.username = false;
					}
					that.usernameTip = result.body;
       			})
			},
			passwordFocus(){
				const that = this;
				const password = document.getElementsByClassName('password')[0];

				that.passwordTip = '请输入6-10位登录密码';

				//返回初始样式
				that.origin(password, "password");
			},
			passwordBlur(){
				const that = this;
				var reg = /^\w{6,10}$/g;
       			const password = document.getElementsByClassName('password')[0];
       			const r_x_password = document.getElementsByClassName('r_x_password')[0];
       			const confirm_password = document.getElementsByClassName('confirm_password')[0];
       			const r_x_confirm_password = document.getElementsByClassName('r_x_confirm_password')[0];

       			//密码为空时
		        if(that.password == ""){
		            that.passwordTip = "请输入6-10位登录密码";
		            that.condition.password = false;
		            return;
		        }

		        if(!reg.test(that.password)){
		        	that.passwordTip = "密码由6-10位字母，数字，下划线组成";
		            that.error(password,"password");
		            that.condition.password = false;
		            return;
		        }else{
		        	that.passwordTip = "通过！";
		        	that.condition.password = true;
		        	r_x_password.style.background = "url(../../../img/r.png)";
		        	if(that.confirm_password != ""){
		        		if(that.password == that.confirm_password){
		        			that.condition.confirm_password = true;
                    		that.origin(confirm_password,"confirm_password");
			        		that.confirm_passwordTip = "通过！";
			        		r_x_confirm_password.style.background = "url(../../../img/r.png)";
			        	}else{
			        		that.condition.confirm_password = false;
			        		that.error(confirm_password,"confirm_password");
			        		that.confirm_passwordTip = '密码不一致';
			        		r_x_confirm_password.style.background = "url(../../../img/xx.png)";
			        	}
		        	}
		        }
			},
			confirm_passwordFocus(){
				const that = this;
				const confirm_password = document.getElementsByClassName('confirm_password')[0];

				that.confirm_passwordTip = '请确认密码';

				//返回初始样式
				that.origin(confirm_password, "confirm_password");
			},
			confirm_passwordBlur(){
				const that = this;
				const confirm_password = document.getElementsByClassName('confirm_password')[0];
				const r_x_confirm_password = document.getElementsByClassName('r_x_confirm_password')[0];

				if(that.confirm_password == ""){
					that.confirm_passwordTip = '请确认密码';
					that.condition.confirm_password = false;
					return;
				}

				if(that.password == that.confirm_password){
					that.confirm_passwordTip = "通过！";
					r_x_confirm_password.style.background = "url(../../../img/r.png)";
					that.condition.confirm_password = true;
				}else{
					that.confirm_passwordTip = "密码不一致";
					that.error(confirm_password, 'confirm_password');
					that.condition.confirm_password = false;
				}
			},
			vertifyFocus(e){
				const that = this;
				const vertify = document.getElementsByClassName('vertify')[0];
				that.vertifyTip = '请输入验证码';
				//返回初始样式
				that.origin(vertify, "vertify");
			},
			vertifyBlur(){
				const that = this;
				const vertify = document.getElementsByClassName('vertify')[0];
       			const r_x_vertify = document.getElementsByClassName('r_x_vertify')[0];
				const index = 2;

				if(that.vertify == ""){
					that.vertifyTip = '请输入验证码';
					that.condition.vertify = false;
					return;
				}

				that.$http.post('/register.html', { index: index, vertify: that.vertify})
				.then((result) => {
					if(result.body == '通过！'){
						r_x_vertify.style.background = "url(../../../img/r.png)";
						that.condition.vertify = true;
					}else{
						that.error(vertify,"vertify");
						that.condition.vertify = false;
					}
					that.vertifyTip = result.body;
				})
			},
			get_vertify(){
				const that = this;
				const cookie = that.cookieUtil();

				if(!cookie.get('vertify')){
					let date = new Date();
					//过期时间为60秒
					const expires = 60;
					let time = expires;

					//过期时间值
					date = date.getTime() + expires * 1000;

					//将到期时间写入cookie
					cookie.set('vertify', date, expires);

					//先写入时间
					that.countdown = time--;

					//定时器事件，倒计时
					var timer = setInterval(() => {
						that.countdown = time--;

						if(time <= 0){
							clearInterval(timer);
							that.countdown = '获取验证码';
						}
					}, 1000)
				}
			},
			error(obj, string){//输入错误样式
				const tip = document.getElementsByClassName("tip_" + string)[0];
			    const r_x = document.getElementsByClassName("r_x_" + string)[0];

			    tip.style.color = '#cc0000';
			    r_x.style.background = 'url(../../../img/xx.png)';
			    obj.style.borderColor = '#cc0000';
			    obj.style.borderStyle = 'solid';
			    obj.style.background = '#fef0ef';
			    obj.style.color = '#cc0000';
			},
			origin(obj, string){//返回初始样式
				const tip = document.getElementsByClassName("tip_" + string)[0];
			    const r_x = document.getElementsByClassName("r_x_" + string)[0];
			    const pass = document.getElementsByClassName("pass_" + string)[0];

			    r_x.style.background = '';
			    tip.style.color = 'black';
			    obj.style.borderColor = '';
			    obj.style.borderStyle = '';
			    obj.style.background = '';
			    obj.style.color= 'black';
			},
			cookieUtil(){
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
		},
		props: [],
		data: function (){
			return {
				condition: {
					phone: false,
					username: false,
					password: false,
					confirm_password: false,
					vertify: false
				},
				phone: '',
				phoneTip: '手机号可用于登录、找回密码等服务',
				username: '',
				usernameTip: '请输入2-8位账号名',
				password: '',
				passwordTip: '请输入6-10位登录密码',
				confirm_password: '',
				confirm_passwordTip: '请确认密码',
				vertify: '',
				vertifyTip: '请输入验证码',
				countdown: '获取验证码',
			}
		},
		computed: {

		},
		created: function (){

		},
		watch: {

		}
	}
</script>
<style lang="sass">
	$mic: "微软雅黑";
	#content{
		width: 950px;
		margin: 40px auto 0;
		box-shadow: -10px 10px 1px #c9c9c9;
		background: #fff;
		.box_header{
			width: 920px;
			height: 75px;
			margin: 0 auto;
			border-bottom: 1px solid #dedede;
			.new_user_head{
			    text-align: center;
			    margin-top: 30px;
			    margin-left: 20px;
			    padding-top: 15px;
			    border: solid #dedede;
			    width: 137px;
			    height: 30px;
			    float:left;
			    border-width: 1px 1px 0 1px;
			    background: #fff;				
			}
			.back_index{
			    width: 70px;
			    height: 30px;
			    margin-top: 40px;
			    float: right;
			    font-size: 12px;
			    overflow: hidden;
			    img{
			    	margin-top: 10px;
			    	float: left;
			    }	
			    span{
			    	float: left;
			    	display: inline-block;
			    	margin-top: 11px;
			    	margin-left: 2px;
			    }			
			}
		}
		.new_tip{
		    width: 594px;
		    height: 24px;
		    margin: 10px auto 50px;;
		    border: 1px solid #fedbd1;
		    font-size: 13px;
		    img{
		    	margin-top: 6px;
		    	margin-left: 2px;
		    	float: left;
		    }			
		    span{
		    	display: inline-block;
		    	margin-top: 6px;
		    	margin-left: 5px;
		    }
		    .catious{
		    	color: blue;
		    }
		}
		.register_content{
			width: 440px;
			margin: 0 auto;
			padding-bottom:50px;
			.input_box{
				label{
				    margin-right: 10px;
				    font-size: 14px;
				    width: 70px;
				    display: inline-block;
				    text-align: right;
				    color: #474747;
				    font-family: $mic;				
				}
				input{
				    width: 312px;
				    height: 34px;
				    margin-bottom: 10px;
				    font-size: 13px;
				    padding-left: 8px;				
				}
				i{
				    display: inline-block;
				    width: 12px;
				    height: 12px;
				    background-size: 12px 12px;
				    margin-left: 5px;
				    margin-top: 13px;
				    vertical-align: top;				
				}
				p{
				    margin-left: 80px;
				    margin-bottom: 10px;
				    font-family: $mic;
				    font-size: 12px;				
				}
				input.vertify{
					width: 222px;
				}
				i.r_x_vertify{
					margin-left: -20px;
				}
				.get_vertify{
				    display: inline-block;
				    width: 81px;
				    height: 35px;
				    background: #dedede;
				    vertical-align: top;
				    margin-left: 15px;
				    border: 1px solid #aaa;
				    font-size: 12px;
				    text-align: center;
				    line-height: 35px;
				    font-family: $mic;
				    cursor: pointer;				
				}	
			}
			.register_bt{
			    display: block;
			    background: #ff2832;
			    width: 180px;
			    height: 50px;
			    line-height: 50px;
			    text-align: center;
			    font-size: 18px;
			    font-family: $mic;
			    color: white;
			    border-radius: 22px;
			    margin: 30px auto 0;				
			}
		}
	}
</style>