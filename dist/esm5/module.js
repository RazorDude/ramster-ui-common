/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
'use strict';
// angular dependencies
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BaseLayoutComponent } from './components/base-layout.component';
import { BasePageComponent } from './components/base-page.component';
import { BaseRESTService } from './services/baseREST.service';
import { FilesRESTService } from './services/filesREST.service';
import { getNested, setNested } from './utils/toolbelt';
import { GlobalEventsService } from './services/globalEvents/globalEvents.service';
import { RequestService } from './services/request.service';
var RamsterUICoreModule = /** @class */ (function () {
    function RamsterUICoreModule() {
    }
    RamsterUICoreModule.decorators = [
        { type: NgModule, args: [{
                    imports: [
                        CommonModule
                    ]
                },] }
    ];
    return RamsterUICoreModule;
}());
export { BasePageComponent, BaseLayoutComponent, BaseRESTService, FilesRESTService, getNested, GlobalEventsService, RequestService, setNested };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vcmFtc3Rlci11aS1jb3JlLyIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxZQUFZLENBQUE7O0FBR1osT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLGlCQUFpQixDQUFBO0FBQzVDLE9BQU8sRUFBQyxRQUFRLEVBQUMsTUFBTSxlQUFlLENBQUE7QUFFdEMsT0FBTyxFQUFDLG1CQUFtQixFQUFDLE1BQU0sb0NBQW9DLENBQUE7QUFDdEUsT0FBTyxFQUFDLGlCQUFpQixFQUFDLE1BQU0sa0NBQWtDLENBQUE7QUFDbEUsT0FBTyxFQUFDLGVBQWUsRUFBQyxNQUFNLDZCQUE2QixDQUFBO0FBQzNELE9BQU8sRUFBQyxnQkFBZ0IsRUFBQyxNQUFNLDhCQUE4QixDQUFBO0FBQzdELE9BQU8sRUFBQyxTQUFTLEVBQUUsU0FBUyxFQUFDLE1BQU0sa0JBQWtCLENBQUE7QUFDckQsT0FBTyxFQUFDLG1CQUFtQixFQUFDLE1BQU0sOENBQThDLENBQUE7QUFDaEYsT0FBTyxFQUFDLGNBQWMsRUFBQyxNQUFNLDRCQUE0QixDQUFBO0FBR3pEO0lBQUE7SUFLMkIsQ0FBQzs7Z0JBTDNCLFFBQVEsU0FBQztvQkFDVCxPQUFPLEVBQUU7d0JBQ1IsWUFBWTtxQkFDWjtpQkFDRDs7SUFDMEIsMEJBQUM7Q0FBQSxBQUw1QixJQUs0QjtBQUU1QixPQUFPLEVBQUMsaUJBQWlCLEVBQUUsbUJBQW1CLEVBQUUsZUFBZSxFQUFFLGdCQUFnQixFQUFFLFNBQVMsRUFBRSxtQkFBbUIsRUFBRSxjQUFjLEVBQXVCLFNBQVMsRUFBQyxDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnXHJcblxyXG4vLyBhbmd1bGFyIGRlcGVuZGVuY2llc1xyXG5pbXBvcnQge0NvbW1vbk1vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJ1xyXG5pbXBvcnQge05nTW9kdWxlfSBmcm9tICdAYW5ndWxhci9jb3JlJ1xyXG5cclxuaW1wb3J0IHtCYXNlTGF5b3V0Q29tcG9uZW50fSBmcm9tICcuL2NvbXBvbmVudHMvYmFzZS1sYXlvdXQuY29tcG9uZW50J1xyXG5pbXBvcnQge0Jhc2VQYWdlQ29tcG9uZW50fSBmcm9tICcuL2NvbXBvbmVudHMvYmFzZS1wYWdlLmNvbXBvbmVudCdcclxuaW1wb3J0IHtCYXNlUkVTVFNlcnZpY2V9IGZyb20gJy4vc2VydmljZXMvYmFzZVJFU1Quc2VydmljZSdcclxuaW1wb3J0IHtGaWxlc1JFU1RTZXJ2aWNlfSBmcm9tICcuL3NlcnZpY2VzL2ZpbGVzUkVTVC5zZXJ2aWNlJ1xyXG5pbXBvcnQge2dldE5lc3RlZCwgc2V0TmVzdGVkfSBmcm9tICcuL3V0aWxzL3Rvb2xiZWx0J1xyXG5pbXBvcnQge0dsb2JhbEV2ZW50c1NlcnZpY2V9IGZyb20gJy4vc2VydmljZXMvZ2xvYmFsRXZlbnRzL2dsb2JhbEV2ZW50cy5zZXJ2aWNlJ1xyXG5pbXBvcnQge1JlcXVlc3RTZXJ2aWNlfSBmcm9tICcuL3NlcnZpY2VzL3JlcXVlc3Quc2VydmljZSdcclxuaW1wb3J0IHtTZWxlY3RMaXN0SW50ZXJmYWNlfSBmcm9tICcuL2ludGVyZmFjZXMvc2VsZWN0TGlzdC5pbnRlcmZhY2UnXHJcblxyXG5ATmdNb2R1bGUoe1xyXG5cdGltcG9ydHM6IFtcclxuXHRcdENvbW1vbk1vZHVsZVxyXG5cdF1cclxufSlcclxuY2xhc3MgUmFtc3RlclVJQ29yZU1vZHVsZSB7fVxyXG5cclxuZXhwb3J0IHtCYXNlUGFnZUNvbXBvbmVudCwgQmFzZUxheW91dENvbXBvbmVudCwgQmFzZVJFU1RTZXJ2aWNlLCBGaWxlc1JFU1RTZXJ2aWNlLCBnZXROZXN0ZWQsIEdsb2JhbEV2ZW50c1NlcnZpY2UsIFJlcXVlc3RTZXJ2aWNlLCBTZWxlY3RMaXN0SW50ZXJmYWNlLCBzZXROZXN0ZWR9XHJcbiJdfQ==