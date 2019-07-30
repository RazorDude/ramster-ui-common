import {AfterViewInit, Component, ChangeDetectorRef, ComponentFactoryResolver, Input, ViewChild} from '@angular/core'
import {ComponentInjectorAreaDirective} from './componentInjector.directive'

@Component({
	selector: 'component-injector',
	templateUrl: './componentInjector.template.html'
})
export class ComponentInjector implements AfterViewInit {
	componentRefInstance: any

	@ViewChild(ComponentInjectorAreaDirective) componentRef: ComponentInjectorAreaDirective
	@Input() component: any
	@Input() data: any

	constructor(
		private cdRef:ChangeDetectorRef,
		private componentFactoryResolver: ComponentFactoryResolver) {
	}

	ngAfterViewInit() {
		let componentFactory = this.componentFactoryResolver.resolveComponentFactory(this.component),
			viewContainerRef = this.componentRef.viewContainerRef
		viewContainerRef.clear()
		this.componentRefInstance = viewContainerRef.createComponent(componentFactory).instance
		this.componentRefInstance.data = this.data
		this.cdRef.detectChanges()
	}
}
