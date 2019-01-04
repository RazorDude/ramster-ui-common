import { Subject } from 'rxjs';
import { GESRedirectOptionsInterface } from './globalEvents.interfaces';
export declare class GlobalEventsService {
    pageLoadedSource: Subject<void | {
        [x: string]: any;
    }>;
    triggerInitialDataLoadSource: Subject<void>;
    initialDataLoadedSource: Subject<any>;
    setLayoutDataSource: Subject<{
        [x: string]: any;
    }>;
    redirectSource: Subject<{
        route: string;
        options: GESRedirectOptionsInterface;
    }>;
    notifySource: Subject<{
        type: string;
        message: string;
    }>;
    toggleLoaderSource: Subject<boolean>;
    pageLoaded$: import("rxjs/internal/Observable").Observable<void | {
        [x: string]: any;
    }>;
    triggerInitialDataLoad$: import("rxjs/internal/Observable").Observable<void>;
    initialDataLoaded$: import("rxjs/internal/Observable").Observable<any>;
    setLayoutData$: import("rxjs/internal/Observable").Observable<{
        [x: string]: any;
    }>;
    redirect$: import("rxjs/internal/Observable").Observable<{
        route: string;
        options: GESRedirectOptionsInterface;
    }>;
    notify$: import("rxjs/internal/Observable").Observable<{
        type: string;
        message: string;
    }>;
    toggleLoader$: import("rxjs/internal/Observable").Observable<boolean>;
    pageLoaded(data: any): void;
    triggerInitialDataLoad(): void;
    initialDataLoaded(data: any): void;
    setLayoutData(data: any): void;
    redirect(route: string, options?: GESRedirectOptionsInterface): void;
    notify(type: string, message: string): void;
    toggleLoader(active: boolean): void;
}
