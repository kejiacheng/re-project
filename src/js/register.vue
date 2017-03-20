<template>
	<div id="main-content">
		<registerHeader></registerHeader>
		<register-content></register-content>
		<registerFooter></registerFooter>
	</div>
</template>

<script type="text/javascript">
	import registerHeader from './components/header.vue';
	import registerContent from './components/register/register-content.vue';
	import registerFooter from './components/footer.vue';

	export default{
		components: {
			registerHeader,
			registerContent,
			registerFooter
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
	background: #f6f9fb;
}
</style>

