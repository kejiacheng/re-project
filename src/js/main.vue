<template>
	<div id="main-content">
		<index-header :isLogin="isLogin"></index-header>
		<index-content></index-content>
		<index-footer></index-footer>
	</div>
</template>

<script type="text/javascript">
	import indexHeader from './components/index-header.vue';
	import indexContent from './components/index-content.vue';
	import indexFooter from './components/index-footer.vue';

	export default{
		components: {
			indexHeader,
			indexContent,
			indexFooter
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

