/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
        this.baseUrl = '/';
        this.headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        this.redirectOnForbiddenUrl = null;
    }
    /**
     * @param {?} data
     * @return {?}
     */
    emptyToNull(data) {
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
            (item, index) => this.emptyToNull(item)));
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
     * @param {?} data
     * @return {?}
     */
    stringifyGetParams(data) {
        /** @type {?} */
        let stringifiedObject = {};
        for (const key in data) {
            /** @type {?} */
            const value = data[key];
            if ((value instanceof Array) || ((typeof value === 'object') && (value !== null) && !(value instanceof Date))) {
                stringifiedObject[`_json_${key}`] = JSON.stringify(value);
                continue;
            }
            stringifiedObject[key] = value;
        }
        return stringifiedObject;
    }
    /**
     * @param {?} err
     * @param {?=} options
     * @return {?}
     */
    handleError(err, options) {
        const { notifyOnError } = options || (/** @type {?} */ ({}));
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
    }
    /**
     * @param {?} params
     * @return {?}
     */
    create(params) {
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
                return yield instance.requestService.run('post', `${instance.baseUrl}`, {
                    headers: instance.headers,
                    body: instance.emptyToNull(params)
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
                    params: instance.stringifyGetParams(instance.emptyToNull(params))
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
    /**
     * @param {?} params
     * @return {?}
     */
    readList(params) {
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
                return yield instance.requestService.run('get', `${instance.baseUrl}`, {
                    headers: instance.headers,
                    params: instance.stringifyGetParams(instance.emptyToNull(params))
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
    /**
     * @param {?} params
     * @param {?} onMessage
     * @param {?=} options
     * @return {?}
     */
    readStreamList(params, onMessage, options) {
        const { onError, reconnectAttemptInterval, reconnectAttemptsLeft } = options || (/** @type {?} */ ({}));
        /** @type {?} */
        const errorHandler = onError ? onError : this.handleError.bind(this);
        /** @type {?} */
        let url = `/${this.baseUrl}/streamList`;
        /** @type {?} */
        let stringifiedParams = this.stringifyGetParams(this.emptyToNull(params));
        /** @type {?} */
        let firstParam = true;
        for (const key in stringifiedParams) {
            if (firstParam) {
                firstParam = false;
                url += '?';
            }
            else {
                url += '&';
            }
            url += stringifiedParams[key];
        }
        /** @type {?} */
        let eventSource = new EventSource(url);
        eventSource.onmessage = (/**
         * @param {?} event
         * @return {?}
         */
        (event) => onMessage(event));
        eventSource.onerror = (/**
         * @param {?} err
         * @return {?}
         */
        (err) => {
            errorHandler(err);
            if ((typeof reconnectAttemptsLeft === 'undefined') || reconnectAttemptsLeft > 0) {
                eventSource.close();
                setTimeout((/**
                 * @return {?}
                 */
                () => {
                    this.readStreamList(params, onMessage, Object.assign({}, options, { reconnectAttemptsLeft: typeof reconnectAttemptsLeft === 'number' ? reconnectAttemptsLeft - 1 : undefined }));
                }), reconnectAttemptInterval || 5000);
            }
        });
        return eventSource;
    }
    /**
     * @param {?} params
     * @return {?}
     */
    readSelectList(params) {
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
                return yield instance.requestService.run('get', `${instance.baseUrl}/selectList`, {
                    headers: instance.headers,
                    params: instance.stringifyGetParams(instance.emptyToNull(params))
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
    /**
     * @param {?} params
     * @return {?}
     */
    update(params) {
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
                return yield instance.requestService.run('patch', `${instance.baseUrl}/item/${params.id}`, {
                    headers: instance.headers,
                    body: instance.emptyToNull(params)
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
    /**
     * @param {?} params
     * @return {?}
     */
    bulkUpsert(params) {
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
                return yield instance.requestService.run('put', `${instance.baseUrl}`, {
                    headers: instance.headers,
                    body: instance.emptyToNull(params)
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
    /**
     * @param {?} params
     * @return {?}
     */
    delete(params) {
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
                return yield instance.requestService.run('delete', `${instance.baseUrl}/${params.id}`, {
                    headers: instance.headers,
                    body: instance.emptyToNull(params)
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFzZVJFU1Quc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL3JhbXN0ZXItdWktY29yZS8iLCJzb3VyY2VzIjpbInNlcnZpY2VzL2Jhc2VSRVNULnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxNQUFNLElBQUksQ0FBQTtBQUNuQixPQUFPLEVBQUMsVUFBVSxFQUFDLE1BQU0sZUFBZSxDQUFBO0FBQ3hDLE9BQU8sRUFBQyxXQUFXLEVBQUMsTUFBTSxzQkFBc0IsQ0FBQTtBQUVoRCxPQUFPLEVBQUMsbUJBQW1CLEVBQUMsTUFBTSxxQ0FBcUMsQ0FBQTtBQUN2RSxPQUFPLEVBQUMsY0FBYyxFQUFDLE1BQU0sbUJBQW1CLENBQUE7QUFHaEQsTUFBTSxPQUFPLGVBQWU7Ozs7O0lBSzNCLFlBQ1EsbUJBQXdDLEVBQ3hDLGNBQThCO1FBRDlCLHdCQUFtQixHQUFuQixtQkFBbUIsQ0FBcUI7UUFDeEMsbUJBQWMsR0FBZCxjQUFjLENBQWdCO1FBTnRDLFlBQU8sR0FBRyxHQUFHLENBQUE7UUFDYixZQUFPLEdBQUcsSUFBSSxXQUFXLENBQUMsRUFBQyxjQUFjLEVBQUUsa0JBQWtCLEVBQUMsQ0FBQyxDQUFBO1FBQy9ELDJCQUFzQixHQUFZLElBQUksQ0FBQTtJQUtuQyxDQUFDOzs7OztJQUVKLFdBQVcsQ0FBQyxJQUFTO1FBQ3BCLElBQUksSUFBSSxLQUFLLEVBQUUsRUFBRTtZQUNoQixPQUFPLElBQUksQ0FBQTtTQUNYO1FBQ0QsSUFBSSxJQUFJLFlBQVksSUFBSSxFQUFFO1lBQ3pCLE9BQU8sSUFBSSxDQUFBO1NBQ1g7UUFDRCxJQUFJLElBQUksWUFBWSxLQUFLLEVBQUU7WUFDMUIsT0FBTyxJQUFJLENBQUMsR0FBRzs7Ozs7WUFBQyxDQUFDLElBQUksRUFBRSxLQUFLLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLEVBQUMsQ0FBQTtTQUN4RDtRQUNELElBQUksQ0FBQyxPQUFPLElBQUksS0FBSyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksS0FBSyxJQUFJLENBQUMsRUFBRTs7a0JBQzVDLFVBQVUsR0FBRyxFQUFFO1lBQ3JCLEtBQUssTUFBTSxHQUFHLElBQUksSUFBSSxFQUFFO2dCQUN2QixVQUFVLENBQUMsR0FBRyxDQUFDLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQTthQUM3QztZQUNELE9BQU8sVUFBVSxDQUFBO1NBQ2pCO1FBQ0QsT0FBTyxJQUFJLENBQUE7SUFDWixDQUFDOzs7OztJQUVELGtCQUFrQixDQUFDLElBQTBCOztZQUN4QyxpQkFBaUIsR0FBRyxFQUFFO1FBQzFCLEtBQUssTUFBTSxHQUFHLElBQUksSUFBSSxFQUFFOztrQkFDakIsS0FBSyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUM7WUFDdkIsSUFBSSxDQUFDLEtBQUssWUFBWSxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsT0FBTyxLQUFLLEtBQUssUUFBUSxDQUFDLElBQUksQ0FBQyxLQUFLLEtBQUssSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLEtBQUssWUFBWSxJQUFJLENBQUMsQ0FBQyxFQUFFO2dCQUM5RyxpQkFBaUIsQ0FBQyxTQUFTLEdBQUcsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQTtnQkFDekQsU0FBUTthQUNSO1lBQ0QsaUJBQWlCLENBQUMsR0FBRyxDQUFDLEdBQUcsS0FBSyxDQUFBO1NBQzlCO1FBQ0QsT0FBTyxpQkFBaUIsQ0FBQTtJQUN6QixDQUFDOzs7Ozs7SUFFRCxXQUFXLENBQUMsR0FBUSxFQUFFLE9BQW1DO2NBQ2xELEVBQUMsYUFBYSxFQUFDLEdBQUcsT0FBTyxJQUFJLG1CQUFBLEVBQUUsRUFBTztRQUM1QyxJQUFJLENBQUMsR0FBRyxFQUFFO1lBQ1QsSUFBSSxhQUFhLEtBQUssS0FBSyxFQUFFO2dCQUM1QixJQUFJLENBQUMsbUJBQW1CLENBQUMsTUFBTSxDQUFDLE9BQU8sRUFBRSx3QkFBd0IsQ0FBQyxDQUFBO2FBQ2xFO1lBQ0QsT0FBTTtTQUNOO1FBQ0QsSUFBSSxJQUFJLENBQUMsc0JBQXNCLElBQUksQ0FBQyxHQUFHLENBQUMsTUFBTSxLQUFLLEdBQUcsQ0FBQyxFQUFFO1lBQ3hELElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLHNCQUFzQixDQUFDLENBQUE7WUFDOUQsT0FBTTtTQUNOO1FBQ0QsSUFBSSxhQUFhLEtBQUssS0FBSyxFQUFFO1lBQzVCLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFFLEdBQUcsQ0FBQyxLQUFLLElBQUksR0FBRyxDQUFDLEtBQUssQ0FBQyxLQUFLLElBQUksd0JBQXdCLENBQUMsQ0FBQTtTQUNsRztJQUNGLENBQUM7Ozs7O0lBRUQsTUFBTSxDQUFDLE1BQU07O2NBQ04sUUFBUSxHQUFHLElBQUk7UUFDckIsT0FBTyxJQUFJLE9BQU87Ozs7O1FBQUMsQ0FBQyxPQUFPLEVBQUUsTUFBTSxFQUFFLEVBQUU7WUFDdEMsRUFBRTs7O1lBQUMsUUFBUSxDQUFDO2dCQUNYLE9BQU8sTUFBTSxRQUFRLENBQUMsY0FBYyxDQUFDLEdBQUcsQ0FBQyxNQUFNLEVBQUUsR0FBRyxRQUFRLENBQUMsT0FBTyxFQUFFLEVBQUU7b0JBQ3ZFLE9BQU8sRUFBRSxRQUFRLENBQUMsT0FBTztvQkFDekIsSUFBSSxFQUFFLFFBQVEsQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDO2lCQUNsQyxDQUFDLENBQUE7WUFDSCxDQUFDLEVBQUMsQ0FBQyxJQUFJOzs7O1lBQUMsQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUM7Ozs7WUFBRSxDQUFDLEdBQUcsRUFBRSxFQUFFO2dCQUN0QyxRQUFRLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxDQUFBO2dCQUN6QixNQUFNLENBQUMsRUFBQyxLQUFLLEVBQUUsSUFBSSxFQUFDLENBQUMsQ0FBQTtZQUN0QixDQUFDLEVBQUMsQ0FBQTtRQUNILENBQUMsRUFBQyxDQUFBO0lBQ0gsQ0FBQzs7Ozs7SUFFRCxJQUFJLENBQUMsTUFBTTs7Y0FDSixRQUFRLEdBQUcsSUFBSTtRQUNyQixPQUFPLElBQUksT0FBTzs7Ozs7UUFBQyxDQUFDLE9BQU8sRUFBRSxNQUFNLEVBQUUsRUFBRTtZQUN0QyxFQUFFOzs7WUFBQyxRQUFRLENBQUM7Z0JBQ1gsT0FBTyxNQUFNLFFBQVEsQ0FBQyxjQUFjLENBQUMsR0FBRyxDQUFDLEtBQUssRUFBRSxHQUFHLFFBQVEsQ0FBQyxPQUFPLE9BQU8sRUFBRTtvQkFDM0UsT0FBTyxFQUFFLFFBQVEsQ0FBQyxPQUFPO29CQUN6QixNQUFNLEVBQUUsUUFBUSxDQUFDLGtCQUFrQixDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLENBQUM7aUJBQ2pFLENBQUMsQ0FBQTtZQUNILENBQUMsRUFBQyxDQUFDLElBQUk7Ozs7WUFBQyxDQUFDLEdBQUcsRUFBRSxFQUFFLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQzs7OztZQUFFLENBQUMsR0FBRyxFQUFFLEVBQUU7Z0JBQ3RDLFFBQVEsQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLENBQUE7Z0JBQ3pCLE1BQU0sQ0FBQyxFQUFDLEtBQUssRUFBRSxJQUFJLEVBQUMsQ0FBQyxDQUFBO1lBQ3RCLENBQUMsRUFBQyxDQUFBO1FBQ0gsQ0FBQyxFQUFDLENBQUE7SUFDSCxDQUFDOzs7OztJQUVELFFBQVEsQ0FBQyxNQUFNOztjQUNSLFFBQVEsR0FBRyxJQUFJO1FBQ3JCLE9BQU8sSUFBSSxPQUFPOzs7OztRQUFDLENBQUMsT0FBTyxFQUFFLE1BQU0sRUFBRSxFQUFFO1lBQ3RDLEVBQUU7OztZQUFDLFFBQVEsQ0FBQztnQkFDWCxPQUFPLE1BQU0sUUFBUSxDQUFDLGNBQWMsQ0FBQyxHQUFHLENBQUMsS0FBSyxFQUFFLEdBQUcsUUFBUSxDQUFDLE9BQU8sRUFBRSxFQUFFO29CQUN0RSxPQUFPLEVBQUUsUUFBUSxDQUFDLE9BQU87b0JBQ3pCLE1BQU0sRUFBRSxRQUFRLENBQUMsa0JBQWtCLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsQ0FBQztpQkFDakUsQ0FBQyxDQUFBO1lBQ0gsQ0FBQyxFQUFDLENBQUMsSUFBSTs7OztZQUFDLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDOzs7O1lBQUUsQ0FBQyxHQUFHLEVBQUUsRUFBRTtnQkFDdEMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsQ0FBQTtnQkFDekIsTUFBTSxDQUFDLEVBQUMsS0FBSyxFQUFFLElBQUksRUFBQyxDQUFDLENBQUE7WUFDdEIsQ0FBQyxFQUFDLENBQUE7UUFDSCxDQUFDLEVBQUMsQ0FBQTtJQUNILENBQUM7Ozs7Ozs7SUFFRCxjQUFjLENBQ2IsTUFBNEIsRUFDNUIsU0FBbUIsRUFDbkIsT0FBaUc7Y0FFM0YsRUFBQyxPQUFPLEVBQUUsd0JBQXdCLEVBQUUscUJBQXFCLEVBQUMsR0FBRyxPQUFPLElBQUksbUJBQUEsRUFBRSxFQUFPOztjQUN0RixZQUFZLEdBQUcsT0FBTyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQzs7WUFDM0QsR0FBRyxHQUFHLElBQUksSUFBSSxDQUFDLE9BQU8sYUFBYTs7WUFDdEMsaUJBQWlCLEdBQUcsSUFBSSxDQUFDLGtCQUFrQixDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLENBQUM7O1lBQ3JFLFVBQVUsR0FBRyxJQUFJO1FBQ2xCLEtBQUssTUFBTSxHQUFHLElBQUksaUJBQWlCLEVBQUU7WUFDcEMsSUFBSSxVQUFVLEVBQUU7Z0JBQ2YsVUFBVSxHQUFHLEtBQUssQ0FBQTtnQkFDbEIsR0FBRyxJQUFJLEdBQUcsQ0FBQTthQUNWO2lCQUFNO2dCQUNOLEdBQUcsSUFBSSxHQUFHLENBQUE7YUFDVjtZQUNELEdBQUcsSUFBSSxpQkFBaUIsQ0FBQyxHQUFHLENBQUMsQ0FBQTtTQUM3Qjs7WUFDRyxXQUFXLEdBQUcsSUFBSSxXQUFXLENBQUMsR0FBRyxDQUFDO1FBQ3RDLFdBQVcsQ0FBQyxTQUFTOzs7O1FBQUcsQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQSxDQUFBO1FBQ25ELFdBQVcsQ0FBQyxPQUFPOzs7O1FBQUcsQ0FBQyxHQUFHLEVBQUUsRUFBRTtZQUM3QixZQUFZLENBQUMsR0FBRyxDQUFDLENBQUE7WUFDakIsSUFBSSxDQUFDLE9BQU8scUJBQXFCLEtBQUssV0FBVyxDQUFDLElBQUkscUJBQXFCLEdBQUcsQ0FBQyxFQUFFO2dCQUNoRixXQUFXLENBQUMsS0FBSyxFQUFFLENBQUE7Z0JBQ25CLFVBQVU7OztnQkFBQyxHQUFHLEVBQUU7b0JBQ2YsSUFBSSxDQUFDLGNBQWMsQ0FDbEIsTUFBTSxFQUNOLFNBQVMsb0JBQ0wsT0FBTyxJQUNWLHFCQUFxQixFQUFFLE9BQU8scUJBQXFCLEtBQUssUUFBUSxDQUFDLENBQUMsQ0FBQyxxQkFBcUIsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsSUFFekcsQ0FBQTtnQkFDRixDQUFDLEdBQUUsd0JBQXdCLElBQUksSUFBSSxDQUFDLENBQUE7YUFDcEM7UUFDRixDQUFDLENBQUEsQ0FBQTtRQUNELE9BQU8sV0FBVyxDQUFBO0lBQ25CLENBQUM7Ozs7O0lBRUQsY0FBYyxDQUFDLE1BQU07O2NBQ2QsUUFBUSxHQUFHLElBQUk7UUFDckIsT0FBTyxJQUFJLE9BQU87Ozs7O1FBQUMsQ0FBQyxPQUFPLEVBQUUsTUFBTSxFQUFFLEVBQUU7WUFDdEMsRUFBRTs7O1lBQUMsUUFBUSxDQUFDO2dCQUNYLE9BQU8sTUFBTSxRQUFRLENBQUMsY0FBYyxDQUFDLEdBQUcsQ0FBQyxLQUFLLEVBQUUsR0FBRyxRQUFRLENBQUMsT0FBTyxhQUFhLEVBQUU7b0JBQ2pGLE9BQU8sRUFBRSxRQUFRLENBQUMsT0FBTztvQkFDekIsTUFBTSxFQUFFLFFBQVEsQ0FBQyxrQkFBa0IsQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxDQUFDO2lCQUNqRSxDQUFDLENBQUE7WUFDSCxDQUFDLEVBQUMsQ0FBQyxJQUFJOzs7O1lBQUMsQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUM7Ozs7WUFBRSxDQUFDLEdBQUcsRUFBRSxFQUFFO2dCQUN0QyxRQUFRLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxDQUFBO2dCQUN6QixNQUFNLENBQUMsRUFBQyxLQUFLLEVBQUUsSUFBSSxFQUFDLENBQUMsQ0FBQTtZQUN0QixDQUFDLEVBQUMsQ0FBQTtRQUNILENBQUMsRUFBQyxDQUFBO0lBQ0gsQ0FBQzs7Ozs7SUFFRCxNQUFNLENBQUMsTUFBTTs7Y0FDTixRQUFRLEdBQUcsSUFBSTtRQUNyQixPQUFPLElBQUksT0FBTzs7Ozs7UUFBQyxDQUFDLE9BQU8sRUFBRSxNQUFNLEVBQUUsRUFBRTtZQUN0QyxFQUFFOzs7WUFBQyxRQUFRLENBQUM7Z0JBQ1gsT0FBTyxNQUFNLFFBQVEsQ0FBQyxjQUFjLENBQUMsR0FBRyxDQUFDLE9BQU8sRUFBRSxHQUFHLFFBQVEsQ0FBQyxPQUFPLFNBQVMsTUFBTSxDQUFDLEVBQUUsRUFBRSxFQUFFO29CQUMxRixPQUFPLEVBQUUsUUFBUSxDQUFDLE9BQU87b0JBQ3pCLElBQUksRUFBRSxRQUFRLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQztpQkFDbEMsQ0FBQyxDQUFBO1lBQ0gsQ0FBQyxFQUFDLENBQUMsSUFBSTs7OztZQUFDLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDOzs7O1lBQUUsQ0FBQyxHQUFHLEVBQUUsRUFBRTtnQkFDdEMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsQ0FBQTtnQkFDekIsTUFBTSxDQUFDLEVBQUMsS0FBSyxFQUFFLElBQUksRUFBQyxDQUFDLENBQUE7WUFDdEIsQ0FBQyxFQUFDLENBQUE7UUFDSCxDQUFDLEVBQUMsQ0FBQTtJQUNILENBQUM7Ozs7O0lBRUQsVUFBVSxDQUFDLE1BQU07O2NBQ1YsUUFBUSxHQUFHLElBQUk7UUFDckIsT0FBTyxJQUFJLE9BQU87Ozs7O1FBQUMsQ0FBQyxPQUFPLEVBQUUsTUFBTSxFQUFFLEVBQUU7WUFDdEMsRUFBRTs7O1lBQUMsUUFBUSxDQUFDO2dCQUNYLE9BQU8sTUFBTSxRQUFRLENBQUMsY0FBYyxDQUFDLEdBQUcsQ0FBQyxLQUFLLEVBQUUsR0FBRyxRQUFRLENBQUMsT0FBTyxFQUFFLEVBQUU7b0JBQ3RFLE9BQU8sRUFBRSxRQUFRLENBQUMsT0FBTztvQkFDekIsSUFBSSxFQUFFLFFBQVEsQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDO2lCQUNsQyxDQUFDLENBQUE7WUFDSCxDQUFDLEVBQUMsQ0FBQyxJQUFJOzs7O1lBQUMsQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUM7Ozs7WUFBRSxDQUFDLEdBQUcsRUFBRSxFQUFFO2dCQUN0QyxRQUFRLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxDQUFBO2dCQUN6QixNQUFNLENBQUMsRUFBQyxLQUFLLEVBQUUsSUFBSSxFQUFDLENBQUMsQ0FBQTtZQUN0QixDQUFDLEVBQUMsQ0FBQTtRQUNILENBQUMsRUFBQyxDQUFBO0lBQ0gsQ0FBQzs7Ozs7SUFFRCxNQUFNLENBQUMsTUFBTTs7Y0FDTixRQUFRLEdBQUcsSUFBSTtRQUNyQixPQUFPLElBQUksT0FBTzs7Ozs7UUFBQyxDQUFDLE9BQU8sRUFBRSxNQUFNLEVBQUUsRUFBRTtZQUN0QyxFQUFFOzs7WUFBQyxRQUFRLENBQUM7Z0JBQ1gsT0FBTyxNQUFNLFFBQVEsQ0FBQyxjQUFjLENBQUMsR0FBRyxDQUFDLFFBQVEsRUFBRSxHQUFHLFFBQVEsQ0FBQyxPQUFPLElBQUksTUFBTSxDQUFDLEVBQUUsRUFBRSxFQUFFO29CQUN0RixPQUFPLEVBQUUsUUFBUSxDQUFDLE9BQU87b0JBQ3pCLElBQUksRUFBRSxRQUFRLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQztpQkFDbEMsQ0FBQyxDQUFBO1lBQ0gsQ0FBQyxFQUFDLENBQUMsSUFBSTs7OztZQUFDLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDOzs7O1lBQUUsQ0FBQyxHQUFHLEVBQUUsRUFBRTtnQkFDdEMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsQ0FBQTtnQkFDekIsTUFBTSxDQUFDLEVBQUMsS0FBSyxFQUFFLElBQUksRUFBQyxDQUFDLENBQUE7WUFDdEIsQ0FBQyxFQUFDLENBQUE7UUFDSCxDQUFDLEVBQUMsQ0FBQTtJQUNILENBQUM7OztZQTNNRCxVQUFVOzs7O1lBSEgsbUJBQW1CO1lBQ25CLGNBQWM7Ozs7SUFJckIsa0NBQWE7O0lBQ2Isa0NBQStEOztJQUMvRCxpREFBc0M7O0lBR3JDLDhDQUErQzs7SUFDL0MseUNBQXFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGNvIGZyb20gJ2NvJ1xyXG5pbXBvcnQge0luamVjdGFibGV9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnXHJcbmltcG9ydCB7SHR0cEhlYWRlcnN9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJ1xyXG5cclxuaW1wb3J0IHtHbG9iYWxFdmVudHNTZXJ2aWNlfSBmcm9tICcuL2dsb2JhbEV2ZW50cy9nbG9iYWxFdmVudHMuc2VydmljZSdcclxuaW1wb3J0IHtSZXF1ZXN0U2VydmljZX0gZnJvbSAnLi9yZXF1ZXN0LnNlcnZpY2UnXHJcblxyXG5ASW5qZWN0YWJsZSgpXHJcbmV4cG9ydCBjbGFzcyBCYXNlUkVTVFNlcnZpY2Uge1xyXG5cdGJhc2VVcmwgPSAnLydcclxuXHRoZWFkZXJzID0gbmV3IEh0dHBIZWFkZXJzKHsnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nfSlcclxuXHRyZWRpcmVjdE9uRm9yYmlkZGVuVXJsPzogc3RyaW5nID0gbnVsbFxyXG5cclxuXHRjb25zdHJ1Y3RvcihcclxuXHRcdHB1YmxpYyBnbG9iYWxFdmVudHNTZXJ2aWNlOiBHbG9iYWxFdmVudHNTZXJ2aWNlLFxyXG5cdFx0cHVibGljIHJlcXVlc3RTZXJ2aWNlOiBSZXF1ZXN0U2VydmljZVxyXG5cdCkge31cclxuXHJcblx0ZW1wdHlUb051bGwoZGF0YTogYW55KTogYW55IHtcclxuXHRcdGlmIChkYXRhID09PSAnJykge1xyXG5cdFx0XHRyZXR1cm4gbnVsbFxyXG5cdFx0fVxyXG5cdFx0aWYgKGRhdGEgaW5zdGFuY2VvZiBEYXRlKSB7XHJcblx0XHRcdHJldHVybiBkYXRhXHJcblx0XHR9XHJcblx0XHRpZiAoZGF0YSBpbnN0YW5jZW9mIEFycmF5KSB7XHJcblx0XHRcdHJldHVybiBkYXRhLm1hcCgoaXRlbSwgaW5kZXgpID0+IHRoaXMuZW1wdHlUb051bGwoaXRlbSkpXHJcblx0XHR9XHJcblx0XHRpZiAoKHR5cGVvZiBkYXRhID09PSAnb2JqZWN0JykgJiYgKGRhdGEgIT09IG51bGwpKSB7XHJcblx0XHRcdGNvbnN0IHBhcnNlZERhdGEgPSB7fVxyXG5cdFx0XHRmb3IgKGNvbnN0IGtleSBpbiBkYXRhKSB7XHJcblx0XHRcdFx0cGFyc2VkRGF0YVtrZXldID0gdGhpcy5lbXB0eVRvTnVsbChkYXRhW2tleV0pXHJcblx0XHRcdH1cclxuXHRcdFx0cmV0dXJuIHBhcnNlZERhdGFcclxuXHRcdH1cclxuXHRcdHJldHVybiBkYXRhXHJcblx0fVxyXG5cclxuXHRzdHJpbmdpZnlHZXRQYXJhbXMoZGF0YToge1trZXk6IHN0cmluZ106IGFueX0pOiB7W2tleTogc3RyaW5nXTogYW55fSB7XHJcblx0XHRsZXQgc3RyaW5naWZpZWRPYmplY3QgPSB7fVxyXG5cdFx0Zm9yIChjb25zdCBrZXkgaW4gZGF0YSkge1xyXG5cdFx0XHRjb25zdCB2YWx1ZSA9IGRhdGFba2V5XVxyXG5cdFx0XHRpZiAoKHZhbHVlIGluc3RhbmNlb2YgQXJyYXkpIHx8ICgodHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JykgJiYgKHZhbHVlICE9PSBudWxsKSAmJiAhKHZhbHVlIGluc3RhbmNlb2YgRGF0ZSkpKSB7XHJcblx0XHRcdFx0c3RyaW5naWZpZWRPYmplY3RbYF9qc29uXyR7a2V5fWBdID0gSlNPTi5zdHJpbmdpZnkodmFsdWUpXHJcblx0XHRcdFx0Y29udGludWVcclxuXHRcdFx0fVxyXG5cdFx0XHRzdHJpbmdpZmllZE9iamVjdFtrZXldID0gdmFsdWVcclxuXHRcdH1cclxuXHRcdHJldHVybiBzdHJpbmdpZmllZE9iamVjdFxyXG5cdH1cclxuXHJcblx0aGFuZGxlRXJyb3IoZXJyOiBhbnksIG9wdGlvbnM/OiB7bm90aWZ5T25FcnJvcj86IGJvb2xlYW59KTogdm9pZCB7XHJcblx0XHRjb25zdCB7bm90aWZ5T25FcnJvcn0gPSBvcHRpb25zIHx8IHt9IGFzIGFueVxyXG5cdFx0aWYgKCFlcnIpIHtcclxuXHRcdFx0aWYgKG5vdGlmeU9uRXJyb3IgIT09IGZhbHNlKSB7XHJcblx0XHRcdFx0dGhpcy5nbG9iYWxFdmVudHNTZXJ2aWNlLm5vdGlmeSgnZXJyb3InLCAnQW4gZXJyb3IgaGFzIG9jY3VycmVkLicpXHJcblx0XHRcdH1cclxuXHRcdFx0cmV0dXJuXHJcblx0XHR9XHJcblx0XHRpZiAodGhpcy5yZWRpcmVjdE9uRm9yYmlkZGVuVXJsICYmIChlcnIuc3RhdHVzID09PSA0MDEpKSB7XHJcblx0XHRcdHRoaXMuZ2xvYmFsRXZlbnRzU2VydmljZS5yZWRpcmVjdCh0aGlzLnJlZGlyZWN0T25Gb3JiaWRkZW5VcmwpXHJcblx0XHRcdHJldHVyblxyXG5cdFx0fVxyXG5cdFx0aWYgKG5vdGlmeU9uRXJyb3IgIT09IGZhbHNlKSB7XHJcblx0XHRcdHRoaXMuZ2xvYmFsRXZlbnRzU2VydmljZS5ub3RpZnkoJ2Vycm9yJywgZXJyLmVycm9yICYmIGVyci5lcnJvci5lcnJvciB8fCAnQW4gZXJyb3IgaGFzIG9jY3VycmVkLicpXHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRjcmVhdGUocGFyYW1zKTogUHJvbWlzZTxhbnk+IHtcclxuXHRcdGNvbnN0IGluc3RhbmNlID0gdGhpc1xyXG5cdFx0cmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuXHRcdFx0Y28oZnVuY3Rpb24qKCkge1xyXG5cdFx0XHRcdHJldHVybiB5aWVsZCBpbnN0YW5jZS5yZXF1ZXN0U2VydmljZS5ydW4oJ3Bvc3QnLCBgJHtpbnN0YW5jZS5iYXNlVXJsfWAsIHtcclxuXHRcdFx0XHRcdGhlYWRlcnM6IGluc3RhbmNlLmhlYWRlcnMsXHJcblx0XHRcdFx0XHRib2R5OiBpbnN0YW5jZS5lbXB0eVRvTnVsbChwYXJhbXMpXHJcblx0XHRcdFx0fSlcclxuXHRcdFx0fSkudGhlbigocmVzKSA9PiByZXNvbHZlKHJlcyksIChlcnIpID0+IHtcclxuXHRcdFx0XHRpbnN0YW5jZS5oYW5kbGVFcnJvcihlcnIpXHJcblx0XHRcdFx0cmVqZWN0KHtlcnJvcjogdHJ1ZX0pXHJcblx0XHRcdH0pXHJcblx0XHR9KVxyXG5cdH1cclxuXHJcblx0cmVhZChwYXJhbXMpOiBQcm9taXNlPGFueT4ge1xyXG5cdFx0Y29uc3QgaW5zdGFuY2UgPSB0aGlzXHJcblx0XHRyZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG5cdFx0XHRjbyhmdW5jdGlvbiooKSB7XHJcblx0XHRcdFx0cmV0dXJuIHlpZWxkIGluc3RhbmNlLnJlcXVlc3RTZXJ2aWNlLnJ1bignZ2V0JywgYCR7aW5zdGFuY2UuYmFzZVVybH0vaXRlbWAsIHtcclxuXHRcdFx0XHRcdGhlYWRlcnM6IGluc3RhbmNlLmhlYWRlcnMsXHJcblx0XHRcdFx0XHRwYXJhbXM6IGluc3RhbmNlLnN0cmluZ2lmeUdldFBhcmFtcyhpbnN0YW5jZS5lbXB0eVRvTnVsbChwYXJhbXMpKVxyXG5cdFx0XHRcdH0pXHJcblx0XHRcdH0pLnRoZW4oKHJlcykgPT4gcmVzb2x2ZShyZXMpLCAoZXJyKSA9PiB7XHJcblx0XHRcdFx0aW5zdGFuY2UuaGFuZGxlRXJyb3IoZXJyKVxyXG5cdFx0XHRcdHJlamVjdCh7ZXJyb3I6IHRydWV9KVxyXG5cdFx0XHR9KVxyXG5cdFx0fSlcclxuXHR9XHJcblxyXG5cdHJlYWRMaXN0KHBhcmFtcyk6IFByb21pc2U8YW55PiB7XHJcblx0XHRjb25zdCBpbnN0YW5jZSA9IHRoaXNcclxuXHRcdHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcblx0XHRcdGNvKGZ1bmN0aW9uKigpIHtcclxuXHRcdFx0XHRyZXR1cm4geWllbGQgaW5zdGFuY2UucmVxdWVzdFNlcnZpY2UucnVuKCdnZXQnLCBgJHtpbnN0YW5jZS5iYXNlVXJsfWAsIHtcclxuXHRcdFx0XHRcdGhlYWRlcnM6IGluc3RhbmNlLmhlYWRlcnMsXHJcblx0XHRcdFx0XHRwYXJhbXM6IGluc3RhbmNlLnN0cmluZ2lmeUdldFBhcmFtcyhpbnN0YW5jZS5lbXB0eVRvTnVsbChwYXJhbXMpKVxyXG5cdFx0XHRcdH0pXHJcblx0XHRcdH0pLnRoZW4oKHJlcykgPT4gcmVzb2x2ZShyZXMpLCAoZXJyKSA9PiB7XHJcblx0XHRcdFx0aW5zdGFuY2UuaGFuZGxlRXJyb3IoZXJyKVxyXG5cdFx0XHRcdHJlamVjdCh7ZXJyb3I6IHRydWV9KVxyXG5cdFx0XHR9KVxyXG5cdFx0fSlcclxuXHR9XHJcblxyXG5cdHJlYWRTdHJlYW1MaXN0KFxyXG5cdFx0cGFyYW1zOiB7W2tleTogc3RyaW5nXTogYW55fSxcclxuXHRcdG9uTWVzc2FnZTogRnVuY3Rpb24sXHJcblx0XHRvcHRpb25zPzoge29uRXJyb3I/OiBGdW5jdGlvbiwgcmVjb25uZWN0QXR0ZW1wdEludGVydmFsPzogbnVtYmVyLCByZWNvbm5lY3RBdHRlbXB0c0xlZnQ/OiBudW1iZXJ9XHJcblx0KTogRXZlbnRTb3VyY2Uge1xyXG5cdFx0Y29uc3Qge29uRXJyb3IsIHJlY29ubmVjdEF0dGVtcHRJbnRlcnZhbCwgcmVjb25uZWN0QXR0ZW1wdHNMZWZ0fSA9IG9wdGlvbnMgfHwge30gYXMgYW55LFxyXG5cdFx0XHRlcnJvckhhbmRsZXIgPSBvbkVycm9yID8gb25FcnJvciA6IHRoaXMuaGFuZGxlRXJyb3IuYmluZCh0aGlzKVxyXG5cdFx0bGV0IHVybCA9IGAvJHt0aGlzLmJhc2VVcmx9L3N0cmVhbUxpc3RgLFxyXG5cdFx0XHRzdHJpbmdpZmllZFBhcmFtcyA9IHRoaXMuc3RyaW5naWZ5R2V0UGFyYW1zKHRoaXMuZW1wdHlUb051bGwocGFyYW1zKSksXHJcblx0XHRcdGZpcnN0UGFyYW0gPSB0cnVlXHJcblx0XHRmb3IgKGNvbnN0IGtleSBpbiBzdHJpbmdpZmllZFBhcmFtcykge1xyXG5cdFx0XHRpZiAoZmlyc3RQYXJhbSkge1xyXG5cdFx0XHRcdGZpcnN0UGFyYW0gPSBmYWxzZVxyXG5cdFx0XHRcdHVybCArPSAnPydcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHR1cmwgKz0gJyYnXHJcblx0XHRcdH1cclxuXHRcdFx0dXJsICs9IHN0cmluZ2lmaWVkUGFyYW1zW2tleV1cclxuXHRcdH1cclxuXHRcdGxldCBldmVudFNvdXJjZSA9IG5ldyBFdmVudFNvdXJjZSh1cmwpXHJcblx0XHRldmVudFNvdXJjZS5vbm1lc3NhZ2UgPSAoZXZlbnQpID0+IG9uTWVzc2FnZShldmVudClcclxuXHRcdGV2ZW50U291cmNlLm9uZXJyb3IgPSAoZXJyKSA9PiB7XHJcblx0XHRcdGVycm9ySGFuZGxlcihlcnIpXHJcblx0XHRcdGlmICgodHlwZW9mIHJlY29ubmVjdEF0dGVtcHRzTGVmdCA9PT0gJ3VuZGVmaW5lZCcpIHx8IHJlY29ubmVjdEF0dGVtcHRzTGVmdCA+IDApIHtcclxuXHRcdFx0XHRldmVudFNvdXJjZS5jbG9zZSgpXHJcblx0XHRcdFx0c2V0VGltZW91dCgoKSA9PiB7XHJcblx0XHRcdFx0XHR0aGlzLnJlYWRTdHJlYW1MaXN0KFxyXG5cdFx0XHRcdFx0XHRwYXJhbXMsXHJcblx0XHRcdFx0XHRcdG9uTWVzc2FnZSwge1xyXG5cdFx0XHRcdFx0XHRcdC4uLm9wdGlvbnMsXHJcblx0XHRcdFx0XHRcdFx0cmVjb25uZWN0QXR0ZW1wdHNMZWZ0OiB0eXBlb2YgcmVjb25uZWN0QXR0ZW1wdHNMZWZ0ID09PSAnbnVtYmVyJyA/IHJlY29ubmVjdEF0dGVtcHRzTGVmdCAtIDEgOiB1bmRlZmluZWRcclxuXHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0KVxyXG5cdFx0XHRcdH0sIHJlY29ubmVjdEF0dGVtcHRJbnRlcnZhbCB8fCA1MDAwKVxyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0XHRyZXR1cm4gZXZlbnRTb3VyY2VcclxuXHR9XHJcblxyXG5cdHJlYWRTZWxlY3RMaXN0KHBhcmFtcyk6IFByb21pc2U8YW55PiB7XHJcblx0XHRjb25zdCBpbnN0YW5jZSA9IHRoaXNcclxuXHRcdHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcblx0XHRcdGNvKGZ1bmN0aW9uKigpIHtcclxuXHRcdFx0XHRyZXR1cm4geWllbGQgaW5zdGFuY2UucmVxdWVzdFNlcnZpY2UucnVuKCdnZXQnLCBgJHtpbnN0YW5jZS5iYXNlVXJsfS9zZWxlY3RMaXN0YCwge1xyXG5cdFx0XHRcdFx0aGVhZGVyczogaW5zdGFuY2UuaGVhZGVycyxcclxuXHRcdFx0XHRcdHBhcmFtczogaW5zdGFuY2Uuc3RyaW5naWZ5R2V0UGFyYW1zKGluc3RhbmNlLmVtcHR5VG9OdWxsKHBhcmFtcykpXHJcblx0XHRcdFx0fSlcclxuXHRcdFx0fSkudGhlbigocmVzKSA9PiByZXNvbHZlKHJlcyksIChlcnIpID0+IHtcclxuXHRcdFx0XHRpbnN0YW5jZS5oYW5kbGVFcnJvcihlcnIpXHJcblx0XHRcdFx0cmVqZWN0KHtlcnJvcjogdHJ1ZX0pXHJcblx0XHRcdH0pXHJcblx0XHR9KVxyXG5cdH1cclxuXHJcblx0dXBkYXRlKHBhcmFtcyk6IFByb21pc2U8YW55PiB7XHJcblx0XHRjb25zdCBpbnN0YW5jZSA9IHRoaXNcclxuXHRcdHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcblx0XHRcdGNvKGZ1bmN0aW9uKigpIHtcclxuXHRcdFx0XHRyZXR1cm4geWllbGQgaW5zdGFuY2UucmVxdWVzdFNlcnZpY2UucnVuKCdwYXRjaCcsIGAke2luc3RhbmNlLmJhc2VVcmx9L2l0ZW0vJHtwYXJhbXMuaWR9YCwge1xyXG5cdFx0XHRcdFx0aGVhZGVyczogaW5zdGFuY2UuaGVhZGVycyxcclxuXHRcdFx0XHRcdGJvZHk6IGluc3RhbmNlLmVtcHR5VG9OdWxsKHBhcmFtcylcclxuXHRcdFx0XHR9KVxyXG5cdFx0XHR9KS50aGVuKChyZXMpID0+IHJlc29sdmUocmVzKSwgKGVycikgPT4ge1xyXG5cdFx0XHRcdGluc3RhbmNlLmhhbmRsZUVycm9yKGVycilcclxuXHRcdFx0XHRyZWplY3Qoe2Vycm9yOiB0cnVlfSlcclxuXHRcdFx0fSlcclxuXHRcdH0pXHJcblx0fVxyXG5cclxuXHRidWxrVXBzZXJ0KHBhcmFtcyk6IFByb21pc2U8YW55PiB7XHJcblx0XHRjb25zdCBpbnN0YW5jZSA9IHRoaXNcclxuXHRcdHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcblx0XHRcdGNvKGZ1bmN0aW9uKigpIHtcclxuXHRcdFx0XHRyZXR1cm4geWllbGQgaW5zdGFuY2UucmVxdWVzdFNlcnZpY2UucnVuKCdwdXQnLCBgJHtpbnN0YW5jZS5iYXNlVXJsfWAsIHtcclxuXHRcdFx0XHRcdGhlYWRlcnM6IGluc3RhbmNlLmhlYWRlcnMsXHJcblx0XHRcdFx0XHRib2R5OiBpbnN0YW5jZS5lbXB0eVRvTnVsbChwYXJhbXMpXHJcblx0XHRcdFx0fSlcclxuXHRcdFx0fSkudGhlbigocmVzKSA9PiByZXNvbHZlKHJlcyksIChlcnIpID0+IHtcclxuXHRcdFx0XHRpbnN0YW5jZS5oYW5kbGVFcnJvcihlcnIpXHJcblx0XHRcdFx0cmVqZWN0KHtlcnJvcjogdHJ1ZX0pXHJcblx0XHRcdH0pXHJcblx0XHR9KVxyXG5cdH1cclxuXHJcblx0ZGVsZXRlKHBhcmFtcyk6IFByb21pc2U8YW55PiB7XHJcblx0XHRjb25zdCBpbnN0YW5jZSA9IHRoaXNcclxuXHRcdHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcblx0XHRcdGNvKGZ1bmN0aW9uKigpIHtcclxuXHRcdFx0XHRyZXR1cm4geWllbGQgaW5zdGFuY2UucmVxdWVzdFNlcnZpY2UucnVuKCdkZWxldGUnLCBgJHtpbnN0YW5jZS5iYXNlVXJsfS8ke3BhcmFtcy5pZH1gLCB7XHJcblx0XHRcdFx0XHRoZWFkZXJzOiBpbnN0YW5jZS5oZWFkZXJzLFxyXG5cdFx0XHRcdFx0Ym9keTogaW5zdGFuY2UuZW1wdHlUb051bGwocGFyYW1zKVxyXG5cdFx0XHRcdH0pXHJcblx0XHRcdH0pLnRoZW4oKHJlcykgPT4gcmVzb2x2ZShyZXMpLCAoZXJyKSA9PiB7XHJcblx0XHRcdFx0aW5zdGFuY2UuaGFuZGxlRXJyb3IoZXJyKVxyXG5cdFx0XHRcdHJlamVjdCh7ZXJyb3I6IHRydWV9KVxyXG5cdFx0XHR9KVxyXG5cdFx0fSlcclxuXHR9XHJcbn1cclxuIl19