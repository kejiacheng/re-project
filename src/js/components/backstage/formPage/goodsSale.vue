<template>
	<div class="goods_sale">
		<p class="header_text">销售记录</p>
		<div class="box">
			<table>
				<tr>
					<th class="name ">销售物品</th>
					<th class="price">销售价格</th>
					<th class="people">购买者</th>
					<th class="time">销售时间</th>
				</tr>
				<template v-for="(item, index) in arr">
					<tr :data-index="index" v-show="index < ((nowPage*10)) && index > (((nowPage - 1)*10) - 1)">
						<td>{{ item[0] }}</td>
						<td>{{ item[1] }}</td>
						<td>{{ item[2] }}</td>
						<td>{{ item[3] }}</td>
					</tr>
				</template>
			</table>
			<select class="select_time" @change="time">
				<option value="30" selected>最近一个月</option>
				<option value="10">最近十天</option>
				<option value="5">最近五天</option>
			</select>
			<div class="page_box" onselectstart="return false;">
				<a class="first_page" :class="{ disable: Object.is(nowPage, 1) }" @click="firstPage">首页</a>
				<a class="prev_page" :class="{ disable: Object.is(nowPage, 1) }" @click="prevPage">上一页</a>
				<span v-show="nowPage - offsetPage > 1">...</span>
				<div class="num_page_box" @click="setPageNum">
					<a class="num_page" v-for="n in totalPage" v-show="n >= nowPage - offsetPage && n <= nowPage + offsetPage" :class="{ active: Object.is(nowPage, n) }">{{ n }}</a>
				</div>
				<span v-show="nowPage + offsetPage < totalPage">...</span>
				<a class="next_page" :class="{ disable: Object.is(nowPage, totalPage) }" @click="nextPage">下一页</a>
				<a class="last_page" :class="{ disable: Object.is(nowPage, totalPage) }" @click="lastPage">尾页</a>
			</div>
		</div>
	</div>
</template>
<script type="text/javascript">
	export default{
		components: {
			
		},
		methods: {
			time(e){
				const value = e.target.value;
				const that = this;
				if(Object.is(value, '5')){
					that.$store.commit('getGoodsSale', that.$store.getters.five);
				}else if(Object.is(value, '10')){
					that.$store.commit('getGoodsSale', that.$store.getters.ten);
				}else if(Object.is(value, '30')){
					that.$store.commit('getGoodsSale', that.$store.state.goodsList);
				}
			},
			setPageNum(e){
				if(Object.is(e.target.nodeName.toLowerCase(), 'a')){
					this.nowPage = parseInt(e.target.innerHTML);
				}else{

				}
			},
			firstPage(){
				this.nowPage = 1;
			},
			lastPage(){
				this.nowPage = totalPage;
			},
			prevPage(){
				if(this.nowPage > 1){
					this.nowPage--;
				}
			},
			nextPage(){
				if(this.nowPage < this.totalPage){
					this.nowPage++;
				}
				
			}
		},
		props: [],
		data: function (){
			return {
				nowPage: 1,  //当前页数
				totalPage: 1,  //总页数
				offsetPage: 2  //页数偏移量
			}
		},
		computed: {
			arr(){
				this.totalPage = Math.ceil((Object.is(this.$store.state.goodsSale.length, 0) ? 1 : this.$store.state.goodsSale.length)/ 10);
				return this.$store.state.goodsSale;
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
		height: 550px;
		table{
			.isShow{
				background:red;
			}
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
		.page_box{
			width:550px;
			font-size:0;
			position:absolute;
			bottom: 0;
			left: 230px;
			a{
				display: inline-block;
				font-size:13px;
				width:25px;
				height:25px;
				text-align: center;
				line-height:27px;
				margin:0 5px;
				border:1px solid #333;
				color:#000;
				cursor:pointer;
				background: #fafafa;
			}
			.num_page_box{
				display: inline-block;
			}
			span{
				font-size: 13px;
			}
			.num_page{
				border-color: #00bc9b;
			}
			.first_page,.last_page{
				width: 40px;
			}
			.prev_page,.next_page{
				width: 60px;
			}
			.disable{
				opacity:0.5;
			}
			.active{
				color: white;
				background: #00bc9b;
			}
		}
	}
}
</style>