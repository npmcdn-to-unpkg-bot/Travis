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
var core_1 = require('@angular/core');
var router_deprecated_1 = require('@angular/router-deprecated');
var navbar_component_1 = require('./navbar.component');
var auth_service_1 = require('./auth.service');
var LoginComponent = (function () {
    function LoginComponent(_router, authService) {
        this._router = _router;
        this.authService = authService;
        this.fb = FB;
    }
    Object.defineProperty(LoginComponent.prototype, "authenticated", {
        get: function () {
            return this.authService.isAuthenticated();
        },
        enumerable: true,
        configurable: true
    });
    LoginComponent.prototype.facebookLogin = function () {
        var a_Service = this.authService;
        var temp_facebook_obj = {};
        FB.login(function (response) {
            if (response.status === 'connected') {
                console.log(response.authResponse.accessToken);
                FB.api('/me', { fields: "id,first_name,last_name ,picture,gender,birthday" }, function (response) {
                    try {
                        var facebook_response = JSON.stringify(response);
                        console.log(facebook_response);
                        temp_facebook_obj['auth_type'] = 'facebook';
                        temp_facebook_obj['id'] = response['id'];
                        temp_facebook_obj['picture'] = response['picture']['data']['url'];
                        temp_facebook_obj['gender'] = response['gender'];
                        temp_facebook_obj['first_name'] = response['first_name'];
                        temp_facebook_obj['last_name'] = response['last_name'];
                        console.log(temp_facebook_obj);
                        a_Service.socialLogin(temp_facebook_obj);
                    }
                    catch (err) {
                        console.log(err);
                        if (!temp_facebook_obj['id'])
                            alert('Facebook authentication failed! try again');
                        else
                            a_Service.socialLogin(temp_facebook_obj);
                    }
                });
            }
            else if (response.status === 'not_authorized') {
                // The person is logged into Facebook, but not your app.
                alert('Facebook authentication failed! try again');
            }
            else {
                // The person is not logged into Facebook, so we're not sure if
                // they are logged into this app or not.
                alert("you are not logged in");
            }
        });
    };
    LoginComponent.prototype.doLogin = function () {
        this.authService.doLogin();
    };
    LoginComponent.prototype.doLogout = function () {
        this.authService.doLogout();
    };
    Object.defineProperty(LoginComponent.prototype, "userName", {
        get: function () {
            return this.authService.getUserName();
        },
        enumerable: true,
        configurable: true
    });
    LoginComponent = __decorate([
        core_1.Component({
            selector: 'login',
            templateUrl: 'app/login.component.html',
            styleUrls: ['app/login.component.css'],
            directives: [navbar_component_1.Navbar]
        }), 
        __metadata('design:paramtypes', [router_deprecated_1.Router, auth_service_1.AuthService])
    ], LoginComponent);
    return LoginComponent;
}());
exports.LoginComponent = LoginComponent;
//# sourceMappingURL=login.component.js.map