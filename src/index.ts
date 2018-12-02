'use strict'

// angular dependencies
import {CommonModule} from '@angular/common'
import {NgModule} from '@angular/core'


@NgModule({
	imports: [
		CommonModule
	]
})
export class RamsterUICoreModule {}

export * from './components/base-layout.component'
export * from './components/base-page.component'
export * from './services/baseREST.service'
export * from './services/filesREST.service'
export * from './utils/toolbelt'
export * from './services/globalEvents/globalEvents.service'
export * from './services/globalEvents/globalEvents.interfaces'
export * from './services/request.service'
export * from './interfaces/selectList.interface'
