"use strict";
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
//These first 3 lines will be deprecated by the final release
var core_1 = require("@angular/core");
var router_deprecated_1 = require("@angular/router-deprecated");
var common_1 = require("@angular/common");
var auth_service_1 = require('./auth.service');
var login_component_1 = require('./login.component');
var Navbar = (function () {
    function Navbar(location, router, authService) {
        this.location = location;
        this.router = router;
        this.authService = authService;
    }
    Navbar.prototype.authenticated = function () {
        return this.authService.isAuthenticated();
    };
    Navbar.prototype.ngOnInit = function () {
        console.log("OnInit");
        if (this.authenticated())
            this.getUserInfo();
    };
    Navbar.prototype.getUserInfo = function () {
        var _this = this;
        var user = this.authService.getUserInfo().then(function (user) { return _this.user = user; });
        console.log("inside navbar " + user);
        this.user = { "image": user.image, "name": user.name };
    };
    Navbar = __decorate([
        core_1.Component({
            selector: 'header',
            directives: [router_deprecated_1.ROUTER_DIRECTIVES, login_component_1.LoginComponent],
            providers: [],
            pipes: [],
            templateUrl: 'app/navbar.component.html',
        }), 
        __metadata('design:paramtypes', [common_1.Location, router_deprecated_1.Router, auth_service_1.AuthService])
    ], Navbar);
    return Navbar;
}());
exports.Navbar = Navbar;
//# sourceMappingURL=navbar.component.js.map