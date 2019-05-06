/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import co from 'co';
import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { GlobalEventsService } from './globalEvents/globalEvents.service';
import { RequestService } from './request.service';
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
            return data.map((/**
             * @param {?} item
             * @param {?} index
             * @return {?}
             */
            function (item, index) { return _this.emptyToNull(item); }));
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
        var notifyOnError = (options || (/** @type {?} */ ({}))).notifyOnError;
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
        return new Promise((/**
         * @param {?} resolve
         * @param {?} reject
         * @return {?}
         */
        function (resolve, reject) {
            co((/**
             * @return {?}
             */
            function () {
                return tslib_1.__generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, instance.requestService.run('post', "" + instance.baseUrl, {
                                headers: instance.headers,
                                body: instance.emptyToNull(params)
                            })];
                        case 1: return [2 /*return*/, _a.sent()];
                    }
                });
            })).then((/**
             * @param {?} res
             * @return {?}
             */
            function (res) { return resolve(res); }), (/**
             * @param {?} err
             * @return {?}
             */
            function (err) {
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
        return new Promise((/**
         * @param {?} resolve
         * @param {?} reject
         * @return {?}
         */
        function (resolve, reject) {
            co((/**
             * @return {?}
             */
            function () {
                return tslib_1.__generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, instance.requestService.run('get', instance.baseUrl + "/item", {
                                headers: instance.headers,
                                params: instance.stringifyGetParams(instance.emptyToNull(params))
                            })];
                        case 1: return [2 /*return*/, _a.sent()];
                    }
                });
            })).then((/**
             * @param {?} res
             * @return {?}
             */
            function (res) { return resolve(res); }), (/**
             * @param {?} err
             * @return {?}
             */
            function (err) {
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
        return new Promise((/**
         * @param {?} resolve
         * @param {?} reject
         * @return {?}
         */
        function (resolve, reject) {
            co((/**
             * @return {?}
             */
            function () {
                return tslib_1.__generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, instance.requestService.run('get', "" + instance.baseUrl, {
                                headers: instance.headers,
                                params: instance.stringifyGetParams(instance.emptyToNull(params))
                            })];
                        case 1: return [2 /*return*/, _a.sent()];
                    }
                });
            })).then((/**
             * @param {?} res
             * @return {?}
             */
            function (res) { return resolve(res); }), (/**
             * @param {?} err
             * @return {?}
             */
            function (err) {
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
        var _a = options || (/** @type {?} */ ({})), onError = _a.onError, reconnectAttemptInterval = _a.reconnectAttemptInterval, reconnectAttemptsLeft = _a.reconnectAttemptsLeft;
        /** @type {?} */
        var errorHandler = onError ? onError : this.handleError.bind(this);
        /** @type {?} */
        var url = "" + window.location.origin + this.baseUrl + "/streamList";
        /** @type {?} */
        var stringifiedParams = this.stringifyGetParams(this.emptyToNull(params));
        /** @type {?} */
        var firstParam = true;
        for (var key in stringifiedParams) {
            if (firstParam) {
                firstParam = false;
                url += '?';
            }
            else {
                url += '&';
            }
            url += key + "=" + stringifiedParams[key];
        }
        /** @type {?} */
        var eventSource = new EventSource(url);
        eventSource.onmessage = (/**
         * @param {?} event
         * @return {?}
         */
        function (event) { return onMessage(event); });
        eventSource.onerror = (/**
         * @param {?} err
         * @return {?}
         */
        function (err) {
            errorHandler(err);
            if ((typeof reconnectAttemptsLeft === 'undefined') || reconnectAttemptsLeft > 0) {
                eventSource.close();
                setTimeout((/**
                 * @return {?}
                 */
                function () {
                    _this.readStreamList(params, onMessage, tslib_1.__assign({}, options, { reconnectAttemptsLeft: typeof reconnectAttemptsLeft === 'number' ? reconnectAttemptsLeft - 1 : undefined }));
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
        return new Promise((/**
         * @param {?} resolve
         * @param {?} reject
         * @return {?}
         */
        function (resolve, reject) {
            co((/**
             * @return {?}
             */
            function () {
                return tslib_1.__generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, instance.requestService.run('get', instance.baseUrl + "/selectList", {
                                headers: instance.headers,
                                params: instance.stringifyGetParams(instance.emptyToNull(params))
                            })];
                        case 1: return [2 /*return*/, _a.sent()];
                    }
                });
            })).then((/**
             * @param {?} res
             * @return {?}
             */
            function (res) { return resolve(res); }), (/**
             * @param {?} err
             * @return {?}
             */
            function (err) {
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
        return new Promise((/**
         * @param {?} resolve
         * @param {?} reject
         * @return {?}
         */
        function (resolve, reject) {
            co((/**
             * @return {?}
             */
            function () {
                return tslib_1.__generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, instance.requestService.run('patch', instance.baseUrl + "/item/" + params.id, {
                                headers: instance.headers,
                                body: instance.emptyToNull(params)
                            })];
                        case 1: return [2 /*return*/, _a.sent()];
                    }
                });
            })).then((/**
             * @param {?} res
             * @return {?}
             */
            function (res) { return resolve(res); }), (/**
             * @param {?} err
             * @return {?}
             */
            function (err) {
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
        return new Promise((/**
         * @param {?} resolve
         * @param {?} reject
         * @return {?}
         */
        function (resolve, reject) {
            co((/**
             * @return {?}
             */
            function () {
                return tslib_1.__generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, instance.requestService.run('put', "" + instance.baseUrl, {
                                headers: instance.headers,
                                body: instance.emptyToNull(params)
                            })];
                        case 1: return [2 /*return*/, _a.sent()];
                    }
                });
            })).then((/**
             * @param {?} res
             * @return {?}
             */
            function (res) { return resolve(res); }), (/**
             * @param {?} err
             * @return {?}
             */
            function (err) {
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
        return new Promise((/**
         * @param {?} resolve
         * @param {?} reject
         * @return {?}
         */
        function (resolve, reject) {
            co((/**
             * @return {?}
             */
            function () {
                return tslib_1.__generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, instance.requestService.run('delete', instance.baseUrl + "/" + params.id, {
                                headers: instance.headers,
                                body: instance.emptyToNull(params)
                            })];
                        case 1: return [2 /*return*/, _a.sent()];
                    }
                });
            })).then((/**
             * @param {?} res
             * @return {?}
             */
            function (res) { return resolve(res); }), (/**
             * @param {?} err
             * @return {?}
             */
            function (err) {
                instance.handleError(err);
                reject({ error: true });
            }));
        }));
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
export { BaseRESTService };
if (false) {
    /** @type {?} */
    BaseRESTService.prototype.baseUrl;
    /** @type {?} */
    BaseRESTService.prototype.headers;
    /** @type {?} */
    BaseRESTService.prototype.redirectOnForbiddenUrl;
    /** @type {?} */
    BaseRESTService.prototype.globalEventsService;
    /** @type {?} */
    BaseRESTService.prototype.requestService;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFzZVJFU1Quc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL3JhbXN0ZXItdWktY29yZS8iLCJzb3VyY2VzIjpbInNlcnZpY2VzL2Jhc2VSRVNULnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQUUsTUFBTSxJQUFJLENBQUE7QUFDbkIsT0FBTyxFQUFDLFVBQVUsRUFBQyxNQUFNLGVBQWUsQ0FBQTtBQUN4QyxPQUFPLEVBQUMsV0FBVyxFQUFDLE1BQU0sc0JBQXNCLENBQUE7QUFFaEQsT0FBTyxFQUFDLG1CQUFtQixFQUFDLE1BQU0scUNBQXFDLENBQUE7QUFDdkUsT0FBTyxFQUFDLGNBQWMsRUFBQyxNQUFNLG1CQUFtQixDQUFBO0FBRWhEO0lBTUMseUJBQ1EsbUJBQXdDLEVBQ3hDLGNBQThCO1FBRDlCLHdCQUFtQixHQUFuQixtQkFBbUIsQ0FBcUI7UUFDeEMsbUJBQWMsR0FBZCxjQUFjLENBQWdCO1FBTnRDLFlBQU8sR0FBRyxHQUFHLENBQUE7UUFDYixZQUFPLEdBQUcsSUFBSSxXQUFXLENBQUMsRUFBQyxjQUFjLEVBQUUsa0JBQWtCLEVBQUMsQ0FBQyxDQUFBO1FBQy9ELDJCQUFzQixHQUFZLElBQUksQ0FBQTtJQUtuQyxDQUFDOzs7OztJQUVKLHFDQUFXOzs7O0lBQVgsVUFBWSxJQUFTO1FBQXJCLGlCQWtCQztRQWpCQSxJQUFJLElBQUksS0FBSyxFQUFFLEVBQUU7WUFDaEIsT0FBTyxJQUFJLENBQUE7U0FDWDtRQUNELElBQUksSUFBSSxZQUFZLElBQUksRUFBRTtZQUN6QixPQUFPLElBQUksQ0FBQTtTQUNYO1FBQ0QsSUFBSSxJQUFJLFlBQVksS0FBSyxFQUFFO1lBQzFCLE9BQU8sSUFBSSxDQUFDLEdBQUc7Ozs7O1lBQUMsVUFBQyxJQUFJLEVBQUUsS0FBSyxJQUFLLE9BQUEsS0FBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsRUFBdEIsQ0FBc0IsRUFBQyxDQUFBO1NBQ3hEO1FBQ0QsSUFB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QUFHLENBQUMsRUFBWixDQUFZOzs7O1lBQUUsVUFBQyxHQUFHO2dCQUNsQyxRQUFRLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxDQUFBO2dCQUN6QixNQUFNLENBQUMsRUFBQyxLQUFLLEVBQUUsSUFBSSxFQUFDLENBQUMsQ0FBQTtZQUN0QixDQUFDLEVBQUMsQ0FBQTtRQUNILENBQUMsRUFBQyxDQUFBO0lBQ0gsQ0FBQzs7Z0JBM01ELFVBQVU7Ozs7Z0JBSEgsbUJBQW1CO2dCQUNuQixjQUFjOztJQThNdEIsc0JBQUM7Q0FBQSxBQTVNRCxJQTRNQztTQTNNWSxlQUFlOzs7SUFDM0Isa0NBQWE7O0lBQ2Isa0NBQStEOztJQUMvRCxpREFBc0M7O0lBR3JDLDhDQUErQzs7SUFDL0MseUNBQXFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGNvIGZyb20gJ2NvJ1xyXG5pbXBvcnQge0luamVjdGFibGV9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnXHJcbmltcG9ydCB7SHR0cEhlYWRlcnN9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJ1xyXG5cclxuaW1wb3J0IHtHbG9iYWxFdmVudHNTZXJ2aWNlfSBmcm9tICcuL2dsb2JhbEV2ZW50cy9nbG9iYWxFdmVudHMuc2VydmljZSdcclxuaW1wb3J0IHtSZXF1ZXN0U2VydmljZX0gZnJvbSAnLi9yZXF1ZXN0LnNlcnZpY2UnXHJcblxyXG5ASW5qZWN0YWJsZSgpXHJcbmV4cG9ydCBjbGFzcyBCYXNlUkVTVFNlcnZpY2Uge1xyXG5cdGJhc2VVcmwgPSAnLydcclxuXHRoZWFkZXJzID0gbmV3IEh0dHBIZWFkZXJzKHsnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nfSlcclxuXHRyZWRpcmVjdE9uRm9yYmlkZGVuVXJsPzogc3RyaW5nID0gbnVsbFxyXG5cclxuXHRjb25zdHJ1Y3RvcihcclxuXHRcdHB1YmxpYyBnbG9iYWxFdmVudHNTZXJ2aWNlOiBHbG9iYWxFdmVudHNTZXJ2aWNlLFxyXG5cdFx0cHVibGljIHJlcXVlc3RTZXJ2aWNlOiBSZXF1ZXN0U2VydmljZVxyXG5cdCkge31cclxuXHJcblx0ZW1wdHlUb051bGwoZGF0YTogYW55KTogYW55IHtcclxuXHRcdGlmIChkYXRhID09PSAnJykge1xyXG5cdFx0XHRyZXR1cm4gbnVsbFxyXG5cdFx0fVxyXG5cdFx0aWYgKGRhdGEgaW5zdGFuY2VvZiBEYXRlKSB7XHJcblx0XHRcdHJldHVybiBkYXRhXHJcblx0XHR9XHJcblx0XHRpZiAoZGF0YSBpbnN0YW5jZW9mIEFycmF5KSB7XHJcblx0XHRcdHJldHVybiBkYXRhLm1hcCgoaXRlbSwgaW5kZXgpID0+IHRoaXMuZW1wdHlUb051bGwoaXRlbSkpXHJcblx0XHR9XHJcblx0XHRpZiAoKHR5cGVvZiBkYXRhID09PSAnb2JqZWN0JykgJiYgKGRhdGEgIT09IG51bGwpKSB7XHJcblx0XHRcdGNvbnN0IHBhcnNlZERhdGEgPSB7fVxyXG5cdFx0XHRmb3IgKGNvbnN0IGtleSBpbiBkYXRhKSB7XHJcblx0XHRcdFx0cGFyc2VkRGF0YVtrZXldID0gdGhpcy5lbXB0eVRvTnVsbChkYXRhW2tleV0pXHJcblx0XHRcdH1cclxuXHRcdFx0cmV0dXJuIHBhcnNlZERhdGFcclxuXHRcdH1cclxuXHRcdHJldHVybiBkYXRhXHJcblx0fVxyXG5cclxuXHRzdHJpbmdpZnlHZXRQYXJhbXMoZGF0YToge1trZXk6IHN0cmluZ106IGFueX0pOiB7W2tleTogc3RyaW5nXTogYW55fSB7XHJcblx0XHRsZXQgc3RyaW5naWZpZWRPYmplY3QgPSB7fVxyXG5cdFx0Zm9yIChjb25zdCBrZXkgaW4gZGF0YSkge1xyXG5cdFx0XHRjb25zdCB2YWx1ZSA9IGRhdGFba2V5XVxyXG5cdFx0XHRpZiAoKHZhbHVlIGluc3RhbmNlb2YgQXJyYXkpIHx8ICgodHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JykgJiYgKHZhbHVlICE9PSBudWxsKSAmJiAhKHZhbHVlIGluc3RhbmNlb2YgRGF0ZSkpKSB7XHJcblx0XHRcdFx0c3RyaW5naWZpZWRPYmplY3RbYF9qc29uXyR7a2V5fWBdID0gSlNPTi5zdHJpbmdpZnkodmFsdWUpXHJcblx0XHRcdFx0Y29udGludWVcclxuXHRcdFx0fVxyXG5cdFx0XHRzdHJpbmdpZmllZE9iamVjdFtrZXldID0gdmFsdWVcclxuXHRcdH1cclxuXHRcdHJldHVybiBzdHJpbmdpZmllZE9iamVjdFxyXG5cdH1cclxuXHJcblx0aGFuZGxlRXJyb3IoZXJyOiBhbnksIG9wdGlvbnM/OiB7bm90aWZ5T25FcnJvcj86IGJvb2xlYW59KTogdm9pZCB7XHJcblx0XHRjb25zdCB7bm90aWZ5T25FcnJvcn0gPSBvcHRpb25zIHx8IHt9IGFzIGFueVxyXG5cdFx0aWYgKCFlcnIpIHtcclxuXHRcdFx0aWYgKG5vdGlmeU9uRXJyb3IgIT09IGZhbHNlKSB7XHJcblx0XHRcdFx0dGhpcy5nbG9iYWxFdmVudHNTZXJ2aWNlLm5vdGlmeSgnZXJyb3InLCAnQW4gZXJyb3IgaGFzIG9jY3VycmVkLicpXHJcblx0XHRcdH1cclxuXHRcdFx0cmV0dXJuXHJcblx0XHR9XHJcblx0XHRpZiAodGhpcy5yZWRpcmVjdE9uRm9yYmlkZGVuVXJsICYmIChlcnIuc3RhdHVzID09PSA0MDEpKSB7XHJcblx0XHRcdHRoaXMuZ2xvYmFsRXZlbnRzU2VydmljZS5yZWRpcmVjdCh0aGlzLnJlZGlyZWN0T25Gb3JiaWRkZW5VcmwpXHJcblx0XHRcdHJldHVyblxyXG5cdFx0fVxyXG5cdFx0aWYgKG5vdGlmeU9uRXJyb3IgIT09IGZhbHNlKSB7XHJcblx0XHRcdHRoaXMuZ2xvYmFsRXZlbnRzU2VydmljZS5ub3RpZnkoJ2Vycm9yJywgZXJyLmVycm9yICYmIGVyci5lcnJvci5lcnJvciB8fCAnQW4gZXJyb3IgaGFzIG9jY3VycmVkLicpXHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRjcmVhdGUocGFyYW1zKTogUHJvbWlzZTxhbnk+IHtcclxuXHRcdGNvbnN0IGluc3RhbmNlID0gdGhpc1xyXG5cdFx0cmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuXHRcdFx0Y28oZnVuY3Rpb24qKCkge1xyXG5cdFx0XHRcdHJldHVybiB5aWVsZCBpbnN0YW5jZS5yZXF1ZXN0U2VydmljZS5ydW4oJ3Bvc3QnLCBgJHtpbnN0YW5jZS5iYXNlVXJsfWAsIHtcclxuXHRcdFx0XHRcdGhlYWRlcnM6IGluc3RhbmNlLmhlYWRlcnMsXHJcblx0XHRcdFx0XHRib2R5OiBpbnN0YW5jZS5lbXB0eVRvTnVsbChwYXJhbXMpXHJcblx0XHRcdFx0fSlcclxuXHRcdFx0fSkudGhlbigocmVzKSA9PiByZXNvbHZlKHJlcyksIChlcnIpID0+IHtcclxuXHRcdFx0XHRpbnN0YW5jZS5oYW5kbGVFcnJvcihlcnIpXHJcblx0XHRcdFx0cmVqZWN0KHtlcnJvcjogdHJ1ZX0pXHJcblx0XHRcdH0pXHJcblx0XHR9KVxyXG5cdH1cclxuXHJcblx0cmVhZChwYXJhbXMpOiBQcm9taXNlPGFueT4ge1xyXG5cdFx0Y29uc3QgaW5zdGFuY2UgPSB0aGlzXHJcblx0XHRyZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG5cdFx0XHRjbyhmdW5jdGlvbiooKSB7XHJcblx0XHRcdFx0cmV0dXJuIHlpZWxkIGluc3RhbmNlLnJlcXVlc3RTZXJ2aWNlLnJ1bignZ2V0JywgYCR7aW5zdGFuY2UuYmFzZVVybH0vaXRlbWAsIHtcclxuXHRcdFx0XHRcdGhlYWRlcnM6IGluc3RhbmNlLmhlYWRlcnMsXHJcblx0XHRcdFx0XHRwYXJhbXM6IGluc3RhbmNlLnN0cmluZ2lmeUdldFBhcmFtcyhpbnN0YW5jZS5lbXB0eVRvTnVsbChwYXJhbXMpKVxyXG5cdFx0XHRcdH0pXHJcblx0XHRcdH0pLnRoZW4oKHJlcykgPT4gcmVzb2x2ZShyZXMpLCAoZXJyKSA9PiB7XHJcblx0XHRcdFx0aW5zdGFuY2UuaGFuZGxlRXJyb3IoZXJyKVxyXG5cdFx0XHRcdHJlamVjdCh7ZXJyb3I6IHRydWV9KVxyXG5cdFx0XHR9KVxyXG5cdFx0fSlcclxuXHR9XHJcblxyXG5cdHJlYWRMaXN0KHBhcmFtcyk6IFByb21pc2U8YW55PiB7XHJcblx0XHRjb25zdCBpbnN0YW5jZSA9IHRoaXNcclxuXHRcdHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcblx0XHRcdGNvKGZ1bmN0aW9uKigpIHtcclxuXHRcdFx0XHRyZXR1cm4geWllbGQgaW5zdGFuY2UucmVxdWVzdFNlcnZpY2UucnVuKCdnZXQnLCBgJHtpbnN0YW5jZS5iYXNlVXJsfWAsIHtcclxuXHRcdFx0XHRcdGhlYWRlcnM6IGluc3RhbmNlLmhlYWRlcnMsXHJcblx0XHRcdFx0XHRwYXJhbXM6IGluc3RhbmNlLnN0cmluZ2lmeUdldFBhcmFtcyhpbnN0YW5jZS5lbXB0eVRvTnVsbChwYXJhbXMpKVxyXG5cdFx0XHRcdH0pXHJcblx0XHRcdH0pLnRoZW4oKHJlcykgPT4gcmVzb2x2ZShyZXMpLCAoZXJyKSA9PiB7XHJcblx0XHRcdFx0aW5zdGFuY2UuaGFuZGxlRXJyb3IoZXJyKVxyXG5cdFx0XHRcdHJlamVjdCh7ZXJyb3I6IHRydWV9KVxyXG5cdFx0XHR9KVxyXG5cdFx0fSlcclxuXHR9XHJcblxyXG5cdHJlYWRTdHJlYW1MaXN0KFxyXG5cdFx0cGFyYW1zOiB7W2tleTogc3RyaW5nXTogYW55fSxcclxuXHRcdG9uTWVzc2FnZTogRnVuY3Rpb24sXHJcblx0XHRvcHRpb25zPzoge29uRXJyb3I/OiBGdW5jdGlvbiwgcmVjb25uZWN0QXR0ZW1wdEludGVydmFsPzogbnVtYmVyLCByZWNvbm5lY3RBdHRlbXB0c0xlZnQ/OiBudW1iZXJ9XHJcblx0KTogRXZlbnRTb3VyY2Uge1xyXG5cdFx0Y29uc3Qge29uRXJyb3IsIHJlY29ubmVjdEF0dGVtcHRJbnRlcnZhbCwgcmVjb25uZWN0QXR0ZW1wdHNMZWZ0fSA9IG9wdGlvbnMgfHwge30gYXMgYW55LFxyXG5cdFx0XHRlcnJvckhhbmRsZXIgPSBvbkVycm9yID8gb25FcnJvciA6IHRoaXMuaGFuZGxlRXJyb3IuYmluZCh0aGlzKVxyXG5cdFx0bGV0IHVybCA9IGAke3dpbmRvdy5sb2NhdGlvbi5vcmlnaW59JHt0aGlzLmJhc2VVcmx9L3N0cmVhbUxpc3RgLFxyXG5cdFx0XHRzdHJpbmdpZmllZFBhcmFtcyA9IHRoaXMuc3RyaW5naWZ5R2V0UGFyYW1zKHRoaXMuZW1wdHlUb051bGwocGFyYW1zKSksXHJcblx0XHRcdGZpcnN0UGFyYW0gPSB0cnVlXHJcblx0XHRmb3IgKGNvbnN0IGtleSBpbiBzdHJpbmdpZmllZFBhcmFtcykge1xyXG5cdFx0XHRpZiAoZmlyc3RQYXJhbSkge1xyXG5cdFx0XHRcdGZpcnN0UGFyYW0gPSBmYWxzZVxyXG5cdFx0XHRcdHVybCArPSAnPydcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHR1cmwgKz0gJyYnXHJcblx0XHRcdH1cclxuXHRcdFx0dXJsICs9IGAke2tleX09JHtzdHJpbmdpZmllZFBhcmFtc1trZXldfWBcclxuXHRcdH1cclxuXHRcdGxldCBldmVudFNvdXJjZSA9IG5ldyBFdmVudFNvdXJjZSh1cmwpXHJcblx0XHRldmVudFNvdXJjZS5vbm1lc3NhZ2UgPSAoZXZlbnQpID0+IG9uTWVzc2FnZShldmVudClcclxuXHRcdGV2ZW50U291cmNlLm9uZXJyb3IgPSAoZXJyKSA9PiB7XHJcblx0XHRcdGVycm9ySGFuZGxlcihlcnIpXHJcblx0XHRcdGlmICgodHlwZW9mIHJlY29ubmVjdEF0dGVtcHRzTGVmdCA9PT0gJ3VuZGVmaW5lZCcpIHx8IHJlY29ubmVjdEF0dGVtcHRzTGVmdCA+IDApIHtcclxuXHRcdFx0XHRldmVudFNvdXJjZS5jbG9zZSgpXHJcblx0XHRcdFx0c2V0VGltZW91dCgoKSA9PiB7XHJcblx0XHRcdFx0XHR0aGlzLnJlYWRTdHJlYW1MaXN0KFxyXG5cdFx0XHRcdFx0XHRwYXJhbXMsXHJcblx0XHRcdFx0XHRcdG9uTWVzc2FnZSwge1xyXG5cdFx0XHRcdFx0XHRcdC4uLm9wdGlvbnMsXHJcblx0XHRcdFx0XHRcdFx0cmVjb25uZWN0QXR0ZW1wdHNMZWZ0OiB0eXBlb2YgcmVjb25uZWN0QXR0ZW1wdHNMZWZ0ID09PSAnbnVtYmVyJyA/IHJlY29ubmVjdEF0dGVtcHRzTGVmdCAtIDEgOiB1bmRlZmluZWRcclxuXHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0KVxyXG5cdFx0XHRcdH0sIHJlY29ubmVjdEF0dGVtcHRJbnRlcnZhbCB8fCA1MDAwKVxyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0XHRyZXR1cm4gZXZlbnRTb3VyY2VcclxuXHR9XHJcblxyXG5cdHJlYWRTZWxlY3RMaXN0KHBhcmFtcyk6IFByb21pc2U8YW55PiB7XHJcblx0XHRjb25zdCBpbnN0YW5jZSA9IHRoaXNcclxuXHRcdHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcblx0XHRcdGNvKGZ1bmN0aW9uKigpIHtcclxuXHRcdFx0XHRyZXR1cm4geWllbGQgaW5zdGFuY2UucmVxdWVzdFNlcnZpY2UucnVuKCdnZXQnLCBgJHtpbnN0YW5jZS5iYXNlVXJsfS9zZWxlY3RMaXN0YCwge1xyXG5cdFx0XHRcdFx0aGVhZGVyczogaW5zdGFuY2UuaGVhZGVycyxcclxuXHRcdFx0XHRcdHBhcmFtczogaW5zdGFuY2Uuc3RyaW5naWZ5R2V0UGFyYW1zKGluc3RhbmNlLmVtcHR5VG9OdWxsKHBhcmFtcykpXHJcblx0XHRcdFx0fSlcclxuXHRcdFx0fSkudGhlbigocmVzKSA9PiByZXNvbHZlKHJlcyksIChlcnIpID0+IHtcclxuXHRcdFx0XHRpbnN0YW5jZS5oYW5kbGVFcnJvcihlcnIpXHJcblx0XHRcdFx0cmVqZWN0KHtlcnJvcjogdHJ1ZX0pXHJcblx0XHRcdH0pXHJcblx0XHR9KVxyXG5cdH1cclxuXHJcblx0dXBkYXRlKHBhcmFtcyk6IFByb21pc2U8YW55PiB7XHJcblx0XHRjb25zdCBpbnN0YW5jZSA9IHRoaXNcclxuXHRcdHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcblx0XHRcdGNvKGZ1bmN0aW9uKigpIHtcclxuXHRcdFx0XHRyZXR1cm4geWllbGQgaW5zdGFuY2UucmVxdWVzdFNlcnZpY2UucnVuKCdwYXRjaCcsIGAke2luc3RhbmNlLmJhc2VVcmx9L2l0ZW0vJHtwYXJhbXMuaWR9YCwge1xyXG5cdFx0XHRcdFx0aGVhZGVyczogaW5zdGFuY2UuaGVhZGVycyxcclxuXHRcdFx0XHRcdGJvZHk6IGluc3RhbmNlLmVtcHR5VG9OdWxsKHBhcmFtcylcclxuXHRcdFx0XHR9KVxyXG5cdFx0XHR9KS50aGVuKChyZXMpID0+IHJlc29sdmUocmVzKSwgKGVycikgPT4ge1xyXG5cdFx0XHRcdGluc3RhbmNlLmhhbmRsZUVycm9yKGVycilcclxuXHRcdFx0XHRyZWplY3Qoe2Vycm9yOiB0cnVlfSlcclxuXHRcdFx0fSlcclxuXHRcdH0pXHJcblx0fVxyXG5cclxuXHRidWxrVXBzZXJ0KHBhcmFtcyk6IFByb21pc2U8YW55PiB7XHJcblx0XHRjb25zdCBpbnN0YW5jZSA9IHRoaXNcclxuXHRcdHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcblx0XHRcdGNvKGZ1bmN0aW9uKigpIHtcclxuXHRcdFx0XHRyZXR1cm4geWllbGQgaW5zdGFuY2UucmVxdWVzdFNlcnZpY2UucnVuKCdwdXQnLCBgJHtpbnN0YW5jZS5iYXNlVXJsfWAsIHtcclxuXHRcdFx0XHRcdGhlYWRlcnM6IGluc3RhbmNlLmhlYWRlcnMsXHJcblx0XHRcdFx0XHRib2R5OiBpbnN0YW5jZS5lbXB0eVRvTnVsbChwYXJhbXMpXHJcblx0XHRcdFx0fSlcclxuXHRcdFx0fSkudGhlbigocmVzKSA9PiByZXNvbHZlKHJlcyksIChlcnIpID0+IHtcclxuXHRcdFx0XHRpbnN0YW5jZS5oYW5kbGVFcnJvcihlcnIpXHJcblx0XHRcdFx0cmVqZWN0KHtlcnJvcjogdHJ1ZX0pXHJcblx0XHRcdH0pXHJcblx0XHR9KVxyXG5cdH1cclxuXHJcblx0ZGVsZXRlKHBhcmFtcyk6IFByb21pc2U8YW55PiB7XHJcblx0XHRjb25zdCBpbnN0YW5jZSA9IHRoaXNcclxuXHRcdHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcblx0XHRcdGNvKGZ1bmN0aW9uKigpIHtcclxuXHRcdFx0XHRyZXR1cm4geWllbGQgaW5zdGFuY2UucmVxdWVzdFNlcnZpY2UucnVuKCdkZWxldGUnLCBgJHtpbnN0YW5jZS5iYXNlVXJsfS8ke3BhcmFtcy5pZH1gLCB7XHJcblx0XHRcdFx0XHRoZWFkZXJzOiBpbnN0YW5jZS5oZWFkZXJzLFxyXG5cdFx0XHRcdFx0Ym9keTogaW5zdGFuY2UuZW1wdHlUb051bGwocGFyYW1zKVxyXG5cdFx0XHRcdH0pXHJcblx0XHRcdH0pLnRoZW4oKHJlcykgPT4gcmVzb2x2ZShyZXMpLCAoZXJyKSA9PiB7XHJcblx0XHRcdFx0aW5zdGFuY2UuaGFuZGxlRXJyb3IoZXJyKVxyXG5cdFx0XHRcdHJlamVjdCh7ZXJyb3I6IHRydWV9KVxyXG5cdFx0XHR9KVxyXG5cdFx0fSlcclxuXHR9XHJcbn1cclxuIl19