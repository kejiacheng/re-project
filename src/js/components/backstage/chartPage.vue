<template>
	<div class="chartPageBox">
		<div class="wrapper">
			<div class="mode_choice">
				<ul>
					<li class="graph_index_li active" @click="chartIndex"><p>图形首页</p></li>
					<li class="bar_line_li" @click="barLine"><p>柱状折线</p></li>	
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
			chartIndex(){
				console.log('xixi');
				this.$router.push({ name: 'chartIndex' });
			},
			barLine(){
				this.$router.push({ name: 'barLine' });
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
.chartPageBox{
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