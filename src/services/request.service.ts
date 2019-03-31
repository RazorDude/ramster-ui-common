import {Injectable} from '@angular/core'
import {HttpClient, HttpParams, HttpRequest, HttpResponse} from '@angular/common/http'


@Injectable()
export class RequestService {
	constructor(public client: HttpClient) {}

	flattenObjectForQuery(object: {[x: string]: any} | any[], parentKey?: string): {key: string, value: any}[] {
		let returnObject = []
		if (object instanceof Array) {
			if (!parentKey) {
				throw {error: 'The top-most item cannot be an array.'}
			}
			object.forEach((item) => {
				if (item === null) {
					return
				}
				if ((item instanceof Date) || !(item instanceof Array)  || (typeof item !== 'object')) {
					returnObject.push({key: `${parentKey}[]`, value: item})
					return
				}
				returnObject = returnObject.concat(this.flattenObjectForQuery(item, `${parentKey}[]`))
				return
			})
			return returnObject
		}
		for (const key in object) {
			const value = object[key]
			if (value === null) {
				continue
			}
			if ((value instanceof Date) || (typeof value !== 'object')) {
				returnObject.push({key: parentKey ? `${parentKey}[${key}]`: key, value})
				continue
			}
			returnObject = returnObject.concat(this.flattenObjectForQuery(value, parentKey ? `${parentKey}[${key}]` : key))
		}
		return returnObject
	}

	run(method: string, url: string, options?: {[x: string]: any}) {
		return new Promise((resolve, reject) => {
			try {
				let runOptions = {} as any,
					requestOptions = {} as any,
					body = null
				if (options && (typeof options === 'object')) {
					let {resolveWithFullResponse, ... otherOptions} = options
					requestOptions = otherOptions
					runOptions = {resolveWithFullResponse}
				}
				if (method.toLowerCase() === 'get') {
					if (!requestOptions || (typeof requestOptions !== 'object')) {
						requestOptions = {}
					}
					const optionsParams = this.flattenObjectForQuery(requestOptions.params || {})
					let httpParams = new HttpParams()
					optionsParams.forEach((item) => {
						httpParams = httpParams.set(item.key, item.value)
					})
					httpParams = httpParams.set('_', (new Date()).getTime().toString())
					requestOptions.params = httpParams
				} else {
					if (!requestOptions || (typeof requestOptions !== 'object')) {
						requestOptions = {}
					}
					body = (!requestOptions.body || (typeof requestOptions.body !== 'object')) ? {} : requestOptions.body
					body._ = (new Date()).getTime()
					delete requestOptions.body
				}
				if (!requestOptions.responseType) {}
				this.client.request(new HttpRequest(method, url, body, requestOptions)).toPromise().then(
					(response: HttpResponse<any>) => runOptions.resolveWithFullResponse ? resolve(response) : resolve(response.body),
					(error: any) => reject(error)
				)
			} catch(error) {
				reject(error)
			}
		})
	}
}
