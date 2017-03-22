<template>
	<div id="main-content">
		<paymentHeader></paymentHeader>

		<paymentFooter></paymentFooter>
	</div>
</template>

<script type="text/javascript">
	import paymentHeader from './components/header.vue';
	import paymentFooter from './components/footer.vue';

	export default{
		components: {
			paymentHeader,
			paymentFooter
		},
		methods: {
			
		},
		data: function (){
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
}
</style>

