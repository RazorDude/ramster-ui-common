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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFzZS1wYWdlLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL3JhbXN0ZXItdWktY29yZS8iLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvYmFzZS1wYWdlLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsWUFBWSxDQUFBO0FBSVosT0FBTyxFQUFDLE9BQU8sRUFBQyxNQUFNLE1BQU0sQ0FBQTtBQUM1QixPQUFPLEVBQUMsU0FBUyxFQUFDLE1BQU0sZ0JBQWdCLENBQUE7QUFJeEMsTUFBTSxPQUFPLGlCQUFpQjs7Ozs7OztJQU03QixZQUNRLGNBQThCLEVBQzlCLG1CQUF3QyxFQUN4QyxpQkFBMkIsRUFDM0IsOEJBQXdDO1FBSHhDLG1CQUFjLEdBQWQsY0FBYyxDQUFnQjtRQUM5Qix3QkFBbUIsR0FBbkIsbUJBQW1CLENBQXFCO1FBQ3hDLHNCQUFpQixHQUFqQixpQkFBaUIsQ0FBVTtRQUMzQixtQ0FBOEIsR0FBOUIsOEJBQThCLENBQVU7UUFUaEQsY0FBUyxHQUFrQixJQUFJLE9BQU8sRUFBRSxDQUFBO0lBV3hDLENBQUM7Ozs7SUFFRCxRQUFRO1FBQ1AsSUFBSSxDQUFDLG1CQUFtQixDQUFDLGtCQUFrQixDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsSUFBSSxFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQTtRQUM3SCxJQUFJLENBQUMsaUJBQWlCLENBQUMsT0FBTyxDQUFDLENBQUMsVUFBVSxFQUFFLEVBQUU7WUFDN0MsSUFBSSxPQUFPLElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxVQUFVLEVBQUU7Z0JBQzNDLElBQUksQ0FBQyxVQUFVLENBQUMsRUFBRSxDQUFBO2FBQ2xCO1FBQ0YsQ0FBQyxDQUFDLENBQUE7SUFDSCxDQUFDOzs7O0lBRUQsS0FBSztRQUNKLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFBO1FBQzNELElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFBO1FBQ3RELElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxVQUFVLENBQUMsRUFBQyxXQUFXLEVBQUUsSUFBSSxDQUFDLFdBQVcsRUFBRSxXQUFXLEVBQUUsSUFBSSxDQUFDLFdBQVcsRUFBQyxDQUFDLENBQUE7SUFDcEcsQ0FBQzs7Ozs7SUFFRCxpQkFBaUIsQ0FBQyxJQUFJO1FBQ3JCLElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQTtRQUM3QixJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUE7UUFDbkMsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFBO1FBQ25DLElBQUksQ0FBQyw4QkFBOEIsQ0FBQyxPQUFPLENBQUMsQ0FBQyxVQUFVLEVBQUUsRUFBRTtZQUMxRCxJQUFJLE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLFVBQVUsRUFBRTtnQkFDM0MsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFBO2FBQ3RCO1FBQ0YsQ0FBQyxDQUFDLENBQUE7SUFDSCxDQUFDOzs7O0lBRUQsVUFBVTtRQUNULElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxFQUFFLENBQUE7UUFDckIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLEVBQUUsQ0FBQTtJQUMxQixDQUFDOzs7O0lBRUQsV0FBVztRQUNWLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQTtJQUNsQixDQUFDO0NBQ0Q7OztJQS9DQSxzQ0FBd0M7O0lBQ3hDLHlDQUFrQjs7SUFDbEIsd0NBQWtDOztJQUNsQyx3Q0FBa0M7O0lBR2pDLDJDQUFxQzs7SUFDckMsZ0RBQStDOztJQUMvQyw4Q0FBa0M7O0lBQ2xDLDJEQUErQyIsInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0J1xyXG5cclxuaW1wb3J0IHtBY3RpdmF0ZWRSb3V0ZX0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJ1xyXG5pbXBvcnQge09uRGVzdHJveSwgT25Jbml0fSBmcm9tICdAYW5ndWxhci9jb3JlJ1xyXG5pbXBvcnQge1N1YmplY3R9IGZyb20gJ3J4anMnXHJcbmltcG9ydCB7dGFrZVVudGlsfSBmcm9tICdyeGpzL29wZXJhdG9ycydcclxuXHJcbmltcG9ydCB7R2xvYmFsRXZlbnRzU2VydmljZX0gZnJvbSAnLi4vc2VydmljZXMvZ2xvYmFsRXZlbnRzL2dsb2JhbEV2ZW50cy5zZXJ2aWNlJ1xyXG5cclxuZXhwb3J0IGNsYXNzIEJhc2VQYWdlQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3kge1xyXG5cdGRlc3Ryb3llZDogU3ViamVjdDx2b2lkPiA9IG5ldyBTdWJqZWN0KClcclxuXHRsb2dnZWRJblVzZXI/OiBhbnlcclxuXHRxdWVyeVBhcmFtczoge1t4OiBzdHJpbmddOiBzdHJpbmd9XHJcblx0cm91dGVQYXJhbXM6IHtbeDogc3RyaW5nXTogc3RyaW5nfVxyXG5cclxuXHRjb25zdHJ1Y3RvcihcclxuXHRcdHB1YmxpYyBhY3RpdmF0ZWRSb3V0ZTogQWN0aXZhdGVkUm91dGUsXHJcblx0XHRwdWJsaWMgZ2xvYmFsRXZlbnRzU2VydmljZTogR2xvYmFsRXZlbnRzU2VydmljZSxcclxuXHRcdHB1YmxpYyBvbkluaXRNZXRob2ROYW1lczogc3RyaW5nW10sXHJcblx0XHRwdWJsaWMgb25Jbml0aWFsRGF0YUxvYWRlZE1ldGhvZE5hbWVzOiBzdHJpbmdbXVxyXG5cdCkge1xyXG5cdH1cclxuXHJcblx0bmdPbkluaXQoKSB7XHJcblx0XHR0aGlzLmdsb2JhbEV2ZW50c1NlcnZpY2UuaW5pdGlhbERhdGFMb2FkZWQkLnBpcGUodGFrZVVudGlsKHRoaXMuZGVzdHJveWVkKSkuc3Vic2NyaWJlKChkYXRhKSA9PiB0aGlzLmluaXRpYWxEYXRhTG9hZGVkKGRhdGEpKVxyXG5cdFx0dGhpcy5vbkluaXRNZXRob2ROYW1lcy5mb3JFYWNoKChtZXRob2ROYW1lKSA9PiB7XHJcblx0XHRcdGlmICh0eXBlb2YgdGhpc1ttZXRob2ROYW1lXSA9PT0gJ2Z1bmN0aW9uJykge1xyXG5cdFx0XHRcdHRoaXNbbWV0aG9kTmFtZV0oKVxyXG5cdFx0XHR9XHJcblx0XHR9KVxyXG5cdH1cclxuXHJcblx0cmVzZXQoKTogdm9pZCB7XHJcblx0XHR0aGlzLnF1ZXJ5UGFyYW1zID0gdGhpcy5hY3RpdmF0ZWRSb3V0ZS5zbmFwc2hvdC5xdWVyeVBhcmFtc1xyXG5cdFx0dGhpcy5yb3V0ZVBhcmFtcyA9IHRoaXMuYWN0aXZhdGVkUm91dGUuc25hcHNob3QucGFyYW1zXHJcblx0XHR0aGlzLmdsb2JhbEV2ZW50c1NlcnZpY2UucGFnZUxvYWRlZCh7cXVlcnlQYXJhbXM6IHRoaXMucXVlcnlQYXJhbXMsIHJvdXRlUGFyYW1zOiB0aGlzLnJvdXRlUGFyYW1zfSlcclxuXHR9XHJcblxyXG5cdGluaXRpYWxEYXRhTG9hZGVkKGRhdGEpOiB2b2lkIHtcclxuXHRcdHRoaXMubG9nZ2VkSW5Vc2VyID0gZGF0YS51c2VyXHJcblx0XHR0aGlzLnF1ZXJ5UGFyYW1zID0gZGF0YS5xdWVyeVBhcmFtc1xyXG5cdFx0dGhpcy5yb3V0ZVBhcmFtcyA9IGRhdGEucm91dGVQYXJhbXNcclxuXHRcdHRoaXMub25Jbml0aWFsRGF0YUxvYWRlZE1ldGhvZE5hbWVzLmZvckVhY2goKG1ldGhvZE5hbWUpID0+IHtcclxuXHRcdFx0aWYgKHR5cGVvZiB0aGlzW21ldGhvZE5hbWVdID09PSAnZnVuY3Rpb24nKSB7XHJcblx0XHRcdFx0dGhpc1ttZXRob2ROYW1lXShkYXRhKVxyXG5cdFx0XHR9XHJcblx0XHR9KVxyXG5cdH1cclxuXHJcblx0ZGVzdHJ1Y3RvcigpIHtcclxuXHRcdHRoaXMuZGVzdHJveWVkLm5leHQoKVxyXG5cdFx0dGhpcy5kZXN0cm95ZWQuY29tcGxldGUoKVxyXG5cdH1cclxuXHJcblx0bmdPbkRlc3Ryb3koKSB7XHJcblx0XHR0aGlzLmRlc3RydWN0b3IoKVxyXG5cdH1cclxufVxyXG4iXX0=