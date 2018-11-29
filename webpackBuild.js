'use strict'
console.log('[webpackBuild info]: Starting script...')
const
	config = (require(`./webpackConfig`))(),
	webpack = require('webpack')

const
	build = (config) => new Promise((resolve, reject) => {
		console.log(`Building...`)
		webpack(config, (err, stats) => {
			if (err) {
				return reject(err)
			}
			if (stats.hasErrors()) {
				return reject(stats.compilation.errors)
			}
			resolve(stats)
		})
	})
build(config).then(() => console.log('[webpackBuild info]: Build initiated successfully.'), (error) => console.log('[webpackBuild info]: Error while building: ', error))
