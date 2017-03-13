<template>
	<div id="content">
		<div class="wrapper">
			<div class="content_left">
				<div class="ingredients">
					<p class="title">主料选择<span>(最多1种)</span>
					</p>
					<div class="ingredients_items">
						<div class="green_tea item">
							<img src="../../img/green_tea.jpg">
							<p class="item_name">绿茶</p>
							<p class="item_price">价格：<span>2.5元</span>
							</p>
							<p class="add_item">
								<i class="fa fa-plus"></i>
							</p>
						</div>
						<div class="red_tea item">
							<img src="../../img/red_tea.jpg">
							<p class="item_name">红茶</p>
							<p class="item_price">价格：<span>2.5元</span>
							</p>
							<p class="add_item">
								<i class="fa fa-plus"></i>
							</p>
						</div>
						<div class="apple item">
							<img src="../../img/apple.jpg">
							<p class="item_name">苹果汁</p>
							<p class="item_price">价格：<span>3.5元</span>
							</p>
							<p class="add_item">
								<i class="fa fa-plus"></i>
							</p>
						</div>
						<div class="lemon item">
							<img src="../../img/lemon.jpg">
							<p class="item_name">柠檬汁</p>
							<p class="item_price">价格：<span>3.5元</span>
							</p>
							<p class="add_item">
								<i class="fa fa-plus"></i>
							</p>
						</div>
						<div class="peach item">
							<img src="../../img/peach.jpg">
							<p class="item_name">蜜桃汁</p>
							<p class="item_price">价格：<span>3.5元</span>
							</p>
							<p class="add_item">
								<i class="fa fa-plus"></i>
							</p>
						</div>
						<div class="mango item">
							<img src="../../img/mango.jpg">
							<p class="item_name">芒果汁</p>
							<p class="item_price">价格：<span>4.0元</span>
							</p>
							<p class="add_item">
								<i class="fa fa-plus"></i>
							</p>
						</div>
						<div class="orange item">
							<img src="../../img/orange.jpg">
							<p class="item_name">鲜橙汁</p>
							<p class="item_price">价格：<span>3.5元</span>
							</p>
							<p class="add_item">
								<i class="fa fa-plus"></i>
							</p>
						</div>
					</div>
				</div>
				<div class="accessories">
					<p class="title">辅料选择<span>(任意选择)</span></p>
					<div class="accessories_items">
						<div class="honey item">
							<div class="item_left">
								<img src="../../img/honey.jpg">
								<p class="item_name">蜂蜜</p>
							</div>
							<div class="item_right">
								<div class="right_content">
									<p class="item_price">价格：<span class="num">1.0</span><span>元/份</span></p>
									<p class="item_num">数量：<span>0</span></p>
									<div class="add_sub" onselectstart="return false;">
										<i class="fa fa-plus add"></i>
	                                    <i class="fa fa-minus sub"></i>
									</div>
									<p class="totol_price">总计：<span>0.0</span></p>
								</div>
							</div>
						</div>
						<div class="coconut item">
							<div class="item_left">
								<img src="../../img/coconut.jpg">
								<p class="item_name">椰果</p>
							</div>
							<div class="item_right">
								<div class="right_content">
									<p class="item_price">价格：<span class="num">0.8</span><span>元/份</span></p>
									<p class="item_num">数量：<span>0</span></p>
									<div class="add_sub" onselectstart="return false;">
										<i class="fa fa-plus add"></i>
	                                    <i class="fa fa-minus sub"></i>
									</div>
									<p class="totol_price">总计：<span>0.0</span></p>
								</div>
							</div>
						</div>
						<div class="HFCS item">
							<div class="item_left">
								<img src="../../img/HFCS.jpg">
								<p class="item_name">果葡糖浆</p>
							</div>
							<div class="item_right">
								<div class="right_content">
									<p class="item_price">价格：<span class="num">0.5</span><span>元/份</span></p>
									<p class="item_num">数量：<span>0</span></p>
									<div class="add_sub" onselectstart="return false;">
										<i class="fa fa-plus add"></i>
	                                    <i class="fa fa-minus sub"></i>
									</div>
									<p class="totol_price">总计：<span>0.0</span></p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="content_right">
				<div class="tips">
					<p class="tips_title">选购须知</p>
					<ul class="fa-ul">
						<li><i class="fa-li fa fa-sun-o fa-spin"></i>各种配料随您喜好随意搭配,主料最多只可选择<span class="important_word">1</span>次，辅料类目数量<span class="important_word">任你选择</span>，每份大约为<span class="important_word">30ml</span>,每种类目最多可添加<span class="important_word">3份</span>。</li>
                        <li><i class="fa-li fa fa-sun-o fa-spin"></i>配料进行<span class="important_word">消菌</span>冰冻贮藏，可储存<span class="important_word">X</span>个月，请放心使用。</li>
                        <li><i class="fa-li fa fa-sun-o fa-spin"></i>选购完，请点击选购完成按钮并确认需支付价格，进入支付页面</li>
                        <li><i class="fa-li fa fa-sun-o fa-spin"></i>支付完毕，请从<span class="important_word">右侧出口处</span>拿取产品，欢迎下次光临。</li>
					</ul>
				</div>
				<div class="ranking_list">
                    <p class="ranking_list_title">月售排行</p>
                    <ul>
                        <li><i class="top_3">1</i><span title="苹果汁+红茶+牛奶+果葡糖浆">苹果汁+红茶+牛奶+果葡糖浆</span><strong>23011</strong></li>
                        <li><i class="top_3">2</i><span title="芒果汁+奶油+椰果+蜂蜜">芒果汁+奶油+椰果+蜂蜜</span><strong>19637</strong></li>
                        <li><i class="top_3">3</i><span title="椰果+蜜桃汁+牛奶">椰果+蜜桃汁+牛奶</span><strong>17666</strong></li>
                        <li><i class="not_top">4</i><span title="柠檬汁+蜜桃汁+果葡糖浆+椰果">柠檬汁+蜜桃汁+果葡糖浆+椰果</span><strong>17213</strong></li>
                        <li><i class="not_top">5</i><span title="鲜橙汁+椰果+牛奶+苹果汁">鲜橙汁+椰果+牛奶+苹果汁</span><strong>16871</strong></li>
                        <li><i class="not_top">6</i><span title="绿茶+蜂蜜">绿茶+蜂蜜</span><strong>14239</strong></li>
                        <li><i class="not_top">7</i><span title="绿茶+椰果+果葡糖浆">绿茶+椰果+果葡糖浆</span><strong>6584</strong></li>
                        <li><i class="not_top">8</i><span title="苹果汁+蜜桃汁+鲜橙汁+芒果汁">苹果汁+蜜桃汁+鲜橙汁+芒果汁</span><strong>4568</strong></li>
                        <li><i class="not_top">9</i><span title="柠檬汁+奶油+椰果">柠檬汁+奶油+椰果</span><strong>3654</strong></li>
                        <li><i class="not_top">10</i><span title="苹果汁+奶油+椰果">苹果汁+奶油+椰果</span><strong>2601</strong></li>
                    </ul>
                </div>
			</div>
			<div class="complete_bt">
				<div class="complete_bt_text">选购完成</div>
		        <div class="complete_box">
		            <div class="header">
		                <div class="header_text">
		                    <span>|</span>
		                    购物清单
		                </div>
		                <div class="clear_goods">
		                    <i class="fa fa-trash"></i>
		                    <span>清空物品</span>
		                </div>
		            </div>
		            <div class="content">
		                <div class="tips">
		                    <i class="fa fa-exclamation" style="color:red"></i>
		                        以下是您的购物清单
		                </div>
		                <div class="have_goods">
		                    <div class="all_items">
		                    </div>
		                    <div class="selected_items_totol_price">
		                        <span class="confirm_bt" onselectstart="return false">确认支付</span>
		                        总计：
		                        <span class="price_num">1.0</span>
		                    </div>
		                </div>
		                <div class="not_have">
		                    您尚未选择主料！
		                </div>
		            </div>
		        </div>
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
			background: url(../../img/productBg.png);
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
					-webkit-transition: top linear 0.3s;
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
							display: none;
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
	}
</style>