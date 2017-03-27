import { 
	getRankingList,  
	getGoodsSale,
} from './mutation-types.js';

export default {
	[getRankingList] (state, n){
		n.forEach((e,x) => {
			let json + x = {1:2};
			console.log(json + x)
		})
		state.rankingList = n
	}
}