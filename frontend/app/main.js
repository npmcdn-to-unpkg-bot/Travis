"use strict";
/**
 * Created by Arash on 20-May-16.
 */
// Imports for loading & configuring the in-memory web api
var core_1 = require('@angular/core');
var router_deprecated_1 = require('@angular/router-deprecated');
// The usual bootstrapping imports
var platform_browser_dynamic_1 = require('@angular/platform-browser-dynamic');
var http_1 = require('@angular/http');
var common_1 = require("@angular/common");
var common_2 = require('@angular/common');
var window_service_1 = require('./window.service');
var auth_service_1 = require('./auth.service');
require('rxjs/add/operator/map');
var app_component_1 = require('./app.component');
var poll_service_1 = require("./poll/poll.service");
//enableProdMode();
var trip_service_1 = require("./trip/trip.service");
var ng2_toastr_1 = require('ng2-toastr/ng2-toastr');
var ng2_toastr_2 = require("ng2-toastr/ng2-toastr");
var toastOptions = {
    toastLife: 4000,
    positionClass: 'toast-top-center',
};
platform_browser_dynamic_1.bootstrap(app_component_1.AppComponent, [
    http_1.HTTP_PROVIDERS,
    router_deprecated_1.ROUTER_PROVIDERS,
    auth_service_1.AuthService,
    poll_service_1.PollService,
    trip_service_1.TripService,
    window_service_1.WindowService,
    common_2.COMMON_DIRECTIVES,
    ng2_toastr_1.ToastsManager,
    core_1.provide(common_1.LocationStrategy, { useClass: common_1.PathLocationStrategy }),
    core_1.provide(ng2_toastr_2.ToastOptions, { useValue: new ng2_toastr_2.ToastOptions(toastOptions) })
]);
//# sourceMappingURL=main.js.map