/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var BaseLayoutComponent = /** @class */ (function () {
    function BaseLayoutComponent(globalEventsService, router) {
        this.globalEventsService = globalEventsService;
        this.router = router;
        this.initialDataLoaded = false;
        this.loaderActive = false;
        this.queryParams = {};
        this.routeParams = {};
    }
    /**
     * @return {?}
     */
    BaseLayoutComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.globalEventsService.pageLoaded$.subscribe((/**
         * @param {?=} data
         * @return {?}
         */
        function (data) { return _this.pageLoaded(data); }));
        this.globalEventsService.triggerInitialDataLoad$.subscribe((/**
         * @return {?}
         */
        function () { return _this.loadInitialData(); }));
        this.globalEventsService.setLayoutData$.subscribe((/**
         * @param {?} data
         * @return {?}
         */
        function (data) { return _this.setLayoutData(data); }));
        this.globalEventsService.redirect$.subscribe((/**
         * @param {?} __0
         * @return {?}
         */
        function (_a) {
            var route = _a.route, options = _a.options;
            return _this.redirect(route, options);
        }));
        this.globalEventsService.toggleLoader$.subscribe((/**
         * @param {?} active
         * @return {?}
         */
        function (active) { return _this.toggleLoader(active); }));
    };
    /**
     * @return {?}
     */
    BaseLayoutComponent.prototype.sendInitialDataLoadedEvent = /**
     * @return {?}
     */
    function () {
        this.globalEventsService.initialDataLoaded({ queryParams: this.queryParams, routeParams: this.routeParams });
    };
    // globalEventsService handlers
    // globalEventsService handlers
    /**
     * @param {?=} data
     * @return {?}
     */
    BaseLayoutComponent.prototype.pageLoaded = 
    // globalEventsService handlers
    /**
     * @param {?=} data
     * @return {?}
     */
    function (data) {
        if (data) {
            for (var key in data) {
                this[key] = data[key];
            }
        }
        if (this.initialDataLoaded) {
            this.sendInitialDataLoadedEvent();
            return;
        }
        this.loadInitialData();
    };
    /**
     * @return {?}
     */
    BaseLayoutComponent.prototype.loadInitialData = /**
     * @return {?}
     */
    function () {
        this.sendInitialDataLoadedEvent();
    };
    /**
     * @param {?} args
     * @return {?}
     */
    BaseLayoutComponent.prototype.setLayoutData = /**
     * @param {?} args
     * @return {?}
     */
    function (args) {
        for (var key in args) {
            this[key] = args[key];
        }
    };
    /**
     * @param {?} route
     * @param {?} options
     * @return {?}
     */
    BaseLayoutComponent.prototype.redirect = /**
     * @param {?} route
     * @param {?} options
     * @return {?}
     */
    function (route, options) {
        /** @type {?} */
        var actualOptions = options || {};
        var queryParams = actualOptions.queryParams, reloadInitialData = actualOptions.reloadInitialData;
        if (reloadInitialData) {
            this.initialDataLoaded = false;
        }
        this.router.navigate([route], { queryParams: queryParams || {} });
    };
    /**
     * @param {?} active
     * @return {?}
     */
    BaseLayoutComponent.prototype.toggleLoader = /**
     * @param {?} active
     * @return {?}
     */
    function (active) {
        this.loaderActive = active;
    };
    return BaseLayoutComponent;
}());
export { BaseLayoutComponent };
if (false) {
    /** @type {?} */
    BaseLayoutComponent.prototype.initialDataLoaded;
    /** @type {?} */
    BaseLayoutComponent.prototype.loaderActive;
    /** @type {?} */
    BaseLayoutComponent.prototype.queryParams;
    /** @type {?} */
    BaseLayoutComponent.prototype.routeParams;
    /** @type {?} */
    BaseLayoutComponent.prototype.globalEventsService;
    /** @type {?} */
    BaseLayoutComponent.prototype.router;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFzZS1sYXlvdXQuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vcmFtc3Rlci11aS1jb3JlLyIsInNvdXJjZXMiOlsiY29tcG9uZW50cy9iYXNlLWxheW91dC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQU9BO0lBTUMsNkJBQ1EsbUJBQXdDLEVBQ3hDLE1BQWM7UUFEZCx3QkFBbUIsR0FBbkIsbUJBQW1CLENBQXFCO1FBQ3hDLFdBQU0sR0FBTixNQUFNLENBQVE7UUFQdEIsc0JBQWlCLEdBQVksS0FBSyxDQUFBO1FBQ2xDLGlCQUFZLEdBQVksS0FBSyxDQUFBO1FBQzdCLGdCQUFXLEdBQTBCLEVBQUUsQ0FBQTtRQUN2QyxnQkFBVyxHQUEwQixFQUFFLENBQUE7SUFNdkMsQ0FBQzs7OztJQUVELHNDQUFROzs7SUFBUjtRQUFBLGlCQU1DO1FBTEEsSUFBSSxDQUFDLG1CQUFtQixDQUFDLFdBQVcsQ0FBQyxTQUFTOzs7O1FBQUMsVUFBQyxJQUF5QixJQUFLLE9BQUEsS0FBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsRUFBckIsQ0FBcUIsRUFBQyxDQUFBO1FBQ3BHLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyx1QkFBdUIsQ0FBQyxTQUFTOzs7UUFBQyxjQUFNLE9BQUEsS0FBSSxDQUFDLGVBQWUsRUFBRSxFQUF0QixDQUFzQixFQUFDLENBQUE7UUFDeEYsSUFBSSxDQUFDLG1CQUFtQixDQUFDLGNBQWMsQ0FBQyxTQUFTOzs7O1FBQUMsVUFBQyxJQUFJLElBQUssT0FBQSxLQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxFQUF4QixDQUF3QixFQUFDLENBQUE7UUFDckYsSUFBSSxDQUFDLG1CQUFtQixDQUFDLFNBQVMsQ0FBQyxTQUFTOzs7O1FBQUMsVUFBQyxFQUFnQjtnQkFBZixnQkFBSyxFQUFFLG9CQUFPO1lBQU0sT0FBQSxLQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssRUFBRSxPQUFPLENBQUM7UUFBN0IsQ0FBNkIsRUFBQyxDQUFBO1FBQ2pHLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxhQUFhLENBQUMsU0FBUzs7OztRQUFDLFVBQUMsTUFBTSxJQUFLLE9BQUEsS0FBSSxDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUMsRUFBekIsQ0FBeUIsRUFBQyxDQUFBO0lBQ3hGLENBQUM7Ozs7SUFFRCx3REFBMEI7OztJQUExQjtRQUNDLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxpQkFBaUIsQ0FBQyxFQUFDLFdBQVcsRUFBRSxJQUFJLENBQUMsV0FBVyxFQUFFLFdBQVcsRUFBRSxJQUFJLENBQUMsV0FBVyxFQUFDLENBQUMsQ0FBQTtJQUMzRyxDQUFDO0lBR0QsK0JBQStCOzs7Ozs7SUFFL0Isd0NBQVU7Ozs7OztJQUFWLFVBQVcsSUFBeUI7UUFDbkMsSUFBSSxJQUFJLEVBQUU7WUFDVCxLQUFLLElBQU0sR0FBRyxJQUFJLElBQUksRUFBRTtnQkFDdkIsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQTthQUNyQjtTQUNEO1FBQ0QsSUFBSSxJQUFJLENBQUMsaUJBQWlCLEVBQUU7WUFDM0IsSUFBSSxDQUFDLDBCQUEwQixFQUFFLENBQUE7WUFDakMsT0FBTTtTQUNOO1FBQ0QsSUFBSSxDQUFDLGVBQWUsRUFBRSxDQUFBO0lBQ3ZCLENBQUM7Ozs7SUFFRCw2Q0FBZTs7O0lBQWY7UUFDQyxJQUFJLENBQUMsMEJBQTBCLEVBQUUsQ0FBQTtJQUNsQyxDQUFDOzs7OztJQUVELDJDQUFhOzs7O0lBQWIsVUFBYyxJQUF3QjtRQUNyQyxLQUFLLElBQU0sR0FBRyxJQUFJLElBQUksRUFBRTtZQUN2QixJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFBO1NBQ3JCO0lBQ0YsQ0FBQzs7Ozs7O0lBRUQsc0NBQVE7Ozs7O0lBQVIsVUFBUyxLQUFhLEVBQUUsT0FBb0M7O1lBQ3JELGFBQWEsR0FBRyxPQUFPLElBQUksRUFBRTtRQUNqQyxJQUFBLHVDQUFXLEVBQUUsbURBQWlCO1FBQ2hDLElBQUksaUJBQWlCLEVBQUU7WUFDdEIsSUFBSSxDQUFDLGlCQUFpQixHQUFHLEtBQUssQ0FBQTtTQUM5QjtRQUNELElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsS0FBSyxDQUFDLEVBQUUsRUFBQyxXQUFXLEVBQUUsV0FBVyxJQUFJLEVBQUUsRUFBQyxDQUFDLENBQUE7SUFDaEUsQ0FBQzs7Ozs7SUFFRCwwQ0FBWTs7OztJQUFaLFVBQWEsTUFBZTtRQUMzQixJQUFJLENBQUMsWUFBWSxHQUFHLE1BQU0sQ0FBQTtJQUMzQixDQUFDO0lBQ0YsMEJBQUM7QUFBRCxDQUFDLEFBOURELElBOERDOzs7O0lBN0RBLGdEQUFrQzs7SUFDbEMsMkNBQTZCOztJQUM3QiwwQ0FBdUM7O0lBQ3ZDLDBDQUF1Qzs7SUFHdEMsa0RBQStDOztJQUMvQyxxQ0FBcUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge09uSW5pdH0gZnJvbSAnQGFuZ3VsYXIvY29yZSdcclxuaW1wb3J0IHtSb3V0ZXJ9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcidcclxuXHJcbmltcG9ydCB7R2xvYmFsRXZlbnRzU2VydmljZX0gZnJvbSAnLi4vc2VydmljZXMvZ2xvYmFsRXZlbnRzL2dsb2JhbEV2ZW50cy5zZXJ2aWNlJ1xyXG5pbXBvcnQge0dFU1JlZGlyZWN0T3B0aW9uc0ludGVyZmFjZX0gZnJvbSAnLi4vc2VydmljZXMvZ2xvYmFsRXZlbnRzL2dsb2JhbEV2ZW50cy5pbnRlcmZhY2VzJ1xyXG5cclxuXHJcbmV4cG9ydCBjbGFzcyBCYXNlTGF5b3V0Q29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcclxuXHRpbml0aWFsRGF0YUxvYWRlZDogYm9vbGVhbiA9IGZhbHNlXHJcblx0bG9hZGVyQWN0aXZlOiBib29sZWFuID0gZmFsc2VcclxuXHRxdWVyeVBhcmFtczoge1t4OiBzdHJpbmddOiBzdHJpbmd9ID0ge31cclxuXHRyb3V0ZVBhcmFtczoge1t4OiBzdHJpbmddOiBzdHJpbmd9ID0ge31cclxuXHJcblx0Y29uc3RydWN0b3IoXHJcblx0XHRwdWJsaWMgZ2xvYmFsRXZlbnRzU2VydmljZTogR2xvYmFsRXZlbnRzU2VydmljZSxcclxuXHRcdHB1YmxpYyByb3V0ZXI6IFJvdXRlclxyXG5cdCkge1xyXG5cdH1cclxuXHJcblx0bmdPbkluaXQoKTogdm9pZCB7XHJcblx0XHR0aGlzLmdsb2JhbEV2ZW50c1NlcnZpY2UucGFnZUxvYWRlZCQuc3Vic2NyaWJlKChkYXRhPzoge1t4OiBzdHJpbmddOiBhbnl9KSA9PiB0aGlzLnBhZ2VMb2FkZWQoZGF0YSkpXHJcblx0XHR0aGlzLmdsb2JhbEV2ZW50c1NlcnZpY2UudHJpZ2dlckluaXRpYWxEYXRhTG9hZCQuc3Vic2NyaWJlKCgpID0+IHRoaXMubG9hZEluaXRpYWxEYXRhKCkpXHJcblx0XHR0aGlzLmdsb2JhbEV2ZW50c1NlcnZpY2Uuc2V0TGF5b3V0RGF0YSQuc3Vic2NyaWJlKChkYXRhKSA9PiB0aGlzLnNldExheW91dERhdGEoZGF0YSkpXHJcblx0XHR0aGlzLmdsb2JhbEV2ZW50c1NlcnZpY2UucmVkaXJlY3QkLnN1YnNjcmliZSgoe3JvdXRlLCBvcHRpb25zfSkgPT4gdGhpcy5yZWRpcmVjdChyb3V0ZSwgb3B0aW9ucykpXHJcblx0XHR0aGlzLmdsb2JhbEV2ZW50c1NlcnZpY2UudG9nZ2xlTG9hZGVyJC5zdWJzY3JpYmUoKGFjdGl2ZSkgPT4gdGhpcy50b2dnbGVMb2FkZXIoYWN0aXZlKSlcclxuXHR9XHJcblxyXG5cdHNlbmRJbml0aWFsRGF0YUxvYWRlZEV2ZW50KCkge1xyXG5cdFx0dGhpcy5nbG9iYWxFdmVudHNTZXJ2aWNlLmluaXRpYWxEYXRhTG9hZGVkKHtxdWVyeVBhcmFtczogdGhpcy5xdWVyeVBhcmFtcywgcm91dGVQYXJhbXM6IHRoaXMucm91dGVQYXJhbXN9KVxyXG5cdH1cclxuXHJcblxyXG5cdC8vIGdsb2JhbEV2ZW50c1NlcnZpY2UgaGFuZGxlcnNcclxuXHJcblx0cGFnZUxvYWRlZChkYXRhPzoge1t4OiBzdHJpbmddOiBhbnl9KTogdm9pZCB7XHJcblx0XHRpZiAoZGF0YSkge1xyXG5cdFx0XHRmb3IgKGNvbnN0IGtleSBpbiBkYXRhKSB7XHJcblx0XHRcdFx0dGhpc1trZXldID0gZGF0YVtrZXldXHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHRcdGlmICh0aGlzLmluaXRpYWxEYXRhTG9hZGVkKSB7XHJcblx0XHRcdHRoaXMuc2VuZEluaXRpYWxEYXRhTG9hZGVkRXZlbnQoKVxyXG5cdFx0XHRyZXR1cm5cclxuXHRcdH1cclxuXHRcdHRoaXMubG9hZEluaXRpYWxEYXRhKClcclxuXHR9XHJcblxyXG5cdGxvYWRJbml0aWFsRGF0YSgpOiB2b2lkIHtcclxuXHRcdHRoaXMuc2VuZEluaXRpYWxEYXRhTG9hZGVkRXZlbnQoKVxyXG5cdH1cclxuXHJcblx0c2V0TGF5b3V0RGF0YShhcmdzOiB7W3g6IHN0cmluZ106IGFueX0pIHtcclxuXHRcdGZvciAoY29uc3Qga2V5IGluIGFyZ3MpIHtcclxuXHRcdFx0dGhpc1trZXldID0gYXJnc1trZXldXHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRyZWRpcmVjdChyb3V0ZTogc3RyaW5nLCBvcHRpb25zOiBHRVNSZWRpcmVjdE9wdGlvbnNJbnRlcmZhY2UpOiB2b2lkIHtcclxuXHRcdGNvbnN0IGFjdHVhbE9wdGlvbnMgPSBvcHRpb25zIHx8IHt9LFxyXG5cdFx0XHR7cXVlcnlQYXJhbXMsIHJlbG9hZEluaXRpYWxEYXRhfSA9IGFjdHVhbE9wdGlvbnNcclxuXHRcdGlmIChyZWxvYWRJbml0aWFsRGF0YSkge1xyXG5cdFx0XHR0aGlzLmluaXRpYWxEYXRhTG9hZGVkID0gZmFsc2VcclxuXHRcdH1cclxuXHRcdHRoaXMucm91dGVyLm5hdmlnYXRlKFtyb3V0ZV0sIHtxdWVyeVBhcmFtczogcXVlcnlQYXJhbXMgfHwge319KVxyXG5cdH1cclxuXHJcblx0dG9nZ2xlTG9hZGVyKGFjdGl2ZTogYm9vbGVhbik6IHZvaWQge1xyXG5cdFx0dGhpcy5sb2FkZXJBY3RpdmUgPSBhY3RpdmVcclxuXHR9XHJcbn1cclxuIl19