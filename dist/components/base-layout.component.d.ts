import { OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalEventsService } from '../services/globalEvents/globalEvents.service';
import { GESRedirectOptionsInterface } from '../services/globalEvents/globalEvents.interfaces';
export declare class BaseLayoutComponent implements OnInit {
    globalEventsService: GlobalEventsService;
    router: Router;
    initialDataLoaded: boolean;
    loaderActive: boolean;
    queryParams: {
        [x: string]: string;
    };
    routeParams: {
        [x: string]: string;
    };
    constructor(globalEventsService: GlobalEventsService, router: Router);
    ngOnInit(): void;
    sendInitialDataLoadedEvent(): void;
    pageLoaded(data?: {
        [x: string]: any;
    }): void;
    loadInitialData(): void;
    setLayoutData(args: {
        [x: string]: any;
    }): void;
    redirect(route: string, options: GESRedirectOptionsInterface): void;
    toggleLoader(active: boolean): void;
}
