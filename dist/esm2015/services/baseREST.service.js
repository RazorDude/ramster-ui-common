/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import co from 'co';
import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { GlobalEventsService } from './globalEvents/globalEvents.service';
import { RequestService } from './request.service';
export class BaseRESTService {
    /**
     * @param {?} globalEventsService
     * @param {?} requestService
     */
    constructor(globalEventsService, requestService) {
        this.globalEventsService = globalEventsService;
        this.requestService = requestService;
        this.headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        this.baseUrl = '/';
    }
    /**
     * @param {?} data
     * @return {?}
     */
    emptyToNull(data) {
        if (data === '') {
            return null;
        }
        if (data instanceof Array) {
            return data.map((item, index) => this.emptyToNull(item));
        }
        if ((typeof data === 'object') && (data !== null)) {
            /** @type {?} */
            const parsedData = {};
            for (const key in data) {
                parsedData[key] = this.emptyToNull(data[key]);
            }
            return parsedData;
        }
        return data;
    }
    /**
     * @param {?} err
     * @return {?}
     */
    handleError(err) {
        this.globalEventsService.notify('error', err && err.error && err.error.error || 'An error has occurred.');
    }
    /**
     * @param {?} params
     * @return {?}
     */
    create(params) {
        /** @type {?} */
        const instance = this;
        return new Promise((resolve, reject) => {
            co(function* () {
                return yield instance.requestService.run('post', `${instance.baseUrl}`, {
                    headers: instance.headers,
                    body: instance.emptyToNull(params)
                });
            }).then((res) => resolve(res), (err) => {
                instance.handleError(err);
                reject({ error: true });
            });
        });
    }
    /**
     * @param {?} params
     * @return {?}
     */
    read(params) {
        /** @type {?} */
        const instance = this;
        return new Promise((resolve, reject) => {
            co(function* () {
                return yield instance.requestService.run('get', `${instance.baseUrl}/item`, {
                    headers: instance.headers,
                    params: instance.emptyToNull(params)
                });
            }).then((res) => resolve(res), (err) => {
                instance.handleError(err);
                reject({ error: true });
            });
        });
    }
    /**
     * @param {?} params
     * @return {?}
     */
    readList(params) {
        /** @type {?} */
        const instance = this;
        return new Promise((resolve, reject) => {
            co(function* () {
                return yield instance.requestService.run('get', `${instance.baseUrl}`, {
                    headers: instance.headers,
                    params: instance.emptyToNull(params)
                });
            }).then((res) => resolve(res), (err) => {
                instance.handleError(err);
                reject({ error: true });
            });
        });
    }
    /**
     * @param {?} params
     * @return {?}
     */
    readSelectList(params) {
        /** @type {?} */
        const instance = this;
        return new Promise((resolve, reject) => {
            co(function* () {
                return yield instance.requestService.run('get', `${instance.baseUrl}/selectList`, {
                    headers: instance.headers,
                    params: instance.emptyToNull(params)
                });
            }).then((res) => resolve(res), (err) => {
                instance.handleError(err);
                reject({ error: true });
            });
        });
    }
    /**
     * @param {?} params
     * @return {?}
     */
    update(params) {
        /** @type {?} */
        const instance = this;
        return new Promise((resolve, reject) => {
            co(function* () {
                return yield instance.requestService.run('patch', `${instance.baseUrl}/item/${params.id}`, {
                    headers: instance.headers,
                    body: instance.emptyToNull(params)
                });
            }).then((res) => resolve(res), (err) => {
                instance.handleError(err);
                reject({ error: true });
            });
        });
    }
    /**
     * @param {?} params
     * @return {?}
     */
    bulkUpsert(params) {
        /** @type {?} */
        const instance = this;
        return new Promise((resolve, reject) => {
            co(function* () {
                return yield instance.requestService.run('put', `${instance.baseUrl}`, {
                    headers: instance.headers,
                    body: instance.emptyToNull(params)
                });
            }).then((res) => resolve(res), (err) => {
                instance.handleError(err);
                reject({ error: true });
            });
        });
    }
    /**
     * @param {?} params
     * @return {?}
     */
    delete(params) {
        /** @type {?} */
        const instance = this;
        return new Promise((resolve, reject) => {
            co(function* () {
                return yield instance.requestService.run('delete', `${instance.baseUrl}/${params.id}`, {
                    headers: instance.headers,
                    body: instance.emptyToNull(params)
                });
            }).then((res) => resolve(res), (err) => {
                instance.handleError(err);
                reject({ error: true });
            });
        });
    }
}
BaseRESTService.decorators = [
    { type: Injectable }
];
/** @nocollapse */
BaseRESTService.ctorParameters = () => [
    { type: GlobalEventsService },
    { type: RequestService }
];
if (false) {
    /** @type {?} */
    BaseRESTService.prototype.headers;
    /** @type {?} */
    BaseRESTService.prototype.baseUrl;
    /** @type {?} */
    BaseRESTService.prototype.globalEventsService;
    /** @type {?} */
    BaseRESTService.prototype.requestService;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFzZVJFU1Quc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL3JhbXN0ZXItdWktY29yZS8iLCJzb3VyY2VzIjpbInNlcnZpY2VzL2Jhc2VSRVNULnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxNQUFNLElBQUksQ0FBQTtBQUNuQixPQUFPLEVBQUMsVUFBVSxFQUFDLE1BQU0sZUFBZSxDQUFBO0FBQ3hDLE9BQU8sRUFBQyxXQUFXLEVBQUMsTUFBTSxzQkFBc0IsQ0FBQTtBQUVoRCxPQUFPLEVBQUMsbUJBQW1CLEVBQUMsTUFBTSxxQ0FBcUMsQ0FBQTtBQUN2RSxPQUFPLEVBQUMsY0FBYyxFQUFDLE1BQU0sbUJBQW1CLENBQUE7QUFHaEQsTUFBTSxPQUFPLGVBQWU7Ozs7O0lBSTNCLFlBQ1EsbUJBQXdDLEVBQ3hDLGNBQThCO1FBRDlCLHdCQUFtQixHQUFuQixtQkFBbUIsQ0FBcUI7UUFDeEMsbUJBQWMsR0FBZCxjQUFjLENBQWdCO1FBTHRDLFlBQU8sR0FBRyxJQUFJLFdBQVcsQ0FBQyxFQUFDLGNBQWMsRUFBRSxrQkFBa0IsRUFBQyxDQUFDLENBQUE7UUFDL0QsWUFBTyxHQUFHLEdBQUcsQ0FBQTtJQUtWLENBQUM7Ozs7O0lBRUosV0FBVyxDQUFDLElBQVM7UUFDcEIsSUFBSSxJQUFJLEtBQUssRUFBRSxFQUFFO1lBQ2hCLE9BQU8sSUFBSSxDQUFBO1NBQ1g7UUFDRCxJQUFJLElBQUksWUFBWSxLQUFLLEVBQUU7WUFDMUIsT0FBTyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxFQUFFLEtBQUssRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFBO1NBQ3hEO1FBQ0QsSUFBSSxDQUFDLE9BQU8sSUFBSSxLQUFLLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxLQUFLLElBQUksQ0FBQyxFQUFFOztrQkFDNUMsVUFBVSxHQUFHLEVBQUU7WUFDckIsS0FB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QUUsSUFBSSxFQUFDLENBQUMsQ0FBQTtZQUN0QixDQUFDLENBQUMsQ0FBQTtRQUNILENBQUMsQ0FBQyxDQUFBO0lBQ0gsQ0FBQzs7Ozs7SUFFRCxNQUFNLENBQUMsTUFBTTs7Y0FDTixRQUFRLEdBQUcsSUFBSTtRQUNyQixPQUFPLElBQUksT0FBTyxDQUFDLENBQUMsT0FBTyxFQUFFLE1BQU0sRUFBRSxFQUFFO1lBQ3RDLEVBQUUsQ0FBQyxRQUFRLENBQUM7Z0JBQ1gsT0FBTyxNQUFNLFFBQVEsQ0FBQyxjQUFjLENBQUMsR0FBRyxDQUFDLFFBQVEsRUFBRSxHQUFHLFFBQVEsQ0FBQyxPQUFPLElBQUksTUFBTSxDQUFDLEVBQUUsRUFBRSxFQUFFO29CQUN0RixPQUFPLEVBQUUsUUFBUSxDQUFDLE9BQU87b0JBQ3pCLElBQUksRUFBRSxRQUFRLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQztpQkFDbEMsQ0FBQyxDQUFBO1lBQ0gsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEVBQUUsRUFBRTtnQkFDdEMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsQ0FBQTtnQkFDekIsTUFBTSxDQUFDLEVBQUMsS0FBSyxFQUFFLElBQUksRUFBQyxDQUFDLENBQUE7WUFDdEIsQ0FBQyxDQUFDLENBQUE7UUFDSCxDQUFDLENBQUMsQ0FBQTtJQUNILENBQUM7OztZQXRJRCxVQUFVOzs7O1lBSEgsbUJBQW1CO1lBQ25CLGNBQWM7Ozs7SUFJckIsa0NBQStEOztJQUMvRCxrQ0FBYTs7SUFHWiw4Q0FBK0M7O0lBQy9DLHlDQUFxQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBjbyBmcm9tICdjbydcclxuaW1wb3J0IHtJbmplY3RhYmxlfSBmcm9tICdAYW5ndWxhci9jb3JlJ1xyXG5pbXBvcnQge0h0dHBIZWFkZXJzfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCdcclxuXHJcbmltcG9ydCB7R2xvYmFsRXZlbnRzU2VydmljZX0gZnJvbSAnLi9nbG9iYWxFdmVudHMvZ2xvYmFsRXZlbnRzLnNlcnZpY2UnXHJcbmltcG9ydCB7UmVxdWVzdFNlcnZpY2V9IGZyb20gJy4vcmVxdWVzdC5zZXJ2aWNlJ1xyXG5cclxuQEluamVjdGFibGUoKVxyXG5leHBvcnQgY2xhc3MgQmFzZVJFU1RTZXJ2aWNlIHtcclxuXHRoZWFkZXJzID0gbmV3IEh0dHBIZWFkZXJzKHsnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nfSlcclxuXHRiYXNlVXJsID0gJy8nXHJcblxyXG5cdGNvbnN0cnVjdG9yKFxyXG5cdFx0cHVibGljIGdsb2JhbEV2ZW50c1NlcnZpY2U6IEdsb2JhbEV2ZW50c1NlcnZpY2UsXHJcblx0XHRwdWJsaWMgcmVxdWVzdFNlcnZpY2U6IFJlcXVlc3RTZXJ2aWNlXHJcblx0KSB7fVxyXG5cclxuXHRlbXB0eVRvTnVsbChkYXRhOiBhbnkpOiBhbnkge1xyXG5cdFx0aWYgKGRhdGEgPT09ICcnKSB7XHJcblx0XHRcdHJldHVybiBudWxsXHJcblx0XHR9XHJcblx0XHRpZiAoZGF0YSBpbnN0YW5jZW9mIEFycmF5KSB7XHJcblx0XHRcdHJldHVybiBkYXRhLm1hcCgoaXRlbSwgaW5kZXgpID0+IHRoaXMuZW1wdHlUb051bGwoaXRlbSkpXHJcblx0XHR9XHJcblx0XHRpZiAoKHR5cGVvZiBkYXRhID09PSAnb2JqZWN0JykgJiYgKGRhdGEgIT09IG51bGwpKSB7XHJcblx0XHRcdGNvbnN0IHBhcnNlZERhdGEgPSB7fVxyXG5cdFx0XHRmb3IgKGNvbnN0IGtleSBpbiBkYXRhKSB7XHJcblx0XHRcdFx0cGFyc2VkRGF0YVtrZXldID0gdGhpcy5lbXB0eVRvTnVsbChkYXRhW2tleV0pXHJcblx0XHRcdH1cclxuXHRcdFx0cmV0dXJuIHBhcnNlZERhdGFcclxuXHRcdH1cclxuXHRcdHJldHVybiBkYXRhXHJcblx0fVxyXG5cclxuXHRoYW5kbGVFcnJvcihlcnIpOiB2b2lkIHtcclxuXHRcdHRoaXMuZ2xvYmFsRXZlbnRzU2VydmljZS5ub3RpZnkoJ2Vycm9yJywgZXJyICYmIGVyci5lcnJvciAmJiBlcnIuZXJyb3IuZXJyb3IgfHwgJ0FuIGVycm9yIGhhcyBvY2N1cnJlZC4nKVxyXG5cdH1cclxuXHJcblx0Y3JlYXRlKHBhcmFtcyk6IFByb21pc2U8YW55PiB7XHJcblx0XHRjb25zdCBpbnN0YW5jZSA9IHRoaXNcclxuXHRcdHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcblx0XHRcdGNvKGZ1bmN0aW9uKigpIHtcclxuXHRcdFx0XHRyZXR1cm4geWllbGQgaW5zdGFuY2UucmVxdWVzdFNlcnZpY2UucnVuKCdwb3N0JywgYCR7aW5zdGFuY2UuYmFzZVVybH1gLCB7XHJcblx0XHRcdFx0XHRoZWFkZXJzOiBpbnN0YW5jZS5oZWFkZXJzLFxyXG5cdFx0XHRcdFx0Ym9keTogaW5zdGFuY2UuZW1wdHlUb051bGwocGFyYW1zKVxyXG5cdFx0XHRcdH0pXHJcblx0XHRcdH0pLnRoZW4oKHJlcykgPT4gcmVzb2x2ZShyZXMpLCAoZXJyKSA9PiB7XHJcblx0XHRcdFx0aW5zdGFuY2UuaGFuZGxlRXJyb3IoZXJyKVxyXG5cdFx0XHRcdHJlamVjdCh7ZXJyb3I6IHRydWV9KVxyXG5cdFx0XHR9KVxyXG5cdFx0fSlcclxuXHR9XHJcblxyXG5cdHJlYWQocGFyYW1zKTogUHJvbWlzZTxhbnk+IHtcclxuXHRcdGNvbnN0IGluc3RhbmNlID0gdGhpc1xyXG5cdFx0cmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuXHRcdFx0Y28oZnVuY3Rpb24qKCkge1xyXG5cdFx0XHRcdHJldHVybiB5aWVsZCBpbnN0YW5jZS5yZXF1ZXN0U2VydmljZS5ydW4oJ2dldCcsIGAke2luc3RhbmNlLmJhc2VVcmx9L2l0ZW1gLCB7XHJcblx0XHRcdFx0XHRoZWFkZXJzOiBpbnN0YW5jZS5oZWFkZXJzLFxyXG5cdFx0XHRcdFx0cGFyYW1zOiBpbnN0YW5jZS5lbXB0eVRvTnVsbChwYXJhbXMpXHJcblx0XHRcdFx0fSlcclxuXHRcdFx0fSkudGhlbigocmVzKSA9PiByZXNvbHZlKHJlcyksIChlcnIpID0+IHtcclxuXHRcdFx0XHRpbnN0YW5jZS5oYW5kbGVFcnJvcihlcnIpXHJcblx0XHRcdFx0cmVqZWN0KHtlcnJvcjogdHJ1ZX0pXHJcblx0XHRcdH0pXHJcblx0XHR9KVxyXG5cdH1cclxuXHJcblx0cmVhZExpc3QocGFyYW1zKTogUHJvbWlzZTxhbnk+IHtcclxuXHRcdGNvbnN0IGluc3RhbmNlID0gdGhpc1xyXG5cdFx0cmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuXHRcdFx0Y28oZnVuY3Rpb24qKCkge1xyXG5cdFx0XHRcdHJldHVybiB5aWVsZCBpbnN0YW5jZS5yZXF1ZXN0U2VydmljZS5ydW4oJ2dldCcsIGAke2luc3RhbmNlLmJhc2VVcmx9YCwge1xyXG5cdFx0XHRcdFx0aGVhZGVyczogaW5zdGFuY2UuaGVhZGVycyxcclxuXHRcdFx0XHRcdHBhcmFtczogaW5zdGFuY2UuZW1wdHlUb051bGwocGFyYW1zKVxyXG5cdFx0XHRcdH0pXHJcblx0XHRcdH0pLnRoZW4oKHJlcykgPT4gcmVzb2x2ZShyZXMpLCAoZXJyKSA9PiB7XHJcblx0XHRcdFx0aW5zdGFuY2UuaGFuZGxlRXJyb3IoZXJyKVxyXG5cdFx0XHRcdHJlamVjdCh7ZXJyb3I6IHRydWV9KVxyXG5cdFx0XHR9KVxyXG5cdFx0fSlcclxuXHR9XHJcblxyXG5cdHJlYWRTZWxlY3RMaXN0KHBhcmFtcyk6IFByb21pc2U8YW55PiB7XHJcblx0XHRjb25zdCBpbnN0YW5jZSA9IHRoaXNcclxuXHRcdHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcblx0XHRcdGNvKGZ1bmN0aW9uKigpIHtcclxuXHRcdFx0XHRyZXR1cm4geWllbGQgaW5zdGFuY2UucmVxdWVzdFNlcnZpY2UucnVuKCdnZXQnLCBgJHtpbnN0YW5jZS5iYXNlVXJsfS9zZWxlY3RMaXN0YCwge1xyXG5cdFx0XHRcdFx0aGVhZGVyczogaW5zdGFuY2UuaGVhZGVycyxcclxuXHRcdFx0XHRcdHBhcmFtczogaW5zdGFuY2UuZW1wdHlUb051bGwocGFyYW1zKVxyXG5cdFx0XHRcdH0pXHJcblx0XHRcdH0pLnRoZW4oKHJlcykgPT4gcmVzb2x2ZShyZXMpLCAoZXJyKSA9PiB7XHJcblx0XHRcdFx0aW5zdGFuY2UuaGFuZGxlRXJyb3IoZXJyKVxyXG5cdFx0XHRcdHJlamVjdCh7ZXJyb3I6IHRydWV9KVxyXG5cdFx0XHR9KVxyXG5cdFx0fSlcclxuXHR9XHJcblxyXG5cdHVwZGF0ZShwYXJhbXMpOiBQcm9taXNlPGFueT4ge1xyXG5cdFx0Y29uc3QgaW5zdGFuY2UgPSB0aGlzXHJcblx0XHRyZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG5cdFx0XHRjbyhmdW5jdGlvbiooKSB7XHJcblx0XHRcdFx0cmV0dXJuIHlpZWxkIGluc3RhbmNlLnJlcXVlc3RTZXJ2aWNlLnJ1bigncGF0Y2gnLCBgJHtpbnN0YW5jZS5iYXNlVXJsfS9pdGVtLyR7cGFyYW1zLmlkfWAsIHtcclxuXHRcdFx0XHRcdGhlYWRlcnM6IGluc3RhbmNlLmhlYWRlcnMsXHJcblx0XHRcdFx0XHRib2R5OiBpbnN0YW5jZS5lbXB0eVRvTnVsbChwYXJhbXMpXHJcblx0XHRcdFx0fSlcclxuXHRcdFx0fSkudGhlbigocmVzKSA9PiByZXNvbHZlKHJlcyksIChlcnIpID0+IHtcclxuXHRcdFx0XHRpbnN0YW5jZS5oYW5kbGVFcnJvcihlcnIpXHJcblx0XHRcdFx0cmVqZWN0KHtlcnJvcjogdHJ1ZX0pXHJcblx0XHRcdH0pXHJcblx0XHR9KVxyXG5cdH1cclxuXHJcblx0YnVsa1Vwc2VydChwYXJhbXMpOiBQcm9taXNlPGFueT4ge1xyXG5cdFx0Y29uc3QgaW5zdGFuY2UgPSB0aGlzXHJcblx0XHRyZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG5cdFx0XHRjbyhmdW5jdGlvbiooKSB7XHJcblx0XHRcdFx0cmV0dXJuIHlpZWxkIGluc3RhbmNlLnJlcXVlc3RTZXJ2aWNlLnJ1bigncHV0JywgYCR7aW5zdGFuY2UuYmFzZVVybH1gLCB7XHJcblx0XHRcdFx0XHRoZWFkZXJzOiBpbnN0YW5jZS5oZWFkZXJzLFxyXG5cdFx0XHRcdFx0Ym9keTogaW5zdGFuY2UuZW1wdHlUb051bGwocGFyYW1zKVxyXG5cdFx0XHRcdH0pXHJcblx0XHRcdH0pLnRoZW4oKHJlcykgPT4gcmVzb2x2ZShyZXMpLCAoZXJyKSA9PiB7XHJcblx0XHRcdFx0aW5zdGFuY2UuaGFuZGxlRXJyb3IoZXJyKVxyXG5cdFx0XHRcdHJlamVjdCh7ZXJyb3I6IHRydWV9KVxyXG5cdFx0XHR9KVxyXG5cdFx0fSlcclxuXHR9XHJcblxyXG5cdGRlbGV0ZShwYXJhbXMpOiBQcm9taXNlPGFueT4ge1xyXG5cdFx0Y29uc3QgaW5zdGFuY2UgPSB0aGlzXHJcblx0XHRyZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG5cdFx0XHRjbyhmdW5jdGlvbiooKSB7XHJcblx0XHRcdFx0cmV0dXJuIHlpZWxkIGluc3RhbmNlLnJlcXVlc3RTZXJ2aWNlLnJ1bignZGVsZXRlJywgYCR7aW5zdGFuY2UuYmFzZVVybH0vJHtwYXJhbXMuaWR9YCwge1xyXG5cdFx0XHRcdFx0aGVhZGVyczogaW5zdGFuY2UuaGVhZGVycyxcclxuXHRcdFx0XHRcdGJvZHk6IGluc3RhbmNlLmVtcHR5VG9OdWxsKHBhcmFtcylcclxuXHRcdFx0XHR9KVxyXG5cdFx0XHR9KS50aGVuKChyZXMpID0+IHJlc29sdmUocmVzKSwgKGVycikgPT4ge1xyXG5cdFx0XHRcdGluc3RhbmNlLmhhbmRsZUVycm9yKGVycilcclxuXHRcdFx0XHRyZWplY3Qoe2Vycm9yOiB0cnVlfSlcclxuXHRcdFx0fSlcclxuXHRcdH0pXHJcblx0fVxyXG59XHJcbiJdfQ==