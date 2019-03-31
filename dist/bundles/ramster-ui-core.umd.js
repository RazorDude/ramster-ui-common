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
            this.headers = new http.HttpHeaders({ 'Content-Type': 'application/json' });
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
                    }
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
                                        body: instance.stringifyGetParams(instance.emptyToNull(params))
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
    exports.getNested = getNested;
    exports.setNested = setNested;
    exports.GlobalEventsService = GlobalEventsService;
    exports.RequestService = RequestService;

    Object.defineProperty(exports, '__esModule', { value: true });

})));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmFtc3Rlci11aS1jb3JlLnVtZC5qcy5tYXAiLCJzb3VyY2VzIjpbIm5nOi8vcmFtc3Rlci11aS1jb3JlL2NvbXBvbmVudHMvYmFzZS1sYXlvdXQuY29tcG9uZW50LnRzIiwibmc6Ly9yYW1zdGVyLXVpLWNvcmUvY29tcG9uZW50cy9iYXNlLXBhZ2UuY29tcG9uZW50LnRzIiwibm9kZV9tb2R1bGVzL3RzbGliL3RzbGliLmVzNi5qcyIsIm5nOi8vcmFtc3Rlci11aS1jb3JlL3NlcnZpY2VzL2dsb2JhbEV2ZW50cy9nbG9iYWxFdmVudHMuc2VydmljZS50cyIsIm5nOi8vcmFtc3Rlci11aS1jb3JlL3NlcnZpY2VzL3JlcXVlc3Quc2VydmljZS50cyIsIm5nOi8vcmFtc3Rlci11aS1jb3JlL3NlcnZpY2VzL2Jhc2VSRVNULnNlcnZpY2UudHMiLCJuZzovL3JhbXN0ZXItdWktY29yZS9zZXJ2aWNlcy9maWxlc1JFU1Quc2VydmljZS50cyIsIm5nOi8vcmFtc3Rlci11aS1jb3JlL3V0aWxzL3Rvb2xiZWx0LnRzIiwibmc6Ly9yYW1zdGVyLXVpLWNvcmUvaW5kZXgudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtPbkluaXR9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnXHJcbmltcG9ydCB7Um91dGVyfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInXHJcblxyXG5pbXBvcnQge0dsb2JhbEV2ZW50c1NlcnZpY2V9IGZyb20gJy4uL3NlcnZpY2VzL2dsb2JhbEV2ZW50cy9nbG9iYWxFdmVudHMuc2VydmljZSdcclxuaW1wb3J0IHtHRVNSZWRpcmVjdE9wdGlvbnNJbnRlcmZhY2V9IGZyb20gJy4uL3NlcnZpY2VzL2dsb2JhbEV2ZW50cy9nbG9iYWxFdmVudHMuaW50ZXJmYWNlcydcclxuXHJcblxyXG5leHBvcnQgY2xhc3MgQmFzZUxheW91dENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XHJcblx0aW5pdGlhbERhdGFMb2FkZWQ6IGJvb2xlYW4gPSBmYWxzZVxyXG5cdGxvYWRlckFjdGl2ZTogYm9vbGVhbiA9IGZhbHNlXHJcblx0cXVlcnlQYXJhbXM6IHtbeDogc3RyaW5nXTogc3RyaW5nfSA9IHt9XHJcblx0cm91dGVQYXJhbXM6IHtbeDogc3RyaW5nXTogc3RyaW5nfSA9IHt9XHJcblxyXG5cdGNvbnN0cnVjdG9yKFxyXG5cdFx0cHVibGljIGdsb2JhbEV2ZW50c1NlcnZpY2U6IEdsb2JhbEV2ZW50c1NlcnZpY2UsXHJcblx0XHRwdWJsaWMgcm91dGVyOiBSb3V0ZXJcclxuXHQpIHtcclxuXHR9XHJcblxyXG5cdG5nT25Jbml0KCk6IHZvaWQge1xyXG5cdFx0dGhpcy5nbG9iYWxFdmVudHNTZXJ2aWNlLnBhZ2VMb2FkZWQkLnN1YnNjcmliZSgoZGF0YT86IHtbeDogc3RyaW5nXTogYW55fSkgPT4gdGhpcy5wYWdlTG9hZGVkKGRhdGEpKVxyXG5cdFx0dGhpcy5nbG9iYWxFdmVudHNTZXJ2aWNlLnRyaWdnZXJJbml0aWFsRGF0YUxvYWQkLnN1YnNjcmliZSgoKSA9PiB0aGlzLmxvYWRJbml0aWFsRGF0YSgpKVxyXG5cdFx0dGhpcy5nbG9iYWxFdmVudHNTZXJ2aWNlLnNldExheW91dERhdGEkLnN1YnNjcmliZSgoZGF0YSkgPT4gdGhpcy5zZXRMYXlvdXREYXRhKGRhdGEpKVxyXG5cdFx0dGhpcy5nbG9iYWxFdmVudHNTZXJ2aWNlLnJlZGlyZWN0JC5zdWJzY3JpYmUoKHtyb3V0ZSwgb3B0aW9uc30pID0+IHRoaXMucmVkaXJlY3Qocm91dGUsIG9wdGlvbnMpKVxyXG5cdFx0dGhpcy5nbG9iYWxFdmVudHNTZXJ2aWNlLnRvZ2dsZUxvYWRlciQuc3Vic2NyaWJlKChhY3RpdmUpID0+IHRoaXMudG9nZ2xlTG9hZGVyKGFjdGl2ZSkpXHJcblx0fVxyXG5cclxuXHRzZW5kSW5pdGlhbERhdGFMb2FkZWRFdmVudCgpIHtcclxuXHRcdHRoaXMuZ2xvYmFsRXZlbnRzU2VydmljZS5pbml0aWFsRGF0YUxvYWRlZCh7cXVlcnlQYXJhbXM6IHRoaXMucXVlcnlQYXJhbXMsIHJvdXRlUGFyYW1zOiB0aGlzLnJvdXRlUGFyYW1zfSlcclxuXHR9XHJcblxyXG5cclxuXHQvLyBnbG9iYWxFdmVudHNTZXJ2aWNlIGhhbmRsZXJzXHJcblxyXG5cdHBhZ2VMb2FkZWQoZGF0YT86IHtbeDogc3RyaW5nXTogYW55fSk6IHZvaWQge1xyXG5cdFx0aWYgKGRhdGEpIHtcclxuXHRcdFx0Zm9yIChjb25zdCBrZXkgaW4gZGF0YSkge1xyXG5cdFx0XHRcdHRoaXNba2V5XSA9IGRhdGFba2V5XVxyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0XHRpZiAodGhpcy5pbml0aWFsRGF0YUxvYWRlZCkge1xyXG5cdFx0XHR0aGlzLnNlbmRJbml0aWFsRGF0YUxvYWRlZEV2ZW50KClcclxuXHRcdFx0cmV0dXJuXHJcblx0XHR9XHJcblx0XHR0aGlzLmxvYWRJbml0aWFsRGF0YSgpXHJcblx0fVxyXG5cclxuXHRsb2FkSW5pdGlhbERhdGEoKTogdm9pZCB7XHJcblx0XHR0aGlzLnNlbmRJbml0aWFsRGF0YUxvYWRlZEV2ZW50KClcclxuXHR9XHJcblxyXG5cdHNldExheW91dERhdGEoYXJnczoge1t4OiBzdHJpbmddOiBhbnl9KSB7XHJcblx0XHRmb3IgKGNvbnN0IGtleSBpbiBhcmdzKSB7XHJcblx0XHRcdHRoaXNba2V5XSA9IGFyZ3Nba2V5XVxyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0cmVkaXJlY3Qocm91dGU6IHN0cmluZywgb3B0aW9uczogR0VTUmVkaXJlY3RPcHRpb25zSW50ZXJmYWNlKTogdm9pZCB7XHJcblx0XHRjb25zdCBhY3R1YWxPcHRpb25zID0gb3B0aW9ucyB8fCB7fSxcclxuXHRcdFx0e3F1ZXJ5UGFyYW1zLCByZWxvYWRJbml0aWFsRGF0YX0gPSBhY3R1YWxPcHRpb25zXHJcblx0XHRpZiAocmVsb2FkSW5pdGlhbERhdGEpIHtcclxuXHRcdFx0dGhpcy5pbml0aWFsRGF0YUxvYWRlZCA9IGZhbHNlXHJcblx0XHR9XHJcblx0XHR0aGlzLnJvdXRlci5uYXZpZ2F0ZShbcm91dGVdLCB7cXVlcnlQYXJhbXM6IHF1ZXJ5UGFyYW1zIHx8IHt9fSlcclxuXHR9XHJcblxyXG5cdHRvZ2dsZUxvYWRlcihhY3RpdmU6IGJvb2xlYW4pOiB2b2lkIHtcclxuXHRcdHRoaXMubG9hZGVyQWN0aXZlID0gYWN0aXZlXHJcblx0fVxyXG59XHJcbiIsIid1c2Ugc3RyaWN0J1xyXG5cclxuaW1wb3J0IHtBY3RpdmF0ZWRSb3V0ZX0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJ1xyXG5pbXBvcnQge09uRGVzdHJveSwgT25Jbml0fSBmcm9tICdAYW5ndWxhci9jb3JlJ1xyXG5pbXBvcnQge1N1YmplY3R9IGZyb20gJ3J4anMnXHJcbmltcG9ydCB7dGFrZVVudGlsfSBmcm9tICdyeGpzL29wZXJhdG9ycydcclxuXHJcbmltcG9ydCB7R2xvYmFsRXZlbnRzU2VydmljZX0gZnJvbSAnLi4vc2VydmljZXMvZ2xvYmFsRXZlbnRzL2dsb2JhbEV2ZW50cy5zZXJ2aWNlJ1xyXG5cclxuZXhwb3J0IGNsYXNzIEJhc2VQYWdlQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3kge1xyXG5cdGRlc3Ryb3llZDogU3ViamVjdDx2b2lkPiA9IG5ldyBTdWJqZWN0KClcclxuXHRsb2dnZWRJblVzZXI/OiBhbnlcclxuXHRxdWVyeVBhcmFtczoge1t4OiBzdHJpbmddOiBzdHJpbmd9XHJcblx0cm91dGVQYXJhbXM6IHtbeDogc3RyaW5nXTogc3RyaW5nfVxyXG5cclxuXHRjb25zdHJ1Y3RvcihcclxuXHRcdHB1YmxpYyBhY3RpdmF0ZWRSb3V0ZTogQWN0aXZhdGVkUm91dGUsXHJcblx0XHRwdWJsaWMgZ2xvYmFsRXZlbnRzU2VydmljZTogR2xvYmFsRXZlbnRzU2VydmljZSxcclxuXHRcdHB1YmxpYyBvbkluaXRNZXRob2ROYW1lczogc3RyaW5nW10sXHJcblx0XHRwdWJsaWMgb25Jbml0aWFsRGF0YUxvYWRlZE1ldGhvZE5hbWVzOiBzdHJpbmdbXVxyXG5cdCkge1xyXG5cdH1cclxuXHJcblx0bmdPbkluaXQoKSB7XHJcblx0XHR0aGlzLmdsb2JhbEV2ZW50c1NlcnZpY2UuaW5pdGlhbERhdGFMb2FkZWQkLnBpcGUodGFrZVVudGlsKHRoaXMuZGVzdHJveWVkKSkuc3Vic2NyaWJlKChkYXRhKSA9PiB0aGlzLmluaXRpYWxEYXRhTG9hZGVkKGRhdGEpKVxyXG5cdFx0dGhpcy5vbkluaXRNZXRob2ROYW1lcy5mb3JFYWNoKChtZXRob2ROYW1lKSA9PiB7XHJcblx0XHRcdGlmICh0eXBlb2YgdGhpc1ttZXRob2ROYW1lXSA9PT0gJ2Z1bmN0aW9uJykge1xyXG5cdFx0XHRcdHRoaXNbbWV0aG9kTmFtZV0oKVxyXG5cdFx0XHR9XHJcblx0XHR9KVxyXG5cdH1cclxuXHJcblx0cmVzZXQoKTogdm9pZCB7XHJcblx0XHR0aGlzLnF1ZXJ5UGFyYW1zID0gdGhpcy5hY3RpdmF0ZWRSb3V0ZS5zbmFwc2hvdC5xdWVyeVBhcmFtc1xyXG5cdFx0dGhpcy5yb3V0ZVBhcmFtcyA9IHRoaXMuYWN0aXZhdGVkUm91dGUuc25hcHNob3QucGFyYW1zXHJcblx0fVxyXG5cclxuXHRzZW5kUGFnZUxvYWRlZEV2ZW50KCkge1xyXG5cdFx0dGhpcy5nbG9iYWxFdmVudHNTZXJ2aWNlLnBhZ2VMb2FkZWQoe3F1ZXJ5UGFyYW1zOiB0aGlzLnF1ZXJ5UGFyYW1zLCByb3V0ZVBhcmFtczogdGhpcy5yb3V0ZVBhcmFtc30pXHJcblx0fVxyXG5cclxuXHRpbml0aWFsRGF0YUxvYWRlZChkYXRhKTogdm9pZCB7XHJcblx0XHR0aGlzLmxvZ2dlZEluVXNlciA9IGRhdGEudXNlclxyXG5cdFx0dGhpcy5xdWVyeVBhcmFtcyA9IGRhdGEucXVlcnlQYXJhbXNcclxuXHRcdHRoaXMucm91dGVQYXJhbXMgPSBkYXRhLnJvdXRlUGFyYW1zXHJcblx0XHR0aGlzLm9uSW5pdGlhbERhdGFMb2FkZWRNZXRob2ROYW1lcy5mb3JFYWNoKChtZXRob2ROYW1lKSA9PiB7XHJcblx0XHRcdGlmICh0eXBlb2YgdGhpc1ttZXRob2ROYW1lXSA9PT0gJ2Z1bmN0aW9uJykge1xyXG5cdFx0XHRcdHRoaXNbbWV0aG9kTmFtZV0oZGF0YSlcclxuXHRcdFx0fVxyXG5cdFx0fSlcclxuXHR9XHJcblxyXG5cdGRlc3RydWN0b3IoKSB7XHJcblx0XHR0aGlzLmRlc3Ryb3llZC5uZXh0KClcclxuXHRcdHRoaXMuZGVzdHJveWVkLmNvbXBsZXRlKClcclxuXHR9XHJcblxyXG5cdG5nT25EZXN0cm95KCkge1xyXG5cdFx0dGhpcy5kZXN0cnVjdG9yKClcclxuXHR9XHJcbn1cclxuIiwiLyohICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbkNvcHlyaWdodCAoYykgTWljcm9zb2Z0IENvcnBvcmF0aW9uLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxyXG5MaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpOyB5b3UgbWF5IG5vdCB1c2VcclxudGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGVcclxuTGljZW5zZSBhdCBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcclxuXHJcblRISVMgQ09ERSBJUyBQUk9WSURFRCBPTiBBTiAqQVMgSVMqIEJBU0lTLCBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTllcclxuS0lORCwgRUlUSEVSIEVYUFJFU1MgT1IgSU1QTElFRCwgSU5DTFVESU5HIFdJVEhPVVQgTElNSVRBVElPTiBBTlkgSU1QTElFRFxyXG5XQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgVElUTEUsIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFLFxyXG5NRVJDSEFOVEFCTElUWSBPUiBOT04tSU5GUklOR0VNRU5ULlxyXG5cclxuU2VlIHRoZSBBcGFjaGUgVmVyc2lvbiAyLjAgTGljZW5zZSBmb3Igc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zXHJcbmFuZCBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cclxuKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiogKi9cclxuLyogZ2xvYmFsIFJlZmxlY3QsIFByb21pc2UgKi9cclxuXHJcbnZhciBleHRlbmRTdGF0aWNzID0gZnVuY3Rpb24oZCwgYikge1xyXG4gICAgZXh0ZW5kU3RhdGljcyA9IE9iamVjdC5zZXRQcm90b3R5cGVPZiB8fFxyXG4gICAgICAgICh7IF9fcHJvdG9fXzogW10gfSBpbnN0YW5jZW9mIEFycmF5ICYmIGZ1bmN0aW9uIChkLCBiKSB7IGQuX19wcm90b19fID0gYjsgfSkgfHxcclxuICAgICAgICBmdW5jdGlvbiAoZCwgYikgeyBmb3IgKHZhciBwIGluIGIpIGlmIChiLmhhc093blByb3BlcnR5KHApKSBkW3BdID0gYltwXTsgfTtcclxuICAgIHJldHVybiBleHRlbmRTdGF0aWNzKGQsIGIpO1xyXG59O1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fZXh0ZW5kcyhkLCBiKSB7XHJcbiAgICBleHRlbmRTdGF0aWNzKGQsIGIpO1xyXG4gICAgZnVuY3Rpb24gX18oKSB7IHRoaXMuY29uc3RydWN0b3IgPSBkOyB9XHJcbiAgICBkLnByb3RvdHlwZSA9IGIgPT09IG51bGwgPyBPYmplY3QuY3JlYXRlKGIpIDogKF9fLnByb3RvdHlwZSA9IGIucHJvdG90eXBlLCBuZXcgX18oKSk7XHJcbn1cclxuXHJcbmV4cG9ydCB2YXIgX19hc3NpZ24gPSBmdW5jdGlvbigpIHtcclxuICAgIF9fYXNzaWduID0gT2JqZWN0LmFzc2lnbiB8fCBmdW5jdGlvbiBfX2Fzc2lnbih0KSB7XHJcbiAgICAgICAgZm9yICh2YXIgcywgaSA9IDEsIG4gPSBhcmd1bWVudHMubGVuZ3RoOyBpIDwgbjsgaSsrKSB7XHJcbiAgICAgICAgICAgIHMgPSBhcmd1bWVudHNbaV07XHJcbiAgICAgICAgICAgIGZvciAodmFyIHAgaW4gcykgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzLCBwKSkgdFtwXSA9IHNbcF07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0O1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIF9fYXNzaWduLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3Jlc3QocywgZSkge1xyXG4gICAgdmFyIHQgPSB7fTtcclxuICAgIGZvciAodmFyIHAgaW4gcykgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzLCBwKSAmJiBlLmluZGV4T2YocCkgPCAwKVxyXG4gICAgICAgIHRbcF0gPSBzW3BdO1xyXG4gICAgaWYgKHMgIT0gbnVsbCAmJiB0eXBlb2YgT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyA9PT0gXCJmdW5jdGlvblwiKVxyXG4gICAgICAgIGZvciAodmFyIGkgPSAwLCBwID0gT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyhzKTsgaSA8IHAubGVuZ3RoOyBpKyspIGlmIChlLmluZGV4T2YocFtpXSkgPCAwKVxyXG4gICAgICAgICAgICB0W3BbaV1dID0gc1twW2ldXTtcclxuICAgIHJldHVybiB0O1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19kZWNvcmF0ZShkZWNvcmF0b3JzLCB0YXJnZXQsIGtleSwgZGVzYykge1xyXG4gICAgdmFyIGMgPSBhcmd1bWVudHMubGVuZ3RoLCByID0gYyA8IDMgPyB0YXJnZXQgOiBkZXNjID09PSBudWxsID8gZGVzYyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IodGFyZ2V0LCBrZXkpIDogZGVzYywgZDtcclxuICAgIGlmICh0eXBlb2YgUmVmbGVjdCA9PT0gXCJvYmplY3RcIiAmJiB0eXBlb2YgUmVmbGVjdC5kZWNvcmF0ZSA9PT0gXCJmdW5jdGlvblwiKSByID0gUmVmbGVjdC5kZWNvcmF0ZShkZWNvcmF0b3JzLCB0YXJnZXQsIGtleSwgZGVzYyk7XHJcbiAgICBlbHNlIGZvciAodmFyIGkgPSBkZWNvcmF0b3JzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSBpZiAoZCA9IGRlY29yYXRvcnNbaV0pIHIgPSAoYyA8IDMgPyBkKHIpIDogYyA+IDMgPyBkKHRhcmdldCwga2V5LCByKSA6IGQodGFyZ2V0LCBrZXkpKSB8fCByO1xyXG4gICAgcmV0dXJuIGMgPiAzICYmIHIgJiYgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwga2V5LCByKSwgcjtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fcGFyYW0ocGFyYW1JbmRleCwgZGVjb3JhdG9yKSB7XHJcbiAgICByZXR1cm4gZnVuY3Rpb24gKHRhcmdldCwga2V5KSB7IGRlY29yYXRvcih0YXJnZXQsIGtleSwgcGFyYW1JbmRleCk7IH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fbWV0YWRhdGEobWV0YWRhdGFLZXksIG1ldGFkYXRhVmFsdWUpIHtcclxuICAgIGlmICh0eXBlb2YgUmVmbGVjdCA9PT0gXCJvYmplY3RcIiAmJiB0eXBlb2YgUmVmbGVjdC5tZXRhZGF0YSA9PT0gXCJmdW5jdGlvblwiKSByZXR1cm4gUmVmbGVjdC5tZXRhZGF0YShtZXRhZGF0YUtleSwgbWV0YWRhdGFWYWx1ZSk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2F3YWl0ZXIodGhpc0FyZywgX2FyZ3VtZW50cywgUCwgZ2VuZXJhdG9yKSB7XHJcbiAgICByZXR1cm4gbmV3IChQIHx8IChQID0gUHJvbWlzZSkpKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcclxuICAgICAgICBmdW5jdGlvbiBmdWxmaWxsZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3IubmV4dCh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XHJcbiAgICAgICAgZnVuY3Rpb24gcmVqZWN0ZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3JbXCJ0aHJvd1wiXSh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XHJcbiAgICAgICAgZnVuY3Rpb24gc3RlcChyZXN1bHQpIHsgcmVzdWx0LmRvbmUgPyByZXNvbHZlKHJlc3VsdC52YWx1ZSkgOiBuZXcgUChmdW5jdGlvbiAocmVzb2x2ZSkgeyByZXNvbHZlKHJlc3VsdC52YWx1ZSk7IH0pLnRoZW4oZnVsZmlsbGVkLCByZWplY3RlZCk7IH1cclxuICAgICAgICBzdGVwKChnZW5lcmF0b3IgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSkpLm5leHQoKSk7XHJcbiAgICB9KTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fZ2VuZXJhdG9yKHRoaXNBcmcsIGJvZHkpIHtcclxuICAgIHZhciBfID0geyBsYWJlbDogMCwgc2VudDogZnVuY3Rpb24oKSB7IGlmICh0WzBdICYgMSkgdGhyb3cgdFsxXTsgcmV0dXJuIHRbMV07IH0sIHRyeXM6IFtdLCBvcHM6IFtdIH0sIGYsIHksIHQsIGc7XHJcbiAgICByZXR1cm4gZyA9IHsgbmV4dDogdmVyYigwKSwgXCJ0aHJvd1wiOiB2ZXJiKDEpLCBcInJldHVyblwiOiB2ZXJiKDIpIH0sIHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiAoZ1tTeW1ib2wuaXRlcmF0b3JdID0gZnVuY3Rpb24oKSB7IHJldHVybiB0aGlzOyB9KSwgZztcclxuICAgIGZ1bmN0aW9uIHZlcmIobikgeyByZXR1cm4gZnVuY3Rpb24gKHYpIHsgcmV0dXJuIHN0ZXAoW24sIHZdKTsgfTsgfVxyXG4gICAgZnVuY3Rpb24gc3RlcChvcCkge1xyXG4gICAgICAgIGlmIChmKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiR2VuZXJhdG9yIGlzIGFscmVhZHkgZXhlY3V0aW5nLlwiKTtcclxuICAgICAgICB3aGlsZSAoXykgdHJ5IHtcclxuICAgICAgICAgICAgaWYgKGYgPSAxLCB5ICYmICh0ID0gb3BbMF0gJiAyID8geVtcInJldHVyblwiXSA6IG9wWzBdID8geVtcInRocm93XCJdIHx8ICgodCA9IHlbXCJyZXR1cm5cIl0pICYmIHQuY2FsbCh5KSwgMCkgOiB5Lm5leHQpICYmICEodCA9IHQuY2FsbCh5LCBvcFsxXSkpLmRvbmUpIHJldHVybiB0O1xyXG4gICAgICAgICAgICBpZiAoeSA9IDAsIHQpIG9wID0gW29wWzBdICYgMiwgdC52YWx1ZV07XHJcbiAgICAgICAgICAgIHN3aXRjaCAob3BbMF0pIHtcclxuICAgICAgICAgICAgICAgIGNhc2UgMDogY2FzZSAxOiB0ID0gb3A7IGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSA0OiBfLmxhYmVsKys7IHJldHVybiB7IHZhbHVlOiBvcFsxXSwgZG9uZTogZmFsc2UgfTtcclxuICAgICAgICAgICAgICAgIGNhc2UgNTogXy5sYWJlbCsrOyB5ID0gb3BbMV07IG9wID0gWzBdOyBjb250aW51ZTtcclxuICAgICAgICAgICAgICAgIGNhc2UgNzogb3AgPSBfLm9wcy5wb3AoKTsgXy50cnlzLnBvcCgpOyBjb250aW51ZTtcclxuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCEodCA9IF8udHJ5cywgdCA9IHQubGVuZ3RoID4gMCAmJiB0W3QubGVuZ3RoIC0gMV0pICYmIChvcFswXSA9PT0gNiB8fCBvcFswXSA9PT0gMikpIHsgXyA9IDA7IGNvbnRpbnVlOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG9wWzBdID09PSAzICYmICghdCB8fCAob3BbMV0gPiB0WzBdICYmIG9wWzFdIDwgdFszXSkpKSB7IF8ubGFiZWwgPSBvcFsxXTsgYnJlYWs7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAob3BbMF0gPT09IDYgJiYgXy5sYWJlbCA8IHRbMV0pIHsgXy5sYWJlbCA9IHRbMV07IHQgPSBvcDsgYnJlYWs7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAodCAmJiBfLmxhYmVsIDwgdFsyXSkgeyBfLmxhYmVsID0gdFsyXTsgXy5vcHMucHVzaChvcCk7IGJyZWFrOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRbMl0pIF8ub3BzLnBvcCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIF8udHJ5cy5wb3AoKTsgY29udGludWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgb3AgPSBib2R5LmNhbGwodGhpc0FyZywgXyk7XHJcbiAgICAgICAgfSBjYXRjaCAoZSkgeyBvcCA9IFs2LCBlXTsgeSA9IDA7IH0gZmluYWxseSB7IGYgPSB0ID0gMDsgfVxyXG4gICAgICAgIGlmIChvcFswXSAmIDUpIHRocm93IG9wWzFdOyByZXR1cm4geyB2YWx1ZTogb3BbMF0gPyBvcFsxXSA6IHZvaWQgMCwgZG9uZTogdHJ1ZSB9O1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19leHBvcnRTdGFyKG0sIGV4cG9ydHMpIHtcclxuICAgIGZvciAodmFyIHAgaW4gbSkgaWYgKCFleHBvcnRzLmhhc093blByb3BlcnR5KHApKSBleHBvcnRzW3BdID0gbVtwXTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fdmFsdWVzKG8pIHtcclxuICAgIHZhciBtID0gdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIG9bU3ltYm9sLml0ZXJhdG9yXSwgaSA9IDA7XHJcbiAgICBpZiAobSkgcmV0dXJuIG0uY2FsbChvKTtcclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgbmV4dDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBpZiAobyAmJiBpID49IG8ubGVuZ3RoKSBvID0gdm9pZCAwO1xyXG4gICAgICAgICAgICByZXR1cm4geyB2YWx1ZTogbyAmJiBvW2krK10sIGRvbmU6ICFvIH07XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fcmVhZChvLCBuKSB7XHJcbiAgICB2YXIgbSA9IHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiBvW1N5bWJvbC5pdGVyYXRvcl07XHJcbiAgICBpZiAoIW0pIHJldHVybiBvO1xyXG4gICAgdmFyIGkgPSBtLmNhbGwobyksIHIsIGFyID0gW10sIGU7XHJcbiAgICB0cnkge1xyXG4gICAgICAgIHdoaWxlICgobiA9PT0gdm9pZCAwIHx8IG4tLSA+IDApICYmICEociA9IGkubmV4dCgpKS5kb25lKSBhci5wdXNoKHIudmFsdWUpO1xyXG4gICAgfVxyXG4gICAgY2F0Y2ggKGVycm9yKSB7IGUgPSB7IGVycm9yOiBlcnJvciB9OyB9XHJcbiAgICBmaW5hbGx5IHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBpZiAociAmJiAhci5kb25lICYmIChtID0gaVtcInJldHVyblwiXSkpIG0uY2FsbChpKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZmluYWxseSB7IGlmIChlKSB0aHJvdyBlLmVycm9yOyB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gYXI7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3NwcmVhZCgpIHtcclxuICAgIGZvciAodmFyIGFyID0gW10sIGkgPSAwOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKVxyXG4gICAgICAgIGFyID0gYXIuY29uY2F0KF9fcmVhZChhcmd1bWVudHNbaV0pKTtcclxuICAgIHJldHVybiBhcjtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXdhaXQodikge1xyXG4gICAgcmV0dXJuIHRoaXMgaW5zdGFuY2VvZiBfX2F3YWl0ID8gKHRoaXMudiA9IHYsIHRoaXMpIDogbmV3IF9fYXdhaXQodik7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2FzeW5jR2VuZXJhdG9yKHRoaXNBcmcsIF9hcmd1bWVudHMsIGdlbmVyYXRvcikge1xyXG4gICAgaWYgKCFTeW1ib2wuYXN5bmNJdGVyYXRvcikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlN5bWJvbC5hc3luY0l0ZXJhdG9yIGlzIG5vdCBkZWZpbmVkLlwiKTtcclxuICAgIHZhciBnID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pLCBpLCBxID0gW107XHJcbiAgICByZXR1cm4gaSA9IHt9LCB2ZXJiKFwibmV4dFwiKSwgdmVyYihcInRocm93XCIpLCB2ZXJiKFwicmV0dXJuXCIpLCBpW1N5bWJvbC5hc3luY0l0ZXJhdG9yXSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXM7IH0sIGk7XHJcbiAgICBmdW5jdGlvbiB2ZXJiKG4pIHsgaWYgKGdbbl0pIGlbbl0gPSBmdW5jdGlvbiAodikgeyByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKGEsIGIpIHsgcS5wdXNoKFtuLCB2LCBhLCBiXSkgPiAxIHx8IHJlc3VtZShuLCB2KTsgfSk7IH07IH1cclxuICAgIGZ1bmN0aW9uIHJlc3VtZShuLCB2KSB7IHRyeSB7IHN0ZXAoZ1tuXSh2KSk7IH0gY2F0Y2ggKGUpIHsgc2V0dGxlKHFbMF1bM10sIGUpOyB9IH1cclxuICAgIGZ1bmN0aW9uIHN0ZXAocikgeyByLnZhbHVlIGluc3RhbmNlb2YgX19hd2FpdCA/IFByb21pc2UucmVzb2x2ZShyLnZhbHVlLnYpLnRoZW4oZnVsZmlsbCwgcmVqZWN0KSA6IHNldHRsZShxWzBdWzJdLCByKTsgfVxyXG4gICAgZnVuY3Rpb24gZnVsZmlsbCh2YWx1ZSkgeyByZXN1bWUoXCJuZXh0XCIsIHZhbHVlKTsgfVxyXG4gICAgZnVuY3Rpb24gcmVqZWN0KHZhbHVlKSB7IHJlc3VtZShcInRocm93XCIsIHZhbHVlKTsgfVxyXG4gICAgZnVuY3Rpb24gc2V0dGxlKGYsIHYpIHsgaWYgKGYodiksIHEuc2hpZnQoKSwgcS5sZW5ndGgpIHJlc3VtZShxWzBdWzBdLCBxWzBdWzFdKTsgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hc3luY0RlbGVnYXRvcihvKSB7XHJcbiAgICB2YXIgaSwgcDtcclxuICAgIHJldHVybiBpID0ge30sIHZlcmIoXCJuZXh0XCIpLCB2ZXJiKFwidGhyb3dcIiwgZnVuY3Rpb24gKGUpIHsgdGhyb3cgZTsgfSksIHZlcmIoXCJyZXR1cm5cIiksIGlbU3ltYm9sLml0ZXJhdG9yXSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXM7IH0sIGk7XHJcbiAgICBmdW5jdGlvbiB2ZXJiKG4sIGYpIHsgaVtuXSA9IG9bbl0gPyBmdW5jdGlvbiAodikgeyByZXR1cm4gKHAgPSAhcCkgPyB7IHZhbHVlOiBfX2F3YWl0KG9bbl0odikpLCBkb25lOiBuID09PSBcInJldHVyblwiIH0gOiBmID8gZih2KSA6IHY7IH0gOiBmOyB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2FzeW5jVmFsdWVzKG8pIHtcclxuICAgIGlmICghU3ltYm9sLmFzeW5jSXRlcmF0b3IpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJTeW1ib2wuYXN5bmNJdGVyYXRvciBpcyBub3QgZGVmaW5lZC5cIik7XHJcbiAgICB2YXIgbSA9IG9bU3ltYm9sLmFzeW5jSXRlcmF0b3JdLCBpO1xyXG4gICAgcmV0dXJuIG0gPyBtLmNhbGwobykgOiAobyA9IHR5cGVvZiBfX3ZhbHVlcyA9PT0gXCJmdW5jdGlvblwiID8gX192YWx1ZXMobykgOiBvW1N5bWJvbC5pdGVyYXRvcl0oKSwgaSA9IHt9LCB2ZXJiKFwibmV4dFwiKSwgdmVyYihcInRocm93XCIpLCB2ZXJiKFwicmV0dXJuXCIpLCBpW1N5bWJvbC5hc3luY0l0ZXJhdG9yXSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXM7IH0sIGkpO1xyXG4gICAgZnVuY3Rpb24gdmVyYihuKSB7IGlbbl0gPSBvW25dICYmIGZ1bmN0aW9uICh2KSB7IHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7IHYgPSBvW25dKHYpLCBzZXR0bGUocmVzb2x2ZSwgcmVqZWN0LCB2LmRvbmUsIHYudmFsdWUpOyB9KTsgfTsgfVxyXG4gICAgZnVuY3Rpb24gc2V0dGxlKHJlc29sdmUsIHJlamVjdCwgZCwgdikgeyBQcm9taXNlLnJlc29sdmUodikudGhlbihmdW5jdGlvbih2KSB7IHJlc29sdmUoeyB2YWx1ZTogdiwgZG9uZTogZCB9KTsgfSwgcmVqZWN0KTsgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19tYWtlVGVtcGxhdGVPYmplY3QoY29va2VkLCByYXcpIHtcclxuICAgIGlmIChPYmplY3QuZGVmaW5lUHJvcGVydHkpIHsgT2JqZWN0LmRlZmluZVByb3BlcnR5KGNvb2tlZCwgXCJyYXdcIiwgeyB2YWx1ZTogcmF3IH0pOyB9IGVsc2UgeyBjb29rZWQucmF3ID0gcmF3OyB9XHJcbiAgICByZXR1cm4gY29va2VkO1xyXG59O1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9faW1wb3J0U3Rhcihtb2QpIHtcclxuICAgIGlmIChtb2QgJiYgbW9kLl9fZXNNb2R1bGUpIHJldHVybiBtb2Q7XHJcbiAgICB2YXIgcmVzdWx0ID0ge307XHJcbiAgICBpZiAobW9kICE9IG51bGwpIGZvciAodmFyIGsgaW4gbW9kKSBpZiAoT2JqZWN0Lmhhc093blByb3BlcnR5LmNhbGwobW9kLCBrKSkgcmVzdWx0W2tdID0gbW9kW2tdO1xyXG4gICAgcmVzdWx0LmRlZmF1bHQgPSBtb2Q7XHJcbiAgICByZXR1cm4gcmVzdWx0O1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19pbXBvcnREZWZhdWx0KG1vZCkge1xyXG4gICAgcmV0dXJuIChtb2QgJiYgbW9kLl9fZXNNb2R1bGUpID8gbW9kIDogeyBkZWZhdWx0OiBtb2QgfTtcclxufVxyXG4iLCJpbXBvcnQge0luamVjdGFibGV9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnXHJcbmltcG9ydCB7U3ViamVjdH0gZnJvbSAncnhqcydcclxuaW1wb3J0IHtHRVNSZWRpcmVjdE9wdGlvbnNJbnRlcmZhY2V9IGZyb20gJy4vZ2xvYmFsRXZlbnRzLmludGVyZmFjZXMnXHJcblxyXG5ASW5qZWN0YWJsZSgpXHJcbmV4cG9ydCBjbGFzcyBHbG9iYWxFdmVudHNTZXJ2aWNlIHtcclxuXHRwYWdlTG9hZGVkU291cmNlID0gbmV3IFN1YmplY3Q8e1t4OiBzdHJpbmddOiBhbnl9IHwgdm9pZD4oKVxyXG5cdHRyaWdnZXJJbml0aWFsRGF0YUxvYWRTb3VyY2UgPSBuZXcgU3ViamVjdDx2b2lkPigpXHJcblx0aW5pdGlhbERhdGFMb2FkZWRTb3VyY2UgPSBuZXcgU3ViamVjdDxhbnk+KClcclxuXHRzZXRMYXlvdXREYXRhU291cmNlID0gbmV3IFN1YmplY3Q8e1t4OiBzdHJpbmddOiBhbnl9PigpXHJcblx0cmVkaXJlY3RTb3VyY2UgPSBuZXcgU3ViamVjdDx7cm91dGU6IHN0cmluZywgb3B0aW9uczogR0VTUmVkaXJlY3RPcHRpb25zSW50ZXJmYWNlfT4oKVxyXG5cdG5vdGlmeVNvdXJjZSA9IG5ldyBTdWJqZWN0PHt0eXBlOiBzdHJpbmcsIG1lc3NhZ2U6IHN0cmluZ30+KClcclxuXHR0b2dnbGVMb2FkZXJTb3VyY2UgPSBuZXcgU3ViamVjdDxib29sZWFuPigpXHJcblxyXG5cdHBhZ2VMb2FkZWQkID0gdGhpcy5wYWdlTG9hZGVkU291cmNlLmFzT2JzZXJ2YWJsZSgpXHJcblx0dHJpZ2dlckluaXRpYWxEYXRhTG9hZCQgPSB0aGlzLnRyaWdnZXJJbml0aWFsRGF0YUxvYWRTb3VyY2UuYXNPYnNlcnZhYmxlKClcclxuXHRpbml0aWFsRGF0YUxvYWRlZCQgPSB0aGlzLmluaXRpYWxEYXRhTG9hZGVkU291cmNlLmFzT2JzZXJ2YWJsZSgpXHJcblx0c2V0TGF5b3V0RGF0YSQgPSB0aGlzLnNldExheW91dERhdGFTb3VyY2UuYXNPYnNlcnZhYmxlKClcclxuXHRyZWRpcmVjdCQgPSB0aGlzLnJlZGlyZWN0U291cmNlLmFzT2JzZXJ2YWJsZSgpXHJcblx0bm90aWZ5JCA9IHRoaXMubm90aWZ5U291cmNlLmFzT2JzZXJ2YWJsZSgpXHJcblx0dG9nZ2xlTG9hZGVyJCA9IHRoaXMudG9nZ2xlTG9hZGVyU291cmNlLmFzT2JzZXJ2YWJsZSgpXHJcblxyXG5cdHBhZ2VMb2FkZWQoZGF0YSk6IHZvaWQge1xyXG5cdFx0dGhpcy5wYWdlTG9hZGVkU291cmNlLm5leHQoZGF0YSlcclxuXHR9XHJcblxyXG5cdHRyaWdnZXJJbml0aWFsRGF0YUxvYWQoKTogdm9pZCB7XHJcblx0XHR0aGlzLnRyaWdnZXJJbml0aWFsRGF0YUxvYWRTb3VyY2UubmV4dCgpXHJcblx0fVxyXG5cclxuXHRpbml0aWFsRGF0YUxvYWRlZChkYXRhKTogdm9pZCB7XHJcblx0XHR0aGlzLmluaXRpYWxEYXRhTG9hZGVkU291cmNlLm5leHQoZGF0YSlcclxuXHR9XHJcblxyXG5cdHNldExheW91dERhdGEoZGF0YSk6IHZvaWQge1xyXG5cdFx0dGhpcy5zZXRMYXlvdXREYXRhU291cmNlLm5leHQoZGF0YSlcclxuXHR9XHJcblxyXG5cdHJlZGlyZWN0KHJvdXRlOiBzdHJpbmcsIG9wdGlvbnM/OiBHRVNSZWRpcmVjdE9wdGlvbnNJbnRlcmZhY2UpOiB2b2lkIHtcclxuXHRcdHRoaXMucmVkaXJlY3RTb3VyY2UubmV4dCh7cm91dGUsIG9wdGlvbnN9KVxyXG5cdH1cclxuXHJcblx0bm90aWZ5KHR5cGU6IHN0cmluZywgbWVzc2FnZTogc3RyaW5nKTogdm9pZCB7XHJcblx0XHR0aGlzLm5vdGlmeVNvdXJjZS5uZXh0KHt0eXBlLCBtZXNzYWdlfSlcclxuXHR9XHJcblxyXG5cdHRvZ2dsZUxvYWRlcihhY3RpdmU6IGJvb2xlYW4pOiB2b2lkIHtcclxuXHRcdHRoaXMudG9nZ2xlTG9hZGVyU291cmNlLm5leHQoYWN0aXZlKVxyXG5cdH1cclxufVxyXG4iLCJpbXBvcnQge0luamVjdGFibGV9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnXHJcbmltcG9ydCB7SHR0cENsaWVudCwgSHR0cFJlcXVlc3QsIEh0dHBSZXNwb25zZX0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnXHJcblxyXG5cclxuQEluamVjdGFibGUoKVxyXG5leHBvcnQgY2xhc3MgUmVxdWVzdFNlcnZpY2Uge1xyXG5cdGNvbnN0cnVjdG9yKHB1YmxpYyBjbGllbnQ6IEh0dHBDbGllbnQpIHt9XHJcblxyXG5cdGZsYXR0ZW5PYmplY3RGb3JRdWVyeShvYmplY3Q6IHtbeDogc3RyaW5nXTogYW55fSB8IGFueVtdLCBwYXJlbnRLZXk/OiBzdHJpbmcpOiB7a2V5OiBzdHJpbmcsIHZhbHVlOiBhbnl9W10ge1xyXG5cdFx0bGV0IHJldHVybk9iamVjdCA9IFtdXHJcblx0XHRpZiAob2JqZWN0IGluc3RhbmNlb2YgQXJyYXkpIHtcclxuXHRcdFx0aWYgKCFwYXJlbnRLZXkpIHtcclxuXHRcdFx0XHR0aHJvdyB7ZXJyb3I6ICdUaGUgdG9wLW1vc3QgaXRlbSBjYW5ub3QgYmUgYW4gYXJyYXkuJ31cclxuXHRcdFx0fVxyXG5cdFx0XHRvYmplY3QuZm9yRWFjaCgoaXRlbSkgPT4ge1xyXG5cdFx0XHRcdGlmIChpdGVtID09PSBudWxsKSB7XHJcblx0XHRcdFx0XHRyZXR1cm5cclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0aWYgKChpdGVtIGluc3RhbmNlb2YgRGF0ZSkgfHwgIShpdGVtIGluc3RhbmNlb2YgQXJyYXkpICB8fCAodHlwZW9mIGl0ZW0gIT09ICdvYmplY3QnKSkge1xyXG5cdFx0XHRcdFx0cmV0dXJuT2JqZWN0LnB1c2goe2tleTogYCR7cGFyZW50S2V5fVtdYCwgdmFsdWU6IGl0ZW19KVxyXG5cdFx0XHRcdFx0cmV0dXJuXHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdHJldHVybk9iamVjdCA9IHJldHVybk9iamVjdC5jb25jYXQodGhpcy5mbGF0dGVuT2JqZWN0Rm9yUXVlcnkoaXRlbSwgYCR7cGFyZW50S2V5fVtdYCkpXHJcblx0XHRcdFx0cmV0dXJuXHJcblx0XHRcdH0pXHJcblx0XHRcdHJldHVybiByZXR1cm5PYmplY3RcclxuXHRcdH1cclxuXHRcdGZvciAoY29uc3Qga2V5IGluIG9iamVjdCkge1xyXG5cdFx0XHRjb25zdCB2YWx1ZSA9IG9iamVjdFtrZXldXHJcblx0XHRcdGlmICh2YWx1ZSA9PT0gbnVsbCkge1xyXG5cdFx0XHRcdGNvbnRpbnVlXHJcblx0XHRcdH1cclxuXHRcdFx0aWYgKCh2YWx1ZSBpbnN0YW5jZW9mIERhdGUpIHx8ICh0eXBlb2YgdmFsdWUgIT09ICdvYmplY3QnKSkge1xyXG5cdFx0XHRcdHJldHVybk9iamVjdC5wdXNoKHtrZXk6IHBhcmVudEtleSA/IGAke3BhcmVudEtleX1bJHtrZXl9XWA6IGtleSwgdmFsdWV9KVxyXG5cdFx0XHRcdGNvbnRpbnVlXHJcblx0XHRcdH1cclxuXHRcdFx0cmV0dXJuT2JqZWN0ID0gcmV0dXJuT2JqZWN0LmNvbmNhdCh0aGlzLmZsYXR0ZW5PYmplY3RGb3JRdWVyeSh2YWx1ZSwgcGFyZW50S2V5ID8gYCR7cGFyZW50S2V5fVske2tleX1dYCA6IGtleSkpXHJcblx0XHR9XHJcblx0XHRyZXR1cm4gcmV0dXJuT2JqZWN0XHJcblx0fVxyXG5cclxuXHRydW4obWV0aG9kOiBzdHJpbmcsIHVybDogc3RyaW5nLCBvcHRpb25zPzoge1t4OiBzdHJpbmddOiBhbnl9KSB7XHJcblx0XHRyZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG5cdFx0XHR0cnkge1xyXG5cdFx0XHRcdGxldCBhY3R1YWxVcmwgPSB1cmwsXHJcblx0XHRcdFx0XHRydW5PcHRpb25zID0ge30gYXMgYW55LFxyXG5cdFx0XHRcdFx0cmVxdWVzdE9wdGlvbnMgPSB7fSBhcyBhbnksXHJcblx0XHRcdFx0XHRib2R5ID0gbnVsbFxyXG5cdFx0XHRcdGlmIChvcHRpb25zICYmICh0eXBlb2Ygb3B0aW9ucyA9PT0gJ29iamVjdCcpKSB7XHJcblx0XHRcdFx0XHRsZXQge3Jlc29sdmVXaXRoRnVsbFJlc3BvbnNlLCAuLi4gb3RoZXJPcHRpb25zfSA9IG9wdGlvbnNcclxuXHRcdFx0XHRcdHJlcXVlc3RPcHRpb25zID0gb3RoZXJPcHRpb25zXHJcblx0XHRcdFx0XHRydW5PcHRpb25zID0ge3Jlc29sdmVXaXRoRnVsbFJlc3BvbnNlfVxyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHRpZiAobWV0aG9kLnRvTG93ZXJDYXNlKCkgPT09ICdnZXQnKSB7XHJcblx0XHRcdFx0XHRpZiAoIXJlcXVlc3RPcHRpb25zIHx8ICh0eXBlb2YgcmVxdWVzdE9wdGlvbnMgIT09ICdvYmplY3QnKSkge1xyXG5cdFx0XHRcdFx0XHRyZXF1ZXN0T3B0aW9ucyA9IHt9XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRjb25zdCBvcHRpb25zUGFyYW1zID0gdGhpcy5mbGF0dGVuT2JqZWN0Rm9yUXVlcnkocmVxdWVzdE9wdGlvbnMucGFyYW1zIHx8IHt9KVxyXG5cdFx0XHRcdFx0YWN0dWFsVXJsICs9IGA/Xz0keyhuZXcgRGF0ZSgpKS5nZXRUaW1lKCkudG9TdHJpbmcoKX1gXHJcblx0XHRcdFx0XHRpZiAob3B0aW9uc1BhcmFtcy5sZW5ndGgpIHtcclxuXHRcdFx0XHRcdFx0b3B0aW9uc1BhcmFtcy5mb3JFYWNoKChpdGVtLCBpbmRleCkgPT4ge1xyXG5cdFx0XHRcdFx0XHRcdGFjdHVhbFVybCArPSBgJiR7aXRlbS5rZXl9PSR7aXRlbS52YWx1ZX1gXHJcblx0XHRcdFx0XHRcdH0pXHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdGlmICghcmVxdWVzdE9wdGlvbnMgfHwgKHR5cGVvZiByZXF1ZXN0T3B0aW9ucyAhPT0gJ29iamVjdCcpKSB7XHJcblx0XHRcdFx0XHRcdHJlcXVlc3RPcHRpb25zID0ge31cclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdGJvZHkgPSAoIXJlcXVlc3RPcHRpb25zLmJvZHkgfHwgKHR5cGVvZiByZXF1ZXN0T3B0aW9ucy5ib2R5ICE9PSAnb2JqZWN0JykpID8ge30gOiByZXF1ZXN0T3B0aW9ucy5ib2R5XHJcblx0XHRcdFx0XHRib2R5Ll8gPSAobmV3IERhdGUoKSkuZ2V0VGltZSgpXHJcblx0XHRcdFx0XHRkZWxldGUgcmVxdWVzdE9wdGlvbnMuYm9keVxyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHQvLyBpZiAoIXJlcXVlc3RPcHRpb25zLnJlc3BvbnNlVHlwZSkge31cclxuXHRcdFx0XHR0aGlzLmNsaWVudC5yZXF1ZXN0KG5ldyBIdHRwUmVxdWVzdChtZXRob2QsIGFjdHVhbFVybCwgYm9keSwgcmVxdWVzdE9wdGlvbnMpKS50b1Byb21pc2UoKS50aGVuKFxyXG5cdFx0XHRcdFx0KHJlc3BvbnNlOiBIdHRwUmVzcG9uc2U8YW55PikgPT4gcnVuT3B0aW9ucy5yZXNvbHZlV2l0aEZ1bGxSZXNwb25zZSA/IHJlc29sdmUocmVzcG9uc2UpIDogcmVzb2x2ZShyZXNwb25zZS5ib2R5KSxcclxuXHRcdFx0XHRcdChlcnJvcjogYW55KSA9PiByZWplY3QoZXJyb3IpXHJcblx0XHRcdFx0KVxyXG5cdFx0XHR9IGNhdGNoKGVycm9yKSB7XHJcblx0XHRcdFx0cmVqZWN0KGVycm9yKVxyXG5cdFx0XHR9XHJcblx0XHR9KVxyXG5cdH1cclxufVxyXG4iLCJpbXBvcnQgY28gZnJvbSAnY28nXHJcbmltcG9ydCB7SW5qZWN0YWJsZX0gZnJvbSAnQGFuZ3VsYXIvY29yZSdcclxuaW1wb3J0IHtIdHRwSGVhZGVyc30gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnXHJcblxyXG5pbXBvcnQge0dsb2JhbEV2ZW50c1NlcnZpY2V9IGZyb20gJy4vZ2xvYmFsRXZlbnRzL2dsb2JhbEV2ZW50cy5zZXJ2aWNlJ1xyXG5pbXBvcnQge1JlcXVlc3RTZXJ2aWNlfSBmcm9tICcuL3JlcXVlc3Quc2VydmljZSdcclxuXHJcbkBJbmplY3RhYmxlKClcclxuZXhwb3J0IGNsYXNzIEJhc2VSRVNUU2VydmljZSB7XHJcblx0aGVhZGVycyA9IG5ldyBIdHRwSGVhZGVycyh7J0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJ30pXHJcblx0YmFzZVVybCA9ICcvJ1xyXG5cclxuXHRjb25zdHJ1Y3RvcihcclxuXHRcdHB1YmxpYyBnbG9iYWxFdmVudHNTZXJ2aWNlOiBHbG9iYWxFdmVudHNTZXJ2aWNlLFxyXG5cdFx0cHVibGljIHJlcXVlc3RTZXJ2aWNlOiBSZXF1ZXN0U2VydmljZVxyXG5cdCkge31cclxuXHJcblx0ZW1wdHlUb051bGwoZGF0YTogYW55KTogYW55IHtcclxuXHRcdGlmIChkYXRhID09PSAnJykge1xyXG5cdFx0XHRyZXR1cm4gbnVsbFxyXG5cdFx0fVxyXG5cdFx0aWYgKGRhdGEgaW5zdGFuY2VvZiBEYXRlKSB7XHJcblx0XHRcdHJldHVybiBkYXRhXHJcblx0XHR9XHJcblx0XHRpZiAoZGF0YSBpbnN0YW5jZW9mIEFycmF5KSB7XHJcblx0XHRcdHJldHVybiBkYXRhLm1hcCgoaXRlbSwgaW5kZXgpID0+IHRoaXMuZW1wdHlUb051bGwoaXRlbSkpXHJcblx0XHR9XHJcblx0XHRpZiAoKHR5cGVvZiBkYXRhID09PSAnb2JqZWN0JykgJiYgKGRhdGEgIT09IG51bGwpKSB7XHJcblx0XHRcdGNvbnN0IHBhcnNlZERhdGEgPSB7fVxyXG5cdFx0XHRmb3IgKGNvbnN0IGtleSBpbiBkYXRhKSB7XHJcblx0XHRcdFx0cGFyc2VkRGF0YVtrZXldID0gdGhpcy5lbXB0eVRvTnVsbChkYXRhW2tleV0pXHJcblx0XHRcdH1cclxuXHRcdFx0cmV0dXJuIHBhcnNlZERhdGFcclxuXHRcdH1cclxuXHRcdHJldHVybiBkYXRhXHJcblx0fVxyXG5cclxuXHRzdHJpbmdpZnlHZXRQYXJhbXMoZGF0YToge1trZXk6IHN0cmluZ106IGFueX0pOiB7W2tleTogc3RyaW5nXTogYW55fSB7XHJcblx0XHRsZXQgc3RyaW5naWZpZWRPYmplY3QgPSB7fVxyXG5cdFx0Zm9yIChjb25zdCBrZXkgaW4gZGF0YSkge1xyXG5cdFx0XHRjb25zdCB2YWx1ZSA9IGRhdGFba2V5XVxyXG5cdFx0XHRpZiAoKHZhbHVlIGluc3RhbmNlb2YgQXJyYXkpIHx8ICgodHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JykgJiYgKHZhbHVlICE9PSBudWxsKSAmJiAhKHZhbHVlIGluc3RhbmNlb2YgRGF0ZSkpKSB7XHJcblx0XHRcdFx0c3RyaW5naWZpZWRPYmplY3RbYF9qc29uXyR7a2V5fWBdID0gSlNPTi5zdHJpbmdpZnkodmFsdWUpXHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHRcdHJldHVybiBzdHJpbmdpZmllZE9iamVjdFxyXG5cdH1cclxuXHJcblx0aGFuZGxlRXJyb3IoZXJyKTogdm9pZCB7XHJcblx0XHR0aGlzLmdsb2JhbEV2ZW50c1NlcnZpY2Uubm90aWZ5KCdlcnJvcicsIGVyciAmJiBlcnIuZXJyb3IgJiYgZXJyLmVycm9yLmVycm9yIHx8ICdBbiBlcnJvciBoYXMgb2NjdXJyZWQuJylcclxuXHR9XHJcblxyXG5cdGNyZWF0ZShwYXJhbXMpOiBQcm9taXNlPGFueT4ge1xyXG5cdFx0Y29uc3QgaW5zdGFuY2UgPSB0aGlzXHJcblx0XHRyZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG5cdFx0XHRjbyhmdW5jdGlvbiooKSB7XHJcblx0XHRcdFx0cmV0dXJuIHlpZWxkIGluc3RhbmNlLnJlcXVlc3RTZXJ2aWNlLnJ1bigncG9zdCcsIGAke2luc3RhbmNlLmJhc2VVcmx9YCwge1xyXG5cdFx0XHRcdFx0aGVhZGVyczogaW5zdGFuY2UuaGVhZGVycyxcclxuXHRcdFx0XHRcdGJvZHk6IGluc3RhbmNlLmVtcHR5VG9OdWxsKHBhcmFtcylcclxuXHRcdFx0XHR9KVxyXG5cdFx0XHR9KS50aGVuKChyZXMpID0+IHJlc29sdmUocmVzKSwgKGVycikgPT4ge1xyXG5cdFx0XHRcdGluc3RhbmNlLmhhbmRsZUVycm9yKGVycilcclxuXHRcdFx0XHRyZWplY3Qoe2Vycm9yOiB0cnVlfSlcclxuXHRcdFx0fSlcclxuXHRcdH0pXHJcblx0fVxyXG5cclxuXHRyZWFkKHBhcmFtcyk6IFByb21pc2U8YW55PiB7XHJcblx0XHRjb25zdCBpbnN0YW5jZSA9IHRoaXNcclxuXHRcdHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcblx0XHRcdGNvKGZ1bmN0aW9uKigpIHtcclxuXHRcdFx0XHRyZXR1cm4geWllbGQgaW5zdGFuY2UucmVxdWVzdFNlcnZpY2UucnVuKCdnZXQnLCBgJHtpbnN0YW5jZS5iYXNlVXJsfS9pdGVtYCwge1xyXG5cdFx0XHRcdFx0aGVhZGVyczogaW5zdGFuY2UuaGVhZGVycyxcclxuXHRcdFx0XHRcdHBhcmFtczogaW5zdGFuY2Uuc3RyaW5naWZ5R2V0UGFyYW1zKGluc3RhbmNlLmVtcHR5VG9OdWxsKHBhcmFtcykpXHJcblx0XHRcdFx0fSlcclxuXHRcdFx0fSkudGhlbigocmVzKSA9PiByZXNvbHZlKHJlcyksIChlcnIpID0+IHtcclxuXHRcdFx0XHRpbnN0YW5jZS5oYW5kbGVFcnJvcihlcnIpXHJcblx0XHRcdFx0cmVqZWN0KHtlcnJvcjogdHJ1ZX0pXHJcblx0XHRcdH0pXHJcblx0XHR9KVxyXG5cdH1cclxuXHJcblx0cmVhZExpc3QocGFyYW1zKTogUHJvbWlzZTxhbnk+IHtcclxuXHRcdGNvbnN0IGluc3RhbmNlID0gdGhpc1xyXG5cdFx0cmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuXHRcdFx0Y28oZnVuY3Rpb24qKCkge1xyXG5cdFx0XHRcdHJldHVybiB5aWVsZCBpbnN0YW5jZS5yZXF1ZXN0U2VydmljZS5ydW4oJ2dldCcsIGAke2luc3RhbmNlLmJhc2VVcmx9YCwge1xyXG5cdFx0XHRcdFx0aGVhZGVyczogaW5zdGFuY2UuaGVhZGVycyxcclxuXHRcdFx0XHRcdHBhcmFtczogaW5zdGFuY2Uuc3RyaW5naWZ5R2V0UGFyYW1zKGluc3RhbmNlLmVtcHR5VG9OdWxsKHBhcmFtcykpXHJcblx0XHRcdFx0fSlcclxuXHRcdFx0fSkudGhlbigocmVzKSA9PiByZXNvbHZlKHJlcyksIChlcnIpID0+IHtcclxuXHRcdFx0XHRpbnN0YW5jZS5oYW5kbGVFcnJvcihlcnIpXHJcblx0XHRcdFx0cmVqZWN0KHtlcnJvcjogdHJ1ZX0pXHJcblx0XHRcdH0pXHJcblx0XHR9KVxyXG5cdH1cclxuXHJcblx0cmVhZFNlbGVjdExpc3QocGFyYW1zKTogUHJvbWlzZTxhbnk+IHtcclxuXHRcdGNvbnN0IGluc3RhbmNlID0gdGhpc1xyXG5cdFx0cmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuXHRcdFx0Y28oZnVuY3Rpb24qKCkge1xyXG5cdFx0XHRcdHJldHVybiB5aWVsZCBpbnN0YW5jZS5yZXF1ZXN0U2VydmljZS5ydW4oJ2dldCcsIGAke2luc3RhbmNlLmJhc2VVcmx9L3NlbGVjdExpc3RgLCB7XHJcblx0XHRcdFx0XHRoZWFkZXJzOiBpbnN0YW5jZS5oZWFkZXJzLFxyXG5cdFx0XHRcdFx0cGFyYW1zOiBpbnN0YW5jZS5zdHJpbmdpZnlHZXRQYXJhbXMoaW5zdGFuY2UuZW1wdHlUb051bGwocGFyYW1zKSlcclxuXHRcdFx0XHR9KVxyXG5cdFx0XHR9KS50aGVuKChyZXMpID0+IHJlc29sdmUocmVzKSwgKGVycikgPT4ge1xyXG5cdFx0XHRcdGluc3RhbmNlLmhhbmRsZUVycm9yKGVycilcclxuXHRcdFx0XHRyZWplY3Qoe2Vycm9yOiB0cnVlfSlcclxuXHRcdFx0fSlcclxuXHRcdH0pXHJcblx0fVxyXG5cclxuXHR1cGRhdGUocGFyYW1zKTogUHJvbWlzZTxhbnk+IHtcclxuXHRcdGNvbnN0IGluc3RhbmNlID0gdGhpc1xyXG5cdFx0cmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuXHRcdFx0Y28oZnVuY3Rpb24qKCkge1xyXG5cdFx0XHRcdHJldHVybiB5aWVsZCBpbnN0YW5jZS5yZXF1ZXN0U2VydmljZS5ydW4oJ3BhdGNoJywgYCR7aW5zdGFuY2UuYmFzZVVybH0vaXRlbS8ke3BhcmFtcy5pZH1gLCB7XHJcblx0XHRcdFx0XHRoZWFkZXJzOiBpbnN0YW5jZS5oZWFkZXJzLFxyXG5cdFx0XHRcdFx0Ym9keTogaW5zdGFuY2Uuc3RyaW5naWZ5R2V0UGFyYW1zKGluc3RhbmNlLmVtcHR5VG9OdWxsKHBhcmFtcykpXHJcblx0XHRcdFx0fSlcclxuXHRcdFx0fSkudGhlbigocmVzKSA9PiByZXNvbHZlKHJlcyksIChlcnIpID0+IHtcclxuXHRcdFx0XHRpbnN0YW5jZS5oYW5kbGVFcnJvcihlcnIpXHJcblx0XHRcdFx0cmVqZWN0KHtlcnJvcjogdHJ1ZX0pXHJcblx0XHRcdH0pXHJcblx0XHR9KVxyXG5cdH1cclxuXHJcblx0YnVsa1Vwc2VydChwYXJhbXMpOiBQcm9taXNlPGFueT4ge1xyXG5cdFx0Y29uc3QgaW5zdGFuY2UgPSB0aGlzXHJcblx0XHRyZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG5cdFx0XHRjbyhmdW5jdGlvbiooKSB7XHJcblx0XHRcdFx0cmV0dXJuIHlpZWxkIGluc3RhbmNlLnJlcXVlc3RTZXJ2aWNlLnJ1bigncHV0JywgYCR7aW5zdGFuY2UuYmFzZVVybH1gLCB7XHJcblx0XHRcdFx0XHRoZWFkZXJzOiBpbnN0YW5jZS5oZWFkZXJzLFxyXG5cdFx0XHRcdFx0Ym9keTogaW5zdGFuY2UuZW1wdHlUb051bGwocGFyYW1zKVxyXG5cdFx0XHRcdH0pXHJcblx0XHRcdH0pLnRoZW4oKHJlcykgPT4gcmVzb2x2ZShyZXMpLCAoZXJyKSA9PiB7XHJcblx0XHRcdFx0aW5zdGFuY2UuaGFuZGxlRXJyb3IoZXJyKVxyXG5cdFx0XHRcdHJlamVjdCh7ZXJyb3I6IHRydWV9KVxyXG5cdFx0XHR9KVxyXG5cdFx0fSlcclxuXHR9XHJcblxyXG5cdGRlbGV0ZShwYXJhbXMpOiBQcm9taXNlPGFueT4ge1xyXG5cdFx0Y29uc3QgaW5zdGFuY2UgPSB0aGlzXHJcblx0XHRyZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG5cdFx0XHRjbyhmdW5jdGlvbiooKSB7XHJcblx0XHRcdFx0cmV0dXJuIHlpZWxkIGluc3RhbmNlLnJlcXVlc3RTZXJ2aWNlLnJ1bignZGVsZXRlJywgYCR7aW5zdGFuY2UuYmFzZVVybH0vJHtwYXJhbXMuaWR9YCwge1xyXG5cdFx0XHRcdFx0aGVhZGVyczogaW5zdGFuY2UuaGVhZGVycyxcclxuXHRcdFx0XHRcdGJvZHk6IGluc3RhbmNlLmVtcHR5VG9OdWxsKHBhcmFtcylcclxuXHRcdFx0XHR9KVxyXG5cdFx0XHR9KS50aGVuKChyZXMpID0+IHJlc29sdmUocmVzKSwgKGVycikgPT4ge1xyXG5cdFx0XHRcdGluc3RhbmNlLmhhbmRsZUVycm9yKGVycilcclxuXHRcdFx0XHRyZWplY3Qoe2Vycm9yOiB0cnVlfSlcclxuXHRcdFx0fSlcclxuXHRcdH0pXHJcblx0fVxyXG59XHJcbiIsImltcG9ydCBjbyBmcm9tICdjbydcclxuaW1wb3J0IHtJbmplY3RhYmxlfSBmcm9tICdAYW5ndWxhci9jb3JlJ1xyXG5pbXBvcnQge0h0dHBIZWFkZXJzfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCdcclxuXHJcbmltcG9ydCB7R2xvYmFsRXZlbnRzU2VydmljZX0gZnJvbSAnLi9nbG9iYWxFdmVudHMvZ2xvYmFsRXZlbnRzLnNlcnZpY2UnXHJcbmltcG9ydCB7UmVxdWVzdFNlcnZpY2V9IGZyb20gJy4vcmVxdWVzdC5zZXJ2aWNlJ1xyXG5cclxuQEluamVjdGFibGUoKVxyXG5leHBvcnQgY2xhc3MgRmlsZXNSRVNUU2VydmljZSB7XHJcblx0Ly8geydDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbid9XHJcblx0aGVhZGVycyA9IG5ldyBIdHRwSGVhZGVycygpXHJcblx0YmFzZVVybCA9ICcvZmlsZXMnXHJcblxyXG5cdGNvbnN0cnVjdG9yKFxyXG5cdFx0cHVibGljIGdsb2JhbEV2ZW50c1NlcnZpY2U6IEdsb2JhbEV2ZW50c1NlcnZpY2UsXHJcblx0XHRwdWJsaWMgcmVxdWVzdFNlcnZpY2U6IFJlcXVlc3RTZXJ2aWNlXHJcblx0KSB7fVxyXG5cclxuXHRoYW5kbGVFcnJvcihlcnIpOiB2b2lkIHtcclxuXHRcdHRoaXMuZ2xvYmFsRXZlbnRzU2VydmljZS5ub3RpZnkoJ2Vycm9yJywgZXJyICYmIGVyci5lcnJvciAmJiBlcnIuZXJyb3IuZXJyb3IgfHwgJ0FuIGVycm9yIGhhcyBvY2N1cnJlZC4nKVxyXG5cdH1cclxuXHJcblx0dXBsb2FkKGZpbGU6IEZpbGUsIHBhcmFtczoge291dHB1dEZpbGVOYW1lOiBzdHJpbmcsIFt4OiBzdHJpbmddOiBhbnl9LCBvcHRpb25zPzoge2hhbmRsZUVycm9yPzogYm9vbGVhbn0pOiBQcm9taXNlPGFueT4ge1xyXG5cdFx0Y29uc3QgaW5zdGFuY2UgPSB0aGlzXHJcblx0XHRyZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG5cdFx0XHRjbyhmdW5jdGlvbiooKSB7XHJcblx0XHRcdFx0bGV0IGZkID0gbmV3IEZvcm1EYXRhKClcclxuXHRcdFx0XHRmZC5hcHBlbmQoJ2ZpbGUnLCBmaWxlLCBmaWxlLm5hbWUpXHJcblx0XHRcdFx0Zm9yIChjb25zdCBrZXkgaW4gcGFyYW1zKSB7XHJcblx0XHRcdFx0XHRmZC5hcHBlbmQoa2V5LCBwYXJhbXNba2V5XSlcclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0aW5zdGFuY2UuaGVhZGVycy5zZXQoJ0NvbnRlbnQtVHlwZScsICdtdWx0aXBhcnQvZm9ybS1kYXRhJylcclxuXHRcdFx0XHR5aWVsZCBpbnN0YW5jZS5yZXF1ZXN0U2VydmljZS5ydW4oJ3Bvc3QnLCBgJHtpbnN0YW5jZS5iYXNlVXJsfWAsIHtcclxuXHRcdFx0XHRcdGhlYWRlcnM6IGluc3RhbmNlLmhlYWRlcnMsXHJcblx0XHRcdFx0XHRib2R5OiBmZFxyXG5cdFx0XHRcdH0pXHJcblx0XHRcdFx0cmV0dXJuIHtzdWNjZXNzOiB0cnVlfVxyXG5cdFx0XHR9KS50aGVuKChyZXMpID0+IHJlc29sdmUocmVzKSwgKGVycikgPT4ge1xyXG5cdFx0XHRcdGlmIChvcHRpb25zICYmIG9wdGlvbnMuaGFuZGxlRXJyb3IpIHtcclxuXHRcdFx0XHRcdGluc3RhbmNlLmhhbmRsZUVycm9yKGVycilcclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0cmVqZWN0KHtlcnJvcjogZXJyIHx8IHRydWV9KVxyXG5cdFx0XHR9KVxyXG5cdFx0fSlcclxuXHR9XHJcblxyXG5cdHJlYWQocGFyYW1zKTogUHJvbWlzZTxhbnk+IHtcclxuXHRcdGNvbnN0IGluc3RhbmNlID0gdGhpc1xyXG5cdFx0cmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuXHRcdFx0Y28oZnVuY3Rpb24qKCkge1xyXG5cdFx0XHRcdHJldHVybiB5aWVsZCBpbnN0YW5jZS5yZXF1ZXN0U2VydmljZS5ydW4oJ2dldCcsIGAke2luc3RhbmNlLmJhc2VVcmx9L2l0ZW1gLCB7XHJcblx0XHRcdFx0XHRoZWFkZXJzOiBpbnN0YW5jZS5oZWFkZXJzLFxyXG5cdFx0XHRcdFx0cGFyYW1zXHJcblx0XHRcdFx0fSlcclxuXHRcdFx0fSkudGhlbigocmVzKSA9PiByZXNvbHZlKHJlcyksIChlcnIpID0+IHtcclxuXHRcdFx0XHRpbnN0YW5jZS5oYW5kbGVFcnJvcihlcnIpXHJcblx0XHRcdFx0cmVqZWN0KHtlcnJvcjogdHJ1ZX0pXHJcblx0XHRcdH0pXHJcblx0XHR9KVxyXG5cdH1cclxufVxyXG4iLCJleHBvcnQgY29uc3QgZ2V0TmVzdGVkID0gKHBhcmVudDogYW55LCBmaWVsZDogc3RyaW5nKTogYW55ID0+IHtcclxuXHRpZiAoKHR5cGVvZiBwYXJlbnQgIT09ICdvYmplY3QnKSB8fCAodHlwZW9mIGZpZWxkICE9PSAnc3RyaW5nJykpIHtcclxuXHRcdHJldHVybiBudWxsXHJcblx0fVxyXG5cdGxldCBmaWVsZERhdGEgPSBmaWVsZC5zcGxpdCgnLicpLFxyXG5cdFx0Y3VycmVudEVsZW1lbnQgPSBwYXJlbnRcclxuXHRmb3IgKGxldCBpIGluIGZpZWxkRGF0YSkge1xyXG5cdFx0bGV0IGlubmVyRWxlbWVudCA9IGZpZWxkRGF0YVtpXVxyXG5cdFx0aWYgKGN1cnJlbnRFbGVtZW50ID09PSBudWxsKSB7XHJcblx0XHRcdHJldHVybiBjdXJyZW50RWxlbWVudFxyXG5cdFx0fVxyXG5cdFx0aWYgKCh0eXBlb2YgY3VycmVudEVsZW1lbnQgPT09ICd1bmRlZmluZWQnKSB8fCAodHlwZW9mIGN1cnJlbnRFbGVtZW50W2lubmVyRWxlbWVudF0gPT09ICd1bmRlZmluZWQnKSkge1xyXG5cdFx0XHRyZXR1cm4gY3VycmVudEVsZW1lbnRcclxuXHRcdH1cclxuXHRcdGN1cnJlbnRFbGVtZW50ID0gY3VycmVudEVsZW1lbnRbaW5uZXJFbGVtZW50XVxyXG5cdH1cclxuXHRyZXR1cm4gY3VycmVudEVsZW1lbnRcclxufVxyXG5cclxuZXhwb3J0IGNvbnN0IHNldE5lc3RlZCA9IChwYXJlbnQ6IGFueSwgZmllbGQ6IHN0cmluZywgdmFsdWU6IGFueSk6IGJvb2xlYW4gPT4ge1xyXG5cdGNvbnN0IGZpZWxkTmFtZXMgPSBmaWVsZC5zcGxpdCgnLicpXHJcblx0aWYgKCFmaWVsZE5hbWVzLmxlbmd0aCkge1xyXG5cdFx0cmV0dXJuIGZhbHNlXHJcblx0fVxyXG5cdGxldCBjdXJyZW50UGFyZW50ID0gcGFyZW50LFxyXG5cdFx0bG9vcEVuZCA9IGZpZWxkTmFtZXMubGVuZ3RoIC0gMVxyXG5cdGZvciAobGV0IGkgPSAwOyBpIDwgbG9vcEVuZDsgaSsrKSB7XHJcblx0XHRjb25zdCBmaWVsZE5hbWUgPSBmaWVsZE5hbWVzW2ldXHJcblx0XHRpZiAodHlwZW9mIGN1cnJlbnRQYXJlbnRbZmllbGROYW1lXSA9PT0gJ3VuZGVmaW5lZCcpIHtcclxuXHRcdFx0cmV0dXJuIGZhbHNlXHJcblx0XHR9XHJcblx0XHRjdXJyZW50UGFyZW50ID0gY3VycmVudFBhcmVudFtmaWVsZE5hbWVdXHJcblx0fVxyXG5cdGN1cnJlbnRQYXJlbnRbZmllbGROYW1lc1tsb29wRW5kXV0gPSB2YWx1ZVxyXG5cdHJldHVybiB0cnVlXHJcbn1cclxuIiwiJ3VzZSBzdHJpY3QnXHJcblxyXG4vLyBhbmd1bGFyIGRlcGVuZGVuY2llc1xyXG5pbXBvcnQge0NvbW1vbk1vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJ1xyXG5pbXBvcnQge05nTW9kdWxlfSBmcm9tICdAYW5ndWxhci9jb3JlJ1xyXG5cclxuXHJcbkBOZ01vZHVsZSh7XHJcblx0aW1wb3J0czogW1xyXG5cdFx0Q29tbW9uTW9kdWxlXHJcblx0XVxyXG59KVxyXG5leHBvcnQgY2xhc3MgUmFtc3RlclVJQ29yZU1vZHVsZSB7fVxyXG5cclxuZXhwb3J0ICogZnJvbSAnLi9jb21wb25lbnRzL2Jhc2UtbGF5b3V0LmNvbXBvbmVudCdcclxuZXhwb3J0ICogZnJvbSAnLi9jb21wb25lbnRzL2Jhc2UtcGFnZS5jb21wb25lbnQnXHJcbmV4cG9ydCAqIGZyb20gJy4vc2VydmljZXMvYmFzZVJFU1Quc2VydmljZSdcclxuZXhwb3J0ICogZnJvbSAnLi9zZXJ2aWNlcy9maWxlc1JFU1Quc2VydmljZSdcclxuZXhwb3J0ICogZnJvbSAnLi91dGlscy90b29sYmVsdCdcclxuZXhwb3J0ICogZnJvbSAnLi9zZXJ2aWNlcy9nbG9iYWxFdmVudHMvZ2xvYmFsRXZlbnRzLnNlcnZpY2UnXHJcbmV4cG9ydCAqIGZyb20gJy4vc2VydmljZXMvZ2xvYmFsRXZlbnRzL2dsb2JhbEV2ZW50cy5pbnRlcmZhY2VzJ1xyXG5leHBvcnQgKiBmcm9tICcuL3NlcnZpY2VzL3JlcXVlc3Quc2VydmljZSdcclxuZXhwb3J0ICogZnJvbSAnLi9pbnRlcmZhY2VzL3NlbGVjdExpc3QuaW50ZXJmYWNlJ1xyXG4iXSwibmFtZXMiOlsiU3ViamVjdCIsInRha2VVbnRpbCIsIkluamVjdGFibGUiLCJIdHRwUmVxdWVzdCIsIkh0dHBDbGllbnQiLCJIdHRwSGVhZGVycyIsIk5nTW9kdWxlIiwiQ29tbW9uTW9kdWxlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFPQTtRQU1DLDZCQUNRLG1CQUF3QyxFQUN4QyxNQUFjO1lBRGQsd0JBQW1CLEdBQW5CLG1CQUFtQixDQUFxQjtZQUN4QyxXQUFNLEdBQU4sTUFBTSxDQUFRO1lBUHRCLHNCQUFpQixHQUFZLEtBQUssQ0FBQTtZQUNsQyxpQkFBWSxHQUFZLEtBQUssQ0FBQTtZQUM3QixnQkFBVyxHQUEwQixFQUFFLENBQUE7WUFDdkMsZ0JBQVcsR0FBMEIsRUFBRSxDQUFBO1NBTXRDOzs7O1FBRUQsc0NBQVE7OztZQUFS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R0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxDQUFDOzRCQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUM7NEJBQUMsU0FBUzt3QkFDakQ7NEJBQ0ksSUFBSSxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUMsTUFBTSxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFO2dDQUFFLENBQUMsR0FBRyxDQUFDLENBQUM7Z0NBQUMsU0FBUzs2QkFBRTs0QkFDNUcsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUU7Z0NBQUUsQ0FBQyxDQUFDLEtBQUssR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0NBQUMsTUFBTTs2QkFBRTs0QkFDdEYsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFO2dDQUFFLENBQUMsQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dDQUFDLENBQUMsR0FBRyxFQUFFLENBQUM7Z0NBQUMsTUFBTTs2QkFBRTs0QkFDckUsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUU7Z0NBQUUsQ0FBQyxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0NB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