import {Directive, ViewContainerRef} from '@angular/core'

@Directive({
	selector: '[component-injector-area]'
})
export class ComponentInjectorAreaDirective {
	constructor(public viewContainerRef: ViewContainerRef) {
	}
}
