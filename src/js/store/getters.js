export default {
	ten: state => {
		var oldDate = new Date();
		oldDate.setDate(oldDate.getDate() - 9);
		oldDate = formatTime(oldDate, 0);

		function formatTime(time, hours){
			var year = time.getFullYear();
			var month = time.getMonth() + 1;
			var date = time.getDate();

			return year * 1000000 + month * 10000 + date * 100 + hours;
		}
		return state.goodsList.filter(item => item.date > oldDate)
	},
	five: state => {
		var oldDate = new Date();
		oldDate.setDate(oldDate.getDate() - 4);
		oldDate = formatTime(oldDate, 0);

		function formatTime(time, hours){
			var year = time.getFullYear();
			var month = time.getMonth() + 1;
			var date = time.getDate();

			return year * 1000000 + month * 10000 + date * 100 + hours;
		}
		return state.goodsList.filter(item => item.date > oldDate)
	}
}