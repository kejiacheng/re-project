<template>
	<div class="chartPageBox">
		<div class="wrapper">
			<div class="mode_choice">
				<ul>
					<li class="chart_index_li" :class="{ active: mode_choice == 'chart_index_li'}" @click="chartIndex"><p>图形首页</p></li>
					<li class="bar_line_li" :class="{ active: mode_choice == 'bar_line_li'}" @click="barLine"><p>柱状折线</p></li>	
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
		mounted(){
			const that = this;
			const path = that.$route.path;
			if(path == '/chartPage/barLine'){
				that.mode_choice = 'bar_line_li';
			}
		},
		methods: {
			chartIndex(){
				this.$router.push({ name: 'chartIndex' });
				this.mode_choice = 'chart_index_li';
			},
			barLine(){
				this.$router.push({ name: 'barLine' });
				this.mode_choice = 'bar_line_li';
			}
		},
		props: [],
		data: function (){
			return {
				mode_choice: 'chart_index_li',
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