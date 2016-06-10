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
var Subject_1 = require('rxjs/Subject');
require('rxjs/add/operator/map');
var auth_user_1 = require('./auth_user');
var router_deprecated_1 = require('@angular/router-deprecated');
var AuthService = (function () {
    function AuthService(windows, http, router) {
        this.windows = windows;
        this.http = http;
        this.router = router;
        this.googleOAuthTokenUrl = "https://accounts.google.com/o/oauth2/v2/auth?" +
            "scope=https://www.googleapis.com/auth/plus.me " +
            "https://www.googleapis.com/auth/userinfo.email&" +
            "redirect_uri=http://localhost:3000&" +
            "response_type=token&client_id=393670407860-jmlf11bfh5eu404k5tuoi2lsok89uqqd.apps.googleusercontent.com" +
            "&prompt=consent&" +
            "include_granted_scopes=true";
        this.GooglevalidationUrl = "https://www.googleapis.com/oauth2/v3/tokeninfo?access_token=";
        this.GoogleuserInfoUrl = "https://www.googleapis.com/plus/v1/people/";
        this.authenticated = false;
        this.user = new auth_user_1.TravisUser();
        this.intervalId = null;
        this.expires = 0;
        this.expiresTimerId = null;
        this.intervalLength = 1000;
        this.windowHandle = null;
        this.authChange = new Subject_1.Subject();
        console.log("service is created!");
        this.oAuthCallbackUrl += "&nonce=" + "ThisIsAStringRandomString!";
        this.authMsg = { 'image': '', 'name': '' };
    }
    AuthService.prototype.notify = function (name, image) {
        this.authMsg.name = name;
        this.authMsg.image = image;
        this.authChange.next(this.authMsg);
    };
    AuthService.prototype.getTokenFromGoogleURL = function (href) {
        var accessToken = null;
        // got this code from google to extract token information
        var params = {}, queryString = href.substring(1), regex = /([^&=]+)=([^&]*)/g, m;
        while (m = regex.exec(queryString)) {
            params[decodeURIComponent(m[1])] = decodeURIComponent(m[2]);
        }
        var key;
        for (key in params) {
            if (key.indexOf('access_token') >= 0) {
                console.log(params[key]);
                accessToken = params[key];
                break;
            }
        }
        return { accessToken: accessToken, expires: params['expires_in'] };
    };
    AuthService.prototype.GoogleLogin = function () {
        var _this = this;
        if (this.isAuthenticated()) {
            console.log("Already authenticated");
            return;
        }
        this.windowHandle = this.windows.createWindow(this.googleOAuthTokenUrl, 'OAuthLoginTravis');
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
                    var googleToken = _this.getTokenFromGoogleURL(href);
                    _this.user.accessToken = googleToken['accessToken'];
                    if (_this.user.accessToken) {
                        var now = new Date();
                        _this.user.expires = now.setSeconds(now.getSeconds() + Number(googleToken['expires_in']));
                        // validate the token
                        _this.googleValidateOAuthToken(_this.user.accessToken);
                    }
                    else {
                        console.warn(href);
                        alert("Google Auth failed! The token is empty");
                    }
                    _this.windowHandle.close();
                }
            }, 500);
            //}
        }, this.intervalLength);
    };
    AuthService.prototype.doLogout = function () {
        this.user.authenticated = false;
        sessionStorage.removeItem('user');
        localStorage.removeItem('token');
        this.authenticated = false;
        this.expiresTimerId = null;
        this.expires = 0;
        this.user.accessToken = null;
        console.log('Session has been cleared');
        window.location.reload();
    };
    AuthService.prototype.googleValidateOAuthToken = function (accessToken) {
        var _this = this;
        var validationAccToken = this.GooglevalidationUrl + accessToken;
        if (accessToken != null) {
            this.http.get(validationAccToken)
                .map(function (res) { return res.json()['sub']; }).subscribe(function (id) {
                console.log(id);
                _this.user.userId = id;
                _this.fetchGoogleUserInfo(_this.user.accessToken, _this.user.userId);
            }, function (err) {
                console.log(err);
                alert("Google authentication failed!");
            });
        }
    };
    AuthService.prototype.fetchGoogleUserInfo = function (accessToken, id) {
        var _this = this;
        // fetch the user info from google and send it to server
        // and get back a jwt token
        if (accessToken != null) {
            var tempUrl = this.GoogleuserInfoUrl + id + "?access_token=" + accessToken;
            this.http.get(tempUrl)
                .map(function (res) { return res.json(); }).subscribe(function (jsonResponse) {
                var google_user = jsonResponse;
                console.log(google_user);
                _this.user.firstName = google_user['name']['givenName'];
                _this.user.gender = google_user['gender'];
                _this.user.imageURL = google_user['image']['url'];
                localStorage.setItem('user', JSON.stringify(_this.user));
                // tell the navbar
                _this.notify(_this.user.firstName, _this.user.imageURL);
                _this.user['email'] = google_user['emails'][0]['value'];
                _this.user.lastName = google_user['name']['familyName'];
                _this.user['userID'] = google_user['id'];
                _this.user['type'] = 'Google';
                // get and store the token from the server
                _this.sendTOServer(_this.user);
            }, function (err) {
                console.error("Failed to fetch user info:", err);
            });
        }
    };
    AuthService.prototype.sendTOServer = function (socialObj) {
        var _this = this;
        var body = JSON.stringify(socialObj);
        console.log(socialObj);
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        this.http.post("http://localhost:3000/user/signup", body, { 'headers': headers })
            .map(function (res) {
            console.log(res);
            var response = res.json();
            console.log(response);
            var token = response.token;
            // now service is authenthicated
            localStorage.setItem('token', token);
            var travisUser = JSON.parse(localStorage.getItem('user'));
            travisUser._id = response['_id'];
            localStorage.setItem('user', JSON.stringify(travisUser));
            _this.user.authenticated = true;
            _this.authenticated = true;
        })
            .subscribe(function (info) {
        }, function (err) {
            console.error("Failed to fetch user info:", err);
        });
    };
    AuthService.prototype.logInTravis = function (loginObj) {
        var _this = this;
        //returns a token in return after user registeration/logging in
        var authObj = {};
        authObj['email'] = loginObj['email'];
        authObj['password'] = loginObj['password'];
        var body = JSON.stringify(authObj);
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        this.http.post("http://localhost:3000/user/login", body, { 'headers': headers })
            .map(function (res) {
            console.log(res);
            var response = res.json();
            console.log(response);
            var token = response.token;
            //storing the pics/info in session
            var travisUser = new auth_user_1.TravisUser();
            travisUser.name = response['firstName'];
            travisUser.image = response['imageURL'];
            travisUser._id = response['_id'];
            localStorage.setItem('user', JSON.stringify(travisUser));
            // tell the navbar
            _this.notify(travisUser.name, travisUser.image);
            // now service is authenthicated
            localStorage.setItem('token', token);
            _this.user.authenticated = true;
            _this.authenticated = true;
        })
            .subscribe(function (info) {
        }, function (err) {
            console.error("Failed to fetch user info:", err);
        });
    };
    AuthService.prototype.postUserToServer = function (userObj) {
        var _this = this;
        var body = JSON.stringify(userObj);
        console.log(userObj);
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        this.http.post("http://localhost:3000/user/signup", body, { 'headers': headers })
            .map(function (res) {
            console.log(res);
            var response = res.json();
            console.log(response);
            var token = response.token;
            var userId = response._id;
            // now service is authenthicated
            localStorage.setItem('token', token);
            _this.user.authenticated = true;
            _this.authenticated = true;
            //storing the pics/info in session
            var travisUser = new auth_user_1.TravisUser();
            travisUser.name = userObj['firstName'];
            travisUser.image = userObj['imageURL'];
            travisUser._id = userId;
            localStorage.setItem('user', JSON.stringify(travisUser));
            // tell the navbar
            _this.notify(travisUser.name, travisUser.image);
        })
            .subscribe(function (info) {
        }, function (err) {
            console.error("Failed to fetch user info:", err);
        });
    };
    AuthService.prototype.getUserInfo = function () {
        var user = localStorage.getItem('user');
        console.log("getting user from cache");
        console.log(user);
        user = JSON.parse(user);
        if (user != null)
            return Promise.resolve(user);
        else if (this.user.authenticated)
            return Promise.resolve(this.user);
        else if (localStorage.getItem('token')) {
            var token = localStorage.getItem('token');
            return Promise.resolve(this.getUserFromServer(token));
        }
        else
            return Promise.resolve(null);
    };
    AuthService.prototype.getUserFromServer = function (token) {
        var body = JSON.stringify({ "token": token });
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        this.http.post("http://localhost:3000/user/lookup", body, { 'headers': headers })
            .map(function (res) {
            console.log(res);
            var response = res.json();
            var user = response['user'];
            return user;
        })
            .subscribe(function (info) {
        }, function (err) {
            console.error("Failed to get user info:", err);
        });
    };
    AuthService.prototype.isAuthenticated = function () {
        if (this.user.authenticated)
            return true;
        else if (localStorage.getItem('token'))
            return true;
        return false;
    };
    AuthService.prototype.facebookLogin = function (facebookResponse) {
        console.log(facebookResponse);
        var travisUser = new auth_user_1.TravisUser();
        travisUser['type'] = 'Facebook';
        travisUser.userId = facebookResponse['id'];
        travisUser.imageURL = facebookResponse['picture']['data']['url'];
        travisUser.gender = facebookResponse['gender'];
        travisUser.firstName = facebookResponse['first_name'];
        travisUser.lastName = facebookResponse['last_name'];
        travisUser["email"] = facebookResponse['email'];
        this.user.authenticated = true;
        this.authenticated = true;
        this.user.firstName = travisUser['firstName'];
        this.user.gender = travisUser['gender'];
        this.user.imageURL = travisUser['imageURL'];
        localStorage.setItem('user', JSON.stringify(travisUser));
        this.notify(travisUser.firstName, travisUser.imageURL);
        this.sendTOServer(travisUser);
    };
    AuthService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [window_service_1.WindowService, http_1.Http, router_deprecated_1.Router])
    ], AuthService);
    return AuthService;
})();
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map