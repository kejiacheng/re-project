<template>
	<div id="header">
		<div class="wrapper">
			<div class="logo">
				<a href="index.html"></a>
				<span class="text">欢迎登陆</span>
			</div>
			<a class="back_index" href="index.html">返回首页</a>
		</div>
	</div>
</template>
<script type="text/javascript">
	export default{
		components: {
			
		},
		methods: {

		},
		props: [],
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
	$headerHeight: 115px;
	#header{
		width: 100%;
		height: $headerHeight;
		border-bottom: 1px solid #dedede;
		.wrapper{
			width: 980px;
			margin: 0 auto;
			height: $headerHeight;
			position: relative;
			.logo{
				height: $headerHeight;
				line-height: $headerHeight;
				width: 250px;
				font-size: 0;
				a{
					display: inline-block;
					width: 50px;
					height: 65px;
					margin-right: 30px;
					background: url(../../img/header-pic.png);
					background-size: 50px 65px;
					vertical-align: middle;
				}
				.text{
					border-left: 1px solid #333;
					line-height: 62px;
					display: inline-block;
					padding-left: 25px;
					font-size: 26px;
					vertical-align: middle;
					color: #888;
					font-weight: 400;
					font-family: $mic;
				}
			}
			.back_index{
				font-size: 14px;
				position: absolute;
				right: 5px;
				bottom: 5px;
				color: blue;
			}
		}
	}
</style>