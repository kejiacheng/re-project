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
					<div class="item">全部</div>
					<template v-for="item in goodsNameJson">
						<div class="item">{{ item.name }}</div>
					</template>
				</div>
			</div>
			<input class="start" onclick="laydate()" v-model="startTime">
			<input class="end" onclick="laydate()" v-model="endTime">
			<a class="filter_bt">筛选</a>
		</div>
		<canvas id="canvas" width="980" height="450"></canvas>
	</div>
</template>
<script type="text/javascript">
	import {format_time} from '../../../function/function.js'
	import {bar_chart, line_chart} from '../../../function/chart.js'
	import "babel-polyfill"
	export default{
		components: {
			
		},
		mounted(){
			const that = this;
			that.init();
			
			async function a(){
				await that.getGoodsArray();
				that.getGoodsName(that.goodsList);
				for(let i in that.goodsNameJson){
					console.log(i);
					for(let j in that.goodsNameJson[i]){
						console.log(j);
					}
				}
			}
			a()
			.then((result) => {
				
			})
			// var arr=[["10.28",120],["10.29",20],["10.30",53],["10.31",22],["11.01",13],["11.02",34],["11.03",32],["11.04",49],["11.05",62],["11.06",20],["11.07",120],["11.08",230],["11.09",211]];
			// var canvas = document.getElementById("canvas");
			// var ctx = canvas.getContext("2d");

			
			// var bar_chart1 = new bar_chart(arr);
			// bar_chart1.draw(ctx);
		},
		methods: {
			init(){
				const that = this;
				let startTime = new Date();
				let endTime = new Date();
				startTime.setDate(startTime.getDate() - 15)
				that.endTime = format_time(endTime);
				that.startTime = format_time(startTime);
			},
			getGoodsArray(){
				const that = this;
				return that.$http.post('/barLine', { startTime: that.startTime, endTime: that.endTime })
				.then((result) => {
					that.goodsList = result.body;
				})
			},
			getGoodsName(json){
				let newJson = {};
				for(let i in json){
					let str = '';
					str += json[i].ingredients.name + '*1';
					for(let j in json[i].accessories){
						str += j + '*' + json[i].accessories[j].num;
					}
					if(!newJson[str]){
						newJson[str] = {
							[json[i].date]: 1
						}
					}else{
						if(!newJson[str][json[i].date]){
							newJson[str][json[i].date] = 1;
						}else{
							newJson[str][json[i].date]++;
						}
					}
				}
				this.goodsNameJson = newJson;
			}
		},
		props: [],
		data: function (){
			return {
				startTime: '',
				endTime: '',
				goodsList: {},
				goodsNameJson: {},
				goodsDateJson: {}
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