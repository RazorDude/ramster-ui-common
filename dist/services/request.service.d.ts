import { HttpClient } from '@angular/common/http';
export declare class RequestService {
    client: HttpClient;
    constructor(client: HttpClient);
    run(method: string, url: string, options?: {
        [x: string]: any;
    }): Promise<{}>;
}
