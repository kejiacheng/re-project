<template>
	<div id="main-content">
		<p><a @click="aa">tob</a><a @click="bb">toa</a></p>
		<transition>
			<router-view v-show="!haha"></router-view>
		</transition>
		<transition>
			<aa v-show="haha"></aa>
		</transition>
		
	</div>
</template>

<script type="text/javascript">
	import aa from './components/a.vue';
	import bb from './components/b.vue';

	export default{
		components: {
			aa,
			bb
		},
		methods: {
			aa(){
				this.$router.push({ name: 'b' });
				this.haha = !this.haha;
				console.log(this.haha);
			},
			bb(){
				this.$router.push({ name: 'a' });
				this.haha = !this.haha;
				console.log(this.haha);
			}
		},
		data: function (){
			return {
				haha: true
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

