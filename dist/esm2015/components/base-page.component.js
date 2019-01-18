/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
'use strict';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
export class BasePageComponent {
    /**
     * @param {?} activatedRoute
     * @param {?} globalEventsService
     * @param {?} onInitMethodNames
     * @param {?} onInitialDataLoadedMethodNames
     */
    constructor(activatedRoute, globalEventsService, onInitMethodNames, onInitialDataLoadedMethodNames) {
        this.activatedRoute = activatedRoute;
        this.globalEventsService = globalEventsService;
        this.onInitMethodNames = onInitMethodNames;
        this.onInitialDataLoadedMethodNames = onInitialDataLoadedMethodNames;
        this.destroyed = new Subject();
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.globalEventsService.initialDataLoaded$.pipe(takeUntil(this.destroyed)).subscribe((data) => this.initialDataLoaded(data));
        this.onInitMethodNames.forEach((methodName) => {
            if (typeof this[methodName] === 'function') {
                this[methodName]();
            }
        });
    }
    /**
     * @return {?}
     */
    reset() {
        this.queryParams = this.activatedRoute.snapshot.queryParams;
        this.routeParams = this.activatedRoute.snapshot.params;
    }
    /**
     * @return {?}
     */
    sendPageLoadedEvent() {
        this.globalEventsService.pageLoaded({ queryParams: this.queryParams, routeParams: this.routeParams });
    }
    /**
     * @param {?} data
     * @return {?}
     */
    initialDataLoaded(data) {
        this.loggedInUser = data.user;
        this.queryParams = data.queryParams;
        this.routeParams = data.routeParams;
        this.onInitialDataLoadedMethodNames.forEach((methodName) => {
            if (typeof this[methodName] === 'function') {
                this[methodName](data);
            }
        });
    }
    /**
     * @return {?}
     */
    destructor() {
        this.destroyed.next();
        this.destroyed.complete();
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.destructor();
    }
}
if (false) {
    /** @type {?} */
    BasePageComponent.prototype.destroyed;
    /** @type {?} */
    BasePageComponent.prototype.loggedInUser;
    /** @type {?} */
    BasePageComponent.prototype.queryParams;
    /** @type {?} */
    BasePageComponent.prototype.routeParams;
    /** @type {?} */
    BasePageComponent.prototype.activatedRoute;
    /** @type {?} */
    BasePageComponent.prototype.globalEventsService;
    /** @type {?} */
    BasePageComponent.prototype.onInitMethodNames;
    /** @type {?} */
    BasePageComponent.prototype.onInitialDataLoadedMethodNames;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFzZS1wYWdlLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL3JhbXN0ZXItdWktY29yZS8iLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvYmFzZS1wYWdlLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsWUFBWSxDQUFBO0FBSVosT0FBTyxFQUFDLE9BQU8sRUFBQyxNQUFNLE1BQU0sQ0FBQTtBQUM1QixPQUFPLEVBQUMsU0FBUyxFQUFDLE1BQU0sZ0JBQWdCLENBQUE7QUFJeEMsTUFBTSxPQUFPLGlCQUFpQjs7Ozs7OztJQU03QixZQUNRLGNBQThCLEVBQzlCLG1CQUF3QyxFQUN4QyxpQkFBMkIsRUFDM0IsOEJBQXdDO1FBSHhDLG1CQUFjLEdBQWQsY0FBYyxDQUFnQjtRQUM5Qix3QkFBbUIsR0FBbkIsbUJBQW1CLENBQXFCO1FBQ3hDLHNCQUFpQixHQUFqQixpQkFBaUIsQ0FBVTtRQUMzQixtQ0FBOEIsR0FBOUIsOEJBQThCLENBQVU7UUFUaEQsY0FBUyxHQUFrQixJQUFJLE9BQU8sRUFBRSxDQUFBO0lBV3hDLENBQUM7Ozs7SUFFRCxRQUFRO1FBQ1AsSUFBSSxDQUFDLG1CQUFtQixDQUFDLGtCQUFrQixDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsSUFBSSxFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQTtRQUM3SCxJQUFJLENBQUMsaUJBQWlCLENBQUMsT0FBTyxDQUFDLENBQUMsVUFBVSxFQUFFLEVBQUU7WUFDN0MsSUFBSSxPQUFPLElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxVQUFVLEVBQUU7Z0JBQzNDLElBQUksQ0FBQyxVQUFVLENBQUMsRUFBRSxDQUFBO2FBQ2xCO1FBQ0YsQ0FBQyxDQUFDLENBQUE7SUFDSCxDQUFDOzs7O0lBRUQsS0FBSztRQUNKLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFBO1FBQzNELElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFBO0lBQ3ZELENBQUM7Ozs7SUFFRCxtQkFBbUI7UUFDbEIsSUFBSSxDQUFDLG1CQUFtQixDQUFDLFVBQVUsQ0FBQyxFQUFDLFdBQVcsRUFBRSxJQUFJLENBQUMsV0FBVyxFQUFFLFdBQVcsRUFBRSxJQUFJLENBQUMsV0FBVyxFQUFDLENBQUMsQ0FBQTtJQUNwRyxDQUFDOzs7OztJQUVELGlCQUFpQixDQUFDLElBQUk7UUFDckIsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFBO1FBQzdCLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQTtRQUNuQyxJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUE7UUFDbkMsSUFBSSxDQUFDLDhCQUE4QixDQUFDLE9BQU8sQ0FBQyxDQUFDLFVBQVUsRUFBRSxFQUFFO1lBQzFELElBQUksT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssVUFBVSxFQUFFO2dCQUMzQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUE7YUFDdEI7UUFDRixDQUFDLENBQUMsQ0FBQTtJQUNILENBQUM7Ozs7SUFFRCxVQUFVO1FBQ1QsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLEVBQUUsQ0FBQTtRQUNyQixJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsRUFBRSxDQUFBO0lBQzFCLENBQUM7Ozs7SUFFRCxXQUFXO1FBQ1YsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFBO0lBQ2xCLENBQUM7Q0FDRDs7O0lBbERBLHNDQUF3Qzs7SUFDeEMseUNBQWtCOztJQUNsQix3Q0FBa0M7O0lBQ2xDLHdDQUFrQzs7SUFHakMsMkNBQXFDOztJQUNyQyxnREFBK0M7O0lBQy9DLDhDQUFrQzs7SUFDbEMsMkRBQStDIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnXHJcblxyXG5pbXBvcnQge0FjdGl2YXRlZFJvdXRlfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInXHJcbmltcG9ydCB7T25EZXN0cm95LCBPbkluaXR9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnXHJcbmltcG9ydCB7U3ViamVjdH0gZnJvbSAncnhqcydcclxuaW1wb3J0IHt0YWtlVW50aWx9IGZyb20gJ3J4anMvb3BlcmF0b3JzJ1xyXG5cclxuaW1wb3J0IHtHbG9iYWxFdmVudHNTZXJ2aWNlfSBmcm9tICcuLi9zZXJ2aWNlcy9nbG9iYWxFdmVudHMvZ2xvYmFsRXZlbnRzLnNlcnZpY2UnXHJcblxyXG5leHBvcnQgY2xhc3MgQmFzZVBhZ2VDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSB7XHJcblx0ZGVzdHJveWVkOiBTdWJqZWN0PHZvaWQ+ID0gbmV3IFN1YmplY3QoKVxyXG5cdGxvZ2dlZEluVXNlcj86IGFueVxyXG5cdHF1ZXJ5UGFyYW1zOiB7W3g6IHN0cmluZ106IHN0cmluZ31cclxuXHRyb3V0ZVBhcmFtczoge1t4OiBzdHJpbmddOiBzdHJpbmd9XHJcblxyXG5cdGNvbnN0cnVjdG9yKFxyXG5cdFx0cHVibGljIGFjdGl2YXRlZFJvdXRlOiBBY3RpdmF0ZWRSb3V0ZSxcclxuXHRcdHB1YmxpYyBnbG9iYWxFdmVudHNTZXJ2aWNlOiBHbG9iYWxFdmVudHNTZXJ2aWNlLFxyXG5cdFx0cHVibGljIG9uSW5pdE1ldGhvZE5hbWVzOiBzdHJpbmdbXSxcclxuXHRcdHB1YmxpYyBvbkluaXRpYWxEYXRhTG9hZGVkTWV0aG9kTmFtZXM6IHN0cmluZ1tdXHJcblx0KSB7XHJcblx0fVxyXG5cclxuXHRuZ09uSW5pdCgpIHtcclxuXHRcdHRoaXMuZ2xvYmFsRXZlbnRzU2VydmljZS5pbml0aWFsRGF0YUxvYWRlZCQucGlwZSh0YWtlVW50aWwodGhpcy5kZXN0cm95ZWQpKS5zdWJzY3JpYmUoKGRhdGEpID0+IHRoaXMuaW5pdGlhbERhdGFMb2FkZWQoZGF0YSkpXHJcblx0XHR0aGlzLm9uSW5pdE1ldGhvZE5hbWVzLmZvckVhY2goKG1ldGhvZE5hbWUpID0+IHtcclxuXHRcdFx0aWYgKHR5cGVvZiB0aGlzW21ldGhvZE5hbWVdID09PSAnZnVuY3Rpb24nKSB7XHJcblx0XHRcdFx0dGhpc1ttZXRob2ROYW1lXSgpXHJcblx0XHRcdH1cclxuXHRcdH0pXHJcblx0fVxyXG5cclxuXHRyZXNldCgpOiB2b2lkIHtcclxuXHRcdHRoaXMucXVlcnlQYXJhbXMgPSB0aGlzLmFjdGl2YXRlZFJvdXRlLnNuYXBzaG90LnF1ZXJ5UGFyYW1zXHJcblx0XHR0aGlzLnJvdXRlUGFyYW1zID0gdGhpcy5hY3RpdmF0ZWRSb3V0ZS5zbmFwc2hvdC5wYXJhbXNcclxuXHR9XHJcblxyXG5cdHNlbmRQYWdlTG9hZGVkRXZlbnQoKSB7XHJcblx0XHR0aGlzLmdsb2JhbEV2ZW50c1NlcnZpY2UucGFnZUxvYWRlZCh7cXVlcnlQYXJhbXM6IHRoaXMucXVlcnlQYXJhbXMsIHJvdXRlUGFyYW1zOiB0aGlzLnJvdXRlUGFyYW1zfSlcclxuXHR9XHJcblxyXG5cdGluaXRpYWxEYXRhTG9hZGVkKGRhdGEpOiB2b2lkIHtcclxuXHRcdHRoaXMubG9nZ2VkSW5Vc2VyID0gZGF0YS51c2VyXHJcblx0XHR0aGlzLnF1ZXJ5UGFyYW1zID0gZGF0YS5xdWVyeVBhcmFtc1xyXG5cdFx0dGhpcy5yb3V0ZVBhcmFtcyA9IGRhdGEucm91dGVQYXJhbXNcclxuXHRcdHRoaXMub25Jbml0aWFsRGF0YUxvYWRlZE1ldGhvZE5hbWVzLmZvckVhY2goKG1ldGhvZE5hbWUpID0+IHtcclxuXHRcdFx0aWYgKHR5cGVvZiB0aGlzW21ldGhvZE5hbWVdID09PSAnZnVuY3Rpb24nKSB7XHJcblx0XHRcdFx0dGhpc1ttZXRob2ROYW1lXShkYXRhKVxyXG5cdFx0XHR9XHJcblx0XHR9KVxyXG5cdH1cclxuXHJcblx0ZGVzdHJ1Y3RvcigpIHtcclxuXHRcdHRoaXMuZGVzdHJveWVkLm5leHQoKVxyXG5cdFx0dGhpcy5kZXN0cm95ZWQuY29tcGxldGUoKVxyXG5cdH1cclxuXHJcblx0bmdPbkRlc3Ryb3koKSB7XHJcblx0XHR0aGlzLmRlc3RydWN0b3IoKVxyXG5cdH1cclxufVxyXG4iXX0=