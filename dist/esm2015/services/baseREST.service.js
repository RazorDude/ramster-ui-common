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
        if (data instanceof Date) {
            return data;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFzZVJFU1Quc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL3JhbXN0ZXItdWktY29yZS8iLCJzb3VyY2VzIjpbInNlcnZpY2VzL2Jhc2VSRVNULnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxNQUFNLElBQUksQ0FBQTtBQUNuQixPQUFPLEVBQUMsVUFBVSxFQUFDLE1BQU0sZUFBZSxDQUFBO0FBQ3hDLE9BQU8sRUFBQyxXQUFXLEVBQUMsTUFBTSxzQkFBc0IsQ0FBQTtBQUVoRCxPQUFPLEVBQUMsbUJBQW1CLEVBQUMsTUFBTSxxQ0FBcUMsQ0FBQTtBQUN2RSxPQUFPLEVBQUMsY0FBYyxFQUFDLE1BQU0sbUJBQW1CLENBQUE7QUFHaEQsTUFBTSxPQUFPLGVBQWU7Ozs7O0lBSTNCLFlBQ1EsbUJBQXdDLEVBQ3hDLGNBQThCO1FBRDlCLHdCQUFtQixHQUFuQixtQkFBbUIsQ0FBcUI7UUFDeEMsbUJBQWMsR0FBZCxjQUFjLENBQWdCO1FBTHRDLFlBQU8sR0FBRyxJQUFJLFdBQVcsQ0FBQyxFQUFDLGNBQWMsRUFBRSxrQkFBa0IsRUFBQyxDQUFDLENBQUE7UUFDL0QsWUFBTyxHQUFHLEdBQUcsQ0FBQTtJQUtWLENBQUM7Ozs7O0lBRUosV0FBVyxDQUFDLElBQVM7UUFDcEIsSUFBSSxJQUFJLEtBQUssRUFBRSxFQUFFO1lBQ2hCLE9BQU8sSUFBSSxDQUFBO1NBQ1g7UUFDRCxJQUFJLElBQUksWUFBWSxJQUFJLEVBQUU7WUFDekIsT0FBTyxJQUFJLENBQUE7U0FDWDtRQUNELElBQUksSUFBSSxZQUFZLEtBQUssRUFBRTtZQUMxQixPQUFPLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLEVBQUUsS0FBSyxFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUE7U0FDeEQ7UUFDRCxJQUFJLENBQUMsT0FBTyxJQUFJLEtBQUssUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLEtBQUssSUFBSSxDQUFDLEVBQUU7O2tCQUM1QyxVQUFVLEdBQUcsRUFBRTtZQUNyQixLQUFLLE1BQU0sR0FBRyxJQUFJLElBQUksRUFBRTtnQkFDdkIsVUFBVSxDQUFDLEdBQUcsQ0FBQyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUE7YUFDN0M7WUFDRCxPQUFPLFVBQVUsQ0FBQTtTQUNqQjtRQUNELE9BQU8sSUFBSSxDQUFBO0lBQ1osQ0FBQzs7Ozs7SUFFRCxXQUFXLENBQUMsR0FBRztRQUNkLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFFLEdBQUcsSUFBSSxHQUFHLENBQUMsS0FBSyxJQUFJLEdBQUcsQ0FBQyxLQUFLLENBQUMsS0FBSyxJQUFJLHdCQUF3QixDQUFDLENBQUE7SUFDMUcsQ0FBQzs7Ozs7SUFFRCxNQUFNLENBQUMsTUFBTTs7Y0FDTixRQUFRLEdBQUcsSUFBSTtRQUNyQixPQUFPLElBQUksT0FBTyxDQUFDLENBQUMsT0FBTyxFQUFFLE1BQU0sRUFBRSxFQUFFO1lBQ3RDLEVBQUUsQ0FBQyxRQUFRLENBQUM7Z0JBQ1gsT0FBTyxNQUFNLFFBQVEsQ0FBQyxjQUFjLENBQUMsR0FBRyxDQUFDLE1BQU0sRUFBRSxHQUFHLFFBQVEsQ0FBQyxPQUFPLEVBQUUsRUFBRTtvQkFDdkUsT0FBTyxFQUFFLFFBQVEsQ0FBQyxPQUFPO29CQUN6QixJQUFJLEVBQUUsUUFBUSxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUM7aUJBQ2xDLENBQUMsQ0FBQTtZQUNILENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsRUFBRSxFQUFFLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxFQUFFLEVBQUU7Z0JBQ3RDLFFBQVEsQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLENBQUE7Z0JBQ3pCLE1BQU0sQ0FBQyxFQUFDLEtBQUssRUFBRSxJQUFJLEVBQUMsQ0FBQyxDQUFBO1lBQ3RCLENBQUMsQ0FBQyxDQUFBO1FBQ0gsQ0FBQyxDQUFDLENBQUE7SUFDSCxDQUFDOzs7OztJQUVELElBQUksQ0FBQyxNQUFNOztjQUNKLFFBQVEsR0FBRyxJQUFJO1FBQ3JCLE9BQU8sSUFBSSxPQUFPLENBQUMsQ0FBQyxPQUFPLEVBQUUsTUFBTSxFQUFFLEVBQUU7WUFDdEMsRUFBRSxDQUFDLFFBQVEsQ0FBQztnQkFDWCxPQUFPLE1BQU0sUUFBUSxDQUFDLGNBQWMsQ0FBQyxHQUFHLENBQUMsS0FBSyxFQUFFLEdBQUcsUUFBUSxDQUFDLE9BQU8sT0FBTyxFQUFFO29CQUMzRSxPQUFPLEVBQUUsUUFBUSxDQUFDLE9BQU87b0JBQ3pCLE1BQU0sRUFBRSxRQUFRLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQztpQkFDcEMsQ0FBQyxDQUFBO1lBQ0gsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEVBQUUsRUFBRTtnQkFDdEMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsQ0FBQTtnQkFDekIsTUFBTSxDQUFDLEVBQUMsS0FBSyxFQUFFLElBQUksRUFBQyxDQUFDLENBQUE7WUFDdEIsQ0FBQyxDQUFDLENBQUE7UUFDSCxDQUFDLENBQUMsQ0FBQTtJQUNILENBQUM7Ozs7O0lBRUQsUUFBUSxDQUFDLE1BQU07O2NBQ1IsUUFBUSxHQUFHLElBQUk7UUFDckIsT0FBTyxJQUFJLE9BQU8sQ0FBQyxDQUFDLE9BQU8sRUFBRSxNQUFNLEVBQUUsRUFBRTtZQUN0QyxFQUFFLENBQUMsUUFBUSxDQUFDO2dCQUNYLE9BQU8sTUFBTSxRQUFRLENBQUMsY0FBYyxDQUFDLEdBQUcsQ0FBQyxLQUFLLEVBQUUsR0FBRyxRQUFRLENBQUMsT0FBTyxFQUFFLEVBQUU7b0JBQ3RFLE9BQU8sRUFBRSxRQUFRLENBQUMsT0FBTztvQkFDekIsTUFBTSxFQUFFLFFBQVEsQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDO2lCQUNwQyxDQUFDLENBQUE7WUFDSCxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsRUFBRSxFQUFFO2dCQUN0QyxRQUFRLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxDQUFBO2dCQUN6QixNQUFNLENBQUMsRUFBQyxLQUFLLEVBQUUsSUFBSSxFQUFDLENBQUMsQ0FBQTtZQUN0QixDQUFDLENBQUMsQ0FBQTtRQUNILENBQUMsQ0FBQyxDQUFBO0lBQ0gsQ0FBQzs7Ozs7SUFFRCxjQUFjLENBQUMsTUFBTTs7Y0FDZCxRQUFRLEdBQUcsSUFBSTtRQUNyQixPQUFPLElBQUksT0FBTyxDQUFDLENBQUMsT0FBTyxFQUFFLE1BQU0sRUFBRSxFQUFFO1lBQ3RDLEVBQUUsQ0FBQyxRQUFRLENBQUM7Z0JBQ1gsT0FBTyxNQUFNLFFBQVEsQ0FBQyxjQUFjLENBQUMsR0FBRyxDQUFDLEtBQUssRUFBRSxHQUFHLFFBQVEsQ0FBQyxPQUFPLGFBQWEsRUFBRTtvQkFDakYsT0FBTyxFQUFFLFFBQVEsQ0FBQyxPQUFPO29CQUN6QixNQUFNLEVBQUUsUUFBUSxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUM7aUJBQ3BDLENBQUMsQ0FBQTtZQUNILENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsRUFBRSxFQUFFLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxFQUFFLEVBQUU7Z0JBQ3RDLFFBQVEsQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLENBQUE7Z0JBQ3pCLE1BQU0sQ0FBQyxFQUFDLEtBQUssRUFBRSxJQUFJLEVBQUMsQ0FBQyxDQUFBO1lBQ3RCLENBQUMsQ0FBQyxDQUFBO1FBQ0gsQ0FBQyxDQUFDLENBQUE7SUFDSCxDQUFDOzs7OztJQUVELE1BQU0sQ0FBQyxNQUFNOztjQUNOLFFBQVEsR0FBRyxJQUFJO1FBQ3JCLE9BQU8sSUFBSSxPQUFPLENBQUMsQ0FBQyxPQUFPLEVBQUUsTUFBTSxFQUFFLEVBQUU7WUFDdEMsRUFBRSxDQUFDLFFBQVEsQ0FBQztnQkFDWCxPQUFPLE1BQU0sUUFBUSxDQUFDLGNBQWMsQ0FBQyxHQUFHLENBQUMsT0FBTyxFQUFFLEdBQUcsUUFBUSxDQUFDLE9BQU8sU0FBUyxNQUFNLENBQUMsRUFBRSxFQUFFLEVBQUU7b0JBQzFGLE9BQU8sRUFBRSxRQUFRLENBQUMsT0FBTztvQkFDekIsSUFBSSxFQUFFLFFBQVEsQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDO2lCQUNsQyxDQUFDLENBQUE7WUFDSCxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsRUFBRSxFQUFFO2dCQUN0QyxRQUFRLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxDQUFBO2dCQUN6QixNQUFNLENBQUMsRUFBQyxLQUFLLEVBQUUsSUFBSSxFQUFDLENBQUMsQ0FBQTtZQUN0QixDQUFDLENBQUMsQ0FBQTtRQUNILENBQUMsQ0FBQyxDQUFBO0lBQ0gsQ0FBQzs7Ozs7SUFFRCxVQUFVLENBQUMsTUFBTTs7Y0FDVixRQUFRLEdBQUcsSUFBSTtRQUNyQixPQUFPLElBQUksT0FBTyxDQUFDLENBQUMsT0FBTyxFQUFFLE1BQU0sRUFBRSxFQUFFO1lBQ3RDLEVBQUUsQ0FBQyxRQUFRLENBQUM7Z0JBQ1gsT0FBTyxNQUFNLFFBQVEsQ0FBQyxjQUFjLENBQUMsR0FBRyxDQUFDLEtBQUssRUFBRSxHQUFHLFFBQVEsQ0FBQyxPQUFPLEVBQUUsRUFBRTtvQkFDdEUsT0FBTyxFQUFFLFFBQVEsQ0FBQyxPQUFPO29CQUN6QixJQUFJLEVBQUUsUUFBUSxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUM7aUJBQ2xDLENBQUMsQ0FBQTtZQUNILENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsRUFBRSxFQUFFLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxFQUFFLEVBQUU7Z0JBQ3RDLFFBQVEsQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLENBQUE7Z0JBQ3pCLE1BQU0sQ0FBQyxFQUFDLEtBQUssRUFBRSxJQUFJLEVBQUMsQ0FBQyxDQUFBO1lBQ3RCLENBQUMsQ0FBQyxDQUFBO1FBQ0gsQ0FBQyxDQUFDLENBQUE7SUFDSCxDQUFDOzs7OztJQUVELE1BQU0sQ0FBQyxNQUFNOztjQUNOLFFBQVEsR0FBRyxJQUFJO1FBQ3JCLE9BQU8sSUFBSSxPQUFPLENBQUMsQ0FBQyxPQUFPLEVBQUUsTUFBTSxFQUFFLEVBQUU7WUFDdEMsRUFBRSxDQUFDLFFBQVEsQ0FBQztnQkFDWCxPQUFPLE1BQU0sUUFBUSxDQUFDLGNBQWMsQ0FBQyxHQUFHLENBQUMsUUFBUSxFQUFFLEdBQUcsUUFBUSxDQUFDLE9BQU8sSUFBSSxNQUFNLENBQUMsRUFBRSxFQUFFLEVBQUU7b0JBQ3RGLE9BQU8sRUFBRSxRQUFRLENBQUMsT0FBTztvQkFDekIsSUFBSSxFQUFFLFFBQVEsQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDO2lCQUNsQyxDQUFDLENBQUE7WUFDSCxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsRUFBRSxFQUFFO2dCQUN0QyxRQUFRLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxDQUFBO2dCQUN6QixNQUFNLENBQUMsRUFBQyxLQUFLLEVBQUUsSUFBSSxFQUFDLENBQUMsQ0FBQTtZQUN0QixDQUFDLENBQUMsQ0FBQTtRQUNILENBQUMsQ0FBQyxDQUFBO0lBQ0gsQ0FBQzs7O1lBeklELFVBQVU7Ozs7WUFISCxtQkFBbUI7WUFDbkIsY0FBYzs7OztJQUlyQixrQ0FBK0Q7O0lBQy9ELGtDQUFhOztJQUdaLDhDQUErQzs7SUFDL0MseUNBQXFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGNvIGZyb20gJ2NvJ1xyXG5pbXBvcnQge0luamVjdGFibGV9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnXHJcbmltcG9ydCB7SHR0cEhlYWRlcnN9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJ1xyXG5cclxuaW1wb3J0IHtHbG9iYWxFdmVudHNTZXJ2aWNlfSBmcm9tICcuL2dsb2JhbEV2ZW50cy9nbG9iYWxFdmVudHMuc2VydmljZSdcclxuaW1wb3J0IHtSZXF1ZXN0U2VydmljZX0gZnJvbSAnLi9yZXF1ZXN0LnNlcnZpY2UnXHJcblxyXG5ASW5qZWN0YWJsZSgpXHJcbmV4cG9ydCBjbGFzcyBCYXNlUkVTVFNlcnZpY2Uge1xyXG5cdGhlYWRlcnMgPSBuZXcgSHR0cEhlYWRlcnMoeydDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbid9KVxyXG5cdGJhc2VVcmwgPSAnLydcclxuXHJcblx0Y29uc3RydWN0b3IoXHJcblx0XHRwdWJsaWMgZ2xvYmFsRXZlbnRzU2VydmljZTogR2xvYmFsRXZlbnRzU2VydmljZSxcclxuXHRcdHB1YmxpYyByZXF1ZXN0U2VydmljZTogUmVxdWVzdFNlcnZpY2VcclxuXHQpIHt9XHJcblxyXG5cdGVtcHR5VG9OdWxsKGRhdGE6IGFueSk6IGFueSB7XHJcblx0XHRpZiAoZGF0YSA9PT0gJycpIHtcclxuXHRcdFx0cmV0dXJuIG51bGxcclxuXHRcdH1cclxuXHRcdGlmIChkYXRhIGluc3RhbmNlb2YgRGF0ZSkge1xyXG5cdFx0XHRyZXR1cm4gZGF0YVxyXG5cdFx0fVxyXG5cdFx0aWYgKGRhdGEgaW5zdGFuY2VvZiBBcnJheSkge1xyXG5cdFx0XHRyZXR1cm4gZGF0YS5tYXAoKGl0ZW0sIGluZGV4KSA9PiB0aGlzLmVtcHR5VG9OdWxsKGl0ZW0pKVxyXG5cdFx0fVxyXG5cdFx0aWYgKCh0eXBlb2YgZGF0YSA9PT0gJ29iamVjdCcpICYmIChkYXRhICE9PSBudWxsKSkge1xyXG5cdFx0XHRjb25zdCBwYXJzZWREYXRhID0ge31cclxuXHRcdFx0Zm9yIChjb25zdCBrZXkgaW4gZGF0YSkge1xyXG5cdFx0XHRcdHBhcnNlZERhdGFba2V5XSA9IHRoaXMuZW1wdHlUb051bGwoZGF0YVtrZXldKVxyXG5cdFx0XHR9XHJcblx0XHRcdHJldHVybiBwYXJzZWREYXRhXHJcblx0XHR9XHJcblx0XHRyZXR1cm4gZGF0YVxyXG5cdH1cclxuXHJcblx0aGFuZGxlRXJyb3IoZXJyKTogdm9pZCB7XHJcblx0XHR0aGlzLmdsb2JhbEV2ZW50c1NlcnZpY2Uubm90aWZ5KCdlcnJvcicsIGVyciAmJiBlcnIuZXJyb3IgJiYgZXJyLmVycm9yLmVycm9yIHx8ICdBbiBlcnJvciBoYXMgb2NjdXJyZWQuJylcclxuXHR9XHJcblxyXG5cdGNyZWF0ZShwYXJhbXMpOiBQcm9taXNlPGFueT4ge1xyXG5cdFx0Y29uc3QgaW5zdGFuY2UgPSB0aGlzXHJcblx0XHRyZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG5cdFx0XHRjbyhmdW5jdGlvbiooKSB7XHJcblx0XHRcdFx0cmV0dXJuIHlpZWxkIGluc3RhbmNlLnJlcXVlc3RTZXJ2aWNlLnJ1bigncG9zdCcsIGAke2luc3RhbmNlLmJhc2VVcmx9YCwge1xyXG5cdFx0XHRcdFx0aGVhZGVyczogaW5zdGFuY2UuaGVhZGVycyxcclxuXHRcdFx0XHRcdGJvZHk6IGluc3RhbmNlLmVtcHR5VG9OdWxsKHBhcmFtcylcclxuXHRcdFx0XHR9KVxyXG5cdFx0XHR9KS50aGVuKChyZXMpID0+IHJlc29sdmUocmVzKSwgKGVycikgPT4ge1xyXG5cdFx0XHRcdGluc3RhbmNlLmhhbmRsZUVycm9yKGVycilcclxuXHRcdFx0XHRyZWplY3Qoe2Vycm9yOiB0cnVlfSlcclxuXHRcdFx0fSlcclxuXHRcdH0pXHJcblx0fVxyXG5cclxuXHRyZWFkKHBhcmFtcyk6IFByb21pc2U8YW55PiB7XHJcblx0XHRjb25zdCBpbnN0YW5jZSA9IHRoaXNcclxuXHRcdHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcblx0XHRcdGNvKGZ1bmN0aW9uKigpIHtcclxuXHRcdFx0XHRyZXR1cm4geWllbGQgaW5zdGFuY2UucmVxdWVzdFNlcnZpY2UucnVuKCdnZXQnLCBgJHtpbnN0YW5jZS5iYXNlVXJsfS9pdGVtYCwge1xyXG5cdFx0XHRcdFx0aGVhZGVyczogaW5zdGFuY2UuaGVhZGVycyxcclxuXHRcdFx0XHRcdHBhcmFtczogaW5zdGFuY2UuZW1wdHlUb051bGwocGFyYW1zKVxyXG5cdFx0XHRcdH0pXHJcblx0XHRcdH0pLnRoZW4oKHJlcykgPT4gcmVzb2x2ZShyZXMpLCAoZXJyKSA9PiB7XHJcblx0XHRcdFx0aW5zdGFuY2UuaGFuZGxlRXJyb3IoZXJyKVxyXG5cdFx0XHRcdHJlamVjdCh7ZXJyb3I6IHRydWV9KVxyXG5cdFx0XHR9KVxyXG5cdFx0fSlcclxuXHR9XHJcblxyXG5cdHJlYWRMaXN0KHBhcmFtcyk6IFByb21pc2U8YW55PiB7XHJcblx0XHRjb25zdCBpbnN0YW5jZSA9IHRoaXNcclxuXHRcdHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcblx0XHRcdGNvKGZ1bmN0aW9uKigpIHtcclxuXHRcdFx0XHRyZXR1cm4geWllbGQgaW5zdGFuY2UucmVxdWVzdFNlcnZpY2UucnVuKCdnZXQnLCBgJHtpbnN0YW5jZS5iYXNlVXJsfWAsIHtcclxuXHRcdFx0XHRcdGhlYWRlcnM6IGluc3RhbmNlLmhlYWRlcnMsXHJcblx0XHRcdFx0XHRwYXJhbXM6IGluc3RhbmNlLmVtcHR5VG9OdWxsKHBhcmFtcylcclxuXHRcdFx0XHR9KVxyXG5cdFx0XHR9KS50aGVuKChyZXMpID0+IHJlc29sdmUocmVzKSwgKGVycikgPT4ge1xyXG5cdFx0XHRcdGluc3RhbmNlLmhhbmRsZUVycm9yKGVycilcclxuXHRcdFx0XHRyZWplY3Qoe2Vycm9yOiB0cnVlfSlcclxuXHRcdFx0fSlcclxuXHRcdH0pXHJcblx0fVxyXG5cclxuXHRyZWFkU2VsZWN0TGlzdChwYXJhbXMpOiBQcm9taXNlPGFueT4ge1xyXG5cdFx0Y29uc3QgaW5zdGFuY2UgPSB0aGlzXHJcblx0XHRyZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG5cdFx0XHRjbyhmdW5jdGlvbiooKSB7XHJcblx0XHRcdFx0cmV0dXJuIHlpZWxkIGluc3RhbmNlLnJlcXVlc3RTZXJ2aWNlLnJ1bignZ2V0JywgYCR7aW5zdGFuY2UuYmFzZVVybH0vc2VsZWN0TGlzdGAsIHtcclxuXHRcdFx0XHRcdGhlYWRlcnM6IGluc3RhbmNlLmhlYWRlcnMsXHJcblx0XHRcdFx0XHRwYXJhbXM6IGluc3RhbmNlLmVtcHR5VG9OdWxsKHBhcmFtcylcclxuXHRcdFx0XHR9KVxyXG5cdFx0XHR9KS50aGVuKChyZXMpID0+IHJlc29sdmUocmVzKSwgKGVycikgPT4ge1xyXG5cdFx0XHRcdGluc3RhbmNlLmhhbmRsZUVycm9yKGVycilcclxuXHRcdFx0XHRyZWplY3Qoe2Vycm9yOiB0cnVlfSlcclxuXHRcdFx0fSlcclxuXHRcdH0pXHJcblx0fVxyXG5cclxuXHR1cGRhdGUocGFyYW1zKTogUHJvbWlzZTxhbnk+IHtcclxuXHRcdGNvbnN0IGluc3RhbmNlID0gdGhpc1xyXG5cdFx0cmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuXHRcdFx0Y28oZnVuY3Rpb24qKCkge1xyXG5cdFx0XHRcdHJldHVybiB5aWVsZCBpbnN0YW5jZS5yZXF1ZXN0U2VydmljZS5ydW4oJ3BhdGNoJywgYCR7aW5zdGFuY2UuYmFzZVVybH0vaXRlbS8ke3BhcmFtcy5pZH1gLCB7XHJcblx0XHRcdFx0XHRoZWFkZXJzOiBpbnN0YW5jZS5oZWFkZXJzLFxyXG5cdFx0XHRcdFx0Ym9keTogaW5zdGFuY2UuZW1wdHlUb051bGwocGFyYW1zKVxyXG5cdFx0XHRcdH0pXHJcblx0XHRcdH0pLnRoZW4oKHJlcykgPT4gcmVzb2x2ZShyZXMpLCAoZXJyKSA9PiB7XHJcblx0XHRcdFx0aW5zdGFuY2UuaGFuZGxlRXJyb3IoZXJyKVxyXG5cdFx0XHRcdHJlamVjdCh7ZXJyb3I6IHRydWV9KVxyXG5cdFx0XHR9KVxyXG5cdFx0fSlcclxuXHR9XHJcblxyXG5cdGJ1bGtVcHNlcnQocGFyYW1zKTogUHJvbWlzZTxhbnk+IHtcclxuXHRcdGNvbnN0IGluc3RhbmNlID0gdGhpc1xyXG5cdFx0cmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuXHRcdFx0Y28oZnVuY3Rpb24qKCkge1xyXG5cdFx0XHRcdHJldHVybiB5aWVsZCBpbnN0YW5jZS5yZXF1ZXN0U2VydmljZS5ydW4oJ3B1dCcsIGAke2luc3RhbmNlLmJhc2VVcmx9YCwge1xyXG5cdFx0XHRcdFx0aGVhZGVyczogaW5zdGFuY2UuaGVhZGVycyxcclxuXHRcdFx0XHRcdGJvZHk6IGluc3RhbmNlLmVtcHR5VG9OdWxsKHBhcmFtcylcclxuXHRcdFx0XHR9KVxyXG5cdFx0XHR9KS50aGVuKChyZXMpID0+IHJlc29sdmUocmVzKSwgKGVycikgPT4ge1xyXG5cdFx0XHRcdGluc3RhbmNlLmhhbmRsZUVycm9yKGVycilcclxuXHRcdFx0XHRyZWplY3Qoe2Vycm9yOiB0cnVlfSlcclxuXHRcdFx0fSlcclxuXHRcdH0pXHJcblx0fVxyXG5cclxuXHRkZWxldGUocGFyYW1zKTogUHJvbWlzZTxhbnk+IHtcclxuXHRcdGNvbnN0IGluc3RhbmNlID0gdGhpc1xyXG5cdFx0cmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuXHRcdFx0Y28oZnVuY3Rpb24qKCkge1xyXG5cdFx0XHRcdHJldHVybiB5aWVsZCBpbnN0YW5jZS5yZXF1ZXN0U2VydmljZS5ydW4oJ2RlbGV0ZScsIGAke2luc3RhbmNlLmJhc2VVcmx9LyR7cGFyYW1zLmlkfWAsIHtcclxuXHRcdFx0XHRcdGhlYWRlcnM6IGluc3RhbmNlLmhlYWRlcnMsXHJcblx0XHRcdFx0XHRib2R5OiBpbnN0YW5jZS5lbXB0eVRvTnVsbChwYXJhbXMpXHJcblx0XHRcdFx0fSlcclxuXHRcdFx0fSkudGhlbigocmVzKSA9PiByZXNvbHZlKHJlcyksIChlcnIpID0+IHtcclxuXHRcdFx0XHRpbnN0YW5jZS5oYW5kbGVFcnJvcihlcnIpXHJcblx0XHRcdFx0cmVqZWN0KHtlcnJvcjogdHJ1ZX0pXHJcblx0XHRcdH0pXHJcblx0XHR9KVxyXG5cdH1cclxufVxyXG4iXX0=