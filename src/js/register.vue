<template>
	<div id="main-content">
		<register-header></register-header>
		<register-content></register-content>
		<register-footer></register-footer>
	</div>
</template>

<script type="text/javascript">
	import registerHeader from './components/register/register-header.vue';
	import registerContent from './components/register/register-content.vue';
	import registerFooter from './components/register/register-footer.vue';

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

