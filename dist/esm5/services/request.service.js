/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest } from '@angular/common/http';
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
            object.forEach((/**
             * @param {?} item
             * @return {?}
             */
            function (item) {
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
        return new Promise((/**
         * @param {?} resolve
         * @param {?} reject
         * @return {?}
         */
        function (resolve, reject) {
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
                    var resolveWithFullResponse = options.resolveWithFullResponse, otherOptions = tslib_1.__rest(options, ["resolveWithFullResponse"]);
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
                        optionsParams.forEach((/**
                         * @param {?} item
                         * @param {?} index
                         * @return {?}
                         */
                        function (item, index) {
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
                _this.client.request(new HttpRequest(method, actualUrl_1, body, requestOptions)).toPromise().then((/**
                 * @param {?} response
                 * @return {?}
                 */
                function (response) { return runOptions_1.resolveWithFullResponse ? resolve(response) : resolve(response.body); }), (/**
                 * @param {?} error
                 * @return {?}
                 */
                function (error) { return reject(error); }));
            }
            catch (error) {
                reject(error);
            }
        }));
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
export { RequestService };
if (false) {
    /** @type {?} */
    RequestService.prototype.client;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVxdWVzdC5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vcmFtc3Rlci11aS1jb3JlLyIsInNvdXJjZXMiOlsic2VydmljZXMvcmVxdWVzdC5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFDLFVBQVUsRUFBQyxNQUFNLGVBQWUsQ0FBQTtBQUN4QyxPQUFPLEVBQUMsVUFBVSxFQUFFLFdBQVcsRUFBZSxNQUFNLHNCQUFzQixDQUFBO0FBRzFFO0lBRUMsd0JBQW1CLE1BQWtCO1FBQWxCLFdBQU0sR0FBTixNQUFNLENBQVk7SUFBRyxDQUFDOzs7Ozs7SUFFekMsOENBQXFCOzs7OztJQUFyQixVQUFzQixNQUFrQyxFQUFFLFNBQWtCO1FBQTVFLGlCQStCQzs7WUE5QkksWUFBWSxHQUFHLEVBQUU7UUFDckIsSUFBSSxNQUFNLFlBQVksS0FBSyxFQUFFO1lBQzVCLElBQUksQ0FBQyxTQUFTLEVBQUU7Z0JBQ2YsTUFBTSxFQUFDLEtBQUssRUFBRSx1Q0FBdUMsRUFBQyxDQUFBO2FBQ3REO1lBQ0QsTUFBTSxDQUFDLE9BQU87Ozs7WUFBQyxVQUFDLElBQUk7Z0JBQ25CLElBQUksSUFBSSxLQUFLLElBQUksRUFBRTtvQkFDbEIsT0FBTTtpQkFDTjtnQkFDRCxJQUFJLENBQUMsSUFBSSxZQUFZLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLFlBQVksS0FBSyxDQUFDLElBQUssQ0FBQyxPQUFPLElBQUksS0FBSyxRQUFRLENBQUMsRUFBRTtvQkFDdEYsWUFBWSxDQUFDLElBQUksQ0FBQyxFQUFDLEdBQUcsRUFBSyxTQUFTLE9BQUksRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFDLENBQUMsQ0FBQTtvQkFDdkQsT0FBTTtpQkFDTjtnQkFDRCxZQUFZLEdBQUcsWUFBWSxDQUFDLE1BQU0sQ0FBQyxLQUFJLENBQUMscUJBQXFCLENBQUMsSUFBSSxFQUFLLFNBQVMsT0FBSSxDQUFDLENBQUMsQ0FBQTtnQkFDdEYsT0FB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SSxDQUFBO2lCQUMxQjtnQkFDRCx1Q0FBdUM7Z0JBQ3ZDLEtBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLElBQUksV0FBVyxDQUFDLE1BQU0sRUFBRSxXQUFTLEVBQUUsSUFBSSxFQUFFLGNBQWMsQ0FBQyxDQUFDLENBQUMsU0FBUyxFQUFFLENBQUMsSUFBSTs7OztnQkFDN0YsVUFBQyxRQUEyQixJQUFLLE9BQUEsWUFBVSxDQUFDLHVCQUF1QixDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEVBQS9FLENBQStFOzs7O2dCQUNoSCxVQUFDLEtBQVUsSUFBSyxPQUFBLE1BQU0sQ0FBQyxLQUFLLENBQUMsRUFBYixDQUFhLEVBQzdCLENBQUE7YUFDRDtZQUFDLE9BQU0sS0FBSyxFQUFFO2dCQUNkLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQTthQUNiO1FBQ0YsQ0FBQyxFQUFDLENBQUE7SUFDSCxDQUFDOztnQkE3RUQsVUFBVTs7OztnQkFISCxVQUFVOztJQWlGbEIscUJBQUM7Q0FBQSxBQTlFRCxJQThFQztTQTdFWSxjQUFjOzs7SUFDZCxnQ0FBeUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0luamVjdGFibGV9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnXHJcbmltcG9ydCB7SHR0cENsaWVudCwgSHR0cFJlcXVlc3QsIEh0dHBSZXNwb25zZX0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnXHJcblxyXG5cclxuQEluamVjdGFibGUoKVxyXG5leHBvcnQgY2xhc3MgUmVxdWVzdFNlcnZpY2Uge1xyXG5cdGNvbnN0cnVjdG9yKHB1YmxpYyBjbGllbnQ6IEh0dHBDbGllbnQpIHt9XHJcblxyXG5cdGZsYXR0ZW5PYmplY3RGb3JRdWVyeShvYmplY3Q6IHtbeDogc3RyaW5nXTogYW55fSB8IGFueVtdLCBwYXJlbnRLZXk/OiBzdHJpbmcpOiB7a2V5OiBzdHJpbmcsIHZhbHVlOiBhbnl9W10ge1xyXG5cdFx0bGV0IHJldHVybk9iamVjdCA9IFtdXHJcblx0XHRpZiAob2JqZWN0IGluc3RhbmNlb2YgQXJyYXkpIHtcclxuXHRcdFx0aWYgKCFwYXJlbnRLZXkpIHtcclxuXHRcdFx0XHR0aHJvdyB7ZXJyb3I6ICdUaGUgdG9wLW1vc3QgaXRlbSBjYW5ub3QgYmUgYW4gYXJyYXkuJ31cclxuXHRcdFx0fVxyXG5cdFx0XHRvYmplY3QuZm9yRWFjaCgoaXRlbSkgPT4ge1xyXG5cdFx0XHRcdGlmIChpdGVtID09PSBudWxsKSB7XHJcblx0XHRcdFx0XHRyZXR1cm5cclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0aWYgKChpdGVtIGluc3RhbmNlb2YgRGF0ZSkgfHwgIShpdGVtIGluc3RhbmNlb2YgQXJyYXkpICB8fCAodHlwZW9mIGl0ZW0gIT09ICdvYmplY3QnKSkge1xyXG5cdFx0XHRcdFx0cmV0dXJuT2JqZWN0LnB1c2goe2tleTogYCR7cGFyZW50S2V5fVtdYCwgdmFsdWU6IGl0ZW19KVxyXG5cdFx0XHRcdFx0cmV0dXJuXHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdHJldHVybk9iamVjdCA9IHJldHVybk9iamVjdC5jb25jYXQodGhpcy5mbGF0dGVuT2JqZWN0Rm9yUXVlcnkoaXRlbSwgYCR7cGFyZW50S2V5fVtdYCkpXHJcblx0XHRcdFx0cmV0dXJuXHJcblx0XHRcdH0pXHJcblx0XHRcdHJldHVybiByZXR1cm5PYmplY3RcclxuXHRcdH1cclxuXHRcdGZvciAoY29uc3Qga2V5IGluIG9iamVjdCkge1xyXG5cdFx0XHRjb25zdCB2YWx1ZSA9IG9iamVjdFtrZXldXHJcblx0XHRcdGlmICh2YWx1ZSA9PT0gbnVsbCkge1xyXG5cdFx0XHRcdGNvbnRpbnVlXHJcblx0XHRcdH1cclxuXHRcdFx0aWYgKCh2YWx1ZSBpbnN0YW5jZW9mIERhdGUpIHx8ICh0eXBlb2YgdmFsdWUgIT09ICdvYmplY3QnKSkge1xyXG5cdFx0XHRcdHJldHVybk9iamVjdC5wdXNoKHtrZXk6IHBhcmVudEtleSA/IGAke3BhcmVudEtleX1bJHtrZXl9XWA6IGtleSwgdmFsdWV9KVxyXG5cdFx0XHRcdGNvbnRpbnVlXHJcblx0XHRcdH1cclxuXHRcdFx0cmV0dXJuT2JqZWN0ID0gcmV0dXJuT2JqZWN0LmNvbmNhdCh0aGlzLmZsYXR0ZW5PYmplY3RGb3JRdWVyeSh2YWx1ZSwgcGFyZW50S2V5ID8gYCR7cGFyZW50S2V5fVske2tleX1dYCA6IGtleSkpXHJcblx0XHR9XHJcblx0XHRyZXR1cm4gcmV0dXJuT2JqZWN0XHJcblx0fVxyXG5cclxuXHRydW4obWV0aG9kOiBzdHJpbmcsIHVybDogc3RyaW5nLCBvcHRpb25zPzoge1t4OiBzdHJpbmddOiBhbnl9KSB7XHJcblx0XHRyZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG5cdFx0XHR0cnkge1xyXG5cdFx0XHRcdGxldCBhY3R1YWxVcmwgPSB1cmwsXHJcblx0XHRcdFx0XHRydW5PcHRpb25zID0ge30gYXMgYW55LFxyXG5cdFx0XHRcdFx0cmVxdWVzdE9wdGlvbnMgPSB7fSBhcyBhbnksXHJcblx0XHRcdFx0XHRib2R5ID0gbnVsbFxyXG5cdFx0XHRcdGlmIChvcHRpb25zICYmICh0eXBlb2Ygb3B0aW9ucyA9PT0gJ29iamVjdCcpKSB7XHJcblx0XHRcdFx0XHRsZXQge3Jlc29sdmVXaXRoRnVsbFJlc3BvbnNlLCAuLi4gb3RoZXJPcHRpb25zfSA9IG9wdGlvbnNcclxuXHRcdFx0XHRcdHJlcXVlc3RPcHRpb25zID0gb3RoZXJPcHRpb25zXHJcblx0XHRcdFx0XHRydW5PcHRpb25zID0ge3Jlc29sdmVXaXRoRnVsbFJlc3BvbnNlfVxyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHRpZiAobWV0aG9kLnRvTG93ZXJDYXNlKCkgPT09ICdnZXQnKSB7XHJcblx0XHRcdFx0XHRpZiAoIXJlcXVlc3RPcHRpb25zIHx8ICh0eXBlb2YgcmVxdWVzdE9wdGlvbnMgIT09ICdvYmplY3QnKSkge1xyXG5cdFx0XHRcdFx0XHRyZXF1ZXN0T3B0aW9ucyA9IHt9XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRjb25zdCBvcHRpb25zUGFyYW1zID0gdGhpcy5mbGF0dGVuT2JqZWN0Rm9yUXVlcnkocmVxdWVzdE9wdGlvbnMucGFyYW1zIHx8IHt9KVxyXG5cdFx0XHRcdFx0YWN0dWFsVXJsICs9IGA/Xz0keyhuZXcgRGF0ZSgpKS5nZXRUaW1lKCkudG9TdHJpbmcoKX1gXHJcblx0XHRcdFx0XHRpZiAob3B0aW9uc1BhcmFtcy5sZW5ndGgpIHtcclxuXHRcdFx0XHRcdFx0b3B0aW9uc1BhcmFtcy5mb3JFYWNoKChpdGVtLCBpbmRleCkgPT4ge1xyXG5cdFx0XHRcdFx0XHRcdGFjdHVhbFVybCArPSBgJiR7aXRlbS5rZXl9PSR7aXRlbS52YWx1ZX1gXHJcblx0XHRcdFx0XHRcdH0pXHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdGlmICghcmVxdWVzdE9wdGlvbnMgfHwgKHR5cGVvZiByZXF1ZXN0T3B0aW9ucyAhPT0gJ29iamVjdCcpKSB7XHJcblx0XHRcdFx0XHRcdHJlcXVlc3RPcHRpb25zID0ge31cclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdGJvZHkgPSAoIXJlcXVlc3RPcHRpb25zLmJvZHkgfHwgKHR5cGVvZiByZXF1ZXN0T3B0aW9ucy5ib2R5ICE9PSAnb2JqZWN0JykpID8ge30gOiByZXF1ZXN0T3B0aW9ucy5ib2R5XHJcblx0XHRcdFx0XHRib2R5Ll8gPSAobmV3IERhdGUoKSkuZ2V0VGltZSgpXHJcblx0XHRcdFx0XHRkZWxldGUgcmVxdWVzdE9wdGlvbnMuYm9keVxyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHQvLyBpZiAoIXJlcXVlc3RPcHRpb25zLnJlc3BvbnNlVHlwZSkge31cclxuXHRcdFx0XHR0aGlzLmNsaWVudC5yZXF1ZXN0KG5ldyBIdHRwUmVxdWVzdChtZXRob2QsIGFjdHVhbFVybCwgYm9keSwgcmVxdWVzdE9wdGlvbnMpKS50b1Byb21pc2UoKS50aGVuKFxyXG5cdFx0XHRcdFx0KHJlc3BvbnNlOiBIdHRwUmVzcG9uc2U8YW55PikgPT4gcnVuT3B0aW9ucy5yZXNvbHZlV2l0aEZ1bGxSZXNwb25zZSA/IHJlc29sdmUocmVzcG9uc2UpIDogcmVzb2x2ZShyZXNwb25zZS5ib2R5KSxcclxuXHRcdFx0XHRcdChlcnJvcjogYW55KSA9PiByZWplY3QoZXJyb3IpXHJcblx0XHRcdFx0KVxyXG5cdFx0XHR9IGNhdGNoKGVycm9yKSB7XHJcblx0XHRcdFx0cmVqZWN0KGVycm9yKVxyXG5cdFx0XHR9XHJcblx0XHR9KVxyXG5cdH1cclxufVxyXG4iXX0=