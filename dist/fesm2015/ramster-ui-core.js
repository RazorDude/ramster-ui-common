import { CommonModule } from '@angular/common';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { __rest } from 'tslib';
import co from 'co';
import { HttpClient, HttpRequest, HttpHeaders } from '@angular/common/http';
import { Injectable, Injector, NgModule } from '@angular/core';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
        this.globalEventsService.pageLoaded$.subscribe((/**
         * @param {?=} data
         * @return {?}
         */
        (data) => this.pageLoaded(data)));
        this.globalEventsService.triggerInitialDataLoad$.subscribe((/**
         * @return {?}
         */
        () => this.loadInitialData()));
        this.globalEventsService.setLayoutData$.subscribe((/**
         * @param {?} data
         * @return {?}
         */
        (data) => this.setLayoutData(data)));
        this.globalEventsService.redirect$.subscribe((/**
         * @param {?} __0
         * @return {?}
         */
        ({ route, options }) => this.redirect(route, options)));
        this.globalEventsService.toggleLoader$.subscribe((/**
         * @param {?} active
         * @return {?}
         */
        (active) => this.toggleLoader(active)));
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
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
        this.globalEventsService.initialDataLoaded$.pipe(takeUntil(this.destroyed)).subscribe((/**
         * @param {?} data
         * @return {?}
         */
        (data) => this.initialDataLoaded(data)));
        this.onInitMethodNames.forEach((/**
         * @param {?} methodName
         * @return {?}
         */
        (methodName) => {
            if (typeof this[methodName] === 'function') {
                this[methodName]();
            }
        }));
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
        this.onInitialDataLoadedMethodNames.forEach((/**
         * @param {?} methodName
         * @return {?}
         */
        (methodName) => {
            if (typeof this[methodName] === 'function') {
                this[methodName](data);
            }
        }));
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
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
            object.forEach((/**
             * @param {?} item
             * @return {?}
             */
            (item) => {
                if (item === null) {
                    return;
                }
                if ((item instanceof Date) || !(item instanceof Array) || (typeof item !== 'object')) {
                    returnObject.push({ key: `${parentKey}[]`, value: item });
                    return;
                }
                returnObject = returnObject.concat(this.flattenObjectForQuery(item, `${parentKey}[]`));
                return;
            }));
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
        return new Promise((/**
         * @param {?} resolve
         * @param {?} reject
         * @return {?}
         */
        (resolve, reject) => {
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
                        optionsParams.forEach((/**
                         * @param {?} item
                         * @param {?} index
                         * @return {?}
                         */
                        (item, index) => {
                            actualUrl += `&${item.key}=${item.value}`;
                        }));
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
                this.client.request(new HttpRequest(method, actualUrl, body, requestOptions)).toPromise().then((/**
                 * @param {?} response
                 * @return {?}
                 */
                (response) => runOptions.resolveWithFullResponse ? resolve(response) : resolve(response.body)), (/**
                 * @param {?} error
                 * @return {?}
                 */
                (error) => reject(error)));
            }
            catch (error) {
                reject(error);
            }
        }));
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
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class BaseRESTService {
    /**
     * @param {?} globalEventsService
     * @param {?} requestService
     */
    constructor(globalEventsService, requestService) {
        this.globalEventsService = globalEventsService;
        this.requestService = requestService;
        this.baseUrl = '/';
        this.headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        this.redirectOnForbiddenUrl = null;
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
            return data.map((/**
             * @param {?} item
             * @param {?} index
             * @return {?}
             */
            (item, index) => this.emptyToNull(item)));
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
                continue;
            }
            stringifiedObject[key] = value;
        }
        return stringifiedObject;
    }
    /**
     * @param {?} err
     * @param {?=} options
     * @return {?}
     */
    handleError(err, options) {
        const { notifyOnError } = options || (/** @type {?} */ ({}));
        if (!err) {
            if (notifyOnError !== false) {
                this.globalEventsService.notify('error', 'An error has occurred.');
            }
            return;
        }
        if (this.redirectOnForbiddenUrl && (err.status === 401)) {
            this.globalEventsService.redirect(this.redirectOnForbiddenUrl);
            return;
        }
        if (notifyOnError !== false) {
            this.globalEventsService.notify('error', err.error && err.error.error || 'An error has occurred.');
        }
    }
    /**
     * @param {?} params
     * @return {?}
     */
    create(params) {
        /** @type {?} */
        const instance = this;
        return new Promise((/**
         * @param {?} resolve
         * @param {?} reject
         * @return {?}
         */
        (resolve, reject) => {
            co((/**
             * @return {?}
             */
            function* () {
                return yield instance.requestService.run('post', `${instance.baseUrl}`, {
                    headers: instance.headers,
                    body: instance.emptyToNull(params)
                });
            })).then((/**
             * @param {?} res
             * @return {?}
             */
            (res) => resolve(res)), (/**
             * @param {?} err
             * @return {?}
             */
            (err) => {
                instance.handleError(err);
                reject({ error: true });
            }));
        }));
    }
    /**
     * @param {?} params
     * @return {?}
     */
    read(params) {
        /** @type {?} */
        const instance = this;
        return new Promise((/**
         * @param {?} resolve
         * @param {?} reject
         * @return {?}
         */
        (resolve, reject) => {
            co((/**
             * @return {?}
             */
            function* () {
                return yield instance.requestService.run('get', `${instance.baseUrl}/item`, {
                    headers: instance.headers,
                    params: instance.stringifyGetParams(instance.emptyToNull(params))
                });
            })).then((/**
             * @param {?} res
             * @return {?}
             */
            (res) => resolve(res)), (/**
             * @param {?} err
             * @return {?}
             */
            (err) => {
                instance.handleError(err);
                reject({ error: true });
            }));
        }));
    }
    /**
     * @param {?} params
     * @return {?}
     */
    readList(params) {
        /** @type {?} */
        const instance = this;
        return new Promise((/**
         * @param {?} resolve
         * @param {?} reject
         * @return {?}
         */
        (resolve, reject) => {
            co((/**
             * @return {?}
             */
            function* () {
                return yield instance.requestService.run('get', `${instance.baseUrl}`, {
                    headers: instance.headers,
                    params: instance.stringifyGetParams(instance.emptyToNull(params))
                });
            })).then((/**
             * @param {?} res
             * @return {?}
             */
            (res) => resolve(res)), (/**
             * @param {?} err
             * @return {?}
             */
            (err) => {
                instance.handleError(err);
                reject({ error: true });
            }));
        }));
    }
    /**
     * @param {?} params
     * @param {?} onMessage
     * @param {?=} options
     * @return {?}
     */
    readStreamList(params, onMessage, options) {
        const { onError, reconnectAttemptInterval, reconnectAttemptsLeft } = options || (/** @type {?} */ ({}));
        /** @type {?} */
        const errorHandler = onError ? onError : this.handleError.bind(this);
        /** @type {?} */
        let eventSource = new EventSource(`/${this.baseUrl}/streamList` + this.stringifyGetParams(this.emptyToNull(params)));
        eventSource.onmessage = (/**
         * @param {?} event
         * @return {?}
         */
        (event) => onMessage(event));
        eventSource.onerror = (/**
         * @param {?} err
         * @return {?}
         */
        (err) => {
            errorHandler(err);
            if ((typeof reconnectAttemptsLeft === 'undefined') || reconnectAttemptsLeft > 0) {
                eventSource.close();
                setTimeout((/**
                 * @return {?}
                 */
                () => {
                    this.readStreamList(params, onMessage, Object.assign({}, options, { reconnectAttemptsLeft: typeof reconnectAttemptsLeft === 'number' ? reconnectAttemptsLeft - 1 : undefined }));
                }), reconnectAttemptInterval || 5000);
            }
        });
        return eventSource;
    }
    /**
     * @param {?} params
     * @return {?}
     */
    readSelectList(params) {
        /** @type {?} */
        const instance = this;
        return new Promise((/**
         * @param {?} resolve
         * @param {?} reject
         * @return {?}
         */
        (resolve, reject) => {
            co((/**
             * @return {?}
             */
            function* () {
                return yield instance.requestService.run('get', `${instance.baseUrl}/selectList`, {
                    headers: instance.headers,
                    params: instance.stringifyGetParams(instance.emptyToNull(params))
                });
            })).then((/**
             * @param {?} res
             * @return {?}
             */
            (res) => resolve(res)), (/**
             * @param {?} err
             * @return {?}
             */
            (err) => {
                instance.handleError(err);
                reject({ error: true });
            }));
        }));
    }
    /**
     * @param {?} params
     * @return {?}
     */
    update(params) {
        /** @type {?} */
        const instance = this;
        return new Promise((/**
         * @param {?} resolve
         * @param {?} reject
         * @return {?}
         */
        (resolve, reject) => {
            co((/**
             * @return {?}
             */
            function* () {
                return yield instance.requestService.run('patch', `${instance.baseUrl}/item/${params.id}`, {
                    headers: instance.headers,
                    body: instance.emptyToNull(params)
                });
            })).then((/**
             * @param {?} res
             * @return {?}
             */
            (res) => resolve(res)), (/**
             * @param {?} err
             * @return {?}
             */
            (err) => {
                instance.handleError(err);
                reject({ error: true });
            }));
        }));
    }
    /**
     * @param {?} params
     * @return {?}
     */
    bulkUpsert(params) {
        /** @type {?} */
        const instance = this;
        return new Promise((/**
         * @param {?} resolve
         * @param {?} reject
         * @return {?}
         */
        (resolve, reject) => {
            co((/**
             * @return {?}
             */
            function* () {
                return yield instance.requestService.run('put', `${instance.baseUrl}`, {
                    headers: instance.headers,
                    body: instance.emptyToNull(params)
                });
            })).then((/**
             * @param {?} res
             * @return {?}
             */
            (res) => resolve(res)), (/**
             * @param {?} err
             * @return {?}
             */
            (err) => {
                instance.handleError(err);
                reject({ error: true });
            }));
        }));
    }
    /**
     * @param {?} params
     * @return {?}
     */
    delete(params) {
        /** @type {?} */
        const instance = this;
        return new Promise((/**
         * @param {?} resolve
         * @param {?} reject
         * @return {?}
         */
        (resolve, reject) => {
            co((/**
             * @return {?}
             */
            function* () {
                return yield instance.requestService.run('delete', `${instance.baseUrl}/${params.id}`, {
                    headers: instance.headers,
                    body: instance.emptyToNull(params)
                });
            })).then((/**
             * @param {?} res
             * @return {?}
             */
            (res) => resolve(res)), (/**
             * @param {?} err
             * @return {?}
             */
            (err) => {
                instance.handleError(err);
                reject({ error: true });
            }));
        }));
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
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
        return new Promise((/**
         * @param {?} resolve
         * @param {?} reject
         * @return {?}
         */
        (resolve, reject) => {
            co((/**
             * @return {?}
             */
            function* () {
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
            })).then((/**
             * @param {?} res
             * @return {?}
             */
            (res) => resolve(res)), (/**
             * @param {?} err
             * @return {?}
             */
            (err) => {
                if (options && options.handleError) {
                    instance.handleError(err);
                }
                reject({ error: err || true });
            }));
        }));
    }
    /**
     * @param {?} params
     * @return {?}
     */
    read(params) {
        /** @type {?} */
        const instance = this;
        return new Promise((/**
         * @param {?} resolve
         * @param {?} reject
         * @return {?}
         */
        (resolve, reject) => {
            co((/**
             * @return {?}
             */
            function* () {
                return yield instance.requestService.run('get', `${instance.baseUrl}/item`, {
                    headers: instance.headers,
                    params
                });
            })).then((/**
             * @param {?} res
             * @return {?}
             */
            (res) => resolve(res)), (/**
             * @param {?} err
             * @return {?}
             */
            (err) => {
                instance.handleError(err);
                reject({ error: true });
            }));
        }));
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
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class ModelRESTServiceProviderService {
    /**
     * @param {?} injector
     */
    constructor(injector) {
        this.injector = injector;
        this.modelRESTServices = {};
    }
    /**
     * @param {?} componentName
     * @return {?}
     */
    get(componentName) {
        return this.modelRESTServices[`${componentName}ModelRESTService`];
    }
    /**
     * @param {?} data
     * @return {?}
     */
    setServices(data) {
        this.modelRESTServices = {};
        Object.keys(data).forEach((/**
         * @param {?} key
         * @return {?}
         */
        (key) => {
            this.modelRESTServices[`${key.charAt(0).toLowerCase()}${key.substr(1, key.length)}`] = this.injector.get(data[key]);
        }));
    }
}
ModelRESTServiceProviderService.decorators = [
    { type: Injectable }
];
/** @nocollapse */
ModelRESTServiceProviderService.ctorParameters = () => [
    { type: Injector }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
const getNested = (/**
 * @param {?} parent
 * @param {?} field
 * @return {?}
 */
(parent, field) => {
    if ((typeof parent !== 'object') || (parent === null) || (typeof field !== 'string') || !field.length) {
        return undefined;
    }
    /** @type {?} */
    let fieldData = field.split('.');
    /** @type {?} */
    let fieldDataLength = fieldData.length;
    /** @type {?} */
    let currentElement = parent;
    for (let i = 0; i < fieldDataLength; i++) {
        if ((typeof currentElement === 'undefined') || (currentElement === null)) {
            return undefined;
        }
        /** @type {?} */
        let innerElementName = fieldData[i]
        // logic for handling sequelize-style $foo.bar$ - should be treated as a single element
        ;
        // logic for handling sequelize-style $foo.bar$ - should be treated as a single element
        if (innerElementName.charAt(0) === '$') {
            /** @type {?} */
            let closingBracketFound = false;
            /** @type {?} */
            let closingBracketIndex = i + 1;
            while (closingBracketIndex < fieldDataLength) {
                /** @type {?} */
                const element = fieldData[closingBracketIndex]
                // false alarm - there's another $ opening before the current one closed - so the current one must be just a variable name, not a bracket
                ;
                // false alarm - there's another $ opening before the current one closed - so the current one must be just a variable name, not a bracket
                if (element.charAt(0) === '$') {
                    break;
                }
                // found it !
                if (element.charAt(element.length - 1) === '$') {
                    closingBracketFound = true;
                    break;
                }
                closingBracketIndex++;
            }
            if (closingBracketFound) {
                for (let j = i + 1; j <= closingBracketIndex; j++) {
                    innerElementName += `.${fieldData[j]}`;
                }
                i = closingBracketIndex;
            }
        }
        /** @type {?} */
        let nextElement = currentElement[innerElementName];
        if (typeof nextElement === 'undefined') {
            return undefined;
        }
        // if the next element is an array, prepare to return an array of the inner items
        if (nextElement instanceof Array) {
            // if this is the last item, just return the array
            if (i === (fieldDataLength - 1)) {
                return nextElement;
            }
            // if the next item is not an index, recursively call self for each item of the array
            if (isNaN(parseInt(fieldData[i + 1], 10))) {
                currentElement = [];
                /** @type {?} */
                let innerPath = '';
                for (let j = i + 1; j < fieldDataLength; j++) {
                    innerPath += `${fieldData[j]}${j < (fieldDataLength - 1) ? '.' : ''}`;
                }
                nextElement.forEach((/**
                 * @param {?} item
                 * @param {?} iIndex
                 * @return {?}
                 */
                (item, iIndex) => {
                    /** @type {?} */
                    let innerValue = getNested(item, innerPath);
                    if (typeof innerValue !== 'undefined') {
                        // if the innerValue is an array too, merge it with the currentElement - this way we can have nested arrays without indexes
                        if (innerValue instanceof Array) {
                            currentElement = currentElement.concat(innerValue);
                            return;
                        }
                        currentElement.push(innerValue);
                    }
                }));
                return currentElement;
            }
        }
        currentElement = nextElement;
    }
    return currentElement;
});
/** @type {?} */
const setNested = (/**
 * @param {?} parent
 * @param {?} field
 * @param {?} value
 * @return {?}
 */
(parent, field, value) => {
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
});

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

export { RamsterUICoreModule, BaseLayoutComponent, BasePageComponent, BaseRESTService, FilesRESTService, GlobalEventsService, ModelRESTServiceProviderService, RequestService, getNested, setNested };

//# sourceMappingURL=ramster-ui-core.js.map