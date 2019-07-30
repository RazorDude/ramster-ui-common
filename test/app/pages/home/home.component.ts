import {ActivatedRoute} from '@angular/router'
import {BasePageComponent, GlobalEventsService} from '../../../../src'
import {Component} from '@angular/core'
import {TestComponent} from '../../components/testComponent'
import {TestModelRESTService} from '../../models/test/test.restService'

@Component({
	selector: 'app-page',
	templateUrl: './home.template.pug',
	styleUrls: [
		'./home.styles.scss'
	]
})
export class HomePageComponent extends BasePageComponent {
	TestComponent = TestComponent

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
