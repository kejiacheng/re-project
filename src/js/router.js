import Vue from 'vue';
import VueRouter from 'vue-router';

import formPage from './components/backstage/formPage.vue';
import chartPage from './components/backstage/chartPage.vue';
import a from './components/backstage/formPage/a.vue';
import b from './components/backstage/formPage/b.vue';

Vue.use(VueRouter);

const routes = [
	{ path: '/formPage', name: 'formPage', component: formPage,
	  children: [
	  	{
	  		path: 'a',
	  		name: 'a',
	  		component: a
	  	},
	  	{
	  		path: 'b',
	  		name: 'b',
	  		component: b
	  	}
	  ]
	},
	{ path: '/chartPage', name: 'chartPage', component: chartPage, 

	},
	{ path: '/', name: 'index' }
]

export default new VueRouter({
	routes
})