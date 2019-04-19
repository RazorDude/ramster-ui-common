'use strict'

import {ActivatedRoute, Router} from '@angular/router'
import {Component} from '@angular/core'

// import {AutocompleteFieldDataInterface, FileInputFieldDataInterface, InputFieldDataInterface, validators} from 'ramster-ui-forms'
import {BasePageComponent, GlobalEventsService, GESRedirectOptionsInterface} from '../../../../src'
import {TestModelRESTService} from '../../models/test/test.restService'

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
		public testModelRESTService: TestModelRESTService,
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

	testReadList(): void {
		this.testModelRESTService.readList({filters: {id: [1, 2, 3, 4]}})
	}
}
