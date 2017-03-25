<template>
	<div id="header">
		<div class="wrapper">
			<i class="banner_text">后台管理中心</i>
			<ul class="clearfix">
				<li @click="formPage" class="formPage" :class="{ active: isNowPage }">表格</li>
				<li @click="chartPage" class="chartPage" :class="{ active: !isNowPage }">图形</li>
			</ul>
			<a class="back_home" href="index.html">返回首页</a>
			<span class="name"></span>		
		</div>
	</div>
</template>
<script type="text/javascript">
	import {addEvents, removeEvents, addClass, removeClass} from '../../function/function.js' 
	export default{
		components: {
			
		},
		mounted(){
			if(window.location.hash.replace('#/','') == 'chartPage'){
				this.isNowPage = false;
			}
		},
		methods: {
			formPage(){
				this.isNowPage = true;
				this.$emit('formPage');
			},
			chartPage(){
				this.isNowPage = false;
				this.$emit('chartPage');
			}
		},
		props: [],
		data(){
			return {
				isNowPage: true
			}
		},
		computed: {

		},
		created(){
			
		},
		watch: {

		}
	}
</script>
<style lang="sass">
	$mic:"微软雅黑";
	#header{
		width:100%;
		height: 45px;
		background:#8892BF;
		border-bottom:5px solid #4F5B93;
		.wrapper{
			width:1200px;
			margin:0 auto;
			%fontStyle{
				text-align: center;
				line-height: 45px;
				text-shadow: 0 -1px 0 rgba(0, 0, 0, 0.25);
				color:#E2E4EF;
				font-family: $mic;
			}
			ul{
				display: inline-block;
				vertical-align: top;
				li{
					float:left;
					cursor:pointer;
					width:80px;
					height:45px;
					font-size:14px;
					@extend %fontStyle;
				}
				li.active{
					background:#4F5B93;
				}
			}
			.banner_text{
				@extend %fontStyle;
				font-weight: 600;
				letter-spacing: 4px;
				margin-right:15px;
				font-size:26px;
			}
			.name{
				margin-right:50px;
			}
			.name,.back_home{
				float:right;
				text-align: center;
				line-height: 45px;
				color:#f1f1f1;
				font-weight: 600;
			}	
		}	
	}
</style>