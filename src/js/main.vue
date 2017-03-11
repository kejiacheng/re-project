<template>
	<div id="main-content">
		<index-header></index-header>
		<index-content></index-content>
	</div>
</template>

<script type="text/javascript">
	import indexHeader from './components/index-header.vue';
	import indexContent from './components/index-content.vue';

	export default{
		components: {
			indexHeader,
			indexContent
		},
		methods: {

		},
		data: function (){
			return {
				isLogin: false
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
@import "../css/reset.css";
body{
	font-family: "宋体";
}
</style>

