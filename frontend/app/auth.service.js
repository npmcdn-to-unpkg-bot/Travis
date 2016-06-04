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
/*
 * Created with IntelliJ IDEA.
 * User: mfo
 * Date: 12/18/15
 * Time: 10:34 AM
 */
var core_1 = require("@angular/core");
var window_service_1 = require('./window.service');
var http_1 = require('@angular/http');
require('rxjs/Rx');
var auth_user_1 = require('./auth_user');
var router_deprecated_1 = require('@angular/router-deprecated');
var AuthService = (function () {
    function AuthService(windows, http, router) {
        this.windows = windows;
        this.http = http;
        this.router = router;
        this.oAuthTokenUrl = "https://accounts.google.com/o/oauth2/v2/auth?" +
            "scope=https://www.googleapis.com/auth/plus.me&" +
            "redirect_uri=http://localhost:3000&" +
            "response_type=token&client_id=393670407860-jmlf11bfh5eu404k5tuoi2lsok89uqqd.apps.googleusercontent.com" +
            "&prompt=consent&" +
            "include_granted_scopes=true";
        this.validationUrl = "https://www.googleapis.com/oauth2/v3/tokeninfo?access_token=";
        this.userInfoUrl = "https://www.googleapis.com/plus/v1/people/";
        this.facebookURL = "https://www.facebook.com/dialog/oauth?client_id=598800500273094&redirect_uri=" +
            "http://localhost:3000&response_type=token";
        //TODO server side facebook
        this.authenticated = false;
        this.intervalId = null;
        this.expires = 0;
        this.expiresTimerId = null;
        this.loopCount = 600;
        this.intervalLength = 1000;
        this.windowHandle = null;
        this.locationWatcher = new core_1.EventEmitter(); // @TODO: switch to RxJS Subject instead of EventEmitter
        this.oAuthCallbackUrl += "&nonce=" + "ThisIsAStringRandomString!";
    }
    AuthService.prototype.doLogin = function () {
        var _this = this;
        this.windowHandle = this.windows.createWindow(this.oAuthTokenUrl, 'OAuthLoginTravis');
        this.intervalId = setInterval(function () {
            setTimeout(function () {
                var href;
                try {
                    href = _this.windowHandle.location.href;
                }
                catch (e) {
                    console.log('Error:', e);
                    return;
                }
                if (href != null) {
                    clearInterval(_this.intervalId);
                    // got this code from google to extract token information
                    var params = {}, queryString = href.substring(1), regex = /([^&=]+)=([^&]*)/g, m;
                    while (m = regex.exec(queryString)) {
                        params[decodeURIComponent(m[1])] = decodeURIComponent(m[2]);
                    }
                    var key;
                    _this.user = new auth_user_1.GoogleUser();
                    for (key in params) {
                        if (key.indexOf('access_token') >= 0) {
                            console.log(params[key]);
                            _this.user.accessToken = params[key];
                            break;
                        }
                    }
                    if (_this.user.accessToken) {
                        _this.user.authenticated = true;
                        _this.authenticated = true;
                        var now = new Date();
                        // we dont need it if user has been registered with our platform
                        //just is needed to do a login
                        _this.user.expires = now.setSeconds(now.getSeconds() + Number(params['expires_in']));
                    }
                    _this.windowHandle.close();
                    _this.validateOAuthToken();
                }
            }, 500);
            //}
        }, this.intervalLength);
    };
    AuthService.prototype.doLogout = function () {
        this.user.authenticated = false;
        localStorage.removeItem('token_id');
        this.expiresTimerId = null;
        this.expires = 0;
        this.user.accessToken = null;
        //this.emitAuthStatus(true);
        console.log('Session has been cleared');
    };
    AuthService.prototype.validateOAuthToken = function () {
        var _this = this;
        var validationAccToken = this.validationUrl + this.user.accessToken;
        if (this.user.accessToken != null) {
            this.http.get(validationAccToken)
                .map(function (res) {
                // getting the id of the user
                _this.user.userId = res.json()['sub'];
                //TODO
                //query the database to get users info from ther
                //if there is none fetch necessary info from google
                // localstorage.setItem('token_id', 'Token from the server')
                _this.user.authenticated = true;
                _this.fetchUserInfo();
                // register the user?
            }).
                subscribe(function (response) {
                console.log(response);
            }, function (err) {
                console.log(err);
            });
        }
    };
    AuthService.prototype.fetchUserInfo = function () {
        var _this = this;
        if (this.user.accessToken != null) {
            var tempUrl = this.userInfoUrl + this.user.userId + "?access_token=" + this.user.accessToken;
            console.log(tempUrl);
            this.http.get(tempUrl)
                .map(function (res) {
                console.log(res);
                var google_user = res.json();
                console.log(google_user);
                _this.user.name = google_user['name'];
                _this.user.gender = google_user['gender'];
                _this.user.image = google_user['image']['url'];
                console.log("logging user in auth service");
                console.log(_this.user);
                console.log("redirecting user!!!!!");
                _this.router.navigate(['Home']);
            })
                .subscribe(function (info) {
            }, function (err) {
                console.error("Failed to fetch user info:", err);
            });
        }
    };
    AuthService.prototype.getUserInfo = function () {
        console.log("inside user info auth service");
        console.log(this.authenticated);
        console.log(this.user);
        if (this.user.authenticated)
            return Promise.resolve(this.user);
        else if (localStorage.getItem('token_id')) {
            var token = localStorage.getItem('token_id');
            return this.validateToken(token);
        }
        return null;
    };
    AuthService.prototype.getUserFromServer = function (token) {
        return null;
    };
    AuthService.prototype.isAuthenticated = function () {
        console.log("service inside isAuthenticated");
        console.log(this.user);
        if (this.user.authenticated)
            return true;
        else if (localStorage.getItem('token_id')) {
            var token = localStorage.getItem('token_id');
            return this.validateToken(token);
        }
        return false;
    };
    AuthService.prototype.validateToken = function (token) {
        return this.getUserFromServer(token);
    };
    AuthService.prototype.subscribe = function (onNext, onThrow, onReturn) {
        return this.locationWatcher.subscribe(onNext, onThrow, onReturn);
    };
    AuthService.prototype.emitAuthStatus = function (success) {
        this.locationWatcher.emit({ success: success, authenticated: this.user.authenticated,
            token: this.user.accessToken, expires: this.user.expires });
    };
    AuthService.prototype.socialLogin = function (socialObject) {
        console.log(socialObject);
    };
    AuthService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [window_service_1.WindowService, http_1.Http, router_deprecated_1.Router])
    ], AuthService);
    return AuthService;
}());
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map