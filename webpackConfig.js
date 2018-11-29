'use strict'

const
	AngularCompilerPlugin = require( '@ngtools/webpack' ).AngularCompilerPlugin,
	BellOnBundlerErrorPlugin = require('bell-on-bundler-error-plugin'),
	path = require('path'),
	ProgressBarPlugin = require('progress-bar-webpack-plugin'),
	TerserPlugin = require('terser-webpack-plugin'),
	webpack = require('webpack')


module.exports = () => {
	let includePath = path.join(__dirname, './src'),
		publicPath = path.join(__dirname, './dist'),
		include = [includePath]

	return {
		entry: [
			path.join(includePath, 'vendor.ts'),
			path.join(includePath, 'module.ts')
		],
		output: {
			path: publicPath,
			filename: '[name].js',
			chunkFilename: '[id].chunk.js',
			publicPath: '/dist/'
		},
		resolve: {
			extensions: ['.ts', '.js'],
			modules: ['node_modules']
		},
		module: {
			rules: [
				{
					test: /\.pug$/,
					include,
					use: ['raw-loader', 'pug-html-loader']
				},
				{
					test: /\.css$/,
					include: include,
					exclude: [],
					use: ['to-string-loader', 'css-loader']
				},
				{
					test: /\.scss$/,
					include: include,
					exclude: [],
					use: ['raw-loader', 'sass-loader']
				},
				{
					test: /(?:\.ngfactory\.js|\.ngstyle\.js|\.ts)$/,
					include,
					use: [{
						loader: '@ngtools/webpack'
					}],
					exclude: [/\.(spec|e2e)\.ts$/]
				},
				{
					test: /\.json$/,
					include,
					exclude: [],
					use: ['json2-loader']
				}
			]
		},
		optimization: {
			splitChunks: {
				chunks: 'initial'
			}
		},
		stats: 'verbose',
		plugins: [
			new webpack.NoEmitOnErrorsPlugin(),
			new BellOnBundlerErrorPlugin(),
			new ProgressBarPlugin({
				format: '  build [:bar] (:percent) - (:elapsed seconds)',
				clear: false,
				complete: '#',
				summary: 'true'
			}),
			new webpack.HashedModuleIdsPlugin(),
			new TerserPlugin({
				terserOptions: {
					ecma: 6,
					warnings: true,
					compress: {
						ecma: 6
					},
					mangle: true
				}
			}),
			new webpack.DefinePlugin({
				'process.env': {
					'NODE_ENV': JSON.stringify('production')
				}
			}),
			new AngularCompilerPlugin({
				tsConfigPath: path.join(__dirname, 'tsconfig.json'),
				entryModule: path.join(includePath, 'module.ts#RamsterUICoreModule'),
				sourceMap: false
			})
		]
	}
}
