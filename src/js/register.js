import Vue from 'vue';
import VueResource from 'vue-resource'

import register from './register.vue';

Vue.use(VueResource);

new Vue({
	el: '#main-content',
	render: cE => cE(register)
})