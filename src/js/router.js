import Vue from 'vue';
import VueRouter from 'vue-router';

import formPage from './components/backstage/formPage.vue';
import chartPage from './components/backstage/chartPage.vue';
import formIndex from './components/backstage/formPage/formIndex.vue';
import goodsRanking from './components/backstage/formPage/goodsRanking.vue';
import goodsSale from './components/backstage/formPage/goodsSale.vue';
import goodsRel from './components/backstage/formPage/goodsRel.vue';
import chartIndex from './components/backstage/chartPage/chartIndex.vue';
import barLine from './components/backstage/chartPage/barLine.vue';

Vue.use(VueRouter);

const routes = [
	{ path: '/formPage', name: 'formPage', component: formPage,
		children: [
		  	{
		  		path: 'formIndex',
		  		name: 'formIndex',
		  		component: formIndex
		  	},
		  	{
		  		path: 'goodsRanking',
		  		name: 'goodsRanking',
		  		component: goodsRanking
		  	},
		  	{
		  		path: 'goodsSale',
		  		name: 'goodsSale',
		  		component: goodsSale
		  	},
		  	{
		  		path: 'goodsRel',
		  		name: 'goodsRel',
		  		component: goodsRel
		  	}
	  	]
	},
	{ path: '/chartPage', name: 'chartPage', component: chartPage, 
		children: [
			{
				path: 'chartIndex',
				name: 'chartIndex',
				component: chartIndex
			},
			{
				path: 'barLine',
				name: 'barLine',
				component: barLine
			}
		]
		
	},
	{ path: '/', name: 'index' }
]

export default new VueRouter({
	routes
})