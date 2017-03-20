var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var path = require('path');

module.exports = {
	entry: {
		'index': __dirname + '/src/js/index.js',
		'login': __dirname + '/src/js/login.js',
		'register': __dirname + '/src/js/register.js',
		'changePW': __dirname + '/src/js/changePW.js'
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
			},
			{
				test: /\.(png|jpg)$/,
				loader: "url-loader"
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
			filename: __dirname + '/src/web/login.html',
			template: __dirname + '/src/html/login.html',
			injext: 'body',
			hash: true,
			chunks: ['login']
		}),
		new HtmlWebpackPlugin({
			filename: __dirname + '/src/web/register.html',
			template: __dirname + '/src/html/register.html',
			injext: 'body',
			hash: true,
			chunks: ['register']
		}),
		new HtmlWebpackPlugin({
			filename: __dirname + '/src/web/changePW.html',
			template: __dirname + '/src/html/changePW.html',
			injext: 'body',
			hash: true,
			chunks: ['changePW']
		})
	]

}