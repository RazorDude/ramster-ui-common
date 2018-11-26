import co from 'co'
import {Injectable} from '@angular/core'
import {HttpHeaders} from '@angular/common/http'

import {GlobalEventsService} from './globalEvents/globalEvents.service'
import {RequestService} from './request.service'

@Injectable()
export class FilesRESTService {
	// {'Content-Type': 'application/json'}
	headers = new HttpHeaders()
	baseUrl = '/files'

	constructor(
		public globalEventsService: GlobalEventsService,
		public requestService: RequestService
	) {}

	handleError(err): void {
		this.globalEventsService.notify('error', err && err.error && err.error.error || 'An error has occurred.')
	}

	upload(file: File, params: {outputFileName: string, [x: string]: any}, options?: {handleError?: boolean}): Promise<any> {
		const instance = this
		return new Promise((resolve, reject) => {
			co(function*() {
				let fd = new FormData()
				fd.append('file', file, file.name)
				for (const key in params) {
					fd.append(key, params[key])
				}
				instance.headers.set('Content-Type', 'multipart/form-data')
				yield instance.requestService.run('post', `${instance.baseUrl}`, {
					headers: instance.headers,
					body: fd
				})
				return {success: true}
			}).then((res) => resolve(res), (err) => {
				if (options && options.handleError) {
					instance.handleError(err)
				}
				reject({error: err || true})
			})
		})
	}

	read(params): Promise<any> {
		const instance = this
		return new Promise((resolve, reject) => {
			co(function*() {
				return yield instance.requestService.run('get', `${instance.baseUrl}/item`, {
					headers: instance.headers,
					params
				})
			}).then((res) => resolve(res), (err) => {
				instance.handleError(err)
				reject({error: true})
			})
		})
	}
}
