import {Injectable} from '@angular/core'

import {BaseRESTService, GlobalEventsService, RequestService} from '../../../../src'


@Injectable()
export class TestModelRESTService extends BaseRESTService {
	constructor(globalEventsService: GlobalEventsService, requestService: RequestService) {
		super(globalEventsService, requestService)
		this.baseUrl += 'testModel'
	}
}
