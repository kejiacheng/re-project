<template>
	<div id="header">
		<div class="register_logo">
			<div class="logo_title">
				饮料随搭
			</div>
			<div class="logo_title">
				欢迎注册
			</div>
			<div class="have_account">
				已有账号，返回<a href="index.html">首页</a>
			</div>
		</div>
	</div>
</template>
<script type="text/javascript">
	export default{
		components: {
			
		},
		methods: {

		},
		props: ["isLogin"],
		data: function (){
			return {
				
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
	#header{
		width: 100%;
		height: 110px;
		box-shadow: 0 1px 10px #dedede inset;
		background: #f4f4f4;
		.register_logo{
			width: 1200px;
			height: 76px;
			margin: 0 auto;
			padding-top: 20px;
			.logo_title:first-child{
				border-left: 0;
			}
			.logo_title{
				margin-top: 10px;
				margin-left: 40px;
				font-size: 20px;
				font-family: $mic;
				float: left;
				height: 34px;
				padding-left: 30px;
				border-left: 1px solid black;
			}
			.have_account{
				float: right;
				margin-top: 60px;
				a{
					color: blue;
				}
			}
		}
	}
</style>