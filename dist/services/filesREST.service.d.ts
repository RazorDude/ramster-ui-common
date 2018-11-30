import { HttpHeaders } from '@angular/common/http';
import { GlobalEventsService } from './globalEvents/globalEvents.service';
import { RequestService } from './request.service';
export declare class FilesRESTService {
    globalEventsService: GlobalEventsService;
    requestService: RequestService;
    headers: HttpHeaders;
    baseUrl: string;
    constructor(globalEventsService: GlobalEventsService, requestService: RequestService);
    handleError(err: any): void;
    upload(file: File, params: {
        outputFileName: string;
        [x: string]: any;
    }, options?: {
        handleError?: boolean;
    }): Promise<any>;
    read(params: any): Promise<any>;
}
