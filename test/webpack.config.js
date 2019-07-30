const
	AngularCompilerPlugin = require( '@ngtools/webpack' ).AngularCompilerPlugin,
	BellOnBundlerErrorPlugin = require('bell-on-bundler-error-plugin'),
	path = require('path'),
	ProgressBarPlugin = require('progress-bar-webpack-plugin'),
	webpack = require('webpack')


module.exports = () => {
	let includePath = path.join(__dirname, './app'),
		ruiSrcPath = path.join(__dirname, '../src'),
		nodeModulesPath = path.join(__dirname, '../node_modules'),
		include = [includePath, ruiSrcPath]

	return {
		mode: 'none',
		devtool: 'source-map',
		entry: [
			path.join(includePath, 'polyfills.ts'),
			path.join(includePath, 'vendor.ts'),
			path.join(includePath, 'index.ts')
		],
		output: {
			// path: publicPath,
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
					test: /\.html$/,
					include,
					use: ['raw-loader']
				},
				{
					test: /\.pug$/,
					include,
					use: ['raw-loader', 'pug-html-loader']
				},
				{
					test: /\.css$/,
					include: [nodeModulesPath, includePath],
					exclude: [],
					use: ['to-string-loader', 'css-loader']
				},
				{
					test: /\.less$/,
					exclude: [],
					use: ['to-string-loader', 'css-loader', 'less-loader']
				},
				{
					test: /\.scss$/,
					include: [nodeModulesPath, includePath],
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
		stats: 'verbose',
		plugins: [
			new webpack.HotModuleReplacementPlugin(),
			new BellOnBundlerErrorPlugin(),
			new ProgressBarPlugin({
				format: '  build [:bar] (:percent) - (:elapsed seconds)',
				clear: false,
				complete: '#',
				summary: 'true'
			}),
			new webpack.NamedModulesPlugin(),
			new AngularCompilerPlugin({
				tsConfigPath: path.join(__dirname, './tsconfig.json'),
				entryModule: path.join(includePath, 'app.ts#AppModule'),
				sourceMap: true
			})
		]
	}
}
