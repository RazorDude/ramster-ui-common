import {Injectable} from '@angular/core'
import {Subject} from 'rxjs'
import {GESRedirectOptionsInterface} from './globalEvents.interfaces'

@Injectable()
export class GlobalEventsService {
	pageLoadedSource = new Subject<{[x: string]: any} | void>()
	triggerInitialDataLoadSource = new Subject<void>()
	initialDataLoadedSource = new Subject<any>()
	setLayoutDataSource = new Subject<{[x: string]: any}>()
	getLayoutDataSource = new Subject<{eventId: number, eventType: string, payload?: {[x: string]: any}}>()
	layoutDataChangedSource = new Subject<{[x: string]: any}>()
	redirectSource = new Subject<{route: string, options: GESRedirectOptionsInterface}>()
	notifySource = new Subject<{type: string, message: string}>()
	toggleLoaderSource = new Subject<boolean>()

	pageLoaded$ = this.pageLoadedSource.asObservable()
	triggerInitialDataLoad$ = this.triggerInitialDataLoadSource.asObservable()
	initialDataLoaded$ = this.initialDataLoadedSource.asObservable()
	setLayoutData$ = this.setLayoutDataSource.asObservable()
	getLayoutData$ = this.getLayoutDataSource.asObservable()
	layoutDataChanged$ = this.layoutDataChangedSource.asObservable()
	redirect$ = this.redirectSource.asObservable()
	notify$ = this.notifySource.asObservable()
	toggleLoader$ = this.toggleLoaderSource.asObservable()

	pageLoaded(data): void {
		this.pageLoadedSource.next(data)
	}

	triggerInitialDataLoad(): void {
		this.triggerInitialDataLoadSource.next()
	}

	initialDataLoaded(data): void {
		this.initialDataLoadedSource.next(data)
	}

	setLayoutData(data): void {
		this.setLayoutDataSource.next(data)
	}

	getLayoutData(): Promise<{[fieldName: string]: any}> {
		return new Promise((resolve) => {
			const ts = (new Date()).valueOf()
			const sub = this.getLayoutData$.subscribe((data) => {
				if ((data.eventId !== ts) || (data.eventType !== 'reply')) {
					return
				}
				sub.unsubscribe()
				resolve(data.payload)
			})
			this.getLayoutDataSource.next({eventId: ts, eventType: 'request'})
		})
	}

	layoutDataChanged(data): void {
		this.layoutDataChangedSource.next(data)
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
