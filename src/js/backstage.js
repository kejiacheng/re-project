import Vue from 'vue';
import VueResource from 'vue-resource'

import backstage from './backstage.vue';
import router from './router.js';

Vue.use(VueResource);

new Vue({
	el: '#main-content',
	router,
	render: cE => cE(backstage)
})