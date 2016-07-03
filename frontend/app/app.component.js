var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var router_deprecated_1 = require('@angular/router-deprecated');
var navbar_component_1 = require("./navbar.component");
var poll_component_1 = require("./poll/poll.component");
var home_component_1 = require("./home.component");
var trip_component_1 = require("./trip/trip.component");
var search_component_1 = require("./search/search.component");
var loggedInOutLet_1 = require('./loggedInOutLet');
var AppComponent = (function () {
    function AppComponent(viewContainerRef) {
        // Need in order to catch application root view container ref
        this.viewContainerRef = viewContainerRef;
    }
    AppComponent = __decorate([
        core_1.Component({
            selector: 'travis',
            template: "\n    <header></header>\n    <router-outlet></router-outlet>\n  ",
            providers: [router_deprecated_1.ROUTER_PROVIDERS,],
            styleUrls: ['app/app.component.css'],
            directives: [loggedInOutLet_1.LoggedInRouterOutlet, navbar_component_1.Navbar],
        }),
        router_deprecated_1.RouteConfig([
            { path: '/', name: 'Home', component: home_component_1.HomeComponent, useAsDefault: true },
            { path: '/trip', name: 'Trip', component: trip_component_1.TripComponent },
            { path: '/poll', name: 'Poll', component: poll_component_1.PollComponent },
            { path: '/search/:searchTerm', name: 'Search', component: search_component_1.SearchComponent },
            { path: '/search', name: 'Search', component: search_component_1.SearchComponent }
        ]), 
        __metadata('design:paramtypes', [core_1.ViewContainerRef])
    ], AppComponent);
    return AppComponent;
})();
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map