import { HttpHeaders } from '@angular/common/http';
import { GlobalEventsService } from './globalEvents/globalEvents.service';
import { RequestService } from './request.service';
export declare class BaseRESTService {
    globalEventsService: GlobalEventsService;
    requestService: RequestService;
    baseUrl: string;
    headers: HttpHeaders;
    redirectOnForbiddenUrl?: string;
    constructor(globalEventsService: GlobalEventsService, requestService: RequestService);
    emptyToNull(data: any): any;
    stringifyGetParams(data: {
        [key: string]: any;
    }): {
        [key: string]: any;
    };
    handleError(err: any): void;
    create(params: any): Promise<any>;
    read(params: any): Promise<any>;
    readList(params: any): Promise<any>;
    readSelectList(params: any): Promise<any>;
    update(params: any): Promise<any>;
    bulkUpsert(params: any): Promise<any>;
    delete(params: any): Promise<any>;
}
