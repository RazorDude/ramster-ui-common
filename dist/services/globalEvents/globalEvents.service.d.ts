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
    getLayoutDataSource: Subject<{
        eventId: number;
        eventType: string;
        payload?: {
            [x: string]: any;
        };
    }>;
    layoutDataChangedSource: Subject<{
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
    pageLoaded$: import("rxjs").Observable<void | {
        [x: string]: any;
    }>;
    triggerInitialDataLoad$: import("rxjs").Observable<void>;
    initialDataLoaded$: import("rxjs").Observable<any>;
    setLayoutData$: import("rxjs").Observable<{
        [x: string]: any;
    }>;
    getLayoutData$: import("rxjs").Observable<{
        eventId: number;
        eventType: string;
        payload?: {
            [x: string]: any;
        };
    }>;
    layoutDataChanged$: import("rxjs").Observable<{
        [x: string]: any;
    }>;
    redirect$: import("rxjs").Observable<{
        route: string;
        options: GESRedirectOptionsInterface;
    }>;
    notify$: import("rxjs").Observable<{
        type: string;
        message: string;
    }>;
    toggleLoader$: import("rxjs").Observable<boolean>;
    pageLoaded(data: any): void;
    triggerInitialDataLoad(): void;
    initialDataLoaded(data: any): void;
    setLayoutData(data: any): void;
    getLayoutData(): Promise<{
        [fieldName: string]: any;
    }>;
    layoutDataChanged(data: any): void;
    redirect(route: string, options?: GESRedirectOptionsInterface): void;
    notify(type: string, message: string): void;
    toggleLoader(active: boolean): void;
}
