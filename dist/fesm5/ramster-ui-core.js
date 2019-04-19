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
        this.baseUrl = '/';
        this.headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        this.redirectOnForbiddenUrl = null;
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
        if (!err) {
            this.globalEventsService.notify('error', 'An error has occurred.');
            return;
        }
        if (this.redirectOnForbiddenUrl && (err.status === 401)) {
            this.globalEventsService.redirect(this.redirectOnForbiddenUrl);
            return;
        }
        this.globalEventsService.notify('error', err.error && err.error.error || 'An error has occurred.');
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmFtc3Rlci11aS1jb3JlLmpzLm1hcCIsInNvdXJjZXMiOlsibmc6Ly9yYW1zdGVyLXVpLWNvcmUvY29tcG9uZW50cy9iYXNlLWxheW91dC5jb21wb25lbnQudHMiLCJuZzovL3JhbXN0ZXItdWktY29yZS9jb21wb25lbnRzL2Jhc2UtcGFnZS5jb21wb25lbnQudHMiLCJuZzovL3JhbXN0ZXItdWktY29yZS9zZXJ2aWNlcy9nbG9iYWxFdmVudHMvZ2xvYmFsRXZlbnRzLnNlcnZpY2UudHMiLCJuZzovL3JhbXN0ZXItdWktY29yZS9zZXJ2aWNlcy9yZXF1ZXN0LnNlcnZpY2UudHMiLCJuZzovL3JhbXN0ZXItdWktY29yZS9zZXJ2aWNlcy9iYXNlUkVTVC5zZXJ2aWNlLnRzIiwibmc6Ly9yYW1zdGVyLXVpLWNvcmUvc2VydmljZXMvZmlsZXNSRVNULnNlcnZpY2UudHMiLCJuZzovL3JhbXN0ZXItdWktY29yZS9zZXJ2aWNlcy9tb2RlbFJFU1RTZXJ2aWNlUHJvdmlkZXIuc2VydmljZS50cyIsIm5nOi8vcmFtc3Rlci11aS1jb3JlL3V0aWxzL3Rvb2xiZWx0LnRzIiwibmc6Ly9yYW1zdGVyLXVpLWNvcmUvaW5kZXgudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtPbkluaXR9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnXHJcbmltcG9ydCB7Um91dGVyfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInXHJcblxyXG5pbXBvcnQge0dsb2JhbEV2ZW50c1NlcnZpY2V9IGZyb20gJy4uL3NlcnZpY2VzL2dsb2JhbEV2ZW50cy9nbG9iYWxFdmVudHMuc2VydmljZSdcclxuaW1wb3J0IHtHRVNSZWRpcmVjdE9wdGlvbnNJbnRlcmZhY2V9IGZyb20gJy4uL3NlcnZpY2VzL2dsb2JhbEV2ZW50cy9nbG9iYWxFdmVudHMuaW50ZXJmYWNlcydcclxuXHJcblxyXG5leHBvcnQgY2xhc3MgQmFzZUxheW91dENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XHJcblx0aW5pdGlhbERhdGFMb2FkZWQ6IGJvb2xlYW4gPSBmYWxzZVxyXG5cdGxvYWRlckFjdGl2ZTogYm9vbGVhbiA9IGZhbHNlXHJcblx0cXVlcnlQYXJhbXM6IHtbeDogc3RyaW5nXTogc3RyaW5nfSA9IHt9XHJcblx0cm91dGVQYXJhbXM6IHtbeDogc3RyaW5nXTogc3RyaW5nfSA9IHt9XHJcblxyXG5cdGNvbnN0cnVjdG9yKFxyXG5cdFx0cHVibGljIGdsb2JhbEV2ZW50c1NlcnZpY2U6IEdsb2JhbEV2ZW50c1NlcnZpY2UsXHJcblx0XHRwdWJsaWMgcm91dGVyOiBSb3V0ZXJcclxuXHQpIHtcclxuXHR9XHJcblxyXG5cdG5nT25Jbml0KCk6IHZvaWQge1xyXG5cdFx0dGhpcy5nbG9iYWxFdmVudHNTZXJ2aWNlLnBhZ2VMb2FkZWQkLnN1YnNjcmliZSgoZGF0YT86IHtbeDogc3RyaW5nXTogYW55fSkgPT4gdGhpcy5wYWdlTG9hZGVkKGRhdGEpKVxyXG5cdFx0dGhpcy5nbG9iYWxFdmVudHNTZXJ2aWNlLnRyaWdnZXJJbml0aWFsRGF0YUxvYWQkLnN1YnNjcmliZSgoKSA9PiB0aGlzLmxvYWRJbml0aWFsRGF0YSgpKVxyXG5cdFx0dGhpcy5nbG9iYWxFdmVudHNTZXJ2aWNlLnNldExheW91dERhdGEkLnN1YnNjcmliZSgoZGF0YSkgPT4gdGhpcy5zZXRMYXlvdXREYXRhKGRhdGEpKVxyXG5cdFx0dGhpcy5nbG9iYWxFdmVudHNTZXJ2aWNlLnJlZGlyZWN0JC5zdWJzY3JpYmUoKHtyb3V0ZSwgb3B0aW9uc30pID0+IHRoaXMucmVkaXJlY3Qocm91dGUsIG9wdGlvbnMpKVxyXG5cdFx0dGhpcy5nbG9iYWxFdmVudHNTZXJ2aWNlLnRvZ2dsZUxvYWRlciQuc3Vic2NyaWJlKChhY3RpdmUpID0+IHRoaXMudG9nZ2xlTG9hZGVyKGFjdGl2ZSkpXHJcblx0fVxyXG5cclxuXHRzZW5kSW5pdGlhbERhdGFMb2FkZWRFdmVudCgpIHtcclxuXHRcdHRoaXMuZ2xvYmFsRXZlbnRzU2VydmljZS5pbml0aWFsRGF0YUxvYWRlZCh7cXVlcnlQYXJhbXM6IHRoaXMucXVlcnlQYXJhbXMsIHJvdXRlUGFyYW1zOiB0aGlzLnJvdXRlUGFyYW1zfSlcclxuXHR9XHJcblxyXG5cclxuXHQvLyBnbG9iYWxFdmVudHNTZXJ2aWNlIGhhbmRsZXJzXHJcblxyXG5cdHBhZ2VMb2FkZWQoZGF0YT86IHtbeDogc3RyaW5nXTogYW55fSk6IHZvaWQge1xyXG5cdFx0aWYgKGRhdGEpIHtcclxuXHRcdFx0Zm9yIChjb25zdCBrZXkgaW4gZGF0YSkge1xyXG5cdFx0XHRcdHRoaXNba2V5XSA9IGRhdGFba2V5XVxyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0XHRpZiAodGhpcy5pbml0aWFsRGF0YUxvYWRlZCkge1xyXG5cdFx0XHR0aGlzLnNlbmRJbml0aWFsRGF0YUxvYWRlZEV2ZW50KClcclxuXHRcdFx0cmV0dXJuXHJcblx0XHR9XHJcblx0XHR0aGlzLmxvYWRJbml0aWFsRGF0YSgpXHJcblx0fVxyXG5cclxuXHRsb2FkSW5pdGlhbERhdGEoKTogdm9pZCB7XHJcblx0XHR0aGlzLnNlbmRJbml0aWFsRGF0YUxvYWRlZEV2ZW50KClcclxuXHR9XHJcblxyXG5cdHNldExheW91dERhdGEoYXJnczoge1t4OiBzdHJpbmddOiBhbnl9KSB7XHJcblx0XHRmb3IgKGNvbnN0IGtleSBpbiBhcmdzKSB7XHJcblx0XHRcdHRoaXNba2V5XSA9IGFyZ3Nba2V5XVxyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0cmVkaXJlY3Qocm91dGU6IHN0cmluZywgb3B0aW9uczogR0VTUmVkaXJlY3RPcHRpb25zSW50ZXJmYWNlKTogdm9pZCB7XHJcblx0XHRjb25zdCBhY3R1YWxPcHRpb25zID0gb3B0aW9ucyB8fCB7fSxcclxuXHRcdFx0e3F1ZXJ5UGFyYW1zLCByZWxvYWRJbml0aWFsRGF0YX0gPSBhY3R1YWxPcHRpb25zXHJcblx0XHRpZiAocmVsb2FkSW5pdGlhbERhdGEpIHtcclxuXHRcdFx0dGhpcy5pbml0aWFsRGF0YUxvYWRlZCA9IGZhbHNlXHJcblx0XHR9XHJcblx0XHR0aGlzLnJvdXRlci5uYXZpZ2F0ZShbcm91dGVdLCB7cXVlcnlQYXJhbXM6IHF1ZXJ5UGFyYW1zIHx8IHt9fSlcclxuXHR9XHJcblxyXG5cdHRvZ2dsZUxvYWRlcihhY3RpdmU6IGJvb2xlYW4pOiB2b2lkIHtcclxuXHRcdHRoaXMubG9hZGVyQWN0aXZlID0gYWN0aXZlXHJcblx0fVxyXG59XHJcbiIsIid1c2Ugc3RyaWN0J1xyXG5cclxuaW1wb3J0IHtBY3RpdmF0ZWRSb3V0ZX0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJ1xyXG5pbXBvcnQge09uRGVzdHJveSwgT25Jbml0fSBmcm9tICdAYW5ndWxhci9jb3JlJ1xyXG5pbXBvcnQge1N1YmplY3R9IGZyb20gJ3J4anMnXHJcbmltcG9ydCB7dGFrZVVudGlsfSBmcm9tICdyeGpzL29wZXJhdG9ycydcclxuXHJcbmltcG9ydCB7R2xvYmFsRXZlbnRzU2VydmljZX0gZnJvbSAnLi4vc2VydmljZXMvZ2xvYmFsRXZlbnRzL2dsb2JhbEV2ZW50cy5zZXJ2aWNlJ1xyXG5cclxuZXhwb3J0IGNsYXNzIEJhc2VQYWdlQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3kge1xyXG5cdGRlc3Ryb3llZDogU3ViamVjdDx2b2lkPiA9IG5ldyBTdWJqZWN0KClcclxuXHRsb2dnZWRJblVzZXI/OiBhbnlcclxuXHRxdWVyeVBhcmFtczoge1t4OiBzdHJpbmddOiBzdHJpbmd9XHJcblx0cm91dGVQYXJhbXM6IHtbeDogc3RyaW5nXTogc3RyaW5nfVxyXG5cclxuXHRjb25zdHJ1Y3RvcihcclxuXHRcdHB1YmxpYyBhY3RpdmF0ZWRSb3V0ZTogQWN0aXZhdGVkUm91dGUsXHJcblx0XHRwdWJsaWMgZ2xvYmFsRXZlbnRzU2VydmljZTogR2xvYmFsRXZlbnRzU2VydmljZSxcclxuXHRcdHB1YmxpYyBvbkluaXRNZXRob2ROYW1lczogc3RyaW5nW10sXHJcblx0XHRwdWJsaWMgb25Jbml0aWFsRGF0YUxvYWRlZE1ldGhvZE5hbWVzOiBzdHJpbmdbXVxyXG5cdCkge1xyXG5cdH1cclxuXHJcblx0bmdPbkluaXQoKSB7XHJcblx0XHR0aGlzLmdsb2JhbEV2ZW50c1NlcnZpY2UuaW5pdGlhbERhdGFMb2FkZWQkLnBpcGUodGFrZVVudGlsKHRoaXMuZGVzdHJveWVkKSkuc3Vic2NyaWJlKChkYXRhKSA9PiB0aGlzLmluaXRpYWxEYXRhTG9hZGVkKGRhdGEpKVxyXG5cdFx0dGhpcy5vbkluaXRNZXRob2ROYW1lcy5mb3JFYWNoKChtZXRob2ROYW1lKSA9PiB7XHJcblx0XHRcdGlmICh0eXBlb2YgdGhpc1ttZXRob2ROYW1lXSA9PT0gJ2Z1bmN0aW9uJykge1xyXG5cdFx0XHRcdHRoaXNbbWV0aG9kTmFtZV0oKVxyXG5cdFx0XHR9XHJcblx0XHR9KVxyXG5cdH1cclxuXHJcblx0cmVzZXQoKTogdm9pZCB7XHJcblx0XHR0aGlzLnF1ZXJ5UGFyYW1zID0gdGhpcy5hY3RpdmF0ZWRSb3V0ZS5zbmFwc2hvdC5xdWVyeVBhcmFtc1xyXG5cdFx0dGhpcy5yb3V0ZVBhcmFtcyA9IHRoaXMuYWN0aXZhdGVkUm91dGUuc25hcHNob3QucGFyYW1zXHJcblx0fVxyXG5cclxuXHRzZW5kUGFnZUxvYWRlZEV2ZW50KCkge1xyXG5cdFx0dGhpcy5nbG9iYWxFdmVudHNTZXJ2aWNlLnBhZ2VMb2FkZWQoe3F1ZXJ5UGFyYW1zOiB0aGlzLnF1ZXJ5UGFyYW1zLCByb3V0ZVBhcmFtczogdGhpcy5yb3V0ZVBhcmFtc30pXHJcblx0fVxyXG5cclxuXHRpbml0aWFsRGF0YUxvYWRlZChkYXRhKTogdm9pZCB7XHJcblx0XHR0aGlzLmxvZ2dlZEluVXNlciA9IGRhdGEudXNlclxyXG5cdFx0dGhpcy5xdWVyeVBhcmFtcyA9IGRhdGEucXVlcnlQYXJhbXNcclxuXHRcdHRoaXMucm91dGVQYXJhbXMgPSBkYXRhLnJvdXRlUGFyYW1zXHJcblx0XHR0aGlzLm9uSW5pdGlhbERhdGFMb2FkZWRNZXRob2ROYW1lcy5mb3JFYWNoKChtZXRob2ROYW1lKSA9PiB7XHJcblx0XHRcdGlmICh0eXBlb2YgdGhpc1ttZXRob2ROYW1lXSA9PT0gJ2Z1bmN0aW9uJykge1xyXG5cdFx0XHRcdHRoaXNbbWV0aG9kTmFtZV0oZGF0YSlcclxuXHRcdFx0fVxyXG5cdFx0fSlcclxuXHR9XHJcblxyXG5cdGRlc3RydWN0b3IoKSB7XHJcblx0XHR0aGlzLmRlc3Ryb3llZC5uZXh0KClcclxuXHRcdHRoaXMuZGVzdHJveWVkLmNvbXBsZXRlKClcclxuXHR9XHJcblxyXG5cdG5nT25EZXN0cm95KCkge1xyXG5cdFx0dGhpcy5kZXN0cnVjdG9yKClcclxuXHR9XHJcbn1cclxuIiwiaW1wb3J0IHtJbmplY3RhYmxlfSBmcm9tICdAYW5ndWxhci9jb3JlJ1xyXG5pbXBvcnQge1N1YmplY3R9IGZyb20gJ3J4anMnXHJcbmltcG9ydCB7R0VTUmVkaXJlY3RPcHRpb25zSW50ZXJmYWNlfSBmcm9tICcuL2dsb2JhbEV2ZW50cy5pbnRlcmZhY2VzJ1xyXG5cclxuQEluamVjdGFibGUoKVxyXG5leHBvcnQgY2xhc3MgR2xvYmFsRXZlbnRzU2VydmljZSB7XHJcblx0cGFnZUxvYWRlZFNvdXJjZSA9IG5ldyBTdWJqZWN0PHtbeDogc3RyaW5nXTogYW55fSB8IHZvaWQ+KClcclxuXHR0cmlnZ2VySW5pdGlhbERhdGFMb2FkU291cmNlID0gbmV3IFN1YmplY3Q8dm9pZD4oKVxyXG5cdGluaXRpYWxEYXRhTG9hZGVkU291cmNlID0gbmV3IFN1YmplY3Q8YW55PigpXHJcblx0c2V0TGF5b3V0RGF0YVNvdXJjZSA9IG5ldyBTdWJqZWN0PHtbeDogc3RyaW5nXTogYW55fT4oKVxyXG5cdHJlZGlyZWN0U291cmNlID0gbmV3IFN1YmplY3Q8e3JvdXRlOiBzdHJpbmcsIG9wdGlvbnM6IEdFU1JlZGlyZWN0T3B0aW9uc0ludGVyZmFjZX0+KClcclxuXHRub3RpZnlTb3VyY2UgPSBuZXcgU3ViamVjdDx7dHlwZTogc3RyaW5nLCBtZXNzYWdlOiBzdHJpbmd9PigpXHJcblx0dG9nZ2xlTG9hZGVyU291cmNlID0gbmV3IFN1YmplY3Q8Ym9vbGVhbj4oKVxyXG5cclxuXHRwYWdlTG9hZGVkJCA9IHRoaXMucGFnZUxvYWRlZFNvdXJjZS5hc09ic2VydmFibGUoKVxyXG5cdHRyaWdnZXJJbml0aWFsRGF0YUxvYWQkID0gdGhpcy50cmlnZ2VySW5pdGlhbERhdGFMb2FkU291cmNlLmFzT2JzZXJ2YWJsZSgpXHJcblx0aW5pdGlhbERhdGFMb2FkZWQkID0gdGhpcy5pbml0aWFsRGF0YUxvYWRlZFNvdXJjZS5hc09ic2VydmFibGUoKVxyXG5cdHNldExheW91dERhdGEkID0gdGhpcy5zZXRMYXlvdXREYXRhU291cmNlLmFzT2JzZXJ2YWJsZSgpXHJcblx0cmVkaXJlY3QkID0gdGhpcy5yZWRpcmVjdFNvdXJjZS5hc09ic2VydmFibGUoKVxyXG5cdG5vdGlmeSQgPSB0aGlzLm5vdGlmeVNvdXJjZS5hc09ic2VydmFibGUoKVxyXG5cdHRvZ2dsZUxvYWRlciQgPSB0aGlzLnRvZ2dsZUxvYWRlclNvdXJjZS5hc09ic2VydmFibGUoKVxyXG5cclxuXHRwYWdlTG9hZGVkKGRhdGEpOiB2b2lkIHtcclxuXHRcdHRoaXMucGFnZUxvYWRlZFNvdXJjZS5uZXh0KGRhdGEpXHJcblx0fVxyXG5cclxuXHR0cmlnZ2VySW5pdGlhbERhdGFMb2FkKCk6IHZvaWQge1xyXG5cdFx0dGhpcy50cmlnZ2VySW5pdGlhbERhdGFMb2FkU291cmNlLm5leHQoKVxyXG5cdH1cclxuXHJcblx0aW5pdGlhbERhdGFMb2FkZWQoZGF0YSk6IHZvaWQge1xyXG5cdFx0dGhpcy5pbml0aWFsRGF0YUxvYWRlZFNvdXJjZS5uZXh0KGRhdGEpXHJcblx0fVxyXG5cclxuXHRzZXRMYXlvdXREYXRhKGRhdGEpOiB2b2lkIHtcclxuXHRcdHRoaXMuc2V0TGF5b3V0RGF0YVNvdXJjZS5uZXh0KGRhdGEpXHJcblx0fVxyXG5cclxuXHRyZWRpcmVjdChyb3V0ZTogc3RyaW5nLCBvcHRpb25zPzogR0VTUmVkaXJlY3RPcHRpb25zSW50ZXJmYWNlKTogdm9pZCB7XHJcblx0XHR0aGlzLnJlZGlyZWN0U291cmNlLm5leHQoe3JvdXRlLCBvcHRpb25zfSlcclxuXHR9XHJcblxyXG5cdG5vdGlmeSh0eXBlOiBzdHJpbmcsIG1lc3NhZ2U6IHN0cmluZyk6IHZvaWQge1xyXG5cdFx0dGhpcy5ub3RpZnlTb3VyY2UubmV4dCh7dHlwZSwgbWVzc2FnZX0pXHJcblx0fVxyXG5cclxuXHR0b2dnbGVMb2FkZXIoYWN0aXZlOiBib29sZWFuKTogdm9pZCB7XHJcblx0XHR0aGlzLnRvZ2dsZUxvYWRlclNvdXJjZS5uZXh0KGFjdGl2ZSlcclxuXHR9XHJcbn1cclxuIiwiaW1wb3J0IHtJbmplY3RhYmxlfSBmcm9tICdAYW5ndWxhci9jb3JlJ1xyXG5pbXBvcnQge0h0dHBDbGllbnQsIEh0dHBSZXF1ZXN0LCBIdHRwUmVzcG9uc2V9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJ1xyXG5cclxuXHJcbkBJbmplY3RhYmxlKClcclxuZXhwb3J0IGNsYXNzIFJlcXVlc3RTZXJ2aWNlIHtcclxuXHRjb25zdHJ1Y3RvcihwdWJsaWMgY2xpZW50OiBIdHRwQ2xpZW50KSB7fVxyXG5cclxuXHRmbGF0dGVuT2JqZWN0Rm9yUXVlcnkob2JqZWN0OiB7W3g6IHN0cmluZ106IGFueX0gfCBhbnlbXSwgcGFyZW50S2V5Pzogc3RyaW5nKToge2tleTogc3RyaW5nLCB2YWx1ZTogYW55fVtdIHtcclxuXHRcdGxldCByZXR1cm5PYmplY3QgPSBbXVxyXG5cdFx0aWYgKG9iamVjdCBpbnN0YW5jZW9mIEFycmF5KSB7XHJcblx0XHRcdGlmICghcGFyZW50S2V5KSB7XHJcblx0XHRcdFx0dGhyb3cge2Vycm9yOiAnVGhlIHRvcC1tb3N0IGl0ZW0gY2Fubm90IGJlIGFuIGFycmF5Lid9XHJcblx0XHRcdH1cclxuXHRcdFx0b2JqZWN0LmZvckVhY2goKGl0ZW0pID0+IHtcclxuXHRcdFx0XHRpZiAoaXRlbSA9PT0gbnVsbCkge1xyXG5cdFx0XHRcdFx0cmV0dXJuXHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdGlmICgoaXRlbSBpbnN0YW5jZW9mIERhdGUpIHx8ICEoaXRlbSBpbnN0YW5jZW9mIEFycmF5KSAgfHwgKHR5cGVvZiBpdGVtICE9PSAnb2JqZWN0JykpIHtcclxuXHRcdFx0XHRcdHJldHVybk9iamVjdC5wdXNoKHtrZXk6IGAke3BhcmVudEtleX1bXWAsIHZhbHVlOiBpdGVtfSlcclxuXHRcdFx0XHRcdHJldHVyblxyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHRyZXR1cm5PYmplY3QgPSByZXR1cm5PYmplY3QuY29uY2F0KHRoaXMuZmxhdHRlbk9iamVjdEZvclF1ZXJ5KGl0ZW0sIGAke3BhcmVudEtleX1bXWApKVxyXG5cdFx0XHRcdHJldHVyblxyXG5cdFx0XHR9KVxyXG5cdFx0XHRyZXR1cm4gcmV0dXJuT2JqZWN0XHJcblx0XHR9XHJcblx0XHRmb3IgKGNvbnN0IGtleSBpbiBvYmplY3QpIHtcclxuXHRcdFx0Y29uc3QgdmFsdWUgPSBvYmplY3Rba2V5XVxyXG5cdFx0XHRpZiAodmFsdWUgPT09IG51bGwpIHtcclxuXHRcdFx0XHRjb250aW51ZVxyXG5cdFx0XHR9XHJcblx0XHRcdGlmICgodmFsdWUgaW5zdGFuY2VvZiBEYXRlKSB8fCAodHlwZW9mIHZhbHVlICE9PSAnb2JqZWN0JykpIHtcclxuXHRcdFx0XHRyZXR1cm5PYmplY3QucHVzaCh7a2V5OiBwYXJlbnRLZXkgPyBgJHtwYXJlbnRLZXl9WyR7a2V5fV1gOiBrZXksIHZhbHVlfSlcclxuXHRcdFx0XHRjb250aW51ZVxyXG5cdFx0XHR9XHJcblx0XHRcdHJldHVybk9iamVjdCA9IHJldHVybk9iamVjdC5jb25jYXQodGhpcy5mbGF0dGVuT2JqZWN0Rm9yUXVlcnkodmFsdWUsIHBhcmVudEtleSA/IGAke3BhcmVudEtleX1bJHtrZXl9XWAgOiBrZXkpKVxyXG5cdFx0fVxyXG5cdFx0cmV0dXJuIHJldHVybk9iamVjdFxyXG5cdH1cclxuXHJcblx0cnVuKG1ldGhvZDogc3RyaW5nLCB1cmw6IHN0cmluZywgb3B0aW9ucz86IHtbeDogc3RyaW5nXTogYW55fSkge1xyXG5cdFx0cmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuXHRcdFx0dHJ5IHtcclxuXHRcdFx0XHRsZXQgYWN0dWFsVXJsID0gdXJsLFxyXG5cdFx0XHRcdFx0cnVuT3B0aW9ucyA9IHt9IGFzIGFueSxcclxuXHRcdFx0XHRcdHJlcXVlc3RPcHRpb25zID0ge30gYXMgYW55LFxyXG5cdFx0XHRcdFx0Ym9keSA9IG51bGxcclxuXHRcdFx0XHRpZiAob3B0aW9ucyAmJiAodHlwZW9mIG9wdGlvbnMgPT09ICdvYmplY3QnKSkge1xyXG5cdFx0XHRcdFx0bGV0IHtyZXNvbHZlV2l0aEZ1bGxSZXNwb25zZSwgLi4uIG90aGVyT3B0aW9uc30gPSBvcHRpb25zXHJcblx0XHRcdFx0XHRyZXF1ZXN0T3B0aW9ucyA9IG90aGVyT3B0aW9uc1xyXG5cdFx0XHRcdFx0cnVuT3B0aW9ucyA9IHtyZXNvbHZlV2l0aEZ1bGxSZXNwb25zZX1cclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0aWYgKG1ldGhvZC50b0xvd2VyQ2FzZSgpID09PSAnZ2V0Jykge1xyXG5cdFx0XHRcdFx0aWYgKCFyZXF1ZXN0T3B0aW9ucyB8fCAodHlwZW9mIHJlcXVlc3RPcHRpb25zICE9PSAnb2JqZWN0JykpIHtcclxuXHRcdFx0XHRcdFx0cmVxdWVzdE9wdGlvbnMgPSB7fVxyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0Y29uc3Qgb3B0aW9uc1BhcmFtcyA9IHRoaXMuZmxhdHRlbk9iamVjdEZvclF1ZXJ5KHJlcXVlc3RPcHRpb25zLnBhcmFtcyB8fCB7fSlcclxuXHRcdFx0XHRcdGFjdHVhbFVybCArPSBgP189JHsobmV3IERhdGUoKSkuZ2V0VGltZSgpLnRvU3RyaW5nKCl9YFxyXG5cdFx0XHRcdFx0aWYgKG9wdGlvbnNQYXJhbXMubGVuZ3RoKSB7XHJcblx0XHRcdFx0XHRcdG9wdGlvbnNQYXJhbXMuZm9yRWFjaCgoaXRlbSwgaW5kZXgpID0+IHtcclxuXHRcdFx0XHRcdFx0XHRhY3R1YWxVcmwgKz0gYCYke2l0ZW0ua2V5fT0ke2l0ZW0udmFsdWV9YFxyXG5cdFx0XHRcdFx0XHR9KVxyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHRpZiAoIXJlcXVlc3RPcHRpb25zIHx8ICh0eXBlb2YgcmVxdWVzdE9wdGlvbnMgIT09ICdvYmplY3QnKSkge1xyXG5cdFx0XHRcdFx0XHRyZXF1ZXN0T3B0aW9ucyA9IHt9XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRib2R5ID0gKCFyZXF1ZXN0T3B0aW9ucy5ib2R5IHx8ICh0eXBlb2YgcmVxdWVzdE9wdGlvbnMuYm9keSAhPT0gJ29iamVjdCcpKSA/IHt9IDogcmVxdWVzdE9wdGlvbnMuYm9keVxyXG5cdFx0XHRcdFx0Ym9keS5fID0gKG5ldyBEYXRlKCkpLmdldFRpbWUoKVxyXG5cdFx0XHRcdFx0ZGVsZXRlIHJlcXVlc3RPcHRpb25zLmJvZHlcclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0Ly8gaWYgKCFyZXF1ZXN0T3B0aW9ucy5yZXNwb25zZVR5cGUpIHt9XHJcblx0XHRcdFx0dGhpcy5jbGllbnQucmVxdWVzdChuZXcgSHR0cFJlcXVlc3QobWV0aG9kLCBhY3R1YWxVcmwsIGJvZHksIHJlcXVlc3RPcHRpb25zKSkudG9Qcm9taXNlKCkudGhlbihcclxuXHRcdFx0XHRcdChyZXNwb25zZTogSHR0cFJlc3BvbnNlPGFueT4pID0+IHJ1bk9wdGlvbnMucmVzb2x2ZVdpdGhGdWxsUmVzcG9uc2UgPyByZXNvbHZlKHJlc3BvbnNlKSA6IHJlc29sdmUocmVzcG9uc2UuYm9keSksXHJcblx0XHRcdFx0XHQoZXJyb3I6IGFueSkgPT4gcmVqZWN0KGVycm9yKVxyXG5cdFx0XHRcdClcclxuXHRcdFx0fSBjYXRjaChlcnJvcikge1xyXG5cdFx0XHRcdHJlamVjdChlcnJvcilcclxuXHRcdFx0fVxyXG5cdFx0fSlcclxuXHR9XHJcbn1cclxuIiwiaW1wb3J0IGNvIGZyb20gJ2NvJ1xyXG5pbXBvcnQge0luamVjdGFibGV9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnXHJcbmltcG9ydCB7SHR0cEhlYWRlcnN9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJ1xyXG5cclxuaW1wb3J0IHtHbG9iYWxFdmVudHNTZXJ2aWNlfSBmcm9tICcuL2dsb2JhbEV2ZW50cy9nbG9iYWxFdmVudHMuc2VydmljZSdcclxuaW1wb3J0IHtSZXF1ZXN0U2VydmljZX0gZnJvbSAnLi9yZXF1ZXN0LnNlcnZpY2UnXHJcblxyXG5ASW5qZWN0YWJsZSgpXHJcbmV4cG9ydCBjbGFzcyBCYXNlUkVTVFNlcnZpY2Uge1xyXG5cdGJhc2VVcmwgPSAnLydcclxuXHRoZWFkZXJzID0gbmV3IEh0dHBIZWFkZXJzKHsnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nfSlcclxuXHRyZWRpcmVjdE9uRm9yYmlkZGVuVXJsPzogc3RyaW5nID0gbnVsbFxyXG5cclxuXHRjb25zdHJ1Y3RvcihcclxuXHRcdHB1YmxpYyBnbG9iYWxFdmVudHNTZXJ2aWNlOiBHbG9iYWxFdmVudHNTZXJ2aWNlLFxyXG5cdFx0cHVibGljIHJlcXVlc3RTZXJ2aWNlOiBSZXF1ZXN0U2VydmljZVxyXG5cdCkge31cclxuXHJcblx0ZW1wdHlUb051bGwoZGF0YTogYW55KTogYW55IHtcclxuXHRcdGlmIChkYXRhID09PSAnJykge1xyXG5cdFx0XHRyZXR1cm4gbnVsbFxyXG5cdFx0fVxyXG5cdFx0aWYgKGRhdGEgaW5zdGFuY2VvZiBEYXRlKSB7XHJcblx0XHRcdHJldHVybiBkYXRhXHJcblx0XHR9XHJcblx0XHRpZiAoZGF0YSBpbnN0YW5jZW9mIEFycmF5KSB7XHJcblx0XHRcdHJldHVybiBkYXRhLm1hcCgoaXRlbSwgaW5kZXgpID0+IHRoaXMuZW1wdHlUb051bGwoaXRlbSkpXHJcblx0XHR9XHJcblx0XHRpZiAoKHR5cGVvZiBkYXRhID09PSAnb2JqZWN0JykgJiYgKGRhdGEgIT09IG51bGwpKSB7XHJcblx0XHRcdGNvbnN0IHBhcnNlZERhdGEgPSB7fVxyXG5cdFx0XHRmb3IgKGNvbnN0IGtleSBpbiBkYXRhKSB7XHJcblx0XHRcdFx0cGFyc2VkRGF0YVtrZXldID0gdGhpcy5lbXB0eVRvTnVsbChkYXRhW2tleV0pXHJcblx0XHRcdH1cclxuXHRcdFx0cmV0dXJuIHBhcnNlZERhdGFcclxuXHRcdH1cclxuXHRcdHJldHVybiBkYXRhXHJcblx0fVxyXG5cclxuXHRzdHJpbmdpZnlHZXRQYXJhbXMoZGF0YToge1trZXk6IHN0cmluZ106IGFueX0pOiB7W2tleTogc3RyaW5nXTogYW55fSB7XHJcblx0XHRsZXQgc3RyaW5naWZpZWRPYmplY3QgPSB7fVxyXG5cdFx0Zm9yIChjb25zdCBrZXkgaW4gZGF0YSkge1xyXG5cdFx0XHRjb25zdCB2YWx1ZSA9IGRhdGFba2V5XVxyXG5cdFx0XHRpZiAoKHZhbHVlIGluc3RhbmNlb2YgQXJyYXkpIHx8ICgodHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JykgJiYgKHZhbHVlICE9PSBudWxsKSAmJiAhKHZhbHVlIGluc3RhbmNlb2YgRGF0ZSkpKSB7XHJcblx0XHRcdFx0c3RyaW5naWZpZWRPYmplY3RbYF9qc29uXyR7a2V5fWBdID0gSlNPTi5zdHJpbmdpZnkodmFsdWUpXHJcblx0XHRcdFx0Y29udGludWVcclxuXHRcdFx0fVxyXG5cdFx0XHRzdHJpbmdpZmllZE9iamVjdFtrZXldID0gdmFsdWVcclxuXHRcdH1cclxuXHRcdHJldHVybiBzdHJpbmdpZmllZE9iamVjdFxyXG5cdH1cclxuXHJcblx0aGFuZGxlRXJyb3IoZXJyOiBhbnkpOiB2b2lkIHtcclxuXHRcdGlmICghZXJyKSB7XHJcblx0XHRcdHRoaXMuZ2xvYmFsRXZlbnRzU2VydmljZS5ub3RpZnkoJ2Vycm9yJywgJ0FuIGVycm9yIGhhcyBvY2N1cnJlZC4nKVxyXG5cdFx0XHRyZXR1cm5cclxuXHRcdH1cclxuXHRcdGlmICh0aGlzLnJlZGlyZWN0T25Gb3JiaWRkZW5VcmwgJiYgKGVyci5zdGF0dXMgPT09IDQwMSkpIHtcclxuXHRcdFx0dGhpcy5nbG9iYWxFdmVudHNTZXJ2aWNlLnJlZGlyZWN0KHRoaXMucmVkaXJlY3RPbkZvcmJpZGRlblVybClcclxuXHRcdFx0cmV0dXJuXHJcblx0XHR9XHJcblx0XHR0aGlzLmdsb2JhbEV2ZW50c1NlcnZpY2Uubm90aWZ5KCdlcnJvcicsIGVyci5lcnJvciAmJiBlcnIuZXJyb3IuZXJyb3IgfHwgJ0FuIGVycm9yIGhhcyBvY2N1cnJlZC4nKVxyXG5cdH1cclxuXHJcblx0Y3JlYXRlKHBhcmFtcyk6IFByb21pc2U8YW55PiB7XHJcblx0XHRjb25zdCBpbnN0YW5jZSA9IHRoaXNcclxuXHRcdHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcblx0XHRcdGNvKGZ1bmN0aW9uKigpIHtcclxuXHRcdFx0XHRyZXR1cm4geWllbGQgaW5zdGFuY2UucmVxdWVzdFNlcnZpY2UucnVuKCdwb3N0JywgYCR7aW5zdGFuY2UuYmFzZVVybH1gLCB7XHJcblx0XHRcdFx0XHRoZWFkZXJzOiBpbnN0YW5jZS5oZWFkZXJzLFxyXG5cdFx0XHRcdFx0Ym9keTogaW5zdGFuY2UuZW1wdHlUb051bGwocGFyYW1zKVxyXG5cdFx0XHRcdH0pXHJcblx0XHRcdH0pLnRoZW4oKHJlcykgPT4gcmVzb2x2ZShyZXMpLCAoZXJyKSA9PiB7XHJcblx0XHRcdFx0aW5zdGFuY2UuaGFuZGxlRXJyb3IoZXJyKVxyXG5cdFx0XHRcdHJlamVjdCh7ZXJyb3I6IHRydWV9KVxyXG5cdFx0XHR9KVxyXG5cdFx0fSlcclxuXHR9XHJcblxyXG5cdHJlYWQocGFyYW1zKTogUHJvbWlzZTxhbnk+IHtcclxuXHRcdGNvbnN0IGluc3RhbmNlID0gdGhpc1xyXG5cdFx0cmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuXHRcdFx0Y28oZnVuY3Rpb24qKCkge1xyXG5cdFx0XHRcdHJldHVybiB5aWVsZCBpbnN0YW5jZS5yZXF1ZXN0U2VydmljZS5ydW4oJ2dldCcsIGAke2luc3RhbmNlLmJhc2VVcmx9L2l0ZW1gLCB7XHJcblx0XHRcdFx0XHRoZWFkZXJzOiBpbnN0YW5jZS5oZWFkZXJzLFxyXG5cdFx0XHRcdFx0cGFyYW1zOiBpbnN0YW5jZS5zdHJpbmdpZnlHZXRQYXJhbXMoaW5zdGFuY2UuZW1wdHlUb051bGwocGFyYW1zKSlcclxuXHRcdFx0XHR9KVxyXG5cdFx0XHR9KS50aGVuKChyZXMpID0+IHJlc29sdmUocmVzKSwgKGVycikgPT4ge1xyXG5cdFx0XHRcdGluc3RhbmNlLmhhbmRsZUVycm9yKGVycilcclxuXHRcdFx0XHRyZWplY3Qoe2Vycm9yOiB0cnVlfSlcclxuXHRcdFx0fSlcclxuXHRcdH0pXHJcblx0fVxyXG5cclxuXHRyZWFkTGlzdChwYXJhbXMpOiBQcm9taXNlPGFueT4ge1xyXG5cdFx0Y29uc3QgaW5zdGFuY2UgPSB0aGlzXHJcblx0XHRyZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG5cdFx0XHRjbyhmdW5jdGlvbiooKSB7XHJcblx0XHRcdFx0cmV0dXJuIHlpZWxkIGluc3RhbmNlLnJlcXVlc3RTZXJ2aWNlLnJ1bignZ2V0JywgYCR7aW5zdGFuY2UuYmFzZVVybH1gLCB7XHJcblx0XHRcdFx0XHRoZWFkZXJzOiBpbnN0YW5jZS5oZWFkZXJzLFxyXG5cdFx0XHRcdFx0cGFyYW1zOiBpbnN0YW5jZS5zdHJpbmdpZnlHZXRQYXJhbXMoaW5zdGFuY2UuZW1wdHlUb051bGwocGFyYW1zKSlcclxuXHRcdFx0XHR9KVxyXG5cdFx0XHR9KS50aGVuKChyZXMpID0+IHJlc29sdmUocmVzKSwgKGVycikgPT4ge1xyXG5cdFx0XHRcdGluc3RhbmNlLmhhbmRsZUVycm9yKGVycilcclxuXHRcdFx0XHRyZWplY3Qoe2Vycm9yOiB0cnVlfSlcclxuXHRcdFx0fSlcclxuXHRcdH0pXHJcblx0fVxyXG5cclxuXHRyZWFkU2VsZWN0TGlzdChwYXJhbXMpOiBQcm9taXNlPGFueT4ge1xyXG5cdFx0Y29uc3QgaW5zdGFuY2UgPSB0aGlzXHJcblx0XHRyZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG5cdFx0XHRjbyhmdW5jdGlvbiooKSB7XHJcblx0XHRcdFx0cmV0dXJuIHlpZWxkIGluc3RhbmNlLnJlcXVlc3RTZXJ2aWNlLnJ1bignZ2V0JywgYCR7aW5zdGFuY2UuYmFzZVVybH0vc2VsZWN0TGlzdGAsIHtcclxuXHRcdFx0XHRcdGhlYWRlcnM6IGluc3RhbmNlLmhlYWRlcnMsXHJcblx0XHRcdFx0XHRwYXJhbXM6IGluc3RhbmNlLnN0cmluZ2lmeUdldFBhcmFtcyhpbnN0YW5jZS5lbXB0eVRvTnVsbChwYXJhbXMpKVxyXG5cdFx0XHRcdH0pXHJcblx0XHRcdH0pLnRoZW4oKHJlcykgPT4gcmVzb2x2ZShyZXMpLCAoZXJyKSA9PiB7XHJcblx0XHRcdFx0aW5zdGFuY2UuaGFuZGxlRXJyb3IoZXJyKVxyXG5cdFx0XHRcdHJlamVjdCh7ZXJyb3I6IHRydWV9KVxyXG5cdFx0XHR9KVxyXG5cdFx0fSlcclxuXHR9XHJcblxyXG5cdHVwZGF0ZShwYXJhbXMpOiBQcm9taXNlPGFueT4ge1xyXG5cdFx0Y29uc3QgaW5zdGFuY2UgPSB0aGlzXHJcblx0XHRyZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG5cdFx0XHRjbyhmdW5jdGlvbiooKSB7XHJcblx0XHRcdFx0cmV0dXJuIHlpZWxkIGluc3RhbmNlLnJlcXVlc3RTZXJ2aWNlLnJ1bigncGF0Y2gnLCBgJHtpbnN0YW5jZS5iYXNlVXJsfS9pdGVtLyR7cGFyYW1zLmlkfWAsIHtcclxuXHRcdFx0XHRcdGhlYWRlcnM6IGluc3RhbmNlLmhlYWRlcnMsXHJcblx0XHRcdFx0XHRib2R5OiBpbnN0YW5jZS5lbXB0eVRvTnVsbChwYXJhbXMpXHJcblx0XHRcdFx0fSlcclxuXHRcdFx0fSkudGhlbigocmVzKSA9PiByZXNvbHZlKHJlcyksIChlcnIpID0+IHtcclxuXHRcdFx0XHRpbnN0YW5jZS5oYW5kbGVFcnJvcihlcnIpXHJcblx0XHRcdFx0cmVqZWN0KHtlcnJvcjogdHJ1ZX0pXHJcblx0XHRcdH0pXHJcblx0XHR9KVxyXG5cdH1cclxuXHJcblx0YnVsa1Vwc2VydChwYXJhbXMpOiBQcm9taXNlPGFueT4ge1xyXG5cdFx0Y29uc3QgaW5zdGFuY2UgPSB0aGlzXHJcblx0XHRyZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG5cdFx0XHRjbyhmdW5jdGlvbiooKSB7XHJcblx0XHRcdFx0cmV0dXJuIHlpZWxkIGluc3RhbmNlLnJlcXVlc3RTZXJ2aWNlLnJ1bigncHV0JywgYCR7aW5zdGFuY2UuYmFzZVVybH1gLCB7XHJcblx0XHRcdFx0XHRoZWFkZXJzOiBpbnN0YW5jZS5oZWFkZXJzLFxyXG5cdFx0XHRcdFx0Ym9keTogaW5zdGFuY2UuZW1wdHlUb051bGwocGFyYW1zKVxyXG5cdFx0XHRcdH0pXHJcblx0XHRcdH0pLnRoZW4oKHJlcykgPT4gcmVzb2x2ZShyZXMpLCAoZXJyKSA9PiB7XHJcblx0XHRcdFx0aW5zdGFuY2UuaGFuZGxlRXJyb3IoZXJyKVxyXG5cdFx0XHRcdHJlamVjdCh7ZXJyb3I6IHRydWV9KVxyXG5cdFx0XHR9KVxyXG5cdFx0fSlcclxuXHR9XHJcblxyXG5cdGRlbGV0ZShwYXJhbXMpOiBQcm9taXNlPGFueT4ge1xyXG5cdFx0Y29uc3QgaW5zdGFuY2UgPSB0aGlzXHJcblx0XHRyZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG5cdFx0XHRjbyhmdW5jdGlvbiooKSB7XHJcblx0XHRcdFx0cmV0dXJuIHlpZWxkIGluc3RhbmNlLnJlcXVlc3RTZXJ2aWNlLnJ1bignZGVsZXRlJywgYCR7aW5zdGFuY2UuYmFzZVVybH0vJHtwYXJhbXMuaWR9YCwge1xyXG5cdFx0XHRcdFx0aGVhZGVyczogaW5zdGFuY2UuaGVhZGVycyxcclxuXHRcdFx0XHRcdGJvZHk6IGluc3RhbmNlLmVtcHR5VG9OdWxsKHBhcmFtcylcclxuXHRcdFx0XHR9KVxyXG5cdFx0XHR9KS50aGVuKChyZXMpID0+IHJlc29sdmUocmVzKSwgKGVycikgPT4ge1xyXG5cdFx0XHRcdGluc3RhbmNlLmhhbmRsZUVycm9yKGVycilcclxuXHRcdFx0XHRyZWplY3Qoe2Vycm9yOiB0cnVlfSlcclxuXHRcdFx0fSlcclxuXHRcdH0pXHJcblx0fVxyXG59XHJcbiIsImltcG9ydCBjbyBmcm9tICdjbydcclxuaW1wb3J0IHtJbmplY3RhYmxlfSBmcm9tICdAYW5ndWxhci9jb3JlJ1xyXG5pbXBvcnQge0h0dHBIZWFkZXJzfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCdcclxuXHJcbmltcG9ydCB7R2xvYmFsRXZlbnRzU2VydmljZX0gZnJvbSAnLi9nbG9iYWxFdmVudHMvZ2xvYmFsRXZlbnRzLnNlcnZpY2UnXHJcbmltcG9ydCB7UmVxdWVzdFNlcnZpY2V9IGZyb20gJy4vcmVxdWVzdC5zZXJ2aWNlJ1xyXG5cclxuQEluamVjdGFibGUoKVxyXG5leHBvcnQgY2xhc3MgRmlsZXNSRVNUU2VydmljZSB7XHJcblx0Ly8geydDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbid9XHJcblx0aGVhZGVycyA9IG5ldyBIdHRwSGVhZGVycygpXHJcblx0YmFzZVVybCA9ICcvZmlsZXMnXHJcblxyXG5cdGNvbnN0cnVjdG9yKFxyXG5cdFx0cHVibGljIGdsb2JhbEV2ZW50c1NlcnZpY2U6IEdsb2JhbEV2ZW50c1NlcnZpY2UsXHJcblx0XHRwdWJsaWMgcmVxdWVzdFNlcnZpY2U6IFJlcXVlc3RTZXJ2aWNlXHJcblx0KSB7fVxyXG5cclxuXHRoYW5kbGVFcnJvcihlcnIpOiB2b2lkIHtcclxuXHRcdHRoaXMuZ2xvYmFsRXZlbnRzU2VydmljZS5ub3RpZnkoJ2Vycm9yJywgZXJyICYmIGVyci5lcnJvciAmJiBlcnIuZXJyb3IuZXJyb3IgfHwgJ0FuIGVycm9yIGhhcyBvY2N1cnJlZC4nKVxyXG5cdH1cclxuXHJcblx0dXBsb2FkKGZpbGU6IEZpbGUsIHBhcmFtczoge291dHB1dEZpbGVOYW1lOiBzdHJpbmcsIFt4OiBzdHJpbmddOiBhbnl9LCBvcHRpb25zPzoge2hhbmRsZUVycm9yPzogYm9vbGVhbn0pOiBQcm9taXNlPGFueT4ge1xyXG5cdFx0Y29uc3QgaW5zdGFuY2UgPSB0aGlzXHJcblx0XHRyZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG5cdFx0XHRjbyhmdW5jdGlvbiooKSB7XHJcblx0XHRcdFx0bGV0IGZkID0gbmV3IEZvcm1EYXRhKClcclxuXHRcdFx0XHRmZC5hcHBlbmQoJ2ZpbGUnLCBmaWxlLCBmaWxlLm5hbWUpXHJcblx0XHRcdFx0Zm9yIChjb25zdCBrZXkgaW4gcGFyYW1zKSB7XHJcblx0XHRcdFx0XHRmZC5hcHBlbmQoa2V5LCBwYXJhbXNba2V5XSlcclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0aW5zdGFuY2UuaGVhZGVycy5zZXQoJ0NvbnRlbnQtVHlwZScsICdtdWx0aXBhcnQvZm9ybS1kYXRhJylcclxuXHRcdFx0XHR5aWVsZCBpbnN0YW5jZS5yZXF1ZXN0U2VydmljZS5ydW4oJ3Bvc3QnLCBgJHtpbnN0YW5jZS5iYXNlVXJsfWAsIHtcclxuXHRcdFx0XHRcdGhlYWRlcnM6IGluc3RhbmNlLmhlYWRlcnMsXHJcblx0XHRcdFx0XHRib2R5OiBmZFxyXG5cdFx0XHRcdH0pXHJcblx0XHRcdFx0cmV0dXJuIHtzdWNjZXNzOiB0cnVlfVxyXG5cdFx0XHR9KS50aGVuKChyZXMpID0+IHJlc29sdmUocmVzKSwgKGVycikgPT4ge1xyXG5cdFx0XHRcdGlmIChvcHRpb25zICYmIG9wdGlvbnMuaGFuZGxlRXJyb3IpIHtcclxuXHRcdFx0XHRcdGluc3RhbmNlLmhhbmRsZUVycm9yKGVycilcclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0cmVqZWN0KHtlcnJvcjogZXJyIHx8IHRydWV9KVxyXG5cdFx0XHR9KVxyXG5cdFx0fSlcclxuXHR9XHJcblxyXG5cdHJlYWQocGFyYW1zKTogUHJvbWlzZTxhbnk+IHtcclxuXHRcdGNvbnN0IGluc3RhbmNlID0gdGhpc1xyXG5cdFx0cmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuXHRcdFx0Y28oZnVuY3Rpb24qKCkge1xyXG5cdFx0XHRcdHJldHVybiB5aWVsZCBpbnN0YW5jZS5yZXF1ZXN0U2VydmljZS5ydW4oJ2dldCcsIGAke2luc3RhbmNlLmJhc2VVcmx9L2l0ZW1gLCB7XHJcblx0XHRcdFx0XHRoZWFkZXJzOiBpbnN0YW5jZS5oZWFkZXJzLFxyXG5cdFx0XHRcdFx0cGFyYW1zXHJcblx0XHRcdFx0fSlcclxuXHRcdFx0fSkudGhlbigocmVzKSA9PiByZXNvbHZlKHJlcyksIChlcnIpID0+IHtcclxuXHRcdFx0XHRpbnN0YW5jZS5oYW5kbGVFcnJvcihlcnIpXHJcblx0XHRcdFx0cmVqZWN0KHtlcnJvcjogdHJ1ZX0pXHJcblx0XHRcdH0pXHJcblx0XHR9KVxyXG5cdH1cclxufVxyXG4iLCJpbXBvcnQge0Jhc2VSRVNUU2VydmljZX0gZnJvbSAnLi4vaW5kZXgnXG5pbXBvcnQge0luamVjdGFibGUsIEluamVjdG9yfSBmcm9tICdAYW5ndWxhci9jb3JlJ1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgTW9kZWxSRVNUU2VydmljZVByb3ZpZGVyU2VydmljZSB7XG5cdG1vZGVsUkVTVFNlcnZpY2VzOiB7W2tleTogc3RyaW5nXTogQmFzZVJFU1RTZXJ2aWNlfSA9IHt9XG5cblx0Y29uc3RydWN0b3IoXG5cdFx0cHVibGljIGluamVjdG9yOiBJbmplY3RvclxuXHQpIHtcblx0fVxuXG5cdGdldChjb21wb25lbnROYW1lOiBzdHJpbmcpOiBCYXNlUkVTVFNlcnZpY2Uge1xuXHRcdHJldHVybiB0aGlzLm1vZGVsUkVTVFNlcnZpY2VzW2Ake2NvbXBvbmVudE5hbWV9TW9kZWxSRVNUU2VydmljZWBdXG5cdH1cblxuXHRzZXRTZXJ2aWNlcyhkYXRhOiB7W2tleTogc3RyaW5nXTogQmFzZVJFU1RTZXJ2aWNlfSk6IHZvaWQge1xuXHRcdHRoaXMubW9kZWxSRVNUU2VydmljZXMgPSB7fVxuXHRcdE9iamVjdC5rZXlzKGRhdGEpLmZvckVhY2goKGtleSkgPT4ge1xuXHRcdFx0dGhpcy5tb2RlbFJFU1RTZXJ2aWNlc1tgJHtrZXkuY2hhckF0KDApLnRvTG93ZXJDYXNlKCl9JHtrZXkuc3Vic3RyKDEsIGtleS5sZW5ndGgpfWBdID0gdGhpcy5pbmplY3Rvci5nZXQoZGF0YVtrZXldKVxuXHRcdH0pXG5cdH1cbn1cbiIsImV4cG9ydCBjb25zdCBnZXROZXN0ZWQgPSAocGFyZW50OiBhbnksIGZpZWxkOiBzdHJpbmcpOiBhbnkgPT4ge1xyXG5cdGlmICgodHlwZW9mIHBhcmVudCAhPT0gJ29iamVjdCcpIHx8IChwYXJlbnQgPT09IG51bGwpIHx8ICh0eXBlb2YgZmllbGQgIT09ICdzdHJpbmcnKSB8fCAhZmllbGQubGVuZ3RoKSB7XHJcblx0XHRyZXR1cm4gdW5kZWZpbmVkXHJcblx0fVxyXG5cdGxldCBmaWVsZERhdGEgPSBmaWVsZC5zcGxpdCgnLicpLFxyXG5cdFx0ZmllbGREYXRhTGVuZ3RoID0gZmllbGREYXRhLmxlbmd0aCxcclxuXHRcdGN1cnJlbnRFbGVtZW50ID0gcGFyZW50XHJcblx0Zm9yIChsZXQgaSA9IDA7IGkgPCBmaWVsZERhdGFMZW5ndGg7IGkrKykge1xyXG5cdFx0aWYgKCh0eXBlb2YgY3VycmVudEVsZW1lbnQgPT09ICd1bmRlZmluZWQnKSB8fCAoY3VycmVudEVsZW1lbnQgPT09IG51bGwpKSB7XHJcblx0XHRcdHJldHVybiB1bmRlZmluZWRcclxuXHRcdH1cclxuXHRcdGxldCBpbm5lckVsZW1lbnROYW1lID0gZmllbGREYXRhW2ldXHJcblx0XHQvLyBsb2dpYyBmb3IgaGFuZGxpbmcgc2VxdWVsaXplLXN0eWxlICRmb28uYmFyJCAtIHNob3VsZCBiZSB0cmVhdGVkIGFzIGEgc2luZ2xlIGVsZW1lbnRcclxuXHRcdGlmIChpbm5lckVsZW1lbnROYW1lLmNoYXJBdCgwKSA9PT0gJyQnKSB7XHJcblx0XHRcdGxldCBjbG9zaW5nQnJhY2tldEZvdW5kID0gZmFsc2UsXHJcblx0XHRcdFx0Y2xvc2luZ0JyYWNrZXRJbmRleCA9IGkgKyAxXHJcblx0XHRcdHdoaWxlIChjbG9zaW5nQnJhY2tldEluZGV4IDwgZmllbGREYXRhTGVuZ3RoKSB7XHJcblx0XHRcdFx0Y29uc3QgZWxlbWVudCA9IGZpZWxkRGF0YVtjbG9zaW5nQnJhY2tldEluZGV4XVxyXG5cdFx0XHRcdC8vIGZhbHNlIGFsYXJtIC0gdGhlcmUncyBhbm90aGVyICQgb3BlbmluZyBiZWZvcmUgdGhlIGN1cnJlbnQgb25lIGNsb3NlZCAtIHNvIHRoZSBjdXJyZW50IG9uZSBtdXN0IGJlIGp1c3QgYSB2YXJpYWJsZSBuYW1lLCBub3QgYSBicmFja2V0XHJcblx0XHRcdFx0aWYgKGVsZW1lbnQuY2hhckF0KDApID09PSAnJCcpIHtcclxuXHRcdFx0XHRcdGJyZWFrXHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdC8vIGZvdW5kIGl0ICFcclxuXHRcdFx0XHRpZiAoZWxlbWVudC5jaGFyQXQoZWxlbWVudC5sZW5ndGggLSAxKSA9PT0gJyQnKSB7XHJcblx0XHRcdFx0XHRjbG9zaW5nQnJhY2tldEZvdW5kID0gdHJ1ZVxyXG5cdFx0XHRcdFx0YnJlYWtcclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0Y2xvc2luZ0JyYWNrZXRJbmRleCsrXHJcblx0XHRcdH1cclxuXHRcdFx0aWYgKGNsb3NpbmdCcmFja2V0Rm91bmQpIHtcclxuXHRcdFx0XHRmb3IgKGxldCBqID0gaSArIDE7IGogPD0gY2xvc2luZ0JyYWNrZXRJbmRleDsgaisrKSB7XHJcblx0XHRcdFx0XHRpbm5lckVsZW1lbnROYW1lICs9IGAuJHtmaWVsZERhdGFbal19YFxyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHRpID0gY2xvc2luZ0JyYWNrZXRJbmRleFxyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0XHRsZXQgbmV4dEVsZW1lbnQgPSBjdXJyZW50RWxlbWVudFtpbm5lckVsZW1lbnROYW1lXVxyXG5cdFx0aWYgKHR5cGVvZiBuZXh0RWxlbWVudCA9PT0gJ3VuZGVmaW5lZCcpIHtcclxuXHRcdFx0cmV0dXJuIHVuZGVmaW5lZFxyXG5cdFx0fVxyXG5cdFx0Ly8gaWYgdGhlIG5leHQgZWxlbWVudCBpcyBhbiBhcnJheSwgcHJlcGFyZSB0byByZXR1cm4gYW4gYXJyYXkgb2YgdGhlIGlubmVyIGl0ZW1zXHJcblx0XHRpZiAobmV4dEVsZW1lbnQgaW5zdGFuY2VvZiBBcnJheSkge1xyXG5cdFx0XHQvLyBpZiB0aGlzIGlzIHRoZSBsYXN0IGl0ZW0sIGp1c3QgcmV0dXJuIHRoZSBhcnJheVxyXG5cdFx0XHRpZiAoaSA9PT0gKGZpZWxkRGF0YUxlbmd0aCAtIDEpKSB7XHJcblx0XHRcdFx0cmV0dXJuIG5leHRFbGVtZW50XHJcblx0XHRcdH1cclxuXHRcdFx0Ly8gaWYgdGhlIG5leHQgaXRlbSBpcyBub3QgYW4gaW5kZXgsIHJlY3Vyc2l2ZWx5IGNhbGwgc2VsZiBmb3IgZWFjaCBpdGVtIG9mIHRoZSBhcnJheVxyXG5cdFx0XHRpZiAoaXNOYU4ocGFyc2VJbnQoZmllbGREYXRhW2kgKyAxXSwgMTApKSkge1xyXG5cdFx0XHRcdGN1cnJlbnRFbGVtZW50ID0gW11cclxuXHRcdFx0XHRsZXQgaW5uZXJQYXRoID0gJydcclxuXHRcdFx0XHRmb3IgKGxldCBqID0gaSArIDE7IGogPCBmaWVsZERhdGFMZW5ndGg7IGorKykge1xyXG5cdFx0XHRcdFx0aW5uZXJQYXRoICs9IGAke2ZpZWxkRGF0YVtqXX0ke2ogPCAoZmllbGREYXRhTGVuZ3RoIC0gMSkgPyAnLicgOiAnJ31gXHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdG5leHRFbGVtZW50LmZvckVhY2goKGl0ZW0sIGlJbmRleCkgPT4ge1xyXG5cdFx0XHRcdFx0bGV0IGlubmVyVmFsdWUgPSBnZXROZXN0ZWQoaXRlbSwgaW5uZXJQYXRoKVxyXG5cdFx0XHRcdFx0aWYgKHR5cGVvZiBpbm5lclZhbHVlICE9PSAndW5kZWZpbmVkJykge1xyXG5cdFx0XHRcdFx0XHQvLyBpZiB0aGUgaW5uZXJWYWx1ZSBpcyBhbiBhcnJheSB0b28sIG1lcmdlIGl0IHdpdGggdGhlIGN1cnJlbnRFbGVtZW50IC0gdGhpcyB3YXkgd2UgY2FuIGhhdmUgbmVzdGVkIGFycmF5cyB3aXRob3V0IGluZGV4ZXNcclxuXHRcdFx0XHRcdFx0aWYgKGlubmVyVmFsdWUgaW5zdGFuY2VvZiBBcnJheSkge1xyXG5cdFx0XHRcdFx0XHRcdGN1cnJlbnRFbGVtZW50ID0gY3VycmVudEVsZW1lbnQuY29uY2F0KGlubmVyVmFsdWUpXHJcblx0XHRcdFx0XHRcdFx0cmV0dXJuXHJcblx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdFx0IGN1cnJlbnRFbGVtZW50LnB1c2goaW5uZXJWYWx1ZSlcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9KVxyXG5cdFx0XHRcdHJldHVybiBjdXJyZW50RWxlbWVudFxyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0XHRjdXJyZW50RWxlbWVudCA9IG5leHRFbGVtZW50XHJcblx0fVxyXG5cdHJldHVybiBjdXJyZW50RWxlbWVudFxyXG59XHJcblxyXG5leHBvcnQgY29uc3Qgc2V0TmVzdGVkID0gKHBhcmVudDogYW55LCBmaWVsZDogc3RyaW5nLCB2YWx1ZTogYW55KTogYm9vbGVhbiA9PiB7XHJcblx0Y29uc3QgZmllbGROYW1lcyA9IGZpZWxkLnNwbGl0KCcuJylcclxuXHRpZiAoIWZpZWxkTmFtZXMubGVuZ3RoKSB7XHJcblx0XHRyZXR1cm4gZmFsc2VcclxuXHR9XHJcblx0bGV0IGN1cnJlbnRQYXJlbnQgPSBwYXJlbnQsXHJcblx0XHRsb29wRW5kID0gZmllbGROYW1lcy5sZW5ndGggLSAxXHJcblx0Zm9yIChsZXQgaSA9IDA7IGkgPCBsb29wRW5kOyBpKyspIHtcclxuXHRcdGNvbnN0IGZpZWxkTmFtZSA9IGZpZWxkTmFtZXNbaV1cclxuXHRcdGlmICh0eXBlb2YgY3VycmVudFBhcmVudFtmaWVsZE5hbWVdID09PSAndW5kZWZpbmVkJykge1xyXG5cdFx0XHRyZXR1cm4gZmFsc2VcclxuXHRcdH1cclxuXHRcdGN1cnJlbnRQYXJlbnQgPSBjdXJyZW50UGFyZW50W2ZpZWxkTmFtZV1cclxuXHR9XHJcblx0Y3VycmVudFBhcmVudFtmaWVsZE5hbWVzW2xvb3BFbmRdXSA9IHZhbHVlXHJcblx0cmV0dXJuIHRydWVcclxufVxyXG4iLCIndXNlIHN0cmljdCdcclxuXHJcbi8vIGFuZ3VsYXIgZGVwZW5kZW5jaWVzXHJcbmltcG9ydCB7Q29tbW9uTW9kdWxlfSBmcm9tICdAYW5ndWxhci9jb21tb24nXHJcbmltcG9ydCB7TmdNb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnXHJcblxyXG5cclxuQE5nTW9kdWxlKHtcclxuXHRpbXBvcnRzOiBbXHJcblx0XHRDb21tb25Nb2R1bGVcclxuXHRdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBSYW1zdGVyVUlDb3JlTW9kdWxlIHt9XHJcblxyXG5leHBvcnQgKiBmcm9tICcuL2NvbXBvbmVudHMvYmFzZS1sYXlvdXQuY29tcG9uZW50J1xyXG5leHBvcnQgKiBmcm9tICcuL2NvbXBvbmVudHMvYmFzZS1wYWdlLmNvbXBvbmVudCdcclxuZXhwb3J0ICogZnJvbSAnLi9zZXJ2aWNlcy9iYXNlUkVTVC5zZXJ2aWNlJ1xyXG5leHBvcnQgKiBmcm9tICcuL3NlcnZpY2VzL2ZpbGVzUkVTVC5zZXJ2aWNlJ1xyXG5leHBvcnQgKiBmcm9tICcuL3NlcnZpY2VzL2dsb2JhbEV2ZW50cy9nbG9iYWxFdmVudHMuc2VydmljZSdcclxuZXhwb3J0ICogZnJvbSAnLi9zZXJ2aWNlcy9nbG9iYWxFdmVudHMvZ2xvYmFsRXZlbnRzLmludGVyZmFjZXMnXHJcbmV4cG9ydCAqIGZyb20gJy4vc2VydmljZXMvbW9kZWxSRVNUU2VydmljZVByb3ZpZGVyLnNlcnZpY2UnXHJcbmV4cG9ydCAqIGZyb20gJy4vc2VydmljZXMvcmVxdWVzdC5zZXJ2aWNlJ1xyXG5leHBvcnQgKiBmcm9tICcuL3V0aWxzL3Rvb2xiZWx0J1xyXG5leHBvcnQgKiBmcm9tICcuL2ludGVyZmFjZXMvc2VsZWN0TGlzdC5pbnRlcmZhY2UnXHJcbiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFPQTtJQU1DLDZCQUNRLG1CQUF3QyxFQUN4QyxNQUFjO1FBRGQs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