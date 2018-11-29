'use strict'

// angular dependencies
import {CommonModule} from '@angular/common'
import {NgModule} from '@angular/core'

import {BaseLayoutComponent} from './components/base-layout.component'
import {BasePageComponent} from './components/base-page.component'
import {BaseRESTService} from './services/baseREST.service'
import {FilesRESTService} from './services/filesREST.service'
import {getNested, setNested} from './utils/toolbelt'
import {GlobalEventsService} from './services/globalEvents/globalEvents.service'
import {RequestService} from './services/request.service'
import {SelectListInterface} from './interfaces/selectList.interface'

@NgModule({
	imports: [
		CommonModule
	]
})
export class RamsterUICoreModule {}

export {BasePageComponent, BaseLayoutComponent, BaseRESTService, FilesRESTService, getNested, GlobalEventsService, RequestService, SelectListInterface, setNested}
