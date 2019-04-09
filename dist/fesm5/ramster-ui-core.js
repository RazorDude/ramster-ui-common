import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Injectable, Injector, NgModule } from '@angular/core';
import { __generator, __rest } from 'tslib';
import { HttpClient, HttpRequest, HttpHeaders } from '@angular/common/http';
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
    };
    /**
     * @return {?}
     */
    BasePageComponent.prototype.sendPageLoadedEvent = /**
     * @return {?}
     */
    function () {
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var RequestService = /** @class */ (function () {
    function RequestService(client) {
        this.client = client;
    }
    /**
     * @param {?} object
     * @param {?=} parentKey
     * @return {?}
     */
    RequestService.prototype.flattenObjectForQuery = /**
     * @param {?} object
     * @param {?=} parentKey
     * @return {?}
     */
    function (object, parentKey) {
        var _this = this;
        /** @type {?} */
        var returnObject = [];
        if (object instanceof Array) {
            if (!parentKey) {
                throw { error: 'The top-most item cannot be an array.' };
            }
            object.forEach(function (item) {
                if (item === null) {
                    return;
                }
                if ((item instanceof Date) || !(item instanceof Array) || (typeof item !== 'object')) {
                    returnObject.push({ key: parentKey + "[]", value: item });
                    return;
                }
                returnObject = returnObject.concat(_this.flattenObjectForQuery(item, parentKey + "[]"));
                return;
            });
            return returnObject;
        }
        for (var key in object) {
            /** @type {?} */
            var value = object[key];
            if (value === null) {
                continue;
            }
            if ((value instanceof Date) || (typeof value !== 'object')) {
                returnObject.push({ key: parentKey ? parentKey + "[" + key + "]" : key, value: value });
                continue;
            }
            returnObject = returnObject.concat(this.flattenObjectForQuery(value, parentKey ? parentKey + "[" + key + "]" : key));
        }
        return returnObject;
    };
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
                var actualUrl_1 = url;
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
                    var optionsParams = _this.flattenObjectForQuery(requestOptions.params || {});
                    actualUrl_1 += "?_=" + (new Date()).getTime().toString();
                    if (optionsParams.length) {
                        optionsParams.forEach(function (item, index) {
                            actualUrl_1 += "&" + item.key + "=" + item.value;
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
                _this.client.request(new HttpRequest(method, actualUrl_1, body, requestOptions)).toPromise().then(function (response) { return runOptions_1.resolveWithFullResponse ? resolve(response) : resolve(response.body); }, function (error) { return reject(error); });
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
     * @param {?} data
     * @return {?}
     */
    BaseRESTService.prototype.emptyToNull = /**
     * @param {?} data
     * @return {?}
     */
    function (data) {
        var _this = this;
        if (data === '') {
            return null;
        }
        if (data instanceof Date) {
            return data;
        }
        if (data instanceof Array) {
            return data.map(function (item, index) { return _this.emptyToNull(item); });
        }
        if ((typeof data === 'object') && (data !== null)) {
            /** @type {?} */
            var parsedData = {};
            for (var key in data) {
                parsedData[key] = this.emptyToNull(data[key]);
            }
            return parsedData;
        }
        return data;
    };
    /**
     * @param {?} data
     * @return {?}
     */
    BaseRESTService.prototype.stringifyGetParams = /**
     * @param {?} data
     * @return {?}
     */
    function (data) {
        /** @type {?} */
        var stringifiedObject = {};
        for (var key in data) {
            /** @type {?} */
            var value = data[key];
            if ((value instanceof Array) || ((typeof value === 'object') && (value !== null) && !(value instanceof Date))) {
                stringifiedObject["_json_" + key] = JSON.stringify(value);
                continue;
            }
            stringifiedObject[key] = value;
        }
        return stringifiedObject;
    };
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
                                body: instance.emptyToNull(params)
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
                                params: instance.stringifyGetParams(instance.emptyToNull(params))
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
                                params: instance.stringifyGetParams(instance.emptyToNull(params))
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
                                params: instance.stringifyGetParams(instance.emptyToNull(params))
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
                                body: instance.emptyToNull(params)
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
                                body: instance.emptyToNull(params)
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
                                body: instance.emptyToNull(params)
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var ModelRESTServiceProviderService = /** @class */ (function () {
    function ModelRESTServiceProviderService(injector) {
        this.injector = injector;
        this.modelRESTServices = {};
    }
    /**
     * @param {?} componentName
     * @return {?}
     */
    ModelRESTServiceProviderService.prototype.get = /**
     * @param {?} componentName
     * @return {?}
     */
    function (componentName) {
        return this.modelRESTServices[componentName + "ModelRESTService"];
    };
    /**
     * @param {?} data
     * @return {?}
     */
    ModelRESTServiceProviderService.prototype.setServices = /**
     * @param {?} data
     * @return {?}
     */
    function (data) {
        var _this = this;
        this.modelRESTServices = {};
        Object.keys(data).forEach(function (key) {
            _this.modelRESTServices["" + key.charAt(0).toLowerCase() + key.substr(1, key.length)] = _this.injector.get(data[key]);
        });
    };
    ModelRESTServiceProviderService.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    ModelRESTServiceProviderService.ctorParameters = function () { return [
        { type: Injector }
    ]; };
    return ModelRESTServiceProviderService;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
var getNested = function (parent, field) {
    if ((typeof parent !== 'object') || (parent === null) || (typeof field !== 'string') || !field.length) {
        return undefined;
    }
    /** @type {?} */
    var fieldData = field.split('.');
    /** @type {?} */
    var fieldDataLength = fieldData.length;
    /** @type {?} */
    var currentElement = parent;
    var _loop_1 = function (i) {
        if ((typeof currentElement === 'undefined') || (currentElement === null)) {
            return { value: undefined };
        }
        /** @type {?} */
        var innerElementName = fieldData[i]
        // logic for handling sequelize-style $foo.bar$ - should be treated as a single element
        ;
        // logic for handling sequelize-style $foo.bar$ - should be treated as a single element
        if (innerElementName.charAt(0) === '$') {
            /** @type {?} */
            var closingBracketFound = false;
            /** @type {?} */
            var closingBracketIndex = i + 1;
            while (closingBracketIndex < fieldDataLength) {
                /** @type {?} */
                var element = fieldData[closingBracketIndex]
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
                for (var j = i + 1; j <= closingBracketIndex; j++) {
                    innerElementName += "." + fieldData[j];
                }
                i = closingBracketIndex;
            }
        }
        /** @type {?} */
        var nextElement = currentElement[innerElementName];
        if (typeof nextElement === 'undefined') {
            return { value: undefined };
        }
        // if the next element is an array, prepare to return an array of the inner items
        if (nextElement instanceof Array) {
            // if this is the last item, just return the array
            if (i === (fieldDataLength - 1)) {
                return { value: nextElement };
            }
            // if the next item is not an index, recursively call self for each item of the array
            if (isNaN(parseInt(fieldData[i + 1], 10))) {
                currentElement = [];
                /** @type {?} */
                var innerPath_1 = '';
                for (var j = i + 1; j < fieldDataLength; j++) {
                    innerPath_1 += "" + fieldData[j] + (j < (fieldDataLength - 1) ? '.' : '');
                }
                nextElement.forEach(function (item, iIndex) {
                    /** @type {?} */
                    var innerValue = getNested(item, innerPath_1);
                    if (typeof innerValue !== 'undefined') {
                        // if the innerValue is an array too, merge it with the currentElement - this way we can have nested arrays without indexes
                        if (innerValue instanceof Array) {
                            currentElement = currentElement.concat(innerValue);
                            return;
                        }
                        currentElement.push(innerValue);
                    }
                });
                return { value: currentElement };
            }
        }
        currentElement = nextElement;
        out_i_1 = i;
    };
    var out_i_1;
    for (var i = 0; i < fieldDataLength; i++) {
        var state_1 = _loop_1(i);
        i = out_i_1;
        if (typeof state_1 === "object")
            return state_1.value;
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

export { RamsterUICoreModule, BaseLayoutComponent, BasePageComponent, BaseRESTService, FilesRESTService, GlobalEventsService, ModelRESTServiceProviderService, RequestService, getNested, setNested };

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmFtc3Rlci11aS1jb3JlLmpzLm1hcCIsInNvdXJjZXMiOlsibmc6Ly9yYW1zdGVyLXVpLWNvcmUvY29tcG9uZW50cy9iYXNlLWxheW91dC5jb21wb25lbnQudHMiLCJuZzovL3JhbXN0ZXItdWktY29yZS9jb21wb25lbnRzL2Jhc2UtcGFnZS5jb21wb25lbnQudHMiLCJuZzovL3JhbXN0ZXItdWktY29yZS9zZXJ2aWNlcy9nbG9iYWxFdmVudHMvZ2xvYmFsRXZlbnRzLnNlcnZpY2UudHMiLCJuZzovL3JhbXN0ZXItdWktY29yZS9zZXJ2aWNlcy9yZXF1ZXN0LnNlcnZpY2UudHMiLCJuZzovL3JhbXN0ZXItdWktY29yZS9zZXJ2aWNlcy9iYXNlUkVTVC5zZXJ2aWNlLnRzIiwibmc6Ly9yYW1zdGVyLXVpLWNvcmUvc2VydmljZXMvZmlsZXNSRVNULnNlcnZpY2UudHMiLCJuZzovL3JhbXN0ZXItdWktY29yZS9zZXJ2aWNlcy9tb2RlbFJFU1RTZXJ2aWNlUHJvdmlkZXIuc2VydmljZS50cyIsIm5nOi8vcmFtc3Rlci11aS1jb3JlL3V0aWxzL3Rvb2xiZWx0LnRzIiwibmc6Ly9yYW1zdGVyLXVpLWNvcmUvaW5kZXgudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtPbkluaXR9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnXHJcbmltcG9ydCB7Um91dGVyfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInXHJcblxyXG5pbXBvcnQge0dsb2JhbEV2ZW50c1NlcnZpY2V9IGZyb20gJy4uL3NlcnZpY2VzL2dsb2JhbEV2ZW50cy9nbG9iYWxFdmVudHMuc2VydmljZSdcclxuaW1wb3J0IHtHRVNSZWRpcmVjdE9wdGlvbnNJbnRlcmZhY2V9IGZyb20gJy4uL3NlcnZpY2VzL2dsb2JhbEV2ZW50cy9nbG9iYWxFdmVudHMuaW50ZXJmYWNlcydcclxuXHJcblxyXG5leHBvcnQgY2xhc3MgQmFzZUxheW91dENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XHJcblx0aW5pdGlhbERhdGFMb2FkZWQ6IGJvb2xlYW4gPSBmYWxzZVxyXG5cdGxvYWRlckFjdGl2ZTogYm9vbGVhbiA9IGZhbHNlXHJcblx0cXVlcnlQYXJhbXM6IHtbeDogc3RyaW5nXTogc3RyaW5nfSA9IHt9XHJcblx0cm91dGVQYXJhbXM6IHtbeDogc3RyaW5nXTogc3RyaW5nfSA9IHt9XHJcblxyXG5cdGNvbnN0cnVjdG9yKFxyXG5cdFx0cHVibGljIGdsb2JhbEV2ZW50c1NlcnZpY2U6IEdsb2JhbEV2ZW50c1NlcnZpY2UsXHJcblx0XHRwdWJsaWMgcm91dGVyOiBSb3V0ZXJcclxuXHQpIHtcclxuXHR9XHJcblxyXG5cdG5nT25Jbml0KCk6IHZvaWQge1xyXG5cdFx0dGhpcy5nbG9iYWxFdmVudHNTZXJ2aWNlLnBhZ2VMb2FkZWQkLnN1YnNjcmliZSgoZGF0YT86IHtbeDogc3RyaW5nXTogYW55fSkgPT4gdGhpcy5wYWdlTG9hZGVkKGRhdGEpKVxyXG5cdFx0dGhpcy5nbG9iYWxFdmVudHNTZXJ2aWNlLnRyaWdnZXJJbml0aWFsRGF0YUxvYWQkLnN1YnNjcmliZSgoKSA9PiB0aGlzLmxvYWRJbml0aWFsRGF0YSgpKVxyXG5cdFx0dGhpcy5nbG9iYWxFdmVudHNTZXJ2aWNlLnNldExheW91dERhdGEkLnN1YnNjcmliZSgoZGF0YSkgPT4gdGhpcy5zZXRMYXlvdXREYXRhKGRhdGEpKVxyXG5cdFx0dGhpcy5nbG9iYWxFdmVudHNTZXJ2aWNlLnJlZGlyZWN0JC5zdWJzY3JpYmUoKHtyb3V0ZSwgb3B0aW9uc30pID0+IHRoaXMucmVkaXJlY3Qocm91dGUsIG9wdGlvbnMpKVxyXG5cdFx0dGhpcy5nbG9iYWxFdmVudHNTZXJ2aWNlLnRvZ2dsZUxvYWRlciQuc3Vic2NyaWJlKChhY3RpdmUpID0+IHRoaXMudG9nZ2xlTG9hZGVyKGFjdGl2ZSkpXHJcblx0fVxyXG5cclxuXHRzZW5kSW5pdGlhbERhdGFMb2FkZWRFdmVudCgpIHtcclxuXHRcdHRoaXMuZ2xvYmFsRXZlbnRzU2VydmljZS5pbml0aWFsRGF0YUxvYWRlZCh7cXVlcnlQYXJhbXM6IHRoaXMucXVlcnlQYXJhbXMsIHJvdXRlUGFyYW1zOiB0aGlzLnJvdXRlUGFyYW1zfSlcclxuXHR9XHJcblxyXG5cclxuXHQvLyBnbG9iYWxFdmVudHNTZXJ2aWNlIGhhbmRsZXJzXHJcblxyXG5cdHBhZ2VMb2FkZWQoZGF0YT86IHtbeDogc3RyaW5nXTogYW55fSk6IHZvaWQge1xyXG5cdFx0aWYgKGRhdGEpIHtcclxuXHRcdFx0Zm9yIChjb25zdCBrZXkgaW4gZGF0YSkge1xyXG5cdFx0XHRcdHRoaXNba2V5XSA9IGRhdGFba2V5XVxyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0XHRpZiAodGhpcy5pbml0aWFsRGF0YUxvYWRlZCkge1xyXG5cdFx0XHR0aGlzLnNlbmRJbml0aWFsRGF0YUxvYWRlZEV2ZW50KClcclxuXHRcdFx0cmV0dXJuXHJcblx0XHR9XHJcblx0XHR0aGlzLmxvYWRJbml0aWFsRGF0YSgpXHJcblx0fVxyXG5cclxuXHRsb2FkSW5pdGlhbERhdGEoKTogdm9pZCB7XHJcblx0XHR0aGlzLnNlbmRJbml0aWFsRGF0YUxvYWRlZEV2ZW50KClcclxuXHR9XHJcblxyXG5cdHNldExheW91dERhdGEoYXJnczoge1t4OiBzdHJpbmddOiBhbnl9KSB7XHJcblx0XHRmb3IgKGNvbnN0IGtleSBpbiBhcmdzKSB7XHJcblx0XHRcdHRoaXNba2V5XSA9IGFyZ3Nba2V5XVxyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0cmVkaXJlY3Qocm91dGU6IHN0cmluZywgb3B0aW9uczogR0VTUmVkaXJlY3RPcHRpb25zSW50ZXJmYWNlKTogdm9pZCB7XHJcblx0XHRjb25zdCBhY3R1YWxPcHRpb25zID0gb3B0aW9ucyB8fCB7fSxcclxuXHRcdFx0e3F1ZXJ5UGFyYW1zLCByZWxvYWRJbml0aWFsRGF0YX0gPSBhY3R1YWxPcHRpb25zXHJcblx0XHRpZiAocmVsb2FkSW5pdGlhbERhdGEpIHtcclxuXHRcdFx0dGhpcy5pbml0aWFsRGF0YUxvYWRlZCA9IGZhbHNlXHJcblx0XHR9XHJcblx0XHR0aGlzLnJvdXRlci5uYXZpZ2F0ZShbcm91dGVdLCB7cXVlcnlQYXJhbXM6IHF1ZXJ5UGFyYW1zIHx8IHt9fSlcclxuXHR9XHJcblxyXG5cdHRvZ2dsZUxvYWRlcihhY3RpdmU6IGJvb2xlYW4pOiB2b2lkIHtcclxuXHRcdHRoaXMubG9hZGVyQWN0aXZlID0gYWN0aXZlXHJcblx0fVxyXG59XHJcbiIsIid1c2Ugc3RyaWN0J1xyXG5cclxuaW1wb3J0IHtBY3RpdmF0ZWRSb3V0ZX0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJ1xyXG5pbXBvcnQge09uRGVzdHJveSwgT25Jbml0fSBmcm9tICdAYW5ndWxhci9jb3JlJ1xyXG5pbXBvcnQge1N1YmplY3R9IGZyb20gJ3J4anMnXHJcbmltcG9ydCB7dGFrZVVudGlsfSBmcm9tICdyeGpzL29wZXJhdG9ycydcclxuXHJcbmltcG9ydCB7R2xvYmFsRXZlbnRzU2VydmljZX0gZnJvbSAnLi4vc2VydmljZXMvZ2xvYmFsRXZlbnRzL2dsb2JhbEV2ZW50cy5zZXJ2aWNlJ1xyXG5cclxuZXhwb3J0IGNsYXNzIEJhc2VQYWdlQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3kge1xyXG5cdGRlc3Ryb3llZDogU3ViamVjdDx2b2lkPiA9IG5ldyBTdWJqZWN0KClcclxuXHRsb2dnZWRJblVzZXI/OiBhbnlcclxuXHRxdWVyeVBhcmFtczoge1t4OiBzdHJpbmddOiBzdHJpbmd9XHJcblx0cm91dGVQYXJhbXM6IHtbeDogc3RyaW5nXTogc3RyaW5nfVxyXG5cclxuXHRjb25zdHJ1Y3RvcihcclxuXHRcdHB1YmxpYyBhY3RpdmF0ZWRSb3V0ZTogQWN0aXZhdGVkUm91dGUsXHJcblx0XHRwdWJsaWMgZ2xvYmFsRXZlbnRzU2VydmljZTogR2xvYmFsRXZlbnRzU2VydmljZSxcclxuXHRcdHB1YmxpYyBvbkluaXRNZXRob2ROYW1lczogc3RyaW5nW10sXHJcblx0XHRwdWJsaWMgb25Jbml0aWFsRGF0YUxvYWRlZE1ldGhvZE5hbWVzOiBzdHJpbmdbXVxyXG5cdCkge1xyXG5cdH1cclxuXHJcblx0bmdPbkluaXQoKSB7XHJcblx0XHR0aGlzLmdsb2JhbEV2ZW50c1NlcnZpY2UuaW5pdGlhbERhdGFMb2FkZWQkLnBpcGUodGFrZVVudGlsKHRoaXMuZGVzdHJveWVkKSkuc3Vic2NyaWJlKChkYXRhKSA9PiB0aGlzLmluaXRpYWxEYXRhTG9hZGVkKGRhdGEpKVxyXG5cdFx0dGhpcy5vbkluaXRNZXRob2ROYW1lcy5mb3JFYWNoKChtZXRob2ROYW1lKSA9PiB7XHJcblx0XHRcdGlmICh0eXBlb2YgdGhpc1ttZXRob2ROYW1lXSA9PT0gJ2Z1bmN0aW9uJykge1xyXG5cdFx0XHRcdHRoaXNbbWV0aG9kTmFtZV0oKVxyXG5cdFx0XHR9XHJcblx0XHR9KVxyXG5cdH1cclxuXHJcblx0cmVzZXQoKTogdm9pZCB7XHJcblx0XHR0aGlzLnF1ZXJ5UGFyYW1zID0gdGhpcy5hY3RpdmF0ZWRSb3V0ZS5zbmFwc2hvdC5xdWVyeVBhcmFtc1xyXG5cdFx0dGhpcy5yb3V0ZVBhcmFtcyA9IHRoaXMuYWN0aXZhdGVkUm91dGUuc25hcHNob3QucGFyYW1zXHJcblx0fVxyXG5cclxuXHRzZW5kUGFnZUxvYWRlZEV2ZW50KCkge1xyXG5cdFx0dGhpcy5nbG9iYWxFdmVudHNTZXJ2aWNlLnBhZ2VMb2FkZWQoe3F1ZXJ5UGFyYW1zOiB0aGlzLnF1ZXJ5UGFyYW1zLCByb3V0ZVBhcmFtczogdGhpcy5yb3V0ZVBhcmFtc30pXHJcblx0fVxyXG5cclxuXHRpbml0aWFsRGF0YUxvYWRlZChkYXRhKTogdm9pZCB7XHJcblx0XHR0aGlzLmxvZ2dlZEluVXNlciA9IGRhdGEudXNlclxyXG5cdFx0dGhpcy5xdWVyeVBhcmFtcyA9IGRhdGEucXVlcnlQYXJhbXNcclxuXHRcdHRoaXMucm91dGVQYXJhbXMgPSBkYXRhLnJvdXRlUGFyYW1zXHJcblx0XHR0aGlzLm9uSW5pdGlhbERhdGFMb2FkZWRNZXRob2ROYW1lcy5mb3JFYWNoKChtZXRob2ROYW1lKSA9PiB7XHJcblx0XHRcdGlmICh0eXBlb2YgdGhpc1ttZXRob2ROYW1lXSA9PT0gJ2Z1bmN0aW9uJykge1xyXG5cdFx0XHRcdHRoaXNbbWV0aG9kTmFtZV0oZGF0YSlcclxuXHRcdFx0fVxyXG5cdFx0fSlcclxuXHR9XHJcblxyXG5cdGRlc3RydWN0b3IoKSB7XHJcblx0XHR0aGlzLmRlc3Ryb3llZC5uZXh0KClcclxuXHRcdHRoaXMuZGVzdHJveWVkLmNvbXBsZXRlKClcclxuXHR9XHJcblxyXG5cdG5nT25EZXN0cm95KCkge1xyXG5cdFx0dGhpcy5kZXN0cnVjdG9yKClcclxuXHR9XHJcbn1cclxuIiwiaW1wb3J0IHtJbmplY3RhYmxlfSBmcm9tICdAYW5ndWxhci9jb3JlJ1xyXG5pbXBvcnQge1N1YmplY3R9IGZyb20gJ3J4anMnXHJcbmltcG9ydCB7R0VTUmVkaXJlY3RPcHRpb25zSW50ZXJmYWNlfSBmcm9tICcuL2dsb2JhbEV2ZW50cy5pbnRlcmZhY2VzJ1xyXG5cclxuQEluamVjdGFibGUoKVxyXG5leHBvcnQgY2xhc3MgR2xvYmFsRXZlbnRzU2VydmljZSB7XHJcblx0cGFnZUxvYWRlZFNvdXJjZSA9IG5ldyBTdWJqZWN0PHtbeDogc3RyaW5nXTogYW55fSB8IHZvaWQ+KClcclxuXHR0cmlnZ2VySW5pdGlhbERhdGFMb2FkU291cmNlID0gbmV3IFN1YmplY3Q8dm9pZD4oKVxyXG5cdGluaXRpYWxEYXRhTG9hZGVkU291cmNlID0gbmV3IFN1YmplY3Q8YW55PigpXHJcblx0c2V0TGF5b3V0RGF0YVNvdXJjZSA9IG5ldyBTdWJqZWN0PHtbeDogc3RyaW5nXTogYW55fT4oKVxyXG5cdHJlZGlyZWN0U291cmNlID0gbmV3IFN1YmplY3Q8e3JvdXRlOiBzdHJpbmcsIG9wdGlvbnM6IEdFU1JlZGlyZWN0T3B0aW9uc0ludGVyZmFjZX0+KClcclxuXHRub3RpZnlTb3VyY2UgPSBuZXcgU3ViamVjdDx7dHlwZTogc3RyaW5nLCBtZXNzYWdlOiBzdHJpbmd9PigpXHJcblx0dG9nZ2xlTG9hZGVyU291cmNlID0gbmV3IFN1YmplY3Q8Ym9vbGVhbj4oKVxyXG5cclxuXHRwYWdlTG9hZGVkJCA9IHRoaXMucGFnZUxvYWRlZFNvdXJjZS5hc09ic2VydmFibGUoKVxyXG5cdHRyaWdnZXJJbml0aWFsRGF0YUxvYWQkID0gdGhpcy50cmlnZ2VySW5pdGlhbERhdGFMb2FkU291cmNlLmFzT2JzZXJ2YWJsZSgpXHJcblx0aW5pdGlhbERhdGFMb2FkZWQkID0gdGhpcy5pbml0aWFsRGF0YUxvYWRlZFNvdXJjZS5hc09ic2VydmFibGUoKVxyXG5cdHNldExheW91dERhdGEkID0gdGhpcy5zZXRMYXlvdXREYXRhU291cmNlLmFzT2JzZXJ2YWJsZSgpXHJcblx0cmVkaXJlY3QkID0gdGhpcy5yZWRpcmVjdFNvdXJjZS5hc09ic2VydmFibGUoKVxyXG5cdG5vdGlmeSQgPSB0aGlzLm5vdGlmeVNvdXJjZS5hc09ic2VydmFibGUoKVxyXG5cdHRvZ2dsZUxvYWRlciQgPSB0aGlzLnRvZ2dsZUxvYWRlclNvdXJjZS5hc09ic2VydmFibGUoKVxyXG5cclxuXHRwYWdlTG9hZGVkKGRhdGEpOiB2b2lkIHtcclxuXHRcdHRoaXMucGFnZUxvYWRlZFNvdXJjZS5uZXh0KGRhdGEpXHJcblx0fVxyXG5cclxuXHR0cmlnZ2VySW5pdGlhbERhdGFMb2FkKCk6IHZvaWQge1xyXG5cdFx0dGhpcy50cmlnZ2VySW5pdGlhbERhdGFMb2FkU291cmNlLm5leHQoKVxyXG5cdH1cclxuXHJcblx0aW5pdGlhbERhdGFMb2FkZWQoZGF0YSk6IHZvaWQge1xyXG5cdFx0dGhpcy5pbml0aWFsRGF0YUxvYWRlZFNvdXJjZS5uZXh0KGRhdGEpXHJcblx0fVxyXG5cclxuXHRzZXRMYXlvdXREYXRhKGRhdGEpOiB2b2lkIHtcclxuXHRcdHRoaXMuc2V0TGF5b3V0RGF0YVNvdXJjZS5uZXh0KGRhdGEpXHJcblx0fVxyXG5cclxuXHRyZWRpcmVjdChyb3V0ZTogc3RyaW5nLCBvcHRpb25zPzogR0VTUmVkaXJlY3RPcHRpb25zSW50ZXJmYWNlKTogdm9pZCB7XHJcblx0XHR0aGlzLnJlZGlyZWN0U291cmNlLm5leHQoe3JvdXRlLCBvcHRpb25zfSlcclxuXHR9XHJcblxyXG5cdG5vdGlmeSh0eXBlOiBzdHJpbmcsIG1lc3NhZ2U6IHN0cmluZyk6IHZvaWQge1xyXG5cdFx0dGhpcy5ub3RpZnlTb3VyY2UubmV4dCh7dHlwZSwgbWVzc2FnZX0pXHJcblx0fVxyXG5cclxuXHR0b2dnbGVMb2FkZXIoYWN0aXZlOiBib29sZWFuKTogdm9pZCB7XHJcblx0XHR0aGlzLnRvZ2dsZUxvYWRlclNvdXJjZS5uZXh0KGFjdGl2ZSlcclxuXHR9XHJcbn1cclxuIiwiaW1wb3J0IHtJbmplY3RhYmxlfSBmcm9tICdAYW5ndWxhci9jb3JlJ1xyXG5pbXBvcnQge0h0dHBDbGllbnQsIEh0dHBSZXF1ZXN0LCBIdHRwUmVzcG9uc2V9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJ1xyXG5cclxuXHJcbkBJbmplY3RhYmxlKClcclxuZXhwb3J0IGNsYXNzIFJlcXVlc3RTZXJ2aWNlIHtcclxuXHRjb25zdHJ1Y3RvcihwdWJsaWMgY2xpZW50OiBIdHRwQ2xpZW50KSB7fVxyXG5cclxuXHRmbGF0dGVuT2JqZWN0Rm9yUXVlcnkob2JqZWN0OiB7W3g6IHN0cmluZ106IGFueX0gfCBhbnlbXSwgcGFyZW50S2V5Pzogc3RyaW5nKToge2tleTogc3RyaW5nLCB2YWx1ZTogYW55fVtdIHtcclxuXHRcdGxldCByZXR1cm5PYmplY3QgPSBbXVxyXG5cdFx0aWYgKG9iamVjdCBpbnN0YW5jZW9mIEFycmF5KSB7XHJcblx0XHRcdGlmICghcGFyZW50S2V5KSB7XHJcblx0XHRcdFx0dGhyb3cge2Vycm9yOiAnVGhlIHRvcC1tb3N0IGl0ZW0gY2Fubm90IGJlIGFuIGFycmF5Lid9XHJcblx0XHRcdH1cclxuXHRcdFx0b2JqZWN0LmZvckVhY2goKGl0ZW0pID0+IHtcclxuXHRcdFx0XHRpZiAoaXRlbSA9PT0gbnVsbCkge1xyXG5cdFx0XHRcdFx0cmV0dXJuXHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdGlmICgoaXRlbSBpbnN0YW5jZW9mIERhdGUpIHx8ICEoaXRlbSBpbnN0YW5jZW9mIEFycmF5KSAgfHwgKHR5cGVvZiBpdGVtICE9PSAnb2JqZWN0JykpIHtcclxuXHRcdFx0XHRcdHJldHVybk9iamVjdC5wdXNoKHtrZXk6IGAke3BhcmVudEtleX1bXWAsIHZhbHVlOiBpdGVtfSlcclxuXHRcdFx0XHRcdHJldHVyblxyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHRyZXR1cm5PYmplY3QgPSByZXR1cm5PYmplY3QuY29uY2F0KHRoaXMuZmxhdHRlbk9iamVjdEZvclF1ZXJ5KGl0ZW0sIGAke3BhcmVudEtleX1bXWApKVxyXG5cdFx0XHRcdHJldHVyblxyXG5cdFx0XHR9KVxyXG5cdFx0XHRyZXR1cm4gcmV0dXJuT2JqZWN0XHJcblx0XHR9XHJcblx0XHRmb3IgKGNvbnN0IGtleSBpbiBvYmplY3QpIHtcclxuXHRcdFx0Y29uc3QgdmFsdWUgPSBvYmplY3Rba2V5XVxyXG5cdFx0XHRpZiAodmFsdWUgPT09IG51bGwpIHtcclxuXHRcdFx0XHRjb250aW51ZVxyXG5cdFx0XHR9XHJcblx0XHRcdGlmICgodmFsdWUgaW5zdGFuY2VvZiBEYXRlKSB8fCAodHlwZW9mIHZhbHVlICE9PSAnb2JqZWN0JykpIHtcclxuXHRcdFx0XHRyZXR1cm5PYmplY3QucHVzaCh7a2V5OiBwYXJlbnRLZXkgPyBgJHtwYXJlbnRLZXl9WyR7a2V5fV1gOiBrZXksIHZhbHVlfSlcclxuXHRcdFx0XHRjb250aW51ZVxyXG5cdFx0XHR9XHJcblx0XHRcdHJldHVybk9iamVjdCA9IHJldHVybk9iamVjdC5jb25jYXQodGhpcy5mbGF0dGVuT2JqZWN0Rm9yUXVlcnkodmFsdWUsIHBhcmVudEtleSA/IGAke3BhcmVudEtleX1bJHtrZXl9XWAgOiBrZXkpKVxyXG5cdFx0fVxyXG5cdFx0cmV0dXJuIHJldHVybk9iamVjdFxyXG5cdH1cclxuXHJcblx0cnVuKG1ldGhvZDogc3RyaW5nLCB1cmw6IHN0cmluZywgb3B0aW9ucz86IHtbeDogc3RyaW5nXTogYW55fSkge1xyXG5cdFx0cmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuXHRcdFx0dHJ5IHtcclxuXHRcdFx0XHRsZXQgYWN0dWFsVXJsID0gdXJsLFxyXG5cdFx0XHRcdFx0cnVuT3B0aW9ucyA9IHt9IGFzIGFueSxcclxuXHRcdFx0XHRcdHJlcXVlc3RPcHRpb25zID0ge30gYXMgYW55LFxyXG5cdFx0XHRcdFx0Ym9keSA9IG51bGxcclxuXHRcdFx0XHRpZiAob3B0aW9ucyAmJiAodHlwZW9mIG9wdGlvbnMgPT09ICdvYmplY3QnKSkge1xyXG5cdFx0XHRcdFx0bGV0IHtyZXNvbHZlV2l0aEZ1bGxSZXNwb25zZSwgLi4uIG90aGVyT3B0aW9uc30gPSBvcHRpb25zXHJcblx0XHRcdFx0XHRyZXF1ZXN0T3B0aW9ucyA9IG90aGVyT3B0aW9uc1xyXG5cdFx0XHRcdFx0cnVuT3B0aW9ucyA9IHtyZXNvbHZlV2l0aEZ1bGxSZXNwb25zZX1cclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0aWYgKG1ldGhvZC50b0xvd2VyQ2FzZSgpID09PSAnZ2V0Jykge1xyXG5cdFx0XHRcdFx0aWYgKCFyZXF1ZXN0T3B0aW9ucyB8fCAodHlwZW9mIHJlcXVlc3RPcHRpb25zICE9PSAnb2JqZWN0JykpIHtcclxuXHRcdFx0XHRcdFx0cmVxdWVzdE9wdGlvbnMgPSB7fVxyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0Y29uc3Qgb3B0aW9uc1BhcmFtcyA9IHRoaXMuZmxhdHRlbk9iamVjdEZvclF1ZXJ5KHJlcXVlc3RPcHRpb25zLnBhcmFtcyB8fCB7fSlcclxuXHRcdFx0XHRcdGFjdHVhbFVybCArPSBgP189JHsobmV3IERhdGUoKSkuZ2V0VGltZSgpLnRvU3RyaW5nKCl9YFxyXG5cdFx0XHRcdFx0aWYgKG9wdGlvbnNQYXJhbXMubGVuZ3RoKSB7XHJcblx0XHRcdFx0XHRcdG9wdGlvbnNQYXJhbXMuZm9yRWFjaCgoaXRlbSwgaW5kZXgpID0+IHtcclxuXHRcdFx0XHRcdFx0XHRhY3R1YWxVcmwgKz0gYCYke2l0ZW0ua2V5fT0ke2l0ZW0udmFsdWV9YFxyXG5cdFx0XHRcdFx0XHR9KVxyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHRpZiAoIXJlcXVlc3RPcHRpb25zIHx8ICh0eXBlb2YgcmVxdWVzdE9wdGlvbnMgIT09ICdvYmplY3QnKSkge1xyXG5cdFx0XHRcdFx0XHRyZXF1ZXN0T3B0aW9ucyA9IHt9XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRib2R5ID0gKCFyZXF1ZXN0T3B0aW9ucy5ib2R5IHx8ICh0eXBlb2YgcmVxdWVzdE9wdGlvbnMuYm9keSAhPT0gJ29iamVjdCcpKSA/IHt9IDogcmVxdWVzdE9wdGlvbnMuYm9keVxyXG5cdFx0XHRcdFx0Ym9keS5fID0gKG5ldyBEYXRlKCkpLmdldFRpbWUoKVxyXG5cdFx0XHRcdFx0ZGVsZXRlIHJlcXVlc3RPcHRpb25zLmJvZHlcclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0Ly8gaWYgKCFyZXF1ZXN0T3B0aW9ucy5yZXNwb25zZVR5cGUpIHt9XHJcblx0XHRcdFx0dGhpcy5jbGllbnQucmVxdWVzdChuZXcgSHR0cFJlcXVlc3QobWV0aG9kLCBhY3R1YWxVcmwsIGJvZHksIHJlcXVlc3RPcHRpb25zKSkudG9Qcm9taXNlKCkudGhlbihcclxuXHRcdFx0XHRcdChyZXNwb25zZTogSHR0cFJlc3BvbnNlPGFueT4pID0+IHJ1bk9wdGlvbnMucmVzb2x2ZVdpdGhGdWxsUmVzcG9uc2UgPyByZXNvbHZlKHJlc3BvbnNlKSA6IHJlc29sdmUocmVzcG9uc2UuYm9keSksXHJcblx0XHRcdFx0XHQoZXJyb3I6IGFueSkgPT4gcmVqZWN0KGVycm9yKVxyXG5cdFx0XHRcdClcclxuXHRcdFx0fSBjYXRjaChlcnJvcikge1xyXG5cdFx0XHRcdHJlamVjdChlcnJvcilcclxuXHRcdFx0fVxyXG5cdFx0fSlcclxuXHR9XHJcbn1cclxuIiwiaW1wb3J0IGNvIGZyb20gJ2NvJ1xyXG5pbXBvcnQge0luamVjdGFibGV9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnXHJcbmltcG9ydCB7SHR0cEhlYWRlcnN9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJ1xyXG5cclxuaW1wb3J0IHtHbG9iYWxFdmVudHNTZXJ2aWNlfSBmcm9tICcuL2dsb2JhbEV2ZW50cy9nbG9iYWxFdmVudHMuc2VydmljZSdcclxuaW1wb3J0IHtSZXF1ZXN0U2VydmljZX0gZnJvbSAnLi9yZXF1ZXN0LnNlcnZpY2UnXHJcblxyXG5ASW5qZWN0YWJsZSgpXHJcbmV4cG9ydCBjbGFzcyBCYXNlUkVTVFNlcnZpY2Uge1xyXG5cdGhlYWRlcnMgPSBuZXcgSHR0cEhlYWRlcnMoeydDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbid9KVxyXG5cdGJhc2VVcmwgPSAnLydcclxuXHJcblx0Y29uc3RydWN0b3IoXHJcblx0XHRwdWJsaWMgZ2xvYmFsRXZlbnRzU2VydmljZTogR2xvYmFsRXZlbnRzU2VydmljZSxcclxuXHRcdHB1YmxpYyByZXF1ZXN0U2VydmljZTogUmVxdWVzdFNlcnZpY2VcclxuXHQpIHt9XHJcblxyXG5cdGVtcHR5VG9OdWxsKGRhdGE6IGFueSk6IGFueSB7XHJcblx0XHRpZiAoZGF0YSA9PT0gJycpIHtcclxuXHRcdFx0cmV0dXJuIG51bGxcclxuXHRcdH1cclxuXHRcdGlmIChkYXRhIGluc3RhbmNlb2YgRGF0ZSkge1xyXG5cdFx0XHRyZXR1cm4gZGF0YVxyXG5cdFx0fVxyXG5cdFx0aWYgKGRhdGEgaW5zdGFuY2VvZiBBcnJheSkge1xyXG5cdFx0XHRyZXR1cm4gZGF0YS5tYXAoKGl0ZW0sIGluZGV4KSA9PiB0aGlzLmVtcHR5VG9OdWxsKGl0ZW0pKVxyXG5cdFx0fVxyXG5cdFx0aWYgKCh0eXBlb2YgZGF0YSA9PT0gJ29iamVjdCcpICYmIChkYXRhICE9PSBudWxsKSkge1xyXG5cdFx0XHRjb25zdCBwYXJzZWREYXRhID0ge31cclxuXHRcdFx0Zm9yIChjb25zdCBrZXkgaW4gZGF0YSkge1xyXG5cdFx0XHRcdHBhcnNlZERhdGFba2V5XSA9IHRoaXMuZW1wdHlUb051bGwoZGF0YVtrZXldKVxyXG5cdFx0XHR9XHJcblx0XHRcdHJldHVybiBwYXJzZWREYXRhXHJcblx0XHR9XHJcblx0XHRyZXR1cm4gZGF0YVxyXG5cdH1cclxuXHJcblx0c3RyaW5naWZ5R2V0UGFyYW1zKGRhdGE6IHtba2V5OiBzdHJpbmddOiBhbnl9KToge1trZXk6IHN0cmluZ106IGFueX0ge1xyXG5cdFx0bGV0IHN0cmluZ2lmaWVkT2JqZWN0ID0ge31cclxuXHRcdGZvciAoY29uc3Qga2V5IGluIGRhdGEpIHtcclxuXHRcdFx0Y29uc3QgdmFsdWUgPSBkYXRhW2tleV1cclxuXHRcdFx0aWYgKCh2YWx1ZSBpbnN0YW5jZW9mIEFycmF5KSB8fCAoKHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcpICYmICh2YWx1ZSAhPT0gbnVsbCkgJiYgISh2YWx1ZSBpbnN0YW5jZW9mIERhdGUpKSkge1xyXG5cdFx0XHRcdHN0cmluZ2lmaWVkT2JqZWN0W2BfanNvbl8ke2tleX1gXSA9IEpTT04uc3RyaW5naWZ5KHZhbHVlKVxyXG5cdFx0XHRcdGNvbnRpbnVlXHJcblx0XHRcdH1cclxuXHRcdFx0c3RyaW5naWZpZWRPYmplY3Rba2V5XSA9IHZhbHVlXHJcblx0XHR9XHJcblx0XHRyZXR1cm4gc3RyaW5naWZpZWRPYmplY3RcclxuXHR9XHJcblxyXG5cdGhhbmRsZUVycm9yKGVycik6IHZvaWQge1xyXG5cdFx0dGhpcy5nbG9iYWxFdmVudHNTZXJ2aWNlLm5vdGlmeSgnZXJyb3InLCBlcnIgJiYgZXJyLmVycm9yICYmIGVyci5lcnJvci5lcnJvciB8fCAnQW4gZXJyb3IgaGFzIG9jY3VycmVkLicpXHJcblx0fVxyXG5cclxuXHRjcmVhdGUocGFyYW1zKTogUHJvbWlzZTxhbnk+IHtcclxuXHRcdGNvbnN0IGluc3RhbmNlID0gdGhpc1xyXG5cdFx0cmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuXHRcdFx0Y28oZnVuY3Rpb24qKCkge1xyXG5cdFx0XHRcdHJldHVybiB5aWVsZCBpbnN0YW5jZS5yZXF1ZXN0U2VydmljZS5ydW4oJ3Bvc3QnLCBgJHtpbnN0YW5jZS5iYXNlVXJsfWAsIHtcclxuXHRcdFx0XHRcdGhlYWRlcnM6IGluc3RhbmNlLmhlYWRlcnMsXHJcblx0XHRcdFx0XHRib2R5OiBpbnN0YW5jZS5lbXB0eVRvTnVsbChwYXJhbXMpXHJcblx0XHRcdFx0fSlcclxuXHRcdFx0fSkudGhlbigocmVzKSA9PiByZXNvbHZlKHJlcyksIChlcnIpID0+IHtcclxuXHRcdFx0XHRpbnN0YW5jZS5oYW5kbGVFcnJvcihlcnIpXHJcblx0XHRcdFx0cmVqZWN0KHtlcnJvcjogdHJ1ZX0pXHJcblx0XHRcdH0pXHJcblx0XHR9KVxyXG5cdH1cclxuXHJcblx0cmVhZChwYXJhbXMpOiBQcm9taXNlPGFueT4ge1xyXG5cdFx0Y29uc3QgaW5zdGFuY2UgPSB0aGlzXHJcblx0XHRyZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG5cdFx0XHRjbyhmdW5jdGlvbiooKSB7XHJcblx0XHRcdFx0cmV0dXJuIHlpZWxkIGluc3RhbmNlLnJlcXVlc3RTZXJ2aWNlLnJ1bignZ2V0JywgYCR7aW5zdGFuY2UuYmFzZVVybH0vaXRlbWAsIHtcclxuXHRcdFx0XHRcdGhlYWRlcnM6IGluc3RhbmNlLmhlYWRlcnMsXHJcblx0XHRcdFx0XHRwYXJhbXM6IGluc3RhbmNlLnN0cmluZ2lmeUdldFBhcmFtcyhpbnN0YW5jZS5lbXB0eVRvTnVsbChwYXJhbXMpKVxyXG5cdFx0XHRcdH0pXHJcblx0XHRcdH0pLnRoZW4oKHJlcykgPT4gcmVzb2x2ZShyZXMpLCAoZXJyKSA9PiB7XHJcblx0XHRcdFx0aW5zdGFuY2UuaGFuZGxlRXJyb3IoZXJyKVxyXG5cdFx0XHRcdHJlamVjdCh7ZXJyb3I6IHRydWV9KVxyXG5cdFx0XHR9KVxyXG5cdFx0fSlcclxuXHR9XHJcblxyXG5cdHJlYWRMaXN0KHBhcmFtcyk6IFByb21pc2U8YW55PiB7XHJcblx0XHRjb25zdCBpbnN0YW5jZSA9IHRoaXNcclxuXHRcdHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcblx0XHRcdGNvKGZ1bmN0aW9uKigpIHtcclxuXHRcdFx0XHRyZXR1cm4geWllbGQgaW5zdGFuY2UucmVxdWVzdFNlcnZpY2UucnVuKCdnZXQnLCBgJHtpbnN0YW5jZS5iYXNlVXJsfWAsIHtcclxuXHRcdFx0XHRcdGhlYWRlcnM6IGluc3RhbmNlLmhlYWRlcnMsXHJcblx0XHRcdFx0XHRwYXJhbXM6IGluc3RhbmNlLnN0cmluZ2lmeUdldFBhcmFtcyhpbnN0YW5jZS5lbXB0eVRvTnVsbChwYXJhbXMpKVxyXG5cdFx0XHRcdH0pXHJcblx0XHRcdH0pLnRoZW4oKHJlcykgPT4gcmVzb2x2ZShyZXMpLCAoZXJyKSA9PiB7XHJcblx0XHRcdFx0aW5zdGFuY2UuaGFuZGxlRXJyb3IoZXJyKVxyXG5cdFx0XHRcdHJlamVjdCh7ZXJyb3I6IHRydWV9KVxyXG5cdFx0XHR9KVxyXG5cdFx0fSlcclxuXHR9XHJcblxyXG5cdHJlYWRTZWxlY3RMaXN0KHBhcmFtcyk6IFByb21pc2U8YW55PiB7XHJcblx0XHRjb25zdCBpbnN0YW5jZSA9IHRoaXNcclxuXHRcdHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcblx0XHRcdGNvKGZ1bmN0aW9uKigpIHtcclxuXHRcdFx0XHRyZXR1cm4geWllbGQgaW5zdGFuY2UucmVxdWVzdFNlcnZpY2UucnVuKCdnZXQnLCBgJHtpbnN0YW5jZS5iYXNlVXJsfS9zZWxlY3RMaXN0YCwge1xyXG5cdFx0XHRcdFx0aGVhZGVyczogaW5zdGFuY2UuaGVhZGVycyxcclxuXHRcdFx0XHRcdHBhcmFtczogaW5zdGFuY2Uuc3RyaW5naWZ5R2V0UGFyYW1zKGluc3RhbmNlLmVtcHR5VG9OdWxsKHBhcmFtcykpXHJcblx0XHRcdFx0fSlcclxuXHRcdFx0fSkudGhlbigocmVzKSA9PiByZXNvbHZlKHJlcyksIChlcnIpID0+IHtcclxuXHRcdFx0XHRpbnN0YW5jZS5oYW5kbGVFcnJvcihlcnIpXHJcblx0XHRcdFx0cmVqZWN0KHtlcnJvcjogdHJ1ZX0pXHJcblx0XHRcdH0pXHJcblx0XHR9KVxyXG5cdH1cclxuXHJcblx0dXBkYXRlKHBhcmFtcyk6IFByb21pc2U8YW55PiB7XHJcblx0XHRjb25zdCBpbnN0YW5jZSA9IHRoaXNcclxuXHRcdHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcblx0XHRcdGNvKGZ1bmN0aW9uKigpIHtcclxuXHRcdFx0XHRyZXR1cm4geWllbGQgaW5zdGFuY2UucmVxdWVzdFNlcnZpY2UucnVuKCdwYXRjaCcsIGAke2luc3RhbmNlLmJhc2VVcmx9L2l0ZW0vJHtwYXJhbXMuaWR9YCwge1xyXG5cdFx0XHRcdFx0aGVhZGVyczogaW5zdGFuY2UuaGVhZGVycyxcclxuXHRcdFx0XHRcdGJvZHk6IGluc3RhbmNlLmVtcHR5VG9OdWxsKHBhcmFtcylcclxuXHRcdFx0XHR9KVxyXG5cdFx0XHR9KS50aGVuKChyZXMpID0+IHJlc29sdmUocmVzKSwgKGVycikgPT4ge1xyXG5cdFx0XHRcdGluc3RhbmNlLmhhbmRsZUVycm9yKGVycilcclxuXHRcdFx0XHRyZWplY3Qoe2Vycm9yOiB0cnVlfSlcclxuXHRcdFx0fSlcclxuXHRcdH0pXHJcblx0fVxyXG5cclxuXHRidWxrVXBzZXJ0KHBhcmFtcyk6IFByb21pc2U8YW55PiB7XHJcblx0XHRjb25zdCBpbnN0YW5jZSA9IHRoaXNcclxuXHRcdHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcblx0XHRcdGNvKGZ1bmN0aW9uKigpIHtcclxuXHRcdFx0XHRyZXR1cm4geWllbGQgaW5zdGFuY2UucmVxdWVzdFNlcnZpY2UucnVuKCdwdXQnLCBgJHtpbnN0YW5jZS5iYXNlVXJsfWAsIHtcclxuXHRcdFx0XHRcdGhlYWRlcnM6IGluc3RhbmNlLmhlYWRlcnMsXHJcblx0XHRcdFx0XHRib2R5OiBpbnN0YW5jZS5lbXB0eVRvTnVsbChwYXJhbXMpXHJcblx0XHRcdFx0fSlcclxuXHRcdFx0fSkudGhlbigocmVzKSA9PiByZXNvbHZlKHJlcyksIChlcnIpID0+IHtcclxuXHRcdFx0XHRpbnN0YW5jZS5oYW5kbGVFcnJvcihlcnIpXHJcblx0XHRcdFx0cmVqZWN0KHtlcnJvcjogdHJ1ZX0pXHJcblx0XHRcdH0pXHJcblx0XHR9KVxyXG5cdH1cclxuXHJcblx0ZGVsZXRlKHBhcmFtcyk6IFByb21pc2U8YW55PiB7XHJcblx0XHRjb25zdCBpbnN0YW5jZSA9IHRoaXNcclxuXHRcdHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcblx0XHRcdGNvKGZ1bmN0aW9uKigpIHtcclxuXHRcdFx0XHRyZXR1cm4geWllbGQgaW5zdGFuY2UucmVxdWVzdFNlcnZpY2UucnVuKCdkZWxldGUnLCBgJHtpbnN0YW5jZS5iYXNlVXJsfS8ke3BhcmFtcy5pZH1gLCB7XHJcblx0XHRcdFx0XHRoZWFkZXJzOiBpbnN0YW5jZS5oZWFkZXJzLFxyXG5cdFx0XHRcdFx0Ym9keTogaW5zdGFuY2UuZW1wdHlUb051bGwocGFyYW1zKVxyXG5cdFx0XHRcdH0pXHJcblx0XHRcdH0pLnRoZW4oKHJlcykgPT4gcmVzb2x2ZShyZXMpLCAoZXJyKSA9PiB7XHJcblx0XHRcdFx0aW5zdGFuY2UuaGFuZGxlRXJyb3IoZXJyKVxyXG5cdFx0XHRcdHJlamVjdCh7ZXJyb3I6IHRydWV9KVxyXG5cdFx0XHR9KVxyXG5cdFx0fSlcclxuXHR9XHJcbn1cclxuIiwiaW1wb3J0IGNvIGZyb20gJ2NvJ1xyXG5pbXBvcnQge0luamVjdGFibGV9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnXHJcbmltcG9ydCB7SHR0cEhlYWRlcnN9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJ1xyXG5cclxuaW1wb3J0IHtHbG9iYWxFdmVudHNTZXJ2aWNlfSBmcm9tICcuL2dsb2JhbEV2ZW50cy9nbG9iYWxFdmVudHMuc2VydmljZSdcclxuaW1wb3J0IHtSZXF1ZXN0U2VydmljZX0gZnJvbSAnLi9yZXF1ZXN0LnNlcnZpY2UnXHJcblxyXG5ASW5qZWN0YWJsZSgpXHJcbmV4cG9ydCBjbGFzcyBGaWxlc1JFU1RTZXJ2aWNlIHtcclxuXHQvLyB7J0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJ31cclxuXHRoZWFkZXJzID0gbmV3IEh0dHBIZWFkZXJzKClcclxuXHRiYXNlVXJsID0gJy9maWxlcydcclxuXHJcblx0Y29uc3RydWN0b3IoXHJcblx0XHRwdWJsaWMgZ2xvYmFsRXZlbnRzU2VydmljZTogR2xvYmFsRXZlbnRzU2VydmljZSxcclxuXHRcdHB1YmxpYyByZXF1ZXN0U2VydmljZTogUmVxdWVzdFNlcnZpY2VcclxuXHQpIHt9XHJcblxyXG5cdGhhbmRsZUVycm9yKGVycik6IHZvaWQge1xyXG5cdFx0dGhpcy5nbG9iYWxFdmVudHNTZXJ2aWNlLm5vdGlmeSgnZXJyb3InLCBlcnIgJiYgZXJyLmVycm9yICYmIGVyci5lcnJvci5lcnJvciB8fCAnQW4gZXJyb3IgaGFzIG9jY3VycmVkLicpXHJcblx0fVxyXG5cclxuXHR1cGxvYWQoZmlsZTogRmlsZSwgcGFyYW1zOiB7b3V0cHV0RmlsZU5hbWU6IHN0cmluZywgW3g6IHN0cmluZ106IGFueX0sIG9wdGlvbnM/OiB7aGFuZGxlRXJyb3I/OiBib29sZWFufSk6IFByb21pc2U8YW55PiB7XHJcblx0XHRjb25zdCBpbnN0YW5jZSA9IHRoaXNcclxuXHRcdHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcblx0XHRcdGNvKGZ1bmN0aW9uKigpIHtcclxuXHRcdFx0XHRsZXQgZmQgPSBuZXcgRm9ybURhdGEoKVxyXG5cdFx0XHRcdGZkLmFwcGVuZCgnZmlsZScsIGZpbGUsIGZpbGUubmFtZSlcclxuXHRcdFx0XHRmb3IgKGNvbnN0IGtleSBpbiBwYXJhbXMpIHtcclxuXHRcdFx0XHRcdGZkLmFwcGVuZChrZXksIHBhcmFtc1trZXldKVxyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHRpbnN0YW5jZS5oZWFkZXJzLnNldCgnQ29udGVudC1UeXBlJywgJ211bHRpcGFydC9mb3JtLWRhdGEnKVxyXG5cdFx0XHRcdHlpZWxkIGluc3RhbmNlLnJlcXVlc3RTZXJ2aWNlLnJ1bigncG9zdCcsIGAke2luc3RhbmNlLmJhc2VVcmx9YCwge1xyXG5cdFx0XHRcdFx0aGVhZGVyczogaW5zdGFuY2UuaGVhZGVycyxcclxuXHRcdFx0XHRcdGJvZHk6IGZkXHJcblx0XHRcdFx0fSlcclxuXHRcdFx0XHRyZXR1cm4ge3N1Y2Nlc3M6IHRydWV9XHJcblx0XHRcdH0pLnRoZW4oKHJlcykgPT4gcmVzb2x2ZShyZXMpLCAoZXJyKSA9PiB7XHJcblx0XHRcdFx0aWYgKG9wdGlvbnMgJiYgb3B0aW9ucy5oYW5kbGVFcnJvcikge1xyXG5cdFx0XHRcdFx0aW5zdGFuY2UuaGFuZGxlRXJyb3IoZXJyKVxyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHRyZWplY3Qoe2Vycm9yOiBlcnIgfHwgdHJ1ZX0pXHJcblx0XHRcdH0pXHJcblx0XHR9KVxyXG5cdH1cclxuXHJcblx0cmVhZChwYXJhbXMpOiBQcm9taXNlPGFueT4ge1xyXG5cdFx0Y29uc3QgaW5zdGFuY2UgPSB0aGlzXHJcblx0XHRyZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG5cdFx0XHRjbyhmdW5jdGlvbiooKSB7XHJcblx0XHRcdFx0cmV0dXJuIHlpZWxkIGluc3RhbmNlLnJlcXVlc3RTZXJ2aWNlLnJ1bignZ2V0JywgYCR7aW5zdGFuY2UuYmFzZVVybH0vaXRlbWAsIHtcclxuXHRcdFx0XHRcdGhlYWRlcnM6IGluc3RhbmNlLmhlYWRlcnMsXHJcblx0XHRcdFx0XHRwYXJhbXNcclxuXHRcdFx0XHR9KVxyXG5cdFx0XHR9KS50aGVuKChyZXMpID0+IHJlc29sdmUocmVzKSwgKGVycikgPT4ge1xyXG5cdFx0XHRcdGluc3RhbmNlLmhhbmRsZUVycm9yKGVycilcclxuXHRcdFx0XHRyZWplY3Qoe2Vycm9yOiB0cnVlfSlcclxuXHRcdFx0fSlcclxuXHRcdH0pXHJcblx0fVxyXG59XHJcbiIsImltcG9ydCB7QmFzZVJFU1RTZXJ2aWNlfSBmcm9tICcuLi9pbmRleCdcbmltcG9ydCB7SW5qZWN0YWJsZSwgSW5qZWN0b3J9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnXG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBNb2RlbFJFU1RTZXJ2aWNlUHJvdmlkZXJTZXJ2aWNlIHtcblx0bW9kZWxSRVNUU2VydmljZXM6IHtba2V5OiBzdHJpbmddOiBCYXNlUkVTVFNlcnZpY2V9ID0ge31cblxuXHRjb25zdHJ1Y3Rvcihcblx0XHRwdWJsaWMgaW5qZWN0b3I6IEluamVjdG9yXG5cdCkge1xuXHR9XG5cblx0Z2V0KGNvbXBvbmVudE5hbWU6IHN0cmluZyk6IEJhc2VSRVNUU2VydmljZSB7XG5cdFx0cmV0dXJuIHRoaXMubW9kZWxSRVNUU2VydmljZXNbYCR7Y29tcG9uZW50TmFtZX1Nb2RlbFJFU1RTZXJ2aWNlYF1cblx0fVxuXG5cdHNldFNlcnZpY2VzKGRhdGE6IHtba2V5OiBzdHJpbmddOiBCYXNlUkVTVFNlcnZpY2V9KTogdm9pZCB7XG5cdFx0dGhpcy5tb2RlbFJFU1RTZXJ2aWNlcyA9IHt9XG5cdFx0T2JqZWN0LmtleXMoZGF0YSkuZm9yRWFjaCgoa2V5KSA9PiB7XG5cdFx0XHR0aGlzLm1vZGVsUkVTVFNlcnZpY2VzW2Ake2tleS5jaGFyQXQoMCkudG9Mb3dlckNhc2UoKX0ke2tleS5zdWJzdHIoMSwga2V5Lmxlbmd0aCl9YF0gPSB0aGlzLmluamVjdG9yLmdldChkYXRhW2tleV0pXG5cdFx0fSlcblx0fVxufVxuIiwiZXhwb3J0IGNvbnN0IGdldE5lc3RlZCA9IChwYXJlbnQ6IGFueSwgZmllbGQ6IHN0cmluZyk6IGFueSA9PiB7XHJcblx0aWYgKCh0eXBlb2YgcGFyZW50ICE9PSAnb2JqZWN0JykgfHwgKHBhcmVudCA9PT0gbnVsbCkgfHwgKHR5cGVvZiBmaWVsZCAhPT0gJ3N0cmluZycpIHx8ICFmaWVsZC5sZW5ndGgpIHtcclxuXHRcdHJldHVybiB1bmRlZmluZWRcclxuXHR9XHJcblx0bGV0IGZpZWxkRGF0YSA9IGZpZWxkLnNwbGl0KCcuJyksXHJcblx0XHRmaWVsZERhdGFMZW5ndGggPSBmaWVsZERhdGEubGVuZ3RoLFxyXG5cdFx0Y3VycmVudEVsZW1lbnQgPSBwYXJlbnRcclxuXHRmb3IgKGxldCBpID0gMDsgaSA8IGZpZWxkRGF0YUxlbmd0aDsgaSsrKSB7XHJcblx0XHRpZiAoKHR5cGVvZiBjdXJyZW50RWxlbWVudCA9PT0gJ3VuZGVmaW5lZCcpIHx8IChjdXJyZW50RWxlbWVudCA9PT0gbnVsbCkpIHtcclxuXHRcdFx0cmV0dXJuIHVuZGVmaW5lZFxyXG5cdFx0fVxyXG5cdFx0bGV0IGlubmVyRWxlbWVudE5hbWUgPSBmaWVsZERhdGFbaV1cclxuXHRcdC8vIGxvZ2ljIGZvciBoYW5kbGluZyBzZXF1ZWxpemUtc3R5bGUgJGZvby5iYXIkIC0gc2hvdWxkIGJlIHRyZWF0ZWQgYXMgYSBzaW5nbGUgZWxlbWVudFxyXG5cdFx0aWYgKGlubmVyRWxlbWVudE5hbWUuY2hhckF0KDApID09PSAnJCcpIHtcclxuXHRcdFx0bGV0IGNsb3NpbmdCcmFja2V0Rm91bmQgPSBmYWxzZSxcclxuXHRcdFx0XHRjbG9zaW5nQnJhY2tldEluZGV4ID0gaSArIDFcclxuXHRcdFx0d2hpbGUgKGNsb3NpbmdCcmFja2V0SW5kZXggPCBmaWVsZERhdGFMZW5ndGgpIHtcclxuXHRcdFx0XHRjb25zdCBlbGVtZW50ID0gZmllbGREYXRhW2Nsb3NpbmdCcmFja2V0SW5kZXhdXHJcblx0XHRcdFx0Ly8gZmFsc2UgYWxhcm0gLSB0aGVyZSdzIGFub3RoZXIgJCBvcGVuaW5nIGJlZm9yZSB0aGUgY3VycmVudCBvbmUgY2xvc2VkIC0gc28gdGhlIGN1cnJlbnQgb25lIG11c3QgYmUganVzdCBhIHZhcmlhYmxlIG5hbWUsIG5vdCBhIGJyYWNrZXRcclxuXHRcdFx0XHRpZiAoZWxlbWVudC5jaGFyQXQoMCkgPT09ICckJykge1xyXG5cdFx0XHRcdFx0YnJlYWtcclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0Ly8gZm91bmQgaXQgIVxyXG5cdFx0XHRcdGlmIChlbGVtZW50LmNoYXJBdChlbGVtZW50Lmxlbmd0aCAtIDEpID09PSAnJCcpIHtcclxuXHRcdFx0XHRcdGNsb3NpbmdCcmFja2V0Rm91bmQgPSB0cnVlXHJcblx0XHRcdFx0XHRicmVha1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHRjbG9zaW5nQnJhY2tldEluZGV4KytcclxuXHRcdFx0fVxyXG5cdFx0XHRpZiAoY2xvc2luZ0JyYWNrZXRGb3VuZCkge1xyXG5cdFx0XHRcdGZvciAobGV0IGogPSBpICsgMTsgaiA8PSBjbG9zaW5nQnJhY2tldEluZGV4OyBqKyspIHtcclxuXHRcdFx0XHRcdGlubmVyRWxlbWVudE5hbWUgKz0gYC4ke2ZpZWxkRGF0YVtqXX1gXHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdGkgPSBjbG9zaW5nQnJhY2tldEluZGV4XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHRcdGxldCBuZXh0RWxlbWVudCA9IGN1cnJlbnRFbGVtZW50W2lubmVyRWxlbWVudE5hbWVdXHJcblx0XHRpZiAodHlwZW9mIG5leHRFbGVtZW50ID09PSAndW5kZWZpbmVkJykge1xyXG5cdFx0XHRyZXR1cm4gdW5kZWZpbmVkXHJcblx0XHR9XHJcblx0XHQvLyBpZiB0aGUgbmV4dCBlbGVtZW50IGlzIGFuIGFycmF5LCBwcmVwYXJlIHRvIHJldHVybiBhbiBhcnJheSBvZiB0aGUgaW5uZXIgaXRlbXNcclxuXHRcdGlmIChuZXh0RWxlbWVudCBpbnN0YW5jZW9mIEFycmF5KSB7XHJcblx0XHRcdC8vIGlmIHRoaXMgaXMgdGhlIGxhc3QgaXRlbSwganVzdCByZXR1cm4gdGhlIGFycmF5XHJcblx0XHRcdGlmIChpID09PSAoZmllbGREYXRhTGVuZ3RoIC0gMSkpIHtcclxuXHRcdFx0XHRyZXR1cm4gbmV4dEVsZW1lbnRcclxuXHRcdFx0fVxyXG5cdFx0XHQvLyBpZiB0aGUgbmV4dCBpdGVtIGlzIG5vdCBhbiBpbmRleCwgcmVjdXJzaXZlbHkgY2FsbCBzZWxmIGZvciBlYWNoIGl0ZW0gb2YgdGhlIGFycmF5XHJcblx0XHRcdGlmIChpc05hTihwYXJzZUludChmaWVsZERhdGFbaSArIDFdLCAxMCkpKSB7XHJcblx0XHRcdFx0Y3VycmVudEVsZW1lbnQgPSBbXVxyXG5cdFx0XHRcdGxldCBpbm5lclBhdGggPSAnJ1xyXG5cdFx0XHRcdGZvciAobGV0IGogPSBpICsgMTsgaiA8IGZpZWxkRGF0YUxlbmd0aDsgaisrKSB7XHJcblx0XHRcdFx0XHRpbm5lclBhdGggKz0gYCR7ZmllbGREYXRhW2pdfSR7aiA8IChmaWVsZERhdGFMZW5ndGggLSAxKSA/ICcuJyA6ICcnfWBcclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0bmV4dEVsZW1lbnQuZm9yRWFjaCgoaXRlbSwgaUluZGV4KSA9PiB7XHJcblx0XHRcdFx0XHRsZXQgaW5uZXJWYWx1ZSA9IGdldE5lc3RlZChpdGVtLCBpbm5lclBhdGgpXHJcblx0XHRcdFx0XHRpZiAodHlwZW9mIGlubmVyVmFsdWUgIT09ICd1bmRlZmluZWQnKSB7XHJcblx0XHRcdFx0XHRcdC8vIGlmIHRoZSBpbm5lclZhbHVlIGlzIGFuIGFycmF5IHRvbywgbWVyZ2UgaXQgd2l0aCB0aGUgY3VycmVudEVsZW1lbnQgLSB0aGlzIHdheSB3ZSBjYW4gaGF2ZSBuZXN0ZWQgYXJyYXlzIHdpdGhvdXQgaW5kZXhlc1xyXG5cdFx0XHRcdFx0XHRpZiAoaW5uZXJWYWx1ZSBpbnN0YW5jZW9mIEFycmF5KSB7XHJcblx0XHRcdFx0XHRcdFx0Y3VycmVudEVsZW1lbnQgPSBjdXJyZW50RWxlbWVudC5jb25jYXQoaW5uZXJWYWx1ZSlcclxuXHRcdFx0XHRcdFx0XHRyZXR1cm5cclxuXHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0XHQgY3VycmVudEVsZW1lbnQucHVzaChpbm5lclZhbHVlKVxyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH0pXHJcblx0XHRcdFx0cmV0dXJuIGN1cnJlbnRFbGVtZW50XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHRcdGN1cnJlbnRFbGVtZW50ID0gbmV4dEVsZW1lbnRcclxuXHR9XHJcblx0cmV0dXJuIGN1cnJlbnRFbGVtZW50XHJcbn1cclxuXHJcbmV4cG9ydCBjb25zdCBzZXROZXN0ZWQgPSAocGFyZW50OiBhbnksIGZpZWxkOiBzdHJpbmcsIHZhbHVlOiBhbnkpOiBib29sZWFuID0+IHtcclxuXHRjb25zdCBmaWVsZE5hbWVzID0gZmllbGQuc3BsaXQoJy4nKVxyXG5cdGlmICghZmllbGROYW1lcy5sZW5ndGgpIHtcclxuXHRcdHJldHVybiBmYWxzZVxyXG5cdH1cclxuXHRsZXQgY3VycmVudFBhcmVudCA9IHBhcmVudCxcclxuXHRcdGxvb3BFbmQgPSBmaWVsZE5hbWVzLmxlbmd0aCAtIDFcclxuXHRmb3IgKGxldCBpID0gMDsgaSA8IGxvb3BFbmQ7IGkrKykge1xyXG5cdFx0Y29uc3QgZmllbGROYW1lID0gZmllbGROYW1lc1tpXVxyXG5cdFx0aWYgKHR5cGVvZiBjdXJyZW50UGFyZW50W2ZpZWxkTmFtZV0gPT09ICd1bmRlZmluZWQnKSB7XHJcblx0XHRcdHJldHVybiBmYWxzZVxyXG5cdFx0fVxyXG5cdFx0Y3VycmVudFBhcmVudCA9IGN1cnJlbnRQYXJlbnRbZmllbGROYW1lXVxyXG5cdH1cclxuXHRjdXJyZW50UGFyZW50W2ZpZWxkTmFtZXNbbG9vcEVuZF1dID0gdmFsdWVcclxuXHRyZXR1cm4gdHJ1ZVxyXG59XHJcbiIsIid1c2Ugc3RyaWN0J1xyXG5cclxuLy8gYW5ndWxhciBkZXBlbmRlbmNpZXNcclxuaW1wb3J0IHtDb21tb25Nb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbidcclxuaW1wb3J0IHtOZ01vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvY29yZSdcclxuXHJcblxyXG5ATmdNb2R1bGUoe1xyXG5cdGltcG9ydHM6IFtcclxuXHRcdENvbW1vbk1vZHVsZVxyXG5cdF1cclxufSlcclxuZXhwb3J0IGNsYXNzIFJhbXN0ZXJVSUNvcmVNb2R1bGUge31cclxuXHJcbmV4cG9ydCAqIGZyb20gJy4vY29tcG9uZW50cy9iYXNlLWxheW91dC5jb21wb25lbnQnXHJcbmV4cG9ydCAqIGZyb20gJy4vY29tcG9uZW50cy9iYXNlLXBhZ2UuY29tcG9uZW50J1xyXG5leHBvcnQgKiBmcm9tICcuL3NlcnZpY2VzL2Jhc2VSRVNULnNlcnZpY2UnXHJcbmV4cG9ydCAqIGZyb20gJy4vc2VydmljZXMvZmlsZXNSRVNULnNlcnZpY2UnXHJcbmV4cG9ydCAqIGZyb20gJy4vc2VydmljZXMvZ2xvYmFsRXZlbnRzL2dsb2JhbEV2ZW50cy5zZXJ2aWNlJ1xyXG5leHBvcnQgKiBmcm9tICcuL3NlcnZpY2VzL2dsb2JhbEV2ZW50cy9nbG9iYWxFdmVudHMuaW50ZXJmYWNlcydcclxuZXhwb3J0ICogZnJvbSAnLi9zZXJ2aWNlcy9tb2RlbFJFU1RTZXJ2aWNlUHJvdmlkZXIuc2VydmljZSdcclxuZXhwb3J0ICogZnJvbSAnLi9zZXJ2aWNlcy9yZXF1ZXN0LnNlcnZpY2UnXHJcbmV4cG9ydCAqIGZyb20gJy4vdXRpbHMvdG9vbGJlbHQnXHJcbmV4cG9ydCAqIGZyb20gJy4vaW50ZXJmYWNlcy9zZWxlY3RMaXN0LmludGVyZmFjZSdcclxuIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQU9BO0lBTUMsNkJBQ1EsbUJBQXdDLEVBQ3hDLE1BQWM7UUFEZCx3QkFBbUIsR0FBbkIsbUJBQW1CLENBQXFCO1FBQ3hDLFdBQU0sR0FBTixNQUFNLENBQVE7UUFQdEIsc0JBQWlCLEdBQVksS0FBSyxDQUFBO1FBQ2xDLGlCQUFZLEdBQVksS0FBSyxDQUFBO1FBQzdCLGdCQUFXLEdBQTBCLEVBQUUsQ0FBQTtRQUN2QyxnQkFBVyxHQUEwQixFQUFFLENBQUE7S0FNdEM7Ozs7SUFFRCxzQ0FBUTs7O0lBQVI7UUFBQSxpQkFNQztRQUxBLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxXQUFXLENBQUMsU0FBUyxDQUFDLFVBQUMsSUFBeUIsSUFBSyxPQUFBLEtBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLEdBQUEsQ0FBQyxDQUFBO1FBQ3BHLElBQUks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