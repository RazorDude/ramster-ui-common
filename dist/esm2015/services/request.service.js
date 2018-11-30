/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpRequest } from '@angular/common/http';
export class RequestService {
    /**
     * @param {?} client
     */
    constructor(client) {
        this.client = client;
    }
    /**
     * @param {?} method
     * @param {?} url
     * @param {?=} options
     * @return {?}
     */
    run(method, url, options) {
        return new Promise((resolve, reject) => {
            try {
                /** @type {?} */
                let runOptions = (/** @type {?} */ ({}));
                /** @type {?} */
                let requestOptions = (/** @type {?} */ ({}));
                /** @type {?} */
                let body = null;
                if (options && (typeof options === 'object')) {
                    let { resolveWithFullResponse } = options, otherOptions = tslib_1.__rest(options, ["resolveWithFullResponse"]);
                    requestOptions = otherOptions;
                    runOptions = { resolveWithFullResponse };
                }
                if (method.toLowerCase() === 'get') {
                    if (!requestOptions || (typeof requestOptions !== 'object')) {
                        requestOptions = {};
                    }
                    /** @type {?} */
                    const optionsParams = requestOptions.params || {};
                    /** @type {?} */
                    let httpParams = new HttpParams();
                    for (const key in optionsParams) {
                        /** @type {?} */
                        const optParam = optionsParams[key];
                        if ((typeof optParam === 'object') && (optParam !== null)) {
                            if (optParam instanceof Array) {
                                optParam.forEach((item) => {
                                    if ((typeof item === 'object') && (item !== null)) {
                                        for (const innerKey in item) {
                                            httpParams = httpParams.set(`${key}[${innerKey}]`, item[innerKey]);
                                        }
                                        return;
                                    }
                                    httpParams = httpParams.set(`${key}[]`, item);
                                });
                                continue;
                            }
                            for (const innerKey in optParam) {
                                httpParams = httpParams.set(`${key}[${innerKey}]`, optParam[innerKey]);
                            }
                            continue;
                        }
                        httpParams = httpParams.set(key, optParam);
                    }
                    httpParams = httpParams.set('_', (new Date()).getTime().toString());
                    requestOptions.params = httpParams;
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
                this.client.request(new HttpRequest(method, url, body, requestOptions)).toPromise().then((response) => runOptions.resolveWithFullResponse ? resolve(response) : resolve(response.body), (error) => reject(error));
            }
            catch (error) {
                reject(error);
            }
        });
    }
}
RequestService.decorators = [
    { type: Injectable }
];
/** @nocollapse */
RequestService.ctorParameters = () => [
    { type: HttpClient }
];
if (false) {
    /** @type {?} */
    RequestService.prototype.client;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVxdWVzdC5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vcmFtc3Rlci11aS1jb3JlLyIsInNvdXJjZXMiOlsic2VydmljZXMvcmVxdWVzdC5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFDLFVBQVUsRUFBQyxNQUFNLGVBQWUsQ0FBQTtBQUN4QyxPQUFPLEVBQUMsVUFBVSxFQUFFLFVBQVUsRUFBRSxXQUFXLEVBQWUsTUFBTSxzQkFBc0IsQ0FBQTtBQUl0RixNQUFNLE9BQU8sY0FBYzs7OztJQUMxQixZQUFtQixNQUFrQjtRQUFsQixXQUFNLEdBQU4sTUFBTSxDQUFZO0lBQUcsQ0FBQzs7Ozs7OztJQUV6QyxHQUFHLENBQUMsTUFBYyxFQUFFLEdBQVcsRUFBRSxPQUE0QjtRQUM1RCxPQUFPLElBQUksT0FBTyxDQUFDLENBQUMsT0FBTyxFQUFFLE1BQU0sRUFBRSxFQUFFO1lBQ3RDLElBQUk7O29CQUNDLFVBQVUsR0FBRyxtQkFBQSxFQUFFLEVBQU87O29CQUN6QixjQUFjLEdBQUcsbUJBQUEsRUFBRSxFQUFPOztvQkFDMUIsSUFBSSxHQUFHLElBQUk7Z0JBQ1osSUFBSSxPQUFPLElBQUksQ0FBQyxPQUFPLE9BQU8sS0FBSyxRQUFRLENBQUMsRUFBRTt3QkFDekMsRUFBQyx1QkFBdUIsS0FBc0IsT0FBTyxFQUEzQixtRUFBZ0I7b0JBQzlDLGNBQWMsR0FBRyxZQUFZLENBQUE7b0JBQzdCLFVBQVUsR0FBRyxFQUFDLHVCQUF1QixFQUFDLENBQUE7aUJBQ3RDO2dCQUNELElBQUksTUFBTSxDQUFDLFdBQVcsRUFBRSxLQUFLLEtBQUssRUFBRTtvQkFDbkMsSUFBSSxDQUFDLGNBQWMsSUFBSSxDQUFDLE9BQU8sY0FBYyxLQUFLLFFBQVEsQ0FBQyxFQUFFO3dCQUM1RCxjQUFjLEdBQUcsRUFBRSxDQUFBO3FCQUNuQjs7MEJBQ0ssYUFBYSxHQUFHLGNBQWMsQ0FBQyxNQUFNLElBQUksRUFBRTs7d0JBQzdDLFVB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SEgsVUFBVTs7OztJQUtMLGdDQUF5QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7SW5qZWN0YWJsZX0gZnJvbSAnQGFuZ3VsYXIvY29yZSdcclxuaW1wb3J0IHtIdHRwQ2xpZW50LCBIdHRwUGFyYW1zLCBIdHRwUmVxdWVzdCwgSHR0cFJlc3BvbnNlfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCdcclxuXHJcblxyXG5ASW5qZWN0YWJsZSgpXHJcbmV4cG9ydCBjbGFzcyBSZXF1ZXN0U2VydmljZSB7XHJcblx0Y29uc3RydWN0b3IocHVibGljIGNsaWVudDogSHR0cENsaWVudCkge31cclxuXHJcblx0cnVuKG1ldGhvZDogc3RyaW5nLCB1cmw6IHN0cmluZywgb3B0aW9ucz86IHtbeDogc3RyaW5nXTogYW55fSkge1xyXG5cdFx0cmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuXHRcdFx0dHJ5IHtcclxuXHRcdFx0XHRsZXQgcnVuT3B0aW9ucyA9IHt9IGFzIGFueSxcclxuXHRcdFx0XHRcdHJlcXVlc3RPcHRpb25zID0ge30gYXMgYW55LFxyXG5cdFx0XHRcdFx0Ym9keSA9IG51bGxcclxuXHRcdFx0XHRpZiAob3B0aW9ucyAmJiAodHlwZW9mIG9wdGlvbnMgPT09ICdvYmplY3QnKSkge1xyXG5cdFx0XHRcdFx0bGV0IHtyZXNvbHZlV2l0aEZ1bGxSZXNwb25zZSwgLi4uIG90aGVyT3B0aW9uc30gPSBvcHRpb25zXHJcblx0XHRcdFx0XHRyZXF1ZXN0T3B0aW9ucyA9IG90aGVyT3B0aW9uc1xyXG5cdFx0XHRcdFx0cnVuT3B0aW9ucyA9IHtyZXNvbHZlV2l0aEZ1bGxSZXNwb25zZX1cclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0aWYgKG1ldGhvZC50b0xvd2VyQ2FzZSgpID09PSAnZ2V0Jykge1xyXG5cdFx0XHRcdFx0aWYgKCFyZXF1ZXN0T3B0aW9ucyB8fCAodHlwZW9mIHJlcXVlc3RPcHRpb25zICE9PSAnb2JqZWN0JykpIHtcclxuXHRcdFx0XHRcdFx0cmVxdWVzdE9wdGlvbnMgPSB7fVxyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0Y29uc3Qgb3B0aW9uc1BhcmFtcyA9IHJlcXVlc3RPcHRpb25zLnBhcmFtcyB8fCB7fVxyXG5cdFx0XHRcdFx0bGV0IGh0dHBQYXJhbXMgPSBuZXcgSHR0cFBhcmFtcygpXHJcblx0XHRcdFx0XHRmb3IgKGNvbnN0IGtleSBpbiBvcHRpb25zUGFyYW1zKSB7XHJcblx0XHRcdFx0XHRcdGNvbnN0IG9wdFBhcmFtID0gb3B0aW9uc1BhcmFtc1trZXldXHJcblx0XHRcdFx0XHRcdGlmICgodHlwZW9mIG9wdFBhcmFtID09PSAnb2JqZWN0JykgJiYgKG9wdFBhcmFtICE9PSBudWxsKSkge1xyXG5cdFx0XHRcdFx0XHRcdGlmIChvcHRQYXJhbSBpbnN0YW5jZW9mIEFycmF5KSB7XHJcblx0XHRcdFx0XHRcdFx0XHRvcHRQYXJhbS5mb3JFYWNoKChpdGVtKSA9PiB7XHJcblx0XHRcdFx0XHRcdFx0XHRcdGlmICgodHlwZW9mIGl0ZW0gPT09ICdvYmplY3QnKSAmJiAoaXRlbSAhPT0gbnVsbCkpIHtcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRmb3IgKGNvbnN0IGlubmVyS2V5IGluIGl0ZW0pIHtcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdGh0dHBQYXJhbXMgPSBodHRwUGFyYW1zLnNldChgJHtrZXl9WyR7aW5uZXJLZXl9XWAsIGl0ZW1baW5uZXJLZXldKVxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRyZXR1cm5cclxuXHRcdFx0XHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0XHRcdFx0XHRodHRwUGFyYW1zID0gaHR0cFBhcmFtcy5zZXQoYCR7a2V5fVtdYCwgaXRlbSlcclxuXHRcdFx0XHRcdFx0XHRcdH0pXHJcblx0XHRcdFx0XHRcdFx0XHRjb250aW51ZVxyXG5cdFx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdFx0XHRmb3IgKGNvbnN0IGlubmVyS2V5IGluIG9wdFBhcmFtKSB7XHJcblx0XHRcdFx0XHRcdFx0XHRodHRwUGFyYW1zID0gaHR0cFBhcmFtcy5zZXQoYCR7a2V5fVske2lubmVyS2V5fV1gLCBvcHRQYXJhbVtpbm5lcktleV0pXHJcblx0XHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0XHRcdGNvbnRpbnVlXHJcblx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdFx0aHR0cFBhcmFtcyA9IGh0dHBQYXJhbXMuc2V0KGtleSwgb3B0UGFyYW0pXHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRodHRwUGFyYW1zID0gaHR0cFBhcmFtcy5zZXQoJ18nLCAobmV3IERhdGUoKSkuZ2V0VGltZSgpLnRvU3RyaW5nKCkpXHJcblx0XHRcdFx0XHRyZXF1ZXN0T3B0aW9ucy5wYXJhbXMgPSBodHRwUGFyYW1zXHJcblx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdGlmICghcmVxdWVzdE9wdGlvbnMgfHwgKHR5cGVvZiByZXF1ZXN0T3B0aW9ucyAhPT0gJ29iamVjdCcpKSB7XHJcblx0XHRcdFx0XHRcdHJlcXVlc3RPcHRpb25zID0ge31cclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdGJvZHkgPSAoIXJlcXVlc3RPcHRpb25zLmJvZHkgfHwgKHR5cGVvZiByZXF1ZXN0T3B0aW9ucy5ib2R5ICE9PSAnb2JqZWN0JykpID8ge30gOiByZXF1ZXN0T3B0aW9ucy5ib2R5XHJcblx0XHRcdFx0XHRib2R5Ll8gPSAobmV3IERhdGUoKSkuZ2V0VGltZSgpXHJcblx0XHRcdFx0XHRkZWxldGUgcmVxdWVzdE9wdGlvbnMuYm9keVxyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHRpZiAoIXJlcXVlc3RPcHRpb25zLnJlc3BvbnNlVHlwZSkge31cclxuXHRcdFx0XHR0aGlzLmNsaWVudC5yZXF1ZXN0KG5ldyBIdHRwUmVxdWVzdChtZXRob2QsIHVybCwgYm9keSwgcmVxdWVzdE9wdGlvbnMpKS50b1Byb21pc2UoKS50aGVuKFxyXG5cdFx0XHRcdFx0KHJlc3BvbnNlOiBIdHRwUmVzcG9uc2U8YW55PikgPT4gcnVuT3B0aW9ucy5yZXNvbHZlV2l0aEZ1bGxSZXNwb25zZSA/IHJlc29sdmUocmVzcG9uc2UpIDogcmVzb2x2ZShyZXNwb25zZS5ib2R5KSxcclxuXHRcdFx0XHRcdChlcnJvcjogYW55KSA9PiByZWplY3QoZXJyb3IpXHJcblx0XHRcdFx0KVxyXG5cdFx0XHR9IGNhdGNoKGVycm9yKSB7XHJcblx0XHRcdFx0cmVqZWN0KGVycm9yKVxyXG5cdFx0XHR9XHJcblx0XHR9KVxyXG5cdH1cclxufVxyXG4iXX0=