import {Injectable} from '@angular/core'
import {Subject} from 'rxjs'
import {GESRedirectOptionsInterface} from './globalEvents.interfaces'

@Injectable()
export class GlobalEventsService {
	pageLoadedSource = new Subject<{[x: string]: any} | void>()
	triggerInitialDataLoadSource = new Subject<void>()
	initialDataLoadedSource = new Subject<any>()
	setLayoutDataSource = new Subject<{[x: string]: any}>()
	redirectSource = new Subject<{route: string, options: GESRedirectOptionsInterface}>()
	notifySource = new Subject<{type: string, message: string}>()
	toggleLoaderSource = new Subject<boolean>()

	pageLoaded$ = this.pageLoadedSource.asObservable()
	triggerInitialDataLoad$ = this.triggerInitialDataLoadSource.asObservable()
	initialDataLoaded$ = this.initialDataLoadedSource.asObservable()
	setLayoutData$ = this.setLayoutDataSource.asObservable()
	redirect$ = this.redirectSource.asObservable()
	notify$ = this.notifySource.asObservable()
	toggleLoader$ = this.toggleLoaderSource.asObservable()

	pageLoaded(data): void {
		this.pageLoadedSource.next(data)
	}

	triggerInitialDataLoad(data): void {
		this.triggerInitialDataLoadSource.next(data)
	}

	initialDataLoaded(data): void {
		this.initialDataLoadedSource.next(data)
	}

	setLayoutData(data): void {
		this.setLayoutDataSource.next(data)
	}

	redirect(route: string, options?: GESRedirectOptionsInterface): void {
		this.redirectSource.next({route, options})
	}

	notify(type: string, message: string): void {
		this.notifySource.next({type, message})
	}

	toggleLoader(active: boolean): void {
		this.toggleLoaderSource.next(active)
	}
}
