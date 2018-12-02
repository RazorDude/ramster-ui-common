import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Injectable, NgModule } from '@angular/core';
import { __rest, __generator } from 'tslib';
import { HttpClient, HttpParams, HttpRequest, HttpHeaders } from '@angular/common/http';
import co from 'co';
import { CommonModule } from '@angular/common';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
        this.globalEventsService.pageLoaded$.subscribe(function (data) { return _this.pageLoaded(data); });
        this.globalEventsService.triggerInitialDataLoad$.subscribe(function () { return _this.loadInitialData(); });
        this.globalEventsService.setLayoutData$.subscribe(function (data) { return _this.setLayoutData(data); });
        this.globalEventsService.redirect$.subscribe(function (_a) {
            var route = _a.route, options = _a.options;
            return _this.redirect(route, options);
        });
        this.globalEventsService.toggleLoader$.subscribe(function (active) { return _this.toggleLoader(active); });
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var BasePageComponent = /** @class */ (function () {
    function BasePageComponent(activatedRoute, globalEventsService, onInitMethodNames, onInitialDataLoadedMethodNames) {
        this.activatedRoute = activatedRoute;
        this.globalEventsService = globalEventsService;
        this.onInitMethodNames = onInitMethodNames;
        this.onInitialDataLoadedMethodNames = onInitialDataLoadedMethodNames;
        this.destroyed = new Subject();
    }
    /**
     * @return {?}
     */
    BasePageComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.globalEventsService.initialDataLoaded$.pipe(takeUntil(this.destroyed)).subscribe(function (data) { return _this.initialDataLoaded(data); });
        this.onInitMethodNames.forEach(function (methodName) {
            if (typeof _this[methodName] === 'function') {
                _this[methodName]();
            }
        });
    };
    /**
     * @return {?}
     */
    BasePageComponent.prototype.reset = /**
     * @return {?}
     */
    function () {
        this.queryParams = this.activatedRoute.snapshot.queryParams;
        this.routeParams = this.activatedRoute.snapshot.params;
        this.globalEventsService.pageLoaded({ queryParams: this.queryParams, routeParams: this.routeParams });
    };
    /**
     * @param {?} data
     * @return {?}
     */
    BasePageComponent.prototype.initialDataLoaded = /**
     * @param {?} data
     * @return {?}
     */
    function (data) {
        var _this = this;
        this.loggedInUser = data.user;
        this.queryParams = data.queryParams;
        this.routeParams = data.routeParams;
        this.onInitialDataLoadedMethodNames.forEach(function (methodName) {
            if (typeof _this[methodName] === 'function') {
                _this[methodName](data);
            }
        });
    };
    /**
     * @return {?}
     */
    BasePageComponent.prototype.destructor = /**
     * @return {?}
     */
    function () {
        this.destroyed.next();
        this.destroyed.complete();
    };
    /**
     * @return {?}
     */
    BasePageComponent.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this.destructor();
    };
    return BasePageComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
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
     * @param {?} data
     * @return {?}
     */
    GlobalEventsService.prototype.triggerInitialDataLoad = /**
     * @param {?} data
     * @return {?}
     */
    function (data) {
        this.triggerInitialDataLoadSource.next(data);
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var RequestService = /** @class */ (function () {
    function RequestService(client) {
        this.client = client;
    }
    /**
     * @param {?} method
     * @param {?} url
     * @param {?=} options
     * @return {?}
     */
    RequestService.prototype.run = /**
     * @param {?} method
     * @param {?} url
     * @param {?=} options
     * @return {?}
     */
    function (method, url, options) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            try {
                /** @type {?} */
                var runOptions_1 = (/** @type {?} */ ({}));
                /** @type {?} */
                var requestOptions = (/** @type {?} */ ({}));
                /** @type {?} */
                var body = null;
                if (options && (typeof options === 'object')) {
                    var resolveWithFullResponse = options.resolveWithFullResponse, otherOptions = __rest(options, ["resolveWithFullResponse"]);
                    requestOptions = otherOptions;
                    runOptions_1 = { resolveWithFullResponse: resolveWithFullResponse };
                }
                if (method.toLowerCase() === 'get') {
                    if (!requestOptions || (typeof requestOptions !== 'object')) {
                        requestOptions = {};
                    }
                    /** @type {?} */
                    var optionsParams = requestOptions.params || {};
                    /** @type {?} */
                    var httpParams_1 = new HttpParams();
                    var _loop_1 = function (key) {
                        /** @type {?} */
                        var optParam = optionsParams[key];
                        if ((typeof optParam === 'object') && (optParam !== null)) {
                            if (optParam instanceof Array) {
                                optParam.forEach(function (item) {
                                    if ((typeof item === 'object') && (item !== null)) {
                                        for (var innerKey in item) {
                                            httpParams_1 = httpParams_1.set(key + "[" + innerKey + "]", item[innerKey]);
                                        }
                                        return;
                                    }
                                    httpParams_1 = httpParams_1.set(key + "[]", item);
                                });
                                return "continue";
                            }
                            for (var innerKey in optParam) {
                                httpParams_1 = httpParams_1.set(key + "[" + innerKey + "]", optParam[innerKey]);
                            }
                            return "continue";
                        }
                        httpParams_1 = httpParams_1.set(key, optParam);
                    };
                    for (var key in optionsParams) {
                        _loop_1(key);
                    }
                    httpParams_1 = httpParams_1.set('_', (new Date()).getTime().toString());
                    requestOptions.params = httpParams_1;
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
                _this.client.request(new HttpRequest(method, url, body, requestOptions)).toPromise().then(function (response) { return runOptions_1.resolveWithFullResponse ? resolve(response) : resolve(response.body); }, function (error) { return reject(error); });
            }
            catch (error) {
                reject(error);
            }
        });
    };
    RequestService.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    RequestService.ctorParameters = function () { return [
        { type: HttpClient }
    ]; };
    return RequestService;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var BaseRESTService = /** @class */ (function () {
    function BaseRESTService(globalEventsService, requestService) {
        this.globalEventsService = globalEventsService;
        this.requestService = requestService;
        this.headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        this.baseUrl = '/';
    }
    /**
     * @param {?} err
     * @return {?}
     */
    BaseRESTService.prototype.handleError = /**
     * @param {?} err
     * @return {?}
     */
    function (err) {
        this.globalEventsService.notify('error', err && err.error && err.error.error || 'An error has occurred.');
    };
    /**
     * @param {?} params
     * @return {?}
     */
    BaseRESTService.prototype.create = /**
     * @param {?} params
     * @return {?}
     */
    function (params) {
        /** @type {?} */
        var instance = this;
        return new Promise(function (resolve, reject) {
            co(function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, instance.requestService.run('post', "" + instance.baseUrl, {
                                headers: instance.headers,
                                body: params
                            })];
                        case 1:
                            _a.sent();
                            return [2 /*return*/, { success: true }];
                    }
                });
            }).then(function (res) { return resolve(res); }, function (err) {
                instance.handleError(err);
                reject({ error: true });
            });
        });
    };
    /**
     * @param {?} params
     * @return {?}
     */
    BaseRESTService.prototype.read = /**
     * @param {?} params
     * @return {?}
     */
    function (params) {
        /** @type {?} */
        var instance = this;
        return new Promise(function (resolve, reject) {
            co(function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, instance.requestService.run('get', instance.baseUrl + "/item", {
                                headers: instance.headers,
                                params: params
                            })];
                        case 1: return [2 /*return*/, _a.sent()];
                    }
                });
            }).then(function (res) { return resolve(res); }, function (err) {
                instance.handleError(err);
                reject({ error: true });
            });
        });
    };
    /**
     * @param {?} params
     * @return {?}
     */
    BaseRESTService.prototype.readList = /**
     * @param {?} params
     * @return {?}
     */
    function (params) {
        /** @type {?} */
        var instance = this;
        return new Promise(function (resolve, reject) {
            co(function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, instance.requestService.run('get', "" + instance.baseUrl, {
                                headers: instance.headers,
                                params: params
                            })];
                        case 1: return [2 /*return*/, _a.sent()];
                    }
                });
            }).then(function (res) { return resolve(res); }, function (err) {
                instance.handleError(err);
                reject({ error: true });
            });
        });
    };
    /**
     * @param {?} params
     * @return {?}
     */
    BaseRESTService.prototype.readSelectList = /**
     * @param {?} params
     * @return {?}
     */
    function (params) {
        /** @type {?} */
        var instance = this;
        return new Promise(function (resolve, reject) {
            co(function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, instance.requestService.run('get', instance.baseUrl + "/selectList", {
                                headers: instance.headers,
                                params: params
                            })];
                        case 1: return [2 /*return*/, _a.sent()];
                    }
                });
            }).then(function (res) { return resolve(res); }, function (err) {
                instance.handleError(err);
                reject({ error: true });
            });
        });
    };
    /**
     * @param {?} params
     * @return {?}
     */
    BaseRESTService.prototype.update = /**
     * @param {?} params
     * @return {?}
     */
    function (params) {
        /** @type {?} */
        var instance = this;
        return new Promise(function (resolve, reject) {
            co(function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, instance.requestService.run('patch', instance.baseUrl + "/item/" + params.id, {
                                headers: instance.headers,
                                body: params
                            })];
                        case 1: return [2 /*return*/, _a.sent()];
                    }
                });
            }).then(function (res) { return resolve(res); }, function (err) {
                instance.handleError(err);
                reject({ error: true });
            });
        });
    };
    /**
     * @param {?} params
     * @return {?}
     */
    BaseRESTService.prototype.bulkUpsert = /**
     * @param {?} params
     * @return {?}
     */
    function (params) {
        /** @type {?} */
        var instance = this;
        return new Promise(function (resolve, reject) {
            co(function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, instance.requestService.run('put', "" + instance.baseUrl, {
                                headers: instance.headers,
                                body: params
                            })];
                        case 1: return [2 /*return*/, _a.sent()];
                    }
                });
            }).then(function (res) { return resolve(res); }, function (err) {
                instance.handleError(err);
                reject({ error: true });
            });
        });
    };
    /**
     * @param {?} params
     * @return {?}
     */
    BaseRESTService.prototype.delete = /**
     * @param {?} params
     * @return {?}
     */
    function (params) {
        /** @type {?} */
        var instance = this;
        return new Promise(function (resolve, reject) {
            co(function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, instance.requestService.run('delete', instance.baseUrl + "/" + params.id, {
                                headers: instance.headers,
                                body: params
                            })];
                        case 1: return [2 /*return*/, _a.sent()];
                    }
                });
            }).then(function (res) { return resolve(res); }, function (err) {
                instance.handleError(err);
                reject({ error: true });
            });
        });
    };
    BaseRESTService.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    BaseRESTService.ctorParameters = function () { return [
        { type: GlobalEventsService },
        { type: RequestService }
    ]; };
    return BaseRESTService;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var FilesRESTService = /** @class */ (function () {
    function FilesRESTService(globalEventsService, requestService) {
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
    FilesRESTService.prototype.handleError = /**
     * @param {?} err
     * @return {?}
     */
    function (err) {
        this.globalEventsService.notify('error', err && err.error && err.error.error || 'An error has occurred.');
    };
    /**
     * @param {?} file
     * @param {?} params
     * @param {?=} options
     * @return {?}
     */
    FilesRESTService.prototype.upload = /**
     * @param {?} file
     * @param {?} params
     * @param {?=} options
     * @return {?}
     */
    function (file, params, options) {
        /** @type {?} */
        var instance = this;
        return new Promise(function (resolve, reject) {
            co(function () {
                var fd, key;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            fd = new FormData();
                            fd.append('file', file, file.name);
                            for (key in params) {
                                fd.append(key, params[key]);
                            }
                            instance.headers.set('Content-Type', 'multipart/form-data');
                            return [4 /*yield*/, instance.requestService.run('post', "" + instance.baseUrl, {
                                    headers: instance.headers,
                                    body: fd
                                })];
                        case 1:
                            _a.sent();
                            return [2 /*return*/, { success: true }];
                    }
                });
            }).then(function (res) { return resolve(res); }, function (err) {
                if (options && options.handleError) {
                    instance.handleError(err);
                }
                reject({ error: err || true });
            });
        });
    };
    /**
     * @param {?} params
     * @return {?}
     */
    FilesRESTService.prototype.read = /**
     * @param {?} params
     * @return {?}
     */
    function (params) {
        /** @type {?} */
        var instance = this;
        return new Promise(function (resolve, reject) {
            co(function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, instance.requestService.run('get', instance.baseUrl + "/item", {
                                headers: instance.headers,
                                params: params
                            })];
                        case 1: return [2 /*return*/, _a.sent()];
                    }
                });
            }).then(function (res) { return resolve(res); }, function (err) {
                instance.handleError(err);
                reject({ error: true });
            });
        });
    };
    FilesRESTService.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    FilesRESTService.ctorParameters = function () { return [
        { type: GlobalEventsService },
        { type: RequestService }
    ]; };
    return FilesRESTService;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
