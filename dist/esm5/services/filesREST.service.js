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
var FilesRESTService = /** @class */ (function () {
    function FilesRESTService(globalEventsService, requestService) {
        this.globalEventsService = globalEventsService;
        this.requestService = requestService;
        // {'Content-Type': 'application/json'}
        this.headers = new HttpHeaders();
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
                var fd, key;
                return tslib_1.__generator(this, function (_a) {
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
            })).then((/**
             * @param {?} res
             * @return {?}
             */
            function (res) { return resolve(res); }), (/**
             * @param {?} err
             * @return {?}
             */
            function (err) {
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
                                params: params
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
    FilesRESTService.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    FilesRESTService.ctorParameters = function () { return [
        { type: GlobalEventsService },
        { type: RequestService }
    ]; };
    return FilesRESTService;
}());
export { FilesRESTService };
if (false) {
    /** @type {?} */
    FilesRESTService.prototype.headers;
    /** @type {?} */
    FilesRESTService.prototype.baseUrl;
    /** @type {?} */
    FilesRESTService.prototype.globalEventsService;
    /** @type {?} */
    FilesRESTService.prototype.requestService;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlsZXNSRVNULnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9yYW1zdGVyLXVpLWNvcmUvIiwic291cmNlcyI6WyJzZXJ2aWNlcy9maWxlc1JFU1Quc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBRSxNQUFNLElBQUksQ0FBQTtBQUNuQixPQUFPLEVBQUMsVUFBVSxFQUFDLE1BQU0sZUFBZSxDQUFBO0FBQ3hDLE9BQU8sRUFBQyxXQUFXLEVBQUMsTUFBTSxzQkFBc0IsQ0FBQTtBQUVoRCxPQUFPLEVBQUMsbUJBQW1CLEVBQUMsTUFBTSxxQ0FBcUMsQ0FBQTtBQUN2RSxPQUFPLEVBQUMsY0FBYyxFQUFDLE1BQU0sbUJBQW1CLENBQUE7QUFFaEQ7SUFNQywwQkFDUSxtQkFBd0MsRUFDeEMsY0FBOEI7UUFEOUIsd0JBQW1CLEdBQW5CLG1CQUFtQixDQUFxQjtRQUN4QyxtQkFBYyxHQUFkLGNBQWMsQ0FBZ0I7O1FBTHRDLFlBQU8sR0FBRyxJQUFJLFdBQVcsRUFBRSxDQUFBO1FBQzNCLFlBQU8sR0FBRyxRQUFRLENBQUE7SUFLZixDQUFDOzs7OztJQUVKLHNDQUFXOzs7O0lBQVgsVUFBWSxHQUFHO1FBQ2QsSUFBSSxDQUFDLG1CQUFtQixDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUUsR0FBRyxJQUFJLEdBQUcsQ0FBQyxLQUFLLElBQUksR0FBRyxDQUFDLEtBQUssQ0FBQyxLQUFLLElBQUksd0JBQXdCLENBQUMsQ0FBQTtJQUMxRyxDQUFDOzs7Ozs7O0lBRUQsaUNBQU07Ozs7OztJQUFOLFVBQU8sSUFBVSxFQUFFLE1BQWtELEVBQUUsT0FBaUM7O1lBQ2pHLFFBQVEsR0FBRyxJQUFJO1FBQ3JCLE9BQU8sSUFBSSxPQUFPOzs7OztRQUFDLFVBQUMsT0FBTyxFQUFFLE1BQU07WUFDbEMsRUFBRTs7O1lBQUM7Ozs7OzRCQUNFLEVBQUUsR0FBRyxJQUFJLFFBQVEsRUFBRTs0QkFDdkIsRUFBRSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQTs0QkFDbEMsS0FBVyxHQUFHLElBQUksTUFBTSxFQUFFO2dDQUN6QixFQUFFLENBQUMsTUFBTSxDQUFDLEdBQUcsRUFBRSxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQTs2QkFDM0I7NEJBQ0QsUUFBUSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsY0FBYyxFQUFFLHFCQUFxQixDQUFDLENBQUE7NEJBQzNELHFCQUFNLFFBQVEsQ0FBQyxjQUFjLENBQUMsR0FBRyxDQUFDLE1BQU0sRUFBRSxLQUFHLFFBQVEsQ0FBQyxPQUFTLEVBQUU7b0NBQ2hFLE9BQU8sRUFBRSxRQUFRLENBQUMsT0FBTztvQ0FDekIsSUFBSSxFQUFFLEVBQUU7aUNBQ1IsQ0FBQyxFQUFBOzs0QkFIRixTQUdFLENBQUE7NEJBQ0Ysc0JBQU8sRUFBQyxPQUFPLEVBQUUsSUFBSSxFQUFDLEVBQUE7OzthQUN0QixFQUFDLENBQUMsSUFBSTs7OztZQUFDLFVBQUMsR0FBRyxJQUFLLE9BQUEsT0FBTyxDQUFDLEdBQUcsQ0FBQyxFQUFaLENBQVk7Ozs7WUFBRSxVQUFDLEdBQUc7Z0JBQ2xDLElBQUksT0FBTyxJQUFJLE9BQU8sQ0FBQyxXQUFXLEVBQUU7b0JBQ25DLFFBQVEsQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLENBQUE7aUJBQ3pCO2dCQUNELE1BQU0sQ0FBQyxFQUFDLEtBQUssRUFBRSxHQUFHLElBQUksSUFBSSxFQUFDLENBQUMsQ0FBQTtZQUM3QixDQUFDLEVBQUMsQ0FBQTtRQUNILENBQUMsRUFBQyxDQUFBO0lBQ0gsQ0FBQzs7Ozs7SUFFRCwrQkFBSTs7OztJQUFKLFVBQUssTUFBTTs7WUFDSixRQUFRLEdBQUcsSUFBSTtRQUNyQixPQUFPLElBQUksT0FBTzs7Ozs7UUFBQyxVQUFDLE9BQU8sRUFBRSxNQUFNO1lBQ2xDLEVBQUU7OztZQUFDOzs7Z0NBQ0sscUJBQU0sUUFBUSxDQUFDLGNBQWMsQ0FBQyxHQUFHLENBQUMsS0FBSyxFQUFLLFFBQVEsQ0FBQyxPQUFPLFVBQU8sRUFBRTtnQ0FDM0UsT0FBTyxFQUFFLFFBQVEsQ0FBQyxPQUFPO2dDQUN6QixNQUFNLFFBQUE7NkJBQ04sQ0FBQyxFQUFBO2dDQUhGLHNCQUFPLFNBR0wsRUFBQTs7O2FBQ0YsRUFBQyxDQUFDLElBQUk7Ozs7WUFBQyxVQUFDLEdBQUcsSUFBSyxPQUFBLE9BQU8sQ0FBQyxHQUFHLENBQUMsRUFBWixDQUFZOzs7O1lBQUUsVUFBQyxHQUFHO2dCQUNsQyxRQUFRLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxDQUFBO2dCQUN6QixNQUFNLENBQUMsRUFBQyxLQUFLLEVBQUUsSUFBSSxFQUFDLENBQUMsQ0FBQTtZQUN0QixDQUFDLEVBQUMsQ0FBQTtRQUNILENBQUMsRUFBQyxDQUFBO0lBQ0gsQ0FBQzs7Z0JBcERELFVBQVU7Ozs7Z0JBSEgsbUJBQW1CO2dCQUNuQixjQUFjOztJQXVEdEIsdUJBQUM7Q0FBQSxBQXJERCxJQXFEQztTQXBEWSxnQkFBZ0I7OztJQUU1QixtQ0FBMkI7O0lBQzNCLG1DQUFrQjs7SUFHakIsK0NBQStDOztJQUMvQywwQ0FBcUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgY28gZnJvbSAnY28nXHJcbmltcG9ydCB7SW5qZWN0YWJsZX0gZnJvbSAnQGFuZ3VsYXIvY29yZSdcclxuaW1wb3J0IHtIdHRwSGVhZGVyc30gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnXHJcblxyXG5pbXBvcnQge0dsb2JhbEV2ZW50c1NlcnZpY2V9IGZyb20gJy4vZ2xvYmFsRXZlbnRzL2dsb2JhbEV2ZW50cy5zZXJ2aWNlJ1xyXG5pbXBvcnQge1JlcXVlc3RTZXJ2aWNlfSBmcm9tICcuL3JlcXVlc3Quc2VydmljZSdcclxuXHJcbkBJbmplY3RhYmxlKClcclxuZXhwb3J0IGNsYXNzIEZpbGVzUkVTVFNlcnZpY2Uge1xyXG5cdC8vIHsnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nfVxyXG5cdGhlYWRlcnMgPSBuZXcgSHR0cEhlYWRlcnMoKVxyXG5cdGJhc2VVcmwgPSAnL2ZpbGVzJ1xyXG5cclxuXHRjb25zdHJ1Y3RvcihcclxuXHRcdHB1YmxpYyBnbG9iYWxFdmVudHNTZXJ2aWNlOiBHbG9iYWxFdmVudHNTZXJ2aWNlLFxyXG5cdFx0cHVibGljIHJlcXVlc3RTZXJ2aWNlOiBSZXF1ZXN0U2VydmljZVxyXG5cdCkge31cclxuXHJcblx0aGFuZGxlRXJyb3IoZXJyKTogdm9pZCB7XHJcblx0XHR0aGlzLmdsb2JhbEV2ZW50c1NlcnZpY2Uubm90aWZ5KCdlcnJvcicsIGVyciAmJiBlcnIuZXJyb3IgJiYgZXJyLmVycm9yLmVycm9yIHx8ICdBbiBlcnJvciBoYXMgb2NjdXJyZWQuJylcclxuXHR9XHJcblxyXG5cdHVwbG9hZChmaWxlOiBGaWxlLCBwYXJhbXM6IHtvdXRwdXRGaWxlTmFtZTogc3RyaW5nLCBbeDogc3RyaW5nXTogYW55fSwgb3B0aW9ucz86IHtoYW5kbGVFcnJvcj86IGJvb2xlYW59KTogUHJvbWlzZTxhbnk+IHtcclxuXHRcdGNvbnN0IGluc3RhbmNlID0gdGhpc1xyXG5cdFx0cmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuXHRcdFx0Y28oZnVuY3Rpb24qKCkge1xyXG5cdFx0XHRcdGxldCBmZCA9IG5ldyBGb3JtRGF0YSgpXHJcblx0XHRcdFx0ZmQuYXBwZW5kKCdmaWxlJywgZmlsZSwgZmlsZS5uYW1lKVxyXG5cdFx0XHRcdGZvciAoY29uc3Qga2V5IGluIHBhcmFtcykge1xyXG5cdFx0XHRcdFx0ZmQuYXBwZW5kKGtleSwgcGFyYW1zW2tleV0pXHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdGluc3RhbmNlLmhlYWRlcnMuc2V0KCdDb250ZW50LVR5cGUnLCAnbXVsdGlwYXJ0L2Zvcm0tZGF0YScpXHJcblx0XHRcdFx0eWllbGQgaW5zdGFuY2UucmVxdWVzdFNlcnZpY2UucnVuKCdwb3N0JywgYCR7aW5zdGFuY2UuYmFzZVVybH1gLCB7XHJcblx0XHRcdFx0XHRoZWFkZXJzOiBpbnN0YW5jZS5oZWFkZXJzLFxyXG5cdFx0XHRcdFx0Ym9keTogZmRcclxuXHRcdFx0XHR9KVxyXG5cdFx0XHRcdHJldHVybiB7c3VjY2VzczogdHJ1ZX1cclxuXHRcdFx0fSkudGhlbigocmVzKSA9PiByZXNvbHZlKHJlcyksIChlcnIpID0+IHtcclxuXHRcdFx0XHRpZiAob3B0aW9ucyAmJiBvcHRpb25zLmhhbmRsZUVycm9yKSB7XHJcblx0XHRcdFx0XHRpbnN0YW5jZS5oYW5kbGVFcnJvcihlcnIpXHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdHJlamVjdCh7ZXJyb3I6IGVyciB8fCB0cnVlfSlcclxuXHRcdFx0fSlcclxuXHRcdH0pXHJcblx0fVxyXG5cclxuXHRyZWFkKHBhcmFtcyk6IFByb21pc2U8YW55PiB7XHJcblx0XHRjb25zdCBpbnN0YW5jZSA9IHRoaXNcclxuXHRcdHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcblx0XHRcdGNvKGZ1bmN0aW9uKigpIHtcclxuXHRcdFx0XHRyZXR1cm4geWllbGQgaW5zdGFuY2UucmVxdWVzdFNlcnZpY2UucnVuKCdnZXQnLCBgJHtpbnN0YW5jZS5iYXNlVXJsfS9pdGVtYCwge1xyXG5cdFx0XHRcdFx0aGVhZGVyczogaW5zdGFuY2UuaGVhZGVycyxcclxuXHRcdFx0XHRcdHBhcmFtc1xyXG5cdFx0XHRcdH0pXHJcblx0XHRcdH0pLnRoZW4oKHJlcykgPT4gcmVzb2x2ZShyZXMpLCAoZXJyKSA9PiB7XHJcblx0XHRcdFx0aW5zdGFuY2UuaGFuZGxlRXJyb3IoZXJyKVxyXG5cdFx0XHRcdHJlamVjdCh7ZXJyb3I6IHRydWV9KVxyXG5cdFx0XHR9KVxyXG5cdFx0fSlcclxuXHR9XHJcbn1cclxuIl19