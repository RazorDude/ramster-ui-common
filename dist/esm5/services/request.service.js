/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpRequest } from '@angular/common/http';
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
                    var optionsParams = requestOptions.params || {};
                    /** @type {?} */
                    var httpParams_1 = new HttpParams();
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
                if (!requestOptions.responseType) { }
                _this.client.request(new HttpRequest(method, url, body, requestOptions)).toPromise().then(function (response) { return runOptions_1.resolveWithFullResponse ? resolve(response) : resolve(response.body); }, function (error) { return reject(error); });
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
export { RequestService };
if (false) {
    /** @type {?} */
    RequestService.prototype.client;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVxdWVzdC5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vcmFtc3Rlci11aS1jb3JlLyIsInNvdXJjZXMiOlsic2VydmljZXMvcmVxdWVzdC5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFDLFVBQVUsRUFBQyxNQUFNLGVBQWUsQ0FBQTtBQUN4QyxPQUFPLEVBQUMsVUFBVSxFQUFFLFVBQVUsRUFBRSxXQUFXLEVBQWUsTUFBTSxzQkFBc0IsQ0FBQTtBQUd0RjtJQUVDLHdCQUFtQixNQUFrQjtRQUFsQixXQUFNLEdBQU4sTUFBTSxDQUFZO0lBQUcsQ0FBQzs7Ozs7OztJQUV6Qyw0QkFBRzs7Ozs7O0lBQUgsVUFBSSxNQUFjLEVBQUUsR0FBVyxFQUFFLE9BQTRCO1FBQTdELGlCQTBEQztRQXpEQSxPQUFPLElBQUksT0FBTyxDQUFDLFVBQUMsT0FBTyxFQUFFLE1BQU07WUFDbEMsSUFBSTs7b0JBQ0MsWUFBVSxHQUFHLG1CQUFBLEVBQUUsRUFBTzs7b0JBQ3pCLGNBQWMsR0FBRyxtQkFBQSxFQUFFLEVBQU87O29CQUMxQixJQUFJLEdBQUcsSUFBSTtnQkFDWixJQUFJLE9BQU8sSUFBSSxDQUFDLE9BQU8sT0FBTyxLQUFLLFFBQVEsQ0FBQyxFQUFFO29CQUN4QyxJQUFBLHlEQUF1QixFQUFFLG1FQUFnQjtvQkFDOUMsY0FBYyxHQUFHLFlBQVksQ0FBQTtvQkFDN0IsWUFBVSxHQUFHLEVBQUMsdUJBQXVCLHlCQUFBLEVBQUMsQ0FBQTtpQkFDdEM7Z0JBQ0QsSUFBSSxNQUFNLENBQUMsV0FBVyxFQUFFLEtBQUssS0FBSyxFQUFFO29CQUNuQyxJQUFJLENBQUMsY0FBYyxJQUFJLENBQUMsT0FBTyxjQUFjLEtBQUssUUFBUSxDQUFDLEVBQUU7d0JBQzVELGNBQWMsR0FBRyxFQUFFLENBQUE7cUJBQ25COzt3QkFDSyxhQUFhLEdBQUcsY0FBYyxDQUFDLE1BQU0sSUFBSSxFQUFFOzt3QkFDN0MsWUFBVSxHQUFHLElBQUksVUFBVSxFQUFFOzRDQUN0QixHQUFHOzs0QkFDUCxRQUFRLEdBQUcsYUFBYSxDQUFDLEdBQUcsQ0FBQzt3QkFDbkMsSUFBSSxDQUFDLE9BQU8sUUFBUSxLQUFLLFFBQVEsQ0FBQyxJQUFJLENBQUMsUUFBUSxLQUFLLElBQUksQ0FBQyxFQUFFOzRCQUMxRCxJQUFJLFFBQVEsWUFBWSxLQUFLLEVBQUU7Z0NBQzlCLFFBQVEsQ0FBQyxPQUFPLENBQUMsVUFBQyxJQUFJO29DQUNyQixJQUFJLENBQUMsT0FBTyxJQUFJLEtBQUssUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLEtBQUssSUFBSSxDQUFDLEVBQUU7d0NBQ2xELEtBQUssSUFBTSxRQUFRLElBQUksSUFBSSxFQUFFOzRDQUM1QixZQUFVLEdBQUcsWUFBVSxDQUFDLEdBQUcsQ0FBSSxHQUFHLFNBQUksUUFBUSxNQUFHLEVBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUE7eUNBQ2xFO3dDQUNELE9BQU07cUNBQ047b0NBQ0QsWUFBVSxHQUFHLFlBQVUsQ0FBQyxHQUFHLENBQUksR0FBRyxPQUFJLEVBQUUsSUFBSSxDQUFDLENBQUE7Z0NBQzlDLENBQUMsQ0FBQyxDQUFBOzs2QkFFRjs0QkFDRCxLQUFLLElBQU0sUUFBUSxJQUFJLFFBQVEsRUFBRTtnQ0FDaEMsWUFBVSxHQUFHLFlBQVUsQ0FBQyxHQUFHLENBQUksR0FBRyxTQUFJLFFBQVEsTUFBRyxFQUFFLFFBQVEsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFBOzZCQUN0RTs7eUJBRUQ7d0JBQ0QsWUFBVSxHQUFHLFlBQVUsQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLFFBQVEsQ0FBQyxDQUFBO29CQUMzQyxDQUFDO29CQXJCRCxLQUFLLElBQU0sR0FBRyxJQUFJLGFBQWE7Z0NBQXBCLEdBQUc7cUJBcUJiO29CQUNELFlBQVUsR0FBRyxZQUFVLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxDQUFDLElBQUksSUFBSSxFQUFFLENBQUMsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFBO29CQUNuRSxjQUFjLENBQUMsTUFBTSxHQUFHLFlBQVUsQ0FBQTtpQkFDbEM7cUJBQU07b0JBQ04sSUFBSSxDQUFDLGNBQWMsSUFBSSxDQUFDLE9BQU8sY0FBYyxLQUFLLFFBQVEsQ0FBQyxFQUFFO3dCQUM1RCxjQUFjLEdBQUcsRUFBRSxDQUFBO3FCQUNuQjtvQkFDRCxJQUFJLEdBQUcsQ0FBQyxDQUFDLGNBQWMsQ0FBQyxJQUFJLElBQUksQ0FBQyxPQUFPLGNBQWMsQ0FBQyxJQUFJLEtBQUssUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFBO29CQUNyRyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsSUFBSSxJQUFJLEVBQUUsQ0FBQyxDQUFDLE9BQU8sRUFBRSxDQUFBO29CQUMvQixPQUFPLGNBQWMsQ0FBQyxJQUFJLENBQUE7aUJBQzFCO2dCQUNELElBQUksQ0FBQyxjQUFjLENBQUMsWUFBWSxFQUFFLEdBQUU7Z0JBQ3BDLEtBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLElBQUksV0FBVyxDQUFDLE1BQU0sRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLGNBQWMsQ0FBQyxDQUFDLENBQUMsU0FBUyxFQUFFLENBQUMsSUFBSSxDQUN2RixVQUFDLFFBQTJCLElBQUssT0FBQSxZQUFVLENBQUMsdUJBQXVCLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsRUFBL0UsQ0FBK0UsRUFDaEgsVUFBQyxLQUFVLElBQUssT0FBQSxNQUFNLENBQUMsS0FBSyxDQUFDLEVBQWIsQ0FBYSxDQUM3QixDQUFBO2FBQ0Q7WUFBQyxPQUFNLEtBQUssRUFBRTtnQkFDZCxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUE7YUFDYjtRQUNGLENBQUMsQ0FBQyxDQUFBO0lBQ0gsQ0FBQzs7Z0JBOURELFVBQVU7Ozs7Z0JBSEgsVUFBVTs7SUFrRWxCLHFCQUFDO0NBQUEsQUEvREQsSUErREM7U0E5RFksY0FBYzs7O0lBQ2QsZ0NBQXlCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtJbmplY3RhYmxlfSBmcm9tICdAYW5ndWxhci9jb3JlJ1xyXG5pbXBvcnQge0h0dHBDbGllbnQsIEh0dHBQYXJhbXMsIEh0dHBSZXF1ZXN0LCBIdHRwUmVzcG9uc2V9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJ1xyXG5cclxuXHJcbkBJbmplY3RhYmxlKClcclxuZXhwb3J0IGNsYXNzIFJlcXVlc3RTZXJ2aWNlIHtcclxuXHRjb25zdHJ1Y3RvcihwdWJsaWMgY2xpZW50OiBIdHRwQ2xpZW50KSB7fVxyXG5cclxuXHRydW4obWV0aG9kOiBzdHJpbmcsIHVybDogc3RyaW5nLCBvcHRpb25zPzoge1t4OiBzdHJpbmddOiBhbnl9KSB7XHJcblx0XHRyZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG5cdFx0XHR0cnkge1xyXG5cdFx0XHRcdGxldCBydW5PcHRpb25zID0ge30gYXMgYW55LFxyXG5cdFx0XHRcdFx0cmVxdWVzdE9wdGlvbnMgPSB7fSBhcyBhbnksXHJcblx0XHRcdFx0XHRib2R5ID0gbnVsbFxyXG5cdFx0XHRcdGlmIChvcHRpb25zICYmICh0eXBlb2Ygb3B0aW9ucyA9PT0gJ29iamVjdCcpKSB7XHJcblx0XHRcdFx0XHRsZXQge3Jlc29sdmVXaXRoRnVsbFJlc3BvbnNlLCAuLi4gb3RoZXJPcHRpb25zfSA9IG9wdGlvbnNcclxuXHRcdFx0XHRcdHJlcXVlc3RPcHRpb25zID0gb3RoZXJPcHRpb25zXHJcblx0XHRcdFx0XHRydW5PcHRpb25zID0ge3Jlc29sdmVXaXRoRnVsbFJlc3BvbnNlfVxyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHRpZiAobWV0aG9kLnRvTG93ZXJDYXNlKCkgPT09ICdnZXQnKSB7XHJcblx0XHRcdFx0XHRpZiAoIXJlcXVlc3RPcHRpb25zIHx8ICh0eXBlb2YgcmVxdWVzdE9wdGlvbnMgIT09ICdvYmplY3QnKSkge1xyXG5cdFx0XHRcdFx0XHRyZXF1ZXN0T3B0aW9ucyA9IHt9XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRjb25zdCBvcHRpb25zUGFyYW1zID0gcmVxdWVzdE9wdGlvbnMucGFyYW1zIHx8IHt9XHJcblx0XHRcdFx0XHRsZXQgaHR0cFBhcmFtcyA9IG5ldyBIdHRwUGFyYW1zKClcclxuXHRcdFx0XHRcdGZvciAoY29uc3Qga2V5IGluIG9wdGlvbnNQYXJhbXMpIHtcclxuXHRcdFx0XHRcdFx0Y29uc3Qgb3B0UGFyYW0gPSBvcHRpb25zUGFyYW1zW2tleV1cclxuXHRcdFx0XHRcdFx0aWYgKCh0eXBlb2Ygb3B0UGFyYW0gPT09ICdvYmplY3QnKSAmJiAob3B0UGFyYW0gIT09IG51bGwpKSB7XHJcblx0XHRcdFx0XHRcdFx0aWYgKG9wdFBhcmFtIGluc3RhbmNlb2YgQXJyYXkpIHtcclxuXHRcdFx0XHRcdFx0XHRcdG9wdFBhcmFtLmZvckVhY2goKGl0ZW0pID0+IHtcclxuXHRcdFx0XHRcdFx0XHRcdFx0aWYgKCh0eXBlb2YgaXRlbSA9PT0gJ29iamVjdCcpICYmIChpdGVtICE9PSBudWxsKSkge1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdGZvciAoY29uc3QgaW5uZXJLZXkgaW4gaXRlbSkge1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0aHR0cFBhcmFtcyA9IGh0dHBQYXJhbXMuc2V0KGAke2tleX1bJHtpbm5lcktleX1dYCwgaXRlbVtpbm5lcktleV0pXHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdHJldHVyblxyXG5cdFx0XHRcdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRcdFx0XHRcdGh0dHBQYXJhbXMgPSBodHRwUGFyYW1zLnNldChgJHtrZXl9W11gLCBpdGVtKVxyXG5cdFx0XHRcdFx0XHRcdFx0fSlcclxuXHRcdFx0XHRcdFx0XHRcdGNvbnRpbnVlXHJcblx0XHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0XHRcdGZvciAoY29uc3QgaW5uZXJLZXkgaW4gb3B0UGFyYW0pIHtcclxuXHRcdFx0XHRcdFx0XHRcdGh0dHBQYXJhbXMgPSBodHRwUGFyYW1zLnNldChgJHtrZXl9WyR7aW5uZXJLZXl9XWAsIG9wdFBhcmFtW2lubmVyS2V5XSlcclxuXHRcdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRcdFx0Y29udGludWVcclxuXHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0XHRodHRwUGFyYW1zID0gaHR0cFBhcmFtcy5zZXQoa2V5LCBvcHRQYXJhbSlcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdGh0dHBQYXJhbXMgPSBodHRwUGFyYW1zLnNldCgnXycsIChuZXcgRGF0ZSgpKS5nZXRUaW1lKCkudG9TdHJpbmcoKSlcclxuXHRcdFx0XHRcdHJlcXVlc3RPcHRpb25zLnBhcmFtcyA9IGh0dHBQYXJhbXNcclxuXHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0aWYgKCFyZXF1ZXN0T3B0aW9ucyB8fCAodHlwZW9mIHJlcXVlc3RPcHRpb25zICE9PSAnb2JqZWN0JykpIHtcclxuXHRcdFx0XHRcdFx0cmVxdWVzdE9wdGlvbnMgPSB7fVxyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0Ym9keSA9ICghcmVxdWVzdE9wdGlvbnMuYm9keSB8fCAodHlwZW9mIHJlcXVlc3RPcHRpb25zLmJvZHkgIT09ICdvYmplY3QnKSkgPyB7fSA6IHJlcXVlc3RPcHRpb25zLmJvZHlcclxuXHRcdFx0XHRcdGJvZHkuXyA9IChuZXcgRGF0ZSgpKS5nZXRUaW1lKClcclxuXHRcdFx0XHRcdGRlbGV0ZSByZXF1ZXN0T3B0aW9ucy5ib2R5XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdGlmICghcmVxdWVzdE9wdGlvbnMucmVzcG9uc2VUeXBlKSB7fVxyXG5cdFx0XHRcdHRoaXMuY2xpZW50LnJlcXVlc3QobmV3IEh0dHBSZXF1ZXN0KG1ldGhvZCwgdXJsLCBib2R5LCByZXF1ZXN0T3B0aW9ucykpLnRvUHJvbWlzZSgpLnRoZW4oXHJcblx0XHRcdFx0XHQocmVzcG9uc2U6IEh0dHBSZXNwb25zZTxhbnk+KSA9PiBydW5PcHRpb25zLnJlc29sdmVXaXRoRnVsbFJlc3BvbnNlID8gcmVzb2x2ZShyZXNwb25zZSkgOiByZXNvbHZlKHJlc3BvbnNlLmJvZHkpLFxyXG5cdFx0XHRcdFx0KGVycm9yOiBhbnkpID0+IHJlamVjdChlcnJvcilcclxuXHRcdFx0XHQpXHJcblx0XHRcdH0gY2F0Y2goZXJyb3IpIHtcclxuXHRcdFx0XHRyZWplY3QoZXJyb3IpXHJcblx0XHRcdH1cclxuXHRcdH0pXHJcblx0fVxyXG59XHJcbiJdfQ==