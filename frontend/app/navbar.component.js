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
var auth_user_1 = require("./auth_user");
var Navbar = (function () {
    function Navbar(location, router, authService) {
        var _this = this;
        this.location = location;
        this.router = router;
        this.authService = authService;
        //this.newUser = authService.authMsg;
        this._subscription = authService.authChange.subscribe(function (value) {
            var tempUser = value;
            console.log("notified!");
            console.log(value);
            _this.user = new auth_user_1.TravisUser();
            _this.user.firstName = tempUser.firstName;
            _this.user.imageURL = tempUser.imageURL;
            _this.authenticated();
        });
    }
    Navbar.prototype.authenticated = function () {
        return this.authService.isAuthenticated();
    };
    Navbar.prototype.logout = function () {
        this.authService.doLogout();
    };
    Navbar.prototype.ngOnInit = function () {
        console.log("OnInit");
        if (this.authenticated())
            this.getUserInfo();
    };
    Navbar.prototype.getUserInfo = function () {
        var _this = this;
        console.log("calling get user info from navbar");
        this.authService.getUserInfo().then(function (user) {
            console.log("Then getting user from service");
            _this.user = user;
            console.log(_this.user);
        });
    };
    Navbar = __decorate([
        core_1.Component({
            selector: 'header',
            directives: [router_deprecated_1.ROUTER_DIRECTIVES, login_component_1.LoginComponent],
            pipes: [],
            templateUrl: 'app/navbar.component.html',
        }), 
        __metadata('design:paramtypes', [common_1.Location, router_deprecated_1.Router, auth_service_1.AuthService])
    ], Navbar);
    return Navbar;
}());
exports.Navbar = Navbar;
//# sourceMappingURL=navbar.component.js.map