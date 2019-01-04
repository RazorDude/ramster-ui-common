import {enableProdMode} from '@angular/core'
import {platformBrowser} from '@angular/platform-browser'

if (process.env.NODE_ENV === 'production') {
	enableProdMode()
}

import {AppModuleNgFactory} from './app.ngfactory'

document.addEventListener('DOMContentLoaded', function() {
	platformBrowser().bootstrapModuleFactory(AppModuleNgFactory)
})
