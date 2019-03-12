'use strict'

// angular dependencies
import {BrowserAnimationsModule} from '@angular/platform-browser/animations'
import {BrowserModule} from '@angular/platform-browser'
import {FlexLayoutModule} from '@angular/flex-layout'
import {HttpClientModule} from '@angular/common/http'
import {NgModule} from '@angular/core'
import {RouterModule, Routes} from '@angular/router'

// rest API and related services
import {TestModelRESTService} from './models/test/test.restService'

// ramster components and services
import {GlobalEventsService, RamsterUICoreModule, RequestService} from '../../src'

import {LayoutComponent} from './layout/layout.component'

// page components
import {HomePageComponent} from './pages/home/home.component'



const routes: Routes = [
	{path: '', component: HomePageComponent }
]

@NgModule({
	imports: [
		RouterModule.forRoot(routes),
		BrowserModule,
		BrowserAnimationsModule,
		FlexLayoutModule,
		HttpClientModule,
		RamsterUICoreModule
	],
	exports: [RouterModule],
	declarations: [
		LayoutComponent,
		HomePageComponent
	],
	providers: [
		GlobalEventsService,
		RequestService,
		TestModelRESTService
	],
	bootstrap: [LayoutComponent]
})
class AppModule {}

export {AppModule}
