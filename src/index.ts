// angular dependencies
import {CommonModule} from '@angular/common'
import {NgModule} from '@angular/core'

import {ComponentInjector} from './components/componentInjector/componentInjector.component'
import {ComponentInjectorAreaDirective} from './components/componentInjector/componentInjector.directive'


@NgModule({
	imports: [
		CommonModule
	],
	declarations: [
		ComponentInjector,
		ComponentInjectorAreaDirective
	],
	exports: [
		ComponentInjector
	]
})
export class RamsterUICoreModule {}

export * from './components/base-layout.component'
export * from './components/base-page.component'
// export {ComponentInjector}
export * from './services/baseREST.service'
export * from './services/filesREST.service'
export * from './services/globalEvents/globalEvents.service'
export * from './services/globalEvents/globalEvents.interfaces'
export * from './services/modelRESTServiceProvider.service'
export * from './services/request.service'
export * from './utils/toolbelt'
export * from './interfaces/selectList.interface'
