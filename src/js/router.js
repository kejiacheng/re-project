import Vue from 'vue';
import VueRouter from 'vue-router';

import a from './components/a.vue';
import b from './components/b.vue';

Vue.use(VueRouter);

const routes = [
	{ path: '/a', name: 'a', component: a },
	{ path: '/b', name: 'b', component: b },
	{ path: '/', name: 'index' }
]

export default new VueRouter({
	routes
})