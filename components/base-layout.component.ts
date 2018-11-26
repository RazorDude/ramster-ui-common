import {Component, OnInit, ViewEncapsulation} from '@angular/core'
import {Router} from '@angular/router'

import {GlobalEventsService} from '..//services/globalEvents/globalEvents.service'
import GESRedirectOptionsInterface from '..//services/globalEvents/globalEvents.interfaces'

@Component({
	selector: 'app',
	encapsulation: ViewEncapsulation.None
})
export class BaseLayoutComponent implements OnInit {
	initialDataLoaded: boolean = false
	loaderActive: boolean = false
	queryParams: {[x: string]: string} = {}
	routeParams: {[x: string]: string} = {}

	constructor(
		public globalEventsService: GlobalEventsService,
		public router: Router
	) {
	}

	ngOnInit(): void {
		this.globalEventsService.pageLoaded$.subscribe((data?: {[x: string]: any}) => this.pageLoaded(data))
		this.globalEventsService.triggerInitialDataLoad$.subscribe(() => this.loadInitialData())
		this.globalEventsService.setLayoutData$.subscribe((data) => this.setLayoutData(data))
		this.globalEventsService.redirect$.subscribe(({route, options}) => this.redirect(route, options))
		this.globalEventsService.toggleLoader$.subscribe((active) => this.toggleLoader(active))
	}

	sendInitialDataLoadedEvent() {
		this.globalEventsService.initialDataLoaded({queryParams: this.queryParams, routeParams: this.routeParams})
	}


	// globalEventsService handlers

	pageLoaded(data?: {[x: string]: any}): void {
		if (data) {
			for (const key in data) {
				this[key] = data[key]
			}
		}
		if (this.initialDataLoaded) {
			this.sendInitialDataLoadedEvent()
			return
		}
		this.loadInitialData()
	}

	loadInitialData(): void {
		this.sendInitialDataLoadedEvent()
	}

	setLayoutData(args: {[x: string]: any}) {
		for (const key in args) {
			this[key] = args[key]
		}
	}

	redirect(route: string, options: GESRedirectOptionsInterface): void {
		const actualOptions = options || {},
			{queryParams, reloadInitialData} = actualOptions
		if (reloadInitialData) {
			this.initialDataLoaded = false
		}
		this.router.navigate([route], {queryParams: queryParams || {}})
	}

	toggleLoader(active: boolean): void {
		this.loaderActive = active
	}
}
