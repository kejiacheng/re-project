<template>
	<div class="bar_line">
		<div class="condition_select">
			<select class="chart_type">
				<option>柱状图</option>
				<option>折线图</option>
			</select>
			<div class="goods_wrapper">
				<input class="goods" readonly>
				<div class="select_goods">
				
				</div>
			</div>
			<input class="start" onclick="laydate()">
			<input class="end" onclick="laydate()">
			<a class="filter_bt">筛选</a>
		</div>
		<canvas id="canvas" width="980" height="450"></canvas>
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
.bar_line{
	.condition_select{
		height:50px;
		padding-left:110px;
		font-size:14px;
		select{
			width:100px;
			height:34px;
		}
		input{
			height:30px;
			padding-left:8px;
		}
		.goods_wrapper{
			display:inline-block;
			position:relative;
			font-size:12px;
			input{
				width:230px;
			}
			.select_goods{
				padding:0 10px;
				position:absolute;
				top:34px;
				left:0;
				width:220px;
				height:105px;
				background:#fff;
				border:solid #aaa;
				border-width:0 1px 1px 1px;
				overflow-y: scroll;
				display: none;
				.item{
					text-align: left;
					line-height:34px;
					height:34px;
					border-bottom:1px solid #aaa;
					cursor:pointer;
					&:hover{
						color:#000778;
					}
				}
			}
		}
	}
	#canvas{
		margin-left:80px;
	}
	a{
		display:inline-block;
		font-size:14px;
		width:70px;
		height:30px;
		vertical-align: top;
		border:2px solid #dedede;
		text-align: center;
		line-height:30px;
		background:#f7193f;
		border-radius: 20px;
		color:#fff;
		cursor:pointer;
	}
}
</style>