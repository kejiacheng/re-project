import { 
	getRankingList,  
	getGoodsSale,
} from './mutation-types.js';

export default {
	[getRankingList] (state, n){
		console.log(n);
	}
}