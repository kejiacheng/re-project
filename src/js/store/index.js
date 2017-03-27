import Vue from 'vue';
import Vuex from 'vuex';
import mutations from './mutations';
import actions from './actions';
import getters from './getters';

Vue.use(Vuex);

const state = {
	count: 0,
	rankingList: [],
	goodsSale: [],
}

export default new Vuex.Store({
	state,
	getters,
	actions,
	mutations,
})