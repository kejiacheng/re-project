<template>
	<div id="content">
		<div class="wrapper">
			<div class="content_left">
				<div class="ingredients" @click="ing_click">
					<p class="title">主料选择<span>(最多1种)</span>
					</p>
					<div class="ingredients_items">
						<template v-for="item in ingredients">
							<div :class="item.className" class="item">
								<img :src="'../img/'+item.pic" :alt="item.name">
								<p class="item_name">{{ item.name }}</p>
								<p class="item_price">价格：<span class="price_num">{{ item.price }}</span></p>
								<p class="add_item">
									<i class="fa fa-plus"></i>
								</p>
							</div>
						</template>
					</div>
				</div>
				<div class="accessories" @click="acc_click">
					<p class="title">辅料选择<span>(任意选择)</span></p>
					<div class="accessories_items">
						<template v-for="item in shopping_list.accessories">
							<div :class="item.className" class="item">
								<div class="item_left">
									<img :src="'../img/'+item.pic" :alt="item.name">
									<p class="item_name">{{ item.name }}</p>
								</div>
								<div class="item_right">
									<div class="right_content">
										<p class="item_price">价格：<span class="num">{{ item.price }}</span><span>元/份</span></p>
										<p class="item_num">数量：<span>{{ item.num }}</span></p>
										<div class="add_sub" onselectstart="return false">
											<i class="fa fa-plus add num_bt"></i>
											<i class=" fa fa-minus sub num_bt"></i>
										</div>
										<p class="totol_price">总计：<span>{{ (item.num * item.price).toFixed(1) }}</span></p>
									</div>
								</div>
							</div>
						</template>
					</div>
				</div>
			</div>
			<div class="content_right">
				<div class="tips">
					<p class="tips_title">选购须知</p>
					<ul class="fa-ul">
						<li><i class="fa-li fa fa-sun-o fa-spin"></i>各种配料随您喜好随意搭配,主料最多只可选择<span class="important_word">1</span>种，辅料类目数量<span class="important_word">任你选择</span>，每份大约为<span class="important_word">30ml</span>,每种类目最多可添加<span class="important_word">3份</span>。</li>
                        <li><i class="fa-li fa fa-sun-o fa-spin"></i>配料进行<span class="important_word">消菌</span>冰冻贮藏，可储存<span class="important_word">X</span>个月，请放心使用。</li>
                        <li><i class="fa-li fa fa-sun-o fa-spin"></i>选购完，请点击选购完成按钮并确认需支付价格，进入支付页面</li>
                        <li><i class="fa-li fa fa-sun-o fa-spin"></i>支付完毕，请从<span class="important_word">右侧出口处</span>拿取产品，欢迎下次光临。</li>
					</ul>
				</div>
				<div class="ranking_list">
                    <p class="ranking_list_title">月售排行</p>
                    <ul>
                    	<template v-for="(item,index) in ranking_list">
                    		<li><i :class="[index < 3 ? 'top_3' : 'not_top']">{{ index+1 }}</i><span :title="item.name">{{ item.name }}</span><strong>{{ item.num }}</strong></li>
                    	</template>
                    </ul>
                </div>
			</div>
			<div class="complete_bt" @click.stop="">
				<div class="complete_bt_text" @click="complete_bt">选购完成</div>
		        <div class="complete_box">
		            <div class="header">
		                <div class="header_text">
		                    <span>|</span>
		                    购物清单
		                </div>
		                <div class="clear_goods" @click="clear">
		                    <i class="fa fa-trash"></i>
		                    <span>清空物品</span>
		                </div>
		            </div>
		            <div class="content">
		                <div class="tips">
		                    <i class="fa fa-exclamation" style="color:red"></i>
		                        以下是您的购物清单
		                </div>
		                <div class="have_goods" v-show="has_ingredients">
		                    <div class="all_items">
	                    		<div class="selected_items" v-show="shopping_list.ingredients.dom">
		                    		<span class="selected_items_name">{{ shopping_list.ingredients.name }}</span>
		                    		<div class="selected_items_right">
		                    			<span class="selected_items_price">{{ shopping_list.ingredients.price }}</span>
		                    			<div class="num_box">
		                    				<img class="minus_num" :src="'../img/minus.png'"/>
		                    				<span class="selected_items_num">1</span>
		                    				<img class="add_num" :src="'../img/add.png'"/>
		                    			</div>
		                    		</div>
		                    	</div>
		                    	<template v-for="item in shopping_list.accessories">
			                    	<div class="selected_items" v-show="item.num != 0">
			                    		<span class="selected_items_name">{{ item.name }}</span>
			                    		<div class="selected_items_right">
			                    			<span class="selected_items_price">{{ (item.price*item.num).toFixed(1) }}</span>
			                    			<div class="num_box">
			                    				<img class="minus_num" :src="'../img/minus.png'" @click="minus"/>
			                    				<span class="selected_items_num">{{ item.num }}</span>
			                    				<img class="add_num" :src="'../img/add.png'" @click="add"/>
			                    			</div>
			                    		</div>
			                    	</div>	
		                    	</template>
		                    </div>
		                    <div class="selected_items_totol_price">
		                        <span class="confirm_bt" onselectstart="return false" @click="payment">确认支付</span>
		                        总计：
		                        <span class="price_num">{{ totol_price }}</span>
		                    </div>
		                </div>
		                <div class="not_have" v-show="!has_ingredients">
		                    您尚未选择主料！
		                </div>
		            </div>
		        </div>
			</div>
		</div>
		<div class="shade"></div>	
	</div>
</template>
<script type="text/javascript">
	import {addEvents, removeEvents,hasClass, addClass, removeClass} from '../../function/function.js' 
	export default{
		components: {
			
		},
		mounted(){
			this.$http.post('/backstage')
			.then((result) => {
				var json = {};
				//将ingredients和accessories数据转换成json格式
				result.body.forEach((e) => {
					var str = '';
					str += e.ingredients.name + '*1,';
					for(let i in e.accessories){
						str = str + i + '*' + e.accessories[i].num + ',';
					}
					str = str.substring(0,str.length-1);
					if(!json[str]){
						json[str] = 1;
					}else{
						json[str] += 1;
					}
				})
				//将json格式转变为数组，方便sort
				var arr = [];
				for(let i in json){
					var middle = [];
					middle.push(i,json[i]);
					arr.push(middle);
				}
				//将二维数据根据数量进行排序
				arr.sort((a, b) => b[1]-a[1]);
				//取出数组前10个项
				arr = arr.slice(0,10);
				console.log(arr);
				arr.forEach((Arr) => {
					var json = {name: Arr[0], num: Arr[1]};
					this.ranking_list.push(json);
				})
			})
		},
		methods: {
			ing_click(e){
				const that = this;
				//用三目运算符获取正确DOM元素
				const target = e.target.className == 'add_item'
					? e.target.parentNode
					: e.target.parentNode.className == 'add_item'
					? e.target.parentNode.parentNode
					: null;

				if(target){
					//获取ingredients名字和价格DOM
					const item_name = target.getElementsByClassName('item_name')[0].innerHTML;
					const price_num = target.getElementsByClassName('price_num')[0].innerHTML;

					//判断ingredients是否已选择
					if(that.shopping_list.ingredients.dom){
						//若已选择则移除原先DOM的selected类
						removeClass(that.shopping_list.ingredients.dom,'selected');
					}
					//添加目标DOM的selected类并且修改DATA中的缓存DOM
					addClass(target,'selected');
					that.shopping_list.ingredients.dom = target;
					that.shopping_list.ingredients.name = item_name;
					that.shopping_list.ingredients.price = price_num;
				}
			},
			acc_click(e){
				const that = this;
				//使用三目获取正确DOM
				const target = hasClass(e.target,'num_bt') ? e.target.parentNode.parentNode.parentNode.parentNode : null;
				if(target){
					//使用三目判断是加还是减
					const sign = hasClass(e.target,'add')
						? 'add'
						: hasClass(e.target,'sub')
						? 'sub'
						: null;

					//获取名字和价格
					const item_name = target.getElementsByClassName('item_name')[0].innerHTML;
					const item_price = target.getElementsByClassName('num')[0].innerHTML;

					//根据符号进行货物数量的加减
					if(Object.is(sign, 'add')){
						if(that.shopping_list.accessories[item_name].num < 3){
							that.shopping_list.accessories[item_name].num++;
						} 
					}else if(Object.is(sign, 'sub')){
						if(that.shopping_list.accessories[item_name].num > 0){
							that.shopping_list.accessories[item_name].num--;
						}
					}
				}
			},
			complete_bt(){
				const that = this;
				const shade = document.getElementsByClassName('shade')[0];
				const body = document.body;
				const body_height = body.clientHeight;//获取body高度
				const complete_box = document.getElementsByClassName("complete_box")[0],
					complete_bt = document.getElementsByClassName("complete_bt")[0],
					comlete_box_height = complete_box.offsetHeight,
					complete_bt_height = complete_bt.offsetHeight;

				const shade_style = shade.style;
				//改变遮蔽层样式
				shade_style.height = body_height + 'px';
				shade_style.display = 'block';
				//改变complete_box的top触发动画效果
				complete_box.style.top = -comlete_box_height + complete_bt_height + 'px';
				
				//body点击事件函数
				const body_click = () => {
					shade_style.display = 'none';
					complete_box.style.top = complete_bt_height + 'px';
					removeEvents(body,'click',body_click);
				}
				//添加body点击事件
				addEvents(body,'click',body_click);
			},
			add(e){
				const that = this;
				//获取目标DOM
				const target = e.target.parentNode.parentNode.parentNode;
				//获取该DOM的名字
				const name = target.getElementsByClassName('selected_items_name')[0].innerHTML;

				if(that.shopping_list.accessories[name].num < 3){
					that.shopping_list.accessories[name].num++;
				}
			},
			minus(e){
				const that = this;
				//获取目标DOM
				const target = e.target.parentNode.parentNode.parentNode;
				//获取该DOM的名字
				const name = target.getElementsByClassName('selected_items_name')[0].innerHTML;

				if(that.shopping_list.accessories[name].num > 0){
					that.shopping_list.accessories[name].num--;
				}

				const complete_box = document.getElementsByClassName('complete_box')[0];
				//获取物品一栏的高度
				const selected_items = document.getElementsByClassName('selected_items')[0];
				const selected_items_height = selected_items.offsetHeight;

				//获取complete_box的top值并且去掉px
				const now_top = parseFloat(complete_box.style.top);
				//当该物品个数为0，则改变top
				if(Object.is(that.shopping_list.accessories[name].num, 0)){
					complete_box.style.top = now_top + selected_items_height + 'px';
				}
			},
			clear(){
				const that = this;

				const complete_box = document.getElementsByClassName("complete_box")[0],
					complete_bt = document.getElementsByClassName("complete_bt")[0];

				for(let i in that.shopping_list.ingredients){
					that.shopping_list.ingredients[i] = null;
				}

				for(let i in that.shopping_list.accessories){
					that.shopping_list.accessories[i].num = 0;
				}
				
				//用setTimeout使complete_box的高度变化发生在改变complete_box.style.top之前
				// const timer = setTimeout(() => {
				// 	complete_box.style.top = -complete_box.offsetHeight + complete_bt.offsetHeight + 'px';
				// 	clearTimeout(timer);
				// },0)
				//与上面注释段同理
				this.$nextTick(() => {
					complete_box.style.top = -complete_box.offsetHeight + complete_bt.offsetHeight + 'px';
				})
			},
			payment(){
				const that = this;
				//用sessionStorage传值
				sessionStorage.setItem('ingredients_name', that.shopping_list.ingredients.name);
				sessionStorage.setItem('ingredients_price', that.shopping_list.ingredients.price);
				//拼接accssories字符串，让支付页面可以json解析
				let accessories = '{';
				//不将数量为0的辅料填写进去
				for(let i in that.shopping_list.accessories){
					if(!Object.is(that.shopping_list.accessories[i].num, 0)){
						accessories += '"' + that.shopping_list.accessories[i].name + '"' + ': { "price":' + that.shopping_list.accessories[i].price + ', "num":' + that.shopping_list.accessories[i].num + "},"
					}
				}
				//去除末尾的,
				accessories = accessories.substring(0,accessories.length-1);
				accessories += "}";
				sessionStorage.setItem('accessories', accessories);
				//总价
                that.$http.post('/totolPrice', {totolPrice: that.totol_price})
					.then(result => {
					    if(result.body.success){
                            window.location = 'payment.html';
						}
					});
			}
		},
		data(){
			return {
				ingredients: [{className:'green_tea',pic:'green_tea.jpg',name:'绿茶',price:'2.5'},{className:'red_tea',pic:'red_tea.jpg',name:'红茶',price:'2.5'},{className:'apple',pic:'apple.jpg',name:'苹果汁',price:'3.5'},{className:'lemon',pic:'lemon.jpg',name:'柠檬汁',price:'3.5'},{className:'peach',pic:'peach.jpg',name:'蜜桃汁',price:'3.5'},{className:'mango',pic:'mango.jpg',name:'芒果汁',price:'4.0'},{className:'orange',pic:'orange.jpg',name:'鲜橙汁',price:'3.5'}],
				ranking_list: [], 
				shopping_list: {//购物清单
					ingredients: {
						price: null,
						name: null,
						dom: null
					},
					accessories: {
						蜂蜜:{
							className: 'honey',
							pic: 'honey.jpg',
							name: '蜂蜜',
							price: '1.0',
							num: 0
						},
						椰果:{
							className: 'coconut',
							pic: 'coconut.jpg',
							name: '椰果',
							price: '0.8',
							num: 0
						},
						果葡糖浆:{
							className: 'HFCS',
							pic: 'HFCS.jpg',
							name: '果葡糖浆',
							price: '0.5',
							num: 0
						}
					}
				}
			}
		},
		computed: {
			totol_price(){//计算总价
				let accessories_price = 0;
				for(let i in this.shopping_list.accessories){
					accessories_price += parseFloat((this.shopping_list.accessories[i].price * this.shopping_list.accessories[i].num).toFixed(1));
				}
				return parseFloat(this.shopping_list.ingredients.price) + accessories_price;
			},
			has_ingredients(){//判断是否选购了主料
				return this.shopping_list.ingredients.dom ? true : false;
			},
			complete_bt_height(){//计算高度
				const complete_box = document.getElementsByClassName("complete_box")[0],
					complete_bt = document.getElementsByClassName("complete_bt")[0],
					comlete_box_height = complete_box.offsetHeight,
					complete_bt_height = complete_bt.offsetHeight;
				return complete_bt_height + complete_box_height + 'px';
			}
		},
		created(){
			
		},
		watch: {
			//深度观察
			'shopping_list.ingredients.dom':{
				handler: function (newEle,oldEle){
					if(!newEle){
						this.removeClass(oldEle,'selected')
					}
				},
				deep: true
			}
		}
	}
</script>
<style lang="sass">
	#content{
		margin-top: 30px;
		width: 100%;
		background: #f5f5f5;
		.wrapper{
			$allWidth: 1200px;
			$paddingWidth: 20px;
			$leftWidth: 808px;
			$rightWidth: $allWidth - 2 * $paddingWidth - $leftWidth;
			$mic: "微软雅黑";
			width: $allWidth;
			margin: 0 auto;
			background: url(../../../img/productBg.png);
			padding: $paddingWidth 30px;
			box-sizing: border-box;
			font-size: 0;
			.content_left{
				width: $leftWidth;
				display: inline-block;
				.title{
					font-size: 24px;
					font-family: $mic;
					span{
						font-size: 20px;
						color: red;
					}
				}
				.selected{
					border-color: red;
					box-shadow: 0 0 0 3px red inset;
					border-radius: 60px;
				}
				img{
					width: 100px;
					height: 100px;
					border-radius: 50%;
				}
				.item_name{
					font-family: $mic;
					margin-bottom: 12px;
				}
				.item_price{
					font-weight: 600;
					margin-bottom: 12px;
					span{
						color: #FE0048;
					}
				}
				.ingredients{
					font-size: 16px;
					.ingredients_items{
						margin: 15px 0;
						&:after{
							content: "";
							display: table;
							clear: both;
						}
						.item{
							width: 200px;
							height: 250px;
							border: 1px solid transparent;
							float: left;
							margin-bottom: 5px;
							text-align: center;
							img{
								margin: 22px 0 12px;
							}
							.add_item{
								width: 30px;
								height: 30px;
								background: #ff8a06;
								border-radius: 50%;
								margin: 0 auto;
								cursor: pointer;
								.fa-plus{
									margin-top: 5px;
									margin-left: 1px;
									font-size: 22px;
									color: #fff;
								}
							}
						}
					}
				}
				.accessories{
					.accessories_items{
						margin: 15px 0;
						&:after{
							content: "";
							display: table;
							clear: both;
						}
						.item{
							width: 345px;
							height: 175px;
							padding-left: 50px;
							font-size: 0;
							float: left;
							.item_left{
								width: 145px;
								text-align: center;
								display: inline-block;
								font-size: 16px;
								vertical-align: top;
								img{
									margin: 12px 0;
								}
							}
							.item_right{
								width: 175px;
								margin-left: 25px;
								display: inline-block;
								font-size: 16px;
								text-align: left;
								.right_content{
									margin-top: 30px;
									border-right: 2px solid #333;
									@mixin spanStyle{
										display: inline-block;
										text-align: center;
										width: 20px;
										color: #FE0048;
									}
									.item_num{
										margin-top: 10px;
										font-weight: 600;
										display: inline-block;
										vertical-align: top;
										span{
											@include spanStyle;
										}
									}
									.add_sub{
										margin-top: 10px;
										display: inline-block;
										i{
											cursor: pointer;
											color: #545050;
										}
									}
									.totol_price{
										font-weight: 600;
										margin-top: 20px;
										span{
											@include spanStyle;
										}
									}
								}
							}
						}
					}
				}
			}
			.content_right{
				font-size: 16px;
				width: 332px;
				display: inline-block;
				vertical-align: top;
				.tips{
					width:320px;
					margin-bottom: 30px;
					.tips_title{
						text-align: center;
						font-size:24px;
						margin-bottom:20px;
						font-family: $mic;
					}
					ul{
						li{
							display:block;
							letter-spacing: 1px;
							line-height:20px;
							padding-left:5px;
							margin-bottom: 10px;
							.important_word{
								color:red;
								font-weight: 600;
							}
							i{
								color:red;
								font-weight: 600;
							}
						}
					}
				}
				.ranking_list{
					.ranking_list_title{
						text-align: center;
						font-size:24px;
						margin-bottom:20px;
						font-family: $mic;
					}
					ul{
						margin-left:10px;
						li{
							font-size:13px;
	    					padding:9px 0;
	    					i{
	    						float:left;
							    display:inline-block;
							    text-align: center;
							    line-height:15px;
							    width:15px;
							    height:15px;
							    font-style:normal;
							    margin-right:15px;
	    					}
	    					i.top_3{
	    						background:#ff7f42;
	    						color:white;
	    					}
	    					span{
	    						width:232px;
							    -webkit-line-clamp: 1;
							    -webkit-box-orient: vertical;
							    display: -webkit-box;
							    overflow: hidden;
							    float:left;
							    line-height:15px;
							    margin-right:8px;
							    color:#444;
	    					}
	    					strong{
	    						color: #ff1c4d;
	    						font-weight: 600;
	    					}
						}
					}
				}
			}
			.complete_bt{
				$complete_bt_width: 120px;
				$complete_box_width: 400px;
				width: $complete_bt_width;
				height: 40px;
				position: fixed;
				bottom: 0;
				left: calc(50% - #{$complete_bt_width / 2});
				left: -webkit-calc(50% - #{$complete_bt_width / 2});
				left: -moz-calc(50% - #{$complete_bt_width / 2});
				background: #4941FD;
				border-radius: 50% 50% 0 0;
				text-align: center;
				line-height: 45px;
				color: #fff;
				font-family: $mic;
				cursor: pointer;
				z-index: 100;
				font-size: 16px;
				.complete_box{
					width: $complete_box_width;
					min-height: 135px;
					position: absolute;
					left: calc(#{$complete_box_width / -2} + #{$complete_bt_width/2});
					background: white;
					top: 40px;
					transition: top linear 0.3s;
					cursor: default;
					.header{
						height: 35px;
						width: 100%;
						background: #f1f1f1;
						.header_text{
							width: 20%;
							color: black;
							line-height: 34px;
							font-size: 13px;
							float: left;
							span{
								font-weight: 900;
								vertical-align: 1px;
								color: #2800DE;
							}
						}
						.clear_goods{
							width: 20%;
							float: right;
							line-height: 35px;
							color: black;
							cursor: pointer;
							span{
								font-size: 13px;
							}
						}
					}
					.content{
						padding: 0 15px;
						min-height: 100px;
						.tips{
							height: 25px;
							color: black;
							font-size: 12px;
							line-height: 25px;
							text-align: left;
							border-bottom: 1px solid #ccc;
						}
						.have_goods{
							.all_items{
								.selected_items{
									width: 100%;
									height: 45px;
									border-bottom: 1px solid #ccc;
									box-sizing: border-box;
									padding: 10px 5px;
									color: black;
									line-height: 25px;
									text-align: left;
									.selected_items_name{
										font-size: 14px;
									}
									.selected_items_right{
										float: right;
										display: inline-block;
										height: 25px;
										.selected_items_price{
											margin-right: 20px;
											font-size: 14px;
											color: #EF0000;
										}
										.num_box{
											display: inline-block;
											vertical-align: bottom;
											img{
												width: 20px;
												vertical-align: top;
												margin-top: 4px;
												cursor: pointer;
											}
											.selected_items_num{
												margin: 0 4px 0 3px;
												color: #6052FB;
												font-size: 13px;
											}
										}
									}
								}
							}
							.selected_items_totol_price{
								height: 30px;
								text-align: right;
								color: black;
								line-height: 30px;
								font-size: 14px;
								margin-right: 5px;
								.confirm_bt{
									float: left;
									margin-left: 5px;
									color: #4003FF;
									cursor: pointer;
									font-weight: 600;
								}
								.price_num{
									color: #EF0000;
								}
							}
						}
						.not_have{
							color: #6E6E6E;
							line-height: 100px;
						}
					}
				}
			}
		}
		.shade{
		    z-index:99;
		    background:#e3e3e3;
		    position:absolute;
		    top:0;
		    left:0;
		    width:100%;
		    opacity:0.5;
		    filter:Alpha(opacity=50);
		    display:none;
		}	
	}
	
</style>