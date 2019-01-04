'use strict'

import {ActivatedRoute, Router} from '@angular/router'
import {Component} from '@angular/core'
// import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms'
import {Location} from '@angular/common'

// import {AutocompleteFieldDataInterface, FileInputFieldDataInterface, InputFieldDataInterface, validators} from 'ramster-ui-forms'
import {BasePageComponent, GlobalEventsService, GESRedirectOptionsInterface} from '../../../../src'

@Component({
	selector: 'app-page',
	templateUrl: './home.template.pug',
	styleUrls: [
		'./home.styles.scss'
	],
})
export class HomePageComponent extends BasePageComponent {

	constructor(
		activatedRoute: ActivatedRoute,
		globalEventsService: GlobalEventsService
	) {
		super(activatedRoute, globalEventsService, ['reset'], ['onInitialDataLoaded'])
	}

	reset(): void {
		super.reset()

		this.globalEventsService.setLayoutData({hasHeader: true})
	}

	onInitialDataLoaded(): void {
	}
}
