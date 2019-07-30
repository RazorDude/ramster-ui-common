/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
// angular dependencies
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ComponentInjector } from './components/componentInjector/componentInjector.component';
import { ComponentInjectorAreaDirective } from './components/componentInjector/componentInjector.directive';
var RamsterUICoreModule = /** @class */ (function () {
    function RamsterUICoreModule() {
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
    return RamsterUICoreModule;
}());
export { RamsterUICoreModule };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290Ijoibmc6Ly9yYW1zdGVyLXVpLWNvcmUvIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUNBLE9BQU8sRUFBQyxZQUFZLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQTtBQUM1QyxPQUFPLEVBQUMsUUFBUSxFQUFDLE1BQU0sZUFBZSxDQUFBO0FBRXRDLE9BQU8sRUFBQyxpQkFBaUIsRUFBQyxNQUFNLDREQUE0RCxDQUFBO0FBQzVGLE9BQU8sRUFBQyw4QkFBOEIsRUFBQyxNQUFNLDREQUE0RCxDQUFBO0FBR3pHO0lBQUE7SUFZa0MsQ0FBQzs7Z0JBWmxDLFFBQVEsU0FBQztvQkFDVCxPQUFPLEVBQUU7d0JBQ1IsWUFBWTtxQkFDWjtvQkFDRCxZQUFZLEVBQUU7d0JBQ2IsaUJBQWlCO3dCQUNqQiw4QkFBOEI7cUJBQzlCO29CQUNELE9BQU8sRUFBRTt3QkFDUixpQkFBaUI7cUJBQ2pCO2lCQUNEOztJQUNpQywwQkFBQztDQUFBLEFBWm5DLElBWW1DO1NBQXRCLG1CQUFtQjtBQUVoQyxvQ0FBYyxvQ0FBb0MsQ0FBQTtBQUNsRCxrQ0FBYyxrQ0FBa0MsQ0FBQTs7QUFFaEQsZ0NBQWMsNkJBQTZCLENBQUE7QUFDM0MsaUNBQWMsOEJBQThCLENBQUE7QUFDNUMsb0NBQWMsOENBQThDLENBQUE7QUFDNUQsZUFBYyxpREFBaUQsQ0FBQTtBQUMvRCxnREFBYyw2Q0FBNkMsQ0FBQTtBQUMzRCwrQkFBYyw0QkFBNEIsQ0FBQTtBQUMxQyxxQ0FBYyxrQkFBa0IsQ0FBQTtBQUNoQyxlQUFjLG1DQUFtQyxDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiLy8gYW5ndWxhciBkZXBlbmRlbmNpZXNcclxuaW1wb3J0IHtDb21tb25Nb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbidcclxuaW1wb3J0IHtOZ01vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvY29yZSdcclxuXHJcbmltcG9ydCB7Q29tcG9uZW50SW5qZWN0b3J9IGZyb20gJy4vY29tcG9uZW50cy9jb21wb25lbnRJbmplY3Rvci9jb21wb25lbnRJbmplY3Rvci5jb21wb25lbnQnXHJcbmltcG9ydCB7Q29tcG9uZW50SW5qZWN0b3JBcmVhRGlyZWN0aXZlfSBmcm9tICcuL2NvbXBvbmVudHMvY29tcG9uZW50SW5qZWN0b3IvY29tcG9uZW50SW5qZWN0b3IuZGlyZWN0aXZlJ1xyXG5cclxuXHJcbkBOZ01vZHVsZSh7XHJcblx0aW1wb3J0czogW1xyXG5cdFx0Q29tbW9uTW9kdWxlXHJcblx0XSxcclxuXHRkZWNsYXJhdGlvbnM6IFtcclxuXHRcdENvbXBvbmVudEluamVjdG9yLFxyXG5cdFx0Q29tcG9uZW50SW5qZWN0b3JBcmVhRGlyZWN0aXZlXHJcblx0XSxcclxuXHRleHBvcnRzOiBbXHJcblx0XHRDb21wb25lbnRJbmplY3RvclxyXG5cdF1cclxufSlcclxuZXhwb3J0IGNsYXNzIFJhbXN0ZXJVSUNvcmVNb2R1bGUge31cclxuXHJcbmV4cG9ydCAqIGZyb20gJy4vY29tcG9uZW50cy9iYXNlLWxheW91dC5jb21wb25lbnQnXHJcbmV4cG9ydCAqIGZyb20gJy4vY29tcG9uZW50cy9iYXNlLXBhZ2UuY29tcG9uZW50J1xyXG4vLyBleHBvcnQge0NvbXBvbmVudEluamVjdG9yfVxyXG5leHBvcnQgKiBmcm9tICcuL3NlcnZpY2VzL2Jhc2VSRVNULnNlcnZpY2UnXHJcbmV4cG9ydCAqIGZyb20gJy4vc2VydmljZXMvZmlsZXNSRVNULnNlcnZpY2UnXHJcbmV4cG9ydCAqIGZyb20gJy4vc2VydmljZXMvZ2xvYmFsRXZlbnRzL2dsb2JhbEV2ZW50cy5zZXJ2aWNlJ1xyXG5leHBvcnQgKiBmcm9tICcuL3NlcnZpY2VzL2dsb2JhbEV2ZW50cy9nbG9iYWxFdmVudHMuaW50ZXJmYWNlcydcclxuZXhwb3J0ICogZnJvbSAnLi9zZXJ2aWNlcy9tb2RlbFJFU1RTZXJ2aWNlUHJvdmlkZXIuc2VydmljZSdcclxuZXhwb3J0ICogZnJvbSAnLi9zZXJ2aWNlcy9yZXF1ZXN0LnNlcnZpY2UnXHJcbmV4cG9ydCAqIGZyb20gJy4vdXRpbHMvdG9vbGJlbHQnXHJcbmV4cG9ydCAqIGZyb20gJy4vaW50ZXJmYWNlcy9zZWxlY3RMaXN0LmludGVyZmFjZSdcclxuIl19