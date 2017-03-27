import { 
	getRankingList,  
	getGoodsSale,
} from './mutation-types.js';

export default {
	[getRankingList] (state, n){
		var json = {};
		//将ingredients和accessories数据转换成json格式
		n.forEach((e) => {
			var str = '';
			str += e.ingredients.name + '*1,';
			for(let i in e.accessories){
				str = str + i + '*' + e.accessories[i].num + ',';
			}
			str = str.substring(0,str.length-1);
			if(!json[str]){
				json[str] = 1;
			}else{
				json[str] += 1;
			}
		})
		//将json格式转变为数组，方便sort
		var arr = [];
		for(let i in json){
			var middle = [];
			middle.push(i,json[i]);
			arr.push(middle);
		}
		console.log('store');
		//将二维数据根据数量进行排序
		arr.sort((a, b) => b[1]-a[1]);
		state.rankingList = arr;
	},
	[getGoodsSale] (state, n){

	}
}