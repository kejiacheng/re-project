<template>
	<div id="header">
		<div class="wrapper">
			<div class="logo">
	    		<img class="logo_img" src="../../img/header-pic.png" alt="logo图片"/>
	    		<span class="logo_text">饮料随搭</span>
	    	</div>
	    	<div class="header_left">
	    		 <a v-if="!isLogin" class="bt" href="">登录</a>
	    		 <a v-if="!isLogin" class="bt" href="">注册</a>
	    		 <div class="presonal_wrapper" v-if="isLogin">
	    		 	<a class="bt" href="">XX</a>
	    		 </div>
	    		 <div class="shopping_wrapper">
	    		 	<a class="bt">购物单</a>
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

		},
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
				}
				.shopping_wrapper{
					display: inline-block;
					position:relative;
				}
			}
		}
	}
</style>