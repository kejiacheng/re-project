<template>
	<div id="content">
		<div class="login_box">
			<div class="login_box_header">
				<div data-way="user_way" class="user_way login_way selected" @click="user">用户登录</div>
				<div data-way="staff_way" class="staff_way login_way" @click="staff">员工登录</div>
				<div class="line"></div>
			</div>
			<div class="login_box_content">
				<div class="tips">
					<i class="fa fa-exclamation"></i>
					<span>请选择正确的登录方式</span>
					<span class="wrong">{{ error }}</span>
				</div>
				<form>
					<span class="label">账号:</span><input type="text" name="phone" placeholder="请输入您的手机号" class="phone" @focus="focus" v-model="phone"></br>
					<span class="label">密码:</span><input type="password" name="password" placeholder="请输入您的密码" class="password" @focus="focus" v-model="password">
					<a class="login_bt" @click="login_bt">登录</a>
				</form>
				<div class="fg_pw_reg">
					<a href="register.html" class="register">注册</a>
					<a href="changePW.html" class="fg_pw">忘记密码</a>
				</div>
			</div>
		</div>		
	</div>
</template>
<script type="text/javascript">
	import {addClass, removeClass} from '../../function/function.js'
	export default{
		components: {
			
		},
		methods: {
			user(){
				const that = this;
				const line = document.getElementsByClassName('line')[0];

				const user_way = document.getElementsByClassName('user_way')[0];
				const staff_way = document.getElementsByClassName('staff_way')[0];

				removeClass(staff_way, 'selected');
				addClass(user_way, 'selected');
2
				line.style.left = (user_way.offsetWidth - line.offsetWidth) / 2 + 'px';

				that.login_way = 'general';
			},
			staff(){
				const that = this;
				const line = document.getElementsByClassName('line')[0];

				const user_way = document.getElementsByClassName('user_way')[0];
				const staff_way = document.getElementsByClassName('staff_way')[0];

				removeClass(user_way, 'selected');
				addClass(staff_way, 'selected');

				line.style.left = (user_way.offsetWidth - line.offsetWidth) / 2 + user_way.offsetWidth + 'px';

				that.login_way = 'staff';
			},
			login_bt(){
				const that = this;

				that.$http.post("/login.html", { phone: that.phone, password: that.password, login_way: that.login_way })
				.then((result) => {
					if(Object.is(result.body, "登录成功")){
						window.location = "index.html";
					}else{
						that.error = result.body;
					}
				})
			},
			focus(){
				this.error = "";
			}
		},
		props: ["isLogin"],
		data: function (){
			return {
				login_way: 'general',
				phone: '',
				password: '',
				error: ''
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
		min-width: 500px;
		height: 550px;
		background: url(../../../img/login_bg.jpg);
		background-size: cover;
		background-position: center 0;
		position: relative;
		.login_box{
			$box-width : 350px;
			width: $box-width;
			height: 330px;
			background: #fff;
			opacity: 0.9;
			position: absolute;
			top: 80px;
			right: 50px;
			border-radius: 8px 8px 0 0;
			box-shadow: -10px 15px 3px 0 #444;
			.login_box_header{
				width: $box-width;
				height: 50px;
				border-bottom: 1px solid #dedede;
				font-size: 0;
				position: relative;
				.login_way{
					display: inline-block;
					font-size: 14px;
					width: $box-width / 2;
					height: 100%;
					text-align: center;
					line-height: 50px;
					box-sizing: border-box;
					font-weight: normal;
					cursor: pointer;
					font-weight: 600;
				}
				.user_way{
					border-radius: 8px 0 0 0;
				}
				.staff_way{
					border-radius: 0 8px 0 0;
				}
				.selected{
					color: #3f89ec;
					font-weight: 600;
				}
				.line{
					$line-width: 130px;
					width: $line-width;
					height: 2px;
					background: #3f89ec;
					position: absolute;
					bottom: -1px;
					left: ($box-width / 2 - $line-width) / 2;
					transition: left ease 1s;
				}
			}
			.login_box_content{
				.tips{
					height: 40px;
					padding-left: 15px;
					line-height: 40px;
					font-size: 13px;
					color: #666;
					margin-bottom: 18px;
					.fa-exclamation{
						color: red;
					}
					.wrong{
						color: red;
					}
				}	
				form{
					.label{
						display: inline-block;
						width: 50px;
						margin-right: 8px;
						text-align: right;
						margin-left: 20px;
					}
					input{
						margin-bottom: 22px;
						width: 205px;
						height: 30px;
						font-size: 13px;
						padding-left: 8px;
					}
					.login_bt{
						display: block;
						width: 180px;
						height: 45px;
						background: #3f89ec;
						text-align: center;
						line-height: 45px;
						color: #fff;
						border-radius: 3px;
						margin: 5px auto 20px;
						font-family: $mic;
						letter-spacing: 2px;
						font-weight: 600;
						cursor: pointer;
					}
				}
				.fg_pw_reg{
					width: 250px;
					font-size: 13px;
					color: #3878FF;
					margin: 0 auto;
					text-align: right;
					a{
						cursor: pointer;
					}
				}
			}
		}
	}
</style>