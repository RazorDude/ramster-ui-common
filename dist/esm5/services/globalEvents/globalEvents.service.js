/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
var GlobalEventsService = /** @class */ (function () {
    function GlobalEventsService() {
        this.pageLoadedSource = new Subject();
        this.triggerInitialDataLoadSource = new Subject();
        this.initialDataLoadedSource = new Subject();
        this.setLayoutDataSource = new Subject();
        this.getLayoutDataSource = new Subject();
        this.layoutDataChangedSource = new Subject();
        this.redirectSource = new Subject();
        this.notifySource = new Subject();
        this.toggleLoaderSource = new Subject();
        this.pageLoaded$ = this.pageLoadedSource.asObservable();
        this.triggerInitialDataLoad$ = this.triggerInitialDataLoadSource.asObservable();
        this.initialDataLoaded$ = this.initialDataLoadedSource.asObservable();
        this.setLayoutData$ = this.setLayoutDataSource.asObservable();
        this.getLayoutData$ = this.getLayoutDataSource.asObservable();
        this.layoutDataChanged$ = this.layoutDataChangedSource.asObservable();
        this.redirect$ = this.redirectSource.asObservable();
        this.notify$ = this.notifySource.asObservable();
        this.toggleLoader$ = this.toggleLoaderSource.asObservable();
    }
    /**
     * @param {?} data
     * @return {?}
     */
    GlobalEventsService.prototype.pageLoaded = /**
     * @param {?} data
     * @return {?}
     */
    function (data) {
        this.pageLoadedSource.next(data);
    };
    /**
     * @return {?}
     */
    GlobalEventsService.prototype.triggerInitialDataLoad = /**
     * @return {?}
     */
    function () {
        this.triggerInitialDataLoadSource.next();
    };
    /**
     * @param {?} data
     * @return {?}
     */
    GlobalEventsService.prototype.initialDataLoaded = /**
     * @param {?} data
     * @return {?}
     */
    function (data) {
        this.initialDataLoadedSource.next(data);
    };
    /**
     * @param {?} data
     * @return {?}
     */
    GlobalEventsService.prototype.setLayoutData = /**
     * @param {?} data
     * @return {?}
     */
    function (data) {
        this.setLayoutDataSource.next(data);
    };
    /**
     * @return {?}
     */
    GlobalEventsService.prototype.getLayoutData = /**
     * @return {?}
     */
    function () {
        var _this = this;
        return new Promise((/**
         * @param {?} resolve
         * @return {?}
         */
        function (resolve) {
            /** @type {?} */
            var ts = (new Date()).valueOf();
            /** @type {?} */
            var sub = _this.getLayoutData$.subscribe((/**
             * @param {?} data
             * @return {?}
             */
            function (data) {
                if ((data.eventId !== ts) || (data.eventType !== 'reply')) {
                    return;
                }
                sub.unsubscribe();
                resolve(data.payload);
            }));
            _this.getLayoutDataSource.next({ eventId: ts, eventType: 'request' });
        }));
    };
    /**
     * @param {?} data
     * @return {?}
     */
    GlobalEventsService.prototype.layoutDataChanged = /**
     * @param {?} data
     * @return {?}
     */
    function (data) {
        this.layoutDataChangedSource.next(data);
    };
    /**
     * @param {?} route
     * @param {?=} options
     * @return {?}
     */
    GlobalEventsService.prototype.redirect = /**
     * @param {?} route
     * @param {?=} options
     * @return {?}
     */
    function (route, options) {
        this.redirectSource.next({ route: route, options: options });
    };
    /**
     * @param {?} type
     * @param {?} message
     * @return {?}
     */
    GlobalEventsService.prototype.notify = /**
     * @param {?} type
     * @param {?} message
     * @return {?}
     */
    function (type, message) {
        this.notifySource.next({ type: type, message: message });
    };
    /**
     * @param {?} active
     * @return {?}
     */
    GlobalEventsService.prototype.toggleLoader = /**
     * @param {?} active
     * @return {?}
     */
    function (active) {
        this.toggleLoaderSource.next(active);
    };
    GlobalEventsService.decorators = [
        { type: Injectable }
    ];
    return GlobalEventsService;
}());
export { GlobalEventsService };
if (false) {
    /** @type {?} */
    GlobalEventsService.prototype.pageLoadedSource;
    /** @type {?} */
    GlobalEventsService.prototype.triggerInitialDataLoadSource;
    /** @type {?} */
    GlobalEventsService.prototype.initialDataLoadedSource;
    /** @type {?} */
    GlobalEventsService.prototype.setLayoutDataSource;
    /** @type {?} */
    GlobalEventsService.prototype.getLayoutDataSource;
    /** @type {?} */
    GlobalEventsService.prototype.layoutDataChangedSource;
    /** @type {?} */
    GlobalEventsService.prototype.redirectSource;
    /** @type {?} */
    GlobalEventsService.prototype.notifySource;
    /** @type {?} */
    GlobalEventsService.prototype.toggleLoaderSource;
    /** @type {?} */
    GlobalEventsService.prototype.pageLoaded$;
    /** @type {?} */
    GlobalEventsService.prototype.triggerInitialDataLoad$;
    /** @type {?} */
    GlobalEventsService.prototype.initialDataLoaded$;
    /** @type {?} */
    GlobalEventsService.prototype.setLayoutData$;
    /** @type {?} */
    GlobalEventsService.prototype.getLayoutData$;
    /** @type {?} */
    GlobalEventsService.prototype.layoutDataChanged$;
    /** @type {?} */
    GlobalEventsService.prototype.redirect$;
    /** @type {?} */
    GlobalEventsService.prototype.notify$;
    /** @type {?} */
    GlobalEventsService.prototype.toggleLoader$;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2xvYmFsRXZlbnRzLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9yYW1zdGVyLXVpLWNvcmUvIiwic291cmNlcyI6WyJzZXJ2aWNlcy9nbG9iYWxFdmVudHMvZ2xvYmFsRXZlbnRzLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBQyxVQUFVLEVBQUMsTUFBTSxlQUFlLENBQUE7QUFDeEMsT0FBTyxFQUFDLE9BQU8sRUFBQyxNQUFNLE1BQU0sQ0FBQTtBQUc1QjtJQUFBO1FBRUMscUJBQWdCLEdBQUcsSUFBSSxPQUFPLEVBQTZCLENBQUE7UUFDM0QsaUNBQTRCLEdBQUcsSUFBSSxPQUFPLEVBQVEsQ0FBQTtRQUNsRCw0QkFBdUIsR0FBRyxJQUFJLE9BQU8sRUFBTyxDQUFBO1FBQzVDLHdCQUFtQixHQUFHLElBQUksT0FBTyxFQUFzQixDQUFBO1FBQ3ZELHdCQUFtQixHQUFHLElBQUksT0FBTyxFQUFzRSxDQUFBO1FBQ3ZHLDRCQUF1QixHQUFHLElBQUksT0FBTyxFQUFzQixDQUFBO1FBQzNELG1CQUFjLEdBQUcsSUFBSSxPQUFPLEVBQXlELENBQUE7UUFDckYsaUJBQVksR0FBRyxJQUFJLE9BQU8sRUFBbUMsQ0FBQTtRQUM3RCx1QkFBa0IsR0FBRyxJQUFJLE9BQU8sRUFBVyxDQUFBO1FBRTNDLGdCQUFXLEdBQUcsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFlBQVksRUFBRSxDQUFBO1FBQ2xELDRCQUF1QixHQUFHLElBQUksQ0FBQyw0QkFBNEIsQ0FBQyxZQUFZLEVBQUUsQ0FBQTtRQUMxRSx1QkFBa0IsR0FBRyxJQUFJLENBQUMsdUJBQXVCLENBQUMsWUFBWSxFQUFFLENBQUE7UUFDaEUsbUJBQWMsR0FBRyxJQUFJLENBQUMsbUJBQW1CLENBQUMsWUFBWSxFQUFFLENBQUE7UUFDeEQsbUJBQWMsR0FBRyxJQUFJLENBQUMsbUJBQW1CLENBQUMsWUFBWSxFQUFFLENBQUE7UUFDeEQsdUJBQWtCLEdBQUcsSUFBSSxDQUFDLHVCQUF1QixDQUFDLFlBQVksRUFBRSxDQUFBO1FBQ2hFLGNBQVMsR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLFlBQVksRUFBRSxDQUFBO1FBQzlDLFlBQU8sR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLFlBQVksRUFBRSxDQUFBO1FBQzFDLGtCQUFhLEdBQUcsSUFBSSxDQUFDLGtCQUFrQixDQUFDLFlBQVksRUFBRSxDQUFBO0lBK0N2RCxDQUFDOzs7OztJQTdDQSx3Q0FBVTs7OztJQUFWLFVBQVcsSUFBSTtRQUNkLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUE7SUFDakMsQ0FBQzs7OztJQUVELG9EQUFzQjs7O0lBQXRCO1FBQ0MsSUFBSSxDQUFDLDRCQUE0QixDQUFDLElBQUksRUFBRSxDQUFBO0lBQ3pDLENBQUM7Ozs7O0lBRUQsK0NBQWlCOzs7O0lBQWpCLFVBQWtCLElBQUk7UUFDckIsSUFBSSxDQUFDLHVCQUF1QixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQTtJQUN4QyxDQUFDOzs7OztJQUVELDJDQUFhOzs7O0lBQWIsVUFBYyxJQUFJO1FBQ2pCLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUE7SUFDcEMsQ0FBQzs7OztJQUVELDJDQUFhOzs7SUFBYjtRQUFBLGlCQVlDO1FBWEEsT0FBTyxJQUFJLE9BQU87Ozs7UUFBQyxVQUFDLE9BQU87O2dCQUNwQixFQUFFLEdBQUcsQ0FBQyxJQUFJLElBQUksRUFBRSxDQUFDLENBQUMsT0FBTyxFQUFFOztnQkFDM0IsR0FBRyxHQUFHLEtBQUksQ0FBQyxjQUFjLENBQUMsU0FBUzs7OztZQUFDLFVBQUMsSUFBSTtnQkFDOUMsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLEtBQUssRUFBRSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxLQUFLLE9BQU8sQ0FBQyxFQUFFO29CQUMxRCxPQUFNO2lCQUNOO2dCQUNELEdBQUcsQ0FBQyxXQUFXLEVBQUUsQ0FBQTtnQkFDakIsT0FBTyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQTtZQUN0QixDQUFDLEVBQUM7WUFDRixLQUFJLENBQUMsbUJBQW1CLENBQUMsSUFBSSxDQUFDLEVBQUMsT0FBTyxFQUFFLEVBQUUsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFDLENBQUMsQ0FBQTtRQUNuRSxDQUFDLEVBQUMsQ0FBQTtJQUNILENBQUM7Ozs7O0lBRUQsK0NBQWlCOzs7O0lBQWpCLFVBQWtCLElBQUk7UUFDckIsSUFBSSxDQUFDLHVCQUF1QixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQTtJQUN4QyxDQUFDOzs7Ozs7SUFFRCxzQ0FBUTs7Ozs7SUFBUixVQUFTLEtBQWEsRUFBRSxPQUFxQztRQUM1RCxJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxFQUFDLEtBQUssT0FBQSxFQUFFLE9BQU8sU0FBQSxFQUFDLENBQUMsQ0FBQTtJQUMzQyxDQUFDOzs7Ozs7SUFFRCxvQ0FBTTs7Ozs7SUFBTixVQUFPLElBQVksRUFBRSxPQUFlO1FBQ25DLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLEVBQUMsSUFBSSxNQUFBLEVBQUUsT0FBTyxTQUFBLEVBQUMsQ0FBQyxDQUFBO0lBQ3hDLENBQUM7Ozs7O0lBRUQsMENBQVk7Ozs7SUFBWixVQUFhLE1BQWU7UUFDM0IsSUFBSSxDQUFDLGtCQUFrQixDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQTtJQUNyQyxDQUFDOztnQkFsRUQsVUFBVTs7SUFtRVgsMEJBQUM7Q0FBQSxBQW5FRCxJQW1FQztTQWxFWSxtQkFBbUI7OztJQUMvQiwrQ0FBMkQ7O0lBQzNELDJEQUFrRDs7SUFDbEQsc0RBQTRDOztJQUM1QyxrREFBdUQ7O0lBQ3ZELGtEQUF1Rzs7SUFDdkcsc0RBQTJEOztJQUMzRCw2Q0FBcUY7O0lBQ3JGLDJDQUE2RDs7SUFDN0QsaURBQTJDOztJQUUzQywwQ0FBa0Q7O0lBQ2xELHNEQUEwRTs7SUFDMUUsaURBQWdFOztJQUNoRSw2Q0FBd0Q7O0lBQ3hELDZDQUF3RDs7SUFDeEQsaURBQWdFOztJQUNoRSx3Q0FBOEM7O0lBQzlDLHNDQUEwQzs7SUFDMUMsNENBQXNEIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtJbmplY3RhYmxlfSBmcm9tICdAYW5ndWxhci9jb3JlJ1xyXG5pbXBvcnQge1N1YmplY3R9IGZyb20gJ3J4anMnXHJcbmltcG9ydCB7R0VTUmVkaXJlY3RPcHRpb25zSW50ZXJmYWNlfSBmcm9tICcuL2dsb2JhbEV2ZW50cy5pbnRlcmZhY2VzJ1xyXG5cclxuQEluamVjdGFibGUoKVxyXG5leHBvcnQgY2xhc3MgR2xvYmFsRXZlbnRzU2VydmljZSB7XHJcblx0cGFnZUxvYWRlZFNvdXJjZSA9IG5ldyBTdWJqZWN0PHtbeDogc3RyaW5nXTogYW55fSB8IHZvaWQ+KClcclxuXHR0cmlnZ2VySW5pdGlhbERhdGFMb2FkU291cmNlID0gbmV3IFN1YmplY3Q8dm9pZD4oKVxyXG5cdGluaXRpYWxEYXRhTG9hZGVkU291cmNlID0gbmV3IFN1YmplY3Q8YW55PigpXHJcblx0c2V0TGF5b3V0RGF0YVNvdXJjZSA9IG5ldyBTdWJqZWN0PHtbeDogc3RyaW5nXTogYW55fT4oKVxyXG5cdGdldExheW91dERhdGFTb3VyY2UgPSBuZXcgU3ViamVjdDx7ZXZlbnRJZDogbnVtYmVyLCBldmVudFR5cGU6IHN0cmluZywgcGF5bG9hZD86IHtbeDogc3RyaW5nXTogYW55fX0+KClcclxuXHRsYXlvdXREYXRhQ2hhbmdlZFNvdXJjZSA9IG5ldyBTdWJqZWN0PHtbeDogc3RyaW5nXTogYW55fT4oKVxyXG5cdHJlZGlyZWN0U291cmNlID0gbmV3IFN1YmplY3Q8e3JvdXRlOiBzdHJpbmcsIG9wdGlvbnM6IEdFU1JlZGlyZWN0T3B0aW9uc0ludGVyZmFjZX0+KClcclxuXHRub3RpZnlTb3VyY2UgPSBuZXcgU3ViamVjdDx7dHlwZTogc3RyaW5nLCBtZXNzYWdlOiBzdHJpbmd9PigpXHJcblx0dG9nZ2xlTG9hZGVyU291cmNlID0gbmV3IFN1YmplY3Q8Ym9vbGVhbj4oKVxyXG5cclxuXHRwYWdlTG9hZGVkJCA9IHRoaXMucGFnZUxvYWRlZFNvdXJjZS5hc09ic2VydmFibGUoKVxyXG5cdHRyaWdnZXJJbml0aWFsRGF0YUxvYWQkID0gdGhpcy50cmlnZ2VySW5pdGlhbERhdGFMb2FkU291cmNlLmFzT2JzZXJ2YWJsZSgpXHJcblx0aW5pdGlhbERhdGFMb2FkZWQkID0gdGhpcy5pbml0aWFsRGF0YUxvYWRlZFNvdXJjZS5hc09ic2VydmFibGUoKVxyXG5cdHNldExheW91dERhdGEkID0gdGhpcy5zZXRMYXlvdXREYXRhU291cmNlLmFzT2JzZXJ2YWJsZSgpXHJcblx0Z2V0TGF5b3V0RGF0YSQgPSB0aGlzLmdldExheW91dERhdGFTb3VyY2UuYXNPYnNlcnZhYmxlKClcclxuXHRsYXlvdXREYXRhQ2hhbmdlZCQgPSB0aGlzLmxheW91dERhdGFDaGFuZ2VkU291cmNlLmFzT2JzZXJ2YWJsZSgpXHJcblx0cmVkaXJlY3QkID0gdGhpcy5yZWRpcmVjdFNvdXJjZS5hc09ic2VydmFibGUoKVxyXG5cdG5vdGlmeSQgPSB0aGlzLm5vdGlmeVNvdXJjZS5hc09ic2VydmFibGUoKVxyXG5cdHRvZ2dsZUxvYWRlciQgPSB0aGlzLnRvZ2dsZUxvYWRlclNvdXJjZS5hc09ic2VydmFibGUoKVxyXG5cclxuXHRwYWdlTG9hZGVkKGRhdGEpOiB2b2lkIHtcclxuXHRcdHRoaXMucGFnZUxvYWRlZFNvdXJjZS5uZXh0KGRhdGEpXHJcblx0fVxyXG5cclxuXHR0cmlnZ2VySW5pdGlhbERhdGFMb2FkKCk6IHZvaWQge1xyXG5cdFx0dGhpcy50cmlnZ2VySW5pdGlhbERhdGFMb2FkU291cmNlLm5leHQoKVxyXG5cdH1cclxuXHJcblx0aW5pdGlhbERhdGFMb2FkZWQoZGF0YSk6IHZvaWQge1xyXG5cdFx0dGhpcy5pbml0aWFsRGF0YUxvYWRlZFNvdXJjZS5uZXh0KGRhdGEpXHJcblx0fVxyXG5cclxuXHRzZXRMYXlvdXREYXRhKGRhdGEpOiB2b2lkIHtcclxuXHRcdHRoaXMuc2V0TGF5b3V0RGF0YVNvdXJjZS5uZXh0KGRhdGEpXHJcblx0fVxyXG5cclxuXHRnZXRMYXlvdXREYXRhKCk6IFByb21pc2U8e1tmaWVsZE5hbWU6IHN0cmluZ106IGFueX0+IHtcclxuXHRcdHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4ge1xyXG5cdFx0XHRjb25zdCB0cyA9IChuZXcgRGF0ZSgpKS52YWx1ZU9mKClcclxuXHRcdFx0Y29uc3Qgc3ViID0gdGhpcy5nZXRMYXlvdXREYXRhJC5zdWJzY3JpYmUoKGRhdGEpID0+IHtcclxuXHRcdFx0XHRpZiAoKGRhdGEuZXZlbnRJZCAhPT0gdHMpIHx8IChkYXRhLmV2ZW50VHlwZSAhPT0gJ3JlcGx5JykpIHtcclxuXHRcdFx0XHRcdHJldHVyblxyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHRzdWIudW5zdWJzY3JpYmUoKVxyXG5cdFx0XHRcdHJlc29sdmUoZGF0YS5wYXlsb2FkKVxyXG5cdFx0XHR9KVxyXG5cdFx0XHR0aGlzLmdldExheW91dERhdGFTb3VyY2UubmV4dCh7ZXZlbnRJZDogdHMsIGV2ZW50VHlwZTogJ3JlcXVlc3QnfSlcclxuXHRcdH0pXHJcblx0fVxyXG5cclxuXHRsYXlvdXREYXRhQ2hhbmdlZChkYXRhKTogdm9pZCB7XHJcblx0XHR0aGlzLmxheW91dERhdGFDaGFuZ2VkU291cmNlLm5leHQoZGF0YSlcclxuXHR9XHJcblxyXG5cdHJlZGlyZWN0KHJvdXRlOiBzdHJpbmcsIG9wdGlvbnM/OiBHRVNSZWRpcmVjdE9wdGlvbnNJbnRlcmZhY2UpOiB2b2lkIHtcclxuXHRcdHRoaXMucmVkaXJlY3RTb3VyY2UubmV4dCh7cm91dGUsIG9wdGlvbnN9KVxyXG5cdH1cclxuXHJcblx0bm90aWZ5KHR5cGU6IHN0cmluZywgbWVzc2FnZTogc3RyaW5nKTogdm9pZCB7XHJcblx0XHR0aGlzLm5vdGlmeVNvdXJjZS5uZXh0KHt0eXBlLCBtZXNzYWdlfSlcclxuXHR9XHJcblxyXG5cdHRvZ2dsZUxvYWRlcihhY3RpdmU6IGJvb2xlYW4pOiB2b2lkIHtcclxuXHRcdHRoaXMudG9nZ2xlTG9hZGVyU291cmNlLm5leHQoYWN0aXZlKVxyXG5cdH1cclxufVxyXG4iXX0=