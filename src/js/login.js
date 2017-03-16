import Vue from 'vue';
import VueResource from 'vue-resource'

import login from './login.vue';

Vue.use(VueResource);

new Vue({
	el: '#main-content',
	render: cE => cE(login)
})