var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
/**
 * Created by Arash on 25-May-16.
 */
/*
 * Created with IntelliJ IDEA.
 * User: mfo
 * Date: 12/18/15
 * Time: 9:55 AM
 */
var core_1 = require("@angular/core");
var auth_service_1 = require('./auth.service');
var router_deprecated_1 = require("@angular/router-deprecated");
var common_1 = require("@angular/common");
var navbar_component_1 = require('./navbar.component');
var LoggedoutPage = (function () {
    function LoggedoutPage(authService, router, location) {
        var _this = this;
        this.authService = authService;
        this.router = router;
        this.location = location;
        this.sub = null;
        if (authService.isAuthenticated()) {
            this.location.replaceState('/');
            this.router.navigate(['PublicPage']);
        }
        this.sub = this.authService.subscribe(function (val) {
            if (val.authenticated) {
                _this.location.replaceState('/');
                _this.router.navigate(['PublicPage']);
            }
        });
    }
    LoggedoutPage.prototype.ngOnDestroy = function () {
        if (this.sub != null) {
            this.sub.unsubscribe();
        }
    };
    LoggedoutPage = __decorate([
        core_1.Component({
            selector: 'loggedout-page',
            directives: [navbar_component_1.Navbar],
            pipes: [],
            providers: [],
            template: "\n<div class=\"pos-f-t\">\n    <navbar></navbar>\n</div>\n<div><h2>You have been logged out.</h2></div>\n"
        }), 
        __metadata('design:paramtypes', [auth_service_1.AuthService, router_deprecated_1.Router, common_1.Location])
    ], LoggedoutPage);
    return LoggedoutPage;
})();
exports.LoggedoutPage = LoggedoutPage;
//# sourceMappingURL=logged-out.component.js.map