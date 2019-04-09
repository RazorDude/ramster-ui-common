import {BaseRESTService} from '../index'
import {Injectable, Injector} from '@angular/core'

@Injectable()
export class ModelRESTServiceProviderService {
	modelRESTServices: {[key: string]: BaseRESTService} = {}

	constructor(
		public injector: Injector
	) {
	}

	get(componentName: string): BaseRESTService {
		return this.modelRESTServices[`${componentName}ModelRESTService`]
	}

	setServices(data: {[key: string]: BaseRESTService}): void {
		this.modelRESTServices = {}
		Object.keys(data).forEach((key) => {
			this.modelRESTServices[`${key.charAt(0).toLowerCase()}${key.substr(1, key.length)}`] = this.injector.get(data[key])
		})
	}
}