var getNested = function (parent, field) {
    if ((typeof parent !== 'object') || (typeof field !== 'string')) {
        return null;
    }
    /** @type {?} */
    var fieldData = field.split('.');
    /** @type {?} */
    var currentElement = parent;
    for (var i in fieldData) {
        /** @type {?} */
        var innerElement = fieldData[i];
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
var setNested = function (parent, field, value) {
    /** @type {?} */
    var fieldNames = field.split('.');
    if (!fieldNames.length) {
        return false;
    }
    /** @type {?} */
    var currentParent = parent;
    /** @type {?} */
    var loopEnd = fieldNames.length - 1;
    for (var i = 0; i < loopEnd; i++) {
        /** @type {?} */
        var fieldName = fieldNames[i];
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
var RamsterUICoreModule = /** @class */ (function () {
    function RamsterUICoreModule() {
    }
    RamsterUICoreModule.decorators = [
        { type: NgModule, args: [{
                    imports: [
                        CommonModule
                    ]
                },] }
    ];
    return RamsterUICoreModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

export { RamsterUICoreModule, BaseLayoutComponent, BasePageComponent, BaseRESTService, FilesRESTService, getNested, setNested, GlobalEventsService, RequestService };

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmFtc3Rlci11aS1jb3JlLmpzLm1hcCIsInNvdXJjZXMiOlsibmc6Ly9yYW1zdGVyLXVpLWNvcmUvY29tcG9uZW50cy9iYXNlLWxheW91dC5jb21wb25lbnQudHMiLCJuZzovL3JhbXN0ZXItdWktY29yZS9jb21wb25lbnRzL2Jhc2UtcGFnZS5jb21wb25lbnQudHMiLCJuZzovL3JhbXN0ZXItdWktY29yZS9zZXJ2aWNlcy9nbG9iYWxFdmVudHMvZ2xvYmFsRXZlbnRzLnNlcnZpY2UudHMiLCJuZzovL3JhbXN0ZXItdWktY29yZS9zZXJ2aWNlcy9yZXF1ZXN0LnNlcnZpY2UudHMiLCJuZzovL3JhbXN0ZXItdWktY29yZS9zZXJ2aWNlcy9iYXNlUkVTVC5zZXJ2aWNlLnRzIiwibmc6Ly9yYW1zdGVyLXVpLWNvcmUvc2VydmljZXMvZmlsZXNSRVNULnNlcnZpY2UudHMiLCJuZzovL3JhbXN0ZXItdWktY29yZS91dGlscy90b29sYmVsdC50cyIsIm5nOi8vcmFtc3Rlci11aS1jb3JlL2luZGV4LnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7T25Jbml0fSBmcm9tICdAYW5ndWxhci9jb3JlJ1xyXG5pbXBvcnQge1JvdXRlcn0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJ1xyXG5cclxuaW1wb3J0IHtHbG9iYWxFdmVudHNTZXJ2aWNlfSBmcm9tICcuLi9zZXJ2aWNlcy9nbG9iYWxFdmVudHMvZ2xvYmFsRXZlbnRzLnNlcnZpY2UnXHJcbmltcG9ydCB7R0VTUmVkaXJlY3RPcHRpb25zSW50ZXJmYWNlfSBmcm9tICcuLi9zZXJ2aWNlcy9nbG9iYWxFdmVudHMvZ2xvYmFsRXZlbnRzLmludGVyZmFjZXMnXHJcblxyXG5cclxuZXhwb3J0IGNsYXNzIEJhc2VMYXlvdXRDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xyXG5cdGluaXRpYWxEYXRhTG9hZGVkOiBib29sZWFuID0gZmFsc2VcclxuXHRsb2FkZXJBY3RpdmU6IGJvb2xlYW4gPSBmYWxzZVxyXG5cdHF1ZXJ5UGFyYW1zOiB7W3g6IHN0cmluZ106IHN0cmluZ30gPSB7fVxyXG5cdHJvdXRlUGFyYW1zOiB7W3g6IHN0cmluZ106IHN0cmluZ30gPSB7fVxyXG5cclxuXHRjb25zdHJ1Y3RvcihcclxuXHRcdHB1YmxpYyBnbG9iYWxFdmVudHNTZXJ2aWNlOiBHbG9iYWxFdmVudHNTZXJ2aWNlLFxyXG5cdFx0cHVibGljIHJvdXRlcjogUm91dGVyXHJcblx0KSB7XHJcblx0fVxyXG5cclxuXHRuZ09uSW5pdCgpOiB2b2lkIHtcclxuXHRcdHRoaXMuZ2xvYmFsRXZlbnRzU2VydmljZS5wYWdlTG9hZGVkJC5zdWJzY3JpYmUoKGRhdGE/OiB7W3g6IHN0cmluZ106IGFueX0pID0+IHRoaXMucGFnZUxvYWRlZChkYXRhKSlcclxuXHRcdHRoaXMuZ2xvYmFsRXZlbnRzU2VydmljZS50cmlnZ2VySW5pdGlhbERhdGFMb2FkJC5zdWJzY3JpYmUoKCkgPT4gdGhpcy5sb2FkSW5pdGlhbERhdGEoKSlcclxuXHRcdHRoaXMuZ2xvYmFsRXZlbnRzU2VydmljZS5zZXRMYXlvdXREYXRhJC5zdWJzY3JpYmUoKGRhdGEpID0+IHRoaXMuc2V0TGF5b3V0RGF0YShkYXRhKSlcclxuXHRcdHRoaXMuZ2xvYmFsRXZlbnRzU2VydmljZS5yZWRpcmVjdCQuc3Vic2NyaWJlKCh7cm91dGUsIG9wdGlvbnN9KSA9PiB0aGlzLnJlZGlyZWN0KHJvdXRlLCBvcHRpb25zKSlcclxuXHRcdHRoaXMuZ2xvYmFsRXZlbnRzU2VydmljZS50b2dnbGVMb2FkZXIkLnN1YnNjcmliZSgoYWN0aXZlKSA9PiB0aGlzLnRvZ2dsZUxvYWRlcihhY3RpdmUpKVxyXG5cdH1cclxuXHJcblx0c2VuZEluaXRpYWxEYXRhTG9hZGVkRXZlbnQoKSB7XHJcblx0XHR0aGlzLmdsb2JhbEV2ZW50c1NlcnZpY2UuaW5pdGlhbERhdGFMb2FkZWQoe3F1ZXJ5UGFyYW1zOiB0aGlzLnF1ZXJ5UGFyYW1zLCByb3V0ZVBhcmFtczogdGhpcy5yb3V0ZVBhcmFtc30pXHJcblx0fVxyXG5cclxuXHJcblx0Ly8gZ2xvYmFsRXZlbnRzU2VydmljZSBoYW5kbGVyc1xyXG5cclxuXHRwYWdlTG9hZGVkKGRhdGE/OiB7W3g6IHN0cmluZ106IGFueX0pOiB2b2lkIHtcclxuXHRcdGlmIChkYXRhKSB7XHJcblx0XHRcdGZvciAoY29uc3Qga2V5IGluIGRhdGEpIHtcclxuXHRcdFx0XHR0aGlzW2tleV0gPSBkYXRhW2tleV1cclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdFx0aWYgKHRoaXMuaW5pdGlhbERhdGFMb2FkZWQpIHtcclxuXHRcdFx0dGhpcy5zZW5kSW5pdGlhbERhdGFMb2FkZWRFdmVudCgpXHJcblx0XHRcdHJldHVyblxyXG5cdFx0fVxyXG5cdFx0dGhpcy5sb2FkSW5pdGlhbERhdGEoKVxyXG5cdH1cclxuXHJcblx0bG9hZEluaXRpYWxEYXRhKCk6IHZvaWQge1xyXG5cdFx0dGhpcy5zZW5kSW5pdGlhbERhdGFMb2FkZWRFdmVudCgpXHJcblx0fVxyXG5cclxuXHRzZXRMYXlvdXREYXRhKGFyZ3M6IHtbeDogc3RyaW5nXTogYW55fSkge1xyXG5cdFx0Zm9yIChjb25zdCBrZXkgaW4gYXJncykge1xyXG5cdFx0XHR0aGlzW2tleV0gPSBhcmdzW2tleV1cclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdHJlZGlyZWN0KHJvdXRlOiBzdHJpbmcsIG9wdGlvbnM6IEdFU1JlZGlyZWN0T3B0aW9uc0ludGVyZmFjZSk6IHZvaWQge1xyXG5cdFx0Y29uc3QgYWN0dWFsT3B0aW9ucyA9IG9wdGlvbnMgfHwge30sXHJcblx0XHRcdHtxdWVyeVBhcmFtcywgcmVsb2FkSW5pdGlhbERhdGF9ID0gYWN0dWFsT3B0aW9uc1xyXG5cdFx0aWYgKHJlbG9hZEluaXRpYWxEYXRhKSB7XHJcblx0XHRcdHRoaXMuaW5pdGlhbERhdGFMb2FkZWQgPSBmYWxzZVxyXG5cdFx0fVxyXG5cdFx0dGhpcy5yb3V0ZXIubmF2aWdhdGUoW3JvdXRlXSwge3F1ZXJ5UGFyYW1zOiBxdWVyeVBhcmFtcyB8fCB7fX0pXHJcblx0fVxyXG5cclxuXHR0b2dnbGVMb2FkZXIoYWN0aXZlOiBib29sZWFuKTogdm9pZCB7XHJcblx0XHR0aGlzLmxvYWRlckFjdGl2ZSA9IGFjdGl2ZVxyXG5cdH1cclxufVxyXG4iLCIndXNlIHN0cmljdCdcclxuXHJcbmltcG9ydCB7QWN0aXZhdGVkUm91dGV9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcidcclxuaW1wb3J0IHtPbkRlc3Ryb3ksIE9uSW5pdH0gZnJvbSAnQGFuZ3VsYXIvY29yZSdcclxuaW1wb3J0IHtTdWJqZWN0fSBmcm9tICdyeGpzJ1xyXG5pbXBvcnQge3Rha2VVbnRpbH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnXHJcblxyXG5pbXBvcnQge0dsb2JhbEV2ZW50c1NlcnZpY2V9IGZyb20gJy4uL3NlcnZpY2VzL2dsb2JhbEV2ZW50cy9nbG9iYWxFdmVudHMuc2VydmljZSdcclxuXHJcbmV4cG9ydCBjbGFzcyBCYXNlUGFnZUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95IHtcclxuXHRkZXN0cm95ZWQ6IFN1YmplY3Q8dm9pZD4gPSBuZXcgU3ViamVjdCgpXHJcblx0bG9nZ2VkSW5Vc2VyPzogYW55XHJcblx0cXVlcnlQYXJhbXM6IHtbeDogc3RyaW5nXTogc3RyaW5nfVxyXG5cdHJvdXRlUGFyYW1zOiB7W3g6IHN0cmluZ106IHN0cmluZ31cclxuXHJcblx0Y29uc3RydWN0b3IoXHJcblx0XHRwdWJsaWMgYWN0aXZhdGVkUm91dGU6IEFjdGl2YXRlZFJvdXRlLFxyXG5cdFx0cHVibGljIGdsb2JhbEV2ZW50c1NlcnZpY2U6IEdsb2JhbEV2ZW50c1NlcnZpY2UsXHJcblx0XHRwdWJsaWMgb25Jbml0TWV0aG9kTmFtZXM6IHN0cmluZ1tdLFxyXG5cdFx0cHVibGljIG9uSW5pdGlhbERhdGFMb2FkZWRNZXRob2ROYW1lczogc3RyaW5nW11cclxuXHQpIHtcclxuXHR9XHJcblxyXG5cdG5nT25Jbml0KCkge1xyXG5cdFx0dGhpcy5nbG9iYWxFdmVudHNTZXJ2aWNlLmluaXRpYWxEYXRhTG9hZGVkJC5waXBlKHRha2VVbnRpbCh0aGlzLmRlc3Ryb3llZCkpLnN1YnNjcmliZSgoZGF0YSkgPT4gdGhpcy5pbml0aWFsRGF0YUxvYWRlZChkYXRhKSlcclxuXHRcdHRoaXMub25Jbml0TWV0aG9kTmFtZXMuZm9yRWFjaCgobWV0aG9kTmFtZSkgPT4ge1xyXG5cdFx0XHRpZiAodHlwZW9mIHRoaXNbbWV0aG9kTmFtZV0gPT09ICdmdW5jdGlvbicpIHtcclxuXHRcdFx0XHR0aGlzW21ldGhvZE5hbWVdKClcclxuXHRcdFx0fVxyXG5cdFx0fSlcclxuXHR9XHJcblxyXG5cdHJlc2V0KCk6IHZvaWQge1xyXG5cdFx0dGhpcy5xdWVyeVBhcmFtcyA9IHRoaXMuYWN0aXZhdGVkUm91dGUuc25hcHNob3QucXVlcnlQYXJhbXNcclxuXHRcdHRoaXMucm91dGVQYXJhbXMgPSB0aGlzLmFjdGl2YXRlZFJvdXRlLnNuYXBzaG90LnBhcmFtc1xyXG5cdFx0dGhpcy5nbG9iYWxFdmVudHNTZXJ2aWNlLnBhZ2VMb2FkZWQoe3F1ZXJ5UGFyYW1zOiB0aGlzLnF1ZXJ5UGFyYW1zLCByb3V0ZVBhcmFtczogdGhpcy5yb3V0ZVBhcmFtc30pXHJcblx0fVxyXG5cclxuXHRpbml0aWFsRGF0YUxvYWRlZChkYXRhKTogdm9pZCB7XHJcblx0XHR0aGlzLmxvZ2dlZEluVXNlciA9IGRhdGEudXNlclxyXG5cdFx0dGhpcy5xdWVyeVBhcmFtcyA9IGRhdGEucXVlcnlQYXJhbXNcclxuXHRcdHRoaXMucm91dGVQYXJhbXMgPSBkYXRhLnJvdXRlUGFyYW1zXHJcblx0XHR0aGlzLm9uSW5pdGlhbERhdGFMb2FkZWRNZXRob2ROYW1lcy5mb3JFYWNoKChtZXRob2ROYW1lKSA9PiB7XHJcblx0XHRcdGlmICh0eXBlb2YgdGhpc1ttZXRob2ROYW1lXSA9PT0gJ2Z1bmN0aW9uJykge1xyXG5cdFx0XHRcdHRoaXNbbWV0aG9kTmFtZV0oZGF0YSlcclxuXHRcdFx0fVxyXG5cdFx0fSlcclxuXHR9XHJcblxyXG5cdGRlc3RydWN0b3IoKSB7XHJcblx0XHR0aGlzLmRlc3Ryb3llZC5uZXh0KClcclxuXHRcdHRoaXMuZGVzdHJveWVkLmNvbXBsZXRlKClcclxuXHR9XHJcblxyXG5cdG5nT25EZXN0cm95KCkge1xyXG5cdFx0dGhpcy5kZXN0cnVjdG9yKClcclxuXHR9XHJcbn1cclxuIiwiaW1wb3J0IHtJbmplY3RhYmxlfSBmcm9tICdAYW5ndWxhci9jb3JlJ1xyXG5pbXBvcnQge1N1YmplY3R9IGZyb20gJ3J4anMnXHJcbmltcG9ydCB7R0VTUmVkaXJlY3RPcHRpb25zSW50ZXJmYWNlfSBmcm9tICcuL2dsb2JhbEV2ZW50cy5pbnRlcmZhY2VzJ1xyXG5cclxuQEluamVjdGFibGUoKVxyXG5leHBvcnQgY2xhc3MgR2xvYmFsRXZlbnRzU2VydmljZSB7XHJcblx0cGFnZUxvYWRlZFNvdXJjZSA9IG5ldyBTdWJqZWN0PHtbeDogc3RyaW5nXTogYW55fSB8IHZvaWQ+KClcclxuXHR0cmlnZ2VySW5pdGlhbERhdGFMb2FkU291cmNlID0gbmV3IFN1YmplY3Q8dm9pZD4oKVxyXG5cdGluaXRpYWxEYXRhTG9hZGVkU291cmNlID0gbmV3IFN1YmplY3Q8YW55PigpXHJcblx0c2V0TGF5b3V0RGF0YVNvdXJjZSA9IG5ldyBTdWJqZWN0PHtbeDogc3RyaW5nXTogYW55fT4oKVxyXG5cdHJlZGlyZWN0U291cmNlID0gbmV3IFN1YmplY3Q8e3JvdXRlOiBzdHJpbmcsIG9wdGlvbnM6IEdFU1JlZGlyZWN0T3B0aW9uc0ludGVyZmFjZX0+KClcclxuXHRub3RpZnlTb3VyY2UgPSBuZXcgU3ViamVjdDx7dHlwZTogc3RyaW5nLCBtZXNzYWdlOiBzdHJpbmd9PigpXHJcblx0dG9nZ2xlTG9hZGVyU291cmNlID0gbmV3IFN1YmplY3Q8Ym9vbGVhbj4oKVxyXG5cclxuXHRwYWdlTG9hZGVkJCA9IHRoaXMucGFnZUxvYWRlZFNvdXJjZS5hc09ic2VydmFibGUoKVxyXG5cdHRyaWdnZXJJbml0aWFsRGF0YUxvYWQkID0gdGhpcy50cmlnZ2VySW5pdGlhbERhdGFMb2FkU291cmNlLmFzT2JzZXJ2YWJsZSgpXHJcblx0aW5pdGlhbERhdGFMb2FkZWQkID0gdGhpcy5pbml0aWFsRGF0YUxvYWRlZFNvdXJjZS5hc09ic2VydmFibGUoKVxyXG5cdHNldExheW91dERhdGEkID0gdGhpcy5zZXRMYXlvdXREYXRhU291cmNlLmFzT2JzZXJ2YWJsZSgpXHJcblx0cmVkaXJlY3QkID0gdGhpcy5yZWRpcmVjdFNvdXJjZS5hc09ic2VydmFibGUoKVxyXG5cdG5vdGlmeSQgPSB0aGlzLm5vdGlmeVNvdXJjZS5hc09ic2VydmFibGUoKVxyXG5cdHRvZ2dsZUxvYWRlciQgPSB0aGlzLnRvZ2dsZUxvYWRlclNvdXJjZS5hc09ic2VydmFibGUoKVxyXG5cclxuXHRwYWdlTG9hZGVkKGRhdGEpOiB2b2lkIHtcclxuXHRcdHRoaXMucGFnZUxvYWRlZFNvdXJjZS5uZXh0KGRhdGEpXHJcblx0fVxyXG5cclxuXHR0cmlnZ2VySW5pdGlhbERhdGFMb2FkKGRhdGEpOiB2b2lkIHtcclxuXHRcdHRoaXMudHJpZ2dlckluaXRpYWxEYXRhTG9hZFNvdXJjZS5uZXh0KGRhdGEpXHJcblx0fVxyXG5cclxuXHRpbml0aWFsRGF0YUxvYWRlZChkYXRhKTogdm9pZCB7XHJcblx0XHR0aGlzLmluaXRpYWxEYXRhTG9hZGVkU291cmNlLm5leHQoZGF0YSlcclxuXHR9XHJcblxyXG5cdHNldExheW91dERhdGEoZGF0YSk6IHZvaWQge1xyXG5cdFx0dGhpcy5zZXRMYXlvdXREYXRhU291cmNlLm5leHQoZGF0YSlcclxuXHR9XHJcblxyXG5cdHJlZGlyZWN0KHJvdXRlOiBzdHJpbmcsIG9wdGlvbnM/OiBHRVNSZWRpcmVjdE9wdGlvbnNJbnRlcmZhY2UpOiB2b2lkIHtcclxuXHRcdHRoaXMucmVkaXJlY3RTb3VyY2UubmV4dCh7cm91dGUsIG9wdGlvbnN9KVxyXG5cdH1cclxuXHJcblx0bm90aWZ5KHR5cGU6IHN0cmluZywgbWVzc2FnZTogc3RyaW5nKTogdm9pZCB7XHJcblx0XHR0aGlzLm5vdGlmeVNvdXJjZS5uZXh0KHt0eXBlLCBtZXNzYWdlfSlcclxuXHR9XHJcblxyXG5cdHRvZ2dsZUxvYWRlcihhY3RpdmU6IGJvb2xlYW4pOiB2b2lkIHtcclxuXHRcdHRoaXMudG9nZ2xlTG9hZGVyU291cmNlLm5leHQoYWN0aXZlKVxyXG5cdH1cclxufVxyXG4iLCJpbXBvcnQge0luamVjdGFibGV9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnXHJcbmltcG9ydCB7SHR0cENsaWVudCwgSHR0cFBhcmFtcywgSHR0cFJlcXVlc3QsIEh0dHBSZXNwb25zZX0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnXHJcblxyXG5cclxuQEluamVjdGFibGUoKVxyXG5leHBvcnQgY2xhc3MgUmVxdWVzdFNlcnZpY2Uge1xyXG5cdGNvbnN0cnVjdG9yKHB1YmxpYyBjbGllbnQ6IEh0dHBDbGllbnQpIHt9XHJcblxyXG5cdHJ1bihtZXRob2Q6IHN0cmluZywgdXJsOiBzdHJpbmcsIG9wdGlvbnM/OiB7W3g6IHN0cmluZ106IGFueX0pIHtcclxuXHRcdHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcblx0XHRcdHRyeSB7XHJcblx0XHRcdFx0bGV0IHJ1bk9wdGlvbnMgPSB7fSBhcyBhbnksXHJcblx0XHRcdFx0XHRyZXF1ZXN0T3B0aW9ucyA9IHt9IGFzIGFueSxcclxuXHRcdFx0XHRcdGJvZHkgPSBudWxsXHJcblx0XHRcdFx0aWYgKG9wdGlvbnMgJiYgKHR5cGVvZiBvcHRpb25zID09PSAnb2JqZWN0JykpIHtcclxuXHRcdFx0XHRcdGxldCB7cmVzb2x2ZVdpdGhGdWxsUmVzcG9uc2UsIC4uLiBvdGhlck9wdGlvbnN9ID0gb3B0aW9uc1xyXG5cdFx0XHRcdFx0cmVxdWVzdE9wdGlvbnMgPSBvdGhlck9wdGlvbnNcclxuXHRcdFx0XHRcdHJ1bk9wdGlvbnMgPSB7cmVzb2x2ZVdpdGhGdWxsUmVzcG9uc2V9XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdGlmIChtZXRob2QudG9Mb3dlckNhc2UoKSA9PT0gJ2dldCcpIHtcclxuXHRcdFx0XHRcdGlmICghcmVxdWVzdE9wdGlvbnMgfHwgKHR5cGVvZiByZXF1ZXN0T3B0aW9ucyAhPT0gJ29iamVjdCcpKSB7XHJcblx0XHRcdFx0XHRcdHJlcXVlc3RPcHRpb25zID0ge31cclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdGNvbnN0IG9wdGlvbnNQYXJhbXMgPSByZXF1ZXN0T3B0aW9ucy5wYXJhbXMgfHwge31cclxuXHRcdFx0XHRcdGxldCBodHRwUGFyYW1zID0gbmV3IEh0dHBQYXJhbXMoKVxyXG5cdFx0XHRcdFx0Zm9yIChjb25zdCBrZXkgaW4gb3B0aW9uc1BhcmFtcykge1xyXG5cdFx0XHRcdFx0XHRjb25zdCBvcHRQYXJhbSA9IG9wdGlvbnNQYXJhbXNba2V5XVxyXG5cdFx0XHRcdFx0XHRpZiAoKHR5cGVvZiBvcHRQYXJhbSA9PT0gJ29iamVjdCcpICYmIChvcHRQYXJhbSAhPT0gbnVsbCkpIHtcclxuXHRcdFx0XHRcdFx0XHRpZiAob3B0UGFyYW0gaW5zdGFuY2VvZiBBcnJheSkge1xyXG5cdFx0XHRcdFx0XHRcdFx0b3B0UGFyYW0uZm9yRWFjaCgoaXRlbSkgPT4ge1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRpZiAoKHR5cGVvZiBpdGVtID09PSAnb2JqZWN0JykgJiYgKGl0ZW0gIT09IG51bGwpKSB7XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0Zm9yIChjb25zdCBpbm5lcktleSBpbiBpdGVtKSB7XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRodHRwUGFyYW1zID0gaHR0cFBhcmFtcy5zZXQoYCR7a2V5fVske2lubmVyS2V5fV1gLCBpdGVtW2lubmVyS2V5XSlcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0cmV0dXJuXHJcblx0XHRcdFx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdFx0XHRcdFx0aHR0cFBhcmFtcyA9IGh0dHBQYXJhbXMuc2V0KGAke2tleX1bXWAsIGl0ZW0pXHJcblx0XHRcdFx0XHRcdFx0XHR9KVxyXG5cdFx0XHRcdFx0XHRcdFx0Y29udGludWVcclxuXHRcdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRcdFx0Zm9yIChjb25zdCBpbm5lcktleSBpbiBvcHRQYXJhbSkge1xyXG5cdFx0XHRcdFx0XHRcdFx0aHR0cFBhcmFtcyA9IGh0dHBQYXJhbXMuc2V0KGAke2tleX1bJHtpbm5lcktleX1dYCwgb3B0UGFyYW1baW5uZXJLZXldKVxyXG5cdFx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdFx0XHRjb250aW51ZVxyXG5cdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRcdGh0dHBQYXJhbXMgPSBodHRwUGFyYW1zLnNldChrZXksIG9wdFBhcmFtKVxyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0aHR0cFBhcmFtcyA9IGh0dHBQYXJhbXMuc2V0KCdfJywgKG5ldyBEYXRlKCkpLmdldFRpbWUoKS50b1N0cmluZygpKVxyXG5cdFx0XHRcdFx0cmVxdWVzdE9wdGlvbnMucGFyYW1zID0gaHR0cFBhcmFtc1xyXG5cdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHRpZiAoIXJlcXVlc3RPcHRpb25zIHx8ICh0eXBlb2YgcmVxdWVzdE9wdGlvbnMgIT09ICdvYmplY3QnKSkge1xyXG5cdFx0XHRcdFx0XHRyZXF1ZXN0T3B0aW9ucyA9IHt9XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRib2R5ID0gKCFyZXF1ZXN0T3B0aW9ucy5ib2R5IHx8ICh0eXBlb2YgcmVxdWVzdE9wdGlvbnMuYm9keSAhPT0gJ29iamVjdCcpKSA/IHt9IDogcmVxdWVzdE9wdGlvbnMuYm9keVxyXG5cdFx0XHRcdFx0Ym9keS5fID0gKG5ldyBEYXRlKCkpLmdldFRpbWUoKVxyXG5cdFx0XHRcdFx0ZGVsZXRlIHJlcXVlc3RPcHRpb25zLmJvZHlcclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0aWYgKCFyZXF1ZXN0T3B0aW9ucy5yZXNwb25zZVR5cGUpIHt9XHJcblx0XHRcdFx0dGhpcy5jbGllbnQucmVxdWVzdChuZXcgSHR0cFJlcXVlc3QobWV0aG9kLCB1cmwsIGJvZHksIHJlcXVlc3RPcHRpb25zKSkudG9Qcm9taXNlKCkudGhlbihcclxuXHRcdFx0XHRcdChyZXNwb25zZTogSHR0cFJlc3BvbnNlPGFueT4pID0+IHJ1bk9wdGlvbnMucmVzb2x2ZVdpdGhGdWxsUmVzcG9uc2UgPyByZXNvbHZlKHJlc3BvbnNlKSA6IHJlc29sdmUocmVzcG9uc2UuYm9keSksXHJcblx0XHRcdFx0XHQoZXJyb3I6IGFueSkgPT4gcmVqZWN0KGVycm9yKVxyXG5cdFx0XHRcdClcclxuXHRcdFx0fSBjYXRjaChlcnJvcikge1xyXG5cdFx0XHRcdHJlamVjdChlcnJvcilcclxuXHRcdFx0fVxyXG5cdFx0fSlcclxuXHR9XHJcbn1cclxuIiwiaW1wb3J0IGNvIGZyb20gJ2NvJ1xyXG5pbXBvcnQge0luamVjdGFibGV9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnXHJcbmltcG9ydCB7SHR0cEhlYWRlcnN9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJ1xyXG5cclxuaW1wb3J0IHtHbG9iYWxFdmVudHNTZXJ2aWNlfSBmcm9tICcuL2dsb2JhbEV2ZW50cy9nbG9iYWxFdmVudHMuc2VydmljZSdcclxuaW1wb3J0IHtSZXF1ZXN0U2VydmljZX0gZnJvbSAnLi9yZXF1ZXN0LnNlcnZpY2UnXHJcblxyXG5ASW5qZWN0YWJsZSgpXHJcbmV4cG9ydCBjbGFzcyBCYXNlUkVTVFNlcnZpY2Uge1xyXG5cdGhlYWRlcnMgPSBuZXcgSHR0cEhlYWRlcnMoeydDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbid9KVxyXG5cdGJhc2VVcmwgPSAnLydcclxuXHJcblx0Y29uc3RydWN0b3IoXHJcblx0XHRwdWJsaWMgZ2xvYmFsRXZlbnRzU2VydmljZTogR2xvYmFsRXZlbnRzU2VydmljZSxcclxuXHRcdHB1YmxpYyByZXF1ZXN0U2VydmljZTogUmVxdWVzdFNlcnZpY2VcclxuXHQpIHt9XHJcblxyXG5cdGhhbmRsZUVycm9yKGVycik6IHZvaWQge1xyXG5cdFx0dGhpcy5nbG9iYWxFdmVudHNTZXJ2aWNlLm5vdGlmeSgnZXJyb3InLCBlcnIgJiYgZXJyLmVycm9yICYmIGVyci5lcnJvci5lcnJvciB8fCAnQW4gZXJyb3IgaGFzIG9jY3VycmVkLicpXHJcblx0fVxyXG5cclxuXHRjcmVhdGUocGFyYW1zKTogUHJvbWlzZTxhbnk+IHtcclxuXHRcdGNvbnN0IGluc3RhbmNlID0gdGhpc1xyXG5cdFx0cmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuXHRcdFx0Y28oZnVuY3Rpb24qKCkge1xyXG5cdFx0XHRcdHlpZWxkIGluc3RhbmNlLnJlcXVlc3RTZXJ2aWNlLnJ1bigncG9zdCcsIGAke2luc3RhbmNlLmJhc2VVcmx9YCwge1xyXG5cdFx0XHRcdFx0aGVhZGVyczogaW5zdGFuY2UuaGVhZGVycyxcclxuXHRcdFx0XHRcdGJvZHk6IHBhcmFtc1xyXG5cdFx0XHRcdH0pXHJcblx0XHRcdFx0cmV0dXJuIHtzdWNjZXNzOiB0cnVlfVxyXG5cdFx0XHR9KS50aGVuKChyZXMpID0+IHJlc29sdmUocmVzKSwgKGVycikgPT4ge1xyXG5cdFx0XHRcdGluc3RhbmNlLmhhbmRsZUVycm9yKGVycilcclxuXHRcdFx0XHRyZWplY3Qoe2Vycm9yOiB0cnVlfSlcclxuXHRcdFx0fSlcclxuXHRcdH0pXHJcblx0fVxyXG5cclxuXHRyZWFkKHBhcmFtcyk6IFByb21pc2U8YW55PiB7XHJcblx0XHRjb25zdCBpbnN0YW5jZSA9IHRoaXNcclxuXHRcdHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcblx0XHRcdGNvKGZ1bmN0aW9uKigpIHtcclxuXHRcdFx0XHRyZXR1cm4geWllbGQgaW5zdGFuY2UucmVxdWVzdFNlcnZpY2UucnVuKCdnZXQnLCBgJHtpbnN0YW5jZS5iYXNlVXJsfS9pdGVtYCwge1xyXG5cdFx0XHRcdFx0aGVhZGVyczogaW5zdGFuY2UuaGVhZGVycyxcclxuXHRcdFx0XHRcdHBhcmFtc1xyXG5cdFx0XHRcdH0pXHJcblx0XHRcdH0pLnRoZW4oKHJlcykgPT4gcmVzb2x2ZShyZXMpLCAoZXJyKSA9PiB7XHJcblx0XHRcdFx0aW5zdGFuY2UuaGFuZGxlRXJyb3IoZXJyKVxyXG5cdFx0XHRcdHJlamVjdCh7ZXJyb3I6IHRydWV9KVxyXG5cdFx0XHR9KVxyXG5cdFx0fSlcclxuXHR9XHJcblxyXG5cdHJlYWRMaXN0KHBhcmFtcyk6IFByb21pc2U8YW55PiB7XHJcblx0XHRjb25zdCBpbnN0YW5jZSA9IHRoaXNcclxuXHRcdHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcblx0XHRcdGNvKGZ1bmN0aW9uKigpIHtcclxuXHRcdFx0XHRyZXR1cm4geWllbGQgaW5zdGFuY2UucmVxdWVzdFNlcnZpY2UucnVuKCdnZXQnLCBgJHtpbnN0YW5jZS5iYXNlVXJsfWAsIHtcclxuXHRcdFx0XHRcdGhlYWRlcnM6IGluc3RhbmNlLmhlYWRlcnMsXHJcblx0XHRcdFx0XHRwYXJhbXNcclxuXHRcdFx0XHR9KVxyXG5cdFx0XHR9KS50aGVuKChyZXMpID0+IHJlc29sdmUocmVzKSwgKGVycikgPT4ge1xyXG5cdFx0XHRcdGluc3RhbmNlLmhhbmRsZUVycm9yKGVycilcclxuXHRcdFx0XHRyZWplY3Qoe2Vycm9yOiB0cnVlfSlcclxuXHRcdFx0fSlcclxuXHRcdH0pXHJcblx0fVxyXG5cclxuXHRyZWFkU2VsZWN0TGlzdChwYXJhbXMpOiBQcm9taXNlPGFueT4ge1xyXG5cdFx0Y29uc3QgaW5zdGFuY2UgPSB0aGlzXHJcblx0XHRyZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG5cdFx0XHRjbyhmdW5jdGlvbiooKSB7XHJcblx0XHRcdFx0cmV0dXJuIHlpZWxkIGluc3RhbmNlLnJlcXVlc3RTZXJ2aWNlLnJ1bignZ2V0JywgYCR7aW5zdGFuY2UuYmFzZVVybH0vc2VsZWN0TGlzdGAsIHtcclxuXHRcdFx0XHRcdGhlYWRlcnM6IGluc3RhbmNlLmhlYWRlcnMsXHJcblx0XHRcdFx0XHRwYXJhbXNcclxuXHRcdFx0XHR9KVxyXG5cdFx0XHR9KS50aGVuKChyZXMpID0+IHJlc29sdmUocmVzKSwgKGVycikgPT4ge1xyXG5cdFx0XHRcdGluc3RhbmNlLmhhbmRsZUVycm9yKGVycilcclxuXHRcdFx0XHRyZWplY3Qoe2Vycm9yOiB0cnVlfSlcclxuXHRcdFx0fSlcclxuXHRcdH0pXHJcblx0fVxyXG5cclxuXHR1cGRhdGUocGFyYW1zKTogUHJvbWlzZTxhbnk+IHtcclxuXHRcdGNvbnN0IGluc3RhbmNlID0gdGhpc1xyXG5cdFx0cmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuXHRcdFx0Y28oZnVuY3Rpb24qKCkge1xyXG5cdFx0XHRcdHJldHVybiB5aWVsZCBpbnN0YW5jZS5yZXF1ZXN0U2VydmljZS5ydW4oJ3BhdGNoJywgYCR7aW5zdGFuY2UuYmFzZVVybH0vaXRlbS8ke3BhcmFtcy5pZH1gLCB7XHJcblx0XHRcdFx0XHRoZWFkZXJzOiBpbnN0YW5jZS5oZWFkZXJzLFxyXG5cdFx0XHRcdFx0Ym9keTogcGFyYW1zXHJcblx0XHRcdFx0fSlcclxuXHRcdFx0fSkudGhlbigocmVzKSA9PiByZXNvbHZlKHJlcyksIChlcnIpID0+IHtcclxuXHRcdFx0XHRpbnN0YW5jZS5oYW5kbGVFcnJvcihlcnIpXHJcblx0XHRcdFx0cmVqZWN0KHtlcnJvcjogdHJ1ZX0pXHJcblx0XHRcdH0pXHJcblx0XHR9KVxyXG5cdH1cclxuXHJcblx0YnVsa1Vwc2VydChwYXJhbXMpOiBQcm9taXNlPGFueT4ge1xyXG5cdFx0Y29uc3QgaW5zdGFuY2UgPSB0aGlzXHJcblx0XHRyZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG5cdFx0XHRjbyhmdW5jdGlvbiooKSB7XHJcblx0XHRcdFx0cmV0dXJuIHlpZWxkIGluc3RhbmNlLnJlcXVlc3RTZXJ2aWNlLnJ1bigncHV0JywgYCR7aW5zdGFuY2UuYmFzZVVybH1gLCB7XHJcblx0XHRcdFx0XHRoZWFkZXJzOiBpbnN0YW5jZS5oZWFkZXJzLFxyXG5cdFx0XHRcdFx0Ym9keTogcGFyYW1zXHJcblx0XHRcdFx0fSlcclxuXHRcdFx0fSkudGhlbigocmVzKSA9PiByZXNvbHZlKHJlcyksIChlcnIpID0+IHtcclxuXHRcdFx0XHRpbnN0YW5jZS5oYW5kbGVFcnJvcihlcnIpXHJcblx0XHRcdFx0cmVqZWN0KHtlcnJvcjogdHJ1ZX0pXHJcblx0XHRcdH0pXHJcblx0XHR9KVxyXG5cdH1cclxuXHJcblx0ZGVsZXRlKHBhcmFtcyk6IFByb21pc2U8YW55PiB7XHJcblx0XHRjb25zdCBpbnN0YW5jZSA9IHRoaXNcclxuXHRcdHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcblx0XHRcdGNvKGZ1bmN0aW9uKigpIHtcclxuXHRcdFx0XHRyZXR1cm4geWllbGQgaW5zdGFuY2UucmVxdWVzdFNlcnZpY2UucnVuKCdkZWxldGUnLCBgJHtpbnN0YW5jZS5iYXNlVXJsfS8ke3BhcmFtcy5pZH1gLCB7XHJcblx0XHRcdFx0XHRoZWFkZXJzOiBpbnN0YW5jZS5oZWFkZXJzLFxyXG5cdFx0XHRcdFx0Ym9keTogcGFyYW1zXHJcblx0XHRcdFx0fSlcclxuXHRcdFx0fSkudGhlbigocmVzKSA9PiByZXNvbHZlKHJlcyksIChlcnIpID0+IHtcclxuXHRcdFx0XHRpbnN0YW5jZS5oYW5kbGVFcnJvcihlcnIpXHJcblx0XHRcdFx0cmVqZWN0KHtlcnJvcjogdHJ1ZX0pXHJcblx0XHRcdH0pXHJcblx0XHR9KVxyXG5cdH1cclxufVxyXG4iLCJpbXBvcnQgY28gZnJvbSAnY28nXHJcbmltcG9ydCB7SW5qZWN0YWJsZX0gZnJvbSAnQGFuZ3VsYXIvY29yZSdcclxuaW1wb3J0IHtIdHRwSGVhZGVyc30gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnXHJcblxyXG5pbXBvcnQge0dsb2JhbEV2ZW50c1NlcnZpY2V9IGZyb20gJy4vZ2xvYmFsRXZlbnRzL2dsb2JhbEV2ZW50cy5zZXJ2aWNlJ1xyXG5pbXBvcnQge1JlcXVlc3RTZXJ2aWNlfSBmcm9tICcuL3JlcXVlc3Quc2VydmljZSdcclxuXHJcbkBJbmplY3RhYmxlKClcclxuZXhwb3J0IGNsYXNzIEZpbGVzUkVTVFNlcnZpY2Uge1xyXG5cdC8vIHsnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nfVxyXG5cdGhlYWRlcnMgPSBuZXcgSHR0cEhlYWRlcnMoKVxyXG5cdGJhc2VVcmwgPSAnL2ZpbGVzJ1xyXG5cclxuXHRjb25zdHJ1Y3RvcihcclxuXHRcdHB1YmxpYyBnbG9iYWxFdmVudHNTZXJ2aWNlOiBHbG9iYWxFdmVudHNTZXJ2aWNlLFxyXG5cdFx0cHVibGljIHJlcXVlc3RTZXJ2aWNlOiBSZXF1ZXN0U2VydmljZVxyXG5cdCkge31cclxuXHJcblx0aGFuZGxlRXJyb3IoZXJyKTogdm9pZCB7XHJcblx0XHR0aGlzLmdsb2JhbEV2ZW50c1NlcnZpY2Uubm90aWZ5KCdlcnJvcicsIGVyciAmJiBlcnIuZXJyb3IgJiYgZXJyLmVycm9yLmVycm9yIHx8ICdBbiBlcnJvciBoYXMgb2NjdXJyZWQuJylcclxuXHR9XHJcblxyXG5cdHVwbG9hZChmaWxlOiBGaWxlLCBwYXJhbXM6IHtvdXRwdXRGaWxlTmFtZTogc3RyaW5nLCBbeDogc3RyaW5nXTogYW55fSwgb3B0aW9ucz86IHtoYW5kbGVFcnJvcj86IGJvb2xlYW59KTogUHJvbWlzZTxhbnk+IHtcclxuXHRcdGNvbnN0IGluc3RhbmNlID0gdGhpc1xyXG5cdFx0cmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuXHRcdFx0Y28oZnVuY3Rpb24qKCkge1xyXG5cdFx0XHRcdGxldCBmZCA9IG5ldyBGb3JtRGF0YSgpXHJcblx0XHRcdFx0ZmQuYXBwZW5kKCdmaWxlJywgZmlsZSwgZmlsZS5uYW1lKVxyXG5cdFx0XHRcdGZvciAoY29uc3Qga2V5IGluIHBhcmFtcykge1xyXG5cdFx0XHRcdFx0ZmQuYXBwZW5kKGtleSwgcGFyYW1zW2tleV0pXHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdGluc3RhbmNlLmhlYWRlcnMuc2V0KCdDb250ZW50LVR5cGUnLCAnbXVsdGlwYXJ0L2Zvcm0tZGF0YScpXHJcblx0XHRcdFx0eWllbGQgaW5zdGFuY2UucmVxdWVzdFNlcnZpY2UucnVuKCdwb3N0JywgYCR7aW5zdGFuY2UuYmFzZVVybH1gLCB7XHJcblx0XHRcdFx0XHRoZWFkZXJzOiBpbnN0YW5jZS5oZWFkZXJzLFxyXG5cdFx0XHRcdFx0Ym9keTogZmRcclxuXHRcdFx0XHR9KVxyXG5cdFx0XHRcdHJldHVybiB7c3VjY2VzczogdHJ1ZX1cclxuXHRcdFx0fSkudGhlbigocmVzKSA9PiByZXNvbHZlKHJlcyksIChlcnIpID0+IHtcclxuXHRcdFx0XHRpZiAob3B0aW9ucyAmJiBvcHRpb25zLmhhbmRsZUVycm9yKSB7XHJcblx0XHRcdFx0XHRpbnN0YW5jZS5oYW5kbGVFcnJvcihlcnIpXHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdHJlamVjdCh7ZXJyb3I6IGVyciB8fCB0cnVlfSlcclxuXHRcdFx0fSlcclxuXHRcdH0pXHJcblx0fVxyXG5cclxuXHRyZWFkKHBhcmFtcyk6IFByb21pc2U8YW55PiB7XHJcblx0XHRjb25zdCBpbnN0YW5jZSA9IHRoaXNcclxuXHRcdHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcblx0XHRcdGNvKGZ1bmN0aW9uKigpIHtcclxuXHRcdFx0XHRyZXR1cm4geWllbGQgaW5zdGFuY2UucmVxdWVzdFNlcnZpY2UucnVuKCdnZXQnLCBgJHtpbnN0YW5jZS5iYXNlVXJsfS9pdGVtYCwge1xyXG5cdFx0XHRcdFx0aGVhZGVyczogaW5zdGFuY2UuaGVhZGVycyxcclxuXHRcdFx0XHRcdHBhcmFtc1xyXG5cdFx0XHRcdH0pXHJcblx0XHRcdH0pLnRoZW4oKHJlcykgPT4gcmVzb2x2ZShyZXMpLCAoZXJyKSA9PiB7XHJcblx0XHRcdFx0aW5zdGFuY2UuaGFuZGxlRXJyb3IoZXJyKVxyXG5cdFx0XHRcdHJlamVjdCh7ZXJyb3I6IHRydWV9KVxyXG5cdFx0XHR9KVxyXG5cdFx0fSlcclxuXHR9XHJcbn1cclxuIiwiZXhwb3J0IGNvbnN0IGdldE5lc3RlZCA9IChwYXJlbnQ6IGFueSwgZmllbGQ6IHN0cmluZyk6IHZvaWQgPT4ge1xyXG5cdGlmICgodHlwZW9mIHBhcmVudCAhPT0gJ29iamVjdCcpIHx8ICh0eXBlb2YgZmllbGQgIT09ICdzdHJpbmcnKSkge1xyXG5cdFx0XHRyZXR1cm4gbnVsbFxyXG5cdFx0fVxyXG5cdGxldCBmaWVsZERhdGEgPSBmaWVsZC5zcGxpdCgnLicpLFxyXG5cdFx0Y3VycmVudEVsZW1lbnQgPSBwYXJlbnRcclxuXHRmb3IgKGxldCBpIGluIGZpZWxkRGF0YSkge1xyXG5cdFx0bGV0IGlubmVyRWxlbWVudCA9IGZpZWxkRGF0YVtpXVxyXG5cdFx0aWYgKGN1cnJlbnRFbGVtZW50ID09PSBudWxsKSB7XHJcblx0XHRcdHJldHVybiBjdXJyZW50RWxlbWVudFxyXG5cdFx0fVxyXG5cdFx0aWYgKCh0eXBlb2YgY3VycmVudEVsZW1lbnQgPT09ICd1bmRlZmluZWQnKSB8fCAodHlwZW9mIGN1cnJlbnRFbGVtZW50W2lubmVyRWxlbWVudF0gPT09ICd1bmRlZmluZWQnKSkge1xyXG5cdFx0XHRyZXR1cm4gY3VycmVudEVsZW1lbnRcclxuXHRcdH1cclxuXHRcdGN1cnJlbnRFbGVtZW50ID0gY3VycmVudEVsZW1lbnRbaW5uZXJFbGVtZW50XVxyXG5cdH1cclxuXHRyZXR1cm4gY3VycmVudEVsZW1lbnRcclxufVxyXG5cclxuZXhwb3J0IGNvbnN0IHNldE5lc3RlZCA9IChwYXJlbnQ6IGFueSwgZmllbGQ6IHN0cmluZywgdmFsdWU6IGFueSk6IGJvb2xlYW4gPT4ge1xyXG5cdGNvbnN0IGZpZWxkTmFtZXMgPSBmaWVsZC5zcGxpdCgnLicpXHJcblx0aWYgKCFmaWVsZE5hbWVzLmxlbmd0aCkge1xyXG5cdFx0cmV0dXJuIGZhbHNlXHJcblx0fVxyXG5cdGxldCBjdXJyZW50UGFyZW50ID0gcGFyZW50LFxyXG5cdFx0bG9vcEVuZCA9IGZpZWxkTmFtZXMubGVuZ3RoIC0gMVxyXG5cdGZvciAobGV0IGkgPSAwOyBpIDwgbG9vcEVuZDsgaSsrKSB7XHJcblx0XHRjb25zdCBmaWVsZE5hbWUgPSBmaWVsZE5hbWVzW2ldXHJcblx0XHRpZiAodHlwZW9mIGN1cnJlbnRQYXJlbnRbZmllbGROYW1lXSA9PT0gJ3VuZGVmaW5lZCcpIHtcclxuXHRcdFx0cmV0dXJuIGZhbHNlXHJcblx0XHR9XHJcblx0XHRjdXJyZW50UGFyZW50ID0gY3VycmVudFBhcmVudFtmaWVsZE5hbWVdXHJcblx0fVxyXG5cdGN1cnJlbnRQYXJlbnRbZmllbGROYW1lc1tsb29wRW5kXV0gPSB2YWx1ZVxyXG5cdHJldHVybiB0cnVlXHJcbn1cclxuIiwiJ3VzZSBzdHJpY3QnXHJcblxyXG4vLyBhbmd1bGFyIGRlcGVuZGVuY2llc1xyXG5pbXBvcnQge0NvbW1vbk1vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJ1xyXG5pbXBvcnQge05nTW9kdWxlfSBmcm9tICdAYW5ndWxhci9jb3JlJ1xyXG5cclxuXHJcbkBOZ01vZHVsZSh7XHJcblx0aW1wb3J0czogW1xyXG5cdFx0Q29tbW9uTW9kdWxlXHJcblx0XVxyXG59KVxyXG5leHBvcnQgY2xhc3MgUmFtc3RlclVJQ29yZU1vZHVsZSB7fVxyXG5cclxuZXhwb3J0ICogZnJvbSAnLi9jb21wb25lbnRzL2Jhc2UtbGF5b3V0LmNvbXBvbmVudCdcclxuZXhwb3J0ICogZnJvbSAnLi9jb21wb25lbnRzL2Jhc2UtcGFnZS5jb21wb25lbnQnXHJcbmV4cG9ydCAqIGZyb20gJy4vc2VydmljZXMvYmFzZVJFU1Quc2VydmljZSdcclxuZXhwb3J0ICogZnJvbSAnLi9zZXJ2aWNlcy9maWxlc1JFU1Quc2VydmljZSdcclxuZXhwb3J0ICogZnJvbSAnLi91dGlscy90b29sYmVsdCdcclxuZXhwb3J0ICogZnJvbSAnLi9zZXJ2aWNlcy9nbG9iYWxFdmVudHMvZ2xvYmFsRXZlbnRzLnNlcnZpY2UnXHJcbmV4cG9ydCAqIGZyb20gJy4vc2VydmljZXMvZ2xvYmFsRXZlbnRzL2dsb2JhbEV2ZW50cy5pbnRlcmZhY2VzJ1xyXG5leHBvcnQgKiBmcm9tICcuL3NlcnZpY2VzL3JlcXVlc3Quc2VydmljZSdcclxuZXhwb3J0ICogZnJvbSAnLi9pbnRlcmZhY2VzL3NlbGVjdExpc3QuaW50ZXJmYWNlJ1xyXG4iXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBT0E7SUFNQyw2QkFDUSxtQkFBd0MsRUFDeEMsTUFBYztRQURkLHdCQUFtQixHQUFuQixtQkFBbUIsQ0FBcUI7UUFDeEMsV0FBTSxHQUFOLE1BQU0sQ0FBUTtRQVB0QixzQkFBaUIsR0FBWSxLQUFLLENBQUE7UUFDbEMsaUJBQVksR0FBWSxLQUFLLENBQUE7UUFDN0IsZ0JBQVcsR0FBMEIsRUFBRSxDQUFBO1FBQ3ZDLGdCQUFXLEdBQTBCLEVBQUUsQ0FBQTtLQU10Qzs7OztJQUVELHNDQUFROzs7SUFBUjtRQUFBLGlCQU1DO1FBTEEsSUFBSSxDQUFDLG1CQUFtQixDQUFDLFdBQVcsQ0FBQyxTQUFTLENBQUMsVUFBQyxJQUF5QixJQUFLLE9BQUEsS0FBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsR0FBQSxDQUFDLENBQUE7UUFDcEcsSUFBSSxDQUFDLG1CQUFtQixDQUFDLHVCQUF1QixDQUFDLFNBQVMsQ0FBQyxjQUFNLE9BQUEsS0FBSSxDQUFDLGVBQWUsRUFBRSxHQUFBLENBQUMsQ0FBQTtRQUN4RixJQUFJLENBQUMsbUJBQW1CLENBQUMsY0FBYyxDQUFDLFNBQVMsQ0FBQyxVQUFDLElBQUksSUFBSyxPQUFBLEtBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLEdBQUEsQ0FBQyxDQUFBO1FBQ3JGLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLFVBQUMsRUFBZ0I7Z0JBQWYsZ0JBQUssRUFBRSxvQkFBTztZQUFNLE9BQUEsS0FBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLEVBQUUsT0FBTyxDQUFDO1NBQUEs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