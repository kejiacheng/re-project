import Vue from 'vue';
import VueResource from 'vue-resource'

import backstage from './backstage.vue';

Vue.use(VueResource);

new Vue({
	el: '#main-content',
	render: cE => cE(backstage)
})