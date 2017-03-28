<template>
	<div class="goods_rel item_box_list hidden">
		<p class="header_text">货物余量</p>
		<div class="box">
			<table>
				<tr>
					<th class="name">货物名称</th>
					<th class="num">货物余量</th>
				</tr>
				<template v-for="(item, index) in arr">
					<tr>
						<td>{{ index }}</td>
						<td>{{ item }}</td>
					</tr>
				</template>
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
		props: [],
		data: function (){
			return {
				
			}
		},
		computed: {
			arr(){
				return this.$store.state.relGoods;
			}
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
				color: #FFF;
				background: #00bc9b;
				font-weight: 600;
			}
			td{
				background: #fafafa;
			}
			th,td{
				border:1px solid #333;
				padding: 10px 15px;
				text-align: center;
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