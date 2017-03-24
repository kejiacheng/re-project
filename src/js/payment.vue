<template>
	<div id="main-content">
		<paymentHeader></paymentHeader>
		<div id="content">
			<div class="wrapper">
				<p class="content_text">以下为您所购买的产品!</p>
				<div class="selected_goods">
					<table class="list_name">
						<tbody>
							<tr>
								<th class="goods_name">物品名称</th>
								<th class="goods_num same_width">数量</th>
								<th class="goods_price same_width">单价</th>
								<th class="goods__totle_price same_width">总价</th>
							</tr>
							<tr>
								<td class="goods_name">{{ ingredients_name }}</td>
								<td class="goods_num same_width">1</td>
								<td class="goods_price same_width">{{ ingredients_price }}</td>
								<td class="goods__totle_price same_width">{{ ingredients_price }}</td>
							</tr>
							<template v-for="(item,index) in accessories">
								<tr>
									<td class="goods_name">{{ index }}</td>
									<td class="goods_num same_width">{{ item.num }}</td>
									<td class="goods_price same_width">{{ item.price }}</td>
									<td class="goods__totle_price same_width">{{ (item.num * item.price).toFixed(1) }}</td>
								</tr>
							</template>
							<tr>
								<td class="goods_name all_money" colspan="4">总计:<span>{{ totol_price }}</span>元</td>
							</tr>
						</tbody>
					</table>
				</div>
				<a class="payment_bt" @click="payment">提交支付</a>
			</div>
		</div>
		<paymentFooter></paymentFooter>
	</div>
</template>

<script type="text/javascript">
	import paymentHeader from './components/header.vue';
	import paymentFooter from './components/footer.vue';

	export default{
		components: {
			paymentHeader,
			paymentFooter
		},
		methods: {
			payment(){
				var that = this;
				//将数据传给后台
				that.$http.post("/payment", { ingredients_name: that.ingredients_name, ingredients_price: that.ingredients_price, accessories: that.accessories })
				.then((result) => {
					if(result.body == '支付完成'){
						window.location = "index.html";
					}
				})
			}
		},
		data: function (){
			return {
				ingredients_name: '',
				ingredients_price: 0,
				accessories: '',
				totol_price: 0
			}
		},
		computed: {

		},
		created(){
			var that = this;
			//获取sessionStorage里的数据
			that.ingredients_name = sessionStorage.getItem('ingredients_name');
			that.ingredients_price = sessionStorage.getItem('ingredients_price');
			that.accessories = JSON.parse(sessionStorage.getItem('accessories'));
			//计算总计
			that.totol_price += parseFloat(that.ingredients_price);

			for(let i in that.accessories){
				that.totol_price += parseFloat(that.accessories[i].price) * that.accessories[i].num;
			}
		},
		watch: {
			
		}
	}
</script>
<style lang="sass">
@import "../css/reset.css";
body{
	font-family: "宋体";
}
$mic:"微软雅黑";
#content{
	width:980px;
	margin:20px auto 0;
	min-height:500px;
	.wrapper{
		width:400px;
		.content_text{
			margin-bottom:12px;
			font-weight: 600;
			color:red;
		}
		.selected_goods{
			width:100%;
			table{
				width:700px;
				border:1px solid #aaa;
				th,td{
					text-align: center;
					border:1px solid #aaa;
					height:30px;
				}
				.goods_name{
					width:250px;
				}
				.same_width{
					width:150px;
				}
				.all_money{
					text-align: right;
					padding-right:40px;
					span{
						padding:0 5px;
						color:#FE0048;
						font-weight: 600;
					}
				}
			}
		}
		.payment_bt{
			display:block;
			width:85px;
			height:35px;
			background:#389cff;
			text-align: center;
			line-height: 35px;
			color:#fff;
			font-size:14px;
			font-family: $mic;
			border-radius: 3px;
			margin-top:15px;
			cursor:pointer;
		}
	}
	
}
</style>

