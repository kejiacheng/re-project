<template>
	<div class="formPageBox">
		<div class="wrapper">
			<div class="mode_choice">
				<ul>
					<li class="form_index_li active" @click="formIndex"><p>后台首页</p></li>
					<li class="goods_ranking_li" @click="goodsRanking"><p>销量排行</p></li>
					<li class="goods_sale_li" @click="goodsSale"><p>销售记录</p></li>
					<li class="goods_rel_li" @click="goodsRel"><p>货物余量</p></li>	
				</ul>
			</div>
			<div class="item_box">
				<router-view></router-view>
			</div>
		</div>
	</div>
</template>
<script type="text/javascript">
	export default{
		components: {
			
		},
		methods: {
			formIndex(){
				this.$router.push({ name: 'formIndex' });
			},
			goodsRanking(){
				this.$router.push({ name: 'goodsRanking' });
			},
			goodsSale(){
				this.$router.push({ name: 'goodsSale' });
			},
			goodsRel(){
				this.$router.push({ name: 'goodsRel' });
			}
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
.formPageBox{
	.wrapper{
		width:1200px;
		margin:30px auto;
		background:#bbb;
		min-height:500px;
		position:relative;
		box-sizing:border-box;
		padding:20px;
		.mode_choice{
			@media(max-width:1250px){
				left:0;
			}
			position:absolute;
			top:120px;
			left:-50px;
			ul{
				li{
					margin-bottom:8px;		
					color:#dedede;
					line-height:20px;	
					font-weight: 600;
					cursor:pointer;
					background:#5B37EA;		
					p{
						display: table-cell;
						vertical-align: middle;
						text-align: center;
						width:45px;
						height:45px;							
					}
				}
				.active{
					background:#F24C0A;
				}
			}
		}
	}
}
</style>