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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmFtc3Rlci11aS1jb3JlLnVtZC5qcy5tYXAiLCJzb3VyY2VzIjpbIm5nOi8vcmFtc3Rlci11aS1jb3JlL2NvbXBvbmVudHMvYmFzZS1sYXlvdXQuY29tcG9uZW50LnRzIiwibmc6Ly9yYW1zdGVyLXVpLWNvcmUvY29tcG9uZW50cy9iYXNlLXBhZ2UuY29tcG9uZW50LnRzIiwibm9kZV9tb2R1bGVzL3RzbGliL3RzbGliLmVzNi5qcyIsIm5nOi8vcmFtc3Rlci11aS1jb3JlL3NlcnZpY2VzL2dsb2JhbEV2ZW50cy9nbG9iYWxFdmVudHMuc2VydmljZS50cyIsIm5nOi8vcmFtc3Rlci11aS1jb3JlL3NlcnZpY2VzL3JlcXVlc3Quc2VydmljZS50cyIsIm5nOi8vcmFtc3Rlci11aS1jb3JlL3NlcnZpY2VzL2Jhc2VSRVNULnNlcnZpY2UudHMiLCJuZzovL3JhbXN0ZXItdWktY29yZS9zZXJ2aWNlcy9maWxlc1JFU1Quc2VydmljZS50cyIsIm5nOi8vcmFtc3Rlci11aS1jb3JlL3V0aWxzL3Rvb2xiZWx0LnRzIiwibmc6Ly9yYW1zdGVyLXVpLWNvcmUvaW5kZXgudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtPbkluaXR9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnXHJcbmltcG9ydCB7Um91dGVyfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInXHJcblxyXG5pbXBvcnQge0dsb2JhbEV2ZW50c1NlcnZpY2V9IGZyb20gJy4uL3NlcnZpY2VzL2dsb2JhbEV2ZW50cy9nbG9iYWxFdmVudHMuc2VydmljZSdcclxuaW1wb3J0IHtHRVNSZWRpcmVjdE9wdGlvbnNJbnRlcmZhY2V9IGZyb20gJy4uL3NlcnZpY2VzL2dsb2JhbEV2ZW50cy9nbG9iYWxFdmVudHMuaW50ZXJmYWNlcydcclxuXHJcblxyXG5leHBvcnQgY2xhc3MgQmFzZUxheW91dENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XHJcblx0aW5pdGlhbERhdGFMb2FkZWQ6IGJvb2xlYW4gPSBmYWxzZVxyXG5cdGxvYWRlckFjdGl2ZTogYm9vbGVhbiA9IGZhbHNlXHJcblx0cXVlcnlQYXJhbXM6IHtbeDogc3RyaW5nXTogc3RyaW5nfSA9IHt9XHJcblx0cm91dGVQYXJhbXM6IHtbeDogc3RyaW5nXTogc3RyaW5nfSA9IHt9XHJcblxyXG5cdGNvbnN0cnVjdG9yKFxyXG5cdFx0cHVibGljIGdsb2JhbEV2ZW50c1NlcnZpY2U6IEdsb2JhbEV2ZW50c1NlcnZpY2UsXHJcblx0XHRwdWJsaWMgcm91dGVyOiBSb3V0ZXJcclxuXHQpIHtcclxuXHR9XHJcblxyXG5cdG5nT25Jbml0KCk6IHZvaWQge1xyXG5cdFx0dGhpcy5nbG9iYWxFdmVudHNTZXJ2aWNlLnBhZ2VMb2FkZWQkLnN1YnNjcmliZSgoZGF0YT86IHtbeDogc3RyaW5nXTogYW55fSkgPT4gdGhpcy5wYWdlTG9hZGVkKGRhdGEpKVxyXG5cdFx0dGhpcy5nbG9iYWxFdmVudHNTZXJ2aWNlLnRyaWdnZXJJbml0aWFsRGF0YUxvYWQkLnN1YnNjcmliZSgoKSA9PiB0aGlzLmxvYWRJbml0aWFsRGF0YSgpKVxyXG5cdFx0dGhpcy5nbG9iYWxFdmVudHNTZXJ2aWNlLnNldExheW91dERhdGEkLnN1YnNjcmliZSgoZGF0YSkgPT4gdGhpcy5zZXRMYXlvdXREYXRhKGRhdGEpKVxyXG5cdFx0dGhpcy5nbG9iYWxFdmVudHNTZXJ2aWNlLnJlZGlyZWN0JC5zdWJzY3JpYmUoKHtyb3V0ZSwgb3B0aW9uc30pID0+IHRoaXMucmVkaXJlY3Qocm91dGUsIG9wdGlvbnMpKVxyXG5cdFx0dGhpcy5nbG9iYWxFdmVudHNTZXJ2aWNlLnRvZ2dsZUxvYWRlciQuc3Vic2NyaWJlKChhY3RpdmUpID0+IHRoaXMudG9nZ2xlTG9hZGVyKGFjdGl2ZSkpXHJcblx0fVxyXG5cclxuXHRzZW5kSW5pdGlhbERhdGFMb2FkZWRFdmVudCgpIHtcclxuXHRcdHRoaXMuZ2xvYmFsRXZlbnRzU2VydmljZS5pbml0aWFsRGF0YUxvYWRlZCh7cXVlcnlQYXJhbXM6IHRoaXMucXVlcnlQYXJhbXMsIHJvdXRlUGFyYW1zOiB0aGlzLnJvdXRlUGFyYW1zfSlcclxuXHR9XHJcblxyXG5cclxuXHQvLyBnbG9iYWxFdmVudHNTZXJ2aWNlIGhhbmRsZXJzXHJcblxyXG5cdHBhZ2VMb2FkZWQoZGF0YT86IHtbeDogc3RyaW5nXTogYW55fSk6IHZvaWQge1xyXG5cdFx0aWYgKGRhdGEpIHtcclxuXHRcdFx0Zm9yIChjb25zdCBrZXkgaW4gZGF0YSkge1xyXG5cdFx0XHRcdHRoaXNba2V5XSA9IGRhdGFba2V5XVxyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0XHRpZiAodGhpcy5pbml0aWFsRGF0YUxvYWRlZCkge1xyXG5cdFx0XHR0aGlzLnNlbmRJbml0aWFsRGF0YUxvYWRlZEV2ZW50KClcclxuXHRcdFx0cmV0dXJuXHJcblx0XHR9XHJcblx0XHR0aGlzLmxvYWRJbml0aWFsRGF0YSgpXHJcblx0fVxyXG5cclxuXHRsb2FkSW5pdGlhbERhdGEoKTogdm9pZCB7XHJcblx0XHR0aGlzLnNlbmRJbml0aWFsRGF0YUxvYWRlZEV2ZW50KClcclxuXHR9XHJcblxyXG5cdHNldExheW91dERhdGEoYXJnczoge1t4OiBzdHJpbmddOiBhbnl9KSB7XHJcblx0XHRmb3IgKGNvbnN0IGtleSBpbiBhcmdzKSB7XHJcblx0XHRcdHRoaXNba2V5XSA9IGFyZ3Nba2V5XVxyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0cmVkaXJlY3Qocm91dGU6IHN0cmluZywgb3B0aW9uczogR0VTUmVkaXJlY3RPcHRpb25zSW50ZXJmYWNlKTogdm9pZCB7XHJcblx0XHRjb25zdCBhY3R1YWxPcHRpb25zID0gb3B0aW9ucyB8fCB7fSxcclxuXHRcdFx0e3F1ZXJ5UGFyYW1zLCByZWxvYWRJbml0aWFsRGF0YX0gPSBhY3R1YWxPcHRpb25zXHJcblx0XHRpZiAocmVsb2FkSW5pdGlhbERhdGEpIHtcclxuXHRcdFx0dGhpcy5pbml0aWFsRGF0YUxvYWRlZCA9IGZhbHNlXHJcblx0XHR9XHJcblx0XHR0aGlzLnJvdXRlci5uYXZpZ2F0ZShbcm91dGVdLCB7cXVlcnlQYXJhbXM6IHF1ZXJ5UGFyYW1zIHx8IHt9fSlcclxuXHR9XHJcblxyXG5cdHRvZ2dsZUxvYWRlcihhY3RpdmU6IGJvb2xlYW4pOiB2b2lkIHtcclxuXHRcdHRoaXMubG9hZGVyQWN0aXZlID0gYWN0aXZlXHJcblx0fVxyXG59XHJcbiIsIid1c2Ugc3RyaWN0J1xyXG5cclxuaW1wb3J0IHtBY3RpdmF0ZWRSb3V0ZX0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJ1xyXG5pbXBvcnQge09uRGVzdHJveSwgT25Jbml0fSBmcm9tICdAYW5ndWxhci9jb3JlJ1xyXG5pbXBvcnQge1N1YmplY3R9IGZyb20gJ3J4anMnXHJcbmltcG9ydCB7dGFrZVVudGlsfSBmcm9tICdyeGpzL29wZXJhdG9ycydcclxuXHJcbmltcG9ydCB7R2xvYmFsRXZlbnRzU2VydmljZX0gZnJvbSAnLi4vc2VydmljZXMvZ2xvYmFsRXZlbnRzL2dsb2JhbEV2ZW50cy5zZXJ2aWNlJ1xyXG5cclxuZXhwb3J0IGNsYXNzIEJhc2VQYWdlQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3kge1xyXG5cdGRlc3Ryb3llZDogU3ViamVjdDx2b2lkPiA9IG5ldyBTdWJqZWN0KClcclxuXHRsb2dnZWRJblVzZXI/OiBhbnlcclxuXHRxdWVyeVBhcmFtczoge1t4OiBzdHJpbmddOiBzdHJpbmd9XHJcblx0cm91dGVQYXJhbXM6IHtbeDogc3RyaW5nXTogc3RyaW5nfVxyXG5cclxuXHRjb25zdHJ1Y3RvcihcclxuXHRcdHB1YmxpYyBhY3RpdmF0ZWRSb3V0ZTogQWN0aXZhdGVkUm91dGUsXHJcblx0XHRwdWJsaWMgZ2xvYmFsRXZlbnRzU2VydmljZTogR2xvYmFsRXZlbnRzU2VydmljZSxcclxuXHRcdHB1YmxpYyBvbkluaXRNZXRob2ROYW1lczogc3RyaW5nW10sXHJcblx0XHRwdWJsaWMgb25Jbml0aWFsRGF0YUxvYWRlZE1ldGhvZE5hbWVzOiBzdHJpbmdbXVxyXG5cdCkge1xyXG5cdH1cclxuXHJcblx0bmdPbkluaXQoKSB7XHJcblx0XHR0aGlzLmdsb2JhbEV2ZW50c1NlcnZpY2UuaW5pdGlhbERhdGFMb2FkZWQkLnBpcGUodGFrZVVudGlsKHRoaXMuZGVzdHJveWVkKSkuc3Vic2NyaWJlKChkYXRhKSA9PiB0aGlzLmluaXRpYWxEYXRhTG9hZGVkKGRhdGEpKVxyXG5cdFx0dGhpcy5vbkluaXRNZXRob2ROYW1lcy5mb3JFYWNoKChtZXRob2ROYW1lKSA9PiB7XHJcblx0XHRcdGlmICh0eXBlb2YgdGhpc1ttZXRob2ROYW1lXSA9PT0gJ2Z1bmN0aW9uJykge1xyXG5cdFx0XHRcdHRoaXNbbWV0aG9kTmFtZV0oKVxyXG5cdFx0XHR9XHJcblx0XHR9KVxyXG5cdH1cclxuXHJcblx0cmVzZXQoKTogdm9pZCB7XHJcblx0XHR0aGlzLnF1ZXJ5UGFyYW1zID0gdGhpcy5hY3RpdmF0ZWRSb3V0ZS5zbmFwc2hvdC5xdWVyeVBhcmFtc1xyXG5cdFx0dGhpcy5yb3V0ZVBhcmFtcyA9IHRoaXMuYWN0aXZhdGVkUm91dGUuc25hcHNob3QucGFyYW1zXHJcblx0XHR0aGlzLmdsb2JhbEV2ZW50c1NlcnZpY2UucGFnZUxvYWRlZCh7cXVlcnlQYXJhbXM6IHRoaXMucXVlcnlQYXJhbXMsIHJvdXRlUGFyYW1zOiB0aGlzLnJvdXRlUGFyYW1zfSlcclxuXHR9XHJcblxyXG5cdGluaXRpYWxEYXRhTG9hZGVkKGRhdGEpOiB2b2lkIHtcclxuXHRcdHRoaXMubG9nZ2VkSW5Vc2VyID0gZGF0YS51c2VyXHJcblx0XHR0aGlzLnF1ZXJ5UGFyYW1zID0gZGF0YS5xdWVyeVBhcmFtc1xyXG5cdFx0dGhpcy5yb3V0ZVBhcmFtcyA9IGRhdGEucm91dGVQYXJhbXNcclxuXHRcdHRoaXMub25Jbml0aWFsRGF0YUxvYWRlZE1ldGhvZE5hbWVzLmZvckVhY2goKG1ldGhvZE5hbWUpID0+IHtcclxuXHRcdFx0aWYgKHR5cGVvZiB0aGlzW21ldGhvZE5hbWVdID09PSAnZnVuY3Rpb24nKSB7XHJcblx0XHRcdFx0dGhpc1ttZXRob2ROYW1lXShkYXRhKVxyXG5cdFx0XHR9XHJcblx0XHR9KVxyXG5cdH1cclxuXHJcblx0ZGVzdHJ1Y3RvcigpIHtcclxuXHRcdHRoaXMuZGVzdHJveWVkLm5leHQoKVxyXG5cdFx0dGhpcy5kZXN0cm95ZWQuY29tcGxldGUoKVxyXG5cdH1cclxuXHJcblx0bmdPbkRlc3Ryb3koKSB7XHJcblx0XHR0aGlzLmRlc3RydWN0b3IoKVxyXG5cdH1cclxufVxyXG4iLCIvKiEgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuQ29weXJpZ2h0IChjKSBNaWNyb3NvZnQgQ29ycG9yYXRpb24uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXHJcbkxpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7IHlvdSBtYXkgbm90IHVzZVxyXG50aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS4gWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZVxyXG5MaWNlbnNlIGF0IGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxyXG5cclxuVEhJUyBDT0RFIElTIFBST1ZJREVEIE9OIEFOICpBUyBJUyogQkFTSVMsIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWVxyXG5LSU5ELCBFSVRIRVIgRVhQUkVTUyBPUiBJTVBMSUVELCBJTkNMVURJTkcgV0lUSE9VVCBMSU1JVEFUSU9OIEFOWSBJTVBMSUVEXHJcbldBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBUSVRMRSwgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UsXHJcbk1FUkNIQU5UQUJMSVRZIE9SIE5PTi1JTkZSSU5HRU1FTlQuXHJcblxyXG5TZWUgdGhlIEFwYWNoZSBWZXJzaW9uIDIuMCBMaWNlbnNlIGZvciBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnNcclxuYW5kIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxyXG4qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiAqL1xyXG4vKiBnbG9iYWwgUmVmbGVjdCwgUHJvbWlzZSAqL1xyXG5cclxudmFyIGV4dGVuZFN0YXRpY3MgPSBmdW5jdGlvbihkLCBiKSB7XHJcbiAgICBleHRlbmRTdGF0aWNzID0gT2JqZWN0LnNldFByb3RvdHlwZU9mIHx8XHJcbiAgICAgICAgKHsgX19wcm90b19fOiBbXSB9IGluc3RhbmNlb2YgQXJyYXkgJiYgZnVuY3Rpb24gKGQsIGIpIHsgZC5fX3Byb3RvX18gPSBiOyB9KSB8fFxyXG4gICAgICAgIGZ1bmN0aW9uIChkLCBiKSB7IGZvciAodmFyIHAgaW4gYikgaWYgKGIuaGFzT3duUHJvcGVydHkocCkpIGRbcF0gPSBiW3BdOyB9O1xyXG4gICAgcmV0dXJuIGV4dGVuZFN0YXRpY3MoZCwgYik7XHJcbn07XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19leHRlbmRzKGQsIGIpIHtcclxuICAgIGV4dGVuZFN0YXRpY3MoZCwgYik7XHJcbiAgICBmdW5jdGlvbiBfXygpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGQ7IH1cclxuICAgIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcclxufVxyXG5cclxuZXhwb3J0IHZhciBfX2Fzc2lnbiA9IGZ1bmN0aW9uKCkge1xyXG4gICAgX19hc3NpZ24gPSBPYmplY3QuYXNzaWduIHx8IGZ1bmN0aW9uIF9fYXNzaWduKHQpIHtcclxuICAgICAgICBmb3IgKHZhciBzLCBpID0gMSwgbiA9IGFyZ3VtZW50cy5sZW5ndGg7IGkgPCBuOyBpKyspIHtcclxuICAgICAgICAgICAgcyA9IGFyZ3VtZW50c1tpXTtcclxuICAgICAgICAgICAgZm9yICh2YXIgcCBpbiBzKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHMsIHApKSB0W3BdID0gc1twXTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHQ7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gX19hc3NpZ24uYXBwbHkodGhpcywgYXJndW1lbnRzKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fcmVzdChzLCBlKSB7XHJcbiAgICB2YXIgdCA9IHt9O1xyXG4gICAgZm9yICh2YXIgcCBpbiBzKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHMsIHApICYmIGUuaW5kZXhPZihwKSA8IDApXHJcbiAgICAgICAgdFtwXSA9IHNbcF07XHJcbiAgICBpZiAocyAhPSBudWxsICYmIHR5cGVvZiBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzID09PSBcImZ1bmN0aW9uXCIpXHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDAsIHAgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzKHMpOyBpIDwgcC5sZW5ndGg7IGkrKykgaWYgKGUuaW5kZXhPZihwW2ldKSA8IDApXHJcbiAgICAgICAgICAgIHRbcFtpXV0gPSBzW3BbaV1dO1xyXG4gICAgcmV0dXJuIHQ7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2RlY29yYXRlKGRlY29yYXRvcnMsIHRhcmdldCwga2V5LCBkZXNjKSB7XHJcbiAgICB2YXIgYyA9IGFyZ3VtZW50cy5sZW5ndGgsIHIgPSBjIDwgMyA/IHRhcmdldCA6IGRlc2MgPT09IG51bGwgPyBkZXNjID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcih0YXJnZXQsIGtleSkgOiBkZXNjLCBkO1xyXG4gICAgaWYgKHR5cGVvZiBSZWZsZWN0ID09PSBcIm9iamVjdFwiICYmIHR5cGVvZiBSZWZsZWN0LmRlY29yYXRlID09PSBcImZ1bmN0aW9uXCIpIHIgPSBSZWZsZWN0LmRlY29yYXRlKGRlY29yYXRvcnMsIHRhcmdldCwga2V5LCBkZXNjKTtcclxuICAgIGVsc2UgZm9yICh2YXIgaSA9IGRlY29yYXRvcnMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIGlmIChkID0gZGVjb3JhdG9yc1tpXSkgciA9IChjIDwgMyA/IGQocikgOiBjID4gMyA/IGQodGFyZ2V0LCBrZXksIHIpIDogZCh0YXJnZXQsIGtleSkpIHx8IHI7XHJcbiAgICByZXR1cm4gYyA+IDMgJiYgciAmJiBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBrZXksIHIpLCByO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19wYXJhbShwYXJhbUluZGV4LCBkZWNvcmF0b3IpIHtcclxuICAgIHJldHVybiBmdW5jdGlvbiAodGFyZ2V0LCBrZXkpIHsgZGVjb3JhdG9yKHRhcmdldCwga2V5LCBwYXJhbUluZGV4KTsgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19tZXRhZGF0YShtZXRhZGF0YUtleSwgbWV0YWRhdGFWYWx1ZSkge1xyXG4gICAgaWYgKHR5cGVvZiBSZWZsZWN0ID09PSBcIm9iamVjdFwiICYmIHR5cGVvZiBSZWZsZWN0Lm1ldGFkYXRhID09PSBcImZ1bmN0aW9uXCIpIHJldHVybiBSZWZsZWN0Lm1ldGFkYXRhKG1ldGFkYXRhS2V5LCBtZXRhZGF0YVZhbHVlKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXdhaXRlcih0aGlzQXJnLCBfYXJndW1lbnRzLCBQLCBnZW5lcmF0b3IpIHtcclxuICAgIHJldHVybiBuZXcgKFAgfHwgKFAgPSBQcm9taXNlKSkoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xyXG4gICAgICAgIGZ1bmN0aW9uIGZ1bGZpbGxlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvci5uZXh0KHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cclxuICAgICAgICBmdW5jdGlvbiByZWplY3RlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvcltcInRocm93XCJdKHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cclxuICAgICAgICBmdW5jdGlvbiBzdGVwKHJlc3VsdCkgeyByZXN1bHQuZG9uZSA/IHJlc29sdmUocmVzdWx0LnZhbHVlKSA6IG5ldyBQKGZ1bmN0aW9uIChyZXNvbHZlKSB7IHJlc29sdmUocmVzdWx0LnZhbHVlKTsgfSkudGhlbihmdWxmaWxsZWQsIHJlamVjdGVkKTsgfVxyXG4gICAgICAgIHN0ZXAoKGdlbmVyYXRvciA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSkubmV4dCgpKTtcclxuICAgIH0pO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19nZW5lcmF0b3IodGhpc0FyZywgYm9keSkge1xyXG4gICAgdmFyIF8gPSB7IGxhYmVsOiAwLCBzZW50OiBmdW5jdGlvbigpIHsgaWYgKHRbMF0gJiAxKSB0aHJvdyB0WzFdOyByZXR1cm4gdFsxXTsgfSwgdHJ5czogW10sIG9wczogW10gfSwgZiwgeSwgdCwgZztcclxuICAgIHJldHVybiBnID0geyBuZXh0OiB2ZXJiKDApLCBcInRocm93XCI6IHZlcmIoMSksIFwicmV0dXJuXCI6IHZlcmIoMikgfSwgdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIChnW1N5bWJvbC5pdGVyYXRvcl0gPSBmdW5jdGlvbigpIHsgcmV0dXJuIHRoaXM7IH0pLCBnO1xyXG4gICAgZnVuY3Rpb24gdmVyYihuKSB7IHJldHVybiBmdW5jdGlvbiAodikgeyByZXR1cm4gc3RlcChbbiwgdl0pOyB9OyB9XHJcbiAgICBmdW5jdGlvbiBzdGVwKG9wKSB7XHJcbiAgICAgICAgaWYgKGYpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJHZW5lcmF0b3IgaXMgYWxyZWFkeSBleGVjdXRpbmcuXCIpO1xyXG4gICAgICAgIHdoaWxlIChfKSB0cnkge1xyXG4gICAgICAgICAgICBpZiAoZiA9IDEsIHkgJiYgKHQgPSBvcFswXSAmIDIgPyB5W1wicmV0dXJuXCJdIDogb3BbMF0gPyB5W1widGhyb3dcIl0gfHwgKCh0ID0geVtcInJldHVyblwiXSkgJiYgdC5jYWxsKHkpLCAwKSA6IHkubmV4dCkgJiYgISh0ID0gdC5jYWxsKHksIG9wWzFdKSkuZG9uZSkgcmV0dXJuIHQ7XHJcbiAgICAgICAgICAgIGlmICh5ID0gMCwgdCkgb3AgPSBbb3BbMF0gJiAyLCB0LnZhbHVlXTtcclxuICAgICAgICAgICAgc3dpdGNoIChvcFswXSkge1xyXG4gICAgICAgICAgICAgICAgY2FzZSAwOiBjYXNlIDE6IHQgPSBvcDsgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDQ6IF8ubGFiZWwrKzsgcmV0dXJuIHsgdmFsdWU6IG9wWzFdLCBkb25lOiBmYWxzZSB9O1xyXG4gICAgICAgICAgICAgICAgY2FzZSA1OiBfLmxhYmVsKys7IHkgPSBvcFsxXTsgb3AgPSBbMF07IGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgY2FzZSA3OiBvcCA9IF8ub3BzLnBvcCgpOyBfLnRyeXMucG9wKCk7IGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgICAgICBpZiAoISh0ID0gXy50cnlzLCB0ID0gdC5sZW5ndGggPiAwICYmIHRbdC5sZW5ndGggLSAxXSkgJiYgKG9wWzBdID09PSA2IHx8IG9wWzBdID09PSAyKSkgeyBfID0gMDsgY29udGludWU7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAob3BbMF0gPT09IDMgJiYgKCF0IHx8IChvcFsxXSA+IHRbMF0gJiYgb3BbMV0gPCB0WzNdKSkpIHsgXy5sYWJlbCA9IG9wWzFdOyBicmVhazsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChvcFswXSA9PT0gNiAmJiBfLmxhYmVsIDwgdFsxXSkgeyBfLmxhYmVsID0gdFsxXTsgdCA9IG9wOyBicmVhazsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0ICYmIF8ubGFiZWwgPCB0WzJdKSB7IF8ubGFiZWwgPSB0WzJdOyBfLm9wcy5wdXNoKG9wKTsgYnJlYWs7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAodFsyXSkgXy5vcHMucG9wKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgXy50cnlzLnBvcCgpOyBjb250aW51ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBvcCA9IGJvZHkuY2FsbCh0aGlzQXJnLCBfKTtcclxuICAgICAgICB9IGNhdGNoIChlKSB7IG9wID0gWzYsIGVdOyB5ID0gMDsgfSBmaW5hbGx5IHsgZiA9IHQgPSAwOyB9XHJcbiAgICAgICAgaWYgKG9wWzBdICYgNSkgdGhyb3cgb3BbMV07IHJldHVybiB7IHZhbHVlOiBvcFswXSA/IG9wWzFdIDogdm9pZCAwLCBkb25lOiB0cnVlIH07XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2V4cG9ydFN0YXIobSwgZXhwb3J0cykge1xyXG4gICAgZm9yICh2YXIgcCBpbiBtKSBpZiAoIWV4cG9ydHMuaGFzT3duUHJvcGVydHkocCkpIGV4cG9ydHNbcF0gPSBtW3BdO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX192YWx1ZXMobykge1xyXG4gICAgdmFyIG0gPSB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgb1tTeW1ib2wuaXRlcmF0b3JdLCBpID0gMDtcclxuICAgIGlmIChtKSByZXR1cm4gbS5jYWxsKG8pO1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICBuZXh0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGlmIChvICYmIGkgPj0gby5sZW5ndGgpIG8gPSB2b2lkIDA7XHJcbiAgICAgICAgICAgIHJldHVybiB7IHZhbHVlOiBvICYmIG9baSsrXSwgZG9uZTogIW8gfTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19yZWFkKG8sIG4pIHtcclxuICAgIHZhciBtID0gdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIG9bU3ltYm9sLml0ZXJhdG9yXTtcclxuICAgIGlmICghbSkgcmV0dXJuIG87XHJcbiAgICB2YXIgaSA9IG0uY2FsbChvKSwgciwgYXIgPSBbXSwgZTtcclxuICAgIHRyeSB7XHJcbiAgICAgICAgd2hpbGUgKChuID09PSB2b2lkIDAgfHwgbi0tID4gMCkgJiYgIShyID0gaS5uZXh0KCkpLmRvbmUpIGFyLnB1c2goci52YWx1ZSk7XHJcbiAgICB9XHJcbiAgICBjYXRjaCAoZXJyb3IpIHsgZSA9IHsgZXJyb3I6IGVycm9yIH07IH1cclxuICAgIGZpbmFsbHkge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIGlmIChyICYmICFyLmRvbmUgJiYgKG0gPSBpW1wicmV0dXJuXCJdKSkgbS5jYWxsKGkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBmaW5hbGx5IHsgaWYgKGUpIHRocm93IGUuZXJyb3I7IH1cclxuICAgIH1cclxuICAgIHJldHVybiBhcjtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fc3ByZWFkKCkge1xyXG4gICAgZm9yICh2YXIgYXIgPSBbXSwgaSA9IDA7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspXHJcbiAgICAgICAgYXIgPSBhci5jb25jYXQoX19yZWFkKGFyZ3VtZW50c1tpXSkpO1xyXG4gICAgcmV0dXJuIGFyO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hd2FpdCh2KSB7XHJcbiAgICByZXR1cm4gdGhpcyBpbnN0YW5jZW9mIF9fYXdhaXQgPyAodGhpcy52ID0gdiwgdGhpcykgOiBuZXcgX19hd2FpdCh2KTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXN5bmNHZW5lcmF0b3IodGhpc0FyZywgX2FyZ3VtZW50cywgZ2VuZXJhdG9yKSB7XHJcbiAgICBpZiAoIVN5bWJvbC5hc3luY0l0ZXJhdG9yKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiU3ltYm9sLmFzeW5jSXRlcmF0b3IgaXMgbm90IGRlZmluZWQuXCIpO1xyXG4gICAgdmFyIGcgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSksIGksIHEgPSBbXTtcclxuICAgIHJldHVybiBpID0ge30sIHZlcmIoXCJuZXh0XCIpLCB2ZXJiKFwidGhyb3dcIiksIHZlcmIoXCJyZXR1cm5cIiksIGlbU3ltYm9sLmFzeW5jSXRlcmF0b3JdID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfSwgaTtcclxuICAgIGZ1bmN0aW9uIHZlcmIobikgeyBpZiAoZ1tuXSkgaVtuXSA9IGZ1bmN0aW9uICh2KSB7IHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAoYSwgYikgeyBxLnB1c2goW24sIHYsIGEsIGJdKSA+IDEgfHwgcmVzdW1lKG4sIHYpOyB9KTsgfTsgfVxyXG4gICAgZnVuY3Rpb24gcmVzdW1lKG4sIHYpIHsgdHJ5IHsgc3RlcChnW25dKHYpKTsgfSBjYXRjaCAoZSkgeyBzZXR0bGUocVswXVszXSwgZSk7IH0gfVxyXG4gICAgZnVuY3Rpb24gc3RlcChyKSB7IHIudmFsdWUgaW5zdGFuY2VvZiBfX2F3YWl0ID8gUHJvbWlzZS5yZXNvbHZlKHIudmFsdWUudikudGhlbihmdWxmaWxsLCByZWplY3QpIDogc2V0dGxlKHFbMF1bMl0sIHIpOyB9XHJcbiAgICBmdW5jdGlvbiBmdWxmaWxsKHZhbHVlKSB7IHJlc3VtZShcIm5leHRcIiwgdmFsdWUpOyB9XHJcbiAgICBmdW5jdGlvbiByZWplY3QodmFsdWUpIHsgcmVzdW1lKFwidGhyb3dcIiwgdmFsdWUpOyB9XHJcbiAgICBmdW5jdGlvbiBzZXR0bGUoZiwgdikgeyBpZiAoZih2KSwgcS5zaGlmdCgpLCBxLmxlbmd0aCkgcmVzdW1lKHFbMF1bMF0sIHFbMF1bMV0pOyB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2FzeW5jRGVsZWdhdG9yKG8pIHtcclxuICAgIHZhciBpLCBwO1xyXG4gICAgcmV0dXJuIGkgPSB7fSwgdmVyYihcIm5leHRcIiksIHZlcmIoXCJ0aHJvd1wiLCBmdW5jdGlvbiAoZSkgeyB0aHJvdyBlOyB9KSwgdmVyYihcInJldHVyblwiKSwgaVtTeW1ib2wuaXRlcmF0b3JdID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfSwgaTtcclxuICAgIGZ1bmN0aW9uIHZlcmIobiwgZikgeyBpW25dID0gb1tuXSA/IGZ1bmN0aW9uICh2KSB7IHJldHVybiAocCA9ICFwKSA/IHsgdmFsdWU6IF9fYXdhaXQob1tuXSh2KSksIGRvbmU6IG4gPT09IFwicmV0dXJuXCIgfSA6IGYgPyBmKHYpIDogdjsgfSA6IGY7IH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXN5bmNWYWx1ZXMobykge1xyXG4gICAgaWYgKCFTeW1ib2wuYXN5bmNJdGVyYXRvcikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlN5bWJvbC5hc3luY0l0ZXJhdG9yIGlzIG5vdCBkZWZpbmVkLlwiKTtcclxuICAgIHZhciBtID0gb1tTeW1ib2wuYXN5bmNJdGVyYXRvcl0sIGk7XHJcbiAgICByZXR1cm4gbSA/IG0uY2FsbChvKSA6IChvID0gdHlwZW9mIF9fdmFsdWVzID09PSBcImZ1bmN0aW9uXCIgPyBfX3ZhbHVlcyhvKSA6IG9bU3ltYm9sLml0ZXJhdG9yXSgpLCBpID0ge30sIHZlcmIoXCJuZXh0XCIpLCB2ZXJiKFwidGhyb3dcIiksIHZlcmIoXCJyZXR1cm5cIiksIGlbU3ltYm9sLmFzeW5jSXRlcmF0b3JdID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfSwgaSk7XHJcbiAgICBmdW5jdGlvbiB2ZXJiKG4pIHsgaVtuXSA9IG9bbl0gJiYgZnVuY3Rpb24gKHYpIHsgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHsgdiA9IG9bbl0odiksIHNldHRsZShyZXNvbHZlLCByZWplY3QsIHYuZG9uZSwgdi52YWx1ZSk7IH0pOyB9OyB9XHJcbiAgICBmdW5jdGlvbiBzZXR0bGUocmVzb2x2ZSwgcmVqZWN0LCBkLCB2KSB7IFByb21pc2UucmVzb2x2ZSh2KS50aGVuKGZ1bmN0aW9uKHYpIHsgcmVzb2x2ZSh7IHZhbHVlOiB2LCBkb25lOiBkIH0pOyB9LCByZWplY3QpOyB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX21ha2VUZW1wbGF0ZU9iamVjdChjb29rZWQsIHJhdykge1xyXG4gICAgaWYgKE9iamVjdC5kZWZpbmVQcm9wZXJ0eSkgeyBPYmplY3QuZGVmaW5lUHJvcGVydHkoY29va2VkLCBcInJhd1wiLCB7IHZhbHVlOiByYXcgfSk7IH0gZWxzZSB7IGNvb2tlZC5yYXcgPSByYXc7IH1cclxuICAgIHJldHVybiBjb29rZWQ7XHJcbn07XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19pbXBvcnRTdGFyKG1vZCkge1xyXG4gICAgaWYgKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgcmV0dXJuIG1vZDtcclxuICAgIHZhciByZXN1bHQgPSB7fTtcclxuICAgIGlmIChtb2QgIT0gbnVsbCkgZm9yICh2YXIgayBpbiBtb2QpIGlmIChPYmplY3QuaGFzT3duUHJvcGVydHkuY2FsbChtb2QsIGspKSByZXN1bHRba10gPSBtb2Rba107XHJcbiAgICByZXN1bHQuZGVmYXVsdCA9IG1vZDtcclxuICAgIHJldHVybiByZXN1bHQ7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2ltcG9ydERlZmF1bHQobW9kKSB7XHJcbiAgICByZXR1cm4gKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgPyBtb2QgOiB7IGRlZmF1bHQ6IG1vZCB9O1xyXG59XHJcbiIsImltcG9ydCB7SW5qZWN0YWJsZX0gZnJvbSAnQGFuZ3VsYXIvY29yZSdcclxuaW1wb3J0IHtTdWJqZWN0fSBmcm9tICdyeGpzJ1xyXG5pbXBvcnQge0dFU1JlZGlyZWN0T3B0aW9uc0ludGVyZmFjZX0gZnJvbSAnLi9nbG9iYWxFdmVudHMuaW50ZXJmYWNlcydcclxuXHJcbkBJbmplY3RhYmxlKClcclxuZXhwb3J0IGNsYXNzIEdsb2JhbEV2ZW50c1NlcnZpY2Uge1xyXG5cdHBhZ2VMb2FkZWRTb3VyY2UgPSBuZXcgU3ViamVjdDx7W3g6IHN0cmluZ106IGFueX0gfCB2b2lkPigpXHJcblx0dHJpZ2dlckluaXRpYWxEYXRhTG9hZFNvdXJjZSA9IG5ldyBTdWJqZWN0PHZvaWQ+KClcclxuXHRpbml0aWFsRGF0YUxvYWRlZFNvdXJjZSA9IG5ldyBTdWJqZWN0PGFueT4oKVxyXG5cdHNldExheW91dERhdGFTb3VyY2UgPSBuZXcgU3ViamVjdDx7W3g6IHN0cmluZ106IGFueX0+KClcclxuXHRyZWRpcmVjdFNvdXJjZSA9IG5ldyBTdWJqZWN0PHtyb3V0ZTogc3RyaW5nLCBvcHRpb25zOiBHRVNSZWRpcmVjdE9wdGlvbnNJbnRlcmZhY2V9PigpXHJcblx0bm90aWZ5U291cmNlID0gbmV3IFN1YmplY3Q8e3R5cGU6IHN0cmluZywgbWVzc2FnZTogc3RyaW5nfT4oKVxyXG5cdHRvZ2dsZUxvYWRlclNvdXJjZSA9IG5ldyBTdWJqZWN0PGJvb2xlYW4+KClcclxuXHJcblx0cGFnZUxvYWRlZCQgPSB0aGlzLnBhZ2VMb2FkZWRTb3VyY2UuYXNPYnNlcnZhYmxlKClcclxuXHR0cmlnZ2VySW5pdGlhbERhdGFMb2FkJCA9IHRoaXMudHJpZ2dlckluaXRpYWxEYXRhTG9hZFNvdXJjZS5hc09ic2VydmFibGUoKVxyXG5cdGluaXRpYWxEYXRhTG9hZGVkJCA9IHRoaXMuaW5pdGlhbERhdGFMb2FkZWRTb3VyY2UuYXNPYnNlcnZhYmxlKClcclxuXHRzZXRMYXlvdXREYXRhJCA9IHRoaXMuc2V0TGF5b3V0RGF0YVNvdXJjZS5hc09ic2VydmFibGUoKVxyXG5cdHJlZGlyZWN0JCA9IHRoaXMucmVkaXJlY3RTb3VyY2UuYXNPYnNlcnZhYmxlKClcclxuXHRub3RpZnkkID0gdGhpcy5ub3RpZnlTb3VyY2UuYXNPYnNlcnZhYmxlKClcclxuXHR0b2dnbGVMb2FkZXIkID0gdGhpcy50b2dnbGVMb2FkZXJTb3VyY2UuYXNPYnNlcnZhYmxlKClcclxuXHJcblx0cGFnZUxvYWRlZChkYXRhKTogdm9pZCB7XHJcblx0XHR0aGlzLnBhZ2VMb2FkZWRTb3VyY2UubmV4dChkYXRhKVxyXG5cdH1cclxuXHJcblx0dHJpZ2dlckluaXRpYWxEYXRhTG9hZChkYXRhKTogdm9pZCB7XHJcblx0XHR0aGlzLnRyaWdnZXJJbml0aWFsRGF0YUxvYWRTb3VyY2UubmV4dChkYXRhKVxyXG5cdH1cclxuXHJcblx0aW5pdGlhbERhdGFMb2FkZWQoZGF0YSk6IHZvaWQge1xyXG5cdFx0dGhpcy5pbml0aWFsRGF0YUxvYWRlZFNvdXJjZS5uZXh0KGRhdGEpXHJcblx0fVxyXG5cclxuXHRzZXRMYXlvdXREYXRhKGRhdGEpOiB2b2lkIHtcclxuXHRcdHRoaXMuc2V0TGF5b3V0RGF0YVNvdXJjZS5uZXh0KGRhdGEpXHJcblx0fVxyXG5cclxuXHRyZWRpcmVjdChyb3V0ZTogc3RyaW5nLCBvcHRpb25zPzogR0VTUmVkaXJlY3RPcHRpb25zSW50ZXJmYWNlKTogdm9pZCB7XHJcblx0XHR0aGlzLnJlZGlyZWN0U291cmNlLm5leHQoe3JvdXRlLCBvcHRpb25zfSlcclxuXHR9XHJcblxyXG5cdG5vdGlmeSh0eXBlOiBzdHJpbmcsIG1lc3NhZ2U6IHN0cmluZyk6IHZvaWQge1xyXG5cdFx0dGhpcy5ub3RpZnlTb3VyY2UubmV4dCh7dHlwZSwgbWVzc2FnZX0pXHJcblx0fVxyXG5cclxuXHR0b2dnbGVMb2FkZXIoYWN0aXZlOiBib29sZWFuKTogdm9pZCB7XHJcblx0XHR0aGlzLnRvZ2dsZUxvYWRlclNvdXJjZS5uZXh0KGFjdGl2ZSlcclxuXHR9XHJcbn1cclxuIiwiaW1wb3J0IHtJbmplY3RhYmxlfSBmcm9tICdAYW5ndWxhci9jb3JlJ1xyXG5pbXBvcnQge0h0dHBDbGllbnQsIEh0dHBQYXJhbXMsIEh0dHBSZXF1ZXN0LCBIdHRwUmVzcG9uc2V9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJ1xyXG5cclxuXHJcbkBJbmplY3RhYmxlKClcclxuZXhwb3J0IGNsYXNzIFJlcXVlc3RTZXJ2aWNlIHtcclxuXHRjb25zdHJ1Y3RvcihwdWJsaWMgY2xpZW50OiBIdHRwQ2xpZW50KSB7fVxyXG5cclxuXHRydW4obWV0aG9kOiBzdHJpbmcsIHVybDogc3RyaW5nLCBvcHRpb25zPzoge1t4OiBzdHJpbmddOiBhbnl9KSB7XHJcblx0XHRyZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG5cdFx0XHR0cnkge1xyXG5cdFx0XHRcdGxldCBydW5PcHRpb25zID0ge30gYXMgYW55LFxyXG5cdFx0XHRcdFx0cmVxdWVzdE9wdGlvbnMgPSB7fSBhcyBhbnksXHJcblx0XHRcdFx0XHRib2R5ID0gbnVsbFxyXG5cdFx0XHRcdGlmIChvcHRpb25zICYmICh0eXBlb2Ygb3B0aW9ucyA9PT0gJ29iamVjdCcpKSB7XHJcblx0XHRcdFx0XHRsZXQge3Jlc29sdmVXaXRoRnVsbFJlc3BvbnNlLCAuLi4gb3RoZXJPcHRpb25zfSA9IG9wdGlvbnNcclxuXHRcdFx0XHRcdHJlcXVlc3RPcHRpb25zID0gb3RoZXJPcHRpb25zXHJcblx0XHRcdFx0XHRydW5PcHRpb25zID0ge3Jlc29sdmVXaXRoRnVsbFJlc3BvbnNlfVxyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHRpZiAobWV0aG9kLnRvTG93ZXJDYXNlKCkgPT09ICdnZXQnKSB7XHJcblx0XHRcdFx0XHRpZiAoIXJlcXVlc3RPcHRpb25zIHx8ICh0eXBlb2YgcmVxdWVzdE9wdGlvbnMgIT09ICdvYmplY3QnKSkge1xyXG5cdFx0XHRcdFx0XHRyZXF1ZXN0T3B0aW9ucyA9IHt9XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRjb25zdCBvcHRpb25zUGFyYW1zID0gcmVxdWVzdE9wdGlvbnMucGFyYW1zIHx8IHt9XHJcblx0XHRcdFx0XHRsZXQgaHR0cFBhcmFtcyA9IG5ldyBIdHRwUGFyYW1zKClcclxuXHRcdFx0XHRcdGZvciAoY29uc3Qga2V5IGluIG9wdGlvbnNQYXJhbXMpIHtcclxuXHRcdFx0XHRcdFx0Y29uc3Qgb3B0UGFyYW0gPSBvcHRpb25zUGFyYW1zW2tleV1cclxuXHRcdFx0XHRcdFx0aWYgKCh0eXBlb2Ygb3B0UGFyYW0gPT09ICdvYmplY3QnKSAmJiAob3B0UGFyYW0gIT09IG51bGwpKSB7XHJcblx0XHRcdFx0XHRcdFx0aWYgKG9wdFBhcmFtIGluc3RhbmNlb2YgQXJyYXkpIHtcclxuXHRcdFx0XHRcdFx0XHRcdG9wdFBhcmFtLmZvckVhY2goKGl0ZW0pID0+IHtcclxuXHRcdFx0XHRcdFx0XHRcdFx0aWYgKCh0eXBlb2YgaXRlbSA9PT0gJ29iamVjdCcpICYmIChpdGVtICE9PSBudWxsKSkge1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdGZvciAoY29uc3QgaW5uZXJLZXkgaW4gaXRlbSkge1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0aHR0cFBhcmFtcyA9IGh0dHBQYXJhbXMuc2V0KGAke2tleX1bJHtpbm5lcktleX1dYCwgaXRlbVtpbm5lcktleV0pXHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdHJldHVyblxyXG5cdFx0XHRcdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRcdFx0XHRcdGh0dHBQYXJhbXMgPSBodHRwUGFyYW1zLnNldChgJHtrZXl9W11gLCBpdGVtKVxyXG5cdFx0XHRcdFx0XHRcdFx0fSlcclxuXHRcdFx0XHRcdFx0XHRcdGNvbnRpbnVlXHJcblx0XHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0XHRcdGZvciAoY29uc3QgaW5uZXJLZXkgaW4gb3B0UGFyYW0pIHtcclxuXHRcdFx0XHRcdFx0XHRcdGh0dHBQYXJhbXMgPSBodHRwUGFyYW1zLnNldChgJHtrZXl9WyR7aW5uZXJLZXl9XWAsIG9wdFBhcmFtW2lubmVyS2V5XSlcclxuXHRcdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRcdFx0Y29udGludWVcclxuXHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0XHRodHRwUGFyYW1zID0gaHR0cFBhcmFtcy5zZXQoa2V5LCBvcHRQYXJhbSlcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdGh0dHBQYXJhbXMgPSBodHRwUGFyYW1zLnNldCgnXycsIChuZXcgRGF0ZSgpKS5nZXRUaW1lKCkudG9TdHJpbmcoKSlcclxuXHRcdFx0XHRcdHJlcXVlc3RPcHRpb25zLnBhcmFtcyA9IGh0dHBQYXJhbXNcclxuXHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0aWYgKCFyZXF1ZXN0T3B0aW9ucyB8fCAodHlwZW9mIHJlcXVlc3RPcHRpb25zICE9PSAnb2JqZWN0JykpIHtcclxuXHRcdFx0XHRcdFx0cmVxdWVzdE9wdGlvbnMgPSB7fVxyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0Ym9keSA9ICghcmVxdWVzdE9wdGlvbnMuYm9keSB8fCAodHlwZW9mIHJlcXVlc3RPcHRpb25zLmJvZHkgIT09ICdvYmplY3QnKSkgPyB7fSA6IHJlcXVlc3RPcHRpb25zLmJvZHlcclxuXHRcdFx0XHRcdGJvZHkuXyA9IChuZXcgRGF0ZSgpKS5nZXRUaW1lKClcclxuXHRcdFx0XHRcdGRlbGV0ZSByZXF1ZXN0T3B0aW9ucy5ib2R5XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdGlmICghcmVxdWVzdE9wdGlvbnMucmVzcG9uc2VUeXBlKSB7fVxyXG5cdFx0XHRcdHRoaXMuY2xpZW50LnJlcXVlc3QobmV3IEh0dHBSZXF1ZXN0KG1ldGhvZCwgdXJsLCBib2R5LCByZXF1ZXN0T3B0aW9ucykpLnRvUHJvbWlzZSgpLnRoZW4oXHJcblx0XHRcdFx0XHQocmVzcG9uc2U6IEh0dHBSZXNwb25zZTxhbnk+KSA9PiBydW5PcHRpb25zLnJlc29sdmVXaXRoRnVsbFJlc3BvbnNlID8gcmVzb2x2ZShyZXNwb25zZSkgOiByZXNvbHZlKHJlc3BvbnNlLmJvZHkpLFxyXG5cdFx0XHRcdFx0KGVycm9yOiBhbnkpID0+IHJlamVjdChlcnJvcilcclxuXHRcdFx0XHQpXHJcblx0XHRcdH0gY2F0Y2goZXJyb3IpIHtcclxuXHRcdFx0XHRyZWplY3QoZXJyb3IpXHJcblx0XHRcdH1cclxuXHRcdH0pXHJcblx0fVxyXG59XHJcbiIsImltcG9ydCBjbyBmcm9tICdjbydcclxuaW1wb3J0IHtJbmplY3RhYmxlfSBmcm9tICdAYW5ndWxhci9jb3JlJ1xyXG5pbXBvcnQge0h0dHBIZWFkZXJzfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCdcclxuXHJcbmltcG9ydCB7R2xvYmFsRXZlbnRzU2VydmljZX0gZnJvbSAnLi9nbG9iYWxFdmVudHMvZ2xvYmFsRXZlbnRzLnNlcnZpY2UnXHJcbmltcG9ydCB7UmVxdWVzdFNlcnZpY2V9IGZyb20gJy4vcmVxdWVzdC5zZXJ2aWNlJ1xyXG5cclxuQEluamVjdGFibGUoKVxyXG5leHBvcnQgY2xhc3MgQmFzZVJFU1RTZXJ2aWNlIHtcclxuXHRoZWFkZXJzID0gbmV3IEh0dHBIZWFkZXJzKHsnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nfSlcclxuXHRiYXNlVXJsID0gJy8nXHJcblxyXG5cdGNvbnN0cnVjdG9yKFxyXG5cdFx0cHVibGljIGdsb2JhbEV2ZW50c1NlcnZpY2U6IEdsb2JhbEV2ZW50c1NlcnZpY2UsXHJcblx0XHRwdWJsaWMgcmVxdWVzdFNlcnZpY2U6IFJlcXVlc3RTZXJ2aWNlXHJcblx0KSB7fVxyXG5cclxuXHRoYW5kbGVFcnJvcihlcnIpOiB2b2lkIHtcclxuXHRcdHRoaXMuZ2xvYmFsRXZlbnRzU2VydmljZS5ub3RpZnkoJ2Vycm9yJywgZXJyICYmIGVyci5lcnJvciAmJiBlcnIuZXJyb3IuZXJyb3IgfHwgJ0FuIGVycm9yIGhhcyBvY2N1cnJlZC4nKVxyXG5cdH1cclxuXHJcblx0Y3JlYXRlKHBhcmFtcyk6IFByb21pc2U8YW55PiB7XHJcblx0XHRjb25zdCBpbnN0YW5jZSA9IHRoaXNcclxuXHRcdHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcblx0XHRcdGNvKGZ1bmN0aW9uKigpIHtcclxuXHRcdFx0XHR5aWVsZCBpbnN0YW5jZS5yZXF1ZXN0U2VydmljZS5ydW4oJ3Bvc3QnLCBgJHtpbnN0YW5jZS5iYXNlVXJsfWAsIHtcclxuXHRcdFx0XHRcdGhlYWRlcnM6IGluc3RhbmNlLmhlYWRlcnMsXHJcblx0XHRcdFx0XHRib2R5OiBwYXJhbXNcclxuXHRcdFx0XHR9KVxyXG5cdFx0XHRcdHJldHVybiB7c3VjY2VzczogdHJ1ZX1cclxuXHRcdFx0fSkudGhlbigocmVzKSA9PiByZXNvbHZlKHJlcyksIChlcnIpID0+IHtcclxuXHRcdFx0XHRpbnN0YW5jZS5oYW5kbGVFcnJvcihlcnIpXHJcblx0XHRcdFx0cmVqZWN0KHtlcnJvcjogdHJ1ZX0pXHJcblx0XHRcdH0pXHJcblx0XHR9KVxyXG5cdH1cclxuXHJcblx0cmVhZChwYXJhbXMpOiBQcm9taXNlPGFueT4ge1xyXG5cdFx0Y29uc3QgaW5zdGFuY2UgPSB0aGlzXHJcblx0XHRyZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG5cdFx0XHRjbyhmdW5jdGlvbiooKSB7XHJcblx0XHRcdFx0cmV0dXJuIHlpZWxkIGluc3RhbmNlLnJlcXVlc3RTZXJ2aWNlLnJ1bignZ2V0JywgYCR7aW5zdGFuY2UuYmFzZVVybH0vaXRlbWAsIHtcclxuXHRcdFx0XHRcdGhlYWRlcnM6IGluc3RhbmNlLmhlYWRlcnMsXHJcblx0XHRcdFx0XHRwYXJhbXNcclxuXHRcdFx0XHR9KVxyXG5cdFx0XHR9KS50aGVuKChyZXMpID0+IHJlc29sdmUocmVzKSwgKGVycikgPT4ge1xyXG5cdFx0XHRcdGluc3RhbmNlLmhhbmRsZUVycm9yKGVycilcclxuXHRcdFx0XHRyZWplY3Qoe2Vycm9yOiB0cnVlfSlcclxuXHRcdFx0fSlcclxuXHRcdH0pXHJcblx0fVxyXG5cclxuXHRyZWFkTGlzdChwYXJhbXMpOiBQcm9taXNlPGFueT4ge1xyXG5cdFx0Y29uc3QgaW5zdGFuY2UgPSB0aGlzXHJcblx0XHRyZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG5cdFx0XHRjbyhmdW5jdGlvbiooKSB7XHJcblx0XHRcdFx0cmV0dXJuIHlpZWxkIGluc3RhbmNlLnJlcXVlc3RTZXJ2aWNlLnJ1bignZ2V0JywgYCR7aW5zdGFuY2UuYmFzZVVybH1gLCB7XHJcblx0XHRcdFx0XHRoZWFkZXJzOiBpbnN0YW5jZS5oZWFkZXJzLFxyXG5cdFx0XHRcdFx0cGFyYW1zXHJcblx0XHRcdFx0fSlcclxuXHRcdFx0fSkudGhlbigocmVzKSA9PiByZXNvbHZlKHJlcyksIChlcnIpID0+IHtcclxuXHRcdFx0XHRpbnN0YW5jZS5oYW5kbGVFcnJvcihlcnIpXHJcblx0XHRcdFx0cmVqZWN0KHtlcnJvcjogdHJ1ZX0pXHJcblx0XHRcdH0pXHJcblx0XHR9KVxyXG5cdH1cclxuXHJcblx0cmVhZFNlbGVjdExpc3QocGFyYW1zKTogUHJvbWlzZTxhbnk+IHtcclxuXHRcdGNvbnN0IGluc3RhbmNlID0gdGhpc1xyXG5cdFx0cmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuXHRcdFx0Y28oZnVuY3Rpb24qKCkge1xyXG5cdFx0XHRcdHJldHVybiB5aWVsZCBpbnN0YW5jZS5yZXF1ZXN0U2VydmljZS5ydW4oJ2dldCcsIGAke2luc3RhbmNlLmJhc2VVcmx9L3NlbGVjdExpc3RgLCB7XHJcblx0XHRcdFx0XHRoZWFkZXJzOiBpbnN0YW5jZS5oZWFkZXJzLFxyXG5cdFx0XHRcdFx0cGFyYW1zXHJcblx0XHRcdFx0fSlcclxuXHRcdFx0fSkudGhlbigocmVzKSA9PiByZXNvbHZlKHJlcyksIChlcnIpID0+IHtcclxuXHRcdFx0XHRpbnN0YW5jZS5oYW5kbGVFcnJvcihlcnIpXHJcblx0XHRcdFx0cmVqZWN0KHtlcnJvcjogdHJ1ZX0pXHJcblx0XHRcdH0pXHJcblx0XHR9KVxyXG5cdH1cclxuXHJcblx0dXBkYXRlKHBhcmFtcyk6IFByb21pc2U8YW55PiB7XHJcblx0XHRjb25zdCBpbnN0YW5jZSA9IHRoaXNcclxuXHRcdHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcblx0XHRcdGNvKGZ1bmN0aW9uKigpIHtcclxuXHRcdFx0XHRyZXR1cm4geWllbGQgaW5zdGFuY2UucmVxdWVzdFNlcnZpY2UucnVuKCdwYXRjaCcsIGAke2luc3RhbmNlLmJhc2VVcmx9L2l0ZW0vJHtwYXJhbXMuaWR9YCwge1xyXG5cdFx0XHRcdFx0aGVhZGVyczogaW5zdGFuY2UuaGVhZGVycyxcclxuXHRcdFx0XHRcdGJvZHk6IHBhcmFtc1xyXG5cdFx0XHRcdH0pXHJcblx0XHRcdH0pLnRoZW4oKHJlcykgPT4gcmVzb2x2ZShyZXMpLCAoZXJyKSA9PiB7XHJcblx0XHRcdFx0aW5zdGFuY2UuaGFuZGxlRXJyb3IoZXJyKVxyXG5cdFx0XHRcdHJlamVjdCh7ZXJyb3I6IHRydWV9KVxyXG5cdFx0XHR9KVxyXG5cdFx0fSlcclxuXHR9XHJcblxyXG5cdGJ1bGtVcHNlcnQocGFyYW1zKTogUHJvbWlzZTxhbnk+IHtcclxuXHRcdGNvbnN0IGluc3RhbmNlID0gdGhpc1xyXG5cdFx0cmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuXHRcdFx0Y28oZnVuY3Rpb24qKCkge1xyXG5cdFx0XHRcdHJldHVybiB5aWVsZCBpbnN0YW5jZS5yZXF1ZXN0U2VydmljZS5ydW4oJ3B1dCcsIGAke2luc3RhbmNlLmJhc2VVcmx9YCwge1xyXG5cdFx0XHRcdFx0aGVhZGVyczogaW5zdGFuY2UuaGVhZGVycyxcclxuXHRcdFx0XHRcdGJvZHk6IHBhcmFtc1xyXG5cdFx0XHRcdH0pXHJcblx0XHRcdH0pLnRoZW4oKHJlcykgPT4gcmVzb2x2ZShyZXMpLCAoZXJyKSA9PiB7XHJcblx0XHRcdFx0aW5zdGFuY2UuaGFuZGxlRXJyb3IoZXJyKVxyXG5cdFx0XHRcdHJlamVjdCh7ZXJyb3I6IHRydWV9KVxyXG5cdFx0XHR9KVxyXG5cdFx0fSlcclxuXHR9XHJcblxyXG5cdGRlbGV0ZShwYXJhbXMpOiBQcm9taXNlPGFueT4ge1xyXG5cdFx0Y29uc3QgaW5zdGFuY2UgPSB0aGlzXHJcblx0XHRyZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG5cdFx0XHRjbyhmdW5jdGlvbiooKSB7XHJcblx0XHRcdFx0cmV0dXJuIHlpZWxkIGluc3RhbmNlLnJlcXVlc3RTZXJ2aWNlLnJ1bignZGVsZXRlJywgYCR7aW5zdGFuY2UuYmFzZVVybH0vJHtwYXJhbXMuaWR9YCwge1xyXG5cdFx0XHRcdFx0aGVhZGVyczogaW5zdGFuY2UuaGVhZGVycyxcclxuXHRcdFx0XHRcdGJvZHk6IHBhcmFtc1xyXG5cdFx0XHRcdH0pXHJcblx0XHRcdH0pLnRoZW4oKHJlcykgPT4gcmVzb2x2ZShyZXMpLCAoZXJyKSA9PiB7XHJcblx0XHRcdFx0aW5zdGFuY2UuaGFuZGxlRXJyb3IoZXJyKVxyXG5cdFx0XHRcdHJlamVjdCh7ZXJyb3I6IHRydWV9KVxyXG5cdFx0XHR9KVxyXG5cdFx0fSlcclxuXHR9XHJcbn1cclxuIiwiaW1wb3J0IGNvIGZyb20gJ2NvJ1xyXG5pbXBvcnQge0luamVjdGFibGV9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnXHJcbmltcG9ydCB7SHR0cEhlYWRlcnN9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJ1xyXG5cclxuaW1wb3J0IHtHbG9iYWxFdmVudHNTZXJ2aWNlfSBmcm9tICcuL2dsb2JhbEV2ZW50cy9nbG9iYWxFdmVudHMuc2VydmljZSdcclxuaW1wb3J0IHtSZXF1ZXN0U2VydmljZX0gZnJvbSAnLi9yZXF1ZXN0LnNlcnZpY2UnXHJcblxyXG5ASW5qZWN0YWJsZSgpXHJcbmV4cG9ydCBjbGFzcyBGaWxlc1JFU1RTZXJ2aWNlIHtcclxuXHQvLyB7J0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJ31cclxuXHRoZWFkZXJzID0gbmV3IEh0dHBIZWFkZXJzKClcclxuXHRiYXNlVXJsID0gJy9maWxlcydcclxuXHJcblx0Y29uc3RydWN0b3IoXHJcblx0XHRwdWJsaWMgZ2xvYmFsRXZlbnRzU2VydmljZTogR2xvYmFsRXZlbnRzU2VydmljZSxcclxuXHRcdHB1YmxpYyByZXF1ZXN0U2VydmljZTogUmVxdWVzdFNlcnZpY2VcclxuXHQpIHt9XHJcblxyXG5cdGhhbmRsZUVycm9yKGVycik6IHZvaWQge1xyXG5cdFx0dGhpcy5nbG9iYWxFdmVudHNTZXJ2aWNlLm5vdGlmeSgnZXJyb3InLCBlcnIgJiYgZXJyLmVycm9yICYmIGVyci5lcnJvci5lcnJvciB8fCAnQW4gZXJyb3IgaGFzIG9jY3VycmVkLicpXHJcblx0fVxyXG5cclxuXHR1cGxvYWQoZmlsZTogRmlsZSwgcGFyYW1zOiB7b3V0cHV0RmlsZU5hbWU6IHN0cmluZywgW3g6IHN0cmluZ106IGFueX0sIG9wdGlvbnM/OiB7aGFuZGxlRXJyb3I/OiBib29sZWFufSk6IFByb21pc2U8YW55PiB7XHJcblx0XHRjb25zdCBpbnN0YW5jZSA9IHRoaXNcclxuXHRcdHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcblx0XHRcdGNvKGZ1bmN0aW9uKigpIHtcclxuXHRcdFx0XHRsZXQgZmQgPSBuZXcgRm9ybURhdGEoKVxyXG5cdFx0XHRcdGZkLmFwcGVuZCgnZmlsZScsIGZpbGUsIGZpbGUubmFtZSlcclxuXHRcdFx0XHRmb3IgKGNvbnN0IGtleSBpbiBwYXJhbXMpIHtcclxuXHRcdFx0XHRcdGZkLmFwcGVuZChrZXksIHBhcmFtc1trZXldKVxyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHRpbnN0YW5jZS5oZWFkZXJzLnNldCgnQ29udGVudC1UeXBlJywgJ211bHRpcGFydC9mb3JtLWRhdGEnKVxyXG5cdFx0XHRcdHlpZWxkIGluc3RhbmNlLnJlcXVlc3RTZXJ2aWNlLnJ1bigncG9zdCcsIGAke2luc3RhbmNlLmJhc2VVcmx9YCwge1xyXG5cdFx0XHRcdFx0aGVhZGVyczogaW5zdGFuY2UuaGVhZGVycyxcclxuXHRcdFx0XHRcdGJvZHk6IGZkXHJcblx0XHRcdFx0fSlcclxuXHRcdFx0XHRyZXR1cm4ge3N1Y2Nlc3M6IHRydWV9XHJcblx0XHRcdH0pLnRoZW4oKHJlcykgPT4gcmVzb2x2ZShyZXMpLCAoZXJyKSA9PiB7XHJcblx0XHRcdFx0aWYgKG9wdGlvbnMgJiYgb3B0aW9ucy5oYW5kbGVFcnJvcikge1xyXG5cdFx0XHRcdFx0aW5zdGFuY2UuaGFuZGxlRXJyb3IoZXJyKVxyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHRyZWplY3Qoe2Vycm9yOiBlcnIgfHwgdHJ1ZX0pXHJcblx0XHRcdH0pXHJcblx0XHR9KVxyXG5cdH1cclxuXHJcblx0cmVhZChwYXJhbXMpOiBQcm9taXNlPGFueT4ge1xyXG5cdFx0Y29uc3QgaW5zdGFuY2UgPSB0aGlzXHJcblx0XHRyZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG5cdFx0XHRjbyhmdW5jdGlvbiooKSB7XHJcblx0XHRcdFx0cmV0dXJuIHlpZWxkIGluc3RhbmNlLnJlcXVlc3RTZXJ2aWNlLnJ1bignZ2V0JywgYCR7aW5zdGFuY2UuYmFzZVVybH0vaXRlbWAsIHtcclxuXHRcdFx0XHRcdGhlYWRlcnM6IGluc3RhbmNlLmhlYWRlcnMsXHJcblx0XHRcdFx0XHRwYXJhbXNcclxuXHRcdFx0XHR9KVxyXG5cdFx0XHR9KS50aGVuKChyZXMpID0+IHJlc29sdmUocmVzKSwgKGVycikgPT4ge1xyXG5cdFx0XHRcdGluc3RhbmNlLmhhbmRsZUVycm9yKGVycilcclxuXHRcdFx0XHRyZWplY3Qoe2Vycm9yOiB0cnVlfSlcclxuXHRcdFx0fSlcclxuXHRcdH0pXHJcblx0fVxyXG59XHJcbiIsImV4cG9ydCBjb25zdCBnZXROZXN0ZWQgPSAocGFyZW50OiBhbnksIGZpZWxkOiBzdHJpbmcpOiB2b2lkID0+IHtcclxuXHRpZiAoKHR5cGVvZiBwYXJlbnQgIT09ICdvYmplY3QnKSB8fCAodHlwZW9mIGZpZWxkICE9PSAnc3RyaW5nJykpIHtcclxuXHRcdFx0cmV0dXJuIG51bGxcclxuXHRcdH1cclxuXHRsZXQgZmllbGREYXRhID0gZmllbGQuc3BsaXQoJy4nKSxcclxuXHRcdGN1cnJlbnRFbGVtZW50ID0gcGFyZW50XHJcblx0Zm9yIChsZXQgaSBpbiBmaWVsZERhdGEpIHtcclxuXHRcdGxldCBpbm5lckVsZW1lbnQgPSBmaWVsZERhdGFbaV1cclxuXHRcdGlmIChjdXJyZW50RWxlbWVudCA9PT0gbnVsbCkge1xyXG5cdFx0XHRyZXR1cm4gY3VycmVudEVsZW1lbnRcclxuXHRcdH1cclxuXHRcdGlmICgodHlwZW9mIGN1cnJlbnRFbGVtZW50ID09PSAndW5kZWZpbmVkJykgfHwgKHR5cGVvZiBjdXJyZW50RWxlbWVudFtpbm5lckVsZW1lbnRdID09PSAndW5kZWZpbmVkJykpIHtcclxuXHRcdFx0cmV0dXJuIGN1cnJlbnRFbGVtZW50XHJcblx0XHR9XHJcblx0XHRjdXJyZW50RWxlbWVudCA9IGN1cnJlbnRFbGVtZW50W2lubmVyRWxlbWVudF1cclxuXHR9XHJcblx0cmV0dXJuIGN1cnJlbnRFbGVtZW50XHJcbn1cclxuXHJcbmV4cG9ydCBjb25zdCBzZXROZXN0ZWQgPSAocGFyZW50OiBhbnksIGZpZWxkOiBzdHJpbmcsIHZhbHVlOiBhbnkpOiBib29sZWFuID0+IHtcclxuXHRjb25zdCBmaWVsZE5hbWVzID0gZmllbGQuc3BsaXQoJy4nKVxyXG5cdGlmICghZmllbGROYW1lcy5sZW5ndGgpIHtcclxuXHRcdHJldHVybiBmYWxzZVxyXG5cdH1cclxuXHRsZXQgY3VycmVudFBhcmVudCA9IHBhcmVudCxcclxuXHRcdGxvb3BFbmQgPSBmaWVsZE5hbWVzLmxlbmd0aCAtIDFcclxuXHRmb3IgKGxldCBpID0gMDsgaSA8IGxvb3BFbmQ7IGkrKykge1xyXG5cdFx0Y29uc3QgZmllbGROYW1lID0gZmllbGROYW1lc1tpXVxyXG5cdFx0aWYgKHR5cGVvZiBjdXJyZW50UGFyZW50W2ZpZWxkTmFtZV0gPT09ICd1bmRlZmluZWQnKSB7XHJcblx0XHRcdHJldHVybiBmYWxzZVxyXG5cdFx0fVxyXG5cdFx0Y3VycmVudFBhcmVudCA9IGN1cnJlbnRQYXJlbnRbZmllbGROYW1lXVxyXG5cdH1cclxuXHRjdXJyZW50UGFyZW50W2ZpZWxkTmFtZXNbbG9vcEVuZF1dID0gdmFsdWVcclxuXHRyZXR1cm4gdHJ1ZVxyXG59XHJcbiIsIid1c2Ugc3RyaWN0J1xyXG5cclxuLy8gYW5ndWxhciBkZXBlbmRlbmNpZXNcclxuaW1wb3J0IHtDb21tb25Nb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbidcclxuaW1wb3J0IHtOZ01vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvY29yZSdcclxuXHJcblxyXG5ATmdNb2R1bGUoe1xyXG5cdGltcG9ydHM6IFtcclxuXHRcdENvbW1vbk1vZHVsZVxyXG5cdF1cclxufSlcclxuZXhwb3J0IGNsYXNzIFJhbXN0ZXJVSUNvcmVNb2R1bGUge31cclxuXHJcbmV4cG9ydCAqIGZyb20gJy4vY29tcG9uZW50cy9iYXNlLWxheW91dC5jb21wb25lbnQnXHJcbmV4cG9ydCAqIGZyb20gJy4vY29tcG9uZW50cy9iYXNlLXBhZ2UuY29tcG9uZW50J1xyXG5leHBvcnQgKiBmcm9tICcuL3NlcnZpY2VzL2Jhc2VSRVNULnNlcnZpY2UnXHJcbmV4cG9ydCAqIGZyb20gJy4vc2VydmljZXMvZmlsZXNSRVNULnNlcnZpY2UnXHJcbmV4cG9ydCAqIGZyb20gJy4vdXRpbHMvdG9vbGJlbHQnXHJcbmV4cG9ydCAqIGZyb20gJy4vc2VydmljZXMvZ2xvYmFsRXZlbnRzL2dsb2JhbEV2ZW50cy5zZXJ2aWNlJ1xyXG5leHBvcnQgKiBmcm9tICcuL3NlcnZpY2VzL2dsb2JhbEV2ZW50cy9nbG9iYWxFdmVudHMuaW50ZXJmYWNlcydcclxuZXhwb3J0ICogZnJvbSAnLi9zZXJ2aWNlcy9yZXF1ZXN0LnNlcnZpY2UnXHJcbmV4cG9ydCAqIGZyb20gJy4vaW50ZXJmYWNlcy9zZWxlY3RMaXN0LmludGVyZmFjZSdcclxuIl0sIm5hbWVzIjpbIlN1YmplY3QiLCJ0YWtlVW50aWwiLCJJbmplY3RhYmxlIiwiSHR0cFBhcmFtcyIsIkh0dHBSZXF1ZXN0IiwiSHR0cENsaWVudCIsIkh0dHBIZWFkZXJzIiwiTmdNb2R1bGUiLCJDb21tb25Nb2R1bGUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQU9BO1FBTUMsNkJBQ1EsbUJBQXdDLEVBQ3hDLE1BQWM7WUFEZCx3QkFBbUIsR0FBbkIsbUJBQW1C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LENBQUMsQ0FBQyxLQUFLLEVBQUUsQ0FBQzs0QkFBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDOzRCQUFDLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDOzRCQUFDLFNBQVM7d0JBQ2pELEtBQUssQ0FBQzs0QkFBRSxFQUFFLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsQ0FBQzs0QkFBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDOzRCQUFDLFNBQVM7d0JBQ2pEOzRCQUNJLElBQUksRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDLE1BQU0sR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRTtnQ0FBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDO2dDQUFDLFNBQVM7NkJBQUU7NEJBQzVHLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFO2dDQUFFLENBQUMsQ0FBQyxLQUFLLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO2dDQUFDLE1BQU07NkJBQUU7NEJBQ3RGLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRTtnQ0FBRSxDQUFDLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQ0FBQyxDQUFDLEdBQUcsRUFBRSxD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