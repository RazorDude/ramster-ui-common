/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import co from 'co';
import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { GlobalEventsService } from './globalEvents/globalEvents.service';
import { RequestService } from './request.service';
export class FilesRESTService {
    /**
     * @param {?} globalEventsService
     * @param {?} requestService
     */
    constructor(globalEventsService, requestService) {
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
    handleError(err) {
        if (!err) {
            this.globalEventsService.notify('error', 'An unknown error has occurred.');
            return;
        }
        if ((err.status === 413) || (err.error && (err.error.status === 413))) {
            this.globalEventsService.notify('error', 'The selected file is too large.');
            return;
        }
        this.globalEventsService.notify('error', err.error && err.error.error || 'An error has occurred.');
    }
    /**
     * @param {?} file
     * @param {?} params
     * @param {?=} options
     * @return {?}
     */
    upload(file, params, options) {
        /** @type {?} */
        const instance = this;
        return new Promise((/**
         * @param {?} resolve
         * @param {?} reject
         * @return {?}
         */
        (resolve, reject) => {
            co((/**
             * @return {?}
             */
            function* () {
                /** @type {?} */
                let fd = new FormData();
                fd.append('file', file, file.name);
                for (const key in params) {
                    fd.append(key, params[key]);
                }
                instance.headers.set('Content-Type', 'multipart/form-data');
                yield instance.requestService.run('post', `${instance.baseUrl}`, {
                    headers: instance.headers,
                    body: fd
                });
                return { success: true };
            })).then((/**
             * @param {?} res
             * @return {?}
             */
            (res) => resolve(res)), (/**
             * @param {?} err
             * @return {?}
             */
            (err) => {
                if (options && options.handleError) {
                    instance.handleError(err);
                }
                reject({ error: err || true });
            }));
        }));
    }
    /**
     * @param {?} params
     * @return {?}
     */
    read(params) {
        /** @type {?} */
        const instance = this;
        return new Promise((/**
         * @param {?} resolve
         * @param {?} reject
         * @return {?}
         */
        (resolve, reject) => {
            co((/**
             * @return {?}
             */
            function* () {
                return yield instance.requestService.run('get', `${instance.baseUrl}/item`, {
                    headers: instance.headers,
                    params
                });
            })).then((/**
             * @param {?} res
             * @return {?}
             */
            (res) => resolve(res)), (/**
             * @param {?} err
             * @return {?}
             */
            (err) => {
                instance.handleError(err);
                reject({ error: true });
            }));
        }));
    }
}
FilesRESTService.decorators = [
    { type: Injectable }
];
/** @nocollapse */
FilesRESTService.ctorParameters = () => [
    { type: GlobalEventsService },
    { type: RequestService }
];
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlsZXNSRVNULnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9yYW1zdGVyLXVpLWNvcmUvIiwic291cmNlcyI6WyJzZXJ2aWNlcy9maWxlc1JFU1Quc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLE1BQU0sSUFBSSxDQUFBO0FBQ25CLE9BQU8sRUFBQyxVQUFVLEVBQUMsTUFBTSxlQUFlLENBQUE7QUFDeEMsT0FBTyxFQUFDLFdBQVcsRUFBQyxNQUFNLHNCQUFzQixDQUFBO0FBRWhELE9BQU8sRUFBQyxtQkFBbUIsRUFBQyxNQUFNLHFDQUFxQyxDQUFBO0FBQ3ZFLE9BQU8sRUFBQyxjQUFjLEVBQUMsTUFBTSxtQkFBbUIsQ0FBQTtBQUdoRCxNQUFNLE9BQU8sZ0JBQWdCOzs7OztJQUs1QixZQUNRLG1CQUF3QyxFQUN4QyxjQUE4QjtRQUQ5Qix3QkFBbUIsR0FBbkIsbUJBQW1CLENBQXFCO1FBQ3hDLG1CQUFjLEdBQWQsY0FBYyxDQUFnQjs7UUFMdEMsWUFBTyxHQUFHLElBQUksV0FBVyxFQUFFLENBQUE7UUFDM0IsWUFBTyxHQUFHLFFBQVEsQ0FBQTtJQUtmLENBQUM7Ozs7O0lBRUosV0FBVyxDQUFDLEdBQVE7UUFDbkIsSUFBSSxDQUFDLEdBQUcsRUFBRTtZQUNULElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFFLGdDQUFnQyxDQUFDLENBQUE7WUFDMUUsT0FBTTtTQUNOO1FBQ0QsSUFBSSxDQUFDLEdBQUcsQ0FBQyxNQUFNLEtBQUssR0FBRyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxNQUFNLEtBQUssR0FBRyxDQUFDLENBQUMsRUFBRTtZQUN0RSxJQUFJLENBQUMsbUJBQW1CLENBQUMsTUFBTSxDQUFDLE9BQU8sRUFBRSxpQ0FBaUMsQ0FBQyxDQUFBO1lBQzNFLE9BQU07U0FDTjtRQUNELElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFFLEdBQUcsQ0FBQyxLQUFLLElBQUksR0FBRyxDQUFDLEtBQUssQ0FBQyxLQUFLLElBQUksd0JBQXdCLENBQUMsQ0FBQTtJQUNuRyxDQUFDOzs7Ozs7O0lBRUQsTUFBTSxDQUFDLElBQVUsRUFBRSxNQUFrRCxFQUFFLE9BQWlDOztjQUNqRyxRQUFRLEdBQUcsSUFBSTtRQUNyQixPQUFPLElBQUksT0FBTzs7Ozs7UUFBQyxDQUFDLE9BQU8sRUFBRSxNQUFNLEVBQUUsRUFBRTtZQUN0QyxFQUFFOzs7WUFBQyxRQUFRLENBQUM7O29CQUNQLEVBQUUsR0FBRyxJQUFJLFFBQVEsRUFBRTtnQkFDdkIsRUFBRSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQTtnQkFDbEMsS0FBSyxNQUFNLEdBQUcsSUFBSSxNQUFNLEVBQUU7b0JBQ3pCLEVBQUUsQ0FBQyxNQUFNLENBQUMsR0FBRyxFQUFFLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFBO2lCQUMzQjtnQkFDRCxRQUFRLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxjQUFjLEVBQUUscUJBQXFCLENBQUMsQ0FBQTtnQkFDM0QsTUFBTSxRQUFRLENBQUMsY0FBYyxDQUFDLEdBQUcsQ0FBQyxNQUFNLEVBQUUsR0FBRyxRQUFRLENBQUMsT0FBTyxFQUFFLEVBQUU7b0JBQ2hFLE9BQU8sRUFBRSxRQUFRLENBQUMsT0FBTztvQkFDekIsSUFBSSxFQUFFLEVBQUU7aUJBQ1IsQ0FBQyxDQUFBO2dCQUNGLE9BQU8sRUFBQyxPQUFPLEVBQUUsSUFBSSxFQUFDLENBQUE7WUFDdkIsQ0FBQyxFQUFDLENBQUMsSUFBSTs7OztZQUFDLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDOzs7O1lBQUUsQ0FBQyxHQUFHLEVBQUUsRUFBRTtnQkFDdEMsSUFBSSxPQUFPLElBQUksT0FBTyxDQUFDLFdBQVcsRUFBRTtvQkFDbkMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsQ0FBQTtpQkFDekI7Z0JBQ0QsTUFBTSxDQUFDLEVBQUMsS0FBSyxFQUFFLEdBQUcsSUFBSSxJQUFJLEVBQUMsQ0FBQyxDQUFBO1lBQzdCLENBQUMsRUFBQyxDQUFBO1FBQ0gsQ0FBQyxFQUFDLENBQUE7SUFDSCxDQUFDOzs7OztJQUVELElBQUksQ0FBQyxNQUFNOztjQUNKLFFBQVEsR0FBRyxJQUFJO1FBQ3JCLE9BQU8sSUFBSSxPQUFPOzs7OztRQUFDLENBQUMsT0FBTyxFQUFFLE1BQU0sRUFBRSxFQUFFO1lBQ3RDLEVBQUU7OztZQUFDLFFBQVEsQ0FBQztnQkFDWCxPQUFPLE1BQU0sUUFBUSxDQUFDLGNBQWMsQ0FBQyxHQUFHLENBQUMsS0FBSyxFQUFFLEdBQUcsUUFBUSxDQUFDLE9BQU8sT0FBTyxFQUFFO29CQUMzRSxPQUFPLEVBQUUsUUFBUSxDQUFDLE9BQU87b0JBQ3pCLE1BQU07aUJBQ04sQ0FBQyxDQUFBO1lBQ0gsQ0FBQyxFQUFDLENBQUMsSUFBSTs7OztZQUFDLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDOzs7O1lBQUUsQ0FBQyxHQUFHLEVBQUUsRUFBRTtnQkFDdEMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsQ0FBQTtnQkFDekIsTUFBTSxDQUFDLEVBQUMsS0FBSyxFQUFFLElBQUksRUFBQyxDQUFDLENBQUE7WUFDdEIsQ0FBQyxFQUFDLENBQUE7UUFDSCxDQUFDLEVBQUMsQ0FBQTtJQUNILENBQUM7OztZQTVERCxVQUFVOzs7O1lBSEgsbUJBQW1CO1lBQ25CLGNBQWM7Ozs7SUFLckIsbUNBQTJCOztJQUMzQixtQ0FBa0I7O0lBR2pCLCtDQUErQzs7SUFDL0MsMENBQXFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGNvIGZyb20gJ2NvJ1xyXG5pbXBvcnQge0luamVjdGFibGV9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnXHJcbmltcG9ydCB7SHR0cEhlYWRlcnN9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJ1xyXG5cclxuaW1wb3J0IHtHbG9iYWxFdmVudHNTZXJ2aWNlfSBmcm9tICcuL2dsb2JhbEV2ZW50cy9nbG9iYWxFdmVudHMuc2VydmljZSdcclxuaW1wb3J0IHtSZXF1ZXN0U2VydmljZX0gZnJvbSAnLi9yZXF1ZXN0LnNlcnZpY2UnXHJcblxyXG5ASW5qZWN0YWJsZSgpXHJcbmV4cG9ydCBjbGFzcyBGaWxlc1JFU1RTZXJ2aWNlIHtcclxuXHQvLyB7J0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJ31cclxuXHRoZWFkZXJzID0gbmV3IEh0dHBIZWFkZXJzKClcclxuXHRiYXNlVXJsID0gJy9maWxlcydcclxuXHJcblx0Y29uc3RydWN0b3IoXHJcblx0XHRwdWJsaWMgZ2xvYmFsRXZlbnRzU2VydmljZTogR2xvYmFsRXZlbnRzU2VydmljZSxcclxuXHRcdHB1YmxpYyByZXF1ZXN0U2VydmljZTogUmVxdWVzdFNlcnZpY2VcclxuXHQpIHt9XHJcblxyXG5cdGhhbmRsZUVycm9yKGVycjogYW55KTogdm9pZCB7XHJcblx0XHRpZiAoIWVycikge1xyXG5cdFx0XHR0aGlzLmdsb2JhbEV2ZW50c1NlcnZpY2Uubm90aWZ5KCdlcnJvcicsICdBbiB1bmtub3duIGVycm9yIGhhcyBvY2N1cnJlZC4nKVxyXG5cdFx0XHRyZXR1cm5cclxuXHRcdH1cclxuXHRcdGlmICgoZXJyLnN0YXR1cyA9PT0gNDEzKSB8fCAoZXJyLmVycm9yICYmIChlcnIuZXJyb3Iuc3RhdHVzID09PSA0MTMpKSkge1xyXG5cdFx0XHR0aGlzLmdsb2JhbEV2ZW50c1NlcnZpY2Uubm90aWZ5KCdlcnJvcicsICdUaGUgc2VsZWN0ZWQgZmlsZSBpcyB0b28gbGFyZ2UuJylcclxuXHRcdFx0cmV0dXJuXHJcblx0XHR9XHJcblx0XHR0aGlzLmdsb2JhbEV2ZW50c1NlcnZpY2Uubm90aWZ5KCdlcnJvcicsIGVyci5lcnJvciAmJiBlcnIuZXJyb3IuZXJyb3IgfHwgJ0FuIGVycm9yIGhhcyBvY2N1cnJlZC4nKVxyXG5cdH1cclxuXHJcblx0dXBsb2FkKGZpbGU6IEZpbGUsIHBhcmFtczoge291dHB1dEZpbGVOYW1lOiBzdHJpbmcsIFt4OiBzdHJpbmddOiBhbnl9LCBvcHRpb25zPzoge2hhbmRsZUVycm9yPzogYm9vbGVhbn0pOiBQcm9taXNlPGFueT4ge1xyXG5cdFx0Y29uc3QgaW5zdGFuY2UgPSB0aGlzXHJcblx0XHRyZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG5cdFx0XHRjbyhmdW5jdGlvbiooKSB7XHJcblx0XHRcdFx0bGV0IGZkID0gbmV3IEZvcm1EYXRhKClcclxuXHRcdFx0XHRmZC5hcHBlbmQoJ2ZpbGUnLCBmaWxlLCBmaWxlLm5hbWUpXHJcblx0XHRcdFx0Zm9yIChjb25zdCBrZXkgaW4gcGFyYW1zKSB7XHJcblx0XHRcdFx0XHRmZC5hcHBlbmQoa2V5LCBwYXJhbXNba2V5XSlcclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0aW5zdGFuY2UuaGVhZGVycy5zZXQoJ0NvbnRlbnQtVHlwZScsICdtdWx0aXBhcnQvZm9ybS1kYXRhJylcclxuXHRcdFx0XHR5aWVsZCBpbnN0YW5jZS5yZXF1ZXN0U2VydmljZS5ydW4oJ3Bvc3QnLCBgJHtpbnN0YW5jZS5iYXNlVXJsfWAsIHtcclxuXHRcdFx0XHRcdGhlYWRlcnM6IGluc3RhbmNlLmhlYWRlcnMsXHJcblx0XHRcdFx0XHRib2R5OiBmZFxyXG5cdFx0XHRcdH0pXHJcblx0XHRcdFx0cmV0dXJuIHtzdWNjZXNzOiB0cnVlfVxyXG5cdFx0XHR9KS50aGVuKChyZXMpID0+IHJlc29sdmUocmVzKSwgKGVycikgPT4ge1xyXG5cdFx0XHRcdGlmIChvcHRpb25zICYmIG9wdGlvbnMuaGFuZGxlRXJyb3IpIHtcclxuXHRcdFx0XHRcdGluc3RhbmNlLmhhbmRsZUVycm9yKGVycilcclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0cmVqZWN0KHtlcnJvcjogZXJyIHx8IHRydWV9KVxyXG5cdFx0XHR9KVxyXG5cdFx0fSlcclxuXHR9XHJcblxyXG5cdHJlYWQocGFyYW1zKTogUHJvbWlzZTxhbnk+IHtcclxuXHRcdGNvbnN0IGluc3RhbmNlID0gdGhpc1xyXG5cdFx0cmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuXHRcdFx0Y28oZnVuY3Rpb24qKCkge1xyXG5cdFx0XHRcdHJldHVybiB5aWVsZCBpbnN0YW5jZS5yZXF1ZXN0U2VydmljZS5ydW4oJ2dldCcsIGAke2luc3RhbmNlLmJhc2VVcmx9L2l0ZW1gLCB7XHJcblx0XHRcdFx0XHRoZWFkZXJzOiBpbnN0YW5jZS5oZWFkZXJzLFxyXG5cdFx0XHRcdFx0cGFyYW1zXHJcblx0XHRcdFx0fSlcclxuXHRcdFx0fSkudGhlbigocmVzKSA9PiByZXNvbHZlKHJlcyksIChlcnIpID0+IHtcclxuXHRcdFx0XHRpbnN0YW5jZS5oYW5kbGVFcnJvcihlcnIpXHJcblx0XHRcdFx0cmVqZWN0KHtlcnJvcjogdHJ1ZX0pXHJcblx0XHRcdH0pXHJcblx0XHR9KVxyXG5cdH1cclxufVxyXG4iXX0=