<template>
	<div id="main-content">
		<backstageHeader v-on:formPage="toFormPage" v-on:chartPage="toChartPage"></backstageHeader>
		<router-view></router-view>
		<!-- <formPage v-if="isNowPage"></formPage> -->
	</div>
</template>

<script type="text/javascript">
	import backstageHeader from './components/backstage/backstage-header.vue';
	import formPage from './components/backstage/formPage.vue';
	import chartPage from './components/backstage/chartPage.vue';

	export default{
		components: {
			backstageHeader,
			formPage,
			chartPage
		},
		mounted(){
			var path = window.location.hash.replace('#/','');
			if(path == 'chartPage'){
				this.$router.push({ name: 'chartPage' });
				this.isNowPage = true;
			}else if(path == 'formPage' || path == ''){
				this.$router.push({ name: 'formPage' });
				this.isNowPage = false;
			}
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

