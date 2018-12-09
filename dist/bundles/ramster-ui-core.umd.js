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
                            var optionsParams = requestOptions.params || {};
                            /** @type {?} */
                            var httpParams_1 = new http.HttpParams();
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
                        _this.client.request(new http.HttpRequest(method, url, body, requestOptions)).toPromise().then(function (response) { return runOptions_1.resolveWithFullResponse ? resolve(response) : resolve(response.body); }, function (error) { return reject(error); });
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmFtc3Rlci11aS1jb3JlLnVtZC5qcy5tYXAiLCJzb3VyY2VzIjpbIm5nOi8vcmFtc3Rlci11aS1jb3JlL2NvbXBvbmVudHMvYmFzZS1sYXlvdXQuY29tcG9uZW50LnRzIiwibmc6Ly9yYW1zdGVyLXVpLWNvcmUvY29tcG9uZW50cy9iYXNlLXBhZ2UuY29tcG9uZW50LnRzIiwibm9kZV9tb2R1bGVzL3RzbGliL3RzbGliLmVzNi5qcyIsIm5nOi8vcmFtc3Rlci11aS1jb3JlL3NlcnZpY2VzL2dsb2JhbEV2ZW50cy9nbG9iYWxFdmVudHMuc2VydmljZS50cyIsIm5nOi8vcmFtc3Rlci11aS1jb3JlL3NlcnZpY2VzL3JlcXVlc3Quc2VydmljZS50cyIsIm5nOi8vcmFtc3Rlci11aS1jb3JlL3NlcnZpY2VzL2Jhc2VSRVNULnNlcnZpY2UudHMiLCJuZzovL3JhbXN0ZXItdWktY29yZS9zZXJ2aWNlcy9maWxlc1JFU1Quc2VydmljZS50cyIsIm5nOi8vcmFtc3Rlci11aS1jb3JlL3V0aWxzL3Rvb2xiZWx0LnRzIiwibmc6Ly9yYW1zdGVyLXVpLWNvcmUvaW5kZXgudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtPbkluaXR9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnXHJcbmltcG9ydCB7Um91dGVyfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInXHJcblxyXG5pbXBvcnQge0dsb2JhbEV2ZW50c1NlcnZpY2V9IGZyb20gJy4uL3NlcnZpY2VzL2dsb2JhbEV2ZW50cy9nbG9iYWxFdmVudHMuc2VydmljZSdcclxuaW1wb3J0IHtHRVNSZWRpcmVjdE9wdGlvbnNJbnRlcmZhY2V9IGZyb20gJy4uL3NlcnZpY2VzL2dsb2JhbEV2ZW50cy9nbG9iYWxFdmVudHMuaW50ZXJmYWNlcydcclxuXHJcblxyXG5leHBvcnQgY2xhc3MgQmFzZUxheW91dENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XHJcblx0aW5pdGlhbERhdGFMb2FkZWQ6IGJvb2xlYW4gPSBmYWxzZVxyXG5cdGxvYWRlckFjdGl2ZTogYm9vbGVhbiA9IGZhbHNlXHJcblx0cXVlcnlQYXJhbXM6IHtbeDogc3RyaW5nXTogc3RyaW5nfSA9IHt9XHJcblx0cm91dGVQYXJhbXM6IHtbeDogc3RyaW5nXTogc3RyaW5nfSA9IHt9XHJcblxyXG5cdGNvbnN0cnVjdG9yKFxyXG5cdFx0cHVibGljIGdsb2JhbEV2ZW50c1NlcnZpY2U6IEdsb2JhbEV2ZW50c1NlcnZpY2UsXHJcblx0XHRwdWJsaWMgcm91dGVyOiBSb3V0ZXJcclxuXHQpIHtcclxuXHR9XHJcblxyXG5cdG5nT25Jbml0KCk6IHZvaWQge1xyXG5cdFx0dGhpcy5nbG9iYWxFdmVudHNTZXJ2aWNlLnBhZ2VMb2FkZWQkLnN1YnNjcmliZSgoZGF0YT86IHtbeDogc3RyaW5nXTogYW55fSkgPT4gdGhpcy5wYWdlTG9hZGVkKGRhdGEpKVxyXG5cdFx0dGhpcy5nbG9iYWxFdmVudHNTZXJ2aWNlLnRyaWdnZXJJbml0aWFsRGF0YUxvYWQkLnN1YnNjcmliZSgoKSA9PiB0aGlzLmxvYWRJbml0aWFsRGF0YSgpKVxyXG5cdFx0dGhpcy5nbG9iYWxFdmVudHNTZXJ2aWNlLnNldExheW91dERhdGEkLnN1YnNjcmliZSgoZGF0YSkgPT4gdGhpcy5zZXRMYXlvdXREYXRhKGRhdGEpKVxyXG5cdFx0dGhpcy5nbG9iYWxFdmVudHNTZXJ2aWNlLnJlZGlyZWN0JC5zdWJzY3JpYmUoKHtyb3V0ZSwgb3B0aW9uc30pID0+IHRoaXMucmVkaXJlY3Qocm91dGUsIG9wdGlvbnMpKVxyXG5cdFx0dGhpcy5nbG9iYWxFdmVudHNTZXJ2aWNlLnRvZ2dsZUxvYWRlciQuc3Vic2NyaWJlKChhY3RpdmUpID0+IHRoaXMudG9nZ2xlTG9hZGVyKGFjdGl2ZSkpXHJcblx0fVxyXG5cclxuXHRzZW5kSW5pdGlhbERhdGFMb2FkZWRFdmVudCgpIHtcclxuXHRcdHRoaXMuZ2xvYmFsRXZlbnRzU2VydmljZS5pbml0aWFsRGF0YUxvYWRlZCh7cXVlcnlQYXJhbXM6IHRoaXMucXVlcnlQYXJhbXMsIHJvdXRlUGFyYW1zOiB0aGlzLnJvdXRlUGFyYW1zfSlcclxuXHR9XHJcblxyXG5cclxuXHQvLyBnbG9iYWxFdmVudHNTZXJ2aWNlIGhhbmRsZXJzXHJcblxyXG5cdHBhZ2VMb2FkZWQoZGF0YT86IHtbeDogc3RyaW5nXTogYW55fSk6IHZvaWQge1xyXG5cdFx0aWYgKGRhdGEpIHtcclxuXHRcdFx0Zm9yIChjb25zdCBrZXkgaW4gZGF0YSkge1xyXG5cdFx0XHRcdHRoaXNba2V5XSA9IGRhdGFba2V5XVxyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0XHRpZiAodGhpcy5pbml0aWFsRGF0YUxvYWRlZCkge1xyXG5cdFx0XHR0aGlzLnNlbmRJbml0aWFsRGF0YUxvYWRlZEV2ZW50KClcclxuXHRcdFx0cmV0dXJuXHJcblx0XHR9XHJcblx0XHR0aGlzLmxvYWRJbml0aWFsRGF0YSgpXHJcblx0fVxyXG5cclxuXHRsb2FkSW5pdGlhbERhdGEoKTogdm9pZCB7XHJcblx0XHR0aGlzLnNlbmRJbml0aWFsRGF0YUxvYWRlZEV2ZW50KClcclxuXHR9XHJcblxyXG5cdHNldExheW91dERhdGEoYXJnczoge1t4OiBzdHJpbmddOiBhbnl9KSB7XHJcblx0XHRmb3IgKGNvbnN0IGtleSBpbiBhcmdzKSB7XHJcblx0XHRcdHRoaXNba2V5XSA9IGFyZ3Nba2V5XVxyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0cmVkaXJlY3Qocm91dGU6IHN0cmluZywgb3B0aW9uczogR0VTUmVkaXJlY3RPcHRpb25zSW50ZXJmYWNlKTogdm9pZCB7XHJcblx0XHRjb25zdCBhY3R1YWxPcHRpb25zID0gb3B0aW9ucyB8fCB7fSxcclxuXHRcdFx0e3F1ZXJ5UGFyYW1zLCByZWxvYWRJbml0aWFsRGF0YX0gPSBhY3R1YWxPcHRpb25zXHJcblx0XHRpZiAocmVsb2FkSW5pdGlhbERhdGEpIHtcclxuXHRcdFx0dGhpcy5pbml0aWFsRGF0YUxvYWRlZCA9IGZhbHNlXHJcblx0XHR9XHJcblx0XHR0aGlzLnJvdXRlci5uYXZpZ2F0ZShbcm91dGVdLCB7cXVlcnlQYXJhbXM6IHF1ZXJ5UGFyYW1zIHx8IHt9fSlcclxuXHR9XHJcblxyXG5cdHRvZ2dsZUxvYWRlcihhY3RpdmU6IGJvb2xlYW4pOiB2b2lkIHtcclxuXHRcdHRoaXMubG9hZGVyQWN0aXZlID0gYWN0aXZlXHJcblx0fVxyXG59XHJcbiIsIid1c2Ugc3RyaWN0J1xyXG5cclxuaW1wb3J0IHtBY3RpdmF0ZWRSb3V0ZX0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJ1xyXG5pbXBvcnQge09uRGVzdHJveSwgT25Jbml0fSBmcm9tICdAYW5ndWxhci9jb3JlJ1xyXG5pbXBvcnQge1N1YmplY3R9IGZyb20gJ3J4anMnXHJcbmltcG9ydCB7dGFrZVVudGlsfSBmcm9tICdyeGpzL29wZXJhdG9ycydcclxuXHJcbmltcG9ydCB7R2xvYmFsRXZlbnRzU2VydmljZX0gZnJvbSAnLi4vc2VydmljZXMvZ2xvYmFsRXZlbnRzL2dsb2JhbEV2ZW50cy5zZXJ2aWNlJ1xyXG5cclxuZXhwb3J0IGNsYXNzIEJhc2VQYWdlQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3kge1xyXG5cdGRlc3Ryb3llZDogU3ViamVjdDx2b2lkPiA9IG5ldyBTdWJqZWN0KClcclxuXHRsb2dnZWRJblVzZXI/OiBhbnlcclxuXHRxdWVyeVBhcmFtczoge1t4OiBzdHJpbmddOiBzdHJpbmd9XHJcblx0cm91dGVQYXJhbXM6IHtbeDogc3RyaW5nXTogc3RyaW5nfVxyXG5cclxuXHRjb25zdHJ1Y3RvcihcclxuXHRcdHB1YmxpYyBhY3RpdmF0ZWRSb3V0ZTogQWN0aXZhdGVkUm91dGUsXHJcblx0XHRwdWJsaWMgZ2xvYmFsRXZlbnRzU2VydmljZTogR2xvYmFsRXZlbnRzU2VydmljZSxcclxuXHRcdHB1YmxpYyBvbkluaXRNZXRob2ROYW1lczogc3RyaW5nW10sXHJcblx0XHRwdWJsaWMgb25Jbml0aWFsRGF0YUxvYWRlZE1ldGhvZE5hbWVzOiBzdHJpbmdbXVxyXG5cdCkge1xyXG5cdH1cclxuXHJcblx0bmdPbkluaXQoKSB7XHJcblx0XHR0aGlzLmdsb2JhbEV2ZW50c1NlcnZpY2UuaW5pdGlhbERhdGFMb2FkZWQkLnBpcGUodGFrZVVudGlsKHRoaXMuZGVzdHJveWVkKSkuc3Vic2NyaWJlKChkYXRhKSA9PiB0aGlzLmluaXRpYWxEYXRhTG9hZGVkKGRhdGEpKVxyXG5cdFx0dGhpcy5vbkluaXRNZXRob2ROYW1lcy5mb3JFYWNoKChtZXRob2ROYW1lKSA9PiB7XHJcblx0XHRcdGlmICh0eXBlb2YgdGhpc1ttZXRob2ROYW1lXSA9PT0gJ2Z1bmN0aW9uJykge1xyXG5cdFx0XHRcdHRoaXNbbWV0aG9kTmFtZV0oKVxyXG5cdFx0XHR9XHJcblx0XHR9KVxyXG5cdH1cclxuXHJcblx0cmVzZXQoKTogdm9pZCB7XHJcblx0XHR0aGlzLnF1ZXJ5UGFyYW1zID0gdGhpcy5hY3RpdmF0ZWRSb3V0ZS5zbmFwc2hvdC5xdWVyeVBhcmFtc1xyXG5cdFx0dGhpcy5yb3V0ZVBhcmFtcyA9IHRoaXMuYWN0aXZhdGVkUm91dGUuc25hcHNob3QucGFyYW1zXHJcblx0XHR0aGlzLmdsb2JhbEV2ZW50c1NlcnZpY2UucGFnZUxvYWRlZCh7cXVlcnlQYXJhbXM6IHRoaXMucXVlcnlQYXJhbXMsIHJvdXRlUGFyYW1zOiB0aGlzLnJvdXRlUGFyYW1zfSlcclxuXHR9XHJcblxyXG5cdGluaXRpYWxEYXRhTG9hZGVkKGRhdGEpOiB2b2lkIHtcclxuXHRcdHRoaXMubG9nZ2VkSW5Vc2VyID0gZGF0YS51c2VyXHJcblx0XHR0aGlzLnF1ZXJ5UGFyYW1zID0gZGF0YS5xdWVyeVBhcmFtc1xyXG5cdFx0dGhpcy5yb3V0ZVBhcmFtcyA9IGRhdGEucm91dGVQYXJhbXNcclxuXHRcdHRoaXMub25Jbml0aWFsRGF0YUxvYWRlZE1ldGhvZE5hbWVzLmZvckVhY2goKG1ldGhvZE5hbWUpID0+IHtcclxuXHRcdFx0aWYgKHR5cGVvZiB0aGlzW21ldGhvZE5hbWVdID09PSAnZnVuY3Rpb24nKSB7XHJcblx0XHRcdFx0dGhpc1ttZXRob2ROYW1lXShkYXRhKVxyXG5cdFx0XHR9XHJcblx0XHR9KVxyXG5cdH1cclxuXHJcblx0ZGVzdHJ1Y3RvcigpIHtcclxuXHRcdHRoaXMuZGVzdHJveWVkLm5leHQoKVxyXG5cdFx0dGhpcy5kZXN0cm95ZWQuY29tcGxldGUoKVxyXG5cdH1cclxuXHJcblx0bmdPbkRlc3Ryb3koKSB7XHJcblx0XHR0aGlzLmRlc3RydWN0b3IoKVxyXG5cdH1cclxufVxyXG4iLCIvKiEgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuQ29weXJpZ2h0IChjKSBNaWNyb3NvZnQgQ29ycG9yYXRpb24uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXHJcbkxpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7IHlvdSBtYXkgbm90IHVzZVxyXG50aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS4gWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZVxyXG5MaWNlbnNlIGF0IGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxyXG5cclxuVEhJUyBDT0RFIElTIFBST1ZJREVEIE9OIEFOICpBUyBJUyogQkFTSVMsIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWVxyXG5LSU5ELCBFSVRIRVIgRVhQUkVTUyBPUiBJTVBMSUVELCBJTkNMVURJTkcgV0lUSE9VVCBMSU1JVEFUSU9OIEFOWSBJTVBMSUVEXHJcbldBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBUSVRMRSwgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UsXHJcbk1FUkNIQU5UQUJMSVRZIE9SIE5PTi1JTkZSSU5HRU1FTlQuXHJcblxyXG5TZWUgdGhlIEFwYWNoZSBWZXJzaW9uIDIuMCBMaWNlbnNlIGZvciBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnNcclxuYW5kIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxyXG4qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiAqL1xyXG4vKiBnbG9iYWwgUmVmbGVjdCwgUHJvbWlzZSAqL1xyXG5cclxudmFyIGV4dGVuZFN0YXRpY3MgPSBmdW5jdGlvbihkLCBiKSB7XHJcbiAgICBleHRlbmRTdGF0aWNzID0gT2JqZWN0LnNldFByb3RvdHlwZU9mIHx8XHJcbiAgICAgICAgKHsgX19wcm90b19fOiBbXSB9IGluc3RhbmNlb2YgQXJyYXkgJiYgZnVuY3Rpb24gKGQsIGIpIHsgZC5fX3Byb3RvX18gPSBiOyB9KSB8fFxyXG4gICAgICAgIGZ1bmN0aW9uIChkLCBiKSB7IGZvciAodmFyIHAgaW4gYikgaWYgKGIuaGFzT3duUHJvcGVydHkocCkpIGRbcF0gPSBiW3BdOyB9O1xyXG4gICAgcmV0dXJuIGV4dGVuZFN0YXRpY3MoZCwgYik7XHJcbn07XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19leHRlbmRzKGQsIGIpIHtcclxuICAgIGV4dGVuZFN0YXRpY3MoZCwgYik7XHJcbiAgICBmdW5jdGlvbiBfXygpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGQ7IH1cclxuICAgIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcclxufVxyXG5cclxuZXhwb3J0IHZhciBfX2Fzc2lnbiA9IGZ1bmN0aW9uKCkge1xyXG4gICAgX19hc3NpZ24gPSBPYmplY3QuYXNzaWduIHx8IGZ1bmN0aW9uIF9fYXNzaWduKHQpIHtcclxuICAgICAgICBmb3IgKHZhciBzLCBpID0gMSwgbiA9IGFyZ3VtZW50cy5sZW5ndGg7IGkgPCBuOyBpKyspIHtcclxuICAgICAgICAgICAgcyA9IGFyZ3VtZW50c1tpXTtcclxuICAgICAgICAgICAgZm9yICh2YXIgcCBpbiBzKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHMsIHApKSB0W3BdID0gc1twXTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHQ7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gX19hc3NpZ24uYXBwbHkodGhpcywgYXJndW1lbnRzKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fcmVzdChzLCBlKSB7XHJcbiAgICB2YXIgdCA9IHt9O1xyXG4gICAgZm9yICh2YXIgcCBpbiBzKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHMsIHApICYmIGUuaW5kZXhPZihwKSA8IDApXHJcbiAgICAgICAgdFtwXSA9IHNbcF07XHJcbiAgICBpZiAocyAhPSBudWxsICYmIHR5cGVvZiBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzID09PSBcImZ1bmN0aW9uXCIpXHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDAsIHAgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzKHMpOyBpIDwgcC5sZW5ndGg7IGkrKykgaWYgKGUuaW5kZXhPZihwW2ldKSA8IDApXHJcbiAgICAgICAgICAgIHRbcFtpXV0gPSBzW3BbaV1dO1xyXG4gICAgcmV0dXJuIHQ7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2RlY29yYXRlKGRlY29yYXRvcnMsIHRhcmdldCwga2V5LCBkZXNjKSB7XHJcbiAgICB2YXIgYyA9IGFyZ3VtZW50cy5sZW5ndGgsIHIgPSBjIDwgMyA/IHRhcmdldCA6IGRlc2MgPT09IG51bGwgPyBkZXNjID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcih0YXJnZXQsIGtleSkgOiBkZXNjLCBkO1xyXG4gICAgaWYgKHR5cGVvZiBSZWZsZWN0ID09PSBcIm9iamVjdFwiICYmIHR5cGVvZiBSZWZsZWN0LmRlY29yYXRlID09PSBcImZ1bmN0aW9uXCIpIHIgPSBSZWZsZWN0LmRlY29yYXRlKGRlY29yYXRvcnMsIHRhcmdldCwga2V5LCBkZXNjKTtcclxuICAgIGVsc2UgZm9yICh2YXIgaSA9IGRlY29yYXRvcnMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIGlmIChkID0gZGVjb3JhdG9yc1tpXSkgciA9IChjIDwgMyA/IGQocikgOiBjID4gMyA/IGQodGFyZ2V0LCBrZXksIHIpIDogZCh0YXJnZXQsIGtleSkpIHx8IHI7XHJcbiAgICByZXR1cm4gYyA+IDMgJiYgciAmJiBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBrZXksIHIpLCByO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19wYXJhbShwYXJhbUluZGV4LCBkZWNvcmF0b3IpIHtcclxuICAgIHJldHVybiBmdW5jdGlvbiAodGFyZ2V0LCBrZXkpIHsgZGVjb3JhdG9yKHRhcmdldCwga2V5LCBwYXJhbUluZGV4KTsgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19tZXRhZGF0YShtZXRhZGF0YUtleSwgbWV0YWRhdGFWYWx1ZSkge1xyXG4gICAgaWYgKHR5cGVvZiBSZWZsZWN0ID09PSBcIm9iamVjdFwiICYmIHR5cGVvZiBSZWZsZWN0Lm1ldGFkYXRhID09PSBcImZ1bmN0aW9uXCIpIHJldHVybiBSZWZsZWN0Lm1ldGFkYXRhKG1ldGFkYXRhS2V5LCBtZXRhZGF0YVZhbHVlKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXdhaXRlcih0aGlzQXJnLCBfYXJndW1lbnRzLCBQLCBnZW5lcmF0b3IpIHtcclxuICAgIHJldHVybiBuZXcgKFAgfHwgKFAgPSBQcm9taXNlKSkoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xyXG4gICAgICAgIGZ1bmN0aW9uIGZ1bGZpbGxlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvci5uZXh0KHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cclxuICAgICAgICBmdW5jdGlvbiByZWplY3RlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvcltcInRocm93XCJdKHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cclxuICAgICAgICBmdW5jdGlvbiBzdGVwKHJlc3VsdCkgeyByZXN1bHQuZG9uZSA/IHJlc29sdmUocmVzdWx0LnZhbHVlKSA6IG5ldyBQKGZ1bmN0aW9uIChyZXNvbHZlKSB7IHJlc29sdmUocmVzdWx0LnZhbHVlKTsgfSkudGhlbihmdWxmaWxsZWQsIHJlamVjdGVkKTsgfVxyXG4gICAgICAgIHN0ZXAoKGdlbmVyYXRvciA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSkubmV4dCgpKTtcclxuICAgIH0pO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19nZW5lcmF0b3IodGhpc0FyZywgYm9keSkge1xyXG4gICAgdmFyIF8gPSB7IGxhYmVsOiAwLCBzZW50OiBmdW5jdGlvbigpIHsgaWYgKHRbMF0gJiAxKSB0aHJvdyB0WzFdOyByZXR1cm4gdFsxXTsgfSwgdHJ5czogW10sIG9wczogW10gfSwgZiwgeSwgdCwgZztcclxuICAgIHJldHVybiBnID0geyBuZXh0OiB2ZXJiKDApLCBcInRocm93XCI6IHZlcmIoMSksIFwicmV0dXJuXCI6IHZlcmIoMikgfSwgdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIChnW1N5bWJvbC5pdGVyYXRvcl0gPSBmdW5jdGlvbigpIHsgcmV0dXJuIHRoaXM7IH0pLCBnO1xyXG4gICAgZnVuY3Rpb24gdmVyYihuKSB7IHJldHVybiBmdW5jdGlvbiAodikgeyByZXR1cm4gc3RlcChbbiwgdl0pOyB9OyB9XHJcbiAgICBmdW5jdGlvbiBzdGVwKG9wKSB7XHJcbiAgICAgICAgaWYgKGYpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJHZW5lcmF0b3IgaXMgYWxyZWFkeSBleGVjdXRpbmcuXCIpO1xyXG4gICAgICAgIHdoaWxlIChfKSB0cnkge1xyXG4gICAgICAgICAgICBpZiAoZiA9IDEsIHkgJiYgKHQgPSBvcFswXSAmIDIgPyB5W1wicmV0dXJuXCJdIDogb3BbMF0gPyB5W1widGhyb3dcIl0gfHwgKCh0ID0geVtcInJldHVyblwiXSkgJiYgdC5jYWxsKHkpLCAwKSA6IHkubmV4dCkgJiYgISh0ID0gdC5jYWxsKHksIG9wWzFdKSkuZG9uZSkgcmV0dXJuIHQ7XHJcbiAgICAgICAgICAgIGlmICh5ID0gMCwgdCkgb3AgPSBbb3BbMF0gJiAyLCB0LnZhbHVlXTtcclxuICAgICAgICAgICAgc3dpdGNoIChvcFswXSkge1xyXG4gICAgICAgICAgICAgICAgY2FzZSAwOiBjYXNlIDE6IHQgPSBvcDsgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDQ6IF8ubGFiZWwrKzsgcmV0dXJuIHsgdmFsdWU6IG9wWzFdLCBkb25lOiBmYWxzZSB9O1xyXG4gICAgICAgICAgICAgICAgY2FzZSA1OiBfLmxhYmVsKys7IHkgPSBvcFsxXTsgb3AgPSBbMF07IGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgY2FzZSA3OiBvcCA9IF8ub3BzLnBvcCgpOyBfLnRyeXMucG9wKCk7IGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgICAgICBpZiAoISh0ID0gXy50cnlzLCB0ID0gdC5sZW5ndGggPiAwICYmIHRbdC5sZW5ndGggLSAxXSkgJiYgKG9wWzBdID09PSA2IHx8IG9wWzBdID09PSAyKSkgeyBfID0gMDsgY29udGludWU7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAob3BbMF0gPT09IDMgJiYgKCF0IHx8IChvcFsxXSA+IHRbMF0gJiYgb3BbMV0gPCB0WzNdKSkpIHsgXy5sYWJlbCA9IG9wWzFdOyBicmVhazsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChvcFswXSA9PT0gNiAmJiBfLmxhYmVsIDwgdFsxXSkgeyBfLmxhYmVsID0gdFsxXTsgdCA9IG9wOyBicmVhazsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0ICYmIF8ubGFiZWwgPCB0WzJdKSB7IF8ubGFiZWwgPSB0WzJdOyBfLm9wcy5wdXNoKG9wKTsgYnJlYWs7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAodFsyXSkgXy5vcHMucG9wKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgXy50cnlzLnBvcCgpOyBjb250aW51ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBvcCA9IGJvZHkuY2FsbCh0aGlzQXJnLCBfKTtcclxuICAgICAgICB9IGNhdGNoIChlKSB7IG9wID0gWzYsIGVdOyB5ID0gMDsgfSBmaW5hbGx5IHsgZiA9IHQgPSAwOyB9XHJcbiAgICAgICAgaWYgKG9wWzBdICYgNSkgdGhyb3cgb3BbMV07IHJldHVybiB7IHZhbHVlOiBvcFswXSA/IG9wWzFdIDogdm9pZCAwLCBkb25lOiB0cnVlIH07XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2V4cG9ydFN0YXIobSwgZXhwb3J0cykge1xyXG4gICAgZm9yICh2YXIgcCBpbiBtKSBpZiAoIWV4cG9ydHMuaGFzT3duUHJvcGVydHkocCkpIGV4cG9ydHNbcF0gPSBtW3BdO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX192YWx1ZXMobykge1xyXG4gICAgdmFyIG0gPSB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgb1tTeW1ib2wuaXRlcmF0b3JdLCBpID0gMDtcclxuICAgIGlmIChtKSByZXR1cm4gbS5jYWxsKG8pO1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICBuZXh0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGlmIChvICYmIGkgPj0gby5sZW5ndGgpIG8gPSB2b2lkIDA7XHJcbiAgICAgICAgICAgIHJldHVybiB7IHZhbHVlOiBvICYmIG9baSsrXSwgZG9uZTogIW8gfTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19yZWFkKG8sIG4pIHtcclxuICAgIHZhciBtID0gdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIG9bU3ltYm9sLml0ZXJhdG9yXTtcclxuICAgIGlmICghbSkgcmV0dXJuIG87XHJcbiAgICB2YXIgaSA9IG0uY2FsbChvKSwgciwgYXIgPSBbXSwgZTtcclxuICAgIHRyeSB7XHJcbiAgICAgICAgd2hpbGUgKChuID09PSB2b2lkIDAgfHwgbi0tID4gMCkgJiYgIShyID0gaS5uZXh0KCkpLmRvbmUpIGFyLnB1c2goci52YWx1ZSk7XHJcbiAgICB9XHJcbiAgICBjYXRjaCAoZXJyb3IpIHsgZSA9IHsgZXJyb3I6IGVycm9yIH07IH1cclxuICAgIGZpbmFsbHkge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIGlmIChyICYmICFyLmRvbmUgJiYgKG0gPSBpW1wicmV0dXJuXCJdKSkgbS5jYWxsKGkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBmaW5hbGx5IHsgaWYgKGUpIHRocm93IGUuZXJyb3I7IH1cclxuICAgIH1cclxuICAgIHJldHVybiBhcjtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fc3ByZWFkKCkge1xyXG4gICAgZm9yICh2YXIgYXIgPSBbXSwgaSA9IDA7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspXHJcbiAgICAgICAgYXIgPSBhci5jb25jYXQoX19yZWFkKGFyZ3VtZW50c1tpXSkpO1xyXG4gICAgcmV0dXJuIGFyO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hd2FpdCh2KSB7XHJcbiAgICByZXR1cm4gdGhpcyBpbnN0YW5jZW9mIF9fYXdhaXQgPyAodGhpcy52ID0gdiwgdGhpcykgOiBuZXcgX19hd2FpdCh2KTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXN5bmNHZW5lcmF0b3IodGhpc0FyZywgX2FyZ3VtZW50cywgZ2VuZXJhdG9yKSB7XHJcbiAgICBpZiAoIVN5bWJvbC5hc3luY0l0ZXJhdG9yKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiU3ltYm9sLmFzeW5jSXRlcmF0b3IgaXMgbm90IGRlZmluZWQuXCIpO1xyXG4gICAgdmFyIGcgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSksIGksIHEgPSBbXTtcclxuICAgIHJldHVybiBpID0ge30sIHZlcmIoXCJuZXh0XCIpLCB2ZXJiKFwidGhyb3dcIiksIHZlcmIoXCJyZXR1cm5cIiksIGlbU3ltYm9sLmFzeW5jSXRlcmF0b3JdID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfSwgaTtcclxuICAgIGZ1bmN0aW9uIHZlcmIobikgeyBpZiAoZ1tuXSkgaVtuXSA9IGZ1bmN0aW9uICh2KSB7IHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAoYSwgYikgeyBxLnB1c2goW24sIHYsIGEsIGJdKSA+IDEgfHwgcmVzdW1lKG4sIHYpOyB9KTsgfTsgfVxyXG4gICAgZnVuY3Rpb24gcmVzdW1lKG4sIHYpIHsgdHJ5IHsgc3RlcChnW25dKHYpKTsgfSBjYXRjaCAoZSkgeyBzZXR0bGUocVswXVszXSwgZSk7IH0gfVxyXG4gICAgZnVuY3Rpb24gc3RlcChyKSB7IHIudmFsdWUgaW5zdGFuY2VvZiBfX2F3YWl0ID8gUHJvbWlzZS5yZXNvbHZlKHIudmFsdWUudikudGhlbihmdWxmaWxsLCByZWplY3QpIDogc2V0dGxlKHFbMF1bMl0sIHIpOyB9XHJcbiAgICBmdW5jdGlvbiBmdWxmaWxsKHZhbHVlKSB7IHJlc3VtZShcIm5leHRcIiwgdmFsdWUpOyB9XHJcbiAgICBmdW5jdGlvbiByZWplY3QodmFsdWUpIHsgcmVzdW1lKFwidGhyb3dcIiwgdmFsdWUpOyB9XHJcbiAgICBmdW5jdGlvbiBzZXR0bGUoZiwgdikgeyBpZiAoZih2KSwgcS5zaGlmdCgpLCBxLmxlbmd0aCkgcmVzdW1lKHFbMF1bMF0sIHFbMF1bMV0pOyB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2FzeW5jRGVsZWdhdG9yKG8pIHtcclxuICAgIHZhciBpLCBwO1xyXG4gICAgcmV0dXJuIGkgPSB7fSwgdmVyYihcIm5leHRcIiksIHZlcmIoXCJ0aHJvd1wiLCBmdW5jdGlvbiAoZSkgeyB0aHJvdyBlOyB9KSwgdmVyYihcInJldHVyblwiKSwgaVtTeW1ib2wuaXRlcmF0b3JdID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfSwgaTtcclxuICAgIGZ1bmN0aW9uIHZlcmIobiwgZikgeyBpW25dID0gb1tuXSA/IGZ1bmN0aW9uICh2KSB7IHJldHVybiAocCA9ICFwKSA/IHsgdmFsdWU6IF9fYXdhaXQob1tuXSh2KSksIGRvbmU6IG4gPT09IFwicmV0dXJuXCIgfSA6IGYgPyBmKHYpIDogdjsgfSA6IGY7IH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXN5bmNWYWx1ZXMobykge1xyXG4gICAgaWYgKCFTeW1ib2wuYXN5bmNJdGVyYXRvcikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlN5bWJvbC5hc3luY0l0ZXJhdG9yIGlzIG5vdCBkZWZpbmVkLlwiKTtcclxuICAgIHZhciBtID0gb1tTeW1ib2wuYXN5bmNJdGVyYXRvcl0sIGk7XHJcbiAgICByZXR1cm4gbSA/IG0uY2FsbChvKSA6IChvID0gdHlwZW9mIF9fdmFsdWVzID09PSBcImZ1bmN0aW9uXCIgPyBfX3ZhbHVlcyhvKSA6IG9bU3ltYm9sLml0ZXJhdG9yXSgpLCBpID0ge30sIHZlcmIoXCJuZXh0XCIpLCB2ZXJiKFwidGhyb3dcIiksIHZlcmIoXCJyZXR1cm5cIiksIGlbU3ltYm9sLmFzeW5jSXRlcmF0b3JdID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfSwgaSk7XHJcbiAgICBmdW5jdGlvbiB2ZXJiKG4pIHsgaVtuXSA9IG9bbl0gJiYgZnVuY3Rpb24gKHYpIHsgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHsgdiA9IG9bbl0odiksIHNldHRsZShyZXNvbHZlLCByZWplY3QsIHYuZG9uZSwgdi52YWx1ZSk7IH0pOyB9OyB9XHJcbiAgICBmdW5jdGlvbiBzZXR0bGUocmVzb2x2ZSwgcmVqZWN0LCBkLCB2KSB7IFByb21pc2UucmVzb2x2ZSh2KS50aGVuKGZ1bmN0aW9uKHYpIHsgcmVzb2x2ZSh7IHZhbHVlOiB2LCBkb25lOiBkIH0pOyB9LCByZWplY3QpOyB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX21ha2VUZW1wbGF0ZU9iamVjdChjb29rZWQsIHJhdykge1xyXG4gICAgaWYgKE9iamVjdC5kZWZpbmVQcm9wZXJ0eSkgeyBPYmplY3QuZGVmaW5lUHJvcGVydHkoY29va2VkLCBcInJhd1wiLCB7IHZhbHVlOiByYXcgfSk7IH0gZWxzZSB7IGNvb2tlZC5yYXcgPSByYXc7IH1cclxuICAgIHJldHVybiBjb29rZWQ7XHJcbn07XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19pbXBvcnRTdGFyKG1vZCkge1xyXG4gICAgaWYgKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgcmV0dXJuIG1vZDtcclxuICAgIHZhciByZXN1bHQgPSB7fTtcclxuICAgIGlmIChtb2QgIT0gbnVsbCkgZm9yICh2YXIgayBpbiBtb2QpIGlmIChPYmplY3QuaGFzT3duUHJvcGVydHkuY2FsbChtb2QsIGspKSByZXN1bHRba10gPSBtb2Rba107XHJcbiAgICByZXN1bHQuZGVmYXVsdCA9IG1vZDtcclxuICAgIHJldHVybiByZXN1bHQ7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2ltcG9ydERlZmF1bHQobW9kKSB7XHJcbiAgICByZXR1cm4gKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgPyBtb2QgOiB7IGRlZmF1bHQ6IG1vZCB9O1xyXG59XHJcbiIsImltcG9ydCB7SW5qZWN0YWJsZX0gZnJvbSAnQGFuZ3VsYXIvY29yZSdcclxuaW1wb3J0IHtTdWJqZWN0fSBmcm9tICdyeGpzJ1xyXG5pbXBvcnQge0dFU1JlZGlyZWN0T3B0aW9uc0ludGVyZmFjZX0gZnJvbSAnLi9nbG9iYWxFdmVudHMuaW50ZXJmYWNlcydcclxuXHJcbkBJbmplY3RhYmxlKClcclxuZXhwb3J0IGNsYXNzIEdsb2JhbEV2ZW50c1NlcnZpY2Uge1xyXG5cdHBhZ2VMb2FkZWRTb3VyY2UgPSBuZXcgU3ViamVjdDx7W3g6IHN0cmluZ106IGFueX0gfCB2b2lkPigpXHJcblx0dHJpZ2dlckluaXRpYWxEYXRhTG9hZFNvdXJjZSA9IG5ldyBTdWJqZWN0PHZvaWQ+KClcclxuXHRpbml0aWFsRGF0YUxvYWRlZFNvdXJjZSA9IG5ldyBTdWJqZWN0PGFueT4oKVxyXG5cdHNldExheW91dERhdGFTb3VyY2UgPSBuZXcgU3ViamVjdDx7W3g6IHN0cmluZ106IGFueX0+KClcclxuXHRyZWRpcmVjdFNvdXJjZSA9IG5ldyBTdWJqZWN0PHtyb3V0ZTogc3RyaW5nLCBvcHRpb25zOiBHRVNSZWRpcmVjdE9wdGlvbnNJbnRlcmZhY2V9PigpXHJcblx0bm90aWZ5U291cmNlID0gbmV3IFN1YmplY3Q8e3R5cGU6IHN0cmluZywgbWVzc2FnZTogc3RyaW5nfT4oKVxyXG5cdHRvZ2dsZUxvYWRlclNvdXJjZSA9IG5ldyBTdWJqZWN0PGJvb2xlYW4+KClcclxuXHJcblx0cGFnZUxvYWRlZCQgPSB0aGlzLnBhZ2VMb2FkZWRTb3VyY2UuYXNPYnNlcnZhYmxlKClcclxuXHR0cmlnZ2VySW5pdGlhbERhdGFMb2FkJCA9IHRoaXMudHJpZ2dlckluaXRpYWxEYXRhTG9hZFNvdXJjZS5hc09ic2VydmFibGUoKVxyXG5cdGluaXRpYWxEYXRhTG9hZGVkJCA9IHRoaXMuaW5pdGlhbERhdGFMb2FkZWRTb3VyY2UuYXNPYnNlcnZhYmxlKClcclxuXHRzZXRMYXlvdXREYXRhJCA9IHRoaXMuc2V0TGF5b3V0RGF0YVNvdXJjZS5hc09ic2VydmFibGUoKVxyXG5cdHJlZGlyZWN0JCA9IHRoaXMucmVkaXJlY3RTb3VyY2UuYXNPYnNlcnZhYmxlKClcclxuXHRub3RpZnkkID0gdGhpcy5ub3RpZnlTb3VyY2UuYXNPYnNlcnZhYmxlKClcclxuXHR0b2dnbGVMb2FkZXIkID0gdGhpcy50b2dnbGVMb2FkZXJTb3VyY2UuYXNPYnNlcnZhYmxlKClcclxuXHJcblx0cGFnZUxvYWRlZChkYXRhKTogdm9pZCB7XHJcblx0XHR0aGlzLnBhZ2VMb2FkZWRTb3VyY2UubmV4dChkYXRhKVxyXG5cdH1cclxuXHJcblx0dHJpZ2dlckluaXRpYWxEYXRhTG9hZCgpOiB2b2lkIHtcclxuXHRcdHRoaXMudHJpZ2dlckluaXRpYWxEYXRhTG9hZFNvdXJjZS5uZXh0KClcclxuXHR9XHJcblxyXG5cdGluaXRpYWxEYXRhTG9hZGVkKGRhdGEpOiB2b2lkIHtcclxuXHRcdHRoaXMuaW5pdGlhbERhdGFMb2FkZWRTb3VyY2UubmV4dChkYXRhKVxyXG5cdH1cclxuXHJcblx0c2V0TGF5b3V0RGF0YShkYXRhKTogdm9pZCB7XHJcblx0XHR0aGlzLnNldExheW91dERhdGFTb3VyY2UubmV4dChkYXRhKVxyXG5cdH1cclxuXHJcblx0cmVkaXJlY3Qocm91dGU6IHN0cmluZywgb3B0aW9ucz86IEdFU1JlZGlyZWN0T3B0aW9uc0ludGVyZmFjZSk6IHZvaWQge1xyXG5cdFx0dGhpcy5yZWRpcmVjdFNvdXJjZS5uZXh0KHtyb3V0ZSwgb3B0aW9uc30pXHJcblx0fVxyXG5cclxuXHRub3RpZnkodHlwZTogc3RyaW5nLCBtZXNzYWdlOiBzdHJpbmcpOiB2b2lkIHtcclxuXHRcdHRoaXMubm90aWZ5U291cmNlLm5leHQoe3R5cGUsIG1lc3NhZ2V9KVxyXG5cdH1cclxuXHJcblx0dG9nZ2xlTG9hZGVyKGFjdGl2ZTogYm9vbGVhbik6IHZvaWQge1xyXG5cdFx0dGhpcy50b2dnbGVMb2FkZXJTb3VyY2UubmV4dChhY3RpdmUpXHJcblx0fVxyXG59XHJcbiIsImltcG9ydCB7SW5qZWN0YWJsZX0gZnJvbSAnQGFuZ3VsYXIvY29yZSdcclxuaW1wb3J0IHtIdHRwQ2xpZW50LCBIdHRwUGFyYW1zLCBIdHRwUmVxdWVzdCwgSHR0cFJlc3BvbnNlfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCdcclxuXHJcblxyXG5ASW5qZWN0YWJsZSgpXHJcbmV4cG9ydCBjbGFzcyBSZXF1ZXN0U2VydmljZSB7XHJcblx0Y29uc3RydWN0b3IocHVibGljIGNsaWVudDogSHR0cENsaWVudCkge31cclxuXHJcblx0cnVuKG1ldGhvZDogc3RyaW5nLCB1cmw6IHN0cmluZywgb3B0aW9ucz86IHtbeDogc3RyaW5nXTogYW55fSkge1xyXG5cdFx0cmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuXHRcdFx0dHJ5IHtcclxuXHRcdFx0XHRsZXQgcnVuT3B0aW9ucyA9IHt9IGFzIGFueSxcclxuXHRcdFx0XHRcdHJlcXVlc3RPcHRpb25zID0ge30gYXMgYW55LFxyXG5cdFx0XHRcdFx0Ym9keSA9IG51bGxcclxuXHRcdFx0XHRpZiAob3B0aW9ucyAmJiAodHlwZW9mIG9wdGlvbnMgPT09ICdvYmplY3QnKSkge1xyXG5cdFx0XHRcdFx0bGV0IHtyZXNvbHZlV2l0aEZ1bGxSZXNwb25zZSwgLi4uIG90aGVyT3B0aW9uc30gPSBvcHRpb25zXHJcblx0XHRcdFx0XHRyZXF1ZXN0T3B0aW9ucyA9IG90aGVyT3B0aW9uc1xyXG5cdFx0XHRcdFx0cnVuT3B0aW9ucyA9IHtyZXNvbHZlV2l0aEZ1bGxSZXNwb25zZX1cclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0aWYgKG1ldGhvZC50b0xvd2VyQ2FzZSgpID09PSAnZ2V0Jykge1xyXG5cdFx0XHRcdFx0aWYgKCFyZXF1ZXN0T3B0aW9ucyB8fCAodHlwZW9mIHJlcXVlc3RPcHRpb25zICE9PSAnb2JqZWN0JykpIHtcclxuXHRcdFx0XHRcdFx0cmVxdWVzdE9wdGlvbnMgPSB7fVxyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0Y29uc3Qgb3B0aW9uc1BhcmFtcyA9IHJlcXVlc3RPcHRpb25zLnBhcmFtcyB8fCB7fVxyXG5cdFx0XHRcdFx0bGV0IGh0dHBQYXJhbXMgPSBuZXcgSHR0cFBhcmFtcygpXHJcblx0XHRcdFx0XHRmb3IgKGNvbnN0IGtleSBpbiBvcHRpb25zUGFyYW1zKSB7XHJcblx0XHRcdFx0XHRcdGNvbnN0IG9wdFBhcmFtID0gb3B0aW9uc1BhcmFtc1trZXldXHJcblx0XHRcdFx0XHRcdGlmICgodHlwZW9mIG9wdFBhcmFtID09PSAnb2JqZWN0JykgJiYgKG9wdFBhcmFtICE9PSBudWxsKSkge1xyXG5cdFx0XHRcdFx0XHRcdGlmIChvcHRQYXJhbSBpbnN0YW5jZW9mIEFycmF5KSB7XHJcblx0XHRcdFx0XHRcdFx0XHRvcHRQYXJhbS5mb3JFYWNoKChpdGVtKSA9PiB7XHJcblx0XHRcdFx0XHRcdFx0XHRcdGlmICgodHlwZW9mIGl0ZW0gPT09ICdvYmplY3QnKSAmJiAoaXRlbSAhPT0gbnVsbCkpIHtcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRmb3IgKGNvbnN0IGlubmVyS2V5IGluIGl0ZW0pIHtcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdGh0dHBQYXJhbXMgPSBodHRwUGFyYW1zLnNldChgJHtrZXl9WyR7aW5uZXJLZXl9XWAsIGl0ZW1baW5uZXJLZXldKVxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRyZXR1cm5cclxuXHRcdFx0XHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0XHRcdFx0XHRodHRwUGFyYW1zID0gaHR0cFBhcmFtcy5zZXQoYCR7a2V5fVtdYCwgaXRlbSlcclxuXHRcdFx0XHRcdFx0XHRcdH0pXHJcblx0XHRcdFx0XHRcdFx0XHRjb250aW51ZVxyXG5cdFx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdFx0XHRmb3IgKGNvbnN0IGlubmVyS2V5IGluIG9wdFBhcmFtKSB7XHJcblx0XHRcdFx0XHRcdFx0XHRodHRwUGFyYW1zID0gaHR0cFBhcmFtcy5zZXQoYCR7a2V5fVske2lubmVyS2V5fV1gLCBvcHRQYXJhbVtpbm5lcktleV0pXHJcblx0XHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0XHRcdGNvbnRpbnVlXHJcblx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdFx0aHR0cFBhcmFtcyA9IGh0dHBQYXJhbXMuc2V0KGtleSwgb3B0UGFyYW0pXHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRodHRwUGFyYW1zID0gaHR0cFBhcmFtcy5zZXQoJ18nLCAobmV3IERhdGUoKSkuZ2V0VGltZSgpLnRvU3RyaW5nKCkpXHJcblx0XHRcdFx0XHRyZXF1ZXN0T3B0aW9ucy5wYXJhbXMgPSBodHRwUGFyYW1zXHJcblx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdGlmICghcmVxdWVzdE9wdGlvbnMgfHwgKHR5cGVvZiByZXF1ZXN0T3B0aW9ucyAhPT0gJ29iamVjdCcpKSB7XHJcblx0XHRcdFx0XHRcdHJlcXVlc3RPcHRpb25zID0ge31cclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdGJvZHkgPSAoIXJlcXVlc3RPcHRpb25zLmJvZHkgfHwgKHR5cGVvZiByZXF1ZXN0T3B0aW9ucy5ib2R5ICE9PSAnb2JqZWN0JykpID8ge30gOiByZXF1ZXN0T3B0aW9ucy5ib2R5XHJcblx0XHRcdFx0XHRib2R5Ll8gPSAobmV3IERhdGUoKSkuZ2V0VGltZSgpXHJcblx0XHRcdFx0XHRkZWxldGUgcmVxdWVzdE9wdGlvbnMuYm9keVxyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHRpZiAoIXJlcXVlc3RPcHRpb25zLnJlc3BvbnNlVHlwZSkge31cclxuXHRcdFx0XHR0aGlzLmNsaWVudC5yZXF1ZXN0KG5ldyBIdHRwUmVxdWVzdChtZXRob2QsIHVybCwgYm9keSwgcmVxdWVzdE9wdGlvbnMpKS50b1Byb21pc2UoKS50aGVuKFxyXG5cdFx0XHRcdFx0KHJlc3BvbnNlOiBIdHRwUmVzcG9uc2U8YW55PikgPT4gcnVuT3B0aW9ucy5yZXNvbHZlV2l0aEZ1bGxSZXNwb25zZSA/IHJlc29sdmUocmVzcG9uc2UpIDogcmVzb2x2ZShyZXNwb25zZS5ib2R5KSxcclxuXHRcdFx0XHRcdChlcnJvcjogYW55KSA9PiByZWplY3QoZXJyb3IpXHJcblx0XHRcdFx0KVxyXG5cdFx0XHR9IGNhdGNoKGVycm9yKSB7XHJcblx0XHRcdFx0cmVqZWN0KGVycm9yKVxyXG5cdFx0XHR9XHJcblx0XHR9KVxyXG5cdH1cclxufVxyXG4iLCJpbXBvcnQgY28gZnJvbSAnY28nXHJcbmltcG9ydCB7SW5qZWN0YWJsZX0gZnJvbSAnQGFuZ3VsYXIvY29yZSdcclxuaW1wb3J0IHtIdHRwSGVhZGVyc30gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnXHJcblxyXG5pbXBvcnQge0dsb2JhbEV2ZW50c1NlcnZpY2V9IGZyb20gJy4vZ2xvYmFsRXZlbnRzL2dsb2JhbEV2ZW50cy5zZXJ2aWNlJ1xyXG5pbXBvcnQge1JlcXVlc3RTZXJ2aWNlfSBmcm9tICcuL3JlcXVlc3Quc2VydmljZSdcclxuXHJcbkBJbmplY3RhYmxlKClcclxuZXhwb3J0IGNsYXNzIEJhc2VSRVNUU2VydmljZSB7XHJcblx0aGVhZGVycyA9IG5ldyBIdHRwSGVhZGVycyh7J0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJ30pXHJcblx0YmFzZVVybCA9ICcvJ1xyXG5cclxuXHRjb25zdHJ1Y3RvcihcclxuXHRcdHB1YmxpYyBnbG9iYWxFdmVudHNTZXJ2aWNlOiBHbG9iYWxFdmVudHNTZXJ2aWNlLFxyXG5cdFx0cHVibGljIHJlcXVlc3RTZXJ2aWNlOiBSZXF1ZXN0U2VydmljZVxyXG5cdCkge31cclxuXHJcblx0aGFuZGxlRXJyb3IoZXJyKTogdm9pZCB7XHJcblx0XHR0aGlzLmdsb2JhbEV2ZW50c1NlcnZpY2Uubm90aWZ5KCdlcnJvcicsIGVyciAmJiBlcnIuZXJyb3IgJiYgZXJyLmVycm9yLmVycm9yIHx8ICdBbiBlcnJvciBoYXMgb2NjdXJyZWQuJylcclxuXHR9XHJcblxyXG5cdGNyZWF0ZShwYXJhbXMpOiBQcm9taXNlPGFueT4ge1xyXG5cdFx0Y29uc3QgaW5zdGFuY2UgPSB0aGlzXHJcblx0XHRyZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG5cdFx0XHRjbyhmdW5jdGlvbiooKSB7XHJcblx0XHRcdFx0eWllbGQgaW5zdGFuY2UucmVxdWVzdFNlcnZpY2UucnVuKCdwb3N0JywgYCR7aW5zdGFuY2UuYmFzZVVybH1gLCB7XHJcblx0XHRcdFx0XHRoZWFkZXJzOiBpbnN0YW5jZS5oZWFkZXJzLFxyXG5cdFx0XHRcdFx0Ym9keTogcGFyYW1zXHJcblx0XHRcdFx0fSlcclxuXHRcdFx0XHRyZXR1cm4ge3N1Y2Nlc3M6IHRydWV9XHJcblx0XHRcdH0pLnRoZW4oKHJlcykgPT4gcmVzb2x2ZShyZXMpLCAoZXJyKSA9PiB7XHJcblx0XHRcdFx0aW5zdGFuY2UuaGFuZGxlRXJyb3IoZXJyKVxyXG5cdFx0XHRcdHJlamVjdCh7ZXJyb3I6IHRydWV9KVxyXG5cdFx0XHR9KVxyXG5cdFx0fSlcclxuXHR9XHJcblxyXG5cdHJlYWQocGFyYW1zKTogUHJvbWlzZTxhbnk+IHtcclxuXHRcdGNvbnN0IGluc3RhbmNlID0gdGhpc1xyXG5cdFx0cmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuXHRcdFx0Y28oZnVuY3Rpb24qKCkge1xyXG5cdFx0XHRcdHJldHVybiB5aWVsZCBpbnN0YW5jZS5yZXF1ZXN0U2VydmljZS5ydW4oJ2dldCcsIGAke2luc3RhbmNlLmJhc2VVcmx9L2l0ZW1gLCB7XHJcblx0XHRcdFx0XHRoZWFkZXJzOiBpbnN0YW5jZS5oZWFkZXJzLFxyXG5cdFx0XHRcdFx0cGFyYW1zXHJcblx0XHRcdFx0fSlcclxuXHRcdFx0fSkudGhlbigocmVzKSA9PiByZXNvbHZlKHJlcyksIChlcnIpID0+IHtcclxuXHRcdFx0XHRpbnN0YW5jZS5oYW5kbGVFcnJvcihlcnIpXHJcblx0XHRcdFx0cmVqZWN0KHtlcnJvcjogdHJ1ZX0pXHJcblx0XHRcdH0pXHJcblx0XHR9KVxyXG5cdH1cclxuXHJcblx0cmVhZExpc3QocGFyYW1zKTogUHJvbWlzZTxhbnk+IHtcclxuXHRcdGNvbnN0IGluc3RhbmNlID0gdGhpc1xyXG5cdFx0cmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuXHRcdFx0Y28oZnVuY3Rpb24qKCkge1xyXG5cdFx0XHRcdHJldHVybiB5aWVsZCBpbnN0YW5jZS5yZXF1ZXN0U2VydmljZS5ydW4oJ2dldCcsIGAke2luc3RhbmNlLmJhc2VVcmx9YCwge1xyXG5cdFx0XHRcdFx0aGVhZGVyczogaW5zdGFuY2UuaGVhZGVycyxcclxuXHRcdFx0XHRcdHBhcmFtc1xyXG5cdFx0XHRcdH0pXHJcblx0XHRcdH0pLnRoZW4oKHJlcykgPT4gcmVzb2x2ZShyZXMpLCAoZXJyKSA9PiB7XHJcblx0XHRcdFx0aW5zdGFuY2UuaGFuZGxlRXJyb3IoZXJyKVxyXG5cdFx0XHRcdHJlamVjdCh7ZXJyb3I6IHRydWV9KVxyXG5cdFx0XHR9KVxyXG5cdFx0fSlcclxuXHR9XHJcblxyXG5cdHJlYWRTZWxlY3RMaXN0KHBhcmFtcyk6IFByb21pc2U8YW55PiB7XHJcblx0XHRjb25zdCBpbnN0YW5jZSA9IHRoaXNcclxuXHRcdHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcblx0XHRcdGNvKGZ1bmN0aW9uKigpIHtcclxuXHRcdFx0XHRyZXR1cm4geWllbGQgaW5zdGFuY2UucmVxdWVzdFNlcnZpY2UucnVuKCdnZXQnLCBgJHtpbnN0YW5jZS5iYXNlVXJsfS9zZWxlY3RMaXN0YCwge1xyXG5cdFx0XHRcdFx0aGVhZGVyczogaW5zdGFuY2UuaGVhZGVycyxcclxuXHRcdFx0XHRcdHBhcmFtc1xyXG5cdFx0XHRcdH0pXHJcblx0XHRcdH0pLnRoZW4oKHJlcykgPT4gcmVzb2x2ZShyZXMpLCAoZXJyKSA9PiB7XHJcblx0XHRcdFx0aW5zdGFuY2UuaGFuZGxlRXJyb3IoZXJyKVxyXG5cdFx0XHRcdHJlamVjdCh7ZXJyb3I6IHRydWV9KVxyXG5cdFx0XHR9KVxyXG5cdFx0fSlcclxuXHR9XHJcblxyXG5cdHVwZGF0ZShwYXJhbXMpOiBQcm9taXNlPGFueT4ge1xyXG5cdFx0Y29uc3QgaW5zdGFuY2UgPSB0aGlzXHJcblx0XHRyZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG5cdFx0XHRjbyhmdW5jdGlvbiooKSB7XHJcblx0XHRcdFx0cmV0dXJuIHlpZWxkIGluc3RhbmNlLnJlcXVlc3RTZXJ2aWNlLnJ1bigncGF0Y2gnLCBgJHtpbnN0YW5jZS5iYXNlVXJsfS9pdGVtLyR7cGFyYW1zLmlkfWAsIHtcclxuXHRcdFx0XHRcdGhlYWRlcnM6IGluc3RhbmNlLmhlYWRlcnMsXHJcblx0XHRcdFx0XHRib2R5OiBwYXJhbXNcclxuXHRcdFx0XHR9KVxyXG5cdFx0XHR9KS50aGVuKChyZXMpID0+IHJlc29sdmUocmVzKSwgKGVycikgPT4ge1xyXG5cdFx0XHRcdGluc3RhbmNlLmhhbmRsZUVycm9yKGVycilcclxuXHRcdFx0XHRyZWplY3Qoe2Vycm9yOiB0cnVlfSlcclxuXHRcdFx0fSlcclxuXHRcdH0pXHJcblx0fVxyXG5cclxuXHRidWxrVXBzZXJ0KHBhcmFtcyk6IFByb21pc2U8YW55PiB7XHJcblx0XHRjb25zdCBpbnN0YW5jZSA9IHRoaXNcclxuXHRcdHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcblx0XHRcdGNvKGZ1bmN0aW9uKigpIHtcclxuXHRcdFx0XHRyZXR1cm4geWllbGQgaW5zdGFuY2UucmVxdWVzdFNlcnZpY2UucnVuKCdwdXQnLCBgJHtpbnN0YW5jZS5iYXNlVXJsfWAsIHtcclxuXHRcdFx0XHRcdGhlYWRlcnM6IGluc3RhbmNlLmhlYWRlcnMsXHJcblx0XHRcdFx0XHRib2R5OiBwYXJhbXNcclxuXHRcdFx0XHR9KVxyXG5cdFx0XHR9KS50aGVuKChyZXMpID0+IHJlc29sdmUocmVzKSwgKGVycikgPT4ge1xyXG5cdFx0XHRcdGluc3RhbmNlLmhhbmRsZUVycm9yKGVycilcclxuXHRcdFx0XHRyZWplY3Qoe2Vycm9yOiB0cnVlfSlcclxuXHRcdFx0fSlcclxuXHRcdH0pXHJcblx0fVxyXG5cclxuXHRkZWxldGUocGFyYW1zKTogUHJvbWlzZTxhbnk+IHtcclxuXHRcdGNvbnN0IGluc3RhbmNlID0gdGhpc1xyXG5cdFx0cmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuXHRcdFx0Y28oZnVuY3Rpb24qKCkge1xyXG5cdFx0XHRcdHJldHVybiB5aWVsZCBpbnN0YW5jZS5yZXF1ZXN0U2VydmljZS5ydW4oJ2RlbGV0ZScsIGAke2luc3RhbmNlLmJhc2VVcmx9LyR7cGFyYW1zLmlkfWAsIHtcclxuXHRcdFx0XHRcdGhlYWRlcnM6IGluc3RhbmNlLmhlYWRlcnMsXHJcblx0XHRcdFx0XHRib2R5OiBwYXJhbXNcclxuXHRcdFx0XHR9KVxyXG5cdFx0XHR9KS50aGVuKChyZXMpID0+IHJlc29sdmUocmVzKSwgKGVycikgPT4ge1xyXG5cdFx0XHRcdGluc3RhbmNlLmhhbmRsZUVycm9yKGVycilcclxuXHRcdFx0XHRyZWplY3Qoe2Vycm9yOiB0cnVlfSlcclxuXHRcdFx0fSlcclxuXHRcdH0pXHJcblx0fVxyXG59XHJcbiIsImltcG9ydCBjbyBmcm9tICdjbydcclxuaW1wb3J0IHtJbmplY3RhYmxlfSBmcm9tICdAYW5ndWxhci9jb3JlJ1xyXG5pbXBvcnQge0h0dHBIZWFkZXJzfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCdcclxuXHJcbmltcG9ydCB7R2xvYmFsRXZlbnRzU2VydmljZX0gZnJvbSAnLi9nbG9iYWxFdmVudHMvZ2xvYmFsRXZlbnRzLnNlcnZpY2UnXHJcbmltcG9ydCB7UmVxdWVzdFNlcnZpY2V9IGZyb20gJy4vcmVxdWVzdC5zZXJ2aWNlJ1xyXG5cclxuQEluamVjdGFibGUoKVxyXG5leHBvcnQgY2xhc3MgRmlsZXNSRVNUU2VydmljZSB7XHJcblx0Ly8geydDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbid9XHJcblx0aGVhZGVycyA9IG5ldyBIdHRwSGVhZGVycygpXHJcblx0YmFzZVVybCA9ICcvZmlsZXMnXHJcblxyXG5cdGNvbnN0cnVjdG9yKFxyXG5cdFx0cHVibGljIGdsb2JhbEV2ZW50c1NlcnZpY2U6IEdsb2JhbEV2ZW50c1NlcnZpY2UsXHJcblx0XHRwdWJsaWMgcmVxdWVzdFNlcnZpY2U6IFJlcXVlc3RTZXJ2aWNlXHJcblx0KSB7fVxyXG5cclxuXHRoYW5kbGVFcnJvcihlcnIpOiB2b2lkIHtcclxuXHRcdHRoaXMuZ2xvYmFsRXZlbnRzU2VydmljZS5ub3RpZnkoJ2Vycm9yJywgZXJyICYmIGVyci5lcnJvciAmJiBlcnIuZXJyb3IuZXJyb3IgfHwgJ0FuIGVycm9yIGhhcyBvY2N1cnJlZC4nKVxyXG5cdH1cclxuXHJcblx0dXBsb2FkKGZpbGU6IEZpbGUsIHBhcmFtczoge291dHB1dEZpbGVOYW1lOiBzdHJpbmcsIFt4OiBzdHJpbmddOiBhbnl9LCBvcHRpb25zPzoge2hhbmRsZUVycm9yPzogYm9vbGVhbn0pOiBQcm9taXNlPGFueT4ge1xyXG5cdFx0Y29uc3QgaW5zdGFuY2UgPSB0aGlzXHJcblx0XHRyZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG5cdFx0XHRjbyhmdW5jdGlvbiooKSB7XHJcblx0XHRcdFx0bGV0IGZkID0gbmV3IEZvcm1EYXRhKClcclxuXHRcdFx0XHRmZC5hcHBlbmQoJ2ZpbGUnLCBmaWxlLCBmaWxlLm5hbWUpXHJcblx0XHRcdFx0Zm9yIChjb25zdCBrZXkgaW4gcGFyYW1zKSB7XHJcblx0XHRcdFx0XHRmZC5hcHBlbmQoa2V5LCBwYXJhbXNba2V5XSlcclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0aW5zdGFuY2UuaGVhZGVycy5zZXQoJ0NvbnRlbnQtVHlwZScsICdtdWx0aXBhcnQvZm9ybS1kYXRhJylcclxuXHRcdFx0XHR5aWVsZCBpbnN0YW5jZS5yZXF1ZXN0U2VydmljZS5ydW4oJ3Bvc3QnLCBgJHtpbnN0YW5jZS5iYXNlVXJsfWAsIHtcclxuXHRcdFx0XHRcdGhlYWRlcnM6IGluc3RhbmNlLmhlYWRlcnMsXHJcblx0XHRcdFx0XHRib2R5OiBmZFxyXG5cdFx0XHRcdH0pXHJcblx0XHRcdFx0cmV0dXJuIHtzdWNjZXNzOiB0cnVlfVxyXG5cdFx0XHR9KS50aGVuKChyZXMpID0+IHJlc29sdmUocmVzKSwgKGVycikgPT4ge1xyXG5cdFx0XHRcdGlmIChvcHRpb25zICYmIG9wdGlvbnMuaGFuZGxlRXJyb3IpIHtcclxuXHRcdFx0XHRcdGluc3RhbmNlLmhhbmRsZUVycm9yKGVycilcclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0cmVqZWN0KHtlcnJvcjogZXJyIHx8IHRydWV9KVxyXG5cdFx0XHR9KVxyXG5cdFx0fSlcclxuXHR9XHJcblxyXG5cdHJlYWQocGFyYW1zKTogUHJvbWlzZTxhbnk+IHtcclxuXHRcdGNvbnN0IGluc3RhbmNlID0gdGhpc1xyXG5cdFx0cmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuXHRcdFx0Y28oZnVuY3Rpb24qKCkge1xyXG5cdFx0XHRcdHJldHVybiB5aWVsZCBpbnN0YW5jZS5yZXF1ZXN0U2VydmljZS5ydW4oJ2dldCcsIGAke2luc3RhbmNlLmJhc2VVcmx9L2l0ZW1gLCB7XHJcblx0XHRcdFx0XHRoZWFkZXJzOiBpbnN0YW5jZS5oZWFkZXJzLFxyXG5cdFx0XHRcdFx0cGFyYW1zXHJcblx0XHRcdFx0fSlcclxuXHRcdFx0fSkudGhlbigocmVzKSA9PiByZXNvbHZlKHJlcyksIChlcnIpID0+IHtcclxuXHRcdFx0XHRpbnN0YW5jZS5oYW5kbGVFcnJvcihlcnIpXHJcblx0XHRcdFx0cmVqZWN0KHtlcnJvcjogdHJ1ZX0pXHJcblx0XHRcdH0pXHJcblx0XHR9KVxyXG5cdH1cclxufVxyXG4iLCJleHBvcnQgY29uc3QgZ2V0TmVzdGVkID0gKHBhcmVudDogYW55LCBmaWVsZDogc3RyaW5nKTogdm9pZCA9PiB7XHJcblx0aWYgKCh0eXBlb2YgcGFyZW50ICE9PSAnb2JqZWN0JykgfHwgKHR5cGVvZiBmaWVsZCAhPT0gJ3N0cmluZycpKSB7XHJcblx0XHRcdHJldHVybiBudWxsXHJcblx0XHR9XHJcblx0bGV0IGZpZWxkRGF0YSA9IGZpZWxkLnNwbGl0KCcuJyksXHJcblx0XHRjdXJyZW50RWxlbWVudCA9IHBhcmVudFxyXG5cdGZvciAobGV0IGkgaW4gZmllbGREYXRhKSB7XHJcblx0XHRsZXQgaW5uZXJFbGVtZW50ID0gZmllbGREYXRhW2ldXHJcblx0XHRpZiAoY3VycmVudEVsZW1lbnQgPT09IG51bGwpIHtcclxuXHRcdFx0cmV0dXJuIGN1cnJlbnRFbGVtZW50XHJcblx0XHR9XHJcblx0XHRpZiAoKHR5cGVvZiBjdXJyZW50RWxlbWVudCA9PT0gJ3VuZGVmaW5lZCcpIHx8ICh0eXBlb2YgY3VycmVudEVsZW1lbnRbaW5uZXJFbGVtZW50XSA9PT0gJ3VuZGVmaW5lZCcpKSB7XHJcblx0XHRcdHJldHVybiBjdXJyZW50RWxlbWVudFxyXG5cdFx0fVxyXG5cdFx0Y3VycmVudEVsZW1lbnQgPSBjdXJyZW50RWxlbWVudFtpbm5lckVsZW1lbnRdXHJcblx0fVxyXG5cdHJldHVybiBjdXJyZW50RWxlbWVudFxyXG59XHJcblxyXG5leHBvcnQgY29uc3Qgc2V0TmVzdGVkID0gKHBhcmVudDogYW55LCBmaWVsZDogc3RyaW5nLCB2YWx1ZTogYW55KTogYm9vbGVhbiA9PiB7XHJcblx0Y29uc3QgZmllbGROYW1lcyA9IGZpZWxkLnNwbGl0KCcuJylcclxuXHRpZiAoIWZpZWxkTmFtZXMubGVuZ3RoKSB7XHJcblx0XHRyZXR1cm4gZmFsc2VcclxuXHR9XHJcblx0bGV0IGN1cnJlbnRQYXJlbnQgPSBwYXJlbnQsXHJcblx0XHRsb29wRW5kID0gZmllbGROYW1lcy5sZW5ndGggLSAxXHJcblx0Zm9yIChsZXQgaSA9IDA7IGkgPCBsb29wRW5kOyBpKyspIHtcclxuXHRcdGNvbnN0IGZpZWxkTmFtZSA9IGZpZWxkTmFtZXNbaV1cclxuXHRcdGlmICh0eXBlb2YgY3VycmVudFBhcmVudFtmaWVsZE5hbWVdID09PSAndW5kZWZpbmVkJykge1xyXG5cdFx0XHRyZXR1cm4gZmFsc2VcclxuXHRcdH1cclxuXHRcdGN1cnJlbnRQYXJlbnQgPSBjdXJyZW50UGFyZW50W2ZpZWxkTmFtZV1cclxuXHR9XHJcblx0Y3VycmVudFBhcmVudFtmaWVsZE5hbWVzW2xvb3BFbmRdXSA9IHZhbHVlXHJcblx0cmV0dXJuIHRydWVcclxufVxyXG4iLCIndXNlIHN0cmljdCdcclxuXHJcbi8vIGFuZ3VsYXIgZGVwZW5kZW5jaWVzXHJcbmltcG9ydCB7Q29tbW9uTW9kdWxlfSBmcm9tICdAYW5ndWxhci9jb21tb24nXHJcbmltcG9ydCB7TmdNb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnXHJcblxyXG5cclxuQE5nTW9kdWxlKHtcclxuXHRpbXBvcnRzOiBbXHJcblx0XHRDb21tb25Nb2R1bGVcclxuXHRdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBSYW1zdGVyVUlDb3JlTW9kdWxlIHt9XHJcblxyXG5leHBvcnQgKiBmcm9tICcuL2NvbXBvbmVudHMvYmFzZS1sYXlvdXQuY29tcG9uZW50J1xyXG5leHBvcnQgKiBmcm9tICcuL2NvbXBvbmVudHMvYmFzZS1wYWdlLmNvbXBvbmVudCdcclxuZXhwb3J0ICogZnJvbSAnLi9zZXJ2aWNlcy9iYXNlUkVTVC5zZXJ2aWNlJ1xyXG5leHBvcnQgKiBmcm9tICcuL3NlcnZpY2VzL2ZpbGVzUkVTVC5zZXJ2aWNlJ1xyXG5leHBvcnQgKiBmcm9tICcuL3V0aWxzL3Rvb2xiZWx0J1xyXG5leHBvcnQgKiBmcm9tICcuL3NlcnZpY2VzL2dsb2JhbEV2ZW50cy9nbG9iYWxFdmVudHMuc2VydmljZSdcclxuZXhwb3J0ICogZnJvbSAnLi9zZXJ2aWNlcy9nbG9iYWxFdmVudHMvZ2xvYmFsRXZlbnRzLmludGVyZmFjZXMnXHJcbmV4cG9ydCAqIGZyb20gJy4vc2VydmljZXMvcmVxdWVzdC5zZXJ2aWNlJ1xyXG5leHBvcnQgKiBmcm9tICcuL2ludGVyZmFjZXMvc2VsZWN0TGlzdC5pbnRlcmZhY2UnXHJcbiJdLCJuYW1lcyI6WyJTdWJqZWN0IiwidGFrZVVudGlsIiwiSW5qZWN0YWJsZSIsIkh0dHBQYXJhbXMiLCJIdHRwUmVxdWVzdCIsIkh0dHBDbGllbnQiLCJIdHRwSGVhZGVycyIsIk5nTW9kdWxlIiwiQ29tbW9uTW9kdWxlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFPQTtRQU1DLDZCQUNRLG1CQUF3QyxFQUN4QyxNQUFjO1lBRGQsd0JBQW1CLEdBQW5CLG1CQUFtQixDQUFxQjtZQUN4QyxXQUFNLEdBQU4sTUFBTSxDQUFRO1lBUHRCLHNCQUFpQixHQUFZLEtBQUssQ0FBQTtZQUNsQyxpQkFBWSxHQUFZLEtBQUssQ0FBQTtZQUM3QixnQkFBVyxHQUEwQixFQUFFLENBQUE7WUFDdkMsZ0JBQVcsR0FBMEIsRUFBRSxDQUFBO1NBTXRDOzs7O1FBRUQsc0NBQVE7OztZQUFSO2dCQUFBLGlCQU1DO2dCQUxBLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxXQUFXLENBQUMsU0FBUyxDQUFDLFVBQUMsSUFBeUIsSUFBSyxPQUFBLEtBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLEdBQUEsQ0FBQyxDQUFBO2dCQUNwRyxJQUFJLENBQUMsbUJBQW1CLENBQUMsdUJBQXVCLENBQUMsU0FBUyxDQUFDLGNBQU0sT0FBQSxLQUFJLENBQUMsZUFBZSxFQUFFLEdBQUEsQ0FBQyxDQUFBO2dCQUN4RixJQUFJLENBQUMsbUJBQW1CLENBQUMsY0FBYyxDQUFDLFNBQVMsQ0FBQyxVQUFDLElBQUksSUFBSyxPQUFBLEtBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLEdBQUEsQ0FBQyxDQUFBO2dCQUNyRixJQUFJLENBQUMsbUJBQW1CLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxVQUFDLEVBQWdCO3dCQUFmLGdCQUFLLEVBQUUsb0JBQU87b0JBQU0sT0FBQSxLQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssRUFBRSxPQUFPLENBQUM7aUJBQUEsQ0FBQyxDQUFBO2dCQUNqRyxJQUFJLENBQUMsbUJBQW1CLENBQUMsYUFBYSxDQUFDLFNBQVMsQ0FBQyxVQUFDLE1BQU0sSUFBSyxPQUFBLEtBQUksQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDLEdBQUEsQ0FBQyxDQUFBO2FBQ3ZGOzs7O1FBRUQsd0RBQTBCOzs7WUFBMUI7Z0JBQ0MsSUFBSSxDQUFDLG1CQUFtQixDQUFDLGlCQUFpQixDQUFDLEVBQUMsV0FBVyxFQUFFLElBQUksQ0FBQyxXQUFXLEVBQUUsV0FBVyxFQUFFLElBQUksQ0FBQyxXQUFXLEVBQUMsQ0FBQyxDQUFBO2FBQzFHOzs7Ozs7O1FBS0Qsd0NBQVU7Ozs7OztZQUFWLFVBQVcsSUFBeUI7Z0JBQ25DLElBQUksSUFBSSxFQUFFO29CQUNULEtBQUssSUFBTSxHQUFHLElBQUksSUFBSSxFQUFFO3dCQUN2QixJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFBO3FCQUNyQjtpQkFDRDtnQkFDRCxJQUFJLElBQUksQ0FBQyxpQkFBaUIsRUFBRTtvQkFDM0IsSUFBSSxDQUFDLDBCQUEwQixFQUFFLENBQUE7b0JBQ2pDLE9BQU07aUJBQ047Z0JBQ0QsSUFBSSxDQUFDLGVBQWUsRUFBRSxDQUFBO2FBQ3RCOzs7O1FBRUQsNkNBQWU7OztZQUFmO2dCQUNDLElBQUksQ0FBQywwQkFBMEIsRUFBRSxDQUFBO2FBQ2pDOzs7OztRQUVELDJDQUFhOzs7O1lBQWIsVUFBYyxJQUF3QjtnQkFDckMsS0FBSyxJQUFNLEdBQUcsSUFBSSxJQUFJLEVBQUU7b0JBQ3ZCLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUE7aUJBQ3JCO2FBQ0Q7Ozs7OztRQUVELHNDQUFROzs7OztZQUFSLFVBQVMsS0FBYSxFQUFFLE9BQW9DOztvQkFDckQsYUFBYSxHQUFHLE9BQU8sSUFBSSxFQUFFO2dCQUNqQyxJQUFBLHVDQUFXLEVBQUUsbURBQWlCO2dCQUNoQyxJQUFJLGlCQUFpQixFQUFFO29CQUN0QixJQUFJLENBQUMsaUJBQWlCLEdBQUcsS0FBSyxDQUFBO2lCQUM5QjtnQkFDRCxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDLEtBQUssQ0FBQyxFQUFFLEVBQUMsV0FBVyxFQUFFLFdBQVcsSUFBSSxFQUFFLEVBQUMsQ0FBQyxDQUFBO2FBQy9EOzs7OztRQUVELDBDQUFZOzs7O1lBQVosVUFBYSxNQUFlO2dCQUMzQixJQUFJLENBQUMsWUFBWSxHQUFHLE1BQU0sQ0FBQTthQUMxQjtRQUNGLDBCQUFDO0lBQUQsQ0FBQzs7Ozs7O0FDckVEO1FBZUMsMkJBQ1EsY0FBOEIsRUFDOUIsbUJBQXdDLEVBQ3hDLGlCQUEyQixFQUMzQiw4QkFBd0M7WUFIeEMsbUJBQWMsR0FBZCxjQUFjLENBQWdCO1lBQzlCLHdCQUFtQixHQUFuQixtQkFBbUIsQ0FBcUI7WUFDeEMsc0JBQWlCLEdBQWpCLGlCQUFpQixDQUFVO1lBQzNCLG1DQUE4QixHQUE5Qiw4QkFBOEIsQ0FBVTtZQVRoRCxjQUFTLEdBQWtCLElBQUlBLFlBQU8sRUFBRSxDQUFBO1NBV3ZDOzs7O1FBRUQsb0NBQVE7OztZQUFSO2dCQUFBLGlCQU9DO2dCQU5BLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLENBQUNDLG1CQUFTLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLFVBQUMsSUFBSSxJQUFLLE9BQUEsS0FBSSxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxHQUFBLENBQUMsQ0FBQTtnQkFDN0gsSUFBSSxDQUFDLGlCQUFpQixDQUFDLE9BQU8sQ0FBQyxVQUFDLFVBQVU7b0JBQ3pDLElBQUksT0FBTyxLQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssVUFBVSxFQUFFO3dCQUMzQyxLQUFJLENBQUMsVUFBVSxDQUFDLEVBQUUsQ0FBQTtxQkFDbEI7aUJBQ0QsQ0FBQyxDQUFBO2FBQ0Y7Ozs7UUFFRCxpQ0FBSzs7O1lBQUw7Z0JBQ0MsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUE7Z0JBQzNELElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFBO2dCQUN0RCxJQUFJLENBQUMsbUJBQW1CLENBQUMsVUFBVSxDQUFDLEVBQUMsV0FBVyxFQUFFLElBQUksQ0FBQyxXQUFXLEVBQUUsV0FBVyxFQUFFLElBQUksQ0FBQyxXQUFXLEVBQUMsQ0FBQyxDQUFBO2FBQ25HOzs7OztRQUVELDZDQUFpQjs7OztZQUFqQixVQUFrQixJQUFJO2dCQUF0QixpQkFTQztnQkFSQSxJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUE7Z0JBQzdCLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQTtnQkFDbkMsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFBO2dCQUNuQyxJQUFJLENBQUMsOEJBQThCLENBQUMsT0FBTyxDQUFDLFVBQUMsVUFBVTtvQkFDdEQsSUFBSSxPQUFPLEtBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxVQUFVLEVBQUU7d0JBQzNDLEtBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQTtxQkFDdEI7aUJBQ0QsQ0FBQyxDQUFBO2FBQ0Y7Ozs7UUFFRCxzQ0FBVTs7O1lBQVY7Z0JBQ0MsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLEVBQUUsQ0FBQTtnQkFDckIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLEVBQUUsQ0FBQTthQUN6Qjs7OztRQUVELHVDQUFXOzs7WUFBWDtnQkFDQyxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUE7YUFDakI7UUFDRix3QkFBQztJQUFELENBQUM7O0lDekREOzs7Ozs7Ozs7Ozs7OztBQWNBLGFBMEJnQixNQUFNLENBQUMsQ0FBQyxFQUFFLENBQUM7UUFDdkIsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDO1FBQ1gsS0FBSyxJQUFJLENBQUMsSUFBSSxDQUFDO1lBQUUsSUFBSSxNQUFNLENBQUMsU0FBUyxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQztnQkFDL0UsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNoQixJQUFJLENBQUMsSUFBSSxJQUFJLElBQUksT0FBTyxNQUFNLENBQUMscUJBQXFCLEtBQUssVUFBVTtZQUMvRCxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsTUFBTSxDQUFDLHFCQUFxQixDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRTtnQkFBRSxJQUFJLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQztvQkFDM0YsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUMxQixPQUFPLENBQUMsQ0FBQztJQUNiLENBQUM7QUFFRCxhQXdCZ0IsV0FBVyxDQUFDLE9BQU8sRUFBRSxJQUFJO1FBQ3JDLElBQUksQ0FBQyxHQUFHLEVBQUUsS0FBSyxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsY0FBYSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDO2dCQUFFLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLElBQUksRUFBRSxFQUFFLEVBQUUsR0FBRyxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUNqSCxPQUFPLENBQUMsR0FBRyxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsT0FBTyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxRQUFRLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsT0FBTyxNQUFNLEtBQUssVUFBVSxLQUFLLENBQUMsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLEdBQUcsY0FBYSxPQUFPLElBQUksQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDekosU0FBUyxJQUFJLENBQUMsQ0FBQyxJQUFJLE9BQU8sVUFBVSxDQUFDLElBQUksT0FBTyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRTtRQUNsRSxTQUFTLElBQUksQ0FBQyxFQUFFO1lBQ1osSUFBSSxDQUFDO2dCQUFFLE1BQU0sSUFBSSxTQUFTLENBQUMsaUNBQWlDLENBQUMsQ0FBQztZQUM5RCxPQUFPLENBQUM7Z0JBQUUsSUFBSTtvQkFDVixJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxRQUFRLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUk7d0JBQUUsT0FBTyxDQUFDLENBQUM7b0JBQzdKLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDO3dCQUFFLEVBQUUsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDO29CQUN4QyxRQUFRLEVBQUUsQ0FBQyxDQUFDLENBQUM7d0JBQ1QsS0FBSyxDQUFDLENBQUM7d0JBQUMsS0FBSyxDQUFDOzRCQUFFLENBQUMsR0FBRyxFQUFFLENBQUM7NEJBQUMsTUFBTTt3QkFDOUIsS0FBSyxDQUFDOzRCQUFFLENBQUMsQ0FBQyxLQUFLLEVBQUUsQ0FBQzs0QkFBQyxPQUFPLEVBQUUsS0FBSyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLENBQUM7d0JBQ3hELEtBQUssQ0FBQzs0QkFBRSxDQUFDLENBQUMsS0FBSyxFQUFFLENBQUM7NEJBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQzs0QkFBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQzs0QkFBQyxTQUFTO3dCQUNqRCxLQUFLLENBQUM7NEJBQUUsRUFBRSxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLENBQUM7NEJBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQzs0QkFBQyxTQUFTO3dCQUNqRDs0QkFDSSxJQUFJLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUU7Z0NBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQztnQ0FBQyxTQUFTOzZCQUFFOzRCQUM1RyxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRTtnQ0FBRSxDQUFDLENBQUMsS0FBSyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQ0FBQyxNQUFNOzZCQUFFOzRCQUN0RixJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUU7Z0NBQUUsQ0FBQyxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0NBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQztnQ0FB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