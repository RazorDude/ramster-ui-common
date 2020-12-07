/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
export class GlobalEventsService {
    constructor() {
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
    pageLoaded(data) {
        this.pageLoadedSource.next(data);
    }
    /**
     * @return {?}
     */
    triggerInitialDataLoad() {
        this.triggerInitialDataLoadSource.next();
    }
    /**
     * @param {?} data
     * @return {?}
     */
    initialDataLoaded(data) {
        this.initialDataLoadedSource.next(data);
    }
    /**
     * @param {?} data
     * @return {?}
     */
    setLayoutData(data) {
        this.setLayoutDataSource.next(data);
    }
    /**
     * @return {?}
     */
    getLayoutData() {
        return new Promise((/**
         * @param {?} resolve
         * @return {?}
         */
        (resolve) => {
            /** @type {?} */
            const ts = (new Date()).valueOf();
            /** @type {?} */
            const sub = this.getLayoutData$.subscribe((/**
             * @param {?} data
             * @return {?}
             */
            (data) => {
                if ((data.eventId !== ts) || (data.eventType !== 'reply')) {
                    return;
                }
                sub.unsubscribe();
                resolve(data.payload);
            }));
            this.getLayoutDataSource.next({ eventId: ts, eventType: 'request' });
        }));
    }
    /**
     * @param {?} data
     * @return {?}
     */
    layoutDataChanged(data) {
        this.layoutDataChangedSource.next(data);
    }
    /**
     * @param {?} route
     * @param {?=} options
     * @return {?}
     */
    redirect(route, options) {
        this.redirectSource.next({ route, options });
    }
    /**
     * @param {?} type
     * @param {?} message
     * @return {?}
     */
    notify(type, message) {
        this.notifySource.next({ type, message });
    }
    /**
     * @param {?} active
     * @return {?}
     */
    toggleLoader(active) {
        this.toggleLoaderSource.next(active);
    }
}
GlobalEventsService.decorators = [
    { type: Injectable }
];
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2xvYmFsRXZlbnRzLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9yYW1zdGVyLXVpLWNvcmUvIiwic291cmNlcyI6WyJzZXJ2aWNlcy9nbG9iYWxFdmVudHMvZ2xvYmFsRXZlbnRzLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBQyxVQUFVLEVBQUMsTUFBTSxlQUFlLENBQUE7QUFDeEMsT0FBTyxFQUFDLE9BQU8sRUFBQyxNQUFNLE1BQU0sQ0FBQTtBQUk1QixNQUFNLE9BQU8sbUJBQW1CO0lBRGhDO1FBRUMscUJBQWdCLEdBQUcsSUFBSSxPQUFPLEVBQTZCLENBQUE7UUFDM0QsaUNBQTRCLEdBQUcsSUFBSSxPQUFPLEVBQVEsQ0FBQTtRQUNsRCw0QkFBdUIsR0FBRyxJQUFJLE9BQU8sRUFBTyxDQUFBO1FBQzVDLHdCQUFtQixHQUFHLElBQUksT0FBTyxFQUFzQixDQUFBO1FBQ3ZELHdCQUFtQixHQUFHLElBQUksT0FBTyxFQUFzRSxDQUFBO1FBQ3ZHLDRCQUF1QixHQUFHLElBQUksT0FBTyxFQUFzQixDQUFBO1FBQzNELG1CQUFjLEdBQUcsSUFBSSxPQUFPLEVBQXlELENBQUE7UUFDckYsaUJBQVksR0FBRyxJQUFJLE9BQU8sRUFBbUMsQ0FBQTtRQUM3RCx1QkFBa0IsR0FBRyxJQUFJLE9BQU8sRUFBVyxDQUFBO1FBRTNDLGdCQUFXLEdBQUcsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFlBQVksRUFBRSxDQUFBO1FBQ2xELDRCQUF1QixHQUFHLElBQUksQ0FBQyw0QkFBNEIsQ0FBQyxZQUFZLEVBQUUsQ0FBQTtRQUMxRSx1QkFBa0IsR0FBRyxJQUFJLENBQUMsdUJBQXVCLENBQUMsWUFBWSxFQUFFLENBQUE7UUFDaEUsbUJBQWMsR0FBRyxJQUFJLENBQUMsbUJBQW1CLENBQUMsWUFBWSxFQUFFLENBQUE7UUFDeEQsbUJBQWMsR0FBRyxJQUFJLENBQUMsbUJBQW1CLENBQUMsWUFBWSxFQUFFLENBQUE7UUFD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L2NvcmUnXHJcbmltcG9ydCB7U3ViamVjdH0gZnJvbSAncnhqcydcclxuaW1wb3J0IHtHRVNSZWRpcmVjdE9wdGlvbnNJbnRlcmZhY2V9IGZyb20gJy4vZ2xvYmFsRXZlbnRzLmludGVyZmFjZXMnXHJcblxyXG5ASW5qZWN0YWJsZSgpXHJcbmV4cG9ydCBjbGFzcyBHbG9iYWxFdmVudHNTZXJ2aWNlIHtcclxuXHRwYWdlTG9hZGVkU291cmNlID0gbmV3IFN1YmplY3Q8e1t4OiBzdHJpbmddOiBhbnl9IHwgdm9pZD4oKVxyXG5cdHRyaWdnZXJJbml0aWFsRGF0YUxvYWRTb3VyY2UgPSBuZXcgU3ViamVjdDx2b2lkPigpXHJcblx0aW5pdGlhbERhdGFMb2FkZWRTb3VyY2UgPSBuZXcgU3ViamVjdDxhbnk+KClcclxuXHRzZXRMYXlvdXREYXRhU291cmNlID0gbmV3IFN1YmplY3Q8e1t4OiBzdHJpbmddOiBhbnl9PigpXHJcblx0Z2V0TGF5b3V0RGF0YVNvdXJjZSA9IG5ldyBTdWJqZWN0PHtldmVudElkOiBudW1iZXIsIGV2ZW50VHlwZTogc3RyaW5nLCBwYXlsb2FkPzoge1t4OiBzdHJpbmddOiBhbnl9fT4oKVxyXG5cdGxheW91dERhdGFDaGFuZ2VkU291cmNlID0gbmV3IFN1YmplY3Q8e1t4OiBzdHJpbmddOiBhbnl9PigpXHJcblx0cmVkaXJlY3RTb3VyY2UgPSBuZXcgU3ViamVjdDx7cm91dGU6IHN0cmluZywgb3B0aW9uczogR0VTUmVkaXJlY3RPcHRpb25zSW50ZXJmYWNlfT4oKVxyXG5cdG5vdGlmeVNvdXJjZSA9IG5ldyBTdWJqZWN0PHt0eXBlOiBzdHJpbmcsIG1lc3NhZ2U6IHN0cmluZ30+KClcclxuXHR0b2dnbGVMb2FkZXJTb3VyY2UgPSBuZXcgU3ViamVjdDxib29sZWFuPigpXHJcblxyXG5cdHBhZ2VMb2FkZWQkID0gdGhpcy5wYWdlTG9hZGVkU291cmNlLmFzT2JzZXJ2YWJsZSgpXHJcblx0dHJpZ2dlckluaXRpYWxEYXRhTG9hZCQgPSB0aGlzLnRyaWdnZXJJbml0aWFsRGF0YUxvYWRTb3VyY2UuYXNPYnNlcnZhYmxlKClcclxuXHRpbml0aWFsRGF0YUxvYWRlZCQgPSB0aGlzLmluaXRpYWxEYXRhTG9hZGVkU291cmNlLmFzT2JzZXJ2YWJsZSgpXHJcblx0c2V0TGF5b3V0RGF0YSQgPSB0aGlzLnNldExheW91dERhdGFTb3VyY2UuYXNPYnNlcnZhYmxlKClcclxuXHRnZXRMYXlvdXREYXRhJCA9IHRoaXMuZ2V0TGF5b3V0RGF0YVNvdXJjZS5hc09ic2VydmFibGUoKVxyXG5cdGxheW91dERhdGFDaGFuZ2VkJCA9IHRoaXMubGF5b3V0RGF0YUNoYW5nZWRTb3VyY2UuYXNPYnNlcnZhYmxlKClcclxuXHRyZWRpcmVjdCQgPSB0aGlzLnJlZGlyZWN0U291cmNlLmFzT2JzZXJ2YWJsZSgpXHJcblx0bm90aWZ5JCA9IHRoaXMubm90aWZ5U291cmNlLmFzT2JzZXJ2YWJsZSgpXHJcblx0dG9nZ2xlTG9hZGVyJCA9IHRoaXMudG9nZ2xlTG9hZGVyU291cmNlLmFzT2JzZXJ2YWJsZSgpXHJcblxyXG5cdHBhZ2VMb2FkZWQoZGF0YSk6IHZvaWQge1xyXG5cdFx0dGhpcy5wYWdlTG9hZGVkU291cmNlLm5leHQoZGF0YSlcclxuXHR9XHJcblxyXG5cdHRyaWdnZXJJbml0aWFsRGF0YUxvYWQoKTogdm9pZCB7XHJcblx0XHR0aGlzLnRyaWdnZXJJbml0aWFsRGF0YUxvYWRTb3VyY2UubmV4dCgpXHJcblx0fVxyXG5cclxuXHRpbml0aWFsRGF0YUxvYWRlZChkYXRhKTogdm9pZCB7XHJcblx0XHR0aGlzLmluaXRpYWxEYXRhTG9hZGVkU291cmNlLm5leHQoZGF0YSlcclxuXHR9XHJcblxyXG5cdHNldExheW91dERhdGEoZGF0YSk6IHZvaWQge1xyXG5cdFx0dGhpcy5zZXRMYXlvdXREYXRhU291cmNlLm5leHQoZGF0YSlcclxuXHR9XHJcblxyXG5cdGdldExheW91dERhdGEoKTogUHJvbWlzZTx7W2ZpZWxkTmFtZTogc3RyaW5nXTogYW55fT4ge1xyXG5cdFx0cmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlKSA9PiB7XHJcblx0XHRcdGNvbnN0IHRzID0gKG5ldyBEYXRlKCkpLnZhbHVlT2YoKVxyXG5cdFx0XHRjb25zdCBzdWIgPSB0aGlzLmdldExheW91dERhdGEkLnN1YnNjcmliZSgoZGF0YSkgPT4ge1xyXG5cdFx0XHRcdGlmICgoZGF0YS5ldmVudElkICE9PSB0cykgfHwgKGRhdGEuZXZlbnRUeXBlICE9PSAncmVwbHknKSkge1xyXG5cdFx0XHRcdFx0cmV0dXJuXHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdHN1Yi51bnN1YnNjcmliZSgpXHJcblx0XHRcdFx0cmVzb2x2ZShkYXRhLnBheWxvYWQpXHJcblx0XHRcdH0pXHJcblx0XHRcdHRoaXMuZ2V0TGF5b3V0RGF0YVNvdXJjZS5uZXh0KHtldmVudElkOiB0cywgZXZlbnRUeXBlOiAncmVxdWVzdCd9KVxyXG5cdFx0fSlcclxuXHR9XHJcblxyXG5cdGxheW91dERhdGFDaGFuZ2VkKGRhdGEpOiB2b2lkIHtcclxuXHRcdHRoaXMubGF5b3V0RGF0YUNoYW5nZWRTb3VyY2UubmV4dChkYXRhKVxyXG5cdH1cclxuXHJcblx0cmVkaXJlY3Qocm91dGU6IHN0cmluZywgb3B0aW9ucz86IEdFU1JlZGlyZWN0T3B0aW9uc0ludGVyZmFjZSk6IHZvaWQge1xyXG5cdFx0dGhpcy5yZWRpcmVjdFNvdXJjZS5uZXh0KHtyb3V0ZSwgb3B0aW9uc30pXHJcblx0fVxyXG5cclxuXHRub3RpZnkodHlwZTogc3RyaW5nLCBtZXNzYWdlOiBzdHJpbmcpOiB2b2lkIHtcclxuXHRcdHRoaXMubm90aWZ5U291cmNlLm5leHQoe3R5cGUsIG1lc3NhZ2V9KVxyXG5cdH1cclxuXHJcblx0dG9nZ2xlTG9hZGVyKGFjdGl2ZTogYm9vbGVhbik6IHZvaWQge1xyXG5cdFx0dGhpcy50b2dnbGVMb2FkZXJTb3VyY2UubmV4dChhY3RpdmUpXHJcblx0fVxyXG59XHJcbiJdfQ==