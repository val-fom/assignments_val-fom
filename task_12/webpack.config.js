var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var CopyWebpackPlugin = require("copy-webpack-plugin");
var ExtractTextPlugin = require("extract-text-webpack-plugin");

var inProduction = (process.env.NODE_ENV === 'production');

module.exports = {

	entry: {
		app: [
			'./src/main.js',
			'./src/main.scss'
		]
	},

	output: {
		path: path.resolve(__dirname, './dist'),
		filename: '[name].js'
	},

	module: {
		rules: [

			{
				test: /\.s[ac]ss$/,
				use: ExtractTextPlugin.extract({
					use: ['css-loader', 'sass-loader'],
					fallback: 'style-loader'
				})
			},

			{ 
				test: /\.js$/, 
				exclude: /node_modules/, 
				loader: "babel-loader"
			}

		]
	},

	plugins: [

		new ExtractTextPlugin("[name].css"),

		new webpack.LoaderOptionsPlugin({
			minimize: inProduction
		}),

		new HtmlWebpackPlugin({
			template: 'src/index.html'
		}),

		new CopyWebpackPlugin([
			{
				from: 'assets',
				to: ''
			}
		])

	]
};

if (inProduction) {
	module.exports.plugins.push(
			new webpack.optimize.UglifyJsPlugin()
		)
}

