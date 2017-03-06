<template>
	<div id="main-content">
		
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
	$oneBoxWidth: 310px;
	$oneBoxMarginRight: 30px;
	$allBoxWidth: $oneBoxWidth * 3 + $oneBoxMarginRight * 2;
	$boxHeigth: 455px;
	$titleHeight: 35px;
	$contentHeight: $boxHeigth - $titleHeight;
	body{
		background: #333333;
	}
	#main-content{
		width: $allBoxWidth;
		height: $boxHeigth;
		margin: 100px auto 0;
		font-size: 0;
		position: relative;
		background: red;
	}
</style>

