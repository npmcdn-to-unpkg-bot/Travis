/**
 * Created by Arash on 20-May-16.
 */
// Imports for loading & configuring the in-memory web api
var core_1 = require('@angular/core');
// The usual bootstrapping imports
var platform_browser_dynamic_1 = require('@angular/platform-browser-dynamic');
var http_1 = require('@angular/http');
var common_1 = require("@angular/common");
var common_2 = require('@angular/common');
var window_service_1 = require('./window.service');
var auth_service_1 = require('./auth.service');
require('rxjs/add/operator/map');
var app_component_1 = require('./app.component');
platform_browser_dynamic_1.bootstrap(app_component_1.AppComponent, [
    http_1.HTTP_PROVIDERS,
    auth_service_1.AuthService,
    window_service_1.WindowService,
    common_2.COMMON_DIRECTIVES,
    core_1.provide(common_1.LocationStrategy, { useClass: common_1.HashLocationStrategy }),
]);
//# sourceMappingURL=main.js.map