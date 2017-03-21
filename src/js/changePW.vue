<template>
	<div id="main-content">
		<changePWHeader></changePWHeader>
		<div id="content">
			<div class="wrapper">
				<ul class="steps">
					<li class="now_steps">确认账号</li>
					<li>安全验证</li>
					<li>重置密码</li>
				</ul>
				<div class="confirm_user">
					<form id="myForm">
						<input type="text" name="username" placeholder="请输入您的手机号" class="username" v-model="phone"></br>
						<input type="text" placeholder="请输入验证码" class="vertify" v-model="inputVertify">
						<span class="vertify_text" @click="changeVertify">{{ vertify }}</span>
						<a class="confirm_user_bt" @click.prevent="next">下一步</a>
					</form>
				</div>
			</div>
		</div>
		<changePWFooter></changePWFooter>
	</div>
</template>

<script type="text/javascript">
	import changePWHeader from './components/header.vue';
	import changePWFooter from './components/footer.vue';

	export default{
		components: {
			changePWHeader,
			changePWFooter
		},
		methods: {
			changeVertify(){
				const that = this;
				that.vertify = that.createVertify();
			},
			createVertify(){
				let vertify = '',
					randomNum = 0;
				for(let i=0; i<4;){
					//产生一个范围在48-122的随机数
					randomNum = Math.floor(Math.random() * 75 + 48);
					//判断随机数的范围
					if((randomNum >= 48 && randomNum <= 57) || (randomNum >= 65 && randomNum <= 90) || (randomNum >= 97 && randomNum <= 122)){
						//将随机数的unicode码转为字符并写入变量vertify
						vertify += String.fromCharCode(randomNum);
						i++;
					}
				}
				return vertify;
			},
			next(){
				const that = this;
				const reg = /^1[3|4|5|7|8]\d{9}$/g;

				//当输入为空时
				if(that.phone == ""){
					alert('手机号不能为空');
					return;
				}

				//判断格式是否正确
				if(!reg.test(that.phone)){
					alert('手机格式错误');
					return;
				}
				//判断验证码是否正确
				if(that.vertify.toLowerCase() != that.inputVertify.toLowerCase()){
					alert('请输入正确的验证码');
					return;
				}
				//跳转页面
				window.location = `changePW?phone=${ that.phone }`;
			}
		},
		data: function (){
			return {
				vertify: '',
				phone: '',
				inputVertify: ''
			}
		},
		computed: {

		},
		created: function (){
			const that = this;
			that.vertify = that.createVertify();
		},
		watch: {

		}
	}
</script>
<style lang="sass">
@import "../css/reset.css";
body{
	font-family: "宋体";
}
#content{
	width:100%;
	min-height:500px;
	.wrapper{
		width:980px;
		margin:20px auto 0;
		.steps{
			height:34px;
			background:url("../img/mod_sub_nav.png") no-repeat;
			li{
				line-height:34px;
				width:175px;
				padding-left:66px;
				float: left;
			}
			.now_steps{
				background:url("../img/sub_nav_1.png");
				color:#2e82ff;
			}
		}
		.confirm_user{
			margin-top:35px;
			font-size:0;
			input{
				width:300px;
				height:35px;
				padding-left:15px;
				font-size:14px;
				margin-bottom: 15px;
			}
			.vertify{
				width:180px;
				margin-right:20px;
			}
			.vertify_text{
				width:98px;
				display: inline-block;
				height:37px;
				vertical-align: top;
				border:1px solid #aaa;
				cursor:pointer;
				font-size:25px;
				letter-spacing: 5px;
				line-height:37px;
				text-align: center;
			}
			.confirm_user_bt{
				display: block;
				width:319px;
				height:39px;
				background:#3f89ec;
				border-radius: 3px;
				text-align: center;
				line-height:39px;
				font-size:16px;
				color:#fff;
				font-weight: bold;
				cursor:pointer;
			}
		}
	}
}
</style>

