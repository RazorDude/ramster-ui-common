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
        this.fileTooLargeErrorMessage = 'The selected file is too large.';
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
                this.globalEventsService.notify('error', 'An unknown error has occurred.');
            }
            return;
        }
        if (this.redirectOnForbiddenUrl && (err.status === 401)) {
            this.globalEventsService.redirect(this.redirectOnForbiddenUrl);
            return;
        }
        if (err.status === 413) {
            this.globalEventsService.notify('error', this.fileTooLargeErrorMessage);
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
            if ((eventSource.readyState === 2) &&
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
    BaseRESTService.prototype.fileTooLargeErrorMessage;
    /** @type {?} */
    BaseRESTService.prototype.headers;
    /** @type {?} */
    BaseRESTService.prototype.redirectOnForbiddenUrl;
    /** @type {?} */
    BaseRESTService.prototype.globalEventsService;
    /** @type {?} */
    BaseRESTService.prototype.requestService;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFzZVJFU1Quc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL3JhbXN0ZXItdWktY29yZS8iLCJzb3VyY2VzIjpbInNlcnZpY2VzL2Jhc2VSRVNULnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQUUsTUFBTSxJQUFJLENBQUE7QUFDbkIsT0FBTyxFQUFDLFdBQVcsRUFBQyxNQUFNLHNCQUFzQixDQUFBO0FBQ2hELE9BQU8sRUFBQyxtQkFBbUIsRUFBQyxNQUFNLHFDQUFxQyxDQUFBO0FBQ3ZFLE9BQU8sRUFBQyxVQUFVLEVBQUMsTUFBTSxlQUFlLENBQUE7QUFDeEMsT0FBTyxFQUFDLGNBQWMsRUFBQyxNQUFNLG1CQUFtQixDQUFBO0FBQ2hELE9BQU8sRUFBQyxPQUFPLEVBQUMsTUFBTSxNQUFNLENBQUE7QUFFNUI7SUFPQyx5QkFDUSxtQkFBd0MsRUFDeEMsY0FBOEI7UUFEOUIsd0JBQW1CLEdBQW5CLG1CQUFtQixDQUFxQjtRQUN4QyxtQkFBYyxHQUFkLGNBQWMsQ0FBZ0I7UUFQdEMsWUFBTyxHQUFHLEdBQUcsQ0FBQTtRQUNiLDZCQUF3QixHQUFZLGlDQUFpQyxDQUFBO1FBQ3JFLFlBQU8sR0FBRyxJQUFJLFdBQVcsQ0FBQyxFQUFDLGNBQWMsRUFBRSxrQkFBa0IsRUFBQyxDQUFDLENBQUE7UUFDL0QsMkJBQXNCLEdBQVksSUFBSSxDQUFBO0lBS25DLENBQUM7Ozs7O0lBRUoscUNBQVc7Ozs7SUFBWCxVQUFZLElBQVM7UUFBckIsaUJBa0JDO1FBakJBLElBQUksSUFBSSxLQUFLLEVBQUUsRUFBRTtZQUNoQixPQUFPLElBQUksQ0FBQTtTQUNYO1FBQ0QsSUFBSSxJQUFJLFlBQVksSUFBSSxFQUFFO1lBQ3pCLE9BQU8sSUFBSSxDQUFBO1NBQ1g7UUFDRCxJQUFJLElBQUksWUFBWSxLQUFLLEVBQUU7WUFDMUIsT0FBTyxJQUFJLENBQUMsR0FBRzs7Ozs7WUFBQyxVQUFDLElBQUksRUFBRSxLQUFLLElBQUss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Q0FBQSxBQTNORCxJQTJOQztTQTFOWSxlQUFlOzs7SUFDM0Isa0NBQWE7O0lBQ2IsbURBQXFFOztJQUNyRSxrQ0FBK0Q7O0lBQy9ELGlEQUFzQzs7SUFHckMsOENBQStDOztJQUMvQyx5Q0FBcUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgY28gZnJvbSAnY28nXHJcbmltcG9ydCB7SHR0cEhlYWRlcnN9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJ1xyXG5pbXBvcnQge0dsb2JhbEV2ZW50c1NlcnZpY2V9IGZyb20gJy4vZ2xvYmFsRXZlbnRzL2dsb2JhbEV2ZW50cy5zZXJ2aWNlJ1xyXG5pbXBvcnQge0luamVjdGFibGV9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnXHJcbmltcG9ydCB7UmVxdWVzdFNlcnZpY2V9IGZyb20gJy4vcmVxdWVzdC5zZXJ2aWNlJ1xyXG5pbXBvcnQge1N1YmplY3R9IGZyb20gJ3J4anMnXHJcblxyXG5ASW5qZWN0YWJsZSgpXHJcbmV4cG9ydCBjbGFzcyBCYXNlUkVTVFNlcnZpY2Uge1xyXG5cdGJhc2VVcmwgPSAnLydcclxuXHRmaWxlVG9vTGFyZ2VFcnJvck1lc3NhZ2U/OiBzdHJpbmcgPSAnVGhlIHNlbGVjdGVkIGZpbGUgaXMgdG9vIGxhcmdlLidcclxuXHRoZWFkZXJzID0gbmV3IEh0dHBIZWFkZXJzKHsnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nfSlcclxuXHRyZWRpcmVjdE9uRm9yYmlkZGVuVXJsPzogc3RyaW5nID0gbnVsbFxyXG5cclxuXHRjb25zdHJ1Y3RvcihcclxuXHRcdHB1YmxpYyBnbG9iYWxFdmVudHNTZXJ2aWNlOiBHbG9iYWxFdmVudHNTZXJ2aWNlLFxyXG5cdFx0cHVibGljIHJlcXVlc3RTZXJ2aWNlOiBSZXF1ZXN0U2VydmljZVxyXG5cdCkge31cclxuXHJcblx0ZW1wdHlUb051bGwoZGF0YTogYW55KTogYW55IHtcclxuXHRcdGlmIChkYXRhID09PSAnJykge1xyXG5cdFx0XHRyZXR1cm4gbnVsbFxyXG5cdFx0fVxyXG5cdFx0aWYgKGRhdGEgaW5zdGFuY2VvZiBEYXRlKSB7XHJcblx0XHRcdHJldHVybiBkYXRhXHJcblx0XHR9XHJcblx0XHRpZiAoZGF0YSBpbnN0YW5jZW9mIEFycmF5KSB7XHJcblx0XHRcdHJldHVybiBkYXRhLm1hcCgoaXRlbSwgaW5kZXgpID0+IHRoaXMuZW1wdHlUb051bGwoaXRlbSkpXHJcblx0XHR9XHJcblx0XHRpZiAoKHR5cGVvZiBkYXRhID09PSAnb2JqZWN0JykgJiYgKGRhdGEgIT09IG51bGwpKSB7XHJcblx0XHRcdGNvbnN0IHBhcnNlZERhdGEgPSB7fVxyXG5cdFx0XHRmb3IgKGNvbnN0IGtleSBpbiBkYXRhKSB7XHJcblx0XHRcdFx0cGFyc2VkRGF0YVtrZXldID0gdGhpcy5lbXB0eVRvTnVsbChkYXRhW2tleV0pXHJcblx0XHRcdH1cclxuXHRcdFx0cmV0dXJuIHBhcnNlZERhdGFcclxuXHRcdH1cclxuXHRcdHJldHVybiBkYXRhXHJcblx0fVxyXG5cclxuXHRzdHJpbmdpZnlHZXRQYXJhbXMoZGF0YToge1trZXk6IHN0cmluZ106IGFueX0pOiB7W2tleTogc3RyaW5nXTogYW55fSB7XHJcblx0XHRsZXQgc3RyaW5naWZpZWRPYmplY3QgPSB7fVxyXG5cdFx0Zm9yIChjb25zdCBrZXkgaW4gZGF0YSkge1xyXG5cdFx0XHRjb25zdCB2YWx1ZSA9IGRhdGFba2V5XVxyXG5cdFx0XHRpZiAoKHZhbHVlIGluc3RhbmNlb2YgQXJyYXkpIHx8ICgodHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JykgJiYgKHZhbHVlICE9PSBudWxsKSAmJiAhKHZhbHVlIGluc3RhbmNlb2YgRGF0ZSkpKSB7XHJcblx0XHRcdFx0c3RyaW5naWZpZWRPYmplY3RbYF9qc29uXyR7a2V5fWBdID0gSlNPTi5zdHJpbmdpZnkodmFsdWUpXHJcblx0XHRcdFx0Y29udGludWVcclxuXHRcdFx0fVxyXG5cdFx0XHRzdHJpbmdpZmllZE9iamVjdFtrZXldID0gdmFsdWVcclxuXHRcdH1cclxuXHRcdHJldHVybiBzdHJpbmdpZmllZE9iamVjdFxyXG5cdH1cclxuXHJcblx0aGFuZGxlRXJyb3IoZXJyOiBhbnksIG9wdGlvbnM/OiB7bm90aWZ5T25FcnJvcj86IGJvb2xlYW59KTogdm9pZCB7XHJcblx0XHRjb25zdCB7bm90aWZ5T25FcnJvcn0gPSBvcHRpb25zIHx8IHt9IGFzIGFueVxyXG5cdFx0aWYgKCFlcnIpIHtcclxuXHRcdFx0aWYgKG5vdGlmeU9uRXJyb3IgIT09IGZhbHNlKSB7XHJcblx0XHRcdFx0dGhpcy5nbG9iYWxFdmVudHNTZXJ2aWNlLm5vdGlmeSgnZXJyb3InLCAnQW4gdW5rbm93biBlcnJvciBoYXMgb2NjdXJyZWQuJylcclxuXHRcdFx0fVxyXG5cdFx0XHRyZXR1cm5cclxuXHRcdH1cclxuXHRcdGlmICh0aGlzLnJlZGlyZWN0T25Gb3JiaWRkZW5VcmwgJiYgKGVyci5zdGF0dXMgPT09IDQwMSkpIHtcclxuXHRcdFx0dGhpcy5nbG9iYWxFdmVudHNTZXJ2aWNlLnJlZGlyZWN0KHRoaXMucmVkaXJlY3RPbkZvcmJpZGRlblVybClcclxuXHRcdFx0cmV0dXJuXHJcblx0XHR9XHJcblx0XHRpZiAoZXJyLnN0YXR1cyA9PT0gNDEzKSB7XHJcblx0XHRcdHRoaXMuZ2xvYmFsRXZlbnRzU2VydmljZS5ub3RpZnkoJ2Vycm9yJywgdGhpcy5maWxlVG9vTGFyZ2VFcnJvck1lc3NhZ2UpXHJcblx0XHRcdHJldHVyblxyXG5cdFx0fVxyXG5cdFx0aWYgKG5vdGlmeU9uRXJyb3IgIT09IGZhbHNlKSB7XHJcblx0XHRcdHRoaXMuZ2xvYmFsRXZlbnRzU2VydmljZS5ub3RpZnkoJ2Vycm9yJywgZXJyLmVycm9yICYmIGVyci5lcnJvci5lcnJvciB8fCAnQW4gZXJyb3IgaGFzIG9jY3VycmVkLicpXHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRjcmVhdGUocGFyYW1zKTogUHJvbWlzZTxhbnk+IHtcclxuXHRcdGNvbnN0IGluc3RhbmNlID0gdGhpc1xyXG5cdFx0cmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuXHRcdFx0Y28oZnVuY3Rpb24qKCkge1xyXG5cdFx0XHRcdHJldHVybiB5aWVsZCBpbnN0YW5jZS5yZXF1ZXN0U2VydmljZS5ydW4oJ3Bvc3QnLCBgJHtpbnN0YW5jZS5iYXNlVXJsfWAsIHtcclxuXHRcdFx0XHRcdGhlYWRlcnM6IGluc3RhbmNlLmhlYWRlcnMsXHJcblx0XHRcdFx0XHRib2R5OiBpbnN0YW5jZS5lbXB0eVRvTnVsbChwYXJhbXMpXHJcblx0XHRcdFx0fSlcclxuXHRcdFx0fSkudGhlbigocmVzKSA9PiByZXNvbHZlKHJlcyksIChlcnIpID0+IHtcclxuXHRcdFx0XHRpbnN0YW5jZS5oYW5kbGVFcnJvcihlcnIpXHJcblx0XHRcdFx0cmVqZWN0KHtlcnJvcjogdHJ1ZX0pXHJcblx0XHRcdH0pXHJcblx0XHR9KVxyXG5cdH1cclxuXHJcblx0cmVhZChwYXJhbXMpOiBQcm9taXNlPGFueT4ge1xyXG5cdFx0Y29uc3QgaW5zdGFuY2UgPSB0aGlzXHJcblx0XHRyZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG5cdFx0XHRjbyhmdW5jdGlvbiooKSB7XHJcblx0XHRcdFx0cmV0dXJuIHlpZWxkIGluc3RhbmNlLnJlcXVlc3RTZXJ2aWNlLnJ1bignZ2V0JywgYCR7aW5zdGFuY2UuYmFzZVVybH0vaXRlbWAsIHtcclxuXHRcdFx0XHRcdGhlYWRlcnM6IGluc3RhbmNlLmhlYWRlcnMsXHJcblx0XHRcdFx0XHRwYXJhbXM6IGluc3RhbmNlLnN0cmluZ2lmeUdldFBhcmFtcyhpbnN0YW5jZS5lbXB0eVRvTnVsbChwYXJhbXMpKVxyXG5cdFx0XHRcdH0pXHJcblx0XHRcdH0pLnRoZW4oKHJlcykgPT4gcmVzb2x2ZShyZXMpLCAoZXJyKSA9PiB7XHJcblx0XHRcdFx0aW5zdGFuY2UuaGFuZGxlRXJyb3IoZXJyKVxyXG5cdFx0XHRcdHJlamVjdCh7ZXJyb3I6IHRydWV9KVxyXG5cdFx0XHR9KVxyXG5cdFx0fSlcclxuXHR9XHJcblxyXG5cdHJlYWRMaXN0KHBhcmFtcyk6IFByb21pc2U8YW55PiB7XHJcblx0XHRjb25zdCBpbnN0YW5jZSA9IHRoaXNcclxuXHRcdHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcblx0XHRcdGNvKGZ1bmN0aW9uKigpIHtcclxuXHRcdFx0XHRyZXR1cm4geWllbGQgaW5zdGFuY2UucmVxdWVzdFNlcnZpY2UucnVuKCdnZXQnLCBgJHtpbnN0YW5jZS5iYXNlVXJsfWAsIHtcclxuXHRcdFx0XHRcdGhlYWRlcnM6IGluc3RhbmNlLmhlYWRlcnMsXHJcblx0XHRcdFx0XHRwYXJhbXM6IGluc3RhbmNlLnN0cmluZ2lmeUdldFBhcmFtcyhpbnN0YW5jZS5lbXB0eVRvTnVsbChwYXJhbXMpKVxyXG5cdFx0XHRcdH0pXHJcblx0XHRcdH0pLnRoZW4oKHJlcykgPT4gcmVzb2x2ZShyZXMpLCAoZXJyKSA9PiB7XHJcblx0XHRcdFx0aW5zdGFuY2UuaGFuZGxlRXJyb3IoZXJyKVxyXG5cdFx0XHRcdHJlamVjdCh7ZXJyb3I6IHRydWV9KVxyXG5cdFx0XHR9KVxyXG5cdFx0fSlcclxuXHR9XHJcblxyXG5cdHN0cmVhbVJlYWRMaXN0KFxyXG5cdFx0cGFyYW1zOiB7W2tleTogc3RyaW5nXTogYW55fSxcclxuXHRcdG9uTWVzc2FnZTogRnVuY3Rpb24sXHJcblx0XHRvcHRpb25zPzoge29uRXJyb3I/OiBGdW5jdGlvbiwgcmVjb25uZWN0QXR0ZW1wdEludGVydmFsPzogbnVtYmVyLCByZWNvbm5lY3RBdHRlbXB0c0xlZnQ/OiBudW1iZXJ9XHJcblx0KTogU3ViamVjdDx2b2lkPiB7XHJcblx0XHRjb25zdCBhY3R1YWxPcHRpb25zID0gb3B0aW9ucyB8fCB7fSxcclxuXHRcdFx0e29uRXJyb3IsIHJlY29ubmVjdEF0dGVtcHRJbnRlcnZhbH0gPSBhY3R1YWxPcHRpb25zLFxyXG5cdFx0XHRlcnJvckhhbmRsZXIgPSBvbkVycm9yID8gb25FcnJvciA6IHRoaXMuaGFuZGxlRXJyb3IuYmluZCh0aGlzKVxyXG5cdFx0bGV0IHJlY29ubmVjdEF0dGVtcHRzTGVmdCA9IGFjdHVhbE9wdGlvbnMucmVjb25uZWN0QXR0ZW1wdHNMZWZ0LFxyXG5cdFx0XHR1cmwgPSBgJHt3aW5kb3cubG9jYXRpb24ub3JpZ2lufSR7dGhpcy5iYXNlVXJsfS9zdHJlYW1MaXN0YCxcclxuXHRcdFx0c3RyaW5naWZpZWRQYXJhbXMgPSB0aGlzLnN0cmluZ2lmeUdldFBhcmFtcyh0aGlzLmVtcHR5VG9OdWxsKHBhcmFtcykpLFxyXG5cdFx0XHRmaXJzdFBhcmFtID0gdHJ1ZVxyXG5cdFx0Zm9yIChjb25zdCBrZXkgaW4gc3RyaW5naWZpZWRQYXJhbXMpIHtcclxuXHRcdFx0aWYgKGZpcnN0UGFyYW0pIHtcclxuXHRcdFx0XHRmaXJzdFBhcmFtID0gZmFsc2VcclxuXHRcdFx0XHR1cmwgKz0gJz8nXHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0dXJsICs9ICcmJ1xyXG5cdFx0XHR9XHJcblx0XHRcdHVybCArPSBgJHtrZXl9PSR7c3RyaW5naWZpZWRQYXJhbXNba2V5XX1gXHJcblx0XHR9XHJcblx0XHRsZXQgZXZlbnRTb3VyY2UgPSBuZXcgRXZlbnRTb3VyY2UodXJsKSxcclxuXHRcdFx0Y2xvc2VTdWJqZWN0ID0gbmV3IFN1YmplY3Q8dm9pZD4oKSxcclxuXHRcdFx0cmVjb25uZWN0QWxsb3dlZCA9IHt2YWx1ZTogdHJ1ZX1cclxuXHRcdGV2ZW50U291cmNlLm9ubWVzc2FnZSA9IChldmVudCkgPT4gb25NZXNzYWdlKGV2ZW50KVxyXG5cdFx0ZXZlbnRTb3VyY2Uub25lcnJvciA9IChlcnIpID0+IGVycm9ySGFuZGxlcihlcnIpXHJcblx0XHRsZXQgaW50ZXJ2YWwgPSBzZXRJbnRlcnZhbCgoKSA9PiB7XHJcblx0XHRcdGlmIChcclxuXHRcdFx0XHQoZXZlbnRTb3VyY2UucmVhZHlTdGF0ZSA9PT0gMikgJiZcclxuXHRcdFx0XHRyZWNvbm5lY3RBbGxvd2VkLnZhbHVlICYmXHJcblx0XHRcdFx0KCh0eXBlb2YgcmVjb25uZWN0QXR0ZW1wdHNMZWZ0ID09PSAndW5kZWZpbmVkJykgfHwgcmVjb25uZWN0QXR0ZW1wdHNMZWZ0ID4gMClcclxuXHRcdFx0KSB7XHJcblx0XHRcdFx0ZXZlbnRTb3VyY2UgPSBuZXcgRXZlbnRTb3VyY2UodXJsKVxyXG5cdFx0XHRcdGV2ZW50U291cmNlLm9ubWVzc2FnZSA9IChldmVudCkgPT4gb25NZXNzYWdlKGV2ZW50KVxyXG5cdFx0XHRcdGV2ZW50U291cmNlLm9uZXJyb3IgPSAoZXJyKSA9PiBlcnJvckhhbmRsZXIoZXJyKVxyXG5cdFx0XHRcdGlmICh0eXBlb2YgcmVjb25uZWN0QXR0ZW1wdHNMZWZ0ICE9PSAndW5kZWZpbmVkJykge1xyXG5cdFx0XHRcdFx0cmVjb25uZWN0QXR0ZW1wdHNMZWZ0LS1cclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0cmV0dXJuXHJcblx0XHRcdH1cclxuXHRcdFx0Y2xlYXJJbnRlcnZhbChpbnRlcnZhbClcclxuXHRcdH0sIHJlY29ubmVjdEF0dGVtcHRJbnRlcnZhbCB8fCA1MDAwKVxyXG5cdFx0Y2xvc2VTdWJqZWN0LnN1YnNjcmliZSgoKSA9PiB7XHJcblx0XHRcdHJlY29ubmVjdEFsbG93ZWQudmFsdWUgPSBmYWxzZVxyXG5cdFx0XHRldmVudFNvdXJjZS5jbG9zZSgpXHJcblx0XHR9KVxyXG5cdFx0cmV0dXJuIGNsb3NlU3ViamVjdFxyXG5cdH1cclxuXHJcblx0cmVhZFNlbGVjdExpc3QocGFyYW1zKTogUHJvbWlzZTxhbnk+IHtcclxuXHRcdGNvbnN0IGluc3RhbmNlID0gdGhpc1xyXG5cdFx0cmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuXHRcdFx0Y28oZnVuY3Rpb24qKCkge1xyXG5cdFx0XHRcdHJldHVybiB5aWVsZCBpbnN0YW5jZS5yZXF1ZXN0U2VydmljZS5ydW4oJ2dldCcsIGAke2luc3RhbmNlLmJhc2VVcmx9L3NlbGVjdExpc3RgLCB7XHJcblx0XHRcdFx0XHRoZWFkZXJzOiBpbnN0YW5jZS5oZWFkZXJzLFxyXG5cdFx0XHRcdFx0cGFyYW1zOiBpbnN0YW5jZS5zdHJpbmdpZnlHZXRQYXJhbXMoaW5zdGFuY2UuZW1wdHlUb051bGwocGFyYW1zKSlcclxuXHRcdFx0XHR9KVxyXG5cdFx0XHR9KS50aGVuKChyZXMpID0+IHJlc29sdmUocmVzKSwgKGVycikgPT4ge1xyXG5cdFx0XHRcdGluc3RhbmNlLmhhbmRsZUVycm9yKGVycilcclxuXHRcdFx0XHRyZWplY3Qoe2Vycm9yOiB0cnVlfSlcclxuXHRcdFx0fSlcclxuXHRcdH0pXHJcblx0fVxyXG5cclxuXHR1cGRhdGUocGFyYW1zKTogUHJvbWlzZTxhbnk+IHtcclxuXHRcdGNvbnN0IGluc3RhbmNlID0gdGhpc1xyXG5cdFx0cmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuXHRcdFx0Y28oZnVuY3Rpb24qKCkge1xyXG5cdFx0XHRcdHJldHVybiB5aWVsZCBpbnN0YW5jZS5yZXF1ZXN0U2VydmljZS5ydW4oJ3BhdGNoJywgYCR7aW5zdGFuY2UuYmFzZVVybH0vaXRlbS8ke3BhcmFtcy5pZH1gLCB7XHJcblx0XHRcdFx0XHRoZWFkZXJzOiBpbnN0YW5jZS5oZWFkZXJzLFxyXG5cdFx0XHRcdFx0Ym9keTogaW5zdGFuY2UuZW1wdHlUb051bGwocGFyYW1zKVxyXG5cdFx0XHRcdH0pXHJcblx0XHRcdH0pLnRoZW4oKHJlcykgPT4gcmVzb2x2ZShyZXMpLCAoZXJyKSA9PiB7XHJcblx0XHRcdFx0aW5zdGFuY2UuaGFuZGxlRXJyb3IoZXJyKVxyXG5cdFx0XHRcdHJlamVjdCh7ZXJyb3I6IHRydWV9KVxyXG5cdFx0XHR9KVxyXG5cdFx0fSlcclxuXHR9XHJcblxyXG5cdGJ1bGtVcHNlcnQocGFyYW1zKTogUHJvbWlzZTxhbnk+IHtcclxuXHRcdGNvbnN0IGluc3RhbmNlID0gdGhpc1xyXG5cdFx0cmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuXHRcdFx0Y28oZnVuY3Rpb24qKCkge1xyXG5cdFx0XHRcdHJldHVybiB5aWVsZCBpbnN0YW5jZS5yZXF1ZXN0U2VydmljZS5ydW4oJ3B1dCcsIGAke2luc3RhbmNlLmJhc2VVcmx9YCwge1xyXG5cdFx0XHRcdFx0aGVhZGVyczogaW5zdGFuY2UuaGVhZGVycyxcclxuXHRcdFx0XHRcdGJvZHk6IGluc3RhbmNlLmVtcHR5VG9OdWxsKHBhcmFtcylcclxuXHRcdFx0XHR9KVxyXG5cdFx0XHR9KS50aGVuKChyZXMpID0+IHJlc29sdmUocmVzKSwgKGVycikgPT4ge1xyXG5cdFx0XHRcdGluc3RhbmNlLmhhbmRsZUVycm9yKGVycilcclxuXHRcdFx0XHRyZWplY3Qoe2Vycm9yOiB0cnVlfSlcclxuXHRcdFx0fSlcclxuXHRcdH0pXHJcblx0fVxyXG5cclxuXHRkZWxldGUocGFyYW1zKTogUHJvbWlzZTxhbnk+IHtcclxuXHRcdGNvbnN0IGluc3RhbmNlID0gdGhpc1xyXG5cdFx0cmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuXHRcdFx0Y28oZnVuY3Rpb24qKCkge1xyXG5cdFx0XHRcdHJldHVybiB5aWVsZCBpbnN0YW5jZS5yZXF1ZXN0U2VydmljZS5ydW4oJ2RlbGV0ZScsIGAke2luc3RhbmNlLmJhc2VVcmx9LyR7cGFyYW1zLmlkfWAsIHtcclxuXHRcdFx0XHRcdGhlYWRlcnM6IGluc3RhbmNlLmhlYWRlcnMsXHJcblx0XHRcdFx0XHRib2R5OiBpbnN0YW5jZS5lbXB0eVRvTnVsbChwYXJhbXMpXHJcblx0XHRcdFx0fSlcclxuXHRcdFx0fSkudGhlbigocmVzKSA9PiByZXNvbHZlKHJlcyksIChlcnIpID0+IHtcclxuXHRcdFx0XHRpbnN0YW5jZS5oYW5kbGVFcnJvcihlcnIpXHJcblx0XHRcdFx0cmVqZWN0KHtlcnJvcjogdHJ1ZX0pXHJcblx0XHRcdH0pXHJcblx0XHR9KVxyXG5cdH1cclxufVxyXG4iXX0=