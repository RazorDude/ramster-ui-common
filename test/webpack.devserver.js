'use strict'
console.log('[webpackDevserver info]: Starting script...')
const
	webpack = require('webpack'),
	WebpackDevServer = require('webpack-dev-server')

const
	config = require('./config'),
	getWebpackConfig = require('./webpack.config'),
	listenPromise = (moduleName, moduleConfig, webpackConfig) => new Promise((resolve, reject) => {
		new WebpackDevServer(webpack(webpackConfig), {
			publicPath: webpackConfig.output.publicPath,
			hot: true,
			historyApiFallback: true,
			stats: {
				colors: true
			}
		}).listen(moduleConfig.webpackDevserverPort, moduleConfig.hostName, function (err) {
			if (err) {
				console.log(`[${moduleName}]`, err)
				reject(err)
				return
			}
			console.log(`[${moduleName}] Listening at ${moduleConfig.webpackHost}`)
			resolve()
		})
	})

let moduleConfig = {
		hostName: '127.0.0.1',
		webpackDevserverPort: config.devserverPort,
		webpackHost: `http://127.0.0.1:${config.devserverPort}`
	},
	webpackConfig = getWebpackConfig()
webpackConfig.entry.unshift('webpack-dev-server/client?' + moduleConfig.webpackHost)
// webpackConfig.output.publicPath = moduleConfig.webpackHost + webpackConfig.output.publicPath

console.log('[webpackDevserver info]: Config loaded, build starting...')
listenPromise('test app', moduleConfig, webpackConfig).then((res) => true, (err) => console.log('[webpackDevserver info]: Error while building: ', err))
