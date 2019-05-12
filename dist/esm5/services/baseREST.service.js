/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import co from 'co';
import { HttpHeaders } from '@angular/common/http';
import { GlobalEventsService } from './globalEvents/globalEvents.service';
import { Injectable } from '@angular/core';
import { RequestService } from './request.service';
import { Subject } from 'rxjs';
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
    BaseRESTService.prototype.streamReadList = /**
     * @param {?} params
     * @param {?} onMessage
     * @param {?=} options
     * @return {?}
     */
    function (params, onMessage, options) {
        /** @type {?} */
        var actualOptions = options || {};
        var onError = actualOptions.onError, reconnectAttemptInterval = actualOptions.reconnectAttemptInterval;
        /** @type {?} */
        var errorHandler = onError ? onError : this.handleError.bind(this);
        /** @type {?} */
        var reconnectAttemptsLeft = actualOptions.reconnectAttemptsLeft;
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
        /** @type {?} */
        var closeSubject = new Subject();
        /** @type {?} */
        var reconnectAllowed = { value: true };
        eventSource.onmessage = (/**
         * @param {?} event
         * @return {?}
         */
        function (event) { return onMessage(event); });
        eventSource.onerror = (/**
         * @param {?} err
         * @return {?}
         */
        function (err) { return errorHandler(err); });
        /** @type {?} */
        var interval = setInterval((/**
         * @return {?}
         */
        function () {
            if ((eventSource.CLOSED === 2) &&
                reconnectAllowed.value &&
                ((typeof reconnectAttemptsLeft === 'undefined') || reconnectAttemptsLeft > 0)) {
                eventSource = new EventSource(url);
                eventSource.onmessage = (/**
                 * @param {?} event
                 * @return {?}
                 */
                function (event) { return onMessage(event); });
                eventSource.onerror = (/**
                 * @param {?} err
                 * @return {?}
                 */
                function (err) { return errorHandler(err); });
                if (typeof reconnectAttemptsLeft !== 'undefined') {
                    reconnectAttemptsLeft--;
                }
                return;
            }
            clearInterval(interval);
        }), reconnectAttemptInterval || 5000);
        closeSubject.subscribe((/**
         * @return {?}
         */
        function () {
            reconnectAllowed.value = false;
            eventSource.close();
        }));
        return closeSubject;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFzZVJFU1Quc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL3JhbXN0ZXItdWktY29yZS8iLCJzb3VyY2VzIjpbInNlcnZpY2VzL2Jhc2VSRVNULnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQUUsTUFBTSxJQUFJLENBQUE7QUFDbkIsT0FBTyxFQUFDLFdBQVcsRUFBQyxNQUFNLHNCQUFzQixDQUFBO0FBQ2hELE9BQU8sRUFBQyxtQkFBbUIsRUFBQyxNQUFNLHFDQUFxQyxDQUFBO0FBQ3ZFLE9BQU8sRUFBQyxVQUFVLEVBQUMsTUFBTSxlQUFlLENBQUE7QUFDeEMsT0FBTyxFQUFDLGNBQWMsRUFBQyxNQUFNLG1CQUFtQixDQUFBO0FBQ2hELE9BQU8sRUFBQyxPQUFPLEVBQUMsTUFBTSxNQUFNLENBQUE7QUFFNUI7SUFNQyx5QkFDUSxtQkFBd0MsRUFDeEMsY0FBOEI7UUFEOUIsd0JBQW1CLEdBQW5CLG1CQUFtQixDQUFxQjtRQUN4QyxtQkFBYyxHQUFkLGNBQWMsQ0FBZ0I7UUFOdEMsWUFBTyxHQUFHLEdBQUcsQ0FBQTtRQUNiLFlBQU8sR0FBRyxJQUFJLFdBQVcsQ0FBQyxFQUFDLGNBQWMsRUFBRSxrQkFBa0IsRUFBQyxDQUFDLENBQUE7UUFDL0QsMkJBQXNCLEdBQVksSUFBSSxDQUFBO0lBS25DLENBQUM7Ozs7O0lBRUoscUNBQVc7Ozs7SUFBWCxVQUFZLElBQVM7UUFBckIsaUJBa0JDO1FBakJBLElBQUksSUFBSSxLQUFLLEVBQUUsRUFBRTtZQUNoQixPQUFPLElBQUksQ0FBQTtTQUNYO1FBQ0QsSUFBSSxJQUFJLFlBQVksSUFBSSxFQUFFO1lBQ3pCLE9BQU8sSUFBSSxDQUFBO1NBQ1g7UUFDRCxJQUFJLElBQUksWUFBWSxLQUFLLEVBQUU7WUFDMUIsT0FBTyxJQUFJLENBQUMsR0FBRzs7Ozs7WUFBQyxVQUFDLElBQUksRUFBRSxLQUFLLElBQUssT0FBQSxLQUFJLENBQUMsV0FBVyxDQUFDLElBQUks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QUFBO2dCQUN6QixNQUFNLENBQUMsRUFBQyxLQUFLLEVBQUUsSUFBSSxFQUFDLENBQUMsQ0FBQTtZQUN0QixDQUFDLEVBQUMsQ0FBQTtRQUNILENBQUMsRUFBQyxDQUFBO0lBQ0gsQ0FBQzs7Ozs7SUFFRCxnQ0FBTTs7OztJQUFOLFVBQU8sTUFBTTs7WUFDTixRQUFRLEdBQUcsSUFBSTtRQUNyQixPQUFPLElBQUksT0FBTzs7Ozs7UUFBQyxVQUFDLE9BQU8sRUFBRSxNQUFNO1lBQ2xDLEVBQUU7OztZQUFDOzs7Z0NBQ0sscUJBQU0sUUFBUSxDQUFDLGNBQWMsQ0FBQyxHQUFHLENBQUMsUUFBUSxFQUFLLFFBQVEsQ0FBQyxPQUFPLFNBQUksTUFBTSxDQUFDLEVBQUksRUFBRTtnQ0FDdEYsT0FBTyxFQUFFLFFBQVEsQ0FBQyxPQUFPO2dDQUN6QixJQUFJLEVBQUUsUUFBUSxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUM7NkJBQ2xDLENBQUMsRUFBQTtnQ0FIRixzQkFBTyxTQUdMLEVBQUE7OzthQUNGLEVBQUMsQ0FBQyxJQUFJOzs7O1lBQUMsVUFBQyxHQUFHLElBQUssT0FBQSxPQUFPLENBQUMsR0FBRyxDQUFDLEVBQVosQ0FBWTs7OztZQUFFLFVBQUMsR0FBRztnQkFDbEMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsQ0FBQTtnQkFDekIsTUFBTSxDQUFDLEVBQUMsS0FBSyxFQUFFLElBQUksRUFBQyxDQUFDLENBQUE7WUFDdEIsQ0FBQyxFQUFDLENBQUE7UUFDSCxDQUFDLEVBQUMsQ0FBQTtJQUNILENBQUM7O2dCQXJORCxVQUFVOzs7O2dCQUxILG1CQUFtQjtnQkFFbkIsY0FBYzs7SUF5TnRCLHNCQUFDO0NBQUEsQUF0TkQsSUFzTkM7U0FyTlksZUFBZTs7O0lBQzNCLGtDQUFhOztJQUNiLGtDQUErRDs7SUFDL0QsaURBQXNDOztJQUdyQyw4Q0FBK0M7O0lBQy9DLHlDQUFxQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBjbyBmcm9tICdjbydcclxuaW1wb3J0IHtIdHRwSGVhZGVyc30gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnXHJcbmltcG9ydCB7R2xvYmFsRXZlbnRzU2VydmljZX0gZnJvbSAnLi9nbG9iYWxFdmVudHMvZ2xvYmFsRXZlbnRzLnNlcnZpY2UnXHJcbmltcG9ydCB7SW5qZWN0YWJsZX0gZnJvbSAnQGFuZ3VsYXIvY29yZSdcclxuaW1wb3J0IHtSZXF1ZXN0U2VydmljZX0gZnJvbSAnLi9yZXF1ZXN0LnNlcnZpY2UnXHJcbmltcG9ydCB7U3ViamVjdH0gZnJvbSAncnhqcydcclxuXHJcbkBJbmplY3RhYmxlKClcclxuZXhwb3J0IGNsYXNzIEJhc2VSRVNUU2VydmljZSB7XHJcblx0YmFzZVVybCA9ICcvJ1xyXG5cdGhlYWRlcnMgPSBuZXcgSHR0cEhlYWRlcnMoeydDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbid9KVxyXG5cdHJlZGlyZWN0T25Gb3JiaWRkZW5Vcmw/OiBzdHJpbmcgPSBudWxsXHJcblxyXG5cdGNvbnN0cnVjdG9yKFxyXG5cdFx0cHVibGljIGdsb2JhbEV2ZW50c1NlcnZpY2U6IEdsb2JhbEV2ZW50c1NlcnZpY2UsXHJcblx0XHRwdWJsaWMgcmVxdWVzdFNlcnZpY2U6IFJlcXVlc3RTZXJ2aWNlXHJcblx0KSB7fVxyXG5cclxuXHRlbXB0eVRvTnVsbChkYXRhOiBhbnkpOiBhbnkge1xyXG5cdFx0aWYgKGRhdGEgPT09ICcnKSB7XHJcblx0XHRcdHJldHVybiBudWxsXHJcblx0XHR9XHJcblx0XHRpZiAoZGF0YSBpbnN0YW5jZW9mIERhdGUpIHtcclxuXHRcdFx0cmV0dXJuIGRhdGFcclxuXHRcdH1cclxuXHRcdGlmIChkYXRhIGluc3RhbmNlb2YgQXJyYXkpIHtcclxuXHRcdFx0cmV0dXJuIGRhdGEubWFwKChpdGVtLCBpbmRleCkgPT4gdGhpcy5lbXB0eVRvTnVsbChpdGVtKSlcclxuXHRcdH1cclxuXHRcdGlmICgodHlwZW9mIGRhdGEgPT09ICdvYmplY3QnKSAmJiAoZGF0YSAhPT0gbnVsbCkpIHtcclxuXHRcdFx0Y29uc3QgcGFyc2VkRGF0YSA9IHt9XHJcblx0XHRcdGZvciAoY29uc3Qga2V5IGluIGRhdGEpIHtcclxuXHRcdFx0XHRwYXJzZWREYXRhW2tleV0gPSB0aGlzLmVtcHR5VG9OdWxsKGRhdGFba2V5XSlcclxuXHRcdFx0fVxyXG5cdFx0XHRyZXR1cm4gcGFyc2VkRGF0YVxyXG5cdFx0fVxyXG5cdFx0cmV0dXJuIGRhdGFcclxuXHR9XHJcblxyXG5cdHN0cmluZ2lmeUdldFBhcmFtcyhkYXRhOiB7W2tleTogc3RyaW5nXTogYW55fSk6IHtba2V5OiBzdHJpbmddOiBhbnl9IHtcclxuXHRcdGxldCBzdHJpbmdpZmllZE9iamVjdCA9IHt9XHJcblx0XHRmb3IgKGNvbnN0IGtleSBpbiBkYXRhKSB7XHJcblx0XHRcdGNvbnN0IHZhbHVlID0gZGF0YVtrZXldXHJcblx0XHRcdGlmICgodmFsdWUgaW5zdGFuY2VvZiBBcnJheSkgfHwgKCh0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnKSAmJiAodmFsdWUgIT09IG51bGwpICYmICEodmFsdWUgaW5zdGFuY2VvZiBEYXRlKSkpIHtcclxuXHRcdFx0XHRzdHJpbmdpZmllZE9iamVjdFtgX2pzb25fJHtrZXl9YF0gPSBKU09OLnN0cmluZ2lmeSh2YWx1ZSlcclxuXHRcdFx0XHRjb250aW51ZVxyXG5cdFx0XHR9XHJcblx0XHRcdHN0cmluZ2lmaWVkT2JqZWN0W2tleV0gPSB2YWx1ZVxyXG5cdFx0fVxyXG5cdFx0cmV0dXJuIHN0cmluZ2lmaWVkT2JqZWN0XHJcblx0fVxyXG5cclxuXHRoYW5kbGVFcnJvcihlcnI6IGFueSwgb3B0aW9ucz86IHtub3RpZnlPbkVycm9yPzogYm9vbGVhbn0pOiB2b2lkIHtcclxuXHRcdGNvbnN0IHtub3RpZnlPbkVycm9yfSA9IG9wdGlvbnMgfHwge30gYXMgYW55XHJcblx0XHRpZiAoIWVycikge1xyXG5cdFx0XHRpZiAobm90aWZ5T25FcnJvciAhPT0gZmFsc2UpIHtcclxuXHRcdFx0XHR0aGlzLmdsb2JhbEV2ZW50c1NlcnZpY2Uubm90aWZ5KCdlcnJvcicsICdBbiBlcnJvciBoYXMgb2NjdXJyZWQuJylcclxuXHRcdFx0fVxyXG5cdFx0XHRyZXR1cm5cclxuXHRcdH1cclxuXHRcdGlmICh0aGlzLnJlZGlyZWN0T25Gb3JiaWRkZW5VcmwgJiYgKGVyci5zdGF0dXMgPT09IDQwMSkpIHtcclxuXHRcdFx0dGhpcy5nbG9iYWxFdmVudHNTZXJ2aWNlLnJlZGlyZWN0KHRoaXMucmVkaXJlY3RPbkZvcmJpZGRlblVybClcclxuXHRcdFx0cmV0dXJuXHJcblx0XHR9XHJcblx0XHRpZiAobm90aWZ5T25FcnJvciAhPT0gZmFsc2UpIHtcclxuXHRcdFx0dGhpcy5nbG9iYWxFdmVudHNTZXJ2aWNlLm5vdGlmeSgnZXJyb3InLCBlcnIuZXJyb3IgJiYgZXJyLmVycm9yLmVycm9yIHx8ICdBbiBlcnJvciBoYXMgb2NjdXJyZWQuJylcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdGNyZWF0ZShwYXJhbXMpOiBQcm9taXNlPGFueT4ge1xyXG5cdFx0Y29uc3QgaW5zdGFuY2UgPSB0aGlzXHJcblx0XHRyZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG5cdFx0XHRjbyhmdW5jdGlvbiooKSB7XHJcblx0XHRcdFx0cmV0dXJuIHlpZWxkIGluc3RhbmNlLnJlcXVlc3RTZXJ2aWNlLnJ1bigncG9zdCcsIGAke2luc3RhbmNlLmJhc2VVcmx9YCwge1xyXG5cdFx0XHRcdFx0aGVhZGVyczogaW5zdGFuY2UuaGVhZGVycyxcclxuXHRcdFx0XHRcdGJvZHk6IGluc3RhbmNlLmVtcHR5VG9OdWxsKHBhcmFtcylcclxuXHRcdFx0XHR9KVxyXG5cdFx0XHR9KS50aGVuKChyZXMpID0+IHJlc29sdmUocmVzKSwgKGVycikgPT4ge1xyXG5cdFx0XHRcdGluc3RhbmNlLmhhbmRsZUVycm9yKGVycilcclxuXHRcdFx0XHRyZWplY3Qoe2Vycm9yOiB0cnVlfSlcclxuXHRcdFx0fSlcclxuXHRcdH0pXHJcblx0fVxyXG5cclxuXHRyZWFkKHBhcmFtcyk6IFByb21pc2U8YW55PiB7XHJcblx0XHRjb25zdCBpbnN0YW5jZSA9IHRoaXNcclxuXHRcdHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcblx0XHRcdGNvKGZ1bmN0aW9uKigpIHtcclxuXHRcdFx0XHRyZXR1cm4geWllbGQgaW5zdGFuY2UucmVxdWVzdFNlcnZpY2UucnVuKCdnZXQnLCBgJHtpbnN0YW5jZS5iYXNlVXJsfS9pdGVtYCwge1xyXG5cdFx0XHRcdFx0aGVhZGVyczogaW5zdGFuY2UuaGVhZGVycyxcclxuXHRcdFx0XHRcdHBhcmFtczogaW5zdGFuY2Uuc3RyaW5naWZ5R2V0UGFyYW1zKGluc3RhbmNlLmVtcHR5VG9OdWxsKHBhcmFtcykpXHJcblx0XHRcdFx0fSlcclxuXHRcdFx0fSkudGhlbigocmVzKSA9PiByZXNvbHZlKHJlcyksIChlcnIpID0+IHtcclxuXHRcdFx0XHRpbnN0YW5jZS5oYW5kbGVFcnJvcihlcnIpXHJcblx0XHRcdFx0cmVqZWN0KHtlcnJvcjogdHJ1ZX0pXHJcblx0XHRcdH0pXHJcblx0XHR9KVxyXG5cdH1cclxuXHJcblx0cmVhZExpc3QocGFyYW1zKTogUHJvbWlzZTxhbnk+IHtcclxuXHRcdGNvbnN0IGluc3RhbmNlID0gdGhpc1xyXG5cdFx0cmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuXHRcdFx0Y28oZnVuY3Rpb24qKCkge1xyXG5cdFx0XHRcdHJldHVybiB5aWVsZCBpbnN0YW5jZS5yZXF1ZXN0U2VydmljZS5ydW4oJ2dldCcsIGAke2luc3RhbmNlLmJhc2VVcmx9YCwge1xyXG5cdFx0XHRcdFx0aGVhZGVyczogaW5zdGFuY2UuaGVhZGVycyxcclxuXHRcdFx0XHRcdHBhcmFtczogaW5zdGFuY2Uuc3RyaW5naWZ5R2V0UGFyYW1zKGluc3RhbmNlLmVtcHR5VG9OdWxsKHBhcmFtcykpXHJcblx0XHRcdFx0fSlcclxuXHRcdFx0fSkudGhlbigocmVzKSA9PiByZXNvbHZlKHJlcyksIChlcnIpID0+IHtcclxuXHRcdFx0XHRpbnN0YW5jZS5oYW5kbGVFcnJvcihlcnIpXHJcblx0XHRcdFx0cmVqZWN0KHtlcnJvcjogdHJ1ZX0pXHJcblx0XHRcdH0pXHJcblx0XHR9KVxyXG5cdH1cclxuXHJcblx0c3RyZWFtUmVhZExpc3QoXHJcblx0XHRwYXJhbXM6IHtba2V5OiBzdHJpbmddOiBhbnl9LFxyXG5cdFx0b25NZXNzYWdlOiBGdW5jdGlvbixcclxuXHRcdG9wdGlvbnM/OiB7b25FcnJvcj86IEZ1bmN0aW9uLCByZWNvbm5lY3RBdHRlbXB0SW50ZXJ2YWw/OiBudW1iZXIsIHJlY29ubmVjdEF0dGVtcHRzTGVmdD86IG51bWJlcn1cclxuXHQpOiBTdWJqZWN0PHZvaWQ+IHtcclxuXHRcdGNvbnN0IGFjdHVhbE9wdGlvbnMgPSBvcHRpb25zIHx8IHt9LFxyXG5cdFx0XHR7b25FcnJvciwgcmVjb25uZWN0QXR0ZW1wdEludGVydmFsfSA9IGFjdHVhbE9wdGlvbnMsXHJcblx0XHRcdGVycm9ySGFuZGxlciA9IG9uRXJyb3IgPyBvbkVycm9yIDogdGhpcy5oYW5kbGVFcnJvci5iaW5kKHRoaXMpXHJcblx0XHRsZXQgcmVjb25uZWN0QXR0ZW1wdHNMZWZ0ID0gYWN0dWFsT3B0aW9ucy5yZWNvbm5lY3RBdHRlbXB0c0xlZnQsXHJcblx0XHRcdHVybCA9IGAke3dpbmRvdy5sb2NhdGlvbi5vcmlnaW59JHt0aGlzLmJhc2VVcmx9L3N0cmVhbUxpc3RgLFxyXG5cdFx0XHRzdHJpbmdpZmllZFBhcmFtcyA9IHRoaXMuc3RyaW5naWZ5R2V0UGFyYW1zKHRoaXMuZW1wdHlUb051bGwocGFyYW1zKSksXHJcblx0XHRcdGZpcnN0UGFyYW0gPSB0cnVlXHJcblx0XHRmb3IgKGNvbnN0IGtleSBpbiBzdHJpbmdpZmllZFBhcmFtcykge1xyXG5cdFx0XHRpZiAoZmlyc3RQYXJhbSkge1xyXG5cdFx0XHRcdGZpcnN0UGFyYW0gPSBmYWxzZVxyXG5cdFx0XHRcdHVybCArPSAnPydcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHR1cmwgKz0gJyYnXHJcblx0XHRcdH1cclxuXHRcdFx0dXJsICs9IGAke2tleX09JHtzdHJpbmdpZmllZFBhcmFtc1trZXldfWBcclxuXHRcdH1cclxuXHRcdGxldCBldmVudFNvdXJjZSA9IG5ldyBFdmVudFNvdXJjZSh1cmwpLFxyXG5cdFx0XHRjbG9zZVN1YmplY3QgPSBuZXcgU3ViamVjdDx2b2lkPigpLFxyXG5cdFx0XHRyZWNvbm5lY3RBbGxvd2VkID0ge3ZhbHVlOiB0cnVlfVxyXG5cdFx0ZXZlbnRTb3VyY2Uub25tZXNzYWdlID0gKGV2ZW50KSA9PiBvbk1lc3NhZ2UoZXZlbnQpXHJcblx0XHRldmVudFNvdXJjZS5vbmVycm9yID0gKGVycikgPT4gZXJyb3JIYW5kbGVyKGVycilcclxuXHRcdGxldCBpbnRlcnZhbCA9IHNldEludGVydmFsKCgpID0+IHtcclxuXHRcdFx0aWYgKFxyXG5cdFx0XHRcdChldmVudFNvdXJjZS5DTE9TRUQgPT09IDIpICYmXHJcblx0XHRcdFx0cmVjb25uZWN0QWxsb3dlZC52YWx1ZSAmJlxyXG5cdFx0XHRcdCgodHlwZW9mIHJlY29ubmVjdEF0dGVtcHRzTGVmdCA9PT0gJ3VuZGVmaW5lZCcpIHx8IHJlY29ubmVjdEF0dGVtcHRzTGVmdCA+IDApXHJcblx0XHRcdCkge1xyXG5cdFx0XHRcdGV2ZW50U291cmNlID0gbmV3IEV2ZW50U291cmNlKHVybClcclxuXHRcdFx0XHRldmVudFNvdXJjZS5vbm1lc3NhZ2UgPSAoZXZlbnQpID0+IG9uTWVzc2FnZShldmVudClcclxuXHRcdFx0XHRldmVudFNvdXJjZS5vbmVycm9yID0gKGVycikgPT4gZXJyb3JIYW5kbGVyKGVycilcclxuXHRcdFx0XHRpZiAodHlwZW9mIHJlY29ubmVjdEF0dGVtcHRzTGVmdCAhPT0gJ3VuZGVmaW5lZCcpIHtcclxuXHRcdFx0XHRcdHJlY29ubmVjdEF0dGVtcHRzTGVmdC0tXHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdHJldHVyblxyXG5cdFx0XHR9XHJcblx0XHRcdGNsZWFySW50ZXJ2YWwoaW50ZXJ2YWwpXHJcblx0XHR9LCByZWNvbm5lY3RBdHRlbXB0SW50ZXJ2YWwgfHwgNTAwMClcclxuXHRcdGNsb3NlU3ViamVjdC5zdWJzY3JpYmUoKCkgPT4ge1xyXG5cdFx0XHRyZWNvbm5lY3RBbGxvd2VkLnZhbHVlID0gZmFsc2VcclxuXHRcdFx0ZXZlbnRTb3VyY2UuY2xvc2UoKVxyXG5cdFx0fSlcclxuXHRcdHJldHVybiBjbG9zZVN1YmplY3RcclxuXHR9XHJcblxyXG5cdHJlYWRTZWxlY3RMaXN0KHBhcmFtcyk6IFByb21pc2U8YW55PiB7XHJcblx0XHRjb25zdCBpbnN0YW5jZSA9IHRoaXNcclxuXHRcdHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcblx0XHRcdGNvKGZ1bmN0aW9uKigpIHtcclxuXHRcdFx0XHRyZXR1cm4geWllbGQgaW5zdGFuY2UucmVxdWVzdFNlcnZpY2UucnVuKCdnZXQnLCBgJHtpbnN0YW5jZS5iYXNlVXJsfS9zZWxlY3RMaXN0YCwge1xyXG5cdFx0XHRcdFx0aGVhZGVyczogaW5zdGFuY2UuaGVhZGVycyxcclxuXHRcdFx0XHRcdHBhcmFtczogaW5zdGFuY2Uuc3RyaW5naWZ5R2V0UGFyYW1zKGluc3RhbmNlLmVtcHR5VG9OdWxsKHBhcmFtcykpXHJcblx0XHRcdFx0fSlcclxuXHRcdFx0fSkudGhlbigocmVzKSA9PiByZXNvbHZlKHJlcyksIChlcnIpID0+IHtcclxuXHRcdFx0XHRpbnN0YW5jZS5oYW5kbGVFcnJvcihlcnIpXHJcblx0XHRcdFx0cmVqZWN0KHtlcnJvcjogdHJ1ZX0pXHJcblx0XHRcdH0pXHJcblx0XHR9KVxyXG5cdH1cclxuXHJcblx0dXBkYXRlKHBhcmFtcyk6IFByb21pc2U8YW55PiB7XHJcblx0XHRjb25zdCBpbnN0YW5jZSA9IHRoaXNcclxuXHRcdHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcblx0XHRcdGNvKGZ1bmN0aW9uKigpIHtcclxuXHRcdFx0XHRyZXR1cm4geWllbGQgaW5zdGFuY2UucmVxdWVzdFNlcnZpY2UucnVuKCdwYXRjaCcsIGAke2luc3RhbmNlLmJhc2VVcmx9L2l0ZW0vJHtwYXJhbXMuaWR9YCwge1xyXG5cdFx0XHRcdFx0aGVhZGVyczogaW5zdGFuY2UuaGVhZGVycyxcclxuXHRcdFx0XHRcdGJvZHk6IGluc3RhbmNlLmVtcHR5VG9OdWxsKHBhcmFtcylcclxuXHRcdFx0XHR9KVxyXG5cdFx0XHR9KS50aGVuKChyZXMpID0+IHJlc29sdmUocmVzKSwgKGVycikgPT4ge1xyXG5cdFx0XHRcdGluc3RhbmNlLmhhbmRsZUVycm9yKGVycilcclxuXHRcdFx0XHRyZWplY3Qoe2Vycm9yOiB0cnVlfSlcclxuXHRcdFx0fSlcclxuXHRcdH0pXHJcblx0fVxyXG5cclxuXHRidWxrVXBzZXJ0KHBhcmFtcyk6IFByb21pc2U8YW55PiB7XHJcblx0XHRjb25zdCBpbnN0YW5jZSA9IHRoaXNcclxuXHRcdHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcblx0XHRcdGNvKGZ1bmN0aW9uKigpIHtcclxuXHRcdFx0XHRyZXR1cm4geWllbGQgaW5zdGFuY2UucmVxdWVzdFNlcnZpY2UucnVuKCdwdXQnLCBgJHtpbnN0YW5jZS5iYXNlVXJsfWAsIHtcclxuXHRcdFx0XHRcdGhlYWRlcnM6IGluc3RhbmNlLmhlYWRlcnMsXHJcblx0XHRcdFx0XHRib2R5OiBpbnN0YW5jZS5lbXB0eVRvTnVsbChwYXJhbXMpXHJcblx0XHRcdFx0fSlcclxuXHRcdFx0fSkudGhlbigocmVzKSA9PiByZXNvbHZlKHJlcyksIChlcnIpID0+IHtcclxuXHRcdFx0XHRpbnN0YW5jZS5oYW5kbGVFcnJvcihlcnIpXHJcblx0XHRcdFx0cmVqZWN0KHtlcnJvcjogdHJ1ZX0pXHJcblx0XHRcdH0pXHJcblx0XHR9KVxyXG5cdH1cclxuXHJcblx0ZGVsZXRlKHBhcmFtcyk6IFByb21pc2U8YW55PiB7XHJcblx0XHRjb25zdCBpbnN0YW5jZSA9IHRoaXNcclxuXHRcdHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcblx0XHRcdGNvKGZ1bmN0aW9uKigpIHtcclxuXHRcdFx0XHRyZXR1cm4geWllbGQgaW5zdGFuY2UucmVxdWVzdFNlcnZpY2UucnVuKCdkZWxldGUnLCBgJHtpbnN0YW5jZS5iYXNlVXJsfS8ke3BhcmFtcy5pZH1gLCB7XHJcblx0XHRcdFx0XHRoZWFkZXJzOiBpbnN0YW5jZS5oZWFkZXJzLFxyXG5cdFx0XHRcdFx0Ym9keTogaW5zdGFuY2UuZW1wdHlUb051bGwocGFyYW1zKVxyXG5cdFx0XHRcdH0pXHJcblx0XHRcdH0pLnRoZW4oKHJlcykgPT4gcmVzb2x2ZShyZXMpLCAoZXJyKSA9PiB7XHJcblx0XHRcdFx0aW5zdGFuY2UuaGFuZGxlRXJyb3IoZXJyKVxyXG5cdFx0XHRcdHJlamVjdCh7ZXJyb3I6IHRydWV9KVxyXG5cdFx0XHR9KVxyXG5cdFx0fSlcclxuXHR9XHJcbn1cclxuIl19