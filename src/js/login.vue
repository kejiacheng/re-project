<template>
	<div id="main-content">
		<login-header></login-header>
		<login-content></login-content>
		<login-footer></login-footer>
	</div>
</template>

<script type="text/javascript">
	import loginHeader from './components/login/login-header.vue';
	import loginContent from './components/login/login-content.vue';
	import loginFooter from './components/login/login-footer.vue';

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

