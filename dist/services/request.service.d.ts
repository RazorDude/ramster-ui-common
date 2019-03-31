import { HttpClient } from '@angular/common/http';
export declare class RequestService {
    client: HttpClient;
    constructor(client: HttpClient);
    flattenObjectForQuery(object: {
        [x: string]: any;
    } | any[], parentKey?: string): {
        key: string;
        value: any;
    }[];
    run(method: string, url: string, options?: {
        [x: string]: any;
    }): Promise<{}>;
}
