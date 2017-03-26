<template>
	<div class="goods_rel item_box_list hidden">
		<p class="header_text">货物余量</p>
		<div class="box">
			<table>
				<tr>
					<th class="ranking">销量排名</th>
					<th class="name">货物名称</th>
					<th class="num">销量数目</th>
				</tr>
			</table>
		</div>
		<div class="update_num">
			<input type="text" class="name" placeholder="货物名称">
			<input type="text" class="num" placeholder="货物数量">
			<a class="update_bt">更新</a>
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
	$mic:"微软雅黑";
.goods_rel{
	.header_text{
		text-align: center;
		height:100px;
		font-size:34px;
		line-height:100px;
		font-weight: 600;
	}
	.box{
		position:relative;
		table{
			margin:0 auto 20px;
			border:1px solid #333;
			th{
				font-weight: 600;
			}
			th,td{
				border:1px solid #333;
				text-align: center;
				padding:0 10px;
				height:24px;
			}
			.ranking,.num,.name,.price,.time,.people,.rel_num{
				min-width:120px;
			}
		}
		.select_time{
			position:absolute;
			top:0;
			left:50px;
			width:130px;
			height:30px;
			padding-left:10px;
			font-family: $mic;
			font-size:14px;
		}
	}
	.update_num{
		width:260px;
		margin:0 auto;
		input{
			width:70px;
			height:30px;
			padding-left:8px;
			font-size:14px;
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
}
</style>