var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	entry: {
		'index': __dirname + '/src/js/index.js',
		'nihao': __dirname + '/src/js/nihao.js'
	},
	output: {
		path: __dirname + '/src/web/js',
		filename: '[name].js'
	},
	resolve: {
		alias: {
			vue: 'vue/dist/vue.js'
		}
	},
	externals: {
		
	},
	module: {
		rules: [
			{
				test: /\.scss$/,
				use: [
					"style-loader",
					"css-loader",
					"sass-loader"
				],
				use: ExtractTextPlugin.extract({
						fallback: "style-loader",
						use: "css-loader!sass-loader"
					})
			},
			{
				test: /\.vue$/,
				loader: "vue-loader"
			},
			{
				test : /\.jsx$/,
				loader: "babel-loader"
			}
		]
	},
	plugins: [
		new ExtractTextPlugin({
			filename: "[name].css",
			allChunks: true
		}),
		new HtmlWebpackPlugin({
			filename: __dirname + '/src/web/index.html',
			template: __dirname + '/src/html/index.html',
			injext: 'body',
			hash: true,
			chunks: ['index']
		}),
		new HtmlWebpackPlugin({
			filename: __dirname + '/src/web/nihao.html',
			template: __dirname + '/src/html/nihao.html',
			injext: 'body',
			hash: true,
			chunks: ['nihao']
		})
	]

}