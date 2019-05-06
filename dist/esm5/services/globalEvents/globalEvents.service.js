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
        this.redirectSource = new Subject();
        this.notifySource = new Subject();
        this.toggleLoaderSource = new Subject();
        this.pageLoaded$ = this.pageLoadedSource.asObservable();
        this.triggerInitialDataLoad$ = this.triggerInitialDataLoadSource.asObservable();
        this.initialDataLoaded$ = this.initialDataLoadedSource.asObservable();
        this.setLayoutData$ = this.setLayoutDataSource.asObservable();
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
    GlobalEventsService.prototype.redirect$;
    /** @type {?} */
    GlobalEventsService.prototype.notify$;
    /** @type {?} */
    GlobalEventsService.prototype.toggleLoader$;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2xvYmFsRXZlbnRzLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9yYW1zdGVyLXVpLWNvcmUvIiwic291cmNlcyI6WyJzZXJ2aWNlcy9nbG9iYWxFdmVudHMvZ2xvYmFsRXZlbnRzLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBQyxVQUFVLEVBQUMsTUFBTSxlQUFlLENBQUE7QUFDeEMsT0FBTyxFQUFDLE9BQU8sRUFBQyxNQUFNLE1BQU0sQ0FBQTtBQUc1QjtJQUFBO1FBRUMscUJBQWdCLEdBQUcsSUFBSSxPQUFPLEVBQTZCLENBQUE7UUFDM0QsaUNBQTRCLEdBQUcsSUFBSSxPQUFPLEVBQVEsQ0FBQTtRQUNsRCw0QkFBdUIsR0FBRyxJQUFJLE9BQU8sRUFBTyxDQUFBO1FBQzVDLHdCQUFtQixHQUFHLElBQUksT0FBTyxFQUFzQixDQUFBO1FBQ3ZELG1CQUFjLEdBQUcsSUFBSSxPQUFPLEVBQXlELENBQUE7UUFDckYsaUJBQVksR0FBRyxJQUFJLE9BQU8sRUFBbUMsQ0FBQTtRQUM3RCx1QkFBa0IsR0FBRyxJQUFJLE9BQU8sRUFBVyxDQUFBO1FBRTNDLGdCQUFXLEdBQUcsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFlBQVksRUFBRSxDQUFBO1FBQ2xELDRCQUF1QixHQUFHLElBQUksQ0FBQyw0QkFBNEIsQ0FBQyxZQUFZLEVBQUUsQ0FBQTtRQUMxRSx1QkFBa0IsR0FBRyxJQUFJLENBQUMsdUJBQXVCLENBQUMsWUFBWSxFQUFFLENBQUE7UUFDaEUsbUJBQWMsR0FBRyxJQUFJLENBQUMsbUJBQW1CLENBQUMsWUFBWSxFQUFFLENBQUE7UUFDeEQsY0FBUyxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUMsWUFBWSxFQUFFLENBQUE7UUFDOUMsWUFBTyxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsWUFBWSxFQUFFLENBQUE7UUFDMUMsa0JBQWEsR0FBRyxJQUFJLENBQUMsa0JBQWtCLENBQUMsWUFBWSxFQUFFLENBQUE7SUE2QnZELENBQUM7Ozs7O0lBM0JBLHdDQUFVOzs7O0lBQVYsVUFBVyxJQUFJO1FBQ2QsSUFBSSxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQTtJQUNqQyxDQUFDOzs7O0lBRUQsb0RBQXNCOzs7SUFBdEI7UUFDQyxJQUFJLENBQUMsNEJBQTRCLENBQUMsSUFBSSxFQUFFLENBQUE7SUFDekMsQ0FBQzs7Ozs7SUFFRCwrQ0FBaUI7Ozs7SUFBakIsVUFBa0IsSUFBSTtRQUNyQixJQUFJLENBQUMsdUJBQXVCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFBO0lBQ3hDLENBQUM7Ozs7O0lBRUQsMkNBQWE7Ozs7SUFBYixVQUFjLElBQUk7UUFDakIsSUFBSSxDQUFDLG1CQUFtQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQTtJQUNwQyxDQUFDOzs7Ozs7SUFFRCxzQ0FBUTs7Ozs7SUFBUixVQUFTLEtBQWEsRUFBRSxPQUFxQztRQUM1RCxJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxFQUFDLEtBQUssT0FBQSxFQUFFLE9BQU8sU0FBQSxFQUFDLENBQUMsQ0FBQTtJQUMzQyxDQUFDOzs7Ozs7SUFFRCxvQ0FBTTs7Ozs7SUFBTixVQUFPLElBQVksRUFBRSxPQUFlO1FBQ25DLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLEVBQUMsSUFBSSxNQUFBLEVBQUUsT0FBTyxTQUFBLEVBQUMsQ0FBQyxDQUFBO0lBQ3hDLENBQUM7Ozs7O0lBRUQsMENBQVk7Ozs7SUFBWixVQUFhLE1BQWU7UUFDM0IsSUFBSSxDQUFDLGtCQUFrQixDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQTtJQUNyQyxDQUFDOztnQkE1Q0QsVUFBVTs7SUE2Q1gsMEJBQUM7Q0FBQSxBQTdDRCxJQTZDQztTQTVDWSxtQkFBbUI7OztJQUMvQiwrQ0FBMkQ7O0lBQzNELDJEQUFrRDs7SUFDbEQsc0RBQTRDOztJQUM1QyxrREFBdUQ7O0lBQ3ZELDZDQUFxRjs7SUFDckYsMkNBQTZEOztJQUM3RCxpREFBMkM7O0lBRTNDLDBDQUFrRDs7SUFDbEQsc0RBQTBFOztJQUMxRSxpREFBZ0U7O0lBQ2hFLDZDQUF3RDs7SUFDeEQsd0NBQThDOztJQUM5QyxzQ0FBMEM7O0lBQzFDLDRDQUFzRCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7SW5qZWN0YWJsZX0gZnJvbSAnQGFuZ3VsYXIvY29yZSdcclxuaW1wb3J0IHtTdWJqZWN0fSBmcm9tICdyeGpzJ1xyXG5pbXBvcnQge0dFU1JlZGlyZWN0T3B0aW9uc0ludGVyZmFjZX0gZnJvbSAnLi9nbG9iYWxFdmVudHMuaW50ZXJmYWNlcydcclxuXHJcbkBJbmplY3RhYmxlKClcclxuZXhwb3J0IGNsYXNzIEdsb2JhbEV2ZW50c1NlcnZpY2Uge1xyXG5cdHBhZ2VMb2FkZWRTb3VyY2UgPSBuZXcgU3ViamVjdDx7W3g6IHN0cmluZ106IGFueX0gfCB2b2lkPigpXHJcblx0dHJpZ2dlckluaXRpYWxEYXRhTG9hZFNvdXJjZSA9IG5ldyBTdWJqZWN0PHZvaWQ+KClcclxuXHRpbml0aWFsRGF0YUxvYWRlZFNvdXJjZSA9IG5ldyBTdWJqZWN0PGFueT4oKVxyXG5cdHNldExheW91dERhdGFTb3VyY2UgPSBuZXcgU3ViamVjdDx7W3g6IHN0cmluZ106IGFueX0+KClcclxuXHRyZWRpcmVjdFNvdXJjZSA9IG5ldyBTdWJqZWN0PHtyb3V0ZTogc3RyaW5nLCBvcHRpb25zOiBHRVNSZWRpcmVjdE9wdGlvbnNJbnRlcmZhY2V9PigpXHJcblx0bm90aWZ5U291cmNlID0gbmV3IFN1YmplY3Q8e3R5cGU6IHN0cmluZywgbWVzc2FnZTogc3RyaW5nfT4oKVxyXG5cdHRvZ2dsZUxvYWRlclNvdXJjZSA9IG5ldyBTdWJqZWN0PGJvb2xlYW4+KClcclxuXHJcblx0cGFnZUxvYWRlZCQgPSB0aGlzLnBhZ2VMb2FkZWRTb3VyY2UuYXNPYnNlcnZhYmxlKClcclxuXHR0cmlnZ2VySW5pdGlhbERhdGFMb2FkJCA9IHRoaXMudHJpZ2dlckluaXRpYWxEYXRhTG9hZFNvdXJjZS5hc09ic2VydmFibGUoKVxyXG5cdGluaXRpYWxEYXRhTG9hZGVkJCA9IHRoaXMuaW5pdGlhbERhdGFMb2FkZWRTb3VyY2UuYXNPYnNlcnZhYmxlKClcclxuXHRzZXRMYXlvdXREYXRhJCA9IHRoaXMuc2V0TGF5b3V0RGF0YVNvdXJjZS5hc09ic2VydmFibGUoKVxyXG5cdHJlZGlyZWN0JCA9IHRoaXMucmVkaXJlY3RTb3VyY2UuYXNPYnNlcnZhYmxlKClcclxuXHRub3RpZnkkID0gdGhpcy5ub3RpZnlTb3VyY2UuYXNPYnNlcnZhYmxlKClcclxuXHR0b2dnbGVMb2FkZXIkID0gdGhpcy50b2dnbGVMb2FkZXJTb3VyY2UuYXNPYnNlcnZhYmxlKClcclxuXHJcblx0cGFnZUxvYWRlZChkYXRhKTogdm9pZCB7XHJcblx0XHR0aGlzLnBhZ2VMb2FkZWRTb3VyY2UubmV4dChkYXRhKVxyXG5cdH1cclxuXHJcblx0dHJpZ2dlckluaXRpYWxEYXRhTG9hZCgpOiB2b2lkIHtcclxuXHRcdHRoaXMudHJpZ2dlckluaXRpYWxEYXRhTG9hZFNvdXJjZS5uZXh0KClcclxuXHR9XHJcblxyXG5cdGluaXRpYWxEYXRhTG9hZGVkKGRhdGEpOiB2b2lkIHtcclxuXHRcdHRoaXMuaW5pdGlhbERhdGFMb2FkZWRTb3VyY2UubmV4dChkYXRhKVxyXG5cdH1cclxuXHJcblx0c2V0TGF5b3V0RGF0YShkYXRhKTogdm9pZCB7XHJcblx0XHR0aGlzLnNldExheW91dERhdGFTb3VyY2UubmV4dChkYXRhKVxyXG5cdH1cclxuXHJcblx0cmVkaXJlY3Qocm91dGU6IHN0cmluZywgb3B0aW9ucz86IEdFU1JlZGlyZWN0T3B0aW9uc0ludGVyZmFjZSk6IHZvaWQge1xyXG5cdFx0dGhpcy5yZWRpcmVjdFNvdXJjZS5uZXh0KHtyb3V0ZSwgb3B0aW9uc30pXHJcblx0fVxyXG5cclxuXHRub3RpZnkodHlwZTogc3RyaW5nLCBtZXNzYWdlOiBzdHJpbmcpOiB2b2lkIHtcclxuXHRcdHRoaXMubm90aWZ5U291cmNlLm5leHQoe3R5cGUsIG1lc3NhZ2V9KVxyXG5cdH1cclxuXHJcblx0dG9nZ2xlTG9hZGVyKGFjdGl2ZTogYm9vbGVhbik6IHZvaWQge1xyXG5cdFx0dGhpcy50b2dnbGVMb2FkZXJTb3VyY2UubmV4dChhY3RpdmUpXHJcblx0fVxyXG59XHJcbiJdfQ==