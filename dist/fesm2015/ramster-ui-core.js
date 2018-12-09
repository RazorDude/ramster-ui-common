import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Injectable, NgModule } from '@angular/core';
import { __rest } from 'tslib';
import { HttpClient, HttpParams, HttpRequest, HttpHeaders } from '@angular/common/http';
import co from 'co';
import { CommonModule } from '@angular/common';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class BaseLayoutComponent {
    /**
     * @param {?} globalEventsService
     * @param {?} router
     */
    constructor(globalEventsService, router) {
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
    ngOnInit() {
        this.globalEventsService.pageLoaded$.subscribe((data) => this.pageLoaded(data));
        this.globalEventsService.triggerInitialDataLoad$.subscribe(() => this.loadInitialData());
        this.globalEventsService.setLayoutData$.subscribe((data) => this.setLayoutData(data));
        this.globalEventsService.redirect$.subscribe(({ route, options }) => this.redirect(route, options));
        this.globalEventsService.toggleLoader$.subscribe((active) => this.toggleLoader(active));
    }
    /**
     * @return {?}
     */
    sendInitialDataLoadedEvent() {
        this.globalEventsService.initialDataLoaded({ queryParams: this.queryParams, routeParams: this.routeParams });
    }
    // globalEventsService handlers
    /**
     * @param {?=} data
     * @return {?}
     */
    pageLoaded(data) {
        if (data) {
            for (const key in data) {
                this[key] = data[key];
            }
        }
        if (this.initialDataLoaded) {
            this.sendInitialDataLoadedEvent();
            return;
        }
        this.loadInitialData();
    }
    /**
     * @return {?}
     */
    loadInitialData() {
        this.sendInitialDataLoadedEvent();
    }
    /**
     * @param {?} args
     * @return {?}
     */
    setLayoutData(args) {
        for (const key in args) {
            this[key] = args[key];
        }
    }
    /**
     * @param {?} route
     * @param {?} options
     * @return {?}
     */
    redirect(route, options) {
        /** @type {?} */
        const actualOptions = options || {};
        const { queryParams, reloadInitialData } = actualOptions;
        if (reloadInitialData) {
            this.initialDataLoaded = false;
        }
        this.router.navigate([route], { queryParams: queryParams || {} });
    }
    /**
     * @param {?} active
     * @return {?}
     */
    toggleLoader(active) {
        this.loaderActive = active;
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class BasePageComponent {
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class GlobalEventsService {
    constructor() {
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class RequestService {
    /**
     * @param {?} client
     */
    constructor(client) {
        this.client = client;
    }
    /**
     * @param {?} method
     * @param {?} url
     * @param {?=} options
     * @return {?}
     */
    run(method, url, options) {
        return new Promise((resolve, reject) => {
            try {
                /** @type {?} */
                let runOptions = (/** @type {?} */ ({}));
                /** @type {?} */
                let requestOptions = (/** @type {?} */ ({}));
                /** @type {?} */
                let body = null;
                if (options && (typeof options === 'object')) {
                    let { resolveWithFullResponse } = options, otherOptions = __rest(options, ["resolveWithFullResponse"]);
                    requestOptions = otherOptions;
                    runOptions = { resolveWithFullResponse };
                }
                if (method.toLowerCase() === 'get') {
                    if (!requestOptions || (typeof requestOptions !== 'object')) {
                        requestOptions = {};
                    }
                    /** @type {?} */
                    const optionsParams = requestOptions.params || {};
                    /** @type {?} */
                    let httpParams = new HttpParams();
                    for (const key in optionsParams) {
                        /** @type {?} */
                        const optParam = optionsParams[key];
                        if ((typeof optParam === 'object') && (optParam !== null)) {
                            if (optParam instanceof Array) {
                                optParam.forEach((item) => {
                                    if ((typeof item === 'object') && (item !== null)) {
                                        for (const innerKey in item) {
                                            httpParams = httpParams.set(`${key}[${innerKey}]`, item[innerKey]);
                                        }
                                        return;
                                    }
                                    httpParams = httpParams.set(`${key}[]`, item);
                                });
                                continue;
                            }
                            for (const innerKey in optParam) {
                                httpParams = httpParams.set(`${key}[${innerKey}]`, optParam[innerKey]);
                            }
                            continue;
                        }
                        httpParams = httpParams.set(key, optParam);
                    }
                    httpParams = httpParams.set('_', (new Date()).getTime().toString());
                    requestOptions.params = httpParams;
                }
                else {
                    if (!requestOptions || (typeof requestOptions !== 'object')) {
                        requestOptions = {};
                    }
                    body = (!requestOptions.body || (typeof requestOptions.body !== 'object')) ? {} : requestOptions.body;
                    body._ = (new Date()).getTime();
                    delete requestOptions.body;
                }
                if (!requestOptions.responseType) ;
                this.client.request(new HttpRequest(method, url, body, requestOptions)).toPromise().then((response) => runOptions.resolveWithFullResponse ? resolve(response) : resolve(response.body), (error) => reject(error));
            }
            catch (error) {
                reject(error);
            }
        });
    }
}
RequestService.decorators = [
    { type: Injectable }
];
/** @nocollapse */
RequestService.ctorParameters = () => [
    { type: HttpClient }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class BaseRESTService {
    /**
     * @param {?} globalEventsService
     * @param {?} requestService
     */
    constructor(globalEventsService, requestService) {
        this.globalEventsService = globalEventsService;
        this.requestService = requestService;
        this.headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        this.baseUrl = '/';
    }
    /**
     * @param {?} err
     * @return {?}
     */
    handleError(err) {
        this.globalEventsService.notify('error', err && err.error && err.error.error || 'An error has occurred.');
    }
    /**
     * @param {?} params
     * @return {?}
     */
    create(params) {
        /** @type {?} */
        const instance = this;
        return new Promise((resolve, reject) => {
            co(function* () {
                yield instance.requestService.run('post', `${instance.baseUrl}`, {
                    headers: instance.headers,
                    body: params
                });
                return { success: true };
            }).then((res) => resolve(res), (err) => {
                instance.handleError(err);
                reject({ error: true });
            });
        });
    }
    /**
     * @param {?} params
     * @return {?}
     */
    read(params) {
        /** @type {?} */
        const instance = this;
        return new Promise((resolve, reject) => {
            co(function* () {
                return yield instance.requestService.run('get', `${instance.baseUrl}/item`, {
                    headers: instance.headers,
                    params
                });
            }).then((res) => resolve(res), (err) => {
                instance.handleError(err);
                reject({ error: true });
            });
        });
    }
    /**
     * @param {?} params
     * @return {?}
     */
    readList(params) {
        /** @type {?} */
        const instance = this;
        return new Promise((resolve, reject) => {
            co(function* () {
                return yield instance.requestService.run('get', `${instance.baseUrl}`, {
                    headers: instance.headers,
                    params
                });
            }).then((res) => resolve(res), (err) => {
                instance.handleError(err);
                reject({ error: true });
            });
        });
    }
    /**
     * @param {?} params
     * @return {?}
     */
    readSelectList(params) {
        /** @type {?} */
        const instance = this;
        return new Promise((resolve, reject) => {
            co(function* () {
                return yield instance.requestService.run('get', `${instance.baseUrl}/selectList`, {
                    headers: instance.headers,
                    params
                });
            }).then((res) => resolve(res), (err) => {
                instance.handleError(err);
                reject({ error: true });
            });
        });
    }
    /**
     * @param {?} params
     * @return {?}
     */
    update(params) {
        /** @type {?} */
        const instance = this;
        return new Promise((resolve, reject) => {
            co(function* () {
                return yield instance.requestService.run('patch', `${instance.baseUrl}/item/${params.id}`, {
                    headers: instance.headers,
                    body: params
                });
            }).then((res) => resolve(res), (err) => {
                instance.handleError(err);
                reject({ error: true });
            });
        });
    }
    /**
     * @param {?} params
     * @return {?}
     */
    bulkUpsert(params) {
        /** @type {?} */
        const instance = this;
        return new Promise((resolve, reject) => {
            co(function* () {
                return yield instance.requestService.run('put', `${instance.baseUrl}`, {
                    headers: instance.headers,
                    body: params
                });
            }).then((res) => resolve(res), (err) => {
                instance.handleError(err);
                reject({ error: true });
            });
        });
    }
    /**
     * @param {?} params
     * @return {?}
     */
    delete(params) {
        /** @type {?} */
        const instance = this;
        return new Promise((resolve, reject) => {
            co(function* () {
                return yield instance.requestService.run('delete', `${instance.baseUrl}/${params.id}`, {
                    headers: instance.headers,
                    body: params
                });
            }).then((res) => resolve(res), (err) => {
                instance.handleError(err);
                reject({ error: true });
            });
        });
    }
}
BaseRESTService.decorators = [
    { type: Injectable }
];
/** @nocollapse */
BaseRESTService.ctorParameters = () => [
    { type: GlobalEventsService },
    { type: RequestService }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class FilesRESTService {
    /**
     * @param {?} globalEventsService
     * @param {?} requestService
     */
    constructor(globalEventsService, requestService) {
        this.globalEventsService = globalEventsService;
        this.requestService = requestService;
        // {'Content-Type': 'application/json'}
        this.headers = new HttpHeaders();
        this.baseUrl = '/files';
    }
    /**
     * @param {?} err
     * @return {?}
     */
    handleError(err) {
        this.globalEventsService.notify('error', err && err.error && err.error.error || 'An error has occurred.');
    }
    /**
     * @param {?} file
     * @param {?} params
     * @param {?=} options
     * @return {?}
     */
    upload(file, params, options) {
        /** @type {?} */
        const instance = this;
        return new Promise((resolve, reject) => {
            co(function* () {
                /** @type {?} */
                let fd = new FormData();
                fd.append('file', file, file.name);
                for (const key in params) {
                    fd.append(key, params[key]);
                }
                instance.headers.set('Content-Type', 'multipart/form-data');
                yield instance.requestService.run('post', `${instance.baseUrl}`, {
                    headers: instance.headers,
                    body: fd
                });
                return { success: true };
            }).then((res) => resolve(res), (err) => {
                if (options && options.handleError) {
                    instance.handleError(err);
                }
                reject({ error: err || true });
            });
        });
    }
    /**
     * @param {?} params
     * @return {?}
     */
    read(params) {
        /** @type {?} */
        const instance = this;
        return new Promise((resolve, reject) => {
            co(function* () {
                return yield instance.requestService.run('get', `${instance.baseUrl}/item`, {
                    headers: instance.headers,
                    params
                });
            }).then((res) => resolve(res), (err) => {
                instance.handleError(err);
                reject({ error: true });
            });
        });
    }
}
FilesRESTService.decorators = [
    { type: Injectable }
];
/** @nocollapse */
FilesRESTService.ctorParameters = () => [
    { type: GlobalEventsService },
    { type: RequestService }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
const getNested = (parent, field) => {
    if ((typeof parent !== 'object') || (typeof field !== 'string')) {
        return null;
    }
    /** @type {?} */
    let fieldData = field.split('.');
    /** @type {?} */
    let currentElement = parent;
    for (let i in fieldData) {
        /** @type {?} */
        let innerElement = fieldData[i];
        if (currentElement === null) {
            return currentElement;
        }
        if ((typeof currentElement === 'undefined') || (typeof currentElement[innerElement] === 'undefined')) {
            return currentElement;
        }
        currentElement = currentElement[innerElement];
    }
    return currentElement;
};
/** @type {?} */
const setNested = (parent, field, value) => {
    /** @type {?} */
    const fieldNames = field.split('.');
    if (!fieldNames.length) {
        return false;
    }
    /** @type {?} */
    let currentParent = parent;
    /** @type {?} */
    let loopEnd = fieldNames.length - 1;
    for (let i = 0; i < loopEnd; i++) {
        /** @type {?} */
        const fieldName = fieldNames[i];
        if (typeof currentParent[fieldName] === 'undefined') {
            return false;
        }
        currentParent = currentParent[fieldName];
    }
    currentParent[fieldNames[loopEnd]] = value;
    return true;
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class RamsterUICoreModule {
}
RamsterUICoreModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    CommonModule
                ]
            },] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

export { RamsterUICoreModule, BaseLayoutComponent, BasePageComponent, BaseRESTService, FilesRESTService, getNested, setNested, GlobalEventsService, RequestService };

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmFtc3Rlci11aS1jb3JlLmpzLm1hcCIsInNvdXJjZXMiOlsibmc6Ly9yYW1zdGVyLXVpLWNvcmUvY29tcG9uZW50cy9iYXNlLWxheW91dC5jb21wb25lbnQudHMiLCJuZzovL3JhbXN0ZXItdWktY29yZS9jb21wb25lbnRzL2Jhc2UtcGFnZS5jb21wb25lbnQudHMiLCJuZzovL3JhbXN0ZXItdWktY29yZS9zZXJ2aWNlcy9nbG9iYWxFdmVudHMvZ2xvYmFsRXZlbnRzLnNlcnZpY2UudHMiLCJuZzovL3JhbXN0ZXItdWktY29yZS9zZXJ2aWNlcy9yZXF1ZXN0LnNlcnZpY2UudHMiLCJuZzovL3JhbXN0ZXItdWktY29yZS9zZXJ2aWNlcy9iYXNlUkVTVC5zZXJ2aWNlLnRzIiwibmc6Ly9yYW1zdGVyLXVpLWNvcmUvc2VydmljZXMvZmlsZXNSRVNULnNlcnZpY2UudHMiLCJuZzovL3JhbXN0ZXItdWktY29yZS91dGlscy90b29sYmVsdC50cyIsIm5nOi8vcmFtc3Rlci11aS1jb3JlL2luZGV4LnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7T25Jbml0fSBmcm9tICdAYW5ndWxhci9jb3JlJ1xyXG5pbXBvcnQge1JvdXRlcn0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJ1xyXG5cclxuaW1wb3J0IHtHbG9iYWxFdmVudHNTZXJ2aWNlfSBmcm9tICcuLi9zZXJ2aWNlcy9nbG9iYWxFdmVudHMvZ2xvYmFsRXZlbnRzLnNlcnZpY2UnXHJcbmltcG9ydCB7R0VTUmVkaXJlY3RPcHRpb25zSW50ZXJmYWNlfSBmcm9tICcuLi9zZXJ2aWNlcy9nbG9iYWxFdmVudHMvZ2xvYmFsRXZlbnRzLmludGVyZmFjZXMnXHJcblxyXG5cclxuZXhwb3J0IGNsYXNzIEJhc2VMYXlvdXRDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xyXG5cdGluaXRpYWxEYXRhTG9hZGVkOiBib29sZWFuID0gZmFsc2VcclxuXHRsb2FkZXJBY3RpdmU6IGJvb2xlYW4gPSBmYWxzZVxyXG5cdHF1ZXJ5UGFyYW1zOiB7W3g6IHN0cmluZ106IHN0cmluZ30gPSB7fVxyXG5cdHJvdXRlUGFyYW1zOiB7W3g6IHN0cmluZ106IHN0cmluZ30gPSB7fVxyXG5cclxuXHRjb25zdHJ1Y3RvcihcclxuXHRcdHB1YmxpYyBnbG9iYWxFdmVudHNTZXJ2aWNlOiBHbG9iYWxFdmVudHNTZXJ2aWNlLFxyXG5cdFx0cHVibGljIHJvdXRlcjogUm91dGVyXHJcblx0KSB7XHJcblx0fVxyXG5cclxuXHRuZ09uSW5pdCgpOiB2b2lkIHtcclxuXHRcdHRoaXMuZ2xvYmFsRXZlbnRzU2VydmljZS5wYWdlTG9hZGVkJC5zdWJzY3JpYmUoKGRhdGE/OiB7W3g6IHN0cmluZ106IGFueX0pID0+IHRoaXMucGFnZUxvYWRlZChkYXRhKSlcclxuXHRcdHRoaXMuZ2xvYmFsRXZlbnRzU2VydmljZS50cmlnZ2VySW5pdGlhbERhdGFMb2FkJC5zdWJzY3JpYmUoKCkgPT4gdGhpcy5sb2FkSW5pdGlhbERhdGEoKSlcclxuXHRcdHRoaXMuZ2xvYmFsRXZlbnRzU2VydmljZS5zZXRMYXlvdXREYXRhJC5zdWJzY3JpYmUoKGRhdGEpID0+IHRoaXMuc2V0TGF5b3V0RGF0YShkYXRhKSlcclxuXHRcdHRoaXMuZ2xvYmFsRXZlbnRzU2VydmljZS5yZWRpcmVjdCQuc3Vic2NyaWJlKCh7cm91dGUsIG9wdGlvbnN9KSA9PiB0aGlzLnJlZGlyZWN0KHJvdXRlLCBvcHRpb25zKSlcclxuXHRcdHRoaXMuZ2xvYmFsRXZlbnRzU2VydmljZS50b2dnbGVMb2FkZXIkLnN1YnNjcmliZSgoYWN0aXZlKSA9PiB0aGlzLnRvZ2dsZUxvYWRlcihhY3RpdmUpKVxyXG5cdH1cclxuXHJcblx0c2VuZEluaXRpYWxEYXRhTG9hZGVkRXZlbnQoKSB7XHJcblx0XHR0aGlzLmdsb2JhbEV2ZW50c1NlcnZpY2UuaW5pdGlhbERhdGFMb2FkZWQoe3F1ZXJ5UGFyYW1zOiB0aGlzLnF1ZXJ5UGFyYW1zLCByb3V0ZVBhcmFtczogdGhpcy5yb3V0ZVBhcmFtc30pXHJcblx0fVxyXG5cclxuXHJcblx0Ly8gZ2xvYmFsRXZlbnRzU2VydmljZSBoYW5kbGVyc1xyXG5cclxuXHRwYWdlTG9hZGVkKGRhdGE/OiB7W3g6IHN0cmluZ106IGFueX0pOiB2b2lkIHtcclxuXHRcdGlmIChkYXRhKSB7XHJcblx0XHRcdGZvciAoY29uc3Qga2V5IGluIGRhdGEpIHtcclxuXHRcdFx0XHR0aGlzW2tleV0gPSBkYXRhW2tleV1cclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdFx0aWYgKHRoaXMuaW5pdGlhbERhdGFMb2FkZWQpIHtcclxuXHRcdFx0dGhpcy5zZW5kSW5pdGlhbERhdGFMb2FkZWRFdmVudCgpXHJcblx0XHRcdHJldHVyblxyXG5cdFx0fVxyXG5cdFx0dGhpcy5sb2FkSW5pdGlhbERhdGEoKVxyXG5cdH1cclxuXHJcblx0bG9hZEluaXRpYWxEYXRhKCk6IHZvaWQge1xyXG5cdFx0dGhpcy5zZW5kSW5pdGlhbERhdGFMb2FkZWRFdmVudCgpXHJcblx0fVxyXG5cclxuXHRzZXRMYXlvdXREYXRhKGFyZ3M6IHtbeDogc3RyaW5nXTogYW55fSkge1xyXG5cdFx0Zm9yIChjb25zdCBrZXkgaW4gYXJncykge1xyXG5cdFx0XHR0aGlzW2tleV0gPSBhcmdzW2tleV1cclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdHJlZGlyZWN0KHJvdXRlOiBzdHJpbmcsIG9wdGlvbnM6IEdFU1JlZGlyZWN0T3B0aW9uc0ludGVyZmFjZSk6IHZvaWQge1xyXG5cdFx0Y29uc3QgYWN0dWFsT3B0aW9ucyA9IG9wdGlvbnMgfHwge30sXHJcblx0XHRcdHtxdWVyeVBhcmFtcywgcmVsb2FkSW5pdGlhbERhdGF9ID0gYWN0dWFsT3B0aW9uc1xyXG5cdFx0aWYgKHJlbG9hZEluaXRpYWxEYXRhKSB7XHJcblx0XHRcdHRoaXMuaW5pdGlhbERhdGFMb2FkZWQgPSBmYWxzZVxyXG5cdFx0fVxyXG5cdFx0dGhpcy5yb3V0ZXIubmF2aWdhdGUoW3JvdXRlXSwge3F1ZXJ5UGFyYW1zOiBxdWVyeVBhcmFtcyB8fCB7fX0pXHJcblx0fVxyXG5cclxuXHR0b2dnbGVMb2FkZXIoYWN0aXZlOiBib29sZWFuKTogdm9pZCB7XHJcblx0XHR0aGlzLmxvYWRlckFjdGl2ZSA9IGFjdGl2ZVxyXG5cdH1cclxufVxyXG4iLCIndXNlIHN0cmljdCdcclxuXHJcbmltcG9ydCB7QWN0aXZhdGVkUm91dGV9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcidcclxuaW1wb3J0IHtPbkRlc3Ryb3ksIE9uSW5pdH0gZnJvbSAnQGFuZ3VsYXIvY29yZSdcclxuaW1wb3J0IHtTdWJqZWN0fSBmcm9tICdyeGpzJ1xyXG5pbXBvcnQge3Rha2VVbnRpbH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnXHJcblxyXG5pbXBvcnQge0dsb2JhbEV2ZW50c1NlcnZpY2V9IGZyb20gJy4uL3NlcnZpY2VzL2dsb2JhbEV2ZW50cy9nbG9iYWxFdmVudHMuc2VydmljZSdcclxuXHJcbmV4cG9ydCBjbGFzcyBCYXNlUGFnZUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95IHtcclxuXHRkZXN0cm95ZWQ6IFN1YmplY3Q8dm9pZD4gPSBuZXcgU3ViamVjdCgpXHJcblx0bG9nZ2VkSW5Vc2VyPzogYW55XHJcblx0cXVlcnlQYXJhbXM6IHtbeDogc3RyaW5nXTogc3RyaW5nfVxyXG5cdHJvdXRlUGFyYW1zOiB7W3g6IHN0cmluZ106IHN0cmluZ31cclxuXHJcblx0Y29uc3RydWN0b3IoXHJcblx0XHRwdWJsaWMgYWN0aXZhdGVkUm91dGU6IEFjdGl2YXRlZFJvdXRlLFxyXG5cdFx0cHVibGljIGdsb2JhbEV2ZW50c1NlcnZpY2U6IEdsb2JhbEV2ZW50c1NlcnZpY2UsXHJcblx0XHRwdWJsaWMgb25Jbml0TWV0aG9kTmFtZXM6IHN0cmluZ1tdLFxyXG5cdFx0cHVibGljIG9uSW5pdGlhbERhdGFMb2FkZWRNZXRob2ROYW1lczogc3RyaW5nW11cclxuXHQpIHtcclxuXHR9XHJcblxyXG5cdG5nT25Jbml0KCkge1xyXG5cdFx0dGhpcy5nbG9iYWxFdmVudHNTZXJ2aWNlLmluaXRpYWxEYXRhTG9hZGVkJC5waXBlKHRha2VVbnRpbCh0aGlzLmRlc3Ryb3llZCkpLnN1YnNjcmliZSgoZGF0YSkgPT4gdGhpcy5pbml0aWFsRGF0YUxvYWRlZChkYXRhKSlcclxuXHRcdHRoaXMub25Jbml0TWV0aG9kTmFtZXMuZm9yRWFjaCgobWV0aG9kTmFtZSkgPT4ge1xyXG5cdFx0XHRpZiAodHlwZW9mIHRoaXNbbWV0aG9kTmFtZV0gPT09ICdmdW5jdGlvbicpIHtcclxuXHRcdFx0XHR0aGlzW21ldGhvZE5hbWVdKClcclxuXHRcdFx0fVxyXG5cdFx0fSlcclxuXHR9XHJcblxyXG5cdHJlc2V0KCk6IHZvaWQge1xyXG5cdFx0dGhpcy5xdWVyeVBhcmFtcyA9IHRoaXMuYWN0aXZhdGVkUm91dGUuc25hcHNob3QucXVlcnlQYXJhbXNcclxuXHRcdHRoaXMucm91dGVQYXJhbXMgPSB0aGlzLmFjdGl2YXRlZFJvdXRlLnNuYXBzaG90LnBhcmFtc1xyXG5cdFx0dGhpcy5nbG9iYWxFdmVudHNTZXJ2aWNlLnBhZ2VMb2FkZWQoe3F1ZXJ5UGFyYW1zOiB0aGlzLnF1ZXJ5UGFyYW1zLCByb3V0ZVBhcmFtczogdGhpcy5yb3V0ZVBhcmFtc30pXHJcblx0fVxyXG5cclxuXHRpbml0aWFsRGF0YUxvYWRlZChkYXRhKTogdm9pZCB7XHJcblx0XHR0aGlzLmxvZ2dlZEluVXNlciA9IGRhdGEudXNlclxyXG5cdFx0dGhpcy5xdWVyeVBhcmFtcyA9IGRhdGEucXVlcnlQYXJhbXNcclxuXHRcdHRoaXMucm91dGVQYXJhbXMgPSBkYXRhLnJvdXRlUGFyYW1zXHJcblx0XHR0aGlzLm9uSW5pdGlhbERhdGFMb2FkZWRNZXRob2ROYW1lcy5mb3JFYWNoKChtZXRob2ROYW1lKSA9PiB7XHJcblx0XHRcdGlmICh0eXBlb2YgdGhpc1ttZXRob2ROYW1lXSA9PT0gJ2Z1bmN0aW9uJykge1xyXG5cdFx0XHRcdHRoaXNbbWV0aG9kTmFtZV0oZGF0YSlcclxuXHRcdFx0fVxyXG5cdFx0fSlcclxuXHR9XHJcblxyXG5cdGRlc3RydWN0b3IoKSB7XHJcblx0XHR0aGlzLmRlc3Ryb3llZC5uZXh0KClcclxuXHRcdHRoaXMuZGVzdHJveWVkLmNvbXBsZXRlKClcclxuXHR9XHJcblxyXG5cdG5nT25EZXN0cm95KCkge1xyXG5cdFx0dGhpcy5kZXN0cnVjdG9yKClcclxuXHR9XHJcbn1cclxuIiwiaW1wb3J0IHtJbmplY3RhYmxlfSBmcm9tICdAYW5ndWxhci9jb3JlJ1xyXG5pbXBvcnQge1N1YmplY3R9IGZyb20gJ3J4anMnXHJcbmltcG9ydCB7R0VTUmVkaXJlY3RPcHRpb25zSW50ZXJmYWNlfSBmcm9tICcuL2dsb2JhbEV2ZW50cy5pbnRlcmZhY2VzJ1xyXG5cclxuQEluamVjdGFibGUoKVxyXG5leHBvcnQgY2xhc3MgR2xvYmFsRXZlbnRzU2VydmljZSB7XHJcblx0cGFnZUxvYWRlZFNvdXJjZSA9IG5ldyBTdWJqZWN0PHtbeDogc3RyaW5nXTogYW55fSB8IHZvaWQ+KClcclxuXHR0cmlnZ2VySW5pdGlhbERhdGFMb2FkU291cmNlID0gbmV3IFN1YmplY3Q8dm9pZD4oKVxyXG5cdGluaXRpYWxEYXRhTG9hZGVkU291cmNlID0gbmV3IFN1YmplY3Q8YW55PigpXHJcblx0c2V0TGF5b3V0RGF0YVNvdXJjZSA9IG5ldyBTdWJqZWN0PHtbeDogc3RyaW5nXTogYW55fT4oKVxyXG5cdHJlZGlyZWN0U291cmNlID0gbmV3IFN1YmplY3Q8e3JvdXRlOiBzdHJpbmcsIG9wdGlvbnM6IEdFU1JlZGlyZWN0T3B0aW9uc0ludGVyZmFjZX0+KClcclxuXHRub3RpZnlTb3VyY2UgPSBuZXcgU3ViamVjdDx7dHlwZTogc3RyaW5nLCBtZXNzYWdlOiBzdHJpbmd9PigpXHJcblx0dG9nZ2xlTG9hZGVyU291cmNlID0gbmV3IFN1YmplY3Q8Ym9vbGVhbj4oKVxyXG5cclxuXHRwYWdlTG9hZGVkJCA9IHRoaXMucGFnZUxvYWRlZFNvdXJjZS5hc09ic2VydmFibGUoKVxyXG5cdHRyaWdnZXJJbml0aWFsRGF0YUxvYWQkID0gdGhpcy50cmlnZ2VySW5pdGlhbERhdGFMb2FkU291cmNlLmFzT2JzZXJ2YWJsZSgpXHJcblx0aW5pdGlhbERhdGFMb2FkZWQkID0gdGhpcy5pbml0aWFsRGF0YUxvYWRlZFNvdXJjZS5hc09ic2VydmFibGUoKVxyXG5cdHNldExheW91dERhdGEkID0gdGhpcy5zZXRMYXlvdXREYXRhU291cmNlLmFzT2JzZXJ2YWJsZSgpXHJcblx0cmVkaXJlY3QkID0gdGhpcy5yZWRpcmVjdFNvdXJjZS5hc09ic2VydmFibGUoKVxyXG5cdG5vdGlmeSQgPSB0aGlzLm5vdGlmeVNvdXJjZS5hc09ic2VydmFibGUoKVxyXG5cdHRvZ2dsZUxvYWRlciQgPSB0aGlzLnRvZ2dsZUxvYWRlclNvdXJjZS5hc09ic2VydmFibGUoKVxyXG5cclxuXHRwYWdlTG9hZGVkKGRhdGEpOiB2b2lkIHtcclxuXHRcdHRoaXMucGFnZUxvYWRlZFNvdXJjZS5uZXh0KGRhdGEpXHJcblx0fVxyXG5cclxuXHR0cmlnZ2VySW5pdGlhbERhdGFMb2FkKCk6IHZvaWQge1xyXG5cdFx0dGhpcy50cmlnZ2VySW5pdGlhbERhdGFMb2FkU291cmNlLm5leHQoKVxyXG5cdH1cclxuXHJcblx0aW5pdGlhbERhdGFMb2FkZWQoZGF0YSk6IHZvaWQge1xyXG5cdFx0dGhpcy5pbml0aWFsRGF0YUxvYWRlZFNvdXJjZS5uZXh0KGRhdGEpXHJcblx0fVxyXG5cclxuXHRzZXRMYXlvdXREYXRhKGRhdGEpOiB2b2lkIHtcclxuXHRcdHRoaXMuc2V0TGF5b3V0RGF0YVNvdXJjZS5uZXh0KGRhdGEpXHJcblx0fVxyXG5cclxuXHRyZWRpcmVjdChyb3V0ZTogc3RyaW5nLCBvcHRpb25zPzogR0VTUmVkaXJlY3RPcHRpb25zSW50ZXJmYWNlKTogdm9pZCB7XHJcblx0XHR0aGlzLnJlZGlyZWN0U291cmNlLm5leHQoe3JvdXRlLCBvcHRpb25zfSlcclxuXHR9XHJcblxyXG5cdG5vdGlmeSh0eXBlOiBzdHJpbmcsIG1lc3NhZ2U6IHN0cmluZyk6IHZvaWQge1xyXG5cdFx0dGhpcy5ub3RpZnlTb3VyY2UubmV4dCh7dHlwZSwgbWVzc2FnZX0pXHJcblx0fVxyXG5cclxuXHR0b2dnbGVMb2FkZXIoYWN0aXZlOiBib29sZWFuKTogdm9pZCB7XHJcblx0XHR0aGlzLnRvZ2dsZUxvYWRlclNvdXJjZS5uZXh0KGFjdGl2ZSlcclxuXHR9XHJcbn1cclxuIiwiaW1wb3J0IHtJbmplY3RhYmxlfSBmcm9tICdAYW5ndWxhci9jb3JlJ1xyXG5pbXBvcnQge0h0dHBDbGllbnQsIEh0dHBQYXJhbXMsIEh0dHBSZXF1ZXN0LCBIdHRwUmVzcG9uc2V9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJ1xyXG5cclxuXHJcbkBJbmplY3RhYmxlKClcclxuZXhwb3J0IGNsYXNzIFJlcXVlc3RTZXJ2aWNlIHtcclxuXHRjb25zdHJ1Y3RvcihwdWJsaWMgY2xpZW50OiBIdHRwQ2xpZW50KSB7fVxyXG5cclxuXHRydW4obWV0aG9kOiBzdHJpbmcsIHVybDogc3RyaW5nLCBvcHRpb25zPzoge1t4OiBzdHJpbmddOiBhbnl9KSB7XHJcblx0XHRyZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG5cdFx0XHR0cnkge1xyXG5cdFx0XHRcdGxldCBydW5PcHRpb25zID0ge30gYXMgYW55LFxyXG5cdFx0XHRcdFx0cmVxdWVzdE9wdGlvbnMgPSB7fSBhcyBhbnksXHJcblx0XHRcdFx0XHRib2R5ID0gbnVsbFxyXG5cdFx0XHRcdGlmIChvcHRpb25zICYmICh0eXBlb2Ygb3B0aW9ucyA9PT0gJ29iamVjdCcpKSB7XHJcblx0XHRcdFx0XHRsZXQge3Jlc29sdmVXaXRoRnVsbFJlc3BvbnNlLCAuLi4gb3RoZXJPcHRpb25zfSA9IG9wdGlvbnNcclxuXHRcdFx0XHRcdHJlcXVlc3RPcHRpb25zID0gb3RoZXJPcHRpb25zXHJcblx0XHRcdFx0XHRydW5PcHRpb25zID0ge3Jlc29sdmVXaXRoRnVsbFJlc3BvbnNlfVxyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHRpZiAobWV0aG9kLnRvTG93ZXJDYXNlKCkgPT09ICdnZXQnKSB7XHJcblx0XHRcdFx0XHRpZiAoIXJlcXVlc3RPcHRpb25zIHx8ICh0eXBlb2YgcmVxdWVzdE9wdGlvbnMgIT09ICdvYmplY3QnKSkge1xyXG5cdFx0XHRcdFx0XHRyZXF1ZXN0T3B0aW9ucyA9IHt9XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRjb25zdCBvcHRpb25zUGFyYW1zID0gcmVxdWVzdE9wdGlvbnMucGFyYW1zIHx8IHt9XHJcblx0XHRcdFx0XHRsZXQgaHR0cFBhcmFtcyA9IG5ldyBIdHRwUGFyYW1zKClcclxuXHRcdFx0XHRcdGZvciAoY29uc3Qga2V5IGluIG9wdGlvbnNQYXJhbXMpIHtcclxuXHRcdFx0XHRcdFx0Y29uc3Qgb3B0UGFyYW0gPSBvcHRpb25zUGFyYW1zW2tleV1cclxuXHRcdFx0XHRcdFx0aWYgKCh0eXBlb2Ygb3B0UGFyYW0gPT09ICdvYmplY3QnKSAmJiAob3B0UGFyYW0gIT09IG51bGwpKSB7XHJcblx0XHRcdFx0XHRcdFx0aWYgKG9wdFBhcmFtIGluc3RhbmNlb2YgQXJyYXkpIHtcclxuXHRcdFx0XHRcdFx0XHRcdG9wdFBhcmFtLmZvckVhY2goKGl0ZW0pID0+IHtcclxuXHRcdFx0XHRcdFx0XHRcdFx0aWYgKCh0eXBlb2YgaXRlbSA9PT0gJ29iamVjdCcpICYmIChpdGVtICE9PSBudWxsKSkge1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdGZvciAoY29uc3QgaW5uZXJLZXkgaW4gaXRlbSkge1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0aHR0cFBhcmFtcyA9IGh0dHBQYXJhbXMuc2V0KGAke2tleX1bJHtpbm5lcktleX1dYCwgaXRlbVtpbm5lcktleV0pXHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdHJldHVyblxyXG5cdFx0XHRcdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRcdFx0XHRcdGh0dHBQYXJhbXMgPSBodHRwUGFyYW1zLnNldChgJHtrZXl9W11gLCBpdGVtKVxyXG5cdFx0XHRcdFx0XHRcdFx0fSlcclxuXHRcdFx0XHRcdFx0XHRcdGNvbnRpbnVlXHJcblx0XHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0XHRcdGZvciAoY29uc3QgaW5uZXJLZXkgaW4gb3B0UGFyYW0pIHtcclxuXHRcdFx0XHRcdFx0XHRcdGh0dHBQYXJhbXMgPSBodHRwUGFyYW1zLnNldChgJHtrZXl9WyR7aW5uZXJLZXl9XWAsIG9wdFBhcmFtW2lubmVyS2V5XSlcclxuXHRcdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRcdFx0Y29udGludWVcclxuXHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0XHRodHRwUGFyYW1zID0gaHR0cFBhcmFtcy5zZXQoa2V5LCBvcHRQYXJhbSlcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdGh0dHBQYXJhbXMgPSBodHRwUGFyYW1zLnNldCgnXycsIChuZXcgRGF0ZSgpKS5nZXRUaW1lKCkudG9TdHJpbmcoKSlcclxuXHRcdFx0XHRcdHJlcXVlc3RPcHRpb25zLnBhcmFtcyA9IGh0dHBQYXJhbXNcclxuXHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0aWYgKCFyZXF1ZXN0T3B0aW9ucyB8fCAodHlwZW9mIHJlcXVlc3RPcHRpb25zICE9PSAnb2JqZWN0JykpIHtcclxuXHRcdFx0XHRcdFx0cmVxdWVzdE9wdGlvbnMgPSB7fVxyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0Ym9keSA9ICghcmVxdWVzdE9wdGlvbnMuYm9keSB8fCAodHlwZW9mIHJlcXVlc3RPcHRpb25zLmJvZHkgIT09ICdvYmplY3QnKSkgPyB7fSA6IHJlcXVlc3RPcHRpb25zLmJvZHlcclxuXHRcdFx0XHRcdGJvZHkuXyA9IChuZXcgRGF0ZSgpKS5nZXRUaW1lKClcclxuXHRcdFx0XHRcdGRlbGV0ZSByZXF1ZXN0T3B0aW9ucy5ib2R5XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdGlmICghcmVxdWVzdE9wdGlvbnMucmVzcG9uc2VUeXBlKSB7fVxyXG5cdFx0XHRcdHRoaXMuY2xpZW50LnJlcXVlc3QobmV3IEh0dHBSZXF1ZXN0KG1ldGhvZCwgdXJsLCBib2R5LCByZXF1ZXN0T3B0aW9ucykpLnRvUHJvbWlzZSgpLnRoZW4oXHJcblx0XHRcdFx0XHQocmVzcG9uc2U6IEh0dHBSZXNwb25zZTxhbnk+KSA9PiBydW5PcHRpb25zLnJlc29sdmVXaXRoRnVsbFJlc3BvbnNlID8gcmVzb2x2ZShyZXNwb25zZSkgOiByZXNvbHZlKHJlc3BvbnNlLmJvZHkpLFxyXG5cdFx0XHRcdFx0KGVycm9yOiBhbnkpID0+IHJlamVjdChlcnJvcilcclxuXHRcdFx0XHQpXHJcblx0XHRcdH0gY2F0Y2goZXJyb3IpIHtcclxuXHRcdFx0XHRyZWplY3QoZXJyb3IpXHJcblx0XHRcdH1cclxuXHRcdH0pXHJcblx0fVxyXG59XHJcbiIsImltcG9ydCBjbyBmcm9tICdjbydcclxuaW1wb3J0IHtJbmplY3RhYmxlfSBmcm9tICdAYW5ndWxhci9jb3JlJ1xyXG5pbXBvcnQge0h0dHBIZWFkZXJzfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCdcclxuXHJcbmltcG9ydCB7R2xvYmFsRXZlbnRzU2VydmljZX0gZnJvbSAnLi9nbG9iYWxFdmVudHMvZ2xvYmFsRXZlbnRzLnNlcnZpY2UnXHJcbmltcG9ydCB7UmVxdWVzdFNlcnZpY2V9IGZyb20gJy4vcmVxdWVzdC5zZXJ2aWNlJ1xyXG5cclxuQEluamVjdGFibGUoKVxyXG5leHBvcnQgY2xhc3MgQmFzZVJFU1RTZXJ2aWNlIHtcclxuXHRoZWFkZXJzID0gbmV3IEh0dHBIZWFkZXJzKHsnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nfSlcclxuXHRiYXNlVXJsID0gJy8nXHJcblxyXG5cdGNvbnN0cnVjdG9yKFxyXG5cdFx0cHVibGljIGdsb2JhbEV2ZW50c1NlcnZpY2U6IEdsb2JhbEV2ZW50c1NlcnZpY2UsXHJcblx0XHRwdWJsaWMgcmVxdWVzdFNlcnZpY2U6IFJlcXVlc3RTZXJ2aWNlXHJcblx0KSB7fVxyXG5cclxuXHRoYW5kbGVFcnJvcihlcnIpOiB2b2lkIHtcclxuXHRcdHRoaXMuZ2xvYmFsRXZlbnRzU2VydmljZS5ub3RpZnkoJ2Vycm9yJywgZXJyICYmIGVyci5lcnJvciAmJiBlcnIuZXJyb3IuZXJyb3IgfHwgJ0FuIGVycm9yIGhhcyBvY2N1cnJlZC4nKVxyXG5cdH1cclxuXHJcblx0Y3JlYXRlKHBhcmFtcyk6IFByb21pc2U8YW55PiB7XHJcblx0XHRjb25zdCBpbnN0YW5jZSA9IHRoaXNcclxuXHRcdHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcblx0XHRcdGNvKGZ1bmN0aW9uKigpIHtcclxuXHRcdFx0XHR5aWVsZCBpbnN0YW5jZS5yZXF1ZXN0U2VydmljZS5ydW4oJ3Bvc3QnLCBgJHtpbnN0YW5jZS5iYXNlVXJsfWAsIHtcclxuXHRcdFx0XHRcdGhlYWRlcnM6IGluc3RhbmNlLmhlYWRlcnMsXHJcblx0XHRcdFx0XHRib2R5OiBwYXJhbXNcclxuXHRcdFx0XHR9KVxyXG5cdFx0XHRcdHJldHVybiB7c3VjY2VzczogdHJ1ZX1cclxuXHRcdFx0fSkudGhlbigocmVzKSA9PiByZXNvbHZlKHJlcyksIChlcnIpID0+IHtcclxuXHRcdFx0XHRpbnN0YW5jZS5oYW5kbGVFcnJvcihlcnIpXHJcblx0XHRcdFx0cmVqZWN0KHtlcnJvcjogdHJ1ZX0pXHJcblx0XHRcdH0pXHJcblx0XHR9KVxyXG5cdH1cclxuXHJcblx0cmVhZChwYXJhbXMpOiBQcm9taXNlPGFueT4ge1xyXG5cdFx0Y29uc3QgaW5zdGFuY2UgPSB0aGlzXHJcblx0XHRyZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG5cdFx0XHRjbyhmdW5jdGlvbiooKSB7XHJcblx0XHRcdFx0cmV0dXJuIHlpZWxkIGluc3RhbmNlLnJlcXVlc3RTZXJ2aWNlLnJ1bignZ2V0JywgYCR7aW5zdGFuY2UuYmFzZVVybH0vaXRlbWAsIHtcclxuXHRcdFx0XHRcdGhlYWRlcnM6IGluc3RhbmNlLmhlYWRlcnMsXHJcblx0XHRcdFx0XHRwYXJhbXNcclxuXHRcdFx0XHR9KVxyXG5cdFx0XHR9KS50aGVuKChyZXMpID0+IHJlc29sdmUocmVzKSwgKGVycikgPT4ge1xyXG5cdFx0XHRcdGluc3RhbmNlLmhhbmRsZUVycm9yKGVycilcclxuXHRcdFx0XHRyZWplY3Qoe2Vycm9yOiB0cnVlfSlcclxuXHRcdFx0fSlcclxuXHRcdH0pXHJcblx0fVxyXG5cclxuXHRyZWFkTGlzdChwYXJhbXMpOiBQcm9taXNlPGFueT4ge1xyXG5cdFx0Y29uc3QgaW5zdGFuY2UgPSB0aGlzXHJcblx0XHRyZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG5cdFx0XHRjbyhmdW5jdGlvbiooKSB7XHJcblx0XHRcdFx0cmV0dXJuIHlpZWxkIGluc3RhbmNlLnJlcXVlc3RTZXJ2aWNlLnJ1bignZ2V0JywgYCR7aW5zdGFuY2UuYmFzZVVybH1gLCB7XHJcblx0XHRcdFx0XHRoZWFkZXJzOiBpbnN0YW5jZS5oZWFkZXJzLFxyXG5cdFx0XHRcdFx0cGFyYW1zXHJcblx0XHRcdFx0fSlcclxuXHRcdFx0fSkudGhlbigocmVzKSA9PiByZXNvbHZlKHJlcyksIChlcnIpID0+IHtcclxuXHRcdFx0XHRpbnN0YW5jZS5oYW5kbGVFcnJvcihlcnIpXHJcblx0XHRcdFx0cmVqZWN0KHtlcnJvcjogdHJ1ZX0pXHJcblx0XHRcdH0pXHJcblx0XHR9KVxyXG5cdH1cclxuXHJcblx0cmVhZFNlbGVjdExpc3QocGFyYW1zKTogUHJvbWlzZTxhbnk+IHtcclxuXHRcdGNvbnN0IGluc3RhbmNlID0gdGhpc1xyXG5cdFx0cmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuXHRcdFx0Y28oZnVuY3Rpb24qKCkge1xyXG5cdFx0XHRcdHJldHVybiB5aWVsZCBpbnN0YW5jZS5yZXF1ZXN0U2VydmljZS5ydW4oJ2dldCcsIGAke2luc3RhbmNlLmJhc2VVcmx9L3NlbGVjdExpc3RgLCB7XHJcblx0XHRcdFx0XHRoZWFkZXJzOiBpbnN0YW5jZS5oZWFkZXJzLFxyXG5cdFx0XHRcdFx0cGFyYW1zXHJcblx0XHRcdFx0fSlcclxuXHRcdFx0fSkudGhlbigocmVzKSA9PiByZXNvbHZlKHJlcyksIChlcnIpID0+IHtcclxuXHRcdFx0XHRpbnN0YW5jZS5oYW5kbGVFcnJvcihlcnIpXHJcblx0XHRcdFx0cmVqZWN0KHtlcnJvcjogdHJ1ZX0pXHJcblx0XHRcdH0pXHJcblx0XHR9KVxyXG5cdH1cclxuXHJcblx0dXBkYXRlKHBhcmFtcyk6IFByb21pc2U8YW55PiB7XHJcblx0XHRjb25zdCBpbnN0YW5jZSA9IHRoaXNcclxuXHRcdHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcblx0XHRcdGNvKGZ1bmN0aW9uKigpIHtcclxuXHRcdFx0XHRyZXR1cm4geWllbGQgaW5zdGFuY2UucmVxdWVzdFNlcnZpY2UucnVuKCdwYXRjaCcsIGAke2luc3RhbmNlLmJhc2VVcmx9L2l0ZW0vJHtwYXJhbXMuaWR9YCwge1xyXG5cdFx0XHRcdFx0aGVhZGVyczogaW5zdGFuY2UuaGVhZGVycyxcclxuXHRcdFx0XHRcdGJvZHk6IHBhcmFtc1xyXG5cdFx0XHRcdH0pXHJcblx0XHRcdH0pLnRoZW4oKHJlcykgPT4gcmVzb2x2ZShyZXMpLCAoZXJyKSA9PiB7XHJcblx0XHRcdFx0aW5zdGFuY2UuaGFuZGxlRXJyb3IoZXJyKVxyXG5cdFx0XHRcdHJlamVjdCh7ZXJyb3I6IHRydWV9KVxyXG5cdFx0XHR9KVxyXG5cdFx0fSlcclxuXHR9XHJcblxyXG5cdGJ1bGtVcHNlcnQocGFyYW1zKTogUHJvbWlzZTxhbnk+IHtcclxuXHRcdGNvbnN0IGluc3RhbmNlID0gdGhpc1xyXG5cdFx0cmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuXHRcdFx0Y28oZnVuY3Rpb24qKCkge1xyXG5cdFx0XHRcdHJldHVybiB5aWVsZCBpbnN0YW5jZS5yZXF1ZXN0U2VydmljZS5ydW4oJ3B1dCcsIGAke2luc3RhbmNlLmJhc2VVcmx9YCwge1xyXG5cdFx0XHRcdFx0aGVhZGVyczogaW5zdGFuY2UuaGVhZGVycyxcclxuXHRcdFx0XHRcdGJvZHk6IHBhcmFtc1xyXG5cdFx0XHRcdH0pXHJcblx0XHRcdH0pLnRoZW4oKHJlcykgPT4gcmVzb2x2ZShyZXMpLCAoZXJyKSA9PiB7XHJcblx0XHRcdFx0aW5zdGFuY2UuaGFuZGxlRXJyb3IoZXJyKVxyXG5cdFx0XHRcdHJlamVjdCh7ZXJyb3I6IHRydWV9KVxyXG5cdFx0XHR9KVxyXG5cdFx0fSlcclxuXHR9XHJcblxyXG5cdGRlbGV0ZShwYXJhbXMpOiBQcm9taXNlPGFueT4ge1xyXG5cdFx0Y29uc3QgaW5zdGFuY2UgPSB0aGlzXHJcblx0XHRyZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG5cdFx0XHRjbyhmdW5jdGlvbiooKSB7XHJcblx0XHRcdFx0cmV0dXJuIHlpZWxkIGluc3RhbmNlLnJlcXVlc3RTZXJ2aWNlLnJ1bignZGVsZXRlJywgYCR7aW5zdGFuY2UuYmFzZVVybH0vJHtwYXJhbXMuaWR9YCwge1xyXG5cdFx0XHRcdFx0aGVhZGVyczogaW5zdGFuY2UuaGVhZGVycyxcclxuXHRcdFx0XHRcdGJvZHk6IHBhcmFtc1xyXG5cdFx0XHRcdH0pXHJcblx0XHRcdH0pLnRoZW4oKHJlcykgPT4gcmVzb2x2ZShyZXMpLCAoZXJyKSA9PiB7XHJcblx0XHRcdFx0aW5zdGFuY2UuaGFuZGxlRXJyb3IoZXJyKVxyXG5cdFx0XHRcdHJlamVjdCh7ZXJyb3I6IHRydWV9KVxyXG5cdFx0XHR9KVxyXG5cdFx0fSlcclxuXHR9XHJcbn1cclxuIiwiaW1wb3J0IGNvIGZyb20gJ2NvJ1xyXG5pbXBvcnQge0luamVjdGFibGV9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnXHJcbmltcG9ydCB7SHR0cEhlYWRlcnN9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJ1xyXG5cclxuaW1wb3J0IHtHbG9iYWxFdmVudHNTZXJ2aWNlfSBmcm9tICcuL2dsb2JhbEV2ZW50cy9nbG9iYWxFdmVudHMuc2VydmljZSdcclxuaW1wb3J0IHtSZXF1ZXN0U2VydmljZX0gZnJvbSAnLi9yZXF1ZXN0LnNlcnZpY2UnXHJcblxyXG5ASW5qZWN0YWJsZSgpXHJcbmV4cG9ydCBjbGFzcyBGaWxlc1JFU1RTZXJ2aWNlIHtcclxuXHQvLyB7J0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJ31cclxuXHRoZWFkZXJzID0gbmV3IEh0dHBIZWFkZXJzKClcclxuXHRiYXNlVXJsID0gJy9maWxlcydcclxuXHJcblx0Y29uc3RydWN0b3IoXHJcblx0XHRwdWJsaWMgZ2xvYmFsRXZlbnRzU2VydmljZTogR2xvYmFsRXZlbnRzU2VydmljZSxcclxuXHRcdHB1YmxpYyByZXF1ZXN0U2VydmljZTogUmVxdWVzdFNlcnZpY2VcclxuXHQpIHt9XHJcblxyXG5cdGhhbmRsZUVycm9yKGVycik6IHZvaWQge1xyXG5cdFx0dGhpcy5nbG9iYWxFdmVudHNTZXJ2aWNlLm5vdGlmeSgnZXJyb3InLCBlcnIgJiYgZXJyLmVycm9yICYmIGVyci5lcnJvci5lcnJvciB8fCAnQW4gZXJyb3IgaGFzIG9jY3VycmVkLicpXHJcblx0fVxyXG5cclxuXHR1cGxvYWQoZmlsZTogRmlsZSwgcGFyYW1zOiB7b3V0cHV0RmlsZU5hbWU6IHN0cmluZywgW3g6IHN0cmluZ106IGFueX0sIG9wdGlvbnM/OiB7aGFuZGxlRXJyb3I/OiBib29sZWFufSk6IFByb21pc2U8YW55PiB7XHJcblx0XHRjb25zdCBpbnN0YW5jZSA9IHRoaXNcclxuXHRcdHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcblx0XHRcdGNvKGZ1bmN0aW9uKigpIHtcclxuXHRcdFx0XHRsZXQgZmQgPSBuZXcgRm9ybURhdGEoKVxyXG5cdFx0XHRcdGZkLmFwcGVuZCgnZmlsZScsIGZpbGUsIGZpbGUubmFtZSlcclxuXHRcdFx0XHRmb3IgKGNvbnN0IGtleSBpbiBwYXJhbXMpIHtcclxuXHRcdFx0XHRcdGZkLmFwcGVuZChrZXksIHBhcmFtc1trZXldKVxyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHRpbnN0YW5jZS5oZWFkZXJzLnNldCgnQ29udGVudC1UeXBlJywgJ211bHRpcGFydC9mb3JtLWRhdGEnKVxyXG5cdFx0XHRcdHlpZWxkIGluc3RhbmNlLnJlcXVlc3RTZXJ2aWNlLnJ1bigncG9zdCcsIGAke2luc3RhbmNlLmJhc2VVcmx9YCwge1xyXG5cdFx0XHRcdFx0aGVhZGVyczogaW5zdGFuY2UuaGVhZGVycyxcclxuXHRcdFx0XHRcdGJvZHk6IGZkXHJcblx0XHRcdFx0fSlcclxuXHRcdFx0XHRyZXR1cm4ge3N1Y2Nlc3M6IHRydWV9XHJcblx0XHRcdH0pLnRoZW4oKHJlcykgPT4gcmVzb2x2ZShyZXMpLCAoZXJyKSA9PiB7XHJcblx0XHRcdFx0aWYgKG9wdGlvbnMgJiYgb3B0aW9ucy5oYW5kbGVFcnJvcikge1xyXG5cdFx0XHRcdFx0aW5zdGFuY2UuaGFuZGxlRXJyb3IoZXJyKVxyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHRyZWplY3Qoe2Vycm9yOiBlcnIgfHwgdHJ1ZX0pXHJcblx0XHRcdH0pXHJcblx0XHR9KVxyXG5cdH1cclxuXHJcblx0cmVhZChwYXJhbXMpOiBQcm9taXNlPGFueT4ge1xyXG5cdFx0Y29uc3QgaW5zdGFuY2UgPSB0aGlzXHJcblx0XHRyZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG5cdFx0XHRjbyhmdW5jdGlvbiooKSB7XHJcblx0XHRcdFx0cmV0dXJuIHlpZWxkIGluc3RhbmNlLnJlcXVlc3RTZXJ2aWNlLnJ1bignZ2V0JywgYCR7aW5zdGFuY2UuYmFzZVVybH0vaXRlbWAsIHtcclxuXHRcdFx0XHRcdGhlYWRlcnM6IGluc3RhbmNlLmhlYWRlcnMsXHJcblx0XHRcdFx0XHRwYXJhbXNcclxuXHRcdFx0XHR9KVxyXG5cdFx0XHR9KS50aGVuKChyZXMpID0+IHJlc29sdmUocmVzKSwgKGVycikgPT4ge1xyXG5cdFx0XHRcdGluc3RhbmNlLmhhbmRsZUVycm9yKGVycilcclxuXHRcdFx0XHRyZWplY3Qoe2Vycm9yOiB0cnVlfSlcclxuXHRcdFx0fSlcclxuXHRcdH0pXHJcblx0fVxyXG59XHJcbiIsImV4cG9ydCBjb25zdCBnZXROZXN0ZWQgPSAocGFyZW50OiBhbnksIGZpZWxkOiBzdHJpbmcpOiB2b2lkID0+IHtcclxuXHRpZiAoKHR5cGVvZiBwYXJlbnQgIT09ICdvYmplY3QnKSB8fCAodHlwZW9mIGZpZWxkICE9PSAnc3RyaW5nJykpIHtcclxuXHRcdFx0cmV0dXJuIG51bGxcclxuXHRcdH1cclxuXHRsZXQgZmllbGREYXRhID0gZmllbGQuc3BsaXQoJy4nKSxcclxuXHRcdGN1cnJlbnRFbGVtZW50ID0gcGFyZW50XHJcblx0Zm9yIChsZXQgaSBpbiBmaWVsZERhdGEpIHtcclxuXHRcdGxldCBpbm5lckVsZW1lbnQgPSBmaWVsZERhdGFbaV1cclxuXHRcdGlmIChjdXJyZW50RWxlbWVudCA9PT0gbnVsbCkge1xyXG5cdFx0XHRyZXR1cm4gY3VycmVudEVsZW1lbnRcclxuXHRcdH1cclxuXHRcdGlmICgodHlwZW9mIGN1cnJlbnRFbGVtZW50ID09PSAndW5kZWZpbmVkJykgfHwgKHR5cGVvZiBjdXJyZW50RWxlbWVudFtpbm5lckVsZW1lbnRdID09PSAndW5kZWZpbmVkJykpIHtcclxuXHRcdFx0cmV0dXJuIGN1cnJlbnRFbGVtZW50XHJcblx0XHR9XHJcblx0XHRjdXJyZW50RWxlbWVudCA9IGN1cnJlbnRFbGVtZW50W2lubmVyRWxlbWVudF1cclxuXHR9XHJcblx0cmV0dXJuIGN1cnJlbnRFbGVtZW50XHJcbn1cclxuXHJcbmV4cG9ydCBjb25zdCBzZXROZXN0ZWQgPSAocGFyZW50OiBhbnksIGZpZWxkOiBzdHJpbmcsIHZhbHVlOiBhbnkpOiBib29sZWFuID0+IHtcclxuXHRjb25zdCBmaWVsZE5hbWVzID0gZmllbGQuc3BsaXQoJy4nKVxyXG5cdGlmICghZmllbGROYW1lcy5sZW5ndGgpIHtcclxuXHRcdHJldHVybiBmYWxzZVxyXG5cdH1cclxuXHRsZXQgY3VycmVudFBhcmVudCA9IHBhcmVudCxcclxuXHRcdGxvb3BFbmQgPSBmaWVsZE5hbWVzLmxlbmd0aCAtIDFcclxuXHRmb3IgKGxldCBpID0gMDsgaSA8IGxvb3BFbmQ7IGkrKykge1xyXG5cdFx0Y29uc3QgZmllbGROYW1lID0gZmllbGROYW1lc1tpXVxyXG5cdFx0aWYgKHR5cGVvZiBjdXJyZW50UGFyZW50W2ZpZWxkTmFtZV0gPT09ICd1bmRlZmluZWQnKSB7XHJcblx0XHRcdHJldHVybiBmYWxzZVxyXG5cdFx0fVxyXG5cdFx0Y3VycmVudFBhcmVudCA9IGN1cnJlbnRQYXJlbnRbZmllbGROYW1lXVxyXG5cdH1cclxuXHRjdXJyZW50UGFyZW50W2ZpZWxkTmFtZXNbbG9vcEVuZF1dID0gdmFsdWVcclxuXHRyZXR1cm4gdHJ1ZVxyXG59XHJcbiIsIid1c2Ugc3RyaWN0J1xyXG5cclxuLy8gYW5ndWxhciBkZXBlbmRlbmNpZXNcclxuaW1wb3J0IHtDb21tb25Nb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbidcclxuaW1wb3J0IHtOZ01vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvY29yZSdcclxuXHJcblxyXG5ATmdNb2R1bGUoe1xyXG5cdGltcG9ydHM6IFtcclxuXHRcdENvbW1vbk1vZHVsZVxyXG5cdF1cclxufSlcclxuZXhwb3J0IGNsYXNzIFJhbXN0ZXJVSUNvcmVNb2R1bGUge31cclxuXHJcbmV4cG9ydCAqIGZyb20gJy4vY29tcG9uZW50cy9iYXNlLWxheW91dC5jb21wb25lbnQnXHJcbmV4cG9ydCAqIGZyb20gJy4vY29tcG9uZW50cy9iYXNlLXBhZ2UuY29tcG9uZW50J1xyXG5leHBvcnQgKiBmcm9tICcuL3NlcnZpY2VzL2Jhc2VSRVNULnNlcnZpY2UnXHJcbmV4cG9ydCAqIGZyb20gJy4vc2VydmljZXMvZmlsZXNSRVNULnNlcnZpY2UnXHJcbmV4cG9ydCAqIGZyb20gJy4vdXRpbHMvdG9vbGJlbHQnXHJcbmV4cG9ydCAqIGZyb20gJy4vc2VydmljZXMvZ2xvYmFsRXZlbnRzL2dsb2JhbEV2ZW50cy5zZXJ2aWNlJ1xyXG5leHBvcnQgKiBmcm9tICcuL3NlcnZpY2VzL2dsb2JhbEV2ZW50cy9nbG9iYWxFdmVudHMuaW50ZXJmYWNlcydcclxuZXhwb3J0ICogZnJvbSAnLi9zZXJ2aWNlcy9yZXF1ZXN0LnNlcnZpY2UnXHJcbmV4cG9ydCAqIGZyb20gJy4vaW50ZXJmYWNlcy9zZWxlY3RMaXN0LmludGVyZmFjZSdcclxuIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQU9BLE1BQWEsbUJBQW1COzs7OztJQU0vQixZQUNRLG1CQUF3QyxFQUN4QyxNQUFjO1FBRGQsd0JBQW1CLEdBQW5CLG1CQUFtQixDQUFxQjtRQUN4QyxXQUFNLEdBQU4sTUFBTSxDQUFRO1FBUHRCLHNCQUFpQixHQUFZLEtBQUssQ0FBQTtRQUNsQyxpQkFBWSxHQUFZLEtBQUssQ0FBQTtRQUM3QixnQkFBVyxHQUEwQixFQUFFLENBQUE7UUFDdkMsZ0JBQVcsR0FBMEIsRUFBRSxDQUFBO0tBTXRDOzs7O0lBRUQsUUFBUTtRQUNQLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxXQUFXLENBQUMsU0FBUyxDQUFDLENBQUMsSUFBeUIsS0FBSyxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUE7UUFDcEcsSUFBSSxDQUFDLG1CQUFtQixDQUFDLHVCQUF1QixDQUFDLFNBQVMsQ0FBQyxNQUFNLElBQUksQ0FBQyxlQUFlLEVBQUUsQ0FBQyxDQUFBO1FBQ3hGLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxjQUFjLENBQUMsU0FBUyxDQUFDLENBQUMsSUFBSSxLQUFLLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQTtRQUNyRixJQUFJLENBQUMsbUJBQW1CLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxDQUFDLEVBQUMsS0FBSyxFQUFFLE9BQU8sRUFBQyxLQUFLLElBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxFQUFFLE9BQU8sQ0FBQyxDQUFDLENBQUE7UUFDakcsSUFBSSxDQUFDLG1CQUFtQixDQUFDLGFBQWEsQ0FBQyxTQUFTLENB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