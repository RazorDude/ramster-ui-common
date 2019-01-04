'use strict'

// angular dependencies
import {BrowserAnimationsModule} from '@angular/platform-browser/animations'
import {BrowserModule} from '@angular/platform-browser'
import {FlexLayoutModule} from '@angular/flex-layout'
// import {FormsModule, ReactiveFormsModule} from '@angular/forms'
import {HttpClientModule} from '@angular/common/http'
// import {MatAutocompleteModule, MatButtonModule, MatCheckboxModule, MatDatepickerModule, MatFormFieldModule, MatIconModule, MatInputModule, MatSlideToggleModule, MatTabsModule, MatTableModule, MatPaginatorModule, MatSortModule, MatSelectModule, MatChipsModule} from '@angular/material'
import {NgModule} from '@angular/core'
import {RouterModule, Routes} from '@angular/router'

// rest API and related services
import {TestModelRESTService} from './models/test/test.restService'

// ramster components and services
import {GlobalEventsService, RamsterUICoreModule, RequestService} from '../../src'
// import {InputsModule} from 'ramster-ui-forms'

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
		// FormsModule,
		// InputsModule,
		// ReactiveFormsModule,
		HttpClientModule,
		// MatAutocompleteModule,
		// MatButtonModule,
		// MatCheckboxModule,
		// MatDatepickerModule,
		// MatFormFieldModule,
		// MatIconModule,
		// MatInputModule,
		// MatSlideToggleModule,
		// MatTabsModule,
		// MatTableModule,
		// MatPaginatorModule,
		// MatSortModule,
		// MatSelectModule,
		// MatChipsModule,
		RamsterUICoreModule
	],
	exports: [RouterModule],
	declarations: [
		LayoutComponent,
		HomePageComponent
	],
	providers: [
		TestModelRESTService,
		GlobalEventsService,
		RequestService
	],
	bootstrap: [LayoutComponent]
})
class AppModule {}

export {AppModule}
