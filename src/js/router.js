import Vue from 'vue';
import VueRouter from 'vue-router';

import formPage from './components/backstage/formPage.vue';
import chartPage from './components/backstage/chartPage.vue';
import a from './components/backstage/formPage/a.vue';
import b from './components/backstage/formPage/b.vue';
import c from './components/backstage/formPage/c.vue';
import d from './components/backstage/formPage/d.vue';
import e from './components/backstage/chartPage/e.vue';
import f from './components/backstage/chartPage/f.vue';

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
		  	},
		  	{
		  		path: 'c',
		  		name: 'c',
		  		component: c
		  	},
		  	{
		  		path: 'd',
		  		name: 'd',
		  		component: d
		  	}
	  	]
	},
	{ path: '/chartPage', name: 'chartPage', component: chartPage, 
		children: [
			{
				path: 'e',
				name: 'e',
				component: e
			},
			{
				path: 'f',
				name: 'f',
				component: f
			}
		]
		
	},
	{ path: '/', name: 'index' }
]

export default new VueRouter({
	routes
})