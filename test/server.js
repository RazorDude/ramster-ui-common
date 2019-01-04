
const
	config = require('./config'),
	express = require('express'),
	http = require('http'),
	path = require('path'),
	pug = require('pug')

let app = express(),
	getTemplate = pug.compileFile(path.join(__dirname, './index.pug')),
	template = getTemplate({bundleLink: `http://127.0.0.1:${config.devserverPort}/dist/main.js`})
app.get('/', (req, res) => res.send(template))
let server = http.createServer(app)
server.listen(config.serverPort, () => {
	console.log(`[RUI testApp] Server started.`)
	console.log(`[RUI testApp] Port:`, config.serverPort)
})