module.exports = function (app){
	app.get('/', function (req, res){
		console.log('get');
	})
	app.post('/', function (req, res){
		if(req.body.index == 0){
			if(req.session.phone){
				res.json({ phone: req.session.phone, username: req.session.username, login_way: req.session.login_way })
			}
		}else if(req.body.index == 1){
			delete req.session.phone;
			delete req.session.password;
			delete req.session.username;
			delete req.session.login_way;
			res.send('退出成功');
		}else if(req.body.index == 2){
			
		}
	})

	app.use('/register.html', require('./register'));
	app.use('/login.html', require('./login'));
	app.use('/changePW-2', require('./changePW-2'));
	app.use('/changePW-3', require('./changePW-3'));
	app.use('/payment', require('./payment'));
	app.use('/backstage', require('./backstage'));
	app.use('/goodsRel', require('./goodsRel'));
	app.use('/chartPage', require('./chartPage'));
	app.use('/barLine', require('./barLine'));
}