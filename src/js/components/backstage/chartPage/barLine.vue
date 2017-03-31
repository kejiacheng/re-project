<template>
	<div class="bar_line">
		<div class="condition_select">
			<select class="chart_type">
				<option>柱状图</option>
				<option>折线图</option>
			</select>
			<div class="goods_wrapper">
				<input class="goods" readonly v-model="nowGoodsName" @click="showSelect">
				<div class="select_goods" v-show="select_goods" @click="selectGoods">
					<div class="item">全部</div>
					<template v-for="(item, key) in goodsNameJson">
						<div class="item">{{ key }}</div>
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
			
			async function setData(){
				await that.getGoodsJson();
				that.transformGoodsJson(that.goodsList);
				console.log(that.goodsNameJson);
				console.log(that.goodsDateJson);
				// for(let i in that.goodsNameJson){
				// 	console.log(i);
				// 	for(let j in that.goodsNameJson[i]){
				// 		console.log(j);
				// 	}
				// }
				that.supplyJson(that.goodsDateJson)
				let arr = that.jsonToArray(that.goodsDateJson);
				var canvas = document.getElementById("canvas");
				var ctx = canvas.getContext("2d");

				
				var bar_chart1 = new bar_chart(arr);
				bar_chart1.draw(ctx);
			}
			setData()
			// var arr=[["10.28",120],["10.29",20],["10.30",53],["10.31",22],["11.01",13],["11.02",34],["11.03",32],["11.04",49],["11.05",62],["11.06",20],["11.07",120],["11.08",230],["11.09",211]];
			// var canvas = document.getElementById("canvas");
			// var ctx = canvas.getContext("2d");

			
			// var bar_chart1 = new bar_chart(arr);
			// bar_chart1.draw(ctx);
		},
		methods: {
			init(){//将初始的起始和结尾时间写入
				const that = this;
				let startTime = new Date();
				let endTime = new Date();
				startTime.setDate(startTime.getDate() - 15)
				that.endTime = format_time(endTime);
				that.startTime = format_time(startTime);
			},
			showSelect(){
				this.select_goods = true;
			},
			selectGoods(e){
				if(Object.is(e.target.className, 'item')){
					this.nowGoodsName = e.target.innerHTML;
				}
				this.select_goods = false;
			},
			getGoodsJson(){//根据时间从后台获取货物数据
				const that = this;
				return that.$http.post('/barLine', { startTime: that.startTime, endTime: that.endTime })
				.then((result) => {
					that.goodsList = result.body;
				})
			},
			transformGoodsJson(json){//将原始json转变为以货物为key和时间为key的两个JSON
				let nameJson = {};
				let dateJson = {};
				for(let i in json){
					//写出namejson
					let str = '';
					str += json[i].ingredients.name + '*1';
					for(let j in json[i].accessories){
						str += j + '*' + json[i].accessories[j].num;
					}
					if(!nameJson[str]){
						nameJson[str] = {
							[json[i].date]: 1
						}
					}else{
						if(!nameJson[str][json[i].date]){
							nameJson[str][json[i].date] = 1;
						}else{
							nameJson[str][json[i].date]++;
						}
					}
					//写出dateJson
					let date = String(json[i].date).substring(4,8);
					if(!dateJson[date]){
						dateJson[date] = 1;
					}else{
						dateJson[date]++;
					}
				}
				this.goodsNameJson = nameJson;
				this.goodsDateJson = dateJson;
			},
			supplyJson(json){
				//将时间格式从2088-12-12转变为1212
				const start = Number(this.startTime.replace(/-/g,'').substring(4));
				const end = Number(this.endTime.replace(/-/g,'').substring(4));

				for(let i = start;i<=end;i++){
					//当月份小于10时在前面添加0
					if(i<1000){
						i = '0' + i;
					}
					//判断该日期是否需补充
					if(!json[i]){
						json[i] = 0
					}
				}
			},
			jsonToArray(json){//将json转为Array
				let arr = [];
				//将json里的数据push到数组里
				for(let i in json){
					arr.push([i,json[i]]);
				}
				//根据时间从小到大排序
				arr.sort((a,b) => a[0]-b[0])
				return arr;
			}
		},
		props: [],
		data: function (){
			return {
				startTime: '',
				endTime: '',
				nowGoodsName: '全部',
				select_goods: false,
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