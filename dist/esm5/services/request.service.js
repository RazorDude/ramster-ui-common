/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
            object.forEach(function (item) {
                if (item === null) {
                    return;
                }
                if ((item instanceof Date) || !(item instanceof Array) || (typeof item !== 'object')) {
                    returnObject.push({ key: parentKey + "[]", value: item });
                    return;
                }
                returnObject = returnObject.concat(_this.flattenObjectForQuery(item, parentKey + "[]"));
                return;
            });
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
        return new Promise(function (resolve, reject) {
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
                        optionsParams.forEach(function (item, index) {
                            actualUrl_1 += "&" + item.key + "=" + item.value;
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
                _this.client.request(new HttpRequest(method, actualUrl_1, body, requestOptions)).toPromise().then(function (response) { return runOptions_1.resolveWithFullResponse ? resolve(response) : resolve(response.body); }, function (error) { return reject(error); });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVxdWVzdC5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vcmFtc3Rlci11aS1jb3JlLyIsInNvdXJjZXMiOlsic2VydmljZXMvcmVxdWVzdC5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFDLFVBQVUsRUFBQyxNQUFNLGVBQWUsQ0FBQTtBQUN4QyxPQUFPLEVBQUMsVUFBVSxFQUFFLFdBQVcsRUFBZSxNQUFNLHNCQUFzQixDQUFBO0FBRzFFO0lBRUMsd0JBQW1CLE1BQWtCO1FBQWxCLFdBQU0sR0FBTixNQUFNLENBQVk7SUFBRyxDQUFDOzs7Ozs7SUFFekMsOENBQXFCOzs7OztJQUFyQixVQUFzQixNQUFrQyxFQUFFLFNBQWtCO1FBQTVFLGlCQStCQzs7WUE5QkksWUFBWSxHQUFHLEVBQUU7UUFDckIsSUFBSSxNQUFNLFlBQVksS0FBSyxFQUFFO1lBQzVCLElBQUksQ0FBQyxTQUFTLEVBQUU7Z0JBQ2YsTUFBTSxFQUFDLEtBQUssRUFBRSx1Q0FBdUMsRUFBQyxDQUFBO2FBQ3REO1lBQ0QsTUFBTSxDQUFDLE9BQU8sQ0FBQyxVQUFDLElBQUk7Z0JBQ25CLElBQUksSUFBSSxLQUFLLElBQUksRUFBRTtvQkFDbEIsT0FBTTtpQkFDTjtnQkFDRCxJQUFJLENBQUMsSUFBSSxZQUFZLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLFlBQVksS0FBSyxDQUFDLElBQUssQ0FBQyxPQUFPLElBQUksS0FBSyxRQUFRLENBQUMsRUFBRTtvQkFDdEYsWUFBWSxDQUFDLElBQUksQ0FBQyxFQUFDLEdBQUcsRUFBSyxTQUFTLE9BQUksRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFDLENBQUMsQ0FBQTtvQkFDdkQsT0FBTTtpQkFDTjtnQkFDRCxZQUFZLEdBQUcsWUFBWSxDQUFDLE1BQU0sQ0FBQyxLQUFJLENBQUMscUJBQXFCLENBQUMsSUFBSSxFQUFLLFNBQVMsT0FBSSxDQUFDLENBQUMsQ0FBQTtnQkFDdEYsT0FBTTtZQUNQLENBQUMsQ0FBQyxDQUFBO1lBQ0YsT0FBTyxZQUFZLENBQUE7U0FDbkI7UUFDRCxLQUFLLElBQU0sR0FBRyxJQUFJLE1BQU0sRUFBRTs7Z0JBQ25CLEtBQUssR0FBRyxNQUFNLENBQUMsR0FBRyxDQUFDO1lBQ3pCLElBQUksS0FBSyxLQUFLLElBQUksRUFBRTtnQkFDbkIsU0FBUTthQUNSO1lBQ0QsSUFBSSxDQUFDLEtBQUssWUFBWSxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sS0FBSyxLQUFLLFFBQVEsQ0FBQyxFQUFFO2dCQUMzRCxZQUFZLENBQUMsSUFBSSxDQUFDLEVBQUMsR0FBRyxFQUFFLFNBQVMsQ0FBQyxDQUFDLENBQUksU0FBUyxTQUFJLEdBQUcsTUFBRyxDQUFBLENBQUMsQ0FBQyxHQUFHLEVBQUUsS0FBSyxPQUFBLEVBQUMsQ0FBQyxDQUFBO2dCQUN4RSxTQUFRO2FBQ1I7WUFDRCxZQUFZLEdBQUcsWUFBWSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMscUJBQXFCLENBQUMsS0FBSyxFQUFFLFNBQVMsQ0FBQyxDQUFDLENBQUksU0FBUyxTQUFJLEdBQUcsTUFBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFBO1NBQy9HO1FBQ0QsT0FBTyxZQUFZLENBQUE7SUFDcEIsQ0FBQzs7Ozs7OztJQUVELDRCQUFHOzs7Ozs7SUFBSCxVQUFJLE1BQWMsRUFBRSxHQUFXLEVBQUUsT0FBNEI7UUFBN0QsaUJBd0NDO1FBdkNBLE9BQU8sSUFBSSxPQUFPLENBQUMsVUFBQyxPQUFPLEVBQUUsTUFBTTtZQUNsQyxJQUFJOztvQkFDQyxXQUFTLEdBQUcsR0FBRzs7b0JBQ2xCLFlBQVUsR0FBRyxtQkFBQSxFQUFFLEVBQU87O29CQUN0QixjQUFjLEdBQUcsbUJBQUEsRUFBRSxFQUFPOztvQkFDMUIsSUFBSSxHQUFHLElBQUk7Z0JBQ1osSUFBSSxPQUFPLElBQUksQ0FBQyxPQUFPLE9BQU8sS0FBSyxRQUFRLENBQUMsRUFBRTtvQkFDeEMsSUFBQSx5REFBdUIsRUFBRSxtRUFBZ0I7b0JBQzlDLGNBQWMsR0FBRyxZQUFZLENBQUE7b0JBQzdCLFlBQVUsR0FBRyxFQUFDLHVCQUF1Qix5QkFBQSxFQUFDLENBQUE7aUJBQ3RDO2dCQUNELElBQUksTUFBTSxDQUFDLFdBQVcsRUFBRSxLQUFLLEtBQUssRUFBRTtvQkFDbkMsSUFBSSxDQUFDLGNBQWMsSUFBSSxDQUFDLE9BQU8sY0FBYyxLQUFLLFFBQVEsQ0FBQyxFQUFFO3dCQUM1RCxjQUFjLEdBQUcsRUFBRSxDQUFBO3FCQUNuQjs7d0JBQ0ssYUFBYSxHQUFHLEtBQUksQ0FBQyxxQkFBcUIsQ0FBQyxjQUFjLENBQUMsTUFBTSxJQUFJLEVBQUUsQ0FBQztvQkFDN0UsV0FBUyxJQUFJLFFBQU0sQ0FBQyxJQUFJLElBQUksRUFBRSxDQUFDLENBQUMsT0FBTyxFQUFFLENBQUMsUUFBUSxFQUFJLENBQUE7b0JBQ3RELElBQUksYUFBYSxDQUFDLE1BQU0sRUFBRTt3QkFDekIsYUFBYSxDQUFDLE9BQU8sQ0FBQyxVQUFDLElBQUksRUFBRSxLQUFLOzRCQUNqQyxXQUFTLElBQUksTUFBSSxJQUFJLENBQUMsR0FBRyxTQUFJLElBQUksQ0FBQyxLQUFPLENBQUE7d0JBQzFDLENBQUMsQ0FBQyxDQUFBO3FCQUNGO2lCQUNEO3FCQUFNO29CQUNOLElBQUksQ0FBQyxjQUFjLElBQUksQ0FBQyxPQUFPLGNBQWMsS0FBSyxRQUFRLENBQUMsRUFBRTt3QkFDNUQsY0FBYyxHQUFHLEVBQUUsQ0FBQTtxQkFDbkI7b0JBQ0QsSUFBSSxHQUFHLENBQUMsQ0FBQyxjQUFjLENBQUMsSUFBSSxJQUFJLENBQUMsT0FBTyxjQUFjLENBQUMsSUFBSSxLQUFLLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQTtvQkFDckcsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLElBQUksSUFBSSxFQUFFLENBQUMsQ0FBQyxPQUFPLEVBQUUsQ0FBQTtvQkFDL0IsT0FBTyxjQUFjLENBQUMsSUFBSSxDQUFBO2lCQUMxQjtnQkFDRCx1Q0FBdUM7Z0JBQ3ZDLEtBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLElBQUksV0FBVyxDQUFDLE1BQU0sRUFBRSxXQUFTLEVBQUUsSUFBSSxFQUFFLGNBQWMsQ0FBQyxDQUFDLENBQUMsU0FBUyxFQUFFLENBQUMsSUFBSSxDQUM3RixVQUFDLFFBQTJCLElBQUssT0FBQSxZQUFVLENBQUMsdUJBQXVCLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsRUFBL0UsQ0FBK0UsRUFDaEgsVUFBQyxLQUFVLElBQUssT0FBQSxNQUFNLENBQUMsS0FBSyxDQUFDLEVBQWIsQ0FBYSxDQUM3QixDQUFBO2FBQ0Q7WUFBQyxPQUFNLEtBQUssRUFBRTtnQkFDZCxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUE7YUFDYjtRQUNGLENBQUMsQ0FBQyxDQUFBO0lBQ0gsQ0FBQzs7Z0JBN0VELFVBQVU7Ozs7Z0JBSEgsVUFBVTs7SUFpRmxCLHFCQUFDO0NBQUEsQUE5RUQsSUE4RUM7U0E3RVksY0FBYzs7O0lBQ2QsZ0NBQXlCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtJbmplY3RhYmxlfSBmcm9tICdAYW5ndWxhci9jb3JlJ1xyXG5pbXBvcnQge0h0dHBDbGllbnQsIEh0dHBSZXF1ZXN0LCBIdHRwUmVzcG9uc2V9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJ1xyXG5cclxuXHJcbkBJbmplY3RhYmxlKClcclxuZXhwb3J0IGNsYXNzIFJlcXVlc3RTZXJ2aWNlIHtcclxuXHRjb25zdHJ1Y3RvcihwdWJsaWMgY2xpZW50OiBIdHRwQ2xpZW50KSB7fVxyXG5cclxuXHRmbGF0dGVuT2JqZWN0Rm9yUXVlcnkob2JqZWN0OiB7W3g6IHN0cmluZ106IGFueX0gfCBhbnlbXSwgcGFyZW50S2V5Pzogc3RyaW5nKToge2tleTogc3RyaW5nLCB2YWx1ZTogYW55fVtdIHtcclxuXHRcdGxldCByZXR1cm5PYmplY3QgPSBbXVxyXG5cdFx0aWYgKG9iamVjdCBpbnN0YW5jZW9mIEFycmF5KSB7XHJcblx0XHRcdGlmICghcGFyZW50S2V5KSB7XHJcblx0XHRcdFx0dGhyb3cge2Vycm9yOiAnVGhlIHRvcC1tb3N0IGl0ZW0gY2Fubm90IGJlIGFuIGFycmF5Lid9XHJcblx0XHRcdH1cclxuXHRcdFx0b2JqZWN0LmZvckVhY2goKGl0ZW0pID0+IHtcclxuXHRcdFx0XHRpZiAoaXRlbSA9PT0gbnVsbCkge1xyXG5cdFx0XHRcdFx0cmV0dXJuXHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdGlmICgoaXRlbSBpbnN0YW5jZW9mIERhdGUpIHx8ICEoaXRlbSBpbnN0YW5jZW9mIEFycmF5KSAgfHwgKHR5cGVvZiBpdGVtICE9PSAnb2JqZWN0JykpIHtcclxuXHRcdFx0XHRcdHJldHVybk9iamVjdC5wdXNoKHtrZXk6IGAke3BhcmVudEtleX1bXWAsIHZhbHVlOiBpdGVtfSlcclxuXHRcdFx0XHRcdHJldHVyblxyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHRyZXR1cm5PYmplY3QgPSByZXR1cm5PYmplY3QuY29uY2F0KHRoaXMuZmxhdHRlbk9iamVjdEZvclF1ZXJ5KGl0ZW0sIGAke3BhcmVudEtleX1bXWApKVxyXG5cdFx0XHRcdHJldHVyblxyXG5cdFx0XHR9KVxyXG5cdFx0XHRyZXR1cm4gcmV0dXJuT2JqZWN0XHJcblx0XHR9XHJcblx0XHRmb3IgKGNvbnN0IGtleSBpbiBvYmplY3QpIHtcclxuXHRcdFx0Y29uc3QgdmFsdWUgPSBvYmplY3Rba2V5XVxyXG5cdFx0XHRpZiAodmFsdWUgPT09IG51bGwpIHtcclxuXHRcdFx0XHRjb250aW51ZVxyXG5cdFx0XHR9XHJcblx0XHRcdGlmICgodmFsdWUgaW5zdGFuY2VvZiBEYXRlKSB8fCAodHlwZW9mIHZhbHVlICE9PSAnb2JqZWN0JykpIHtcclxuXHRcdFx0XHRyZXR1cm5PYmplY3QucHVzaCh7a2V5OiBwYXJlbnRLZXkgPyBgJHtwYXJlbnRLZXl9WyR7a2V5fV1gOiBrZXksIHZhbHVlfSlcclxuXHRcdFx0XHRjb250aW51ZVxyXG5cdFx0XHR9XHJcblx0XHRcdHJldHVybk9iamVjdCA9IHJldHVybk9iamVjdC5jb25jYXQodGhpcy5mbGF0dGVuT2JqZWN0Rm9yUXVlcnkodmFsdWUsIHBhcmVudEtleSA/IGAke3BhcmVudEtleX1bJHtrZXl9XWAgOiBrZXkpKVxyXG5cdFx0fVxyXG5cdFx0cmV0dXJuIHJldHVybk9iamVjdFxyXG5cdH1cclxuXHJcblx0cnVuKG1ldGhvZDogc3RyaW5nLCB1cmw6IHN0cmluZywgb3B0aW9ucz86IHtbeDogc3RyaW5nXTogYW55fSkge1xyXG5cdFx0cmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuXHRcdFx0dHJ5IHtcclxuXHRcdFx0XHRsZXQgYWN0dWFsVXJsID0gdXJsLFxyXG5cdFx0XHRcdFx0cnVuT3B0aW9ucyA9IHt9IGFzIGFueSxcclxuXHRcdFx0XHRcdHJlcXVlc3RPcHRpb25zID0ge30gYXMgYW55LFxyXG5cdFx0XHRcdFx0Ym9keSA9IG51bGxcclxuXHRcdFx0XHRpZiAob3B0aW9ucyAmJiAodHlwZW9mIG9wdGlvbnMgPT09ICdvYmplY3QnKSkge1xyXG5cdFx0XHRcdFx0bGV0IHtyZXNvbHZlV2l0aEZ1bGxSZXNwb25zZSwgLi4uIG90aGVyT3B0aW9uc30gPSBvcHRpb25zXHJcblx0XHRcdFx0XHRyZXF1ZXN0T3B0aW9ucyA9IG90aGVyT3B0aW9uc1xyXG5cdFx0XHRcdFx0cnVuT3B0aW9ucyA9IHtyZXNvbHZlV2l0aEZ1bGxSZXNwb25zZX1cclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0aWYgKG1ldGhvZC50b0xvd2VyQ2FzZSgpID09PSAnZ2V0Jykge1xyXG5cdFx0XHRcdFx0aWYgKCFyZXF1ZXN0T3B0aW9ucyB8fCAodHlwZW9mIHJlcXVlc3RPcHRpb25zICE9PSAnb2JqZWN0JykpIHtcclxuXHRcdFx0XHRcdFx0cmVxdWVzdE9wdGlvbnMgPSB7fVxyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0Y29uc3Qgb3B0aW9uc1BhcmFtcyA9IHRoaXMuZmxhdHRlbk9iamVjdEZvclF1ZXJ5KHJlcXVlc3RPcHRpb25zLnBhcmFtcyB8fCB7fSlcclxuXHRcdFx0XHRcdGFjdHVhbFVybCArPSBgP189JHsobmV3IERhdGUoKSkuZ2V0VGltZSgpLnRvU3RyaW5nKCl9YFxyXG5cdFx0XHRcdFx0aWYgKG9wdGlvbnNQYXJhbXMubGVuZ3RoKSB7XHJcblx0XHRcdFx0XHRcdG9wdGlvbnNQYXJhbXMuZm9yRWFjaCgoaXRlbSwgaW5kZXgpID0+IHtcclxuXHRcdFx0XHRcdFx0XHRhY3R1YWxVcmwgKz0gYCYke2l0ZW0ua2V5fT0ke2l0ZW0udmFsdWV9YFxyXG5cdFx0XHRcdFx0XHR9KVxyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHRpZiAoIXJlcXVlc3RPcHRpb25zIHx8ICh0eXBlb2YgcmVxdWVzdE9wdGlvbnMgIT09ICdvYmplY3QnKSkge1xyXG5cdFx0XHRcdFx0XHRyZXF1ZXN0T3B0aW9ucyA9IHt9XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRib2R5ID0gKCFyZXF1ZXN0T3B0aW9ucy5ib2R5IHx8ICh0eXBlb2YgcmVxdWVzdE9wdGlvbnMuYm9keSAhPT0gJ29iamVjdCcpKSA/IHt9IDogcmVxdWVzdE9wdGlvbnMuYm9keVxyXG5cdFx0XHRcdFx0Ym9keS5fID0gKG5ldyBEYXRlKCkpLmdldFRpbWUoKVxyXG5cdFx0XHRcdFx0ZGVsZXRlIHJlcXVlc3RPcHRpb25zLmJvZHlcclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0Ly8gaWYgKCFyZXF1ZXN0T3B0aW9ucy5yZXNwb25zZVR5cGUpIHt9XHJcblx0XHRcdFx0dGhpcy5jbGllbnQucmVxdWVzdChuZXcgSHR0cFJlcXVlc3QobWV0aG9kLCBhY3R1YWxVcmwsIGJvZHksIHJlcXVlc3RPcHRpb25zKSkudG9Qcm9taXNlKCkudGhlbihcclxuXHRcdFx0XHRcdChyZXNwb25zZTogSHR0cFJlc3BvbnNlPGFueT4pID0+IHJ1bk9wdGlvbnMucmVzb2x2ZVdpdGhGdWxsUmVzcG9uc2UgPyByZXNvbHZlKHJlc3BvbnNlKSA6IHJlc29sdmUocmVzcG9uc2UuYm9keSksXHJcblx0XHRcdFx0XHQoZXJyb3I6IGFueSkgPT4gcmVqZWN0KGVycm9yKVxyXG5cdFx0XHRcdClcclxuXHRcdFx0fSBjYXRjaChlcnJvcikge1xyXG5cdFx0XHRcdHJlamVjdChlcnJvcilcclxuXHRcdFx0fVxyXG5cdFx0fSlcclxuXHR9XHJcbn1cclxuIl19