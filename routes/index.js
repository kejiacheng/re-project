module.exports = function (app){
	app.get('/', function (req, res){
		console.log('get');
	})
	app.post('/', function (req, res){
		console.log('post');
	})

	app.use('/register.html', require('./register'));
}