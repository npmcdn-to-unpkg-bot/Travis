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
var common_1 = require('@angular/common');
var auth_service_1 = require('./auth.service');
var ng2_bootstrap_1 = require('ng2-bootstrap/ng2-bootstrap');
var RegForm = (function () {
    function RegForm() {
    }
    return RegForm;
}());
exports.RegForm = RegForm;
var LoginForm = (function () {
    function LoginForm() {
    }
    return LoginForm;
}());
exports.LoginForm = LoginForm;
var LoginComponent = (function () {
    function LoginComponent(_router, authService, formBuilder) {
        this._router = _router;
        this.authService = authService;
        this.disabled = false;
        this.status = { isopen: false };
        this.fb = FB;
        this.loginModel = new LoginForm();
        this.regModel = new RegForm();
        this.regForm = formBuilder.group({
            regFName: ['', common_1.Validators.required],
            regLName: ['', common_1.Validators.required],
            regEmail: ['', common_1.Validators.compose([common_1.Validators.required,
                    common_1.Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$")
                ])],
            matchingPassword: formBuilder.group({
                password: ['', common_1.Validators.required],
                confirmPassword: ['', common_1.Validators.required]
            }, { validator: this.matchPassword })
        });
    }
    LoginComponent.prototype.matchPassword = function (group) {
        var password = group.controls.password;
        var confirm = group.controls.confirmPassword;
        // Don't kick in until user touches both fields
        if (password.pristine || confirm.pristine) {
            return null;
        }
        // Mark group as touched so we can add invalid class easily
        group.markAsTouched();
        if (password.value === confirm.value) {
            return null;
        }
        return {
            isValid: false
        };
    };
    LoginComponent.prototype.onSubmit = function () {
        this.submitted = true;
        var socialObj = {};
        socialObj['imageURL'] = "/UI/assets/images/user.jpg";
        socialObj['lastName'] = this.regModel.lastName;
        socialObj['firstName'] = this.regModel.firstName;
        socialObj['email'] = this.regModel.email;
        socialObj['password'] = this.regModel.password;
        socialObj['country'] = this.regModel.country;
        socialObj['type'] = "Travis";
        socialObj['birthDate'] = this.regModel.birthDate;
        this.authService.postUserToServer(socialObj);
    };
    LoginComponent.prototype.toggled = function (open) {
        console.log('Dropdown is now: ', open);
    };
    LoginComponent.prototype.toggleDropdown = function ($event) {
        $event.preventDefault();
        $event.stopPropagation();
        console.log($event);
        var element = $event.target;
        console.log("TAG NAME");
        console.log(element.tagName);
        if (element.tagName == "INPUT") {
            $event.preventDefault();
            $event.stopPropagation();
            return true;
        }
        this.status.isopen = !this.status.isopen;
    };
    Object.defineProperty(LoginComponent.prototype, "authenticated", {
        get: function () {
            return this.authService.isAuthenticated();
        },
        enumerable: true,
        configurable: true
    });
    LoginComponent.prototype.facebookLogin = function () {
        var a_router = this._router;
        var a_Service = this.authService;
        var temp_facebook_obj = {};
        FB.getLoginStatus(function (response) {
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
            }
            else {
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
            }
        });
    };
    LoginComponent.prototype.doLogin = function () {
        console.log("login is called");
        this.authService.doLogin();
    };
    LoginComponent.prototype.doLogout = function () {
        this.authService.doLogout();
    };
    Object.defineProperty(LoginComponent.prototype, "userName", {
        get: function () {
            return this.authService.getUserInfo();
        },
        enumerable: true,
        configurable: true
    });
    LoginComponent = __decorate([
        core_1.Component({
            selector: 'login',
            viewProviders: [ng2_bootstrap_1.BS_VIEW_PROVIDERS],
            directives: [ng2_bootstrap_1.DROPDOWN_DIRECTIVES, ng2_bootstrap_1.MODAL_DIRECTVES],
            templateUrl: 'app/login.component.html',
            styleUrls: ['app/login.component.css']
        }), 
        __metadata('design:paramtypes', [router_deprecated_1.Router, auth_service_1.AuthService, common_1.FormBuilder])
    ], LoginComponent);
    return LoginComponent;
}());
exports.LoginComponent = LoginComponent;
//# sourceMappingURL=login.component.js.map