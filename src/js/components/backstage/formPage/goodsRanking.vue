<template>
	<div class="goods_ranking" @click="sa">
		<p class="header_text">销量排行</p>
		<div class="box">
			<table class="a">
				<tr>
					<th class="ranking">销量排名</th>
					<th class="name">货物名称</th>
					<th class="num">销量数目</th>
				</tr>
				<template v-for="(item, index) in arr">
					<tr>
						<td>{{ index+1 }}</td>
						<td>{{ item[0] }}</td>
						<td>{{ item[1] }}</td>
					</tr>
				</template>
			</table>
			<select class="select_time">
				<option value="90">最近三个月</option>
				<option value="30" selected>最近一个月</option>
				<option value="10">最近十天</option>
				<option value="5">最近五天</option>
			</select>
		</div>
	</div>
</template>
<script type="text/javascript">
	export default{
		components: {
			
		},
		mounted(){
			
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
				return this.$store.state.rankingList;
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
.goods_ranking{
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
}
</style>