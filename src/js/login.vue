<template>
	<div id="main-content">
		<loginHeader></loginHeader>
		<login-content></login-content>
		<loginFooter></loginFooter>
	</div>
</template>

<script type="text/javascript">
	import loginHeader from './components/header.vue';
	import loginContent from './components/login/login-content.vue';
	import loginFooter from './components/footer.vue';

	export default{
		components: {
			loginHeader,
			loginContent,
			loginFooter
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

