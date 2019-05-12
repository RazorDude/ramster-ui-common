import co from 'co'
import {HttpHeaders} from '@angular/common/http'
import {GlobalEventsService} from './globalEvents/globalEvents.service'
import {Injectable} from '@angular/core'
import {RequestService} from './request.service'
import {Subject} from 'rxjs'

@Injectable()
export class BaseRESTService {
	baseUrl = '/'
	headers = new HttpHeaders({'Content-Type': 'application/json'})
	redirectOnForbiddenUrl?: string = null

	constructor(
		public globalEventsService: GlobalEventsService,
		public requestService: RequestService
	) {}

	emptyToNull(data: any): any {
		if (data === '') {
			return null
		}
		if (data instanceof Date) {
			return data
		}
		if (data instanceof Array) {
			return data.map((item, index) => this.emptyToNull(item))
		}
		if ((typeof data === 'object') && (data !== null)) {
			const parsedData = {}
			for (const key in data) {
				parsedData[key] = this.emptyToNull(data[key])
			}
			return parsedData
		}
		return data
	}

	stringifyGetParams(data: {[key: string]: any}): {[key: string]: any} {
		let stringifiedObject = {}
		for (const key in data) {
			const value = data[key]
			if ((value instanceof Array) || ((typeof value === 'object') && (value !== null) && !(value instanceof Date))) {
				stringifiedObject[`_json_${key}`] = JSON.stringify(value)
				continue
			}
			stringifiedObject[key] = value
		}
		return stringifiedObject
	}

	handleError(err: any, options?: {notifyOnError?: boolean}): void {
		const {notifyOnError} = options || {} as any
		if (!err) {
			if (notifyOnError !== false) {
				this.globalEventsService.notify('error', 'An error has occurred.')
			}
			return
		}
		if (this.redirectOnForbiddenUrl && (err.status === 401)) {
			this.globalEventsService.redirect(this.redirectOnForbiddenUrl)
			return
		}
		if (notifyOnError !== false) {
			this.globalEventsService.notify('error', err.error && err.error.error || 'An error has occurred.')
		}
	}

	create(params): Promise<any> {
		const instance = this
		return new Promise((resolve, reject) => {
			co(function*() {
				return yield instance.requestService.run('post', `${instance.baseUrl}`, {
					headers: instance.headers,
					body: instance.emptyToNull(params)
				})
			}).then((res) => resolve(res), (err) => {
				instance.handleError(err)
				reject({error: true})
			})
		})
	}

	read(params): Promise<any> {
		const instance = this
		return new Promise((resolve, reject) => {
			co(function*() {
				return yield instance.requestService.run('get', `${instance.baseUrl}/item`, {
					headers: instance.headers,
					params: instance.stringifyGetParams(instance.emptyToNull(params))
				})
			}).then((res) => resolve(res), (err) => {
				instance.handleError(err)
				reject({error: true})
			})
		})
	}

	readList(params): Promise<any> {
		const instance = this
		return new Promise((resolve, reject) => {
			co(function*() {
				return yield instance.requestService.run('get', `${instance.baseUrl}`, {
					headers: instance.headers,
					params: instance.stringifyGetParams(instance.emptyToNull(params))
				})
			}).then((res) => resolve(res), (err) => {
				instance.handleError(err)
				reject({error: true})
			})
		})
	}

	streamReadList(
		params: {[key: string]: any},
		onMessage: Function,
		options?: {onError?: Function, reconnectAttemptInterval?: number, reconnectAttemptsLeft?: number}
	): Subject<void> {
		const actualOptions = options || {},
			{onError, reconnectAttemptInterval} = actualOptions,
			errorHandler = onError ? onError : this.handleError.bind(this)
		let reconnectAttemptsLeft = actualOptions.reconnectAttemptsLeft,
			url = `${window.location.origin}${this.baseUrl}/streamList`,
			stringifiedParams = this.stringifyGetParams(this.emptyToNull(params)),
			firstParam = true
		for (const key in stringifiedParams) {
			if (firstParam) {
				firstParam = false
				url += '?'
			} else {
				url += '&'
			}
			url += `${key}=${stringifiedParams[key]}`
		}
		let eventSource = new EventSource(url),
			closeSubject = new Subject<void>(),
			reconnectAllowed = {value: true}
		eventSource.onmessage = (event) => onMessage(event)
		eventSource.onerror = (err) => errorHandler(err)
		let interval = setInterval(() => {
			if (
				(eventSource.readyState === 2) &&
				reconnectAllowed.value &&
				((typeof reconnectAttemptsLeft === 'undefined') || reconnectAttemptsLeft > 0)
			) {
				eventSource = new EventSource(url)
				eventSource.onmessage = (event) => onMessage(event)
				eventSource.onerror = (err) => errorHandler(err)
				if (typeof reconnectAttemptsLeft !== 'undefined') {
					reconnectAttemptsLeft--
				}
				return
			}
			clearInterval(interval)
		}, reconnectAttemptInterval || 5000)
		closeSubject.subscribe(() => {
			reconnectAllowed.value = false
			eventSource.close()
		})
		return closeSubject
	}

	readSelectList(params): Promise<any> {
		const instance = this
		return new Promise((resolve, reject) => {
			co(function*() {
				return yield instance.requestService.run('get', `${instance.baseUrl}/selectList`, {
					headers: instance.headers,
					params: instance.stringifyGetParams(instance.emptyToNull(params))
				})
			}).then((res) => resolve(res), (err) => {
				instance.handleError(err)
				reject({error: true})
			})
		})
	}

	update(params): Promise<any> {
		const instance = this
		return new Promise((resolve, reject) => {
			co(function*() {
				return yield instance.requestService.run('patch', `${instance.baseUrl}/item/${params.id}`, {
					headers: instance.headers,
					body: instance.emptyToNull(params)
				})
			}).then((res) => resolve(res), (err) => {
				instance.handleError(err)
				reject({error: true})
			})
		})
	}

	bulkUpsert(params): Promise<any> {
		const instance = this
		return new Promise((resolve, reject) => {
			co(function*() {
				return yield instance.requestService.run('put', `${instance.baseUrl}`, {
					headers: instance.headers,
					body: instance.emptyToNull(params)
				})
			}).then((res) => resolve(res), (err) => {
				instance.handleError(err)
				reject({error: true})
			})
		})
	}

	delete(params): Promise<any> {
		const instance = this
		return new Promise((resolve, reject) => {
			co(function*() {
				return yield instance.requestService.run('delete', `${instance.baseUrl}/${params.id}`, {
					headers: instance.headers,
					body: instance.emptyToNull(params)
				})
			}).then((res) => resolve(res), (err) => {
				instance.handleError(err)
				reject({error: true})
			})
		})
	}
}
