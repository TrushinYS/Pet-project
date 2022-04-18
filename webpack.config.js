const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin')

module.exports = {
	mode: 'development',
	entry: path.resolve(__dirname, 'src', 'index.tsx'),
	output: {
		filename: '[name].bundle.js',
		path: path.resolve(__dirname, 'dist')
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: path.resolve(__dirname, 'public', 'index.html'),
			favicon: './src/icons/favicon.ico',
		}),
		new CleanWebpackPlugin({
			protectWebpackAssets: false,
			cleanAfterEveryBuildPatterns: ['*.LICENSE.txt'],
		})
	],
	module: {
		rules: [
			{
				test: /\.css$/,
				exclude: /node_modules/,
				use: ['style-loader', 'css-loader']
			},
			{
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				use: ['babel-loader']
			},
			{
				test: /\.(ts|tsx)$/,
				exclude: /node_modules/,
				use: ['ts-loader'],
			},
		]
	},
	devServer: {
		port: 5000,
		hot: true,
	},
	resolve: {
		extensions: ['.ts', '.tsx', '.js', '.jsx'],
		alias: {
			'@': path.resolve(__dirname, 'src'),
			'@Pages': path.resolve(__dirname, 'src/components/pages'),
			'@Elements': path.resolve(__dirname, 'src/components/elements'),
			'@Shared': path.resolve(__dirname, 'src/core/shared'),
			'@Hooks': path.resolve(__dirname, 'src/core/hooks'),
			'@Redux': path.resolve(__dirname, 'src/core/redux'),
			'@Css': path.resolve(__dirname, 'src/css')
		}
	}
}