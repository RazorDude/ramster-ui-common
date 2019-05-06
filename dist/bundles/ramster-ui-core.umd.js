(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/common'), require('rxjs/operators'), require('rxjs'), require('co'), require('@angular/common/http'), require('@angular/core')) :
    typeof define === 'function' && define.amd ? define('ramster-ui-core', ['exports', '@angular/common', 'rxjs/operators', 'rxjs', 'co', '@angular/common/http', '@angular/core'], factory) :
    (factory((global['ramster-ui-core'] = {}),global.ng.common,global.rxjs.operators,global.rxjs,global.co,global.ng.common.http,global.ng.core));
}(this, (function (exports,common,operators,rxjs,co,http,core) { 'use strict';

    co = co && co.hasOwnProperty('default') ? co['default'] : co;

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
                this.globalEventsService.pageLoaded$.subscribe(( /**
                 * @param {?=} data
                 * @return {?}
                 */function (data) { return _this.pageLoaded(data); }));
                this.globalEventsService.triggerInitialDataLoad$.subscribe(( /**
                 * @return {?}
                 */function () { return _this.loadInitialData(); }));
                this.globalEventsService.setLayoutData$.subscribe(( /**
                 * @param {?} data
                 * @return {?}
                 */function (data) { return _this.setLayoutData(data); }));
                this.globalEventsService.redirect$.subscribe(( /**
                 * @param {?} __0
                 * @return {?}
                 */function (_a) {
                    var route = _a.route, options = _a.options;
                    return _this.redirect(route, options);
                }));
                this.globalEventsService.toggleLoader$.subscribe(( /**
                 * @param {?} active
                 * @return {?}
                 */function (active) { return _this.toggleLoader(active); }));
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
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
                this.globalEventsService.initialDataLoaded$.pipe(operators.takeUntil(this.destroyed)).subscribe(( /**
                 * @param {?} data
                 * @return {?}
                 */function (data) { return _this.initialDataLoaded(data); }));
                this.onInitMethodNames.forEach(( /**
                 * @param {?} methodName
                 * @return {?}
                 */function (methodName) {
                    if (typeof _this[methodName] === 'function') {
                        _this[methodName]();
                    }
                }));
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
                this.onInitialDataLoadedMethodNames.forEach(( /**
                 * @param {?} methodName
                 * @return {?}
                 */function (methodName) {
                    if (typeof _this[methodName] === 'function') {
                        _this[methodName](data);
                    }
                }));
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
    var __assign = function () {
        __assign = Object.assign || function __assign(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s)
                    if (Object.prototype.hasOwnProperty.call(s, p))
                        t[p] = s[p];
            }
            return t;
        };
        return __assign.apply(this, arguments);
    };
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
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
                    object.forEach(( /**
                     * @param {?} item
                     * @return {?}
                     */function (item) {
                        if (item === null) {
                            return;
                        }
                        if ((item instanceof Date) || !(item instanceof Array) || (typeof item !== 'object')) {
                            returnObject.push({ key: parentKey + "[]", value: item });
                            return;
                        }
                        returnObject = returnObject.concat(_this.flattenObjectForQuery(item, parentKey + "[]"));
                        return;
                    }));
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
                return new Promise(( /**
                 * @param {?} resolve
                 * @param {?} reject
                 * @return {?}
                 */function (resolve, reject) {
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
                                optionsParams.forEach(( /**
                                 * @param {?} item
                                 * @param {?} index
                                 * @return {?}
                                 */function (item, index) {
                                    actualUrl_1 += "&" + item.key + "=" + item.value;
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
                        _this.client.request(new http.HttpRequest(method, actualUrl_1, body, requestOptions)).toPromise().then(( /**
                         * @param {?} response
                         * @return {?}
                         */function (response) { return runOptions_1.resolveWithFullResponse ? resolve(response) : resolve(response.body); }), ( /**
                         * @param {?} error
                         * @return {?}
                         */function (error) { return reject(error); }));
                    }
                    catch (error) {
                        reject(error);
                    }
                }));
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
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
                    return data.map(( /**
                     * @param {?} item
                     * @param {?} index
                     * @return {?}
                     */function (item, index) { return _this.emptyToNull(item); }));
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
         * @param {?=} options
         * @return {?}
         */
        BaseRESTService.prototype.handleError = /**
         * @param {?} err
         * @param {?=} options
         * @return {?}
         */
            function (err, options) {
                var notifyOnError = (options || ( /** @type {?} */({}))).notifyOnError;
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
                return new Promise(( /**
                 * @param {?} resolve
                 * @param {?} reject
                 * @return {?}
                 */function (resolve, reject) {
                    co(( /**
                     * @return {?}
                     */function () {
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, instance.requestService.run('post', "" + instance.baseUrl, {
                                        headers: instance.headers,
                                        body: instance.emptyToNull(params)
                                    })];
                                case 1: return [2 /*return*/, _a.sent()];
                            }
                        });
                    })).then(( /**
                     * @param {?} res
                     * @return {?}
                     */function (res) { return resolve(res); }), ( /**
                     * @param {?} err
                     * @return {?}
                     */function (err) {
                        instance.handleError(err);
                        reject({ error: true });
                    }));
                }));
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
                return new Promise(( /**
                 * @param {?} resolve
                 * @param {?} reject
                 * @return {?}
                 */function (resolve, reject) {
                    co(( /**
                     * @return {?}
                     */function () {
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, instance.requestService.run('get', instance.baseUrl + "/item", {
                                        headers: instance.headers,
                                        params: instance.stringifyGetParams(instance.emptyToNull(params))
                                    })];
                                case 1: return [2 /*return*/, _a.sent()];
                            }
                        });
                    })).then(( /**
                     * @param {?} res
                     * @return {?}
                     */function (res) { return resolve(res); }), ( /**
                     * @param {?} err
                     * @return {?}
                     */function (err) {
                        instance.handleError(err);
                        reject({ error: true });
                    }));
                }));
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
                return new Promise(( /**
                 * @param {?} resolve
                 * @param {?} reject
                 * @return {?}
                 */function (resolve, reject) {
                    co(( /**
                     * @return {?}
                     */function () {
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, instance.requestService.run('get', "" + instance.baseUrl, {
                                        headers: instance.headers,
                                        params: instance.stringifyGetParams(instance.emptyToNull(params))
                                    })];
                                case 1: return [2 /*return*/, _a.sent()];
                            }
                        });
                    })).then(( /**
                     * @param {?} res
                     * @return {?}
                     */function (res) { return resolve(res); }), ( /**
                     * @param {?} err
                     * @return {?}
                     */function (err) {
                        instance.handleError(err);
                        reject({ error: true });
                    }));
                }));
            };
        /**
         * @param {?} params
         * @param {?} onMessage
         * @param {?=} options
         * @return {?}
         */
        BaseRESTService.prototype.readStreamList = /**
         * @param {?} params
         * @param {?} onMessage
         * @param {?=} options
         * @return {?}
         */
            function (params, onMessage, options) {
                var _this = this;
                var _a = options || ( /** @type {?} */({})), onError = _a.onError, reconnectAttemptInterval = _a.reconnectAttemptInterval, reconnectAttemptsLeft = _a.reconnectAttemptsLeft;
                /** @type {?} */
                var errorHandler = onError ? onError : this.handleError.bind(this);
                /** @type {?} */
                var eventSource = new EventSource("/" + this.baseUrl + "/streamList" + this.stringifyGetParams(this.emptyToNull(params)));
                eventSource.onmessage = ( /**
                 * @param {?} event
                 * @return {?}
                 */function (event) { return onMessage(event); });
                eventSource.onerror = ( /**
                 * @param {?} err
                 * @return {?}
                 */function (err) {
                    errorHandler(err);
                    if ((typeof reconnectAttemptsLeft === 'undefined') || reconnectAttemptsLeft > 0) {
                        eventSource.close();
                        setTimeout(( /**
                         * @return {?}
                         */function () {
                            _this.readStreamList(params, onMessage, __assign({}, options, { reconnectAttemptsLeft: typeof reconnectAttemptsLeft === 'number' ? reconnectAttemptsLeft - 1 : undefined }));
                        }), reconnectAttemptInterval || 5000);
                    }
                });
                return eventSource;
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
                return new Promise(( /**
                 * @param {?} resolve
                 * @param {?} reject
                 * @return {?}
                 */function (resolve, reject) {
                    co(( /**
                     * @return {?}
                     */function () {
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, instance.requestService.run('get', instance.baseUrl + "/selectList", {
                                        headers: instance.headers,
                                        params: instance.stringifyGetParams(instance.emptyToNull(params))
                                    })];
                                case 1: return [2 /*return*/, _a.sent()];
                            }
                        });
                    })).then(( /**
                     * @param {?} res
                     * @return {?}
                     */function (res) { return resolve(res); }), ( /**
                     * @param {?} err
                     * @return {?}
                     */function (err) {
                        instance.handleError(err);
                        reject({ error: true });
                    }));
                }));
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
                return new Promise(( /**
                 * @param {?} resolve
                 * @param {?} reject
                 * @return {?}
                 */function (resolve, reject) {
                    co(( /**
                     * @return {?}
                     */function () {
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, instance.requestService.run('patch', instance.baseUrl + "/item/" + params.id, {
                                        headers: instance.headers,
                                        body: instance.emptyToNull(params)
                                    })];
                                case 1: return [2 /*return*/, _a.sent()];
                            }
                        });
                    })).then(( /**
                     * @param {?} res
                     * @return {?}
                     */function (res) { return resolve(res); }), ( /**
                     * @param {?} err
                     * @return {?}
                     */function (err) {
                        instance.handleError(err);
                        reject({ error: true });
                    }));
                }));
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
                return new Promise(( /**
                 * @param {?} resolve
                 * @param {?} reject
                 * @return {?}
                 */function (resolve, reject) {
                    co(( /**
                     * @return {?}
                     */function () {
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, instance.requestService.run('put', "" + instance.baseUrl, {
                                        headers: instance.headers,
                                        body: instance.emptyToNull(params)
                                    })];
                                case 1: return [2 /*return*/, _a.sent()];
                            }
                        });
                    })).then(( /**
                     * @param {?} res
                     * @return {?}
                     */function (res) { return resolve(res); }), ( /**
                     * @param {?} err
                     * @return {?}
                     */function (err) {
                        instance.handleError(err);
                        reject({ error: true });
                    }));
                }));
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
                return new Promise(( /**
                 * @param {?} resolve
                 * @param {?} reject
                 * @return {?}
                 */function (resolve, reject) {
                    co(( /**
                     * @return {?}
                     */function () {
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, instance.requestService.run('delete', instance.baseUrl + "/" + params.id, {
                                        headers: instance.headers,
                                        body: instance.emptyToNull(params)
                                    })];
                                case 1: return [2 /*return*/, _a.sent()];
                            }
                        });
                    })).then(( /**
                     * @param {?} res
                     * @return {?}
                     */function (res) { return resolve(res); }), ( /**
                     * @param {?} err
                     * @return {?}
                     */function (err) {
                        instance.handleError(err);
                        reject({ error: true });
                    }));
                }));
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
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
                return new Promise(( /**
                 * @param {?} resolve
                 * @param {?} reject
                 * @return {?}
                 */function (resolve, reject) {
                    co(( /**
                     * @return {?}
                     */function () {
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
                    })).then(( /**
                     * @param {?} res
                     * @return {?}
                     */function (res) { return resolve(res); }), ( /**
                     * @param {?} err
                     * @return {?}
                     */function (err) {
                        if (options && options.handleError) {
                            instance.handleError(err);
                        }
                        reject({ error: err || true });
                    }));
                }));
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
                return new Promise(( /**
                 * @param {?} resolve
                 * @param {?} reject
                 * @return {?}
                 */function (resolve, reject) {
                    co(( /**
                     * @return {?}
                     */function () {
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, instance.requestService.run('get', instance.baseUrl + "/item", {
                                        headers: instance.headers,
                                        params: params
                                    })];
                                case 1: return [2 /*return*/, _a.sent()];
                            }
                        });
                    })).then(( /**
                     * @param {?} res
                     * @return {?}
                     */function (res) { return resolve(res); }), ( /**
                     * @param {?} err
                     * @return {?}
                     */function (err) {
                        instance.handleError(err);
                        reject({ error: true });
                    }));
                }));
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
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
                Object.keys(data).forEach(( /**
                 * @param {?} key
                 * @return {?}
                 */function (key) {
                    _this.modelRESTServices["" + key.charAt(0).toLowerCase() + key.substr(1, key.length)] = _this.injector.get(data[key]);
                }));
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
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /** @type {?} */
    var getNested = ( /**
     * @param {?} parent
     * @param {?} field
     * @return {?}
     */function (parent, field) {
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
                    nextElement.forEach(( /**
                     * @param {?} item
                     * @param {?} iIndex
                     * @return {?}
                     */function (item, iIndex) {
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
                    }));
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
    });
    /** @type {?} */
    var setNested = ( /**
     * @param {?} parent
     * @param {?} field
     * @param {?} value
     * @return {?}
     */function (parent, field, value) {
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
    });

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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

//# sourceMappingURL=ramster-ui-core.umd.js.map