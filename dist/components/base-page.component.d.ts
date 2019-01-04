import { ActivatedRoute } from '@angular/router';
import { OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { GlobalEventsService } from '../services/globalEvents/globalEvents.service';
export declare class BasePageComponent implements OnInit, OnDestroy {
    activatedRoute: ActivatedRoute;
    globalEventsService: GlobalEventsService;
    onInitMethodNames: string[];
    onInitialDataLoadedMethodNames: string[];
    destroyed: Subject<void>;
    loggedInUser?: any;
    queryParams: {
        [x: string]: string;
    };
    routeParams: {
        [x: string]: string;
    };
    constructor(activatedRoute: ActivatedRoute, globalEventsService: GlobalEventsService, onInitMethodNames: string[], onInitialDataLoadedMethodNames: string[]);
    ngOnInit(): void;
    reset(): void;
    initialDataLoaded(data: any): void;
    destructor(): void;
    ngOnDestroy(): void;
}
