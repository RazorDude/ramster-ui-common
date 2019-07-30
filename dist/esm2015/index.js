/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
// angular dependencies
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ComponentInjector } from './components/componentInjector/componentInjector.component';
import { ComponentInjectorAreaDirective } from './components/componentInjector/componentInjector.directive';
export class RamsterUICoreModule {
}
RamsterUICoreModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    CommonModule
                ],
                declarations: [
                    ComponentInjector,
                    ComponentInjectorAreaDirective
                ],
                exports: [
                    ComponentInjector
                ]
            },] }
];
export { BaseLayoutComponent } from './components/base-layout.component';
export { BasePageComponent } from './components/base-page.component';
// export {ComponentInjector}
export { BaseRESTService } from './services/baseREST.service';
export { FilesRESTService } from './services/filesREST.service';
export { GlobalEventsService } from './services/globalEvents/globalEvents.service';
export {} from './services/globalEvents/globalEvents.interfaces';
export { ModelRESTServiceProviderService } from './services/modelRESTServiceProvider.service';
export { RequestService } from './services/request.service';
export { getNested, setNested } from './utils/toolbelt';
export {} from './interfaces/selectList.interface';
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290Ijoibmc6Ly9yYW1zdGVyLXVpLWNvcmUvIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUNBLE9BQU8sRUFBQyxZQUFZLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQTtBQUM1QyxPQUFPLEVBQUMsUUFBUSxFQUFDLE1BQU0sZUFBZSxDQUFBO0FBRXRDLE9BQU8sRUFBQyxpQkFBaUIsRUFBQyxNQUFNLDREQUE0RCxDQUFBO0FBQzVGLE9BQU8sRUFBQyw4QkFBOEIsRUFBQyxNQUFNLDREQUE0RCxDQUFBO0FBZXpHLE1BQU0sT0FBTyxtQkFBbUI7OztZQVovQixRQUFRLFNBQUM7Z0JBQ1QsT0FBTyxFQUFFO29CQUNSLFlBQVk7aUJBQ1o7Z0JBQ0QsWUFBWSxFQUFFO29CQUNiLGlCQUFpQjtvQkFDakIsOEJBQThCO2lCQUM5QjtnQkFDRCxPQUFPLEVBQUU7b0JBQ1IsaUJBQWlCO2lCQUNqQjthQUNEOztBQUdELG9DQUFjLG9DQUFvQyxDQUFBO0FBQ2xELGtDQUFjLGtDQUFrQyxDQUFBOztBQUVoRCxnQ0FBYyw2QkFBNkIsQ0FBQTtBQUMzQyxpQ0FBYyw4QkFBOEIsQ0FBQTtBQUM1QyxvQ0FBYyw4Q0FBOEMsQ0FBQTtBQUM1RCxlQUFjLGlEQUFpRCxDQUFBO0FBQy9ELGdEQUFjLDZDQUE2QyxDQUFBO0FBQzNELCtCQUFjLDRCQUE0QixDQUFBO0FBQzFDLHFDQUFjLGtCQUFrQixDQUFBO0FBQ2hDLGVBQWMsbUNBQW1DLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBhbmd1bGFyIGRlcGVuZGVuY2llc1xyXG5pbXBvcnQge0NvbW1vbk1vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJ1xyXG5pbXBvcnQge05nTW9kdWxlfSBmcm9tICdAYW5ndWxhci9jb3JlJ1xyXG5cclxuaW1wb3J0IHtDb21wb25lbnRJbmplY3Rvcn0gZnJvbSAnLi9jb21wb25lbnRzL2NvbXBvbmVudEluamVjdG9yL2NvbXBvbmVudEluamVjdG9yLmNvbXBvbmVudCdcclxuaW1wb3J0IHtDb21wb25lbnRJbmplY3RvckFyZWFEaXJlY3RpdmV9IGZyb20gJy4vY29tcG9uZW50cy9jb21wb25lbnRJbmplY3Rvci9jb21wb25lbnRJbmplY3Rvci5kaXJlY3RpdmUnXHJcblxyXG5cclxuQE5nTW9kdWxlKHtcclxuXHRpbXBvcnRzOiBbXHJcblx0XHRDb21tb25Nb2R1bGVcclxuXHRdLFxyXG5cdGRlY2xhcmF0aW9uczogW1xyXG5cdFx0Q29tcG9uZW50SW5qZWN0b3IsXHJcblx0XHRDb21wb25lbnRJbmplY3RvckFyZWFEaXJlY3RpdmVcclxuXHRdLFxyXG5cdGV4cG9ydHM6IFtcclxuXHRcdENvbXBvbmVudEluamVjdG9yXHJcblx0XVxyXG59KVxyXG5leHBvcnQgY2xhc3MgUmFtc3RlclVJQ29yZU1vZHVsZSB7fVxyXG5cclxuZXhwb3J0ICogZnJvbSAnLi9jb21wb25lbnRzL2Jhc2UtbGF5b3V0LmNvbXBvbmVudCdcclxuZXhwb3J0ICogZnJvbSAnLi9jb21wb25lbnRzL2Jhc2UtcGFnZS5jb21wb25lbnQnXHJcbi8vIGV4cG9ydCB7Q29tcG9uZW50SW5qZWN0b3J9XHJcbmV4cG9ydCAqIGZyb20gJy4vc2VydmljZXMvYmFzZVJFU1Quc2VydmljZSdcclxuZXhwb3J0ICogZnJvbSAnLi9zZXJ2aWNlcy9maWxlc1JFU1Quc2VydmljZSdcclxuZXhwb3J0ICogZnJvbSAnLi9zZXJ2aWNlcy9nbG9iYWxFdmVudHMvZ2xvYmFsRXZlbnRzLnNlcnZpY2UnXHJcbmV4cG9ydCAqIGZyb20gJy4vc2VydmljZXMvZ2xvYmFsRXZlbnRzL2dsb2JhbEV2ZW50cy5pbnRlcmZhY2VzJ1xyXG5leHBvcnQgKiBmcm9tICcuL3NlcnZpY2VzL21vZGVsUkVTVFNlcnZpY2VQcm92aWRlci5zZXJ2aWNlJ1xyXG5leHBvcnQgKiBmcm9tICcuL3NlcnZpY2VzL3JlcXVlc3Quc2VydmljZSdcclxuZXhwb3J0ICogZnJvbSAnLi91dGlscy90b29sYmVsdCdcclxuZXhwb3J0ICogZnJvbSAnLi9pbnRlcmZhY2VzL3NlbGVjdExpc3QuaW50ZXJmYWNlJ1xyXG4iXX0=