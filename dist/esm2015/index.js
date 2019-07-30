/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
// angular dependencies
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ComponentInjector, ComponentInjectorAreaDirective } from './components/componentInjector';
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
                    ComponentInjector,
                    ComponentInjectorAreaDirective
                ]
            },] }
];
export { BaseLayoutComponent } from './components/base-layout.component';
export { BasePageComponent } from './components/base-page.component';
export { ComponentInjector, ComponentInjectorAreaDirective } from './components/componentInjector';
export { BaseRESTService } from './services/baseREST.service';
export { FilesRESTService } from './services/filesREST.service';
export { GlobalEventsService } from './services/globalEvents/globalEvents.service';
export {} from './services/globalEvents/globalEvents.interfaces';
export { ModelRESTServiceProviderService } from './services/modelRESTServiceProvider.service';
export { RequestService } from './services/request.service';
export { getNested, setNested } from './utils/toolbelt';
export {} from './interfaces/selectList.interface';
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290Ijoibmc6Ly9yYW1zdGVyLXVpLWNvcmUvIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUNBLE9BQU8sRUFBQyxZQUFZLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQTtBQUM1QyxPQUFPLEVBQUMsUUFBUSxFQUFDLE1BQU0sZUFBZSxDQUFBO0FBRXRDLE9BQU8sRUFBQyxpQkFBaUIsRUFBRSw4QkFBOEIsRUFBQyxNQUFNLGdDQUFnQyxDQUFBO0FBZ0JoRyxNQUFNLE9BQU8sbUJBQW1COzs7WUFiL0IsUUFBUSxTQUFDO2dCQUNULE9BQU8sRUFBRTtvQkFDUixZQUFZO2lCQUNaO2dCQUNELFlBQVksRUFBRTtvQkFDYixpQkFBaUI7b0JBQ2pCLDhCQUE4QjtpQkFDOUI7Z0JBQ0QsT0FBTyxFQUFFO29CQUNSLGlCQUFpQjtvQkFDakIsOEJBQThCO2lCQUM5QjthQUNEOztBQUdELG9DQUFjLG9DQUFvQyxDQUFBO0FBQ2xELGtDQUFjLGtDQUFrQyxDQUFBO0FBQ2hELGtFQUFjLGdDQUFnQyxDQUFBO0FBQzlDLGdDQUFjLDZCQUE2QixDQUFBO0FBQzNDLGlDQUFjLDhCQUE4QixDQUFBO0FBQzVDLG9DQUFjLDhDQUE4QyxDQUFBO0FBQzVELGVBQWMsaURBQWlELENBQUE7QUFDL0QsZ0RBQWMsNkNBQTZDLENBQUE7QUFDM0QsK0JBQWMsNEJBQTRCLENBQUE7QUFDMUMscUNBQWMsa0JBQWtCLENBQUE7QUFDaEMsZUFBYyxtQ0FBbUMsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbIi8vIGFuZ3VsYXIgZGVwZW5kZW5jaWVzXHJcbmltcG9ydCB7Q29tbW9uTW9kdWxlfSBmcm9tICdAYW5ndWxhci9jb21tb24nXHJcbmltcG9ydCB7TmdNb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnXHJcblxyXG5pbXBvcnQge0NvbXBvbmVudEluamVjdG9yLCBDb21wb25lbnRJbmplY3RvckFyZWFEaXJlY3RpdmV9IGZyb20gJy4vY29tcG9uZW50cy9jb21wb25lbnRJbmplY3RvcidcclxuXHJcblxyXG5ATmdNb2R1bGUoe1xyXG5cdGltcG9ydHM6IFtcclxuXHRcdENvbW1vbk1vZHVsZVxyXG5cdF0sXHJcblx0ZGVjbGFyYXRpb25zOiBbXHJcblx0XHRDb21wb25lbnRJbmplY3RvcixcclxuXHRcdENvbXBvbmVudEluamVjdG9yQXJlYURpcmVjdGl2ZVxyXG5cdF0sXHJcblx0ZXhwb3J0czogW1xyXG5cdFx0Q29tcG9uZW50SW5qZWN0b3IsXHJcblx0XHRDb21wb25lbnRJbmplY3RvckFyZWFEaXJlY3RpdmVcclxuXHRdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBSYW1zdGVyVUlDb3JlTW9kdWxlIHt9XHJcblxyXG5leHBvcnQgKiBmcm9tICcuL2NvbXBvbmVudHMvYmFzZS1sYXlvdXQuY29tcG9uZW50J1xyXG5leHBvcnQgKiBmcm9tICcuL2NvbXBvbmVudHMvYmFzZS1wYWdlLmNvbXBvbmVudCdcclxuZXhwb3J0ICogZnJvbSAnLi9jb21wb25lbnRzL2NvbXBvbmVudEluamVjdG9yJ1xyXG5leHBvcnQgKiBmcm9tICcuL3NlcnZpY2VzL2Jhc2VSRVNULnNlcnZpY2UnXHJcbmV4cG9ydCAqIGZyb20gJy4vc2VydmljZXMvZmlsZXNSRVNULnNlcnZpY2UnXHJcbmV4cG9ydCAqIGZyb20gJy4vc2VydmljZXMvZ2xvYmFsRXZlbnRzL2dsb2JhbEV2ZW50cy5zZXJ2aWNlJ1xyXG5leHBvcnQgKiBmcm9tICcuL3NlcnZpY2VzL2dsb2JhbEV2ZW50cy9nbG9iYWxFdmVudHMuaW50ZXJmYWNlcydcclxuZXhwb3J0ICogZnJvbSAnLi9zZXJ2aWNlcy9tb2RlbFJFU1RTZXJ2aWNlUHJvdmlkZXIuc2VydmljZSdcclxuZXhwb3J0ICogZnJvbSAnLi9zZXJ2aWNlcy9yZXF1ZXN0LnNlcnZpY2UnXHJcbmV4cG9ydCAqIGZyb20gJy4vdXRpbHMvdG9vbGJlbHQnXHJcbmV4cG9ydCAqIGZyb20gJy4vaW50ZXJmYWNlcy9zZWxlY3RMaXN0LmludGVyZmFjZSdcclxuIl19