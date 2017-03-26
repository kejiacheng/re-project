<template>
	<div id="header">
		<div class="wrapper">
			<div class="logo">
	    		<img class="logo_img" src="../../../img/header-pic.png" alt="logo图片"/>
	    		<span class="logo_text">饮料随搭</span>
	    	</div>
	    	<div class="header_left">
	    		 <a v-if="!Login" class="bt" href="login.html">登录</a>
	    		 <a v-if="!Login" class="bt" href="register.html">注册</a>
	    		 <div class="personal_wrapper" v-if="Login" @mouseover="over" @mouseout="out">
	    		 	<a class="bt" href="javascript:void(0)">{{ username }}</a>
	    		 	<div class="personal_wrapper_box" v-show="personalShow">
	    		 		<ul class="personal_wrapper_box_list">
	    		 			<li><a>个人中心</a></li>
	    		 			<li v-if="loginway == 'staff'"><a href="backstage.html">后台中心</a></li>
	    		 			<li><a href="javascript:void(0)" @click="exit">退出</a></li>
	    		 		</ul>
	    		 	</div>
	    		 </div>
	    	</div>
		</div>
	</div>
</template>
<script type="text/javascript">
	export default{
		components: {
			
		},
		methods: {
			over(){
				this.personalShow = true;
			},
			out(){
				this.personalShow = false;
			},
			exit(){
				const that = this;
				const index = 1;
				//向后台发送退出信号
				that.$http.post('/', { index: index })
				.then((result) => {
					if(Object.is(result.body, '退出成功')){
						//退出成功触发exit事件让父元件得到响应
						this.$emit('exit');
					}
				})
			}
		},
		props: ["Login","phone","username","loginway"],
		data: function (){
			return {
				personalShow: false
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
	#header{
		$height: 63px;
		$borderWidth: 3px;
		height: $height;
		.wrapper{
			width: 100%;
			border-bottom: $borderWidth solid #ff8a06;
			min-width: 800px;
			font-weight: 600;
			background: #fff;
			position: fixed;
			top: 0;
			left: 0;
			z-index: 99;
			.logo{
				width: 140px;
				margin-left: 15px;
				.logo_img{
					height: $height - $borderWidth;
					vertical-align: -20px;
				}
			}
			.header_left{
				position: absolute;
				top: 0;
				right: 30px;
				font-size: 0;
				.bt{
					display:block;
					float:left;
					width:150px;
					height:60px;
					cursor:pointer;
					line-height:60px;
					text-align: center;
					color:#000;
					font-weight: 600;
					border-radius: 20px;
					font-size:16px;
					&:hover{
						background:#86ffec;
						color:#ff0068;
					}
				}
				.personal_wrapper{
					display: inline-block;
					position:relative;
					.personal_wrapper_box{
						position: absolute;
						top:60px;
						left:40px;
						width:70px;
						background:#fff;
						border:1px solid #dedede;
						ul{
							a{
								display:block;
								font-size:13px;
								text-align: center;
								width:100%;
								height:30px;
								line-height: 30px;
								cursor:pointer;
								color:#333;
								&:last-child{
									border-bottom:0;
								}
								&:hover{
									color:#f1f1f1;
									background:#38f;
								}
								li{							
								}
							}
						}
					}
				}
			}
		}
	}
</style>