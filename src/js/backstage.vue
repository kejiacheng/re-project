<template>
	<div id="main-content">
		<backstageHeader v-on:formPage="toFormPage" v-on:chartPage="toChartPage"></backstageHeader>
		<router-view></router-view>
	</div>
</template>

<script type="text/javascript">
	import backstageHeader from './components/backstage/backstage-header.vue';

	export default{
		components: {
			backstageHeader
		},
		mounted(){
			// var path = window.location.hash.replace('#/','');
			// console.log(path);
			// if(path == 'chartPage'){
			// 	this.$router.push({ name: 'chartPage' });
			// 	this.isNowPage = true;
			// }else if(path == 'formPage' || path == ''){
			// 	this.$router.push({ name: 'formPage' });
			// 	this.isNowPage = false;
			// }
		},
		methods: {
			aa(){
				
			},
			bb(){

			},
			toFormPage(){
				this.$router.push({ name: 'formPage' });
				this.isNowPage = true;
			},
			toChartPage(){
				this.$router.push({ name: 'chartPage' });
				this.isNowPage = false;
			}
		},
		data(){
			return {
				isNowPage: true
			}
		},
		computed: {

		},
		created(){

		},
		watch: {

		}
	}
</script>
<style lang="sass">
@import "../css/reset.css";
body{
	font-family: "宋体";
	background: url("../img/backstageBg.jpg");
}
</style>

