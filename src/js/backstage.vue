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
			var that = this;
			var path = that.$route.path;
			if(path == '/formPage' || path == '/'){
				that.$router.push({ name: 'formIndex' });
			}else if(path == 'chartPage'){
				that.$router.push({ name: 'chartIndex' });
			}
			that.$http.post('/backstage')
			.then((result) => {
				that.$store.commit('getRankingList', result.body);
				that.$store.commit('getGoodsSale', result.body);
				that.$store.state.goodsList = result.body;
			})
			that.$http.get('/backstage')
			.then((result) => {
				delete result.body._id;
				delete result.body.__v;
				that.$store.commit('relGoods', result.body);
			})
		},
		methods: {
			toFormPage(){
				this.$router.push({ name: 'formIndex' });
			},
			toChartPage(){
				this.$router.push({ name: 'chartIndex' });
			}
		},
		data(){
			return {

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

