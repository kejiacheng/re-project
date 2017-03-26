<template>
	<div class="goods_sale">
		<p class="header_text">销售记录</p>
		<div class="box">
			<table>
				<tr>
					<th class="name">销售物品</th>
					<th class="price">销售价格</th>
					<th class="people">购买者</th>
					<th class="time">销售时间</th>
				</tr>
			</table>
			<select class="select_time">
				<option value="90">最近三个月</option>
				<option value="30">最近一个月</option>
				<option value="10">最近十天</option>
				<option value="5" selected>最近五天</option>
			</select>
			<div class="page_box" onselectstart="return false;">
				<a class="fitst_page set_page">首页</a>
				<a class="prev_page set_page">上一页</a>
				<a class="num_page set_page">1</a>
				<a class="num_page set_page">2</a>
				<a class="num_page set_page">3</a>
				<a class="num_page set_page">4</a>
				<a class="next_page set_page">下一页</a>
				<a class="last_page set_page">尾页</a>
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
	$mic:"微软雅黑";
.goods_sale{
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
		.page_box{
			width:550px;
			margin:0 auto;
			font-size:0;
			a{
				display: inline-block;
				font-size:14px;
				width:22px;
				height:20px;
				text-align: center;
				line-height:20px;
				margin:0 5px;
				border:1px solid #333;
				color:#000;
				cursor:pointer;
				&:first-child,&:last-child{
					width:40px;
				}
			}
			strong{
				font-size:14px;
			}
			.prev_page,.next_page{
				width:60px;
			}
			.disable{
				opacity:0.5;
			}
			.hidden{
				display:none;
			}
			.active{
				color:white;
				background:#3E26D2;
				border-color:#3E26D2;
			}
		}
	}
}
</style>