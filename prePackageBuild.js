console.log('[webpackBuild info]: Starting script...')
const
	co = require('co'),
	fs = require('fs-extra'),
	path = require('path'),
	pug = require('pug'),
	sass = require('node-sass')

const
	renderSass = (inputPath) => new Promise((resolve, reject) => {
		sass.render({file: inputPath}, (err, result) => {
			if (err) {
				return reject(err)
			}
			resolve(result)
		})
	})

co(function*() {
	const pugFilePaths = [{
				inputPath: path.join(__dirname, 'src/components/componentInjector/componentInjector.template.pug'),
				outputPath: path.join(__dirname, 'src/components/componentInjector/componentInjector.template.html')
			}
		],
		sassFilePaths = [
			// {
			// 	inputPath: path.join(__dirname, 'src/components/componentInjector/componentInjector.styles.scss'),
			// 	outputPath: path.join(__dirname, 'src/components/componentInjector/componentInjector.styles.css')
			// }
		]
	for (const i in pugFilePaths) {
		const {inputPath, outputPath} = pugFilePaths[i]
		console.log(`Building the pug file at ${inputPath}...`)
		let data = pug.renderFile(inputPath),
			fd = yield fs.open(outputPath, 'w')
		yield fs.writeFile(fd, data)
		yield fs.close(fd)
		console.log(`Successfully built the html file at ${outputPath}.`)
	}
	for (const i in sassFilePaths) {
		const {inputPath, outputPath} = sassFilePaths[i]
		console.log(`Building the sass file at ${inputPath}...`)
		let data = yield renderSass(inputPath),
			fd = yield fs.open(outputPath, 'w')
		yield fs.writeFile(fd, data.css.toString())
		yield fs.close(fd)
		console.log(`Successfully built the css file at ${outputPath}.`)
	}
	return true
}).then(() => console.log('[prePackageBuild info]: All builds completed successfully.'), (error) => {
	console.log('[prePackageBuild info]: Error while building: ', error)
	process.exit(1)
})
