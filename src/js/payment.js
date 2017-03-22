import Vue from 'vue';
import VueResource from 'vue-resource'

import payment from './payment.vue';

Vue.use(VueResource);

new Vue({
	el: '#main-content',
	render: cE => cE(payment)
})