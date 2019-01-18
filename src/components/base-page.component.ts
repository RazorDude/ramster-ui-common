'use strict'

import {ActivatedRoute} from '@angular/router'
import {OnDestroy, OnInit} from '@angular/core'
import {Subject} from 'rxjs'
import {takeUntil} from 'rxjs/operators'

import {GlobalEventsService} from '../services/globalEvents/globalEvents.service'

export class BasePageComponent implements OnInit, OnDestroy {
	destroyed: Subject<void> = new Subject()
	loggedInUser?: any
	queryParams: {[x: string]: string}
	routeParams: {[x: string]: string}

	constructor(
		public activatedRoute: ActivatedRoute,
		public globalEventsService: GlobalEventsService,
		public onInitMethodNames: string[],
		public onInitialDataLoadedMethodNames: string[]
	) {
	}

	ngOnInit() {
		this.globalEventsService.initialDataLoaded$.pipe(takeUntil(this.destroyed)).subscribe((data) => this.initialDataLoaded(data))
		this.onInitMethodNames.forEach((methodName) => {
			if (typeof this[methodName] === 'function') {
				this[methodName]()
			}
		})
	}

	reset(): void {
		this.queryParams = this.activatedRoute.snapshot.queryParams
		this.routeParams = this.activatedRoute.snapshot.params
	}

	sendPageLoadedEvent() {
		this.globalEventsService.pageLoaded({queryParams: this.queryParams, routeParams: this.routeParams})
	}

	initialDataLoaded(data): void {
		this.loggedInUser = data.user
		this.queryParams = data.queryParams
		this.routeParams = data.routeParams
		this.onInitialDataLoadedMethodNames.forEach((methodName) => {
			if (typeof this[methodName] === 'function') {
				this[methodName](data)
			}
		})
	}

	destructor() {
		this.destroyed.next()
		this.destroyed.complete()
	}

	ngOnDestroy() {
		this.destructor()
	}
}
