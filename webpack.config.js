const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const CopyPlugin = require("copy-webpack-plugin");
const path = require('path');


module.exports = {
	entry: {
		main: path.resolve(__dirname, 'main.ts'),
	},
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: '[name].js',
		publicPath: '/',
	},
	devServer: {
		contentBase: path.join(__dirname, 'dist'),
		port: 9000,
	},
	resolve: {
		extensions: ['.js', '.ts'],
	},
	module: {
		rules: [

			// workaround start - UNCOMMENT
			//{
			//	test: /\.js$/,
			//	resolve: {
			//		fullySpecified: false
			//	}
			//},
			// workaround end

			{
				test: /\.ts$/,
				exclude: /node_modules/,
				loader: 'ts-loader',
			},
			{
				test: /\.css$/i,
				use: [
					"style-loader",
					"css-loader",
				],
			},
		],
	},
	plugins: [
		new CleanWebpackPlugin(),
		new CopyPlugin({
			patterns: [
				{
					from: './index.html',
					to: './',
				},
			],
		}),
	],
};
