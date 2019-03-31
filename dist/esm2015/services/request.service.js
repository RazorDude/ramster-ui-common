/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest } from '@angular/common/http';
export class RequestService {
    /**
     * @param {?} client
     */
    constructor(client) {
        this.client = client;
    }
    /**
     * @param {?} object
     * @param {?=} parentKey
     * @return {?}
     */
    flattenObjectForQuery(object, parentKey) {
        /** @type {?} */
        let returnObject = [];
        if (object instanceof Array) {
            if (!parentKey) {
                throw { error: 'The top-most item cannot be an array.' };
            }
            object.forEach((item) => {
                if (item === null) {
                    return;
                }
                if ((item instanceof Date) || !(item instanceof Array) || (typeof item !== 'object')) {
                    returnObject.push({ key: `${parentKey}[]`, value: item });
                    return;
                }
                returnObject = returnObject.concat(this.flattenObjectForQuery(item, `${parentKey}[]`));
                return;
            });
            return returnObject;
        }
        for (const key in object) {
            /** @type {?} */
            const value = object[key];
            if (value === null) {
                continue;
            }
            if ((value instanceof Date) || (typeof value !== 'object')) {
                returnObject.push({ key: parentKey ? `${parentKey}[${key}]` : key, value });
                continue;
            }
            returnObject = returnObject.concat(this.flattenObjectForQuery(value, parentKey ? `${parentKey}[${key}]` : key));
        }
        return returnObject;
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
                let actualUrl = url;
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
                    const optionsParams = this.flattenObjectForQuery(requestOptions.params || {});
                    actualUrl += `?_=${(new Date()).getTime().toString()}`;
                    if (optionsParams.length) {
                        optionsParams.forEach((item, index) => {
                            actualUrl += `&${item.key}=${item.value}`;
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
                this.client.request(new HttpRequest(method, actualUrl, body, requestOptions)).toPromise().then((response) => runOptions.resolveWithFullResponse ? resolve(response) : resolve(response.body), (error) => reject(error));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVxdWVzdC5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vcmFtc3Rlci11aS1jb3JlLyIsInNvdXJjZXMiOlsic2VydmljZXMvcmVxdWVzdC5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFDLFVBQVUsRUFBQyxNQUFNLGVBQWUsQ0FBQTtBQUN4QyxPQUFPLEVBQUMsVUFBVSxFQUFFLFdBQVcsRUFBZSxNQUFNLHNCQUFzQixDQUFBO0FBSTFFLE1BQU0sT0FBTyxjQUFjOzs7O0lBQzFCLFlBQW1CLE1BQWtCO1FBQWxCLFdBQU0sR0FBTixNQUFNLENBQVk7SUFBRyxDQUFDOzs7Ozs7SUFFekMscUJBQXFCLENBQUMsTUFBa0MsRUFBRSxTQUFrQjs7WUFDdkUsWUFBWSxHQUFHLEVBQUU7UUFDckIsSUFBSSxNQUFNLFlBQVksS0FBSyxFQUFFO1lBQzVCLElBQUksQ0FBQyxTQUFTLEVBQUU7Z0JBQ2YsTUFBTSxFQUFDLEtBQUssRUFBRSx1Q0FBdUMsRUFBQyxDQUFBO2FBQ3REO1lBQ0QsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFO2dCQUN2QixJQUFJLElBQUksS0FBSyxJQUFJLEVBQUU7b0JBQ2xCLE9BQU07aUJBQ047Z0JBQ0QsSUFBSSxDQUFDLElBQUksWUFBWSxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxZQUFZLEtBQUssQ0FBQyxJQUFLLENBQUMsT0FBTyxJQUFJLEtBQUssUUFBUSxDQUFDLEVBQUU7b0JBQ3RGLFlBQVksQ0FBQyxJQUFJLENBQUMsRUFBQyxHQUFHLEVBQUUsR0FBRyxTQUFTLElBQUksRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFDLENBQUMsQ0FBQTtvQkFDdkQsT0FBTTtpQkFDTjtnQkFDRCxZQUFZLEdBQUcsWUFBWSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMscUJBQXFCLENBQUMsSUFBSSxFQUFFLEdBQUcsU0FBUyxJQUFJLENBQUMsQ0FBQyxDQUFB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LE9BQU8sY0FBYyxDQUFDLElBQUksQ0FBQTtpQkFDMUI7Z0JBQ0QsdUNBQXVDO2dCQUN2QyxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxJQUFJLFdBQVcsQ0FBQyxNQUFNLEVBQUUsU0FBUyxFQUFFLElBQUksRUFBRSxjQUFjLENBQUMsQ0FBQyxDQUFDLFNBQVMsRUFBRSxDQUFDLElBQUksQ0FDN0YsQ0FBQyxRQUEyQixFQUFFLEVBQUUsQ0FBQyxVQUFVLENBQUMsdUJBQXVCLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsRUFDaEgsQ0FBQyxLQUFVLEVBQUUsRUFBRSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FDN0IsQ0FBQTthQUNEO1lBQUMsT0FBTSxLQUFLLEVBQUU7Z0JBQ2QsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFBO2FBQ2I7UUFDRixDQUFDLENBQUMsQ0FBQTtJQUNILENBQUM7OztZQTdFRCxVQUFVOzs7O1lBSEgsVUFBVTs7OztJQUtMLGdDQUF5QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7SW5qZWN0YWJsZX0gZnJvbSAnQGFuZ3VsYXIvY29yZSdcclxuaW1wb3J0IHtIdHRwQ2xpZW50LCBIdHRwUmVxdWVzdCwgSHR0cFJlc3BvbnNlfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCdcclxuXHJcblxyXG5ASW5qZWN0YWJsZSgpXHJcbmV4cG9ydCBjbGFzcyBSZXF1ZXN0U2VydmljZSB7XHJcblx0Y29uc3RydWN0b3IocHVibGljIGNsaWVudDogSHR0cENsaWVudCkge31cclxuXHJcblx0ZmxhdHRlbk9iamVjdEZvclF1ZXJ5KG9iamVjdDoge1t4OiBzdHJpbmddOiBhbnl9IHwgYW55W10sIHBhcmVudEtleT86IHN0cmluZyk6IHtrZXk6IHN0cmluZywgdmFsdWU6IGFueX1bXSB7XHJcblx0XHRsZXQgcmV0dXJuT2JqZWN0ID0gW11cclxuXHRcdGlmIChvYmplY3QgaW5zdGFuY2VvZiBBcnJheSkge1xyXG5cdFx0XHRpZiAoIXBhcmVudEtleSkge1xyXG5cdFx0XHRcdHRocm93IHtlcnJvcjogJ1RoZSB0b3AtbW9zdCBpdGVtIGNhbm5vdCBiZSBhbiBhcnJheS4nfVxyXG5cdFx0XHR9XHJcblx0XHRcdG9iamVjdC5mb3JFYWNoKChpdGVtKSA9PiB7XHJcblx0XHRcdFx0aWYgKGl0ZW0gPT09IG51bGwpIHtcclxuXHRcdFx0XHRcdHJldHVyblxyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHRpZiAoKGl0ZW0gaW5zdGFuY2VvZiBEYXRlKSB8fCAhKGl0ZW0gaW5zdGFuY2VvZiBBcnJheSkgIHx8ICh0eXBlb2YgaXRlbSAhPT0gJ29iamVjdCcpKSB7XHJcblx0XHRcdFx0XHRyZXR1cm5PYmplY3QucHVzaCh7a2V5OiBgJHtwYXJlbnRLZXl9W11gLCB2YWx1ZTogaXRlbX0pXHJcblx0XHRcdFx0XHRyZXR1cm5cclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0cmV0dXJuT2JqZWN0ID0gcmV0dXJuT2JqZWN0LmNvbmNhdCh0aGlzLmZsYXR0ZW5PYmplY3RGb3JRdWVyeShpdGVtLCBgJHtwYXJlbnRLZXl9W11gKSlcclxuXHRcdFx0XHRyZXR1cm5cclxuXHRcdFx0fSlcclxuXHRcdFx0cmV0dXJuIHJldHVybk9iamVjdFxyXG5cdFx0fVxyXG5cdFx0Zm9yIChjb25zdCBrZXkgaW4gb2JqZWN0KSB7XHJcblx0XHRcdGNvbnN0IHZhbHVlID0gb2JqZWN0W2tleV1cclxuXHRcdFx0aWYgKHZhbHVlID09PSBudWxsKSB7XHJcblx0XHRcdFx0Y29udGludWVcclxuXHRcdFx0fVxyXG5cdFx0XHRpZiAoKHZhbHVlIGluc3RhbmNlb2YgRGF0ZSkgfHwgKHR5cGVvZiB2YWx1ZSAhPT0gJ29iamVjdCcpKSB7XHJcblx0XHRcdFx0cmV0dXJuT2JqZWN0LnB1c2goe2tleTogcGFyZW50S2V5ID8gYCR7cGFyZW50S2V5fVske2tleX1dYDoga2V5LCB2YWx1ZX0pXHJcblx0XHRcdFx0Y29udGludWVcclxuXHRcdFx0fVxyXG5cdFx0XHRyZXR1cm5PYmplY3QgPSByZXR1cm5PYmplY3QuY29uY2F0KHRoaXMuZmxhdHRlbk9iamVjdEZvclF1ZXJ5KHZhbHVlLCBwYXJlbnRLZXkgPyBgJHtwYXJlbnRLZXl9WyR7a2V5fV1gIDoga2V5KSlcclxuXHRcdH1cclxuXHRcdHJldHVybiByZXR1cm5PYmplY3RcclxuXHR9XHJcblxyXG5cdHJ1bihtZXRob2Q6IHN0cmluZywgdXJsOiBzdHJpbmcsIG9wdGlvbnM/OiB7W3g6IHN0cmluZ106IGFueX0pIHtcclxuXHRcdHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcblx0XHRcdHRyeSB7XHJcblx0XHRcdFx0bGV0IGFjdHVhbFVybCA9IHVybCxcclxuXHRcdFx0XHRcdHJ1bk9wdGlvbnMgPSB7fSBhcyBhbnksXHJcblx0XHRcdFx0XHRyZXF1ZXN0T3B0aW9ucyA9IHt9IGFzIGFueSxcclxuXHRcdFx0XHRcdGJvZHkgPSBudWxsXHJcblx0XHRcdFx0aWYgKG9wdGlvbnMgJiYgKHR5cGVvZiBvcHRpb25zID09PSAnb2JqZWN0JykpIHtcclxuXHRcdFx0XHRcdGxldCB7cmVzb2x2ZVdpdGhGdWxsUmVzcG9uc2UsIC4uLiBvdGhlck9wdGlvbnN9ID0gb3B0aW9uc1xyXG5cdFx0XHRcdFx0cmVxdWVzdE9wdGlvbnMgPSBvdGhlck9wdGlvbnNcclxuXHRcdFx0XHRcdHJ1bk9wdGlvbnMgPSB7cmVzb2x2ZVdpdGhGdWxsUmVzcG9uc2V9XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdGlmIChtZXRob2QudG9Mb3dlckNhc2UoKSA9PT0gJ2dldCcpIHtcclxuXHRcdFx0XHRcdGlmICghcmVxdWVzdE9wdGlvbnMgfHwgKHR5cGVvZiByZXF1ZXN0T3B0aW9ucyAhPT0gJ29iamVjdCcpKSB7XHJcblx0XHRcdFx0XHRcdHJlcXVlc3RPcHRpb25zID0ge31cclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdGNvbnN0IG9wdGlvbnNQYXJhbXMgPSB0aGlzLmZsYXR0ZW5PYmplY3RGb3JRdWVyeShyZXF1ZXN0T3B0aW9ucy5wYXJhbXMgfHwge30pXHJcblx0XHRcdFx0XHRhY3R1YWxVcmwgKz0gYD9fPSR7KG5ldyBEYXRlKCkpLmdldFRpbWUoKS50b1N0cmluZygpfWBcclxuXHRcdFx0XHRcdGlmIChvcHRpb25zUGFyYW1zLmxlbmd0aCkge1xyXG5cdFx0XHRcdFx0XHRvcHRpb25zUGFyYW1zLmZvckVhY2goKGl0ZW0sIGluZGV4KSA9PiB7XHJcblx0XHRcdFx0XHRcdFx0YWN0dWFsVXJsICs9IGAmJHtpdGVtLmtleX09JHtpdGVtLnZhbHVlfWBcclxuXHRcdFx0XHRcdFx0fSlcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0aWYgKCFyZXF1ZXN0T3B0aW9ucyB8fCAodHlwZW9mIHJlcXVlc3RPcHRpb25zICE9PSAnb2JqZWN0JykpIHtcclxuXHRcdFx0XHRcdFx0cmVxdWVzdE9wdGlvbnMgPSB7fVxyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0Ym9keSA9ICghcmVxdWVzdE9wdGlvbnMuYm9keSB8fCAodHlwZW9mIHJlcXVlc3RPcHRpb25zLmJvZHkgIT09ICdvYmplY3QnKSkgPyB7fSA6IHJlcXVlc3RPcHRpb25zLmJvZHlcclxuXHRcdFx0XHRcdGJvZHkuXyA9IChuZXcgRGF0ZSgpKS5nZXRUaW1lKClcclxuXHRcdFx0XHRcdGRlbGV0ZSByZXF1ZXN0T3B0aW9ucy5ib2R5XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdC8vIGlmICghcmVxdWVzdE9wdGlvbnMucmVzcG9uc2VUeXBlKSB7fVxyXG5cdFx0XHRcdHRoaXMuY2xpZW50LnJlcXVlc3QobmV3IEh0dHBSZXF1ZXN0KG1ldGhvZCwgYWN0dWFsVXJsLCBib2R5LCByZXF1ZXN0T3B0aW9ucykpLnRvUHJvbWlzZSgpLnRoZW4oXHJcblx0XHRcdFx0XHQocmVzcG9uc2U6IEh0dHBSZXNwb25zZTxhbnk+KSA9PiBydW5PcHRpb25zLnJlc29sdmVXaXRoRnVsbFJlc3BvbnNlID8gcmVzb2x2ZShyZXNwb25zZSkgOiByZXNvbHZlKHJlc3BvbnNlLmJvZHkpLFxyXG5cdFx0XHRcdFx0KGVycm9yOiBhbnkpID0+IHJlamVjdChlcnJvcilcclxuXHRcdFx0XHQpXHJcblx0XHRcdH0gY2F0Y2goZXJyb3IpIHtcclxuXHRcdFx0XHRyZWplY3QoZXJyb3IpXHJcblx0XHRcdH1cclxuXHRcdH0pXHJcblx0fVxyXG59XHJcbiJdfQ==