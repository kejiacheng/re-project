import Vue from 'vue';
import VueRouter from 'vue-router';

import formPage from './components/backstage/formPage.vue';
import chartPage from './components/backstage/chartPage.vue';

Vue.use(VueRouter);

const routes = [
	{ path: '/formPage', name: 'formPage', component: formPage },
	{ path: '/chartPage', name: 'chartPage', component: chartPage },
	{ path: '/', name: 'index' }
]

export default new VueRouter({
	routes
})