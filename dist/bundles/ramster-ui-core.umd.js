(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('rxjs'), require('rxjs/operators'), require('@angular/core'), require('@angular/common/http'), require('co'), require('@angular/common')) :
    typeof define === 'function' && define.amd ? define('ramster-ui-core', ['exports', 'rxjs', 'rxjs/operators', '@angular/core', '@angular/common/http', 'co', '@angular/common'], factory) :
    (factory((global['ramster-ui-core'] = {}),global.rxjs,global.rxjs.operators,global.ng.core,global.ng.common.http,global.co,global.ng.common));
}(this, (function (exports,rxjs,operators,core,http,co,common) { 'use strict';

    co = co && co.hasOwnProperty('default') ? co['default'] : co;

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
            this.destroyed = new rxjs.Subject();
        }
        /**
         * @return {?}
         */
        BasePageComponent.prototype.ngOnInit = /**
         * @return {?}
         */
            function () {
                var _this = this;
                this.globalEventsService.initialDataLoaded$.pipe(operators.takeUntil(this.destroyed)).subscribe(function (data) { return _this.initialDataLoaded(data); });
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

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation. All rights reserved.
    Licensed under the Apache License, Version 2.0 (the "License"); you may not use
    this file except in compliance with the License. You may obtain a copy of the
    License at http://www.apache.org/licenses/LICENSE-2.0

    THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
    KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
    WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
    MERCHANTABLITY OR NON-INFRINGEMENT.

    See the Apache Version 2.0 License for specific language governing permissions
    and limitations under the License.
    ***************************************************************************** */
    function __rest(s, e) {
        var t = {};
        for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
                t[p] = s[p];
        if (s != null && typeof Object.getOwnPropertySymbols === "function")
            for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++)
                if (e.indexOf(p[i]) < 0)
                    t[p[i]] = s[p[i]];
        return t;
    }
    function __generator(thisArg, body) {
        var _ = { label: 0, sent: function () { if (t[0] & 1)
                throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
        return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function () { return this; }), g;
        function verb(n) { return function (v) { return step([n, v]); }; }
        function step(op) {
            if (f)
                throw new TypeError("Generator is already executing.");
            while (_)
                try {
                    if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done)
                        return t;
                    if (y = 0, t)
                        op = [op[0] & 2, t.value];
                    switch (op[0]) {
                        case 0:
                        case 1:
                            t = op;
                            break;
                        case 4:
                            _.label++;
                            return { value: op[1], done: false };
                        case 5:
                            _.label++;
                            y = op[1];
                            op = [0];
                            continue;
                        case 7:
                            op = _.ops.pop();
                            _.trys.pop();
                            continue;
                        default:
                            if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                                _ = 0;
                                continue;
                            }
                            if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) {
                                _.label = op[1];
                                break;
                            }
                            if (op[0] === 6 && _.label < t[1]) {
                                _.label = t[1];
                                t = op;
                                break;
                            }
                            if (t && _.label < t[2]) {
                                _.label = t[2];
                                _.ops.push(op);
                                break;
                            }
                            if (t[2])
                                _.ops.pop();
                            _.trys.pop();
                            continue;
                    }
                    op = body.call(thisArg, _);
                }
                catch (e) {
                    op = [6, e];
                    y = 0;
                }
                finally {
                    f = t = 0;
                }
            if (op[0] & 5)
                throw op[1];
            return { value: op[0] ? op[1] : void 0, done: true };
        }
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var GlobalEventsService = /** @class */ (function () {
        function GlobalEventsService() {
            this.pageLoadedSource = new rxjs.Subject();
            this.triggerInitialDataLoadSource = new rxjs.Subject();
            this.initialDataLoadedSource = new rxjs.Subject();
            this.setLayoutDataSource = new rxjs.Subject();
            this.redirectSource = new rxjs.Subject();
            this.notifySource = new rxjs.Subject();
            this.toggleLoaderSource = new rxjs.Subject();
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
            { type: core.Injectable }
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
                        var runOptions_1 = ( /** @type {?} */({}));
                        /** @type {?} */
                        var requestOptions = ( /** @type {?} */({}));
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
                        _this.client.request(new http.HttpRequest(method, actualUrl_1, body, requestOptions)).toPromise().then(function (response) { return runOptions_1.resolveWithFullResponse ? resolve(response) : resolve(response.body); }, function (error) { return reject(error); });
                    }
                    catch (error) {
                        reject(error);
                    }
                });
            };
        RequestService.decorators = [
            { type: core.Injectable }
        ];
        /** @nocollapse */
        RequestService.ctorParameters = function () {
            return [
                { type: http.HttpClient }
            ];
        };
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
            this.headers = new http.HttpHeaders({ 'Content-Type': 'application/json' });
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
            { type: core.Injectable }
        ];
        /** @nocollapse */
        BaseRESTService.ctorParameters = function () {
            return [
                { type: GlobalEventsService },
                { type: RequestService }
            ];
        };
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
            this.headers = new http.HttpHeaders();
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
            { type: core.Injectable }
        ];
        /** @nocollapse */
        FilesRESTService.ctorParameters = function () {
            return [
                { type: GlobalEventsService },
                { type: RequestService }
            ];
        };
        return FilesRESTService;
    }());

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
            { type: core.Injectable }
        ];
        /** @nocollapse */
        ModelRESTServiceProviderService.ctorParameters = function () {
            return [
                { type: core.Injector }
            ];
        };
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
            var innerElementName = fieldData[i];
            // logic for handling sequelize-style $foo.bar$ - should be treated as a single element
            if (innerElementName.charAt(0) === '$') {
                /** @type {?} */
                var closingBracketFound = false;
                /** @type {?} */
                var closingBracketIndex = i + 1;
                while (closingBracketIndex < fieldDataLength) {
                    /** @type {?} */
                    var element = fieldData[closingBracketIndex];
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
    var RamsterUICoreModule = /** @class */ (function () {
        function RamsterUICoreModule() {
        }
        RamsterUICoreModule.decorators = [
            { type: core.NgModule, args: [{
                        imports: [
                            common.CommonModule
                        ]
                    },] }
        ];
        return RamsterUICoreModule;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */

    exports.RamsterUICoreModule = RamsterUICoreModule;
    exports.BaseLayoutComponent = BaseLayoutComponent;
    exports.BasePageComponent = BasePageComponent;
    exports.BaseRESTService = BaseRESTService;
    exports.FilesRESTService = FilesRESTService;
    exports.GlobalEventsService = GlobalEventsService;
    exports.ModelRESTServiceProviderService = ModelRESTServiceProviderService;
    exports.RequestService = RequestService;
    exports.getNested = getNested;
    exports.setNested = setNested;

    Object.defineProperty(exports, '__esModule', { value: true });

})));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmFtc3Rlci11aS1jb3JlLnVtZC5qcy5tYXAiLCJzb3VyY2VzIjpbIm5nOi8vcmFtc3Rlci11aS1jb3JlL2NvbXBvbmVudHMvYmFzZS1sYXlvdXQuY29tcG9uZW50LnRzIiwibmc6Ly9yYW1zdGVyLXVpLWNvcmUvY29tcG9uZW50cy9iYXNlLXBhZ2UuY29tcG9uZW50LnRzIiwibm9kZV9tb2R1bGVzL3RzbGliL3RzbGliLmVzNi5qcyIsIm5nOi8vcmFtc3Rlci11aS1jb3JlL3NlcnZpY2VzL2dsb2JhbEV2ZW50cy9nbG9iYWxFdmVudHMuc2VydmljZS50cyIsIm5nOi8vcmFtc3Rlci11aS1jb3JlL3NlcnZpY2VzL3JlcXVlc3Quc2VydmljZS50cyIsIm5nOi8vcmFtc3Rlci11aS1jb3JlL3NlcnZpY2VzL2Jhc2VSRVNULnNlcnZpY2UudHMiLCJuZzovL3JhbXN0ZXItdWktY29yZS9zZXJ2aWNlcy9maWxlc1JFU1Quc2VydmljZS50cyIsIm5nOi8vcmFtc3Rlci11aS1jb3JlL3NlcnZpY2VzL21vZGVsUkVTVFNlcnZpY2VQcm92aWRlci5zZXJ2aWNlLnRzIiwibmc6Ly9yYW1zdGVyLXVpLWNvcmUvdXRpbHMvdG9vbGJlbHQudHMiLCJuZzovL3JhbXN0ZXItdWktY29yZS9pbmRleC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge09uSW5pdH0gZnJvbSAnQGFuZ3VsYXIvY29yZSdcclxuaW1wb3J0IHtSb3V0ZXJ9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcidcclxuXHJcbmltcG9ydCB7R2xvYmFsRXZlbnRzU2VydmljZX0gZnJvbSAnLi4vc2VydmljZXMvZ2xvYmFsRXZlbnRzL2dsb2JhbEV2ZW50cy5zZXJ2aWNlJ1xyXG5pbXBvcnQge0dFU1JlZGlyZWN0T3B0aW9uc0ludGVyZmFjZX0gZnJvbSAnLi4vc2VydmljZXMvZ2xvYmFsRXZlbnRzL2dsb2JhbEV2ZW50cy5pbnRlcmZhY2VzJ1xyXG5cclxuXHJcbmV4cG9ydCBjbGFzcyBCYXNlTGF5b3V0Q29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcclxuXHRpbml0aWFsRGF0YUxvYWRlZDogYm9vbGVhbiA9IGZhbHNlXHJcblx0bG9hZGVyQWN0aXZlOiBib29sZWFuID0gZmFsc2VcclxuXHRxdWVyeVBhcmFtczoge1t4OiBzdHJpbmddOiBzdHJpbmd9ID0ge31cclxuXHRyb3V0ZVBhcmFtczoge1t4OiBzdHJpbmddOiBzdHJpbmd9ID0ge31cclxuXHJcblx0Y29uc3RydWN0b3IoXHJcblx0XHRwdWJsaWMgZ2xvYmFsRXZlbnRzU2VydmljZTogR2xvYmFsRXZlbnRzU2VydmljZSxcclxuXHRcdHB1YmxpYyByb3V0ZXI6IFJvdXRlclxyXG5cdCkge1xyXG5cdH1cclxuXHJcblx0bmdPbkluaXQoKTogdm9pZCB7XHJcblx0XHR0aGlzLmdsb2JhbEV2ZW50c1NlcnZpY2UucGFnZUxvYWRlZCQuc3Vic2NyaWJlKChkYXRhPzoge1t4OiBzdHJpbmddOiBhbnl9KSA9PiB0aGlzLnBhZ2VMb2FkZWQoZGF0YSkpXHJcblx0XHR0aGlzLmdsb2JhbEV2ZW50c1NlcnZpY2UudHJpZ2dlckluaXRpYWxEYXRhTG9hZCQuc3Vic2NyaWJlKCgpID0+IHRoaXMubG9hZEluaXRpYWxEYXRhKCkpXHJcblx0XHR0aGlzLmdsb2JhbEV2ZW50c1NlcnZpY2Uuc2V0TGF5b3V0RGF0YSQuc3Vic2NyaWJlKChkYXRhKSA9PiB0aGlzLnNldExheW91dERhdGEoZGF0YSkpXHJcblx0XHR0aGlzLmdsb2JhbEV2ZW50c1NlcnZpY2UucmVkaXJlY3QkLnN1YnNjcmliZSgoe3JvdXRlLCBvcHRpb25zfSkgPT4gdGhpcy5yZWRpcmVjdChyb3V0ZSwgb3B0aW9ucykpXHJcblx0XHR0aGlzLmdsb2JhbEV2ZW50c1NlcnZpY2UudG9nZ2xlTG9hZGVyJC5zdWJzY3JpYmUoKGFjdGl2ZSkgPT4gdGhpcy50b2dnbGVMb2FkZXIoYWN0aXZlKSlcclxuXHR9XHJcblxyXG5cdHNlbmRJbml0aWFsRGF0YUxvYWRlZEV2ZW50KCkge1xyXG5cdFx0dGhpcy5nbG9iYWxFdmVudHNTZXJ2aWNlLmluaXRpYWxEYXRhTG9hZGVkKHtxdWVyeVBhcmFtczogdGhpcy5xdWVyeVBhcmFtcywgcm91dGVQYXJhbXM6IHRoaXMucm91dGVQYXJhbXN9KVxyXG5cdH1cclxuXHJcblxyXG5cdC8vIGdsb2JhbEV2ZW50c1NlcnZpY2UgaGFuZGxlcnNcclxuXHJcblx0cGFnZUxvYWRlZChkYXRhPzoge1t4OiBzdHJpbmddOiBhbnl9KTogdm9pZCB7XHJcblx0XHRpZiAoZGF0YSkge1xyXG5cdFx0XHRmb3IgKGNvbnN0IGtleSBpbiBkYXRhKSB7XHJcblx0XHRcdFx0dGhpc1trZXldID0gZGF0YVtrZXldXHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHRcdGlmICh0aGlzLmluaXRpYWxEYXRhTG9hZGVkKSB7XHJcblx0XHRcdHRoaXMuc2VuZEluaXRpYWxEYXRhTG9hZGVkRXZlbnQoKVxyXG5cdFx0XHRyZXR1cm5cclxuXHRcdH1cclxuXHRcdHRoaXMubG9hZEluaXRpYWxEYXRhKClcclxuXHR9XHJcblxyXG5cdGxvYWRJbml0aWFsRGF0YSgpOiB2b2lkIHtcclxuXHRcdHRoaXMuc2VuZEluaXRpYWxEYXRhTG9hZGVkRXZlbnQoKVxyXG5cdH1cclxuXHJcblx0c2V0TGF5b3V0RGF0YShhcmdzOiB7W3g6IHN0cmluZ106IGFueX0pIHtcclxuXHRcdGZvciAoY29uc3Qga2V5IGluIGFyZ3MpIHtcclxuXHRcdFx0dGhpc1trZXldID0gYXJnc1trZXldXHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRyZWRpcmVjdChyb3V0ZTogc3RyaW5nLCBvcHRpb25zOiBHRVNSZWRpcmVjdE9wdGlvbnNJbnRlcmZhY2UpOiB2b2lkIHtcclxuXHRcdGNvbnN0IGFjdHVhbE9wdGlvbnMgPSBvcHRpb25zIHx8IHt9LFxyXG5cdFx0XHR7cXVlcnlQYXJhbXMsIHJlbG9hZEluaXRpYWxEYXRhfSA9IGFjdHVhbE9wdGlvbnNcclxuXHRcdGlmIChyZWxvYWRJbml0aWFsRGF0YSkge1xyXG5cdFx0XHR0aGlzLmluaXRpYWxEYXRhTG9hZGVkID0gZmFsc2VcclxuXHRcdH1cclxuXHRcdHRoaXMucm91dGVyLm5hdmlnYXRlKFtyb3V0ZV0sIHtxdWVyeVBhcmFtczogcXVlcnlQYXJhbXMgfHwge319KVxyXG5cdH1cclxuXHJcblx0dG9nZ2xlTG9hZGVyKGFjdGl2ZTogYm9vbGVhbik6IHZvaWQge1xyXG5cdFx0dGhpcy5sb2FkZXJBY3RpdmUgPSBhY3RpdmVcclxuXHR9XHJcbn1cclxuIiwiJ3VzZSBzdHJpY3QnXHJcblxyXG5pbXBvcnQge0FjdGl2YXRlZFJvdXRlfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInXHJcbmltcG9ydCB7T25EZXN0cm95LCBPbkluaXR9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnXHJcbmltcG9ydCB7U3ViamVjdH0gZnJvbSAncnhqcydcclxuaW1wb3J0IHt0YWtlVW50aWx9IGZyb20gJ3J4anMvb3BlcmF0b3JzJ1xyXG5cclxuaW1wb3J0IHtHbG9iYWxFdmVudHNTZXJ2aWNlfSBmcm9tICcuLi9zZXJ2aWNlcy9nbG9iYWxFdmVudHMvZ2xvYmFsRXZlbnRzLnNlcnZpY2UnXHJcblxyXG5leHBvcnQgY2xhc3MgQmFzZVBhZ2VDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSB7XHJcblx0ZGVzdHJveWVkOiBTdWJqZWN0PHZvaWQ+ID0gbmV3IFN1YmplY3QoKVxyXG5cdGxvZ2dlZEluVXNlcj86IGFueVxyXG5cdHF1ZXJ5UGFyYW1zOiB7W3g6IHN0cmluZ106IHN0cmluZ31cclxuXHRyb3V0ZVBhcmFtczoge1t4OiBzdHJpbmddOiBzdHJpbmd9XHJcblxyXG5cdGNvbnN0cnVjdG9yKFxyXG5cdFx0cHVibGljIGFjdGl2YXRlZFJvdXRlOiBBY3RpdmF0ZWRSb3V0ZSxcclxuXHRcdHB1YmxpYyBnbG9iYWxFdmVudHNTZXJ2aWNlOiBHbG9iYWxFdmVudHNTZXJ2aWNlLFxyXG5cdFx0cHVibGljIG9uSW5pdE1ldGhvZE5hbWVzOiBzdHJpbmdbXSxcclxuXHRcdHB1YmxpYyBvbkluaXRpYWxEYXRhTG9hZGVkTWV0aG9kTmFtZXM6IHN0cmluZ1tdXHJcblx0KSB7XHJcblx0fVxyXG5cclxuXHRuZ09uSW5pdCgpIHtcclxuXHRcdHRoaXMuZ2xvYmFsRXZlbnRzU2VydmljZS5pbml0aWFsRGF0YUxvYWRlZCQucGlwZSh0YWtlVW50aWwodGhpcy5kZXN0cm95ZWQpKS5zdWJzY3JpYmUoKGRhdGEpID0+IHRoaXMuaW5pdGlhbERhdGFMb2FkZWQoZGF0YSkpXHJcblx0XHR0aGlzLm9uSW5pdE1ldGhvZE5hbWVzLmZvckVhY2goKG1ldGhvZE5hbWUpID0+IHtcclxuXHRcdFx0aWYgKHR5cGVvZiB0aGlzW21ldGhvZE5hbWVdID09PSAnZnVuY3Rpb24nKSB7XHJcblx0XHRcdFx0dGhpc1ttZXRob2ROYW1lXSgpXHJcblx0XHRcdH1cclxuXHRcdH0pXHJcblx0fVxyXG5cclxuXHRyZXNldCgpOiB2b2lkIHtcclxuXHRcdHRoaXMucXVlcnlQYXJhbXMgPSB0aGlzLmFjdGl2YXRlZFJvdXRlLnNuYXBzaG90LnF1ZXJ5UGFyYW1zXHJcblx0XHR0aGlzLnJvdXRlUGFyYW1zID0gdGhpcy5hY3RpdmF0ZWRSb3V0ZS5zbmFwc2hvdC5wYXJhbXNcclxuXHR9XHJcblxyXG5cdHNlbmRQYWdlTG9hZGVkRXZlbnQoKSB7XHJcblx0XHR0aGlzLmdsb2JhbEV2ZW50c1NlcnZpY2UucGFnZUxvYWRlZCh7cXVlcnlQYXJhbXM6IHRoaXMucXVlcnlQYXJhbXMsIHJvdXRlUGFyYW1zOiB0aGlzLnJvdXRlUGFyYW1zfSlcclxuXHR9XHJcblxyXG5cdGluaXRpYWxEYXRhTG9hZGVkKGRhdGEpOiB2b2lkIHtcclxuXHRcdHRoaXMubG9nZ2VkSW5Vc2VyID0gZGF0YS51c2VyXHJcblx0XHR0aGlzLnF1ZXJ5UGFyYW1zID0gZGF0YS5xdWVyeVBhcmFtc1xyXG5cdFx0dGhpcy5yb3V0ZVBhcmFtcyA9IGRhdGEucm91dGVQYXJhbXNcclxuXHRcdHRoaXMub25Jbml0aWFsRGF0YUxvYWRlZE1ldGhvZE5hbWVzLmZvckVhY2goKG1ldGhvZE5hbWUpID0+IHtcclxuXHRcdFx0aWYgKHR5cGVvZiB0aGlzW21ldGhvZE5hbWVdID09PSAnZnVuY3Rpb24nKSB7XHJcblx0XHRcdFx0dGhpc1ttZXRob2ROYW1lXShkYXRhKVxyXG5cdFx0XHR9XHJcblx0XHR9KVxyXG5cdH1cclxuXHJcblx0ZGVzdHJ1Y3RvcigpIHtcclxuXHRcdHRoaXMuZGVzdHJveWVkLm5leHQoKVxyXG5cdFx0dGhpcy5kZXN0cm95ZWQuY29tcGxldGUoKVxyXG5cdH1cclxuXHJcblx0bmdPbkRlc3Ryb3koKSB7XHJcblx0XHR0aGlzLmRlc3RydWN0b3IoKVxyXG5cdH1cclxufVxyXG4iLCIvKiEgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuQ29weXJpZ2h0IChjKSBNaWNyb3NvZnQgQ29ycG9yYXRpb24uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXHJcbkxpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7IHlvdSBtYXkgbm90IHVzZVxyXG50aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS4gWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZVxyXG5MaWNlbnNlIGF0IGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxyXG5cclxuVEhJUyBDT0RFIElTIFBST1ZJREVEIE9OIEFOICpBUyBJUyogQkFTSVMsIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWVxyXG5LSU5ELCBFSVRIRVIgRVhQUkVTUyBPUiBJTVBMSUVELCBJTkNMVURJTkcgV0lUSE9VVCBMSU1JVEFUSU9OIEFOWSBJTVBMSUVEXHJcbldBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBUSVRMRSwgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UsXHJcbk1FUkNIQU5UQUJMSVRZIE9SIE5PTi1JTkZSSU5HRU1FTlQuXHJcblxyXG5TZWUgdGhlIEFwYWNoZSBWZXJzaW9uIDIuMCBMaWNlbnNlIGZvciBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnNcclxuYW5kIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxyXG4qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiAqL1xyXG4vKiBnbG9iYWwgUmVmbGVjdCwgUHJvbWlzZSAqL1xyXG5cclxudmFyIGV4dGVuZFN0YXRpY3MgPSBmdW5jdGlvbihkLCBiKSB7XHJcbiAgICBleHRlbmRTdGF0aWNzID0gT2JqZWN0LnNldFByb3RvdHlwZU9mIHx8XHJcbiAgICAgICAgKHsgX19wcm90b19fOiBbXSB9IGluc3RhbmNlb2YgQXJyYXkgJiYgZnVuY3Rpb24gKGQsIGIpIHsgZC5fX3Byb3RvX18gPSBiOyB9KSB8fFxyXG4gICAgICAgIGZ1bmN0aW9uIChkLCBiKSB7IGZvciAodmFyIHAgaW4gYikgaWYgKGIuaGFzT3duUHJvcGVydHkocCkpIGRbcF0gPSBiW3BdOyB9O1xyXG4gICAgcmV0dXJuIGV4dGVuZFN0YXRpY3MoZCwgYik7XHJcbn07XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19leHRlbmRzKGQsIGIpIHtcclxuICAgIGV4dGVuZFN0YXRpY3MoZCwgYik7XHJcbiAgICBmdW5jdGlvbiBfXygpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGQ7IH1cclxuICAgIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcclxufVxyXG5cclxuZXhwb3J0IHZhciBfX2Fzc2lnbiA9IGZ1bmN0aW9uKCkge1xyXG4gICAgX19hc3NpZ24gPSBPYmplY3QuYXNzaWduIHx8IGZ1bmN0aW9uIF9fYXNzaWduKHQpIHtcclxuICAgICAgICBmb3IgKHZhciBzLCBpID0gMSwgbiA9IGFyZ3VtZW50cy5sZW5ndGg7IGkgPCBuOyBpKyspIHtcclxuICAgICAgICAgICAgcyA9IGFyZ3VtZW50c1tpXTtcclxuICAgICAgICAgICAgZm9yICh2YXIgcCBpbiBzKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHMsIHApKSB0W3BdID0gc1twXTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHQ7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gX19hc3NpZ24uYXBwbHkodGhpcywgYXJndW1lbnRzKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fcmVzdChzLCBlKSB7XHJcbiAgICB2YXIgdCA9IHt9O1xyXG4gICAgZm9yICh2YXIgcCBpbiBzKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHMsIHApICYmIGUuaW5kZXhPZihwKSA8IDApXHJcbiAgICAgICAgdFtwXSA9IHNbcF07XHJcbiAgICBpZiAocyAhPSBudWxsICYmIHR5cGVvZiBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzID09PSBcImZ1bmN0aW9uXCIpXHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDAsIHAgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzKHMpOyBpIDwgcC5sZW5ndGg7IGkrKykgaWYgKGUuaW5kZXhPZihwW2ldKSA8IDApXHJcbiAgICAgICAgICAgIHRbcFtpXV0gPSBzW3BbaV1dO1xyXG4gICAgcmV0dXJuIHQ7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2RlY29yYXRlKGRlY29yYXRvcnMsIHRhcmdldCwga2V5LCBkZXNjKSB7XHJcbiAgICB2YXIgYyA9IGFyZ3VtZW50cy5sZW5ndGgsIHIgPSBjIDwgMyA/IHRhcmdldCA6IGRlc2MgPT09IG51bGwgPyBkZXNjID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcih0YXJnZXQsIGtleSkgOiBkZXNjLCBkO1xyXG4gICAgaWYgKHR5cGVvZiBSZWZsZWN0ID09PSBcIm9iamVjdFwiICYmIHR5cGVvZiBSZWZsZWN0LmRlY29yYXRlID09PSBcImZ1bmN0aW9uXCIpIHIgPSBSZWZsZWN0LmRlY29yYXRlKGRlY29yYXRvcnMsIHRhcmdldCwga2V5LCBkZXNjKTtcclxuICAgIGVsc2UgZm9yICh2YXIgaSA9IGRlY29yYXRvcnMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIGlmIChkID0gZGVjb3JhdG9yc1tpXSkgciA9IChjIDwgMyA/IGQocikgOiBjID4gMyA/IGQodGFyZ2V0LCBrZXksIHIpIDogZCh0YXJnZXQsIGtleSkpIHx8IHI7XHJcbiAgICByZXR1cm4gYyA+IDMgJiYgciAmJiBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBrZXksIHIpLCByO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19wYXJhbShwYXJhbUluZGV4LCBkZWNvcmF0b3IpIHtcclxuICAgIHJldHVybiBmdW5jdGlvbiAodGFyZ2V0LCBrZXkpIHsgZGVjb3JhdG9yKHRhcmdldCwga2V5LCBwYXJhbUluZGV4KTsgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19tZXRhZGF0YShtZXRhZGF0YUtleSwgbWV0YWRhdGFWYWx1ZSkge1xyXG4gICAgaWYgKHR5cGVvZiBSZWZsZWN0ID09PSBcIm9iamVjdFwiICYmIHR5cGVvZiBSZWZsZWN0Lm1ldGFkYXRhID09PSBcImZ1bmN0aW9uXCIpIHJldHVybiBSZWZsZWN0Lm1ldGFkYXRhKG1ldGFkYXRhS2V5LCBtZXRhZGF0YVZhbHVlKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXdhaXRlcih0aGlzQXJnLCBfYXJndW1lbnRzLCBQLCBnZW5lcmF0b3IpIHtcclxuICAgIHJldHVybiBuZXcgKFAgfHwgKFAgPSBQcm9taXNlKSkoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xyXG4gICAgICAgIGZ1bmN0aW9uIGZ1bGZpbGxlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvci5uZXh0KHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cclxuICAgICAgICBmdW5jdGlvbiByZWplY3RlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvcltcInRocm93XCJdKHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cclxuICAgICAgICBmdW5jdGlvbiBzdGVwKHJlc3VsdCkgeyByZXN1bHQuZG9uZSA/IHJlc29sdmUocmVzdWx0LnZhbHVlKSA6IG5ldyBQKGZ1bmN0aW9uIChyZXNvbHZlKSB7IHJlc29sdmUocmVzdWx0LnZhbHVlKTsgfSkudGhlbihmdWxmaWxsZWQsIHJlamVjdGVkKTsgfVxyXG4gICAgICAgIHN0ZXAoKGdlbmVyYXRvciA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSkubmV4dCgpKTtcclxuICAgIH0pO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19nZW5lcmF0b3IodGhpc0FyZywgYm9keSkge1xyXG4gICAgdmFyIF8gPSB7IGxhYmVsOiAwLCBzZW50OiBmdW5jdGlvbigpIHsgaWYgKHRbMF0gJiAxKSB0aHJvdyB0WzFdOyByZXR1cm4gdFsxXTsgfSwgdHJ5czogW10sIG9wczogW10gfSwgZiwgeSwgdCwgZztcclxuICAgIHJldHVybiBnID0geyBuZXh0OiB2ZXJiKDApLCBcInRocm93XCI6IHZlcmIoMSksIFwicmV0dXJuXCI6IHZlcmIoMikgfSwgdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIChnW1N5bWJvbC5pdGVyYXRvcl0gPSBmdW5jdGlvbigpIHsgcmV0dXJuIHRoaXM7IH0pLCBnO1xyXG4gICAgZnVuY3Rpb24gdmVyYihuKSB7IHJldHVybiBmdW5jdGlvbiAodikgeyByZXR1cm4gc3RlcChbbiwgdl0pOyB9OyB9XHJcbiAgICBmdW5jdGlvbiBzdGVwKG9wKSB7XHJcbiAgICAgICAgaWYgKGYpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJHZW5lcmF0b3IgaXMgYWxyZWFkeSBleGVjdXRpbmcuXCIpO1xyXG4gICAgICAgIHdoaWxlIChfKSB0cnkge1xyXG4gICAgICAgICAgICBpZiAoZiA9IDEsIHkgJiYgKHQgPSBvcFswXSAmIDIgPyB5W1wicmV0dXJuXCJdIDogb3BbMF0gPyB5W1widGhyb3dcIl0gfHwgKCh0ID0geVtcInJldHVyblwiXSkgJiYgdC5jYWxsKHkpLCAwKSA6IHkubmV4dCkgJiYgISh0ID0gdC5jYWxsKHksIG9wWzFdKSkuZG9uZSkgcmV0dXJuIHQ7XHJcbiAgICAgICAgICAgIGlmICh5ID0gMCwgdCkgb3AgPSBbb3BbMF0gJiAyLCB0LnZhbHVlXTtcclxuICAgICAgICAgICAgc3dpdGNoIChvcFswXSkge1xyXG4gICAgICAgICAgICAgICAgY2FzZSAwOiBjYXNlIDE6IHQgPSBvcDsgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDQ6IF8ubGFiZWwrKzsgcmV0dXJuIHsgdmFsdWU6IG9wWzFdLCBkb25lOiBmYWxzZSB9O1xyXG4gICAgICAgICAgICAgICAgY2FzZSA1OiBfLmxhYmVsKys7IHkgPSBvcFsxXTsgb3AgPSBbMF07IGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgY2FzZSA3OiBvcCA9IF8ub3BzLnBvcCgpOyBfLnRyeXMucG9wKCk7IGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgICAgICBpZiAoISh0ID0gXy50cnlzLCB0ID0gdC5sZW5ndGggPiAwICYmIHRbdC5sZW5ndGggLSAxXSkgJiYgKG9wWzBdID09PSA2IHx8IG9wWzBdID09PSAyKSkgeyBfID0gMDsgY29udGludWU7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAob3BbMF0gPT09IDMgJiYgKCF0IHx8IChvcFsxXSA+IHRbMF0gJiYgb3BbMV0gPCB0WzNdKSkpIHsgXy5sYWJlbCA9IG9wWzFdOyBicmVhazsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChvcFswXSA9PT0gNiAmJiBfLmxhYmVsIDwgdFsxXSkgeyBfLmxhYmVsID0gdFsxXTsgdCA9IG9wOyBicmVhazsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0ICYmIF8ubGFiZWwgPCB0WzJdKSB7IF8ubGFiZWwgPSB0WzJdOyBfLm9wcy5wdXNoKG9wKTsgYnJlYWs7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAodFsyXSkgXy5vcHMucG9wKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgXy50cnlzLnBvcCgpOyBjb250aW51ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBvcCA9IGJvZHkuY2FsbCh0aGlzQXJnLCBfKTtcclxuICAgICAgICB9IGNhdGNoIChlKSB7IG9wID0gWzYsIGVdOyB5ID0gMDsgfSBmaW5hbGx5IHsgZiA9IHQgPSAwOyB9XHJcbiAgICAgICAgaWYgKG9wWzBdICYgNSkgdGhyb3cgb3BbMV07IHJldHVybiB7IHZhbHVlOiBvcFswXSA/IG9wWzFdIDogdm9pZCAwLCBkb25lOiB0cnVlIH07XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2V4cG9ydFN0YXIobSwgZXhwb3J0cykge1xyXG4gICAgZm9yICh2YXIgcCBpbiBtKSBpZiAoIWV4cG9ydHMuaGFzT3duUHJvcGVydHkocCkpIGV4cG9ydHNbcF0gPSBtW3BdO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX192YWx1ZXMobykge1xyXG4gICAgdmFyIG0gPSB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgb1tTeW1ib2wuaXRlcmF0b3JdLCBpID0gMDtcclxuICAgIGlmIChtKSByZXR1cm4gbS5jYWxsKG8pO1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICBuZXh0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGlmIChvICYmIGkgPj0gby5sZW5ndGgpIG8gPSB2b2lkIDA7XHJcbiAgICAgICAgICAgIHJldHVybiB7IHZhbHVlOiBvICYmIG9baSsrXSwgZG9uZTogIW8gfTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19yZWFkKG8sIG4pIHtcclxuICAgIHZhciBtID0gdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIG9bU3ltYm9sLml0ZXJhdG9yXTtcclxuICAgIGlmICghbSkgcmV0dXJuIG87XHJcbiAgICB2YXIgaSA9IG0uY2FsbChvKSwgciwgYXIgPSBbXSwgZTtcclxuICAgIHRyeSB7XHJcbiAgICAgICAgd2hpbGUgKChuID09PSB2b2lkIDAgfHwgbi0tID4gMCkgJiYgIShyID0gaS5uZXh0KCkpLmRvbmUpIGFyLnB1c2goci52YWx1ZSk7XHJcbiAgICB9XHJcbiAgICBjYXRjaCAoZXJyb3IpIHsgZSA9IHsgZXJyb3I6IGVycm9yIH07IH1cclxuICAgIGZpbmFsbHkge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIGlmIChyICYmICFyLmRvbmUgJiYgKG0gPSBpW1wicmV0dXJuXCJdKSkgbS5jYWxsKGkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBmaW5hbGx5IHsgaWYgKGUpIHRocm93IGUuZXJyb3I7IH1cclxuICAgIH1cclxuICAgIHJldHVybiBhcjtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fc3ByZWFkKCkge1xyXG4gICAgZm9yICh2YXIgYXIgPSBbXSwgaSA9IDA7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspXHJcbiAgICAgICAgYXIgPSBhci5jb25jYXQoX19yZWFkKGFyZ3VtZW50c1tpXSkpO1xyXG4gICAgcmV0dXJuIGFyO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hd2FpdCh2KSB7XHJcbiAgICByZXR1cm4gdGhpcyBpbnN0YW5jZW9mIF9fYXdhaXQgPyAodGhpcy52ID0gdiwgdGhpcykgOiBuZXcgX19hd2FpdCh2KTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXN5bmNHZW5lcmF0b3IodGhpc0FyZywgX2FyZ3VtZW50cywgZ2VuZXJhdG9yKSB7XHJcbiAgICBpZiAoIVN5bWJvbC5hc3luY0l0ZXJhdG9yKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiU3ltYm9sLmFzeW5jSXRlcmF0b3IgaXMgbm90IGRlZmluZWQuXCIpO1xyXG4gICAgdmFyIGcgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSksIGksIHEgPSBbXTtcclxuICAgIHJldHVybiBpID0ge30sIHZlcmIoXCJuZXh0XCIpLCB2ZXJiKFwidGhyb3dcIiksIHZlcmIoXCJyZXR1cm5cIiksIGlbU3ltYm9sLmFzeW5jSXRlcmF0b3JdID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfSwgaTtcclxuICAgIGZ1bmN0aW9uIHZlcmIobikgeyBpZiAoZ1tuXSkgaVtuXSA9IGZ1bmN0aW9uICh2KSB7IHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAoYSwgYikgeyBxLnB1c2goW24sIHYsIGEsIGJdKSA+IDEgfHwgcmVzdW1lKG4sIHYpOyB9KTsgfTsgfVxyXG4gICAgZnVuY3Rpb24gcmVzdW1lKG4sIHYpIHsgdHJ5IHsgc3RlcChnW25dKHYpKTsgfSBjYXRjaCAoZSkgeyBzZXR0bGUocVswXVszXSwgZSk7IH0gfVxyXG4gICAgZnVuY3Rpb24gc3RlcChyKSB7IHIudmFsdWUgaW5zdGFuY2VvZiBfX2F3YWl0ID8gUHJvbWlzZS5yZXNvbHZlKHIudmFsdWUudikudGhlbihmdWxmaWxsLCByZWplY3QpIDogc2V0dGxlKHFbMF1bMl0sIHIpOyB9XHJcbiAgICBmdW5jdGlvbiBmdWxmaWxsKHZhbHVlKSB7IHJlc3VtZShcIm5leHRcIiwgdmFsdWUpOyB9XHJcbiAgICBmdW5jdGlvbiByZWplY3QodmFsdWUpIHsgcmVzdW1lKFwidGhyb3dcIiwgdmFsdWUpOyB9XHJcbiAgICBmdW5jdGlvbiBzZXR0bGUoZiwgdikgeyBpZiAoZih2KSwgcS5zaGlmdCgpLCBxLmxlbmd0aCkgcmVzdW1lKHFbMF1bMF0sIHFbMF1bMV0pOyB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2FzeW5jRGVsZWdhdG9yKG8pIHtcclxuICAgIHZhciBpLCBwO1xyXG4gICAgcmV0dXJuIGkgPSB7fSwgdmVyYihcIm5leHRcIiksIHZlcmIoXCJ0aHJvd1wiLCBmdW5jdGlvbiAoZSkgeyB0aHJvdyBlOyB9KSwgdmVyYihcInJldHVyblwiKSwgaVtTeW1ib2wuaXRlcmF0b3JdID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfSwgaTtcclxuICAgIGZ1bmN0aW9uIHZlcmIobiwgZikgeyBpW25dID0gb1tuXSA/IGZ1bmN0aW9uICh2KSB7IHJldHVybiAocCA9ICFwKSA/IHsgdmFsdWU6IF9fYXdhaXQob1tuXSh2KSksIGRvbmU6IG4gPT09IFwicmV0dXJuXCIgfSA6IGYgPyBmKHYpIDogdjsgfSA6IGY7IH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXN5bmNWYWx1ZXMobykge1xyXG4gICAgaWYgKCFTeW1ib2wuYXN5bmNJdGVyYXRvcikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlN5bWJvbC5hc3luY0l0ZXJhdG9yIGlzIG5vdCBkZWZpbmVkLlwiKTtcclxuICAgIHZhciBtID0gb1tTeW1ib2wuYXN5bmNJdGVyYXRvcl0sIGk7XHJcbiAgICByZXR1cm4gbSA/IG0uY2FsbChvKSA6IChvID0gdHlwZW9mIF9fdmFsdWVzID09PSBcImZ1bmN0aW9uXCIgPyBfX3ZhbHVlcyhvKSA6IG9bU3ltYm9sLml0ZXJhdG9yXSgpLCBpID0ge30sIHZlcmIoXCJuZXh0XCIpLCB2ZXJiKFwidGhyb3dcIiksIHZlcmIoXCJyZXR1cm5cIiksIGlbU3ltYm9sLmFzeW5jSXRlcmF0b3JdID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfSwgaSk7XHJcbiAgICBmdW5jdGlvbiB2ZXJiKG4pIHsgaVtuXSA9IG9bbl0gJiYgZnVuY3Rpb24gKHYpIHsgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHsgdiA9IG9bbl0odiksIHNldHRsZShyZXNvbHZlLCByZWplY3QsIHYuZG9uZSwgdi52YWx1ZSk7IH0pOyB9OyB9XHJcbiAgICBmdW5jdGlvbiBzZXR0bGUocmVzb2x2ZSwgcmVqZWN0LCBkLCB2KSB7IFByb21pc2UucmVzb2x2ZSh2KS50aGVuKGZ1bmN0aW9uKHYpIHsgcmVzb2x2ZSh7IHZhbHVlOiB2LCBkb25lOiBkIH0pOyB9LCByZWplY3QpOyB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX21ha2VUZW1wbGF0ZU9iamVjdChjb29rZWQsIHJhdykge1xyXG4gICAgaWYgKE9iamVjdC5kZWZpbmVQcm9wZXJ0eSkgeyBPYmplY3QuZGVmaW5lUHJvcGVydHkoY29va2VkLCBcInJhd1wiLCB7IHZhbHVlOiByYXcgfSk7IH0gZWxzZSB7IGNvb2tlZC5yYXcgPSByYXc7IH1cclxuICAgIHJldHVybiBjb29rZWQ7XHJcbn07XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19pbXBvcnRTdGFyKG1vZCkge1xyXG4gICAgaWYgKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgcmV0dXJuIG1vZDtcclxuICAgIHZhciByZXN1bHQgPSB7fTtcclxuICAgIGlmIChtb2QgIT0gbnVsbCkgZm9yICh2YXIgayBpbiBtb2QpIGlmIChPYmplY3QuaGFzT3duUHJvcGVydHkuY2FsbChtb2QsIGspKSByZXN1bHRba10gPSBtb2Rba107XHJcbiAgICByZXN1bHQuZGVmYXVsdCA9IG1vZDtcclxuICAgIHJldHVybiByZXN1bHQ7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2ltcG9ydERlZmF1bHQobW9kKSB7XHJcbiAgICByZXR1cm4gKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgPyBtb2QgOiB7IGRlZmF1bHQ6IG1vZCB9O1xyXG59XHJcbiIsImltcG9ydCB7SW5qZWN0YWJsZX0gZnJvbSAnQGFuZ3VsYXIvY29yZSdcclxuaW1wb3J0IHtTdWJqZWN0fSBmcm9tICdyeGpzJ1xyXG5pbXBvcnQge0dFU1JlZGlyZWN0T3B0aW9uc0ludGVyZmFjZX0gZnJvbSAnLi9nbG9iYWxFdmVudHMuaW50ZXJmYWNlcydcclxuXHJcbkBJbmplY3RhYmxlKClcclxuZXhwb3J0IGNsYXNzIEdsb2JhbEV2ZW50c1NlcnZpY2Uge1xyXG5cdHBhZ2VMb2FkZWRTb3VyY2UgPSBuZXcgU3ViamVjdDx7W3g6IHN0cmluZ106IGFueX0gfCB2b2lkPigpXHJcblx0dHJpZ2dlckluaXRpYWxEYXRhTG9hZFNvdXJjZSA9IG5ldyBTdWJqZWN0PHZvaWQ+KClcclxuXHRpbml0aWFsRGF0YUxvYWRlZFNvdXJjZSA9IG5ldyBTdWJqZWN0PGFueT4oKVxyXG5cdHNldExheW91dERhdGFTb3VyY2UgPSBuZXcgU3ViamVjdDx7W3g6IHN0cmluZ106IGFueX0+KClcclxuXHRyZWRpcmVjdFNvdXJjZSA9IG5ldyBTdWJqZWN0PHtyb3V0ZTogc3RyaW5nLCBvcHRpb25zOiBHRVNSZWRpcmVjdE9wdGlvbnNJbnRlcmZhY2V9PigpXHJcblx0bm90aWZ5U291cmNlID0gbmV3IFN1YmplY3Q8e3R5cGU6IHN0cmluZywgbWVzc2FnZTogc3RyaW5nfT4oKVxyXG5cdHRvZ2dsZUxvYWRlclNvdXJjZSA9IG5ldyBTdWJqZWN0PGJvb2xlYW4+KClcclxuXHJcblx0cGFnZUxvYWRlZCQgPSB0aGlzLnBhZ2VMb2FkZWRTb3VyY2UuYXNPYnNlcnZhYmxlKClcclxuXHR0cmlnZ2VySW5pdGlhbERhdGFMb2FkJCA9IHRoaXMudHJpZ2dlckluaXRpYWxEYXRhTG9hZFNvdXJjZS5hc09ic2VydmFibGUoKVxyXG5cdGluaXRpYWxEYXRhTG9hZGVkJCA9IHRoaXMuaW5pdGlhbERhdGFMb2FkZWRTb3VyY2UuYXNPYnNlcnZhYmxlKClcclxuXHRzZXRMYXlvdXREYXRhJCA9IHRoaXMuc2V0TGF5b3V0RGF0YVNvdXJjZS5hc09ic2VydmFibGUoKVxyXG5cdHJlZGlyZWN0JCA9IHRoaXMucmVkaXJlY3RTb3VyY2UuYXNPYnNlcnZhYmxlKClcclxuXHRub3RpZnkkID0gdGhpcy5ub3RpZnlTb3VyY2UuYXNPYnNlcnZhYmxlKClcclxuXHR0b2dnbGVMb2FkZXIkID0gdGhpcy50b2dnbGVMb2FkZXJTb3VyY2UuYXNPYnNlcnZhYmxlKClcclxuXHJcblx0cGFnZUxvYWRlZChkYXRhKTogdm9pZCB7XHJcblx0XHR0aGlzLnBhZ2VMb2FkZWRTb3VyY2UubmV4dChkYXRhKVxyXG5cdH1cclxuXHJcblx0dHJpZ2dlckluaXRpYWxEYXRhTG9hZCgpOiB2b2lkIHtcclxuXHRcdHRoaXMudHJpZ2dlckluaXRpYWxEYXRhTG9hZFNvdXJjZS5uZXh0KClcclxuXHR9XHJcblxyXG5cdGluaXRpYWxEYXRhTG9hZGVkKGRhdGEpOiB2b2lkIHtcclxuXHRcdHRoaXMuaW5pdGlhbERhdGFMb2FkZWRTb3VyY2UubmV4dChkYXRhKVxyXG5cdH1cclxuXHJcblx0c2V0TGF5b3V0RGF0YShkYXRhKTogdm9pZCB7XHJcblx0XHR0aGlzLnNldExheW91dERhdGFTb3VyY2UubmV4dChkYXRhKVxyXG5cdH1cclxuXHJcblx0cmVkaXJlY3Qocm91dGU6IHN0cmluZywgb3B0aW9ucz86IEdFU1JlZGlyZWN0T3B0aW9uc0ludGVyZmFjZSk6IHZvaWQge1xyXG5cdFx0dGhpcy5yZWRpcmVjdFNvdXJjZS5uZXh0KHtyb3V0ZSwgb3B0aW9uc30pXHJcblx0fVxyXG5cclxuXHRub3RpZnkodHlwZTogc3RyaW5nLCBtZXNzYWdlOiBzdHJpbmcpOiB2b2lkIHtcclxuXHRcdHRoaXMubm90aWZ5U291cmNlLm5leHQoe3R5cGUsIG1lc3NhZ2V9KVxyXG5cdH1cclxuXHJcblx0dG9nZ2xlTG9hZGVyKGFjdGl2ZTogYm9vbGVhbik6IHZvaWQge1xyXG5cdFx0dGhpcy50b2dnbGVMb2FkZXJTb3VyY2UubmV4dChhY3RpdmUpXHJcblx0fVxyXG59XHJcbiIsImltcG9ydCB7SW5qZWN0YWJsZX0gZnJvbSAnQGFuZ3VsYXIvY29yZSdcclxuaW1wb3J0IHtIdHRwQ2xpZW50LCBIdHRwUmVxdWVzdCwgSHR0cFJlc3BvbnNlfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCdcclxuXHJcblxyXG5ASW5qZWN0YWJsZSgpXHJcbmV4cG9ydCBjbGFzcyBSZXF1ZXN0U2VydmljZSB7XHJcblx0Y29uc3RydWN0b3IocHVibGljIGNsaWVudDogSHR0cENsaWVudCkge31cclxuXHJcblx0ZmxhdHRlbk9iamVjdEZvclF1ZXJ5KG9iamVjdDoge1t4OiBzdHJpbmddOiBhbnl9IHwgYW55W10sIHBhcmVudEtleT86IHN0cmluZyk6IHtrZXk6IHN0cmluZywgdmFsdWU6IGFueX1bXSB7XHJcblx0XHRsZXQgcmV0dXJuT2JqZWN0ID0gW11cclxuXHRcdGlmIChvYmplY3QgaW5zdGFuY2VvZiBBcnJheSkge1xyXG5cdFx0XHRpZiAoIXBhcmVudEtleSkge1xyXG5cdFx0XHRcdHRocm93IHtlcnJvcjogJ1RoZSB0b3AtbW9zdCBpdGVtIGNhbm5vdCBiZSBhbiBhcnJheS4nfVxyXG5cdFx0XHR9XHJcblx0XHRcdG9iamVjdC5mb3JFYWNoKChpdGVtKSA9PiB7XHJcblx0XHRcdFx0aWYgKGl0ZW0gPT09IG51bGwpIHtcclxuXHRcdFx0XHRcdHJldHVyblxyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHRpZiAoKGl0ZW0gaW5zdGFuY2VvZiBEYXRlKSB8fCAhKGl0ZW0gaW5zdGFuY2VvZiBBcnJheSkgIHx8ICh0eXBlb2YgaXRlbSAhPT0gJ29iamVjdCcpKSB7XHJcblx0XHRcdFx0XHRyZXR1cm5PYmplY3QucHVzaCh7a2V5OiBgJHtwYXJlbnRLZXl9W11gLCB2YWx1ZTogaXRlbX0pXHJcblx0XHRcdFx0XHRyZXR1cm5cclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0cmV0dXJuT2JqZWN0ID0gcmV0dXJuT2JqZWN0LmNvbmNhdCh0aGlzLmZsYXR0ZW5PYmplY3RGb3JRdWVyeShpdGVtLCBgJHtwYXJlbnRLZXl9W11gKSlcclxuXHRcdFx0XHRyZXR1cm5cclxuXHRcdFx0fSlcclxuXHRcdFx0cmV0dXJuIHJldHVybk9iamVjdFxyXG5cdFx0fVxyXG5cdFx0Zm9yIChjb25zdCBrZXkgaW4gb2JqZWN0KSB7XHJcblx0XHRcdGNvbnN0IHZhbHVlID0gb2JqZWN0W2tleV1cclxuXHRcdFx0aWYgKHZhbHVlID09PSBudWxsKSB7XHJcblx0XHRcdFx0Y29udGludWVcclxuXHRcdFx0fVxyXG5cdFx0XHRpZiAoKHZhbHVlIGluc3RhbmNlb2YgRGF0ZSkgfHwgKHR5cGVvZiB2YWx1ZSAhPT0gJ29iamVjdCcpKSB7XHJcblx0XHRcdFx0cmV0dXJuT2JqZWN0LnB1c2goe2tleTogcGFyZW50S2V5ID8gYCR7cGFyZW50S2V5fVske2tleX1dYDoga2V5LCB2YWx1ZX0pXHJcblx0XHRcdFx0Y29udGludWVcclxuXHRcdFx0fVxyXG5cdFx0XHRyZXR1cm5PYmplY3QgPSByZXR1cm5PYmplY3QuY29uY2F0KHRoaXMuZmxhdHRlbk9iamVjdEZvclF1ZXJ5KHZhbHVlLCBwYXJlbnRLZXkgPyBgJHtwYXJlbnRLZXl9WyR7a2V5fV1gIDoga2V5KSlcclxuXHRcdH1cclxuXHRcdHJldHVybiByZXR1cm5PYmplY3RcclxuXHR9XHJcblxyXG5cdHJ1bihtZXRob2Q6IHN0cmluZywgdXJsOiBzdHJpbmcsIG9wdGlvbnM/OiB7W3g6IHN0cmluZ106IGFueX0pIHtcclxuXHRcdHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcblx0XHRcdHRyeSB7XHJcblx0XHRcdFx0bGV0IGFjdHVhbFVybCA9IHVybCxcclxuXHRcdFx0XHRcdHJ1bk9wdGlvbnMgPSB7fSBhcyBhbnksXHJcblx0XHRcdFx0XHRyZXF1ZXN0T3B0aW9ucyA9IHt9IGFzIGFueSxcclxuXHRcdFx0XHRcdGJvZHkgPSBudWxsXHJcblx0XHRcdFx0aWYgKG9wdGlvbnMgJiYgKHR5cGVvZiBvcHRpb25zID09PSAnb2JqZWN0JykpIHtcclxuXHRcdFx0XHRcdGxldCB7cmVzb2x2ZVdpdGhGdWxsUmVzcG9uc2UsIC4uLiBvdGhlck9wdGlvbnN9ID0gb3B0aW9uc1xyXG5cdFx0XHRcdFx0cmVxdWVzdE9wdGlvbnMgPSBvdGhlck9wdGlvbnNcclxuXHRcdFx0XHRcdHJ1bk9wdGlvbnMgPSB7cmVzb2x2ZVdpdGhGdWxsUmVzcG9uc2V9XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdGlmIChtZXRob2QudG9Mb3dlckNhc2UoKSA9PT0gJ2dldCcpIHtcclxuXHRcdFx0XHRcdGlmICghcmVxdWVzdE9wdGlvbnMgfHwgKHR5cGVvZiByZXF1ZXN0T3B0aW9ucyAhPT0gJ29iamVjdCcpKSB7XHJcblx0XHRcdFx0XHRcdHJlcXVlc3RPcHRpb25zID0ge31cclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdGNvbnN0IG9wdGlvbnNQYXJhbXMgPSB0aGlzLmZsYXR0ZW5PYmplY3RGb3JRdWVyeShyZXF1ZXN0T3B0aW9ucy5wYXJhbXMgfHwge30pXHJcblx0XHRcdFx0XHRhY3R1YWxVcmwgKz0gYD9fPSR7KG5ldyBEYXRlKCkpLmdldFRpbWUoKS50b1N0cmluZygpfWBcclxuXHRcdFx0XHRcdGlmIChvcHRpb25zUGFyYW1zLmxlbmd0aCkge1xyXG5cdFx0XHRcdFx0XHRvcHRpb25zUGFyYW1zLmZvckVhY2goKGl0ZW0sIGluZGV4KSA9PiB7XHJcblx0XHRcdFx0XHRcdFx0YWN0dWFsVXJsICs9IGAmJHtpdGVtLmtleX09JHtpdGVtLnZhbHVlfWBcclxuXHRcdFx0XHRcdFx0fSlcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0aWYgKCFyZXF1ZXN0T3B0aW9ucyB8fCAodHlwZW9mIHJlcXVlc3RPcHRpb25zICE9PSAnb2JqZWN0JykpIHtcclxuXHRcdFx0XHRcdFx0cmVxdWVzdE9wdGlvbnMgPSB7fVxyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0Ym9keSA9ICghcmVxdWVzdE9wdGlvbnMuYm9keSB8fCAodHlwZW9mIHJlcXVlc3RPcHRpb25zLmJvZHkgIT09ICdvYmplY3QnKSkgPyB7fSA6IHJlcXVlc3RPcHRpb25zLmJvZHlcclxuXHRcdFx0XHRcdGJvZHkuXyA9IChuZXcgRGF0ZSgpKS5nZXRUaW1lKClcclxuXHRcdFx0XHRcdGRlbGV0ZSByZXF1ZXN0T3B0aW9ucy5ib2R5XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdC8vIGlmICghcmVxdWVzdE9wdGlvbnMucmVzcG9uc2VUeXBlKSB7fVxyXG5cdFx0XHRcdHRoaXMuY2xpZW50LnJlcXVlc3QobmV3IEh0dHBSZXF1ZXN0KG1ldGhvZCwgYWN0dWFsVXJsLCBib2R5LCByZXF1ZXN0T3B0aW9ucykpLnRvUHJvbWlzZSgpLnRoZW4oXHJcblx0XHRcdFx0XHQocmVzcG9uc2U6IEh0dHBSZXNwb25zZTxhbnk+KSA9PiBydW5PcHRpb25zLnJlc29sdmVXaXRoRnVsbFJlc3BvbnNlID8gcmVzb2x2ZShyZXNwb25zZSkgOiByZXNvbHZlKHJlc3BvbnNlLmJvZHkpLFxyXG5cdFx0XHRcdFx0KGVycm9yOiBhbnkpID0+IHJlamVjdChlcnJvcilcclxuXHRcdFx0XHQpXHJcblx0XHRcdH0gY2F0Y2goZXJyb3IpIHtcclxuXHRcdFx0XHRyZWplY3QoZXJyb3IpXHJcblx0XHRcdH1cclxuXHRcdH0pXHJcblx0fVxyXG59XHJcbiIsImltcG9ydCBjbyBmcm9tICdjbydcclxuaW1wb3J0IHtJbmplY3RhYmxlfSBmcm9tICdAYW5ndWxhci9jb3JlJ1xyXG5pbXBvcnQge0h0dHBIZWFkZXJzfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCdcclxuXHJcbmltcG9ydCB7R2xvYmFsRXZlbnRzU2VydmljZX0gZnJvbSAnLi9nbG9iYWxFdmVudHMvZ2xvYmFsRXZlbnRzLnNlcnZpY2UnXHJcbmltcG9ydCB7UmVxdWVzdFNlcnZpY2V9IGZyb20gJy4vcmVxdWVzdC5zZXJ2aWNlJ1xyXG5cclxuQEluamVjdGFibGUoKVxyXG5leHBvcnQgY2xhc3MgQmFzZVJFU1RTZXJ2aWNlIHtcclxuXHRiYXNlVXJsID0gJy8nXHJcblx0aGVhZGVycyA9IG5ldyBIdHRwSGVhZGVycyh7J0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJ30pXHJcblx0cmVkaXJlY3RPbkZvcmJpZGRlblVybD86IHN0cmluZyA9IG51bGxcclxuXHJcblx0Y29uc3RydWN0b3IoXHJcblx0XHRwdWJsaWMgZ2xvYmFsRXZlbnRzU2VydmljZTogR2xvYmFsRXZlbnRzU2VydmljZSxcclxuXHRcdHB1YmxpYyByZXF1ZXN0U2VydmljZTogUmVxdWVzdFNlcnZpY2VcclxuXHQpIHt9XHJcblxyXG5cdGVtcHR5VG9OdWxsKGRhdGE6IGFueSk6IGFueSB7XHJcblx0XHRpZiAoZGF0YSA9PT0gJycpIHtcclxuXHRcdFx0cmV0dXJuIG51bGxcclxuXHRcdH1cclxuXHRcdGlmIChkYXRhIGluc3RhbmNlb2YgRGF0ZSkge1xyXG5cdFx0XHRyZXR1cm4gZGF0YVxyXG5cdFx0fVxyXG5cdFx0aWYgKGRhdGEgaW5zdGFuY2VvZiBBcnJheSkge1xyXG5cdFx0XHRyZXR1cm4gZGF0YS5tYXAoKGl0ZW0sIGluZGV4KSA9PiB0aGlzLmVtcHR5VG9OdWxsKGl0ZW0pKVxyXG5cdFx0fVxyXG5cdFx0aWYgKCh0eXBlb2YgZGF0YSA9PT0gJ29iamVjdCcpICYmIChkYXRhICE9PSBudWxsKSkge1xyXG5cdFx0XHRjb25zdCBwYXJzZWREYXRhID0ge31cclxuXHRcdFx0Zm9yIChjb25zdCBrZXkgaW4gZGF0YSkge1xyXG5cdFx0XHRcdHBhcnNlZERhdGFba2V5XSA9IHRoaXMuZW1wdHlUb051bGwoZGF0YVtrZXldKVxyXG5cdFx0XHR9XHJcblx0XHRcdHJldHVybiBwYXJzZWREYXRhXHJcblx0XHR9XHJcblx0XHRyZXR1cm4gZGF0YVxyXG5cdH1cclxuXHJcblx0c3RyaW5naWZ5R2V0UGFyYW1zKGRhdGE6IHtba2V5OiBzdHJpbmddOiBhbnl9KToge1trZXk6IHN0cmluZ106IGFueX0ge1xyXG5cdFx0bGV0IHN0cmluZ2lmaWVkT2JqZWN0ID0ge31cclxuXHRcdGZvciAoY29uc3Qga2V5IGluIGRhdGEpIHtcclxuXHRcdFx0Y29uc3QgdmFsdWUgPSBkYXRhW2tleV1cclxuXHRcdFx0aWYgKCh2YWx1ZSBpbnN0YW5jZW9mIEFycmF5KSB8fCAoKHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcpICYmICh2YWx1ZSAhPT0gbnVsbCkgJiYgISh2YWx1ZSBpbnN0YW5jZW9mIERhdGUpKSkge1xyXG5cdFx0XHRcdHN0cmluZ2lmaWVkT2JqZWN0W2BfanNvbl8ke2tleX1gXSA9IEpTT04uc3RyaW5naWZ5KHZhbHVlKVxyXG5cdFx0XHRcdGNvbnRpbnVlXHJcblx0XHRcdH1cclxuXHRcdFx0c3RyaW5naWZpZWRPYmplY3Rba2V5XSA9IHZhbHVlXHJcblx0XHR9XHJcblx0XHRyZXR1cm4gc3RyaW5naWZpZWRPYmplY3RcclxuXHR9XHJcblxyXG5cdGhhbmRsZUVycm9yKGVycjogYW55KTogdm9pZCB7XHJcblx0XHRpZiAoIWVycikge1xyXG5cdFx0XHR0aGlzLmdsb2JhbEV2ZW50c1NlcnZpY2Uubm90aWZ5KCdlcnJvcicsICdBbiBlcnJvciBoYXMgb2NjdXJyZWQuJylcclxuXHRcdFx0cmV0dXJuXHJcblx0XHR9XHJcblx0XHRpZiAodGhpcy5yZWRpcmVjdE9uRm9yYmlkZGVuVXJsICYmIChlcnIuc3RhdHVzID09PSA0MDEpKSB7XHJcblx0XHRcdHRoaXMuZ2xvYmFsRXZlbnRzU2VydmljZS5yZWRpcmVjdCh0aGlzLnJlZGlyZWN0T25Gb3JiaWRkZW5VcmwpXHJcblx0XHRcdHJldHVyblxyXG5cdFx0fVxyXG5cdFx0dGhpcy5nbG9iYWxFdmVudHNTZXJ2aWNlLm5vdGlmeSgnZXJyb3InLCBlcnIuZXJyb3IgJiYgZXJyLmVycm9yLmVycm9yIHx8ICdBbiBlcnJvciBoYXMgb2NjdXJyZWQuJylcclxuXHR9XHJcblxyXG5cdGNyZWF0ZShwYXJhbXMpOiBQcm9taXNlPGFueT4ge1xyXG5cdFx0Y29uc3QgaW5zdGFuY2UgPSB0aGlzXHJcblx0XHRyZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG5cdFx0XHRjbyhmdW5jdGlvbiooKSB7XHJcblx0XHRcdFx0cmV0dXJuIHlpZWxkIGluc3RhbmNlLnJlcXVlc3RTZXJ2aWNlLnJ1bigncG9zdCcsIGAke2luc3RhbmNlLmJhc2VVcmx9YCwge1xyXG5cdFx0XHRcdFx0aGVhZGVyczogaW5zdGFuY2UuaGVhZGVycyxcclxuXHRcdFx0XHRcdGJvZHk6IGluc3RhbmNlLmVtcHR5VG9OdWxsKHBhcmFtcylcclxuXHRcdFx0XHR9KVxyXG5cdFx0XHR9KS50aGVuKChyZXMpID0+IHJlc29sdmUocmVzKSwgKGVycikgPT4ge1xyXG5cdFx0XHRcdGluc3RhbmNlLmhhbmRsZUVycm9yKGVycilcclxuXHRcdFx0XHRyZWplY3Qoe2Vycm9yOiB0cnVlfSlcclxuXHRcdFx0fSlcclxuXHRcdH0pXHJcblx0fVxyXG5cclxuXHRyZWFkKHBhcmFtcyk6IFByb21pc2U8YW55PiB7XHJcblx0XHRjb25zdCBpbnN0YW5jZSA9IHRoaXNcclxuXHRcdHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcblx0XHRcdGNvKGZ1bmN0aW9uKigpIHtcclxuXHRcdFx0XHRyZXR1cm4geWllbGQgaW5zdGFuY2UucmVxdWVzdFNlcnZpY2UucnVuKCdnZXQnLCBgJHtpbnN0YW5jZS5iYXNlVXJsfS9pdGVtYCwge1xyXG5cdFx0XHRcdFx0aGVhZGVyczogaW5zdGFuY2UuaGVhZGVycyxcclxuXHRcdFx0XHRcdHBhcmFtczogaW5zdGFuY2Uuc3RyaW5naWZ5R2V0UGFyYW1zKGluc3RhbmNlLmVtcHR5VG9OdWxsKHBhcmFtcykpXHJcblx0XHRcdFx0fSlcclxuXHRcdFx0fSkudGhlbigocmVzKSA9PiByZXNvbHZlKHJlcyksIChlcnIpID0+IHtcclxuXHRcdFx0XHRpbnN0YW5jZS5oYW5kbGVFcnJvcihlcnIpXHJcblx0XHRcdFx0cmVqZWN0KHtlcnJvcjogdHJ1ZX0pXHJcblx0XHRcdH0pXHJcblx0XHR9KVxyXG5cdH1cclxuXHJcblx0cmVhZExpc3QocGFyYW1zKTogUHJvbWlzZTxhbnk+IHtcclxuXHRcdGNvbnN0IGluc3RhbmNlID0gdGhpc1xyXG5cdFx0cmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuXHRcdFx0Y28oZnVuY3Rpb24qKCkge1xyXG5cdFx0XHRcdHJldHVybiB5aWVsZCBpbnN0YW5jZS5yZXF1ZXN0U2VydmljZS5ydW4oJ2dldCcsIGAke2luc3RhbmNlLmJhc2VVcmx9YCwge1xyXG5cdFx0XHRcdFx0aGVhZGVyczogaW5zdGFuY2UuaGVhZGVycyxcclxuXHRcdFx0XHRcdHBhcmFtczogaW5zdGFuY2Uuc3RyaW5naWZ5R2V0UGFyYW1zKGluc3RhbmNlLmVtcHR5VG9OdWxsKHBhcmFtcykpXHJcblx0XHRcdFx0fSlcclxuXHRcdFx0fSkudGhlbigocmVzKSA9PiByZXNvbHZlKHJlcyksIChlcnIpID0+IHtcclxuXHRcdFx0XHRpbnN0YW5jZS5oYW5kbGVFcnJvcihlcnIpXHJcblx0XHRcdFx0cmVqZWN0KHtlcnJvcjogdHJ1ZX0pXHJcblx0XHRcdH0pXHJcblx0XHR9KVxyXG5cdH1cclxuXHJcblx0cmVhZFNlbGVjdExpc3QocGFyYW1zKTogUHJvbWlzZTxhbnk+IHtcclxuXHRcdGNvbnN0IGluc3RhbmNlID0gdGhpc1xyXG5cdFx0cmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuXHRcdFx0Y28oZnVuY3Rpb24qKCkge1xyXG5cdFx0XHRcdHJldHVybiB5aWVsZCBpbnN0YW5jZS5yZXF1ZXN0U2VydmljZS5ydW4oJ2dldCcsIGAke2luc3RhbmNlLmJhc2VVcmx9L3NlbGVjdExpc3RgLCB7XHJcblx0XHRcdFx0XHRoZWFkZXJzOiBpbnN0YW5jZS5oZWFkZXJzLFxyXG5cdFx0XHRcdFx0cGFyYW1zOiBpbnN0YW5jZS5zdHJpbmdpZnlHZXRQYXJhbXMoaW5zdGFuY2UuZW1wdHlUb051bGwocGFyYW1zKSlcclxuXHRcdFx0XHR9KVxyXG5cdFx0XHR9KS50aGVuKChyZXMpID0+IHJlc29sdmUocmVzKSwgKGVycikgPT4ge1xyXG5cdFx0XHRcdGluc3RhbmNlLmhhbmRsZUVycm9yKGVycilcclxuXHRcdFx0XHRyZWplY3Qoe2Vycm9yOiB0cnVlfSlcclxuXHRcdFx0fSlcclxuXHRcdH0pXHJcblx0fVxyXG5cclxuXHR1cGRhdGUocGFyYW1zKTogUHJvbWlzZTxhbnk+IHtcclxuXHRcdGNvbnN0IGluc3RhbmNlID0gdGhpc1xyXG5cdFx0cmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuXHRcdFx0Y28oZnVuY3Rpb24qKCkge1xyXG5cdFx0XHRcdHJldHVybiB5aWVsZCBpbnN0YW5jZS5yZXF1ZXN0U2VydmljZS5ydW4oJ3BhdGNoJywgYCR7aW5zdGFuY2UuYmFzZVVybH0vaXRlbS8ke3BhcmFtcy5pZH1gLCB7XHJcblx0XHRcdFx0XHRoZWFkZXJzOiBpbnN0YW5jZS5oZWFkZXJzLFxyXG5cdFx0XHRcdFx0Ym9keTogaW5zdGFuY2UuZW1wdHlUb051bGwocGFyYW1zKVxyXG5cdFx0XHRcdH0pXHJcblx0XHRcdH0pLnRoZW4oKHJlcykgPT4gcmVzb2x2ZShyZXMpLCAoZXJyKSA9PiB7XHJcblx0XHRcdFx0aW5zdGFuY2UuaGFuZGxlRXJyb3IoZXJyKVxyXG5cdFx0XHRcdHJlamVjdCh7ZXJyb3I6IHRydWV9KVxyXG5cdFx0XHR9KVxyXG5cdFx0fSlcclxuXHR9XHJcblxyXG5cdGJ1bGtVcHNlcnQocGFyYW1zKTogUHJvbWlzZTxhbnk+IHtcclxuXHRcdGNvbnN0IGluc3RhbmNlID0gdGhpc1xyXG5cdFx0cmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuXHRcdFx0Y28oZnVuY3Rpb24qKCkge1xyXG5cdFx0XHRcdHJldHVybiB5aWVsZCBpbnN0YW5jZS5yZXF1ZXN0U2VydmljZS5ydW4oJ3B1dCcsIGAke2luc3RhbmNlLmJhc2VVcmx9YCwge1xyXG5cdFx0XHRcdFx0aGVhZGVyczogaW5zdGFuY2UuaGVhZGVycyxcclxuXHRcdFx0XHRcdGJvZHk6IGluc3RhbmNlLmVtcHR5VG9OdWxsKHBhcmFtcylcclxuXHRcdFx0XHR9KVxyXG5cdFx0XHR9KS50aGVuKChyZXMpID0+IHJlc29sdmUocmVzKSwgKGVycikgPT4ge1xyXG5cdFx0XHRcdGluc3RhbmNlLmhhbmRsZUVycm9yKGVycilcclxuXHRcdFx0XHRyZWplY3Qoe2Vycm9yOiB0cnVlfSlcclxuXHRcdFx0fSlcclxuXHRcdH0pXHJcblx0fVxyXG5cclxuXHRkZWxldGUocGFyYW1zKTogUHJvbWlzZTxhbnk+IHtcclxuXHRcdGNvbnN0IGluc3RhbmNlID0gdGhpc1xyXG5cdFx0cmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuXHRcdFx0Y28oZnVuY3Rpb24qKCkge1xyXG5cdFx0XHRcdHJldHVybiB5aWVsZCBpbnN0YW5jZS5yZXF1ZXN0U2VydmljZS5ydW4oJ2RlbGV0ZScsIGAke2luc3RhbmNlLmJhc2VVcmx9LyR7cGFyYW1zLmlkfWAsIHtcclxuXHRcdFx0XHRcdGhlYWRlcnM6IGluc3RhbmNlLmhlYWRlcnMsXHJcblx0XHRcdFx0XHRib2R5OiBpbnN0YW5jZS5lbXB0eVRvTnVsbChwYXJhbXMpXHJcblx0XHRcdFx0fSlcclxuXHRcdFx0fSkudGhlbigocmVzKSA9PiByZXNvbHZlKHJlcyksIChlcnIpID0+IHtcclxuXHRcdFx0XHRpbnN0YW5jZS5oYW5kbGVFcnJvcihlcnIpXHJcblx0XHRcdFx0cmVqZWN0KHtlcnJvcjogdHJ1ZX0pXHJcblx0XHRcdH0pXHJcblx0XHR9KVxyXG5cdH1cclxufVxyXG4iLCJpbXBvcnQgY28gZnJvbSAnY28nXHJcbmltcG9ydCB7SW5qZWN0YWJsZX0gZnJvbSAnQGFuZ3VsYXIvY29yZSdcclxuaW1wb3J0IHtIdHRwSGVhZGVyc30gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnXHJcblxyXG5pbXBvcnQge0dsb2JhbEV2ZW50c1NlcnZpY2V9IGZyb20gJy4vZ2xvYmFsRXZlbnRzL2dsb2JhbEV2ZW50cy5zZXJ2aWNlJ1xyXG5pbXBvcnQge1JlcXVlc3RTZXJ2aWNlfSBmcm9tICcuL3JlcXVlc3Quc2VydmljZSdcclxuXHJcbkBJbmplY3RhYmxlKClcclxuZXhwb3J0IGNsYXNzIEZpbGVzUkVTVFNlcnZpY2Uge1xyXG5cdC8vIHsnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nfVxyXG5cdGhlYWRlcnMgPSBuZXcgSHR0cEhlYWRlcnMoKVxyXG5cdGJhc2VVcmwgPSAnL2ZpbGVzJ1xyXG5cclxuXHRjb25zdHJ1Y3RvcihcclxuXHRcdHB1YmxpYyBnbG9iYWxFdmVudHNTZXJ2aWNlOiBHbG9iYWxFdmVudHNTZXJ2aWNlLFxyXG5cdFx0cHVibGljIHJlcXVlc3RTZXJ2aWNlOiBSZXF1ZXN0U2VydmljZVxyXG5cdCkge31cclxuXHJcblx0aGFuZGxlRXJyb3IoZXJyKTogdm9pZCB7XHJcblx0XHR0aGlzLmdsb2JhbEV2ZW50c1NlcnZpY2Uubm90aWZ5KCdlcnJvcicsIGVyciAmJiBlcnIuZXJyb3IgJiYgZXJyLmVycm9yLmVycm9yIHx8ICdBbiBlcnJvciBoYXMgb2NjdXJyZWQuJylcclxuXHR9XHJcblxyXG5cdHVwbG9hZChmaWxlOiBGaWxlLCBwYXJhbXM6IHtvdXRwdXRGaWxlTmFtZTogc3RyaW5nLCBbeDogc3RyaW5nXTogYW55fSwgb3B0aW9ucz86IHtoYW5kbGVFcnJvcj86IGJvb2xlYW59KTogUHJvbWlzZTxhbnk+IHtcclxuXHRcdGNvbnN0IGluc3RhbmNlID0gdGhpc1xyXG5cdFx0cmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuXHRcdFx0Y28oZnVuY3Rpb24qKCkge1xyXG5cdFx0XHRcdGxldCBmZCA9IG5ldyBGb3JtRGF0YSgpXHJcblx0XHRcdFx0ZmQuYXBwZW5kKCdmaWxlJywgZmlsZSwgZmlsZS5uYW1lKVxyXG5cdFx0XHRcdGZvciAoY29uc3Qga2V5IGluIHBhcmFtcykge1xyXG5cdFx0XHRcdFx0ZmQuYXBwZW5kKGtleSwgcGFyYW1zW2tleV0pXHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdGluc3RhbmNlLmhlYWRlcnMuc2V0KCdDb250ZW50LVR5cGUnLCAnbXVsdGlwYXJ0L2Zvcm0tZGF0YScpXHJcblx0XHRcdFx0eWllbGQgaW5zdGFuY2UucmVxdWVzdFNlcnZpY2UucnVuKCdwb3N0JywgYCR7aW5zdGFuY2UuYmFzZVVybH1gLCB7XHJcblx0XHRcdFx0XHRoZWFkZXJzOiBpbnN0YW5jZS5oZWFkZXJzLFxyXG5cdFx0XHRcdFx0Ym9keTogZmRcclxuXHRcdFx0XHR9KVxyXG5cdFx0XHRcdHJldHVybiB7c3VjY2VzczogdHJ1ZX1cclxuXHRcdFx0fSkudGhlbigocmVzKSA9PiByZXNvbHZlKHJlcyksIChlcnIpID0+IHtcclxuXHRcdFx0XHRpZiAob3B0aW9ucyAmJiBvcHRpb25zLmhhbmRsZUVycm9yKSB7XHJcblx0XHRcdFx0XHRpbnN0YW5jZS5oYW5kbGVFcnJvcihlcnIpXHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdHJlamVjdCh7ZXJyb3I6IGVyciB8fCB0cnVlfSlcclxuXHRcdFx0fSlcclxuXHRcdH0pXHJcblx0fVxyXG5cclxuXHRyZWFkKHBhcmFtcyk6IFByb21pc2U8YW55PiB7XHJcblx0XHRjb25zdCBpbnN0YW5jZSA9IHRoaXNcclxuXHRcdHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcblx0XHRcdGNvKGZ1bmN0aW9uKigpIHtcclxuXHRcdFx0XHRyZXR1cm4geWllbGQgaW5zdGFuY2UucmVxdWVzdFNlcnZpY2UucnVuKCdnZXQnLCBgJHtpbnN0YW5jZS5iYXNlVXJsfS9pdGVtYCwge1xyXG5cdFx0XHRcdFx0aGVhZGVyczogaW5zdGFuY2UuaGVhZGVycyxcclxuXHRcdFx0XHRcdHBhcmFtc1xyXG5cdFx0XHRcdH0pXHJcblx0XHRcdH0pLnRoZW4oKHJlcykgPT4gcmVzb2x2ZShyZXMpLCAoZXJyKSA9PiB7XHJcblx0XHRcdFx0aW5zdGFuY2UuaGFuZGxlRXJyb3IoZXJyKVxyXG5cdFx0XHRcdHJlamVjdCh7ZXJyb3I6IHRydWV9KVxyXG5cdFx0XHR9KVxyXG5cdFx0fSlcclxuXHR9XHJcbn1cclxuIiwiaW1wb3J0IHtCYXNlUkVTVFNlcnZpY2V9IGZyb20gJy4uL2luZGV4J1xuaW1wb3J0IHtJbmplY3RhYmxlLCBJbmplY3Rvcn0gZnJvbSAnQGFuZ3VsYXIvY29yZSdcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIE1vZGVsUkVTVFNlcnZpY2VQcm92aWRlclNlcnZpY2Uge1xuXHRtb2RlbFJFU1RTZXJ2aWNlczoge1trZXk6IHN0cmluZ106IEJhc2VSRVNUU2VydmljZX0gPSB7fVxuXG5cdGNvbnN0cnVjdG9yKFxuXHRcdHB1YmxpYyBpbmplY3RvcjogSW5qZWN0b3Jcblx0KSB7XG5cdH1cblxuXHRnZXQoY29tcG9uZW50TmFtZTogc3RyaW5nKTogQmFzZVJFU1RTZXJ2aWNlIHtcblx0XHRyZXR1cm4gdGhpcy5tb2RlbFJFU1RTZXJ2aWNlc1tgJHtjb21wb25lbnROYW1lfU1vZGVsUkVTVFNlcnZpY2VgXVxuXHR9XG5cblx0c2V0U2VydmljZXMoZGF0YToge1trZXk6IHN0cmluZ106IEJhc2VSRVNUU2VydmljZX0pOiB2b2lkIHtcblx0XHR0aGlzLm1vZGVsUkVTVFNlcnZpY2VzID0ge31cblx0XHRPYmplY3Qua2V5cyhkYXRhKS5mb3JFYWNoKChrZXkpID0+IHtcblx0XHRcdHRoaXMubW9kZWxSRVNUU2VydmljZXNbYCR7a2V5LmNoYXJBdCgwKS50b0xvd2VyQ2FzZSgpfSR7a2V5LnN1YnN0cigxLCBrZXkubGVuZ3RoKX1gXSA9IHRoaXMuaW5qZWN0b3IuZ2V0KGRhdGFba2V5XSlcblx0XHR9KVxuXHR9XG59XG4iLCJleHBvcnQgY29uc3QgZ2V0TmVzdGVkID0gKHBhcmVudDogYW55LCBmaWVsZDogc3RyaW5nKTogYW55ID0+IHtcclxuXHRpZiAoKHR5cGVvZiBwYXJlbnQgIT09ICdvYmplY3QnKSB8fCAocGFyZW50ID09PSBudWxsKSB8fCAodHlwZW9mIGZpZWxkICE9PSAnc3RyaW5nJykgfHwgIWZpZWxkLmxlbmd0aCkge1xyXG5cdFx0cmV0dXJuIHVuZGVmaW5lZFxyXG5cdH1cclxuXHRsZXQgZmllbGREYXRhID0gZmllbGQuc3BsaXQoJy4nKSxcclxuXHRcdGZpZWxkRGF0YUxlbmd0aCA9IGZpZWxkRGF0YS5sZW5ndGgsXHJcblx0XHRjdXJyZW50RWxlbWVudCA9IHBhcmVudFxyXG5cdGZvciAobGV0IGkgPSAwOyBpIDwgZmllbGREYXRhTGVuZ3RoOyBpKyspIHtcclxuXHRcdGlmICgodHlwZW9mIGN1cnJlbnRFbGVtZW50ID09PSAndW5kZWZpbmVkJykgfHwgKGN1cnJlbnRFbGVtZW50ID09PSBudWxsKSkge1xyXG5cdFx0XHRyZXR1cm4gdW5kZWZpbmVkXHJcblx0XHR9XHJcblx0XHRsZXQgaW5uZXJFbGVtZW50TmFtZSA9IGZpZWxkRGF0YVtpXVxyXG5cdFx0Ly8gbG9naWMgZm9yIGhhbmRsaW5nIHNlcXVlbGl6ZS1zdHlsZSAkZm9vLmJhciQgLSBzaG91bGQgYmUgdHJlYXRlZCBhcyBhIHNpbmdsZSBlbGVtZW50XHJcblx0XHRpZiAoaW5uZXJFbGVtZW50TmFtZS5jaGFyQXQoMCkgPT09ICckJykge1xyXG5cdFx0XHRsZXQgY2xvc2luZ0JyYWNrZXRGb3VuZCA9IGZhbHNlLFxyXG5cdFx0XHRcdGNsb3NpbmdCcmFja2V0SW5kZXggPSBpICsgMVxyXG5cdFx0XHR3aGlsZSAoY2xvc2luZ0JyYWNrZXRJbmRleCA8IGZpZWxkRGF0YUxlbmd0aCkge1xyXG5cdFx0XHRcdGNvbnN0IGVsZW1lbnQgPSBmaWVsZERhdGFbY2xvc2luZ0JyYWNrZXRJbmRleF1cclxuXHRcdFx0XHQvLyBmYWxzZSBhbGFybSAtIHRoZXJlJ3MgYW5vdGhlciAkIG9wZW5pbmcgYmVmb3JlIHRoZSBjdXJyZW50IG9uZSBjbG9zZWQgLSBzbyB0aGUgY3VycmVudCBvbmUgbXVzdCBiZSBqdXN0IGEgdmFyaWFibGUgbmFtZSwgbm90IGEgYnJhY2tldFxyXG5cdFx0XHRcdGlmIChlbGVtZW50LmNoYXJBdCgwKSA9PT0gJyQnKSB7XHJcblx0XHRcdFx0XHRicmVha1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHQvLyBmb3VuZCBpdCAhXHJcblx0XHRcdFx0aWYgKGVsZW1lbnQuY2hhckF0KGVsZW1lbnQubGVuZ3RoIC0gMSkgPT09ICckJykge1xyXG5cdFx0XHRcdFx0Y2xvc2luZ0JyYWNrZXRGb3VuZCA9IHRydWVcclxuXHRcdFx0XHRcdGJyZWFrXHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdGNsb3NpbmdCcmFja2V0SW5kZXgrK1xyXG5cdFx0XHR9XHJcblx0XHRcdGlmIChjbG9zaW5nQnJhY2tldEZvdW5kKSB7XHJcblx0XHRcdFx0Zm9yIChsZXQgaiA9IGkgKyAxOyBqIDw9IGNsb3NpbmdCcmFja2V0SW5kZXg7IGorKykge1xyXG5cdFx0XHRcdFx0aW5uZXJFbGVtZW50TmFtZSArPSBgLiR7ZmllbGREYXRhW2pdfWBcclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0aSA9IGNsb3NpbmdCcmFja2V0SW5kZXhcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdFx0bGV0IG5leHRFbGVtZW50ID0gY3VycmVudEVsZW1lbnRbaW5uZXJFbGVtZW50TmFtZV1cclxuXHRcdGlmICh0eXBlb2YgbmV4dEVsZW1lbnQgPT09ICd1bmRlZmluZWQnKSB7XHJcblx0XHRcdHJldHVybiB1bmRlZmluZWRcclxuXHRcdH1cclxuXHRcdC8vIGlmIHRoZSBuZXh0IGVsZW1lbnQgaXMgYW4gYXJyYXksIHByZXBhcmUgdG8gcmV0dXJuIGFuIGFycmF5IG9mIHRoZSBpbm5lciBpdGVtc1xyXG5cdFx0aWYgKG5leHRFbGVtZW50IGluc3RhbmNlb2YgQXJyYXkpIHtcclxuXHRcdFx0Ly8gaWYgdGhpcyBpcyB0aGUgbGFzdCBpdGVtLCBqdXN0IHJldHVybiB0aGUgYXJyYXlcclxuXHRcdFx0aWYgKGkgPT09IChmaWVsZERhdGFMZW5ndGggLSAxKSkge1xyXG5cdFx0XHRcdHJldHVybiBuZXh0RWxlbWVudFxyXG5cdFx0XHR9XHJcblx0XHRcdC8vIGlmIHRoZSBuZXh0IGl0ZW0gaXMgbm90IGFuIGluZGV4LCByZWN1cnNpdmVseSBjYWxsIHNlbGYgZm9yIGVhY2ggaXRlbSBvZiB0aGUgYXJyYXlcclxuXHRcdFx0aWYgKGlzTmFOKHBhcnNlSW50KGZpZWxkRGF0YVtpICsgMV0sIDEwKSkpIHtcclxuXHRcdFx0XHRjdXJyZW50RWxlbWVudCA9IFtdXHJcblx0XHRcdFx0bGV0IGlubmVyUGF0aCA9ICcnXHJcblx0XHRcdFx0Zm9yIChsZXQgaiA9IGkgKyAxOyBqIDwgZmllbGREYXRhTGVuZ3RoOyBqKyspIHtcclxuXHRcdFx0XHRcdGlubmVyUGF0aCArPSBgJHtmaWVsZERhdGFbal19JHtqIDwgKGZpZWxkRGF0YUxlbmd0aCAtIDEpID8gJy4nIDogJyd9YFxyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHRuZXh0RWxlbWVudC5mb3JFYWNoKChpdGVtLCBpSW5kZXgpID0+IHtcclxuXHRcdFx0XHRcdGxldCBpbm5lclZhbHVlID0gZ2V0TmVzdGVkKGl0ZW0sIGlubmVyUGF0aClcclxuXHRcdFx0XHRcdGlmICh0eXBlb2YgaW5uZXJWYWx1ZSAhPT0gJ3VuZGVmaW5lZCcpIHtcclxuXHRcdFx0XHRcdFx0Ly8gaWYgdGhlIGlubmVyVmFsdWUgaXMgYW4gYXJyYXkgdG9vLCBtZXJnZSBpdCB3aXRoIHRoZSBjdXJyZW50RWxlbWVudCAtIHRoaXMgd2F5IHdlIGNhbiBoYXZlIG5lc3RlZCBhcnJheXMgd2l0aG91dCBpbmRleGVzXHJcblx0XHRcdFx0XHRcdGlmIChpbm5lclZhbHVlIGluc3RhbmNlb2YgQXJyYXkpIHtcclxuXHRcdFx0XHRcdFx0XHRjdXJyZW50RWxlbWVudCA9IGN1cnJlbnRFbGVtZW50LmNvbmNhdChpbm5lclZhbHVlKVxyXG5cdFx0XHRcdFx0XHRcdHJldHVyblxyXG5cdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRcdCBjdXJyZW50RWxlbWVudC5wdXNoKGlubmVyVmFsdWUpXHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fSlcclxuXHRcdFx0XHRyZXR1cm4gY3VycmVudEVsZW1lbnRcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdFx0Y3VycmVudEVsZW1lbnQgPSBuZXh0RWxlbWVudFxyXG5cdH1cclxuXHRyZXR1cm4gY3VycmVudEVsZW1lbnRcclxufVxyXG5cclxuZXhwb3J0IGNvbnN0IHNldE5lc3RlZCA9IChwYXJlbnQ6IGFueSwgZmllbGQ6IHN0cmluZywgdmFsdWU6IGFueSk6IGJvb2xlYW4gPT4ge1xyXG5cdGNvbnN0IGZpZWxkTmFtZXMgPSBmaWVsZC5zcGxpdCgnLicpXHJcblx0aWYgKCFmaWVsZE5hbWVzLmxlbmd0aCkge1xyXG5cdFx0cmV0dXJuIGZhbHNlXHJcblx0fVxyXG5cdGxldCBjdXJyZW50UGFyZW50ID0gcGFyZW50LFxyXG5cdFx0bG9vcEVuZCA9IGZpZWxkTmFtZXMubGVuZ3RoIC0gMVxyXG5cdGZvciAobGV0IGkgPSAwOyBpIDwgbG9vcEVuZDsgaSsrKSB7XHJcblx0XHRjb25zdCBmaWVsZE5hbWUgPSBmaWVsZE5hbWVzW2ldXHJcblx0XHRpZiAodHlwZW9mIGN1cnJlbnRQYXJlbnRbZmllbGROYW1lXSA9PT0gJ3VuZGVmaW5lZCcpIHtcclxuXHRcdFx0cmV0dXJuIGZhbHNlXHJcblx0XHR9XHJcblx0XHRjdXJyZW50UGFyZW50ID0gY3VycmVudFBhcmVudFtmaWVsZE5hbWVdXHJcblx0fVxyXG5cdGN1cnJlbnRQYXJlbnRbZmllbGROYW1lc1tsb29wRW5kXV0gPSB2YWx1ZVxyXG5cdHJldHVybiB0cnVlXHJcbn1cclxuIiwiJ3VzZSBzdHJpY3QnXHJcblxyXG4vLyBhbmd1bGFyIGRlcGVuZGVuY2llc1xyXG5pbXBvcnQge0NvbW1vbk1vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJ1xyXG5pbXBvcnQge05nTW9kdWxlfSBmcm9tICdAYW5ndWxhci9jb3JlJ1xyXG5cclxuXHJcbkBOZ01vZHVsZSh7XHJcblx0aW1wb3J0czogW1xyXG5cdFx0Q29tbW9uTW9kdWxlXHJcblx0XVxyXG59KVxyXG5leHBvcnQgY2xhc3MgUmFtc3RlclVJQ29yZU1vZHVsZSB7fVxyXG5cclxuZXhwb3J0ICogZnJvbSAnLi9jb21wb25lbnRzL2Jhc2UtbGF5b3V0LmNvbXBvbmVudCdcclxuZXhwb3J0ICogZnJvbSAnLi9jb21wb25lbnRzL2Jhc2UtcGFnZS5jb21wb25lbnQnXHJcbmV4cG9ydCAqIGZyb20gJy4vc2VydmljZXMvYmFzZVJFU1Quc2VydmljZSdcclxuZXhwb3J0ICogZnJvbSAnLi9zZXJ2aWNlcy9maWxlc1JFU1Quc2VydmljZSdcclxuZXhwb3J0ICogZnJvbSAnLi9zZXJ2aWNlcy9nbG9iYWxFdmVudHMvZ2xvYmFsRXZlbnRzLnNlcnZpY2UnXHJcbmV4cG9ydCAqIGZyb20gJy4vc2VydmljZXMvZ2xvYmFsRXZlbnRzL2dsb2JhbEV2ZW50cy5pbnRlcmZhY2VzJ1xyXG5leHBvcnQgKiBmcm9tICcuL3NlcnZpY2VzL21vZGVsUkVTVFNlcnZpY2VQcm92aWRlci5zZXJ2aWNlJ1xyXG5leHBvcnQgKiBmcm9tICcuL3NlcnZpY2VzL3JlcXVlc3Quc2VydmljZSdcclxuZXhwb3J0ICogZnJvbSAnLi91dGlscy90b29sYmVsdCdcclxuZXhwb3J0ICogZnJvbSAnLi9pbnRlcmZhY2VzL3NlbGVjdExpc3QuaW50ZXJmYWNlJ1xyXG4iXSwibmFtZXMiOlsiU3ViamVjdCIsInRha2VVbnRpbCIsIkluamVjdGFibGUiLCJIdHRwUmVxdWVzdCIsIkh0dHBDbGllbnQiLCJIdHRwSGVhZGVycyIsIkluamVjdG9yIiwiTmdNb2R1bGUiLCJDb21tb25Nb2R1bGUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQU9BO1FBTUMsNkJBQ1EsbUJBQXdDLEVBQ3hDLE1BQWM7WUFEZCx3QkFBbUIsR0FBbkIsbUJBQW1CLENBQXFCO1lBQ3hDLFdBQU0sR0FBTixNQUFNLENBQVE7WUFQdEIsc0JBQWlCLEdBQVksS0FBSyxDQUFBO1lBQ2xDLGlCQUFZLEdBQVksS0FBSyxDQUFBO1lBQzdCLGdCQUFXLEdBQTBCLEVBQUUsQ0FBQTtZQUN2QyxnQkFBVyxHQUEwQixFQUFFLENBQUE7U0FNdEM7Ozs7UUFFRCxzQ0FBUTs7O1lBQVI7Z0JBQUEsaUJBTUM7Z0JBTEEsSUFBSSxDQUFDLG1CQUFtQixDQUFDLFdBQVcsQ0FBQyxTQUFTLENBQUMsVUFBQyxJQUF5QixJ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QUUsQ0FBQzs0QkFBQyxTQUFTO3dCQUNqRDs0QkFDSSxJQUFJLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUU7Z0NBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQztnQ0FBQyxTQUFTOzZCQUFFOzRCQUM1RyxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRTtnQ0FBRSxDQUFDLENBQUMsS0FBSyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQ0FBQyxNQUFNOzZCQUFFOzRCQUN0RixJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUU7Z0NBQUUsQ0FBQyxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0NBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQztnQ0FBQyxNQUFNOzZCQUFFOzRCQUNyRSxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRTtnQ0FBRSxDQUFDLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztnQ0FBQyxNQUFNOzZCQUFFOzRCQUNuRSxJ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