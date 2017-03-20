<template>
	<div id="main-content">
		<index-header :Login="Login" :phone="phone" :username="username" :loginway="loginway" v-on:exit="modify"></index-header>
		<index-content></index-content>
		<index-footer></index-footer>
	</div>
</template>

<script type="text/javascript">
	import indexHeader from './components/index/index-header.vue';
	import indexContent from './components/index/index-content.vue';
	import indexFooter from './components/index/index-footer.vue';

	export default{
		components: {
			indexHeader,
			indexContent,
			indexFooter
		},
		methods: {
			isLogin(){
				const that = this;
				const index = 0;
				//通过后台判断是否登录
				that.$http.post('/',{ index: index })
				.then((result) => {
					if(result.body){
						//登录则将获得的数据赋值
						that.Login = true;
						that.phone = result.body.phone;
						that.username = result.body.username;
						that.loginway = result.body.login_way;
					}
				})
			},
			modify(){
				//将数据初始化未登录状态
				const that = this;
				that.Login = false;
				that.phone = '';
				that.username = '';
				that.loginway = '';
			}
		},
		data: function (){
			return {
				Login: false,
				phone: '',
				username: '',
				loginway: ''
			}
		},
		computed: {

		},
		created(){
			const that = this;
			that.isLogin();
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

