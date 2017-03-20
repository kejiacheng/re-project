import Vue from 'vue';
import VueResource from 'vue-resource'

import changePW from './changePW.vue';

Vue.use(VueResource);

new Vue({
	el: '#main-content',
	render: cE => cE(changePW)
})