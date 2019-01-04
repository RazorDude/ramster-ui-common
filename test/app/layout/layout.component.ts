import {ChangeDetectorRef, Component, OnInit, ViewEncapsulation, HostListener} from '@angular/core'
import {Router} from '@angular/router'

import {BaseLayoutComponent, GlobalEventsService, GESRedirectOptionsInterface} from '../../../src'

@Component({
	encapsulation: ViewEncapsulation.None,
	selector: 'app',
	styleUrls: [
		'./layout.styles.scss'
	],
	templateUrl: './layout.template.pug'
})
export class LayoutComponent extends BaseLayoutComponent {
	initialDataLoaded: boolean = false
	loaderActive: boolean = false
	queryParams: {[x: string]: string} = {}
	routeParams: {[x: string]: string} = {}
	user?: any = null

	constructor(
		public cdr: ChangeDetectorRef,
		globalEventsService: GlobalEventsService,
		router: Router
	) {
		super(globalEventsService, router)
	}

	ngOnInit(): void {
		this.globalEventsService.pageLoaded$.subscribe((data?: {[x: string]: any}) => this.pageLoaded(data))
		this.globalEventsService.triggerInitialDataLoad$.subscribe(() => this.loadInitialData())
		this.globalEventsService.setLayoutData$.subscribe((data) => this.setLayoutData(data))
		this.globalEventsService.redirect$.subscribe(({route, options}) => this.redirect(route, options))
		this.globalEventsService.notify$.subscribe(({type, message}) => this.notify(type, message))
		this.globalEventsService.toggleLoader$.subscribe((active) => this.toggleLoader(active))
	}

	sendInitialDataLoadedEvent() {
		this.globalEventsService.initialDataLoaded({queryParams: this.queryParams, routeParams: this.routeParams, user: this.user})
	}

	logout(): void {
		this.user = null
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
		this.user = {id: 1, firstName: 'Test', lastName: 'User'}
		this.sendInitialDataLoadedEvent()
	}

	setLayoutData(args: {[x: string]: any}) {
		for (const key in args) {
			this[key] = args[key]
		}
		this.cdr.detectChanges()
	}

	redirect(route: string, options: GESRedirectOptionsInterface): void {
		const actualOptions = options || {},
			{queryParams, reloadInitialData} = actualOptions
		if (reloadInitialData) {
			this.initialDataLoaded = false
		}
		this.router.navigate([route], {queryParams: queryParams || {}})
	}

	notify(type: string, message: string): void {
	}

	toggleLoader(active: boolean): void {
		this.loaderActive = active
	}
}
