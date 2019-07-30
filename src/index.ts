// angular dependencies
import {CommonModule} from '@angular/common'
import {NgModule} from '@angular/core'

import {ComponentInjector, ComponentInjectorAreaDirective} from './components/componentInjector'


@NgModule({
	imports: [
		CommonModule
	],
	declarations: [
		ComponentInjector,
		ComponentInjectorAreaDirective
	],
	exports: [
		ComponentInjector,
		ComponentInjectorAreaDirective
	]
})
export class RamsterUICoreModule {}

export * from './components/base-layout.component'
export * from './components/base-page.component'
export * from './components/componentInjector'
export * from './services/baseREST.service'
export * from './services/filesREST.service'
export * from './services/globalEvents/globalEvents.service'
export * from './services/globalEvents/globalEvents.interfaces'
export * from './services/modelRESTServiceProvider.service'
export * from './services/request.service'
export * from './utils/toolbelt'
export * from './interfaces/selectList.interface'
