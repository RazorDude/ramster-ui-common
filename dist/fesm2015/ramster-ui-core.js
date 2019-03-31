import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Injectable, NgModule } from '@angular/core';
import { __rest } from 'tslib';
import { HttpClient, HttpRequest, HttpHeaders } from '@angular/common/http';
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
     * @param {?} object
     * @param {?=} parentKey
     * @return {?}
     */
    flattenObjectForQuery(object, parentKey) {
        /** @type {?} */
        let returnObject = [];
        if (object instanceof Array) {
            if (!parentKey) {
                throw { error: 'The top-most item cannot be an array.' };
            }
            object.forEach((item) => {
                if (item === null) {
                    return;
                }
                if ((item instanceof Date) || !(item instanceof Array) || (typeof item !== 'object')) {
                    returnObject.push({ key: `${parentKey}[]`, value: item });
                    return;
                }
                returnObject = returnObject.concat(this.flattenObjectForQuery(item, `${parentKey}[]`));
                return;
            });
            return returnObject;
        }
        for (const key in object) {
            /** @type {?} */
            const value = object[key];
            if (value === null) {
                continue;
            }
            if ((value instanceof Date) || (typeof value !== 'object')) {
                returnObject.push({ key: parentKey ? `${parentKey}[${key}]` : key, value });
                continue;
            }
            returnObject = returnObject.concat(this.flattenObjectForQuery(value, parentKey ? `${parentKey}[${key}]` : key));
        }
        return returnObject;
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
                let actualUrl = url;
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
                    const optionsParams = this.flattenObjectForQuery(requestOptions.params || {});
                    actualUrl += `?_=${(new Date()).getTime().toString()}`;
                    if (optionsParams.length) {
                        optionsParams.forEach((item, index) => {
                            actualUrl += `&${item.key}=${item.value}`;
                        });
                    }
                }
                else {
                    if (!requestOptions || (typeof requestOptions !== 'object')) {
                        requestOptions = {};
                    }
                    body = (!requestOptions.body || (typeof requestOptions.body !== 'object')) ? {} : requestOptions.body;
                    body._ = (new Date()).getTime();
                    delete requestOptions.body;
                }
                // if (!requestOptions.responseType) {}
                this.client.request(new HttpRequest(method, actualUrl, body, requestOptions)).toPromise().then((response) => runOptions.resolveWithFullResponse ? resolve(response) : resolve(response.body), (error) => reject(error));
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
     * @param {?} data
     * @return {?}
     */
    emptyToNull(data) {
        if (data === '') {
            return null;
        }
        if (data instanceof Date) {
            return data;
        }
        if (data instanceof Array) {
            return data.map((item, index) => this.emptyToNull(item));
        }
        if ((typeof data === 'object') && (data !== null)) {
            /** @type {?} */
            const parsedData = {};
            for (const key in data) {
                parsedData[key] = this.emptyToNull(data[key]);
            }
            return parsedData;
        }
        return data;
    }
    /**
     * @param {?} data
     * @return {?}
     */
    stringifyGetParams(data) {
        /** @type {?} */
        let stringifiedObject = {};
        for (const key in data) {
            /** @type {?} */
            const value = data[key];
            if ((value instanceof Array) || ((typeof value === 'object') && (value !== null) && !(value instanceof Date))) {
                stringifiedObject[`_json_${key}`] = JSON.stringify(value);
            }
        }
        return stringifiedObject;
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
                return yield instance.requestService.run('post', `${instance.baseUrl}`, {
                    headers: instance.headers,
                    body: instance.emptyToNull(params)
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
    read(params) {
        /** @type {?} */
        const instance = this;
        return new Promise((resolve, reject) => {
            co(function* () {
                return yield instance.requestService.run('get', `${instance.baseUrl}/item`, {
                    headers: instance.headers,
                    params: instance.stringifyGetParams(instance.emptyToNull(params))
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
                    params: instance.stringifyGetParams(instance.emptyToNull(params))
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
                    params: instance.stringifyGetParams(instance.emptyToNull(params))
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
                    body: instance.stringifyGetParams(instance.emptyToNull(params))
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
                    body: instance.emptyToNull(params)
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
                    body: instance.emptyToNull(params)
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmFtc3Rlci11aS1jb3JlLmpzLm1hcCIsInNvdXJjZXMiOlsibmc6Ly9yYW1zdGVyLXVpLWNvcmUvY29tcG9uZW50cy9iYXNlLWxheW91dC5jb21wb25lbnQudHMiLCJuZzovL3JhbXN0ZXItdWktY29yZS9jb21wb25lbnRzL2Jhc2UtcGFnZS5jb21wb25lbnQudHMiLCJuZzovL3JhbXN0ZXItdWktY29yZS9zZXJ2aWNlcy9nbG9iYWxFdmVudHMvZ2xvYmFsRXZlbnRzLnNlcnZpY2UudHMiLCJuZzovL3JhbXN0ZXItdWktY29yZS9zZXJ2aWNlcy9yZXF1ZXN0LnNlcnZpY2UudHMiLCJuZzovL3JhbXN0ZXItdWktY29yZS9zZXJ2aWNlcy9iYXNlUkVTVC5zZXJ2aWNlLnRzIiwibmc6Ly9yYW1zdGVyLXVpLWNvcmUvc2VydmljZXMvZmlsZXNSRVNULnNlcnZpY2UudHMiLCJuZzovL3JhbXN0ZXItdWktY29yZS91dGlscy90b29sYmVsdC50cyIsIm5nOi8vcmFtc3Rlci11aS1jb3JlL2luZGV4LnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7T25Jbml0fSBmcm9tICdAYW5ndWxhci9jb3JlJ1xyXG5pbXBvcnQge1JvdXRlcn0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJ1xyXG5cclxuaW1wb3J0IHtHbG9iYWxFdmVudHNTZXJ2aWNlfSBmcm9tICcuLi9zZXJ2aWNlcy9nbG9iYWxFdmVudHMvZ2xvYmFsRXZlbnRzLnNlcnZpY2UnXHJcbmltcG9ydCB7R0VTUmVkaXJlY3RPcHRpb25zSW50ZXJmYWNlfSBmcm9tICcuLi9zZXJ2aWNlcy9nbG9iYWxFdmVudHMvZ2xvYmFsRXZlbnRzLmludGVyZmFjZXMnXHJcblxyXG5cclxuZXhwb3J0IGNsYXNzIEJhc2VMYXlvdXRDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xyXG5cdGluaXRpYWxEYXRhTG9hZGVkOiBib29sZWFuID0gZmFsc2VcclxuXHRsb2FkZXJBY3RpdmU6IGJvb2xlYW4gPSBmYWxzZVxyXG5cdHF1ZXJ5UGFyYW1zOiB7W3g6IHN0cmluZ106IHN0cmluZ30gPSB7fVxyXG5cdHJvdXRlUGFyYW1zOiB7W3g6IHN0cmluZ106IHN0cmluZ30gPSB7fVxyXG5cclxuXHRjb25zdHJ1Y3RvcihcclxuXHRcdHB1YmxpYyBnbG9iYWxFdmVudHNTZXJ2aWNlOiBHbG9iYWxFdmVudHNTZXJ2aWNlLFxyXG5cdFx0cHVibGljIHJvdXRlcjogUm91dGVyXHJcblx0KSB7XHJcblx0fVxyXG5cclxuXHRuZ09uSW5pdCgpOiB2b2lkIHtcclxuXHRcdHRoaXMuZ2xvYmFsRXZlbnRzU2VydmljZS5wYWdlTG9hZGVkJC5zdWJzY3JpYmUoKGRhdGE/OiB7W3g6IHN0cmluZ106IGFueX0pID0+IHRoaXMucGFnZUxvYWRlZChkYXRhKSlcclxuXHRcdHRoaXMuZ2xvYmFsRXZlbnRzU2VydmljZS50cmlnZ2VySW5pdGlhbERhdGFMb2FkJC5zdWJzY3JpYmUoKCkgPT4gdGhpcy5sb2FkSW5pdGlhbERhdGEoKSlcclxuXHRcdHRoaXMuZ2xvYmFsRXZlbnRzU2VydmljZS5zZXRMYXlvdXREYXRhJC5zdWJzY3JpYmUoKGRhdGEpID0+IHRoaXMuc2V0TGF5b3V0RGF0YShkYXRhKSlcclxuXHRcdHRoaXMuZ2xvYmFsRXZlbnRzU2VydmljZS5yZWRpcmVjdCQuc3Vic2NyaWJlKCh7cm91dGUsIG9wdGlvbnN9KSA9PiB0aGlzLnJlZGlyZWN0KHJvdXRlLCBvcHRpb25zKSlcclxuXHRcdHRoaXMuZ2xvYmFsRXZlbnRzU2VydmljZS50b2dnbGVMb2FkZXIkLnN1YnNjcmliZSgoYWN0aXZlKSA9PiB0aGlzLnRvZ2dsZUxvYWRlcihhY3RpdmUpKVxyXG5cdH1cclxuXHJcblx0c2VuZEluaXRpYWxEYXRhTG9hZGVkRXZlbnQoKSB7XHJcblx0XHR0aGlzLmdsb2JhbEV2ZW50c1NlcnZpY2UuaW5pdGlhbERhdGFMb2FkZWQoe3F1ZXJ5UGFyYW1zOiB0aGlzLnF1ZXJ5UGFyYW1zLCByb3V0ZVBhcmFtczogdGhpcy5yb3V0ZVBhcmFtc30pXHJcblx0fVxyXG5cclxuXHJcblx0Ly8gZ2xvYmFsRXZlbnRzU2VydmljZSBoYW5kbGVyc1xyXG5cclxuXHRwYWdlTG9hZGVkKGRhdGE/OiB7W3g6IHN0cmluZ106IGFueX0pOiB2b2lkIHtcclxuXHRcdGlmIChkYXRhKSB7XHJcblx0XHRcdGZvciAoY29uc3Qga2V5IGluIGRhdGEpIHtcclxuXHRcdFx0XHR0aGlzW2tleV0gPSBkYXRhW2tleV1cclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdFx0aWYgKHRoaXMuaW5pdGlhbERhdGFMb2FkZWQpIHtcclxuXHRcdFx0dGhpcy5zZW5kSW5pdGlhbERhdGFMb2FkZWRFdmVudCgpXHJcblx0XHRcdHJldHVyblxyXG5cdFx0fVxyXG5cdFx0dGhpcy5sb2FkSW5pdGlhbERhdGEoKVxyXG5cdH1cclxuXHJcblx0bG9hZEluaXRpYWxEYXRhKCk6IHZvaWQge1xyXG5cdFx0dGhpcy5zZW5kSW5pdGlhbERhdGFMb2FkZWRFdmVudCgpXHJcblx0fVxyXG5cclxuXHRzZXRMYXlvdXREYXRhKGFyZ3M6IHtbeDogc3RyaW5nXTogYW55fSkge1xyXG5cdFx0Zm9yIChjb25zdCBrZXkgaW4gYXJncykge1xyXG5cdFx0XHR0aGlzW2tleV0gPSBhcmdzW2tleV1cclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdHJlZGlyZWN0KHJvdXRlOiBzdHJpbmcsIG9wdGlvbnM6IEdFU1JlZGlyZWN0T3B0aW9uc0ludGVyZmFjZSk6IHZvaWQge1xyXG5cdFx0Y29uc3QgYWN0dWFsT3B0aW9ucyA9IG9wdGlvbnMgfHwge30sXHJcblx0XHRcdHtxdWVyeVBhcmFtcywgcmVsb2FkSW5pdGlhbERhdGF9ID0gYWN0dWFsT3B0aW9uc1xyXG5cdFx0aWYgKHJlbG9hZEluaXRpYWxEYXRhKSB7XHJcblx0XHRcdHRoaXMuaW5pdGlhbERhdGFMb2FkZWQgPSBmYWxzZVxyXG5cdFx0fVxyXG5cdFx0dGhpcy5yb3V0ZXIubmF2aWdhdGUoW3JvdXRlXSwge3F1ZXJ5UGFyYW1zOiBxdWVyeVBhcmFtcyB8fCB7fX0pXHJcblx0fVxyXG5cclxuXHR0b2dnbGVMb2FkZXIoYWN0aXZlOiBib29sZWFuKTogdm9pZCB7XHJcblx0XHR0aGlzLmxvYWRlckFjdGl2ZSA9IGFjdGl2ZVxyXG5cdH1cclxufVxyXG4iLCIndXNlIHN0cmljdCdcclxuXHJcbmltcG9ydCB7QWN0aXZhdGVkUm91dGV9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcidcclxuaW1wb3J0IHtPbkRlc3Ryb3ksIE9uSW5pdH0gZnJvbSAnQGFuZ3VsYXIvY29yZSdcclxuaW1wb3J0IHtTdWJqZWN0fSBmcm9tICdyeGpzJ1xyXG5pbXBvcnQge3Rha2VVbnRpbH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnXHJcblxyXG5pbXBvcnQge0dsb2JhbEV2ZW50c1NlcnZpY2V9IGZyb20gJy4uL3NlcnZpY2VzL2dsb2JhbEV2ZW50cy9nbG9iYWxFdmVudHMuc2VydmljZSdcclxuXHJcbmV4cG9ydCBjbGFzcyBCYXNlUGFnZUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95IHtcclxuXHRkZXN0cm95ZWQ6IFN1YmplY3Q8dm9pZD4gPSBuZXcgU3ViamVjdCgpXHJcblx0bG9nZ2VkSW5Vc2VyPzogYW55XHJcblx0cXVlcnlQYXJhbXM6IHtbeDogc3RyaW5nXTogc3RyaW5nfVxyXG5cdHJvdXRlUGFyYW1zOiB7W3g6IHN0cmluZ106IHN0cmluZ31cclxuXHJcblx0Y29uc3RydWN0b3IoXHJcblx0XHRwdWJsaWMgYWN0aXZhdGVkUm91dGU6IEFjdGl2YXRlZFJvdXRlLFxyXG5cdFx0cHVibGljIGdsb2JhbEV2ZW50c1NlcnZpY2U6IEdsb2JhbEV2ZW50c1NlcnZpY2UsXHJcblx0XHRwdWJsaWMgb25Jbml0TWV0aG9kTmFtZXM6IHN0cmluZ1tdLFxyXG5cdFx0cHVibGljIG9uSW5pdGlhbERhdGFMb2FkZWRNZXRob2ROYW1lczogc3RyaW5nW11cclxuXHQpIHtcclxuXHR9XHJcblxyXG5cdG5nT25Jbml0KCkge1xyXG5cdFx0dGhpcy5nbG9iYWxFdmVudHNTZXJ2aWNlLmluaXRpYWxEYXRhTG9hZGVkJC5waXBlKHRha2VVbnRpbCh0aGlzLmRlc3Ryb3llZCkpLnN1YnNjcmliZSgoZGF0YSkgPT4gdGhpcy5pbml0aWFsRGF0YUxvYWRlZChkYXRhKSlcclxuXHRcdHRoaXMub25Jbml0TWV0aG9kTmFtZXMuZm9yRWFjaCgobWV0aG9kTmFtZSkgPT4ge1xyXG5cdFx0XHRpZiAodHlwZW9mIHRoaXNbbWV0aG9kTmFtZV0gPT09ICdmdW5jdGlvbicpIHtcclxuXHRcdFx0XHR0aGlzW21ldGhvZE5hbWVdKClcclxuXHRcdFx0fVxyXG5cdFx0fSlcclxuXHR9XHJcblxyXG5cdHJlc2V0KCk6IHZvaWQge1xyXG5cdFx0dGhpcy5xdWVyeVBhcmFtcyA9IHRoaXMuYWN0aXZhdGVkUm91dGUuc25hcHNob3QucXVlcnlQYXJhbXNcclxuXHRcdHRoaXMucm91dGVQYXJhbXMgPSB0aGlzLmFjdGl2YXRlZFJvdXRlLnNuYXBzaG90LnBhcmFtc1xyXG5cdH1cclxuXHJcblx0c2VuZFBhZ2VMb2FkZWRFdmVudCgpIHtcclxuXHRcdHRoaXMuZ2xvYmFsRXZlbnRzU2VydmljZS5wYWdlTG9hZGVkKHtxdWVyeVBhcmFtczogdGhpcy5xdWVyeVBhcmFtcywgcm91dGVQYXJhbXM6IHRoaXMucm91dGVQYXJhbXN9KVxyXG5cdH1cclxuXHJcblx0aW5pdGlhbERhdGFMb2FkZWQoZGF0YSk6IHZvaWQge1xyXG5cdFx0dGhpcy5sb2dnZWRJblVzZXIgPSBkYXRhLnVzZXJcclxuXHRcdHRoaXMucXVlcnlQYXJhbXMgPSBkYXRhLnF1ZXJ5UGFyYW1zXHJcblx0XHR0aGlzLnJvdXRlUGFyYW1zID0gZGF0YS5yb3V0ZVBhcmFtc1xyXG5cdFx0dGhpcy5vbkluaXRpYWxEYXRhTG9hZGVkTWV0aG9kTmFtZXMuZm9yRWFjaCgobWV0aG9kTmFtZSkgPT4ge1xyXG5cdFx0XHRpZiAodHlwZW9mIHRoaXNbbWV0aG9kTmFtZV0gPT09ICdmdW5jdGlvbicpIHtcclxuXHRcdFx0XHR0aGlzW21ldGhvZE5hbWVdKGRhdGEpXHJcblx0XHRcdH1cclxuXHRcdH0pXHJcblx0fVxyXG5cclxuXHRkZXN0cnVjdG9yKCkge1xyXG5cdFx0dGhpcy5kZXN0cm95ZWQubmV4dCgpXHJcblx0XHR0aGlzLmRlc3Ryb3llZC5jb21wbGV0ZSgpXHJcblx0fVxyXG5cclxuXHRuZ09uRGVzdHJveSgpIHtcclxuXHRcdHRoaXMuZGVzdHJ1Y3RvcigpXHJcblx0fVxyXG59XHJcbiIsImltcG9ydCB7SW5qZWN0YWJsZX0gZnJvbSAnQGFuZ3VsYXIvY29yZSdcclxuaW1wb3J0IHtTdWJqZWN0fSBmcm9tICdyeGpzJ1xyXG5pbXBvcnQge0dFU1JlZGlyZWN0T3B0aW9uc0ludGVyZmFjZX0gZnJvbSAnLi9nbG9iYWxFdmVudHMuaW50ZXJmYWNlcydcclxuXHJcbkBJbmplY3RhYmxlKClcclxuZXhwb3J0IGNsYXNzIEdsb2JhbEV2ZW50c1NlcnZpY2Uge1xyXG5cdHBhZ2VMb2FkZWRTb3VyY2UgPSBuZXcgU3ViamVjdDx7W3g6IHN0cmluZ106IGFueX0gfCB2b2lkPigpXHJcblx0dHJpZ2dlckluaXRpYWxEYXRhTG9hZFNvdXJjZSA9IG5ldyBTdWJqZWN0PHZvaWQ+KClcclxuXHRpbml0aWFsRGF0YUxvYWRlZFNvdXJjZSA9IG5ldyBTdWJqZWN0PGFueT4oKVxyXG5cdHNldExheW91dERhdGFTb3VyY2UgPSBuZXcgU3ViamVjdDx7W3g6IHN0cmluZ106IGFueX0+KClcclxuXHRyZWRpcmVjdFNvdXJjZSA9IG5ldyBTdWJqZWN0PHtyb3V0ZTogc3RyaW5nLCBvcHRpb25zOiBHRVNSZWRpcmVjdE9wdGlvbnNJbnRlcmZhY2V9PigpXHJcblx0bm90aWZ5U291cmNlID0gbmV3IFN1YmplY3Q8e3R5cGU6IHN0cmluZywgbWVzc2FnZTogc3RyaW5nfT4oKVxyXG5cdHRvZ2dsZUxvYWRlclNvdXJjZSA9IG5ldyBTdWJqZWN0PGJvb2xlYW4+KClcclxuXHJcblx0cGFnZUxvYWRlZCQgPSB0aGlzLnBhZ2VMb2FkZWRTb3VyY2UuYXNPYnNlcnZhYmxlKClcclxuXHR0cmlnZ2VySW5pdGlhbERhdGFMb2FkJCA9IHRoaXMudHJpZ2dlckluaXRpYWxEYXRhTG9hZFNvdXJjZS5hc09ic2VydmFibGUoKVxyXG5cdGluaXRpYWxEYXRhTG9hZGVkJCA9IHRoaXMuaW5pdGlhbERhdGFMb2FkZWRTb3VyY2UuYXNPYnNlcnZhYmxlKClcclxuXHRzZXRMYXlvdXREYXRhJCA9IHRoaXMuc2V0TGF5b3V0RGF0YVNvdXJjZS5hc09ic2VydmFibGUoKVxyXG5cdHJlZGlyZWN0JCA9IHRoaXMucmVkaXJlY3RTb3VyY2UuYXNPYnNlcnZhYmxlKClcclxuXHRub3RpZnkkID0gdGhpcy5ub3RpZnlTb3VyY2UuYXNPYnNlcnZhYmxlKClcclxuXHR0b2dnbGVMb2FkZXIkID0gdGhpcy50b2dnbGVMb2FkZXJTb3VyY2UuYXNPYnNlcnZhYmxlKClcclxuXHJcblx0cGFnZUxvYWRlZChkYXRhKTogdm9pZCB7XHJcblx0XHR0aGlzLnBhZ2VMb2FkZWRTb3VyY2UubmV4dChkYXRhKVxyXG5cdH1cclxuXHJcblx0dHJpZ2dlckluaXRpYWxEYXRhTG9hZCgpOiB2b2lkIHtcclxuXHRcdHRoaXMudHJpZ2dlckluaXRpYWxEYXRhTG9hZFNvdXJjZS5uZXh0KClcclxuXHR9XHJcblxyXG5cdGluaXRpYWxEYXRhTG9hZGVkKGRhdGEpOiB2b2lkIHtcclxuXHRcdHRoaXMuaW5pdGlhbERhdGFMb2FkZWRTb3VyY2UubmV4dChkYXRhKVxyXG5cdH1cclxuXHJcblx0c2V0TGF5b3V0RGF0YShkYXRhKTogdm9pZCB7XHJcblx0XHR0aGlzLnNldExheW91dERhdGFTb3VyY2UubmV4dChkYXRhKVxyXG5cdH1cclxuXHJcblx0cmVkaXJlY3Qocm91dGU6IHN0cmluZywgb3B0aW9ucz86IEdFU1JlZGlyZWN0T3B0aW9uc0ludGVyZmFjZSk6IHZvaWQge1xyXG5cdFx0dGhpcy5yZWRpcmVjdFNvdXJjZS5uZXh0KHtyb3V0ZSwgb3B0aW9uc30pXHJcblx0fVxyXG5cclxuXHRub3RpZnkodHlwZTogc3RyaW5nLCBtZXNzYWdlOiBzdHJpbmcpOiB2b2lkIHtcclxuXHRcdHRoaXMubm90aWZ5U291cmNlLm5leHQoe3R5cGUsIG1lc3NhZ2V9KVxyXG5cdH1cclxuXHJcblx0dG9nZ2xlTG9hZGVyKGFjdGl2ZTogYm9vbGVhbik6IHZvaWQge1xyXG5cdFx0dGhpcy50b2dnbGVMb2FkZXJTb3VyY2UubmV4dChhY3RpdmUpXHJcblx0fVxyXG59XHJcbiIsImltcG9ydCB7SW5qZWN0YWJsZX0gZnJvbSAnQGFuZ3VsYXIvY29yZSdcclxuaW1wb3J0IHtIdHRwQ2xpZW50LCBIdHRwUmVxdWVzdCwgSHR0cFJlc3BvbnNlfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCdcclxuXHJcblxyXG5ASW5qZWN0YWJsZSgpXHJcbmV4cG9ydCBjbGFzcyBSZXF1ZXN0U2VydmljZSB7XHJcblx0Y29uc3RydWN0b3IocHVibGljIGNsaWVudDogSHR0cENsaWVudCkge31cclxuXHJcblx0ZmxhdHRlbk9iamVjdEZvclF1ZXJ5KG9iamVjdDoge1t4OiBzdHJpbmddOiBhbnl9IHwgYW55W10sIHBhcmVudEtleT86IHN0cmluZyk6IHtrZXk6IHN0cmluZywgdmFsdWU6IGFueX1bXSB7XHJcblx0XHRsZXQgcmV0dXJuT2JqZWN0ID0gW11cclxuXHRcdGlmIChvYmplY3QgaW5zdGFuY2VvZiBBcnJheSkge1xyXG5cdFx0XHRpZiAoIXBhcmVudEtleSkge1xyXG5cdFx0XHRcdHRocm93IHtlcnJvcjogJ1RoZSB0b3AtbW9zdCBpdGVtIGNhbm5vdCBiZSBhbiBhcnJheS4nfVxyXG5cdFx0XHR9XHJcblx0XHRcdG9iamVjdC5mb3JFYWNoKChpdGVtKSA9PiB7XHJcblx0XHRcdFx0aWYgKGl0ZW0gPT09IG51bGwpIHtcclxuXHRcdFx0XHRcdHJldHVyblxyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHRpZiAoKGl0ZW0gaW5zdGFuY2VvZiBEYXRlKSB8fCAhKGl0ZW0gaW5zdGFuY2VvZiBBcnJheSkgIHx8ICh0eXBlb2YgaXRlbSAhPT0gJ29iamVjdCcpKSB7XHJcblx0XHRcdFx0XHRyZXR1cm5PYmplY3QucHVzaCh7a2V5OiBgJHtwYXJlbnRLZXl9W11gLCB2YWx1ZTogaXRlbX0pXHJcblx0XHRcdFx0XHRyZXR1cm5cclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0cmV0dXJuT2JqZWN0ID0gcmV0dXJuT2JqZWN0LmNvbmNhdCh0aGlzLmZsYXR0ZW5PYmplY3RGb3JRdWVyeShpdGVtLCBgJHtwYXJlbnRLZXl9W11gKSlcclxuXHRcdFx0XHRyZXR1cm5cclxuXHRcdFx0fSlcclxuXHRcdFx0cmV0dXJuIHJldHVybk9iamVjdFxyXG5cdFx0fVxyXG5cdFx0Zm9yIChjb25zdCBrZXkgaW4gb2JqZWN0KSB7XHJcblx0XHRcdGNvbnN0IHZhbHVlID0gb2JqZWN0W2tleV1cclxuXHRcdFx0aWYgKHZhbHVlID09PSBudWxsKSB7XHJcblx0XHRcdFx0Y29udGludWVcclxuXHRcdFx0fVxyXG5cdFx0XHRpZiAoKHZhbHVlIGluc3RhbmNlb2YgRGF0ZSkgfHwgKHR5cGVvZiB2YWx1ZSAhPT0gJ29iamVjdCcpKSB7XHJcblx0XHRcdFx0cmV0dXJuT2JqZWN0LnB1c2goe2tleTogcGFyZW50S2V5ID8gYCR7cGFyZW50S2V5fVske2tleX1dYDoga2V5LCB2YWx1ZX0pXHJcblx0XHRcdFx0Y29udGludWVcclxuXHRcdFx0fVxyXG5cdFx0XHRyZXR1cm5PYmplY3QgPSByZXR1cm5PYmplY3QuY29uY2F0KHRoaXMuZmxhdHRlbk9iamVjdEZvclF1ZXJ5KHZhbHVlLCBwYXJlbnRLZXkgPyBgJHtwYXJlbnRLZXl9WyR7a2V5fV1gIDoga2V5KSlcclxuXHRcdH1cclxuXHRcdHJldHVybiByZXR1cm5PYmplY3RcclxuXHR9XHJcblxyXG5cdHJ1bihtZXRob2Q6IHN0cmluZywgdXJsOiBzdHJpbmcsIG9wdGlvbnM/OiB7W3g6IHN0cmluZ106IGFueX0pIHtcclxuXHRcdHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcblx0XHRcdHRyeSB7XHJcblx0XHRcdFx0bGV0IGFjdHVhbFVybCA9IHVybCxcclxuXHRcdFx0XHRcdHJ1bk9wdGlvbnMgPSB7fSBhcyBhbnksXHJcblx0XHRcdFx0XHRyZXF1ZXN0T3B0aW9ucyA9IHt9IGFzIGFueSxcclxuXHRcdFx0XHRcdGJvZHkgPSBudWxsXHJcblx0XHRcdFx0aWYgKG9wdGlvbnMgJiYgKHR5cGVvZiBvcHRpb25zID09PSAnb2JqZWN0JykpIHtcclxuXHRcdFx0XHRcdGxldCB7cmVzb2x2ZVdpdGhGdWxsUmVzcG9uc2UsIC4uLiBvdGhlck9wdGlvbnN9ID0gb3B0aW9uc1xyXG5cdFx0XHRcdFx0cmVxdWVzdE9wdGlvbnMgPSBvdGhlck9wdGlvbnNcclxuXHRcdFx0XHRcdHJ1bk9wdGlvbnMgPSB7cmVzb2x2ZVdpdGhGdWxsUmVzcG9uc2V9XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdGlmIChtZXRob2QudG9Mb3dlckNhc2UoKSA9PT0gJ2dldCcpIHtcclxuXHRcdFx0XHRcdGlmICghcmVxdWVzdE9wdGlvbnMgfHwgKHR5cGVvZiByZXF1ZXN0T3B0aW9ucyAhPT0gJ29iamVjdCcpKSB7XHJcblx0XHRcdFx0XHRcdHJlcXVlc3RPcHRpb25zID0ge31cclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdGNvbnN0IG9wdGlvbnNQYXJhbXMgPSB0aGlzLmZsYXR0ZW5PYmplY3RGb3JRdWVyeShyZXF1ZXN0T3B0aW9ucy5wYXJhbXMgfHwge30pXHJcblx0XHRcdFx0XHRhY3R1YWxVcmwgKz0gYD9fPSR7KG5ldyBEYXRlKCkpLmdldFRpbWUoKS50b1N0cmluZygpfWBcclxuXHRcdFx0XHRcdGlmIChvcHRpb25zUGFyYW1zLmxlbmd0aCkge1xyXG5cdFx0XHRcdFx0XHRvcHRpb25zUGFyYW1zLmZvckVhY2goKGl0ZW0sIGluZGV4KSA9PiB7XHJcblx0XHRcdFx0XHRcdFx0YWN0dWFsVXJsICs9IGAmJHtpdGVtLmtleX09JHtpdGVtLnZhbHVlfWBcclxuXHRcdFx0XHRcdFx0fSlcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0aWYgKCFyZXF1ZXN0T3B0aW9ucyB8fCAodHlwZW9mIHJlcXVlc3RPcHRpb25zICE9PSAnb2JqZWN0JykpIHtcclxuXHRcdFx0XHRcdFx0cmVxdWVzdE9wdGlvbnMgPSB7fVxyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0Ym9keSA9ICghcmVxdWVzdE9wdGlvbnMuYm9keSB8fCAodHlwZW9mIHJlcXVlc3RPcHRpb25zLmJvZHkgIT09ICdvYmplY3QnKSkgPyB7fSA6IHJlcXVlc3RPcHRpb25zLmJvZHlcclxuXHRcdFx0XHRcdGJvZHkuXyA9IChuZXcgRGF0ZSgpKS5nZXRUaW1lKClcclxuXHRcdFx0XHRcdGRlbGV0ZSByZXF1ZXN0T3B0aW9ucy5ib2R5XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdC8vIGlmICghcmVxdWVzdE9wdGlvbnMucmVzcG9uc2VUeXBlKSB7fVxyXG5cdFx0XHRcdHRoaXMuY2xpZW50LnJlcXVlc3QobmV3IEh0dHBSZXF1ZXN0KG1ldGhvZCwgYWN0dWFsVXJsLCBib2R5LCByZXF1ZXN0T3B0aW9ucykpLnRvUHJvbWlzZSgpLnRoZW4oXHJcblx0XHRcdFx0XHQocmVzcG9uc2U6IEh0dHBSZXNwb25zZTxhbnk+KSA9PiBydW5PcHRpb25zLnJlc29sdmVXaXRoRnVsbFJlc3BvbnNlID8gcmVzb2x2ZShyZXNwb25zZSkgOiByZXNvbHZlKHJlc3BvbnNlLmJvZHkpLFxyXG5cdFx0XHRcdFx0KGVycm9yOiBhbnkpID0+IHJlamVjdChlcnJvcilcclxuXHRcdFx0XHQpXHJcblx0XHRcdH0gY2F0Y2goZXJyb3IpIHtcclxuXHRcdFx0XHRyZWplY3QoZXJyb3IpXHJcblx0XHRcdH1cclxuXHRcdH0pXHJcblx0fVxyXG59XHJcbiIsImltcG9ydCBjbyBmcm9tICdjbydcclxuaW1wb3J0IHtJbmplY3RhYmxlfSBmcm9tICdAYW5ndWxhci9jb3JlJ1xyXG5pbXBvcnQge0h0dHBIZWFkZXJzfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCdcclxuXHJcbmltcG9ydCB7R2xvYmFsRXZlbnRzU2VydmljZX0gZnJvbSAnLi9nbG9iYWxFdmVudHMvZ2xvYmFsRXZlbnRzLnNlcnZpY2UnXHJcbmltcG9ydCB7UmVxdWVzdFNlcnZpY2V9IGZyb20gJy4vcmVxdWVzdC5zZXJ2aWNlJ1xyXG5cclxuQEluamVjdGFibGUoKVxyXG5leHBvcnQgY2xhc3MgQmFzZVJFU1RTZXJ2aWNlIHtcclxuXHRoZWFkZXJzID0gbmV3IEh0dHBIZWFkZXJzKHsnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nfSlcclxuXHRiYXNlVXJsID0gJy8nXHJcblxyXG5cdGNvbnN0cnVjdG9yKFxyXG5cdFx0cHVibGljIGdsb2JhbEV2ZW50c1NlcnZpY2U6IEdsb2JhbEV2ZW50c1NlcnZpY2UsXHJcblx0XHRwdWJsaWMgcmVxdWVzdFNlcnZpY2U6IFJlcXVlc3RTZXJ2aWNlXHJcblx0KSB7fVxyXG5cclxuXHRlbXB0eVRvTnVsbChkYXRhOiBhbnkpOiBhbnkge1xyXG5cdFx0aWYgKGRhdGEgPT09ICcnKSB7XHJcblx0XHRcdHJldHVybiBudWxsXHJcblx0XHR9XHJcblx0XHRpZiAoZGF0YSBpbnN0YW5jZW9mIERhdGUpIHtcclxuXHRcdFx0cmV0dXJuIGRhdGFcclxuXHRcdH1cclxuXHRcdGlmIChkYXRhIGluc3RhbmNlb2YgQXJyYXkpIHtcclxuXHRcdFx0cmV0dXJuIGRhdGEubWFwKChpdGVtLCBpbmRleCkgPT4gdGhpcy5lbXB0eVRvTnVsbChpdGVtKSlcclxuXHRcdH1cclxuXHRcdGlmICgodHlwZW9mIGRhdGEgPT09ICdvYmplY3QnKSAmJiAoZGF0YSAhPT0gbnVsbCkpIHtcclxuXHRcdFx0Y29uc3QgcGFyc2VkRGF0YSA9IHt9XHJcblx0XHRcdGZvciAoY29uc3Qga2V5IGluIGRhdGEpIHtcclxuXHRcdFx0XHRwYXJzZWREYXRhW2tleV0gPSB0aGlzLmVtcHR5VG9OdWxsKGRhdGFba2V5XSlcclxuXHRcdFx0fVxyXG5cdFx0XHRyZXR1cm4gcGFyc2VkRGF0YVxyXG5cdFx0fVxyXG5cdFx0cmV0dXJuIGRhdGFcclxuXHR9XHJcblxyXG5cdHN0cmluZ2lmeUdldFBhcmFtcyhkYXRhOiB7W2tleTogc3RyaW5nXTogYW55fSk6IHtba2V5OiBzdHJpbmddOiBhbnl9IHtcclxuXHRcdGxldCBzdHJpbmdpZmllZE9iamVjdCA9IHt9XHJcblx0XHRmb3IgKGNvbnN0IGtleSBpbiBkYXRhKSB7XHJcblx0XHRcdGNvbnN0IHZhbHVlID0gZGF0YVtrZXldXHJcblx0XHRcdGlmICgodmFsdWUgaW5zdGFuY2VvZiBBcnJheSkgfHwgKCh0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnKSAmJiAodmFsdWUgIT09IG51bGwpICYmICEodmFsdWUgaW5zdGFuY2VvZiBEYXRlKSkpIHtcclxuXHRcdFx0XHRzdHJpbmdpZmllZE9iamVjdFtgX2pzb25fJHtrZXl9YF0gPSBKU09OLnN0cmluZ2lmeSh2YWx1ZSlcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdFx0cmV0dXJuIHN0cmluZ2lmaWVkT2JqZWN0XHJcblx0fVxyXG5cclxuXHRoYW5kbGVFcnJvcihlcnIpOiB2b2lkIHtcclxuXHRcdHRoaXMuZ2xvYmFsRXZlbnRzU2VydmljZS5ub3RpZnkoJ2Vycm9yJywgZXJyICYmIGVyci5lcnJvciAmJiBlcnIuZXJyb3IuZXJyb3IgfHwgJ0FuIGVycm9yIGhhcyBvY2N1cnJlZC4nKVxyXG5cdH1cclxuXHJcblx0Y3JlYXRlKHBhcmFtcyk6IFByb21pc2U8YW55PiB7XHJcblx0XHRjb25zdCBpbnN0YW5jZSA9IHRoaXNcclxuXHRcdHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcblx0XHRcdGNvKGZ1bmN0aW9uKigpIHtcclxuXHRcdFx0XHRyZXR1cm4geWllbGQgaW5zdGFuY2UucmVxdWVzdFNlcnZpY2UucnVuKCdwb3N0JywgYCR7aW5zdGFuY2UuYmFzZVVybH1gLCB7XHJcblx0XHRcdFx0XHRoZWFkZXJzOiBpbnN0YW5jZS5oZWFkZXJzLFxyXG5cdFx0XHRcdFx0Ym9keTogaW5zdGFuY2UuZW1wdHlUb051bGwocGFyYW1zKVxyXG5cdFx0XHRcdH0pXHJcblx0XHRcdH0pLnRoZW4oKHJlcykgPT4gcmVzb2x2ZShyZXMpLCAoZXJyKSA9PiB7XHJcblx0XHRcdFx0aW5zdGFuY2UuaGFuZGxlRXJyb3IoZXJyKVxyXG5cdFx0XHRcdHJlamVjdCh7ZXJyb3I6IHRydWV9KVxyXG5cdFx0XHR9KVxyXG5cdFx0fSlcclxuXHR9XHJcblxyXG5cdHJlYWQocGFyYW1zKTogUHJvbWlzZTxhbnk+IHtcclxuXHRcdGNvbnN0IGluc3RhbmNlID0gdGhpc1xyXG5cdFx0cmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuXHRcdFx0Y28oZnVuY3Rpb24qKCkge1xyXG5cdFx0XHRcdHJldHVybiB5aWVsZCBpbnN0YW5jZS5yZXF1ZXN0U2VydmljZS5ydW4oJ2dldCcsIGAke2luc3RhbmNlLmJhc2VVcmx9L2l0ZW1gLCB7XHJcblx0XHRcdFx0XHRoZWFkZXJzOiBpbnN0YW5jZS5oZWFkZXJzLFxyXG5cdFx0XHRcdFx0cGFyYW1zOiBpbnN0YW5jZS5zdHJpbmdpZnlHZXRQYXJhbXMoaW5zdGFuY2UuZW1wdHlUb051bGwocGFyYW1zKSlcclxuXHRcdFx0XHR9KVxyXG5cdFx0XHR9KS50aGVuKChyZXMpID0+IHJlc29sdmUocmVzKSwgKGVycikgPT4ge1xyXG5cdFx0XHRcdGluc3RhbmNlLmhhbmRsZUVycm9yKGVycilcclxuXHRcdFx0XHRyZWplY3Qoe2Vycm9yOiB0cnVlfSlcclxuXHRcdFx0fSlcclxuXHRcdH0pXHJcblx0fVxyXG5cclxuXHRyZWFkTGlzdChwYXJhbXMpOiBQcm9taXNlPGFueT4ge1xyXG5cdFx0Y29uc3QgaW5zdGFuY2UgPSB0aGlzXHJcblx0XHRyZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG5cdFx0XHRjbyhmdW5jdGlvbiooKSB7XHJcblx0XHRcdFx0cmV0dXJuIHlpZWxkIGluc3RhbmNlLnJlcXVlc3RTZXJ2aWNlLnJ1bignZ2V0JywgYCR7aW5zdGFuY2UuYmFzZVVybH1gLCB7XHJcblx0XHRcdFx0XHRoZWFkZXJzOiBpbnN0YW5jZS5oZWFkZXJzLFxyXG5cdFx0XHRcdFx0cGFyYW1zOiBpbnN0YW5jZS5zdHJpbmdpZnlHZXRQYXJhbXMoaW5zdGFuY2UuZW1wdHlUb051bGwocGFyYW1zKSlcclxuXHRcdFx0XHR9KVxyXG5cdFx0XHR9KS50aGVuKChyZXMpID0+IHJlc29sdmUocmVzKSwgKGVycikgPT4ge1xyXG5cdFx0XHRcdGluc3RhbmNlLmhhbmRsZUVycm9yKGVycilcclxuXHRcdFx0XHRyZWplY3Qoe2Vycm9yOiB0cnVlfSlcclxuXHRcdFx0fSlcclxuXHRcdH0pXHJcblx0fVxyXG5cclxuXHRyZWFkU2VsZWN0TGlzdChwYXJhbXMpOiBQcm9taXNlPGFueT4ge1xyXG5cdFx0Y29uc3QgaW5zdGFuY2UgPSB0aGlzXHJcblx0XHRyZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG5cdFx0XHRjbyhmdW5jdGlvbiooKSB7XHJcblx0XHRcdFx0cmV0dXJuIHlpZWxkIGluc3RhbmNlLnJlcXVlc3RTZXJ2aWNlLnJ1bignZ2V0JywgYCR7aW5zdGFuY2UuYmFzZVVybH0vc2VsZWN0TGlzdGAsIHtcclxuXHRcdFx0XHRcdGhlYWRlcnM6IGluc3RhbmNlLmhlYWRlcnMsXHJcblx0XHRcdFx0XHRwYXJhbXM6IGluc3RhbmNlLnN0cmluZ2lmeUdldFBhcmFtcyhpbnN0YW5jZS5lbXB0eVRvTnVsbChwYXJhbXMpKVxyXG5cdFx0XHRcdH0pXHJcblx0XHRcdH0pLnRoZW4oKHJlcykgPT4gcmVzb2x2ZShyZXMpLCAoZXJyKSA9PiB7XHJcblx0XHRcdFx0aW5zdGFuY2UuaGFuZGxlRXJyb3IoZXJyKVxyXG5cdFx0XHRcdHJlamVjdCh7ZXJyb3I6IHRydWV9KVxyXG5cdFx0XHR9KVxyXG5cdFx0fSlcclxuXHR9XHJcblxyXG5cdHVwZGF0ZShwYXJhbXMpOiBQcm9taXNlPGFueT4ge1xyXG5cdFx0Y29uc3QgaW5zdGFuY2UgPSB0aGlzXHJcblx0XHRyZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG5cdFx0XHRjbyhmdW5jdGlvbiooKSB7XHJcblx0XHRcdFx0cmV0dXJuIHlpZWxkIGluc3RhbmNlLnJlcXVlc3RTZXJ2aWNlLnJ1bigncGF0Y2gnLCBgJHtpbnN0YW5jZS5iYXNlVXJsfS9pdGVtLyR7cGFyYW1zLmlkfWAsIHtcclxuXHRcdFx0XHRcdGhlYWRlcnM6IGluc3RhbmNlLmhlYWRlcnMsXHJcblx0XHRcdFx0XHRib2R5OiBpbnN0YW5jZS5zdHJpbmdpZnlHZXRQYXJhbXMoaW5zdGFuY2UuZW1wdHlUb051bGwocGFyYW1zKSlcclxuXHRcdFx0XHR9KVxyXG5cdFx0XHR9KS50aGVuKChyZXMpID0+IHJlc29sdmUocmVzKSwgKGVycikgPT4ge1xyXG5cdFx0XHRcdGluc3RhbmNlLmhhbmRsZUVycm9yKGVycilcclxuXHRcdFx0XHRyZWplY3Qoe2Vycm9yOiB0cnVlfSlcclxuXHRcdFx0fSlcclxuXHRcdH0pXHJcblx0fVxyXG5cclxuXHRidWxrVXBzZXJ0KHBhcmFtcyk6IFByb21pc2U8YW55PiB7XHJcblx0XHRjb25zdCBpbnN0YW5jZSA9IHRoaXNcclxuXHRcdHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcblx0XHRcdGNvKGZ1bmN0aW9uKigpIHtcclxuXHRcdFx0XHRyZXR1cm4geWllbGQgaW5zdGFuY2UucmVxdWVzdFNlcnZpY2UucnVuKCdwdXQnLCBgJHtpbnN0YW5jZS5iYXNlVXJsfWAsIHtcclxuXHRcdFx0XHRcdGhlYWRlcnM6IGluc3RhbmNlLmhlYWRlcnMsXHJcblx0XHRcdFx0XHRib2R5OiBpbnN0YW5jZS5lbXB0eVRvTnVsbChwYXJhbXMpXHJcblx0XHRcdFx0fSlcclxuXHRcdFx0fSkudGhlbigocmVzKSA9PiByZXNvbHZlKHJlcyksIChlcnIpID0+IHtcclxuXHRcdFx0XHRpbnN0YW5jZS5oYW5kbGVFcnJvcihlcnIpXHJcblx0XHRcdFx0cmVqZWN0KHtlcnJvcjogdHJ1ZX0pXHJcblx0XHRcdH0pXHJcblx0XHR9KVxyXG5cdH1cclxuXHJcblx0ZGVsZXRlKHBhcmFtcyk6IFByb21pc2U8YW55PiB7XHJcblx0XHRjb25zdCBpbnN0YW5jZSA9IHRoaXNcclxuXHRcdHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcblx0XHRcdGNvKGZ1bmN0aW9uKigpIHtcclxuXHRcdFx0XHRyZXR1cm4geWllbGQgaW5zdGFuY2UucmVxdWVzdFNlcnZpY2UucnVuKCdkZWxldGUnLCBgJHtpbnN0YW5jZS5iYXNlVXJsfS8ke3BhcmFtcy5pZH1gLCB7XHJcblx0XHRcdFx0XHRoZWFkZXJzOiBpbnN0YW5jZS5oZWFkZXJzLFxyXG5cdFx0XHRcdFx0Ym9keTogaW5zdGFuY2UuZW1wdHlUb051bGwocGFyYW1zKVxyXG5cdFx0XHRcdH0pXHJcblx0XHRcdH0pLnRoZW4oKHJlcykgPT4gcmVzb2x2ZShyZXMpLCAoZXJyKSA9PiB7XHJcblx0XHRcdFx0aW5zdGFuY2UuaGFuZGxlRXJyb3IoZXJyKVxyXG5cdFx0XHRcdHJlamVjdCh7ZXJyb3I6IHRydWV9KVxyXG5cdFx0XHR9KVxyXG5cdFx0fSlcclxuXHR9XHJcbn1cclxuIiwiaW1wb3J0IGNvIGZyb20gJ2NvJ1xyXG5pbXBvcnQge0luamVjdGFibGV9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnXHJcbmltcG9ydCB7SHR0cEhlYWRlcnN9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJ1xyXG5cclxuaW1wb3J0IHtHbG9iYWxFdmVudHNTZXJ2aWNlfSBmcm9tICcuL2dsb2JhbEV2ZW50cy9nbG9iYWxFdmVudHMuc2VydmljZSdcclxuaW1wb3J0IHtSZXF1ZXN0U2VydmljZX0gZnJvbSAnLi9yZXF1ZXN0LnNlcnZpY2UnXHJcblxyXG5ASW5qZWN0YWJsZSgpXHJcbmV4cG9ydCBjbGFzcyBGaWxlc1JFU1RTZXJ2aWNlIHtcclxuXHQvLyB7J0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJ31cclxuXHRoZWFkZXJzID0gbmV3IEh0dHBIZWFkZXJzKClcclxuXHRiYXNlVXJsID0gJy9maWxlcydcclxuXHJcblx0Y29uc3RydWN0b3IoXHJcblx0XHRwdWJsaWMgZ2xvYmFsRXZlbnRzU2VydmljZTogR2xvYmFsRXZlbnRzU2VydmljZSxcclxuXHRcdHB1YmxpYyByZXF1ZXN0U2VydmljZTogUmVxdWVzdFNlcnZpY2VcclxuXHQpIHt9XHJcblxyXG5cdGhhbmRsZUVycm9yKGVycik6IHZvaWQge1xyXG5cdFx0dGhpcy5nbG9iYWxFdmVudHNTZXJ2aWNlLm5vdGlmeSgnZXJyb3InLCBlcnIgJiYgZXJyLmVycm9yICYmIGVyci5lcnJvci5lcnJvciB8fCAnQW4gZXJyb3IgaGFzIG9jY3VycmVkLicpXHJcblx0fVxyXG5cclxuXHR1cGxvYWQoZmlsZTogRmlsZSwgcGFyYW1zOiB7b3V0cHV0RmlsZU5hbWU6IHN0cmluZywgW3g6IHN0cmluZ106IGFueX0sIG9wdGlvbnM/OiB7aGFuZGxlRXJyb3I/OiBib29sZWFufSk6IFByb21pc2U8YW55PiB7XHJcblx0XHRjb25zdCBpbnN0YW5jZSA9IHRoaXNcclxuXHRcdHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcblx0XHRcdGNvKGZ1bmN0aW9uKigpIHtcclxuXHRcdFx0XHRsZXQgZmQgPSBuZXcgRm9ybURhdGEoKVxyXG5cdFx0XHRcdGZkLmFwcGVuZCgnZmlsZScsIGZpbGUsIGZpbGUubmFtZSlcclxuXHRcdFx0XHRmb3IgKGNvbnN0IGtleSBpbiBwYXJhbXMpIHtcclxuXHRcdFx0XHRcdGZkLmFwcGVuZChrZXksIHBhcmFtc1trZXldKVxyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHRpbnN0YW5jZS5oZWFkZXJzLnNldCgnQ29udGVudC1UeXBlJywgJ211bHRpcGFydC9mb3JtLWRhdGEnKVxyXG5cdFx0XHRcdHlpZWxkIGluc3RhbmNlLnJlcXVlc3RTZXJ2aWNlLnJ1bigncG9zdCcsIGAke2luc3RhbmNlLmJhc2VVcmx9YCwge1xyXG5cdFx0XHRcdFx0aGVhZGVyczogaW5zdGFuY2UuaGVhZGVycyxcclxuXHRcdFx0XHRcdGJvZHk6IGZkXHJcblx0XHRcdFx0fSlcclxuXHRcdFx0XHRyZXR1cm4ge3N1Y2Nlc3M6IHRydWV9XHJcblx0XHRcdH0pLnRoZW4oKHJlcykgPT4gcmVzb2x2ZShyZXMpLCAoZXJyKSA9PiB7XHJcblx0XHRcdFx0aWYgKG9wdGlvbnMgJiYgb3B0aW9ucy5oYW5kbGVFcnJvcikge1xyXG5cdFx0XHRcdFx0aW5zdGFuY2UuaGFuZGxlRXJyb3IoZXJyKVxyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHRyZWplY3Qoe2Vycm9yOiBlcnIgfHwgdHJ1ZX0pXHJcblx0XHRcdH0pXHJcblx0XHR9KVxyXG5cdH1cclxuXHJcblx0cmVhZChwYXJhbXMpOiBQcm9taXNlPGFueT4ge1xyXG5cdFx0Y29uc3QgaW5zdGFuY2UgPSB0aGlzXHJcblx0XHRyZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG5cdFx0XHRjbyhmdW5jdGlvbiooKSB7XHJcblx0XHRcdFx0cmV0dXJuIHlpZWxkIGluc3RhbmNlLnJlcXVlc3RTZXJ2aWNlLnJ1bignZ2V0JywgYCR7aW5zdGFuY2UuYmFzZVVybH0vaXRlbWAsIHtcclxuXHRcdFx0XHRcdGhlYWRlcnM6IGluc3RhbmNlLmhlYWRlcnMsXHJcblx0XHRcdFx0XHRwYXJhbXNcclxuXHRcdFx0XHR9KVxyXG5cdFx0XHR9KS50aGVuKChyZXMpID0+IHJlc29sdmUocmVzKSwgKGVycikgPT4ge1xyXG5cdFx0XHRcdGluc3RhbmNlLmhhbmRsZUVycm9yKGVycilcclxuXHRcdFx0XHRyZWplY3Qoe2Vycm9yOiB0cnVlfSlcclxuXHRcdFx0fSlcclxuXHRcdH0pXHJcblx0fVxyXG59XHJcbiIsImV4cG9ydCBjb25zdCBnZXROZXN0ZWQgPSAocGFyZW50OiBhbnksIGZpZWxkOiBzdHJpbmcpOiBhbnkgPT4ge1xyXG5cdGlmICgodHlwZW9mIHBhcmVudCAhPT0gJ29iamVjdCcpIHx8ICh0eXBlb2YgZmllbGQgIT09ICdzdHJpbmcnKSkge1xyXG5cdFx0cmV0dXJuIG51bGxcclxuXHR9XHJcblx0bGV0IGZpZWxkRGF0YSA9IGZpZWxkLnNwbGl0KCcuJyksXHJcblx0XHRjdXJyZW50RWxlbWVudCA9IHBhcmVudFxyXG5cdGZvciAobGV0IGkgaW4gZmllbGREYXRhKSB7XHJcblx0XHRsZXQgaW5uZXJFbGVtZW50ID0gZmllbGREYXRhW2ldXHJcblx0XHRpZiAoY3VycmVudEVsZW1lbnQgPT09IG51bGwpIHtcclxuXHRcdFx0cmV0dXJuIGN1cnJlbnRFbGVtZW50XHJcblx0XHR9XHJcblx0XHRpZiAoKHR5cGVvZiBjdXJyZW50RWxlbWVudCA9PT0gJ3VuZGVmaW5lZCcpIHx8ICh0eXBlb2YgY3VycmVudEVsZW1lbnRbaW5uZXJFbGVtZW50XSA9PT0gJ3VuZGVmaW5lZCcpKSB7XHJcblx0XHRcdHJldHVybiBjdXJyZW50RWxlbWVudFxyXG5cdFx0fVxyXG5cdFx0Y3VycmVudEVsZW1lbnQgPSBjdXJyZW50RWxlbWVudFtpbm5lckVsZW1lbnRdXHJcblx0fVxyXG5cdHJldHVybiBjdXJyZW50RWxlbWVudFxyXG59XHJcblxyXG5leHBvcnQgY29uc3Qgc2V0TmVzdGVkID0gKHBhcmVudDogYW55LCBmaWVsZDogc3RyaW5nLCB2YWx1ZTogYW55KTogYm9vbGVhbiA9PiB7XHJcblx0Y29uc3QgZmllbGROYW1lcyA9IGZpZWxkLnNwbGl0KCcuJylcclxuXHRpZiAoIWZpZWxkTmFtZXMubGVuZ3RoKSB7XHJcblx0XHRyZXR1cm4gZmFsc2VcclxuXHR9XHJcblx0bGV0IGN1cnJlbnRQYXJlbnQgPSBwYXJlbnQsXHJcblx0XHRsb29wRW5kID0gZmllbGROYW1lcy5sZW5ndGggLSAxXHJcblx0Zm9yIChsZXQgaSA9IDA7IGkgPCBsb29wRW5kOyBpKyspIHtcclxuXHRcdGNvbnN0IGZpZWxkTmFtZSA9IGZpZWxkTmFtZXNbaV1cclxuXHRcdGlmICh0eXBlb2YgY3VycmVudFBhcmVudFtmaWVsZE5hbWVdID09PSAndW5kZWZpbmVkJykge1xyXG5cdFx0XHRyZXR1cm4gZmFsc2VcclxuXHRcdH1cclxuXHRcdGN1cnJlbnRQYXJlbnQgPSBjdXJyZW50UGFyZW50W2ZpZWxkTmFtZV1cclxuXHR9XHJcblx0Y3VycmVudFBhcmVudFtmaWVsZE5hbWVzW2xvb3BFbmRdXSA9IHZhbHVlXHJcblx0cmV0dXJuIHRydWVcclxufVxyXG4iLCIndXNlIHN0cmljdCdcclxuXHJcbi8vIGFuZ3VsYXIgZGVwZW5kZW5jaWVzXHJcbmltcG9ydCB7Q29tbW9uTW9kdWxlfSBmcm9tICdAYW5ndWxhci9jb21tb24nXHJcbmltcG9ydCB7TmdNb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnXHJcblxyXG5cclxuQE5nTW9kdWxlKHtcclxuXHRpbXBvcnRzOiBbXHJcblx0XHRDb21tb25Nb2R1bGVcclxuXHRdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBSYW1zdGVyVUlDb3JlTW9kdWxlIHt9XHJcblxyXG5leHBvcnQgKiBmcm9tICcuL2NvbXBvbmVudHMvYmFzZS1sYXlvdXQuY29tcG9uZW50J1xyXG5leHBvcnQgKiBmcm9tICcuL2NvbXBvbmVudHMvYmFzZS1wYWdlLmNvbXBvbmVudCdcclxuZXhwb3J0ICogZnJvbSAnLi9zZXJ2aWNlcy9iYXNlUkVTVC5zZXJ2aWNlJ1xyXG5leHBvcnQgKiBmcm9tICcuL3NlcnZpY2VzL2ZpbGVzUkVTVC5zZXJ2aWNlJ1xyXG5leHBvcnQgKiBmcm9tICcuL3V0aWxzL3Rvb2xiZWx0J1xyXG5leHBvcnQgKiBmcm9tICcuL3NlcnZpY2VzL2dsb2JhbEV2ZW50cy9nbG9iYWxFdmVudHMuc2VydmljZSdcclxuZXhwb3J0ICogZnJvbSAnLi9zZXJ2aWNlcy9nbG9iYWxFdmVudHMvZ2xvYmFsRXZlbnRzLmludGVyZmFjZXMnXHJcbmV4cG9ydCAqIGZyb20gJy4vc2VydmljZXMvcmVxdWVzdC5zZXJ2aWNlJ1xyXG5leHBvcnQgKiBmcm9tICcuL2ludGVyZmFjZXMvc2VsZWN0TGlzdC5pbnRlcmZh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