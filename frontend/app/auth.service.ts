/**
 * Created by Arash on 25-May-16.
 */
/*
 * Created with IntelliJ IDEA.
 * User: mfo
 * Date: 12/18/15
 * Time: 10:34 AM
 */
import {Injectable, EventEmitter} from "@angular/core";
import {WindowService} from './window.service';
import {Http, Headers, Response} from '@angular/http'
import 'rxjs/Rx';
import { Subject }    from 'rxjs/Subject';
import {Observable} from "rxjs/Observable";
import 'rxjs/add/operator/map'

import {GoogleUser, TravisUser} from './auth_user';
import {Router} from '@angular/router-deprecated';

@Injectable()
export class AuthService {
    private oAuthCallbackUrl:string;
    private googleOAuthTokenUrl = "https://accounts.google.com/o/oauth2/v2/auth?" +
        "scope=https://www.googleapis.com/auth/plus.me " +
        "https://www.googleapis.com/auth/userinfo.email&" +
        "redirect_uri=http://localhost:3000&" +
        "response_type=token&client_id=393670407860-jmlf11bfh5eu404k5tuoi2lsok89uqqd.apps.googleusercontent.com" +
        "&prompt=consent&" +
        "include_granted_scopes=true";
    private GooglevalidationUrl  = "https://www.googleapis.com/oauth2/v3/tokeninfo?access_token=";
    private GoogleuserInfoUrl = "https://www.googleapis.com/plus/v1/people/";

    private authenticated = false;
    private user = new TravisUser();
    private intervalId:any=null;
    private expires:any = 0;
    private expiresTimerId:any = null;
    private intervalLength = 1000;
    private windowHandle:any=null;
    authMsg:any;

    authChange: Subject<any> = new Subject<any>();

    notify(name, image){
        this.authMsg.firstName = name;
        this.authMsg.imageURL = image;
        this.authChange.next(this.authMsg);
    }

    constructor(private windows:WindowService, private http:Http, private router: Router) {
        console.log("service is created!");
        this.oAuthCallbackUrl += "&nonce=" + "ThisIsAStringRandomString!";
        this.authMsg = {'imageURL':'', 'firstName':''};
    }

    private getTokenFromGoogleURL(href:string) {

        let accessToken = null;
        // got this code from google to extract token information
        var params = {}, queryString = href.substring(1),
            regex = /([^&=]+)=([^&]*)/g, m;
        while (m = regex.exec(queryString)) {
            params[decodeURIComponent(m[1])] = decodeURIComponent(m[2]);
        }

        var key:any;
        for (key in params) {
            if (key.indexOf('access_token') >= 0) {
                console.log(params[key]);
                accessToken = params[key];
                break;
            }
        }
        return {accessToken:accessToken, expires:params['expires_in']};
    }

    public GoogleLogin() {
        if (this.isAuthenticated()){
            console.log("Already authenticated");
            return;
        }
        this.windowHandle = this.windows.createWindow(this.googleOAuthTokenUrl, 'OAuthLoginTravis');
        this.intervalId = setInterval(() => {
            setTimeout(() =>{
                var href:string;
                try {
                    href = this.windowHandle.location.href;
                } catch (e) {
                    console.log('Error:', e);
                    return;
                }

                if (href != null) {
                    clearInterval(this.intervalId);
                    // got this code from google to extract token information
                    let googleToken = this.getTokenFromGoogleURL(href);
                    this.user.accessToken = googleToken['accessToken'];
                    if (this.user.accessToken) {
                        let now = new Date();
                        this.user.expires = now.setSeconds(now.getSeconds() + Number(googleToken['expires_in']));

                        // validate the token
                        this.googleValidateOAuthToken(this.user.accessToken);
                    }else {
                        console.warn(href);
                        alert("Google Auth failed! The token is empty");
                    }
                    this.windowHandle.close();
                }
            },500);
            //}
            }, this.intervalLength);

    }

    public doLogout() {
        this.user.authenticated = false;
        sessionStorage.removeItem('user');
        localStorage.removeItem('token');
        this.authenticated = false;

        this.expiresTimerId = null;
        this.expires = 0;
        this.user.accessToken = null;
        console.log('Session has been cleared');
        window.location.reload();
    }

    private googleValidateOAuthToken(accessToken:string){
        var validationAccToken = this.GooglevalidationUrl + accessToken;
        if (accessToken != null) {
            this.http.get(validationAccToken)
                .map(res => res.json()['sub']).subscribe(id => {
                console.log(id);
                this.user.userID = id;
                this.fetchGoogleUserInfo(this.user.accessToken,this.user.userID);
            }, err =>{
                console.log(err);
                alert("Google authentication failed!");
            });
        }
    }

    private fetchGoogleUserInfo(accessToken:string,id:string) {
        // fetch the user info from google and send it to server
        // and get back a jwt token
        if (accessToken != null) {
            var tempUrl = this.GoogleuserInfoUrl + id + "?access_token=" + accessToken;
            this.http.get(tempUrl)
                .map(res => res.json()
                ).subscribe(jsonResponse => {
                    let google_user = jsonResponse;
                    console.log(google_user);
                    this.user.firstName = google_user['name']['givenName'];
                    this.user.gender = google_user['gender'];
                    this.user.imageURL = google_user['image']['url'];

                    localStorage.setItem('user', JSON.stringify(this.user));
                    // tell the navbar
                    this.notify(this.user.firstName,this.user.imageURL);

                    this.user['email'] = google_user['emails'][0]['value'];
                    this.user.lastName = google_user['name']['familyName'];
                    this.user['userID'] = google_user['id'];
                    this.user['type'] = 'Google';
                    // get and store the token from the server
                    this.sendTOServer(this.user);

                }, err => {
                    console.error("Failed to fetch user info:", err);
                });
        }
    }

    public sendTOServer(socialObj){
        let body = JSON.stringify(socialObj);
        console.log(socialObj);
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        this.http.post("http://localhost:3000/user/signup", body, {'headers':headers})
            .map(res => {
                console.log(res);
                let response = res.json();
                console.log(response);
                let token = response.token;

                // now service is authenthicated
                localStorage.setItem('token',token);

                let travisUser = JSON.parse(localStorage.getItem('user'));
                travisUser._id = response['_id'];

                localStorage.setItem('user', JSON.stringify(travisUser));
                this.user.authenticated = true;
                this.authenticated = true;
                // or navigate to home
                window.location.reload();
            })
            .subscribe(info => {
            }, err => {
                console.error("Failed to fetch user info:", err);
                alert("Login failed due to server error! Please try again");
            });
    }

    public logInTravis(loginObj){
            //returns a token in return after user registeration/logging in
        let authObj = {};
        authObj['email'] = loginObj['email'];
        authObj['password'] = loginObj['password'];
        let body = JSON.stringify(authObj);
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        this.http.post("http://localhost:3000/user/login", body, {'headers':headers})
                .map(res => {
                    console.log(res);
                    let response = res.json();
                    console.log(response);
                    let token = response.token;

                    //storing the pics/info in session
                    let travisUser = new TravisUser();
                    travisUser.firstName = response['firstName'];
                    travisUser.imageURL = response['imageURL'];
                    travisUser._id = response['_id'];


                    localStorage.setItem('user', JSON.stringify(travisUser));
                    // tell the navbar
                    this.notify(travisUser.firstName,travisUser.imageURL);

                    // now service is authenthicated
                    localStorage.setItem('token',token);
                    this.user.authenticated = true;
                    this.authenticated = true;

                })
                .subscribe(info => {
                }, err => {
                    console.error("Failed to fetch user info:", err);
                });
    }

    public postUserToServer(userObj){
        let body = JSON.stringify(userObj);
        console.log(userObj);
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        this.http.post("http://localhost:3000/user/signup", body, {'headers':headers})
            .map(res => {
                console.log(res);
                let response = res.json();
                console.log(response);
                let token = response.token;
                let userId = response._id;

                // now service is authenthicated
                localStorage.setItem('token',token);
                this.user.authenticated = true;
                this.authenticated = true;

                //storing the pics/info in session
                let travisUser = new TravisUser();
                travisUser.firstName = userObj['firstName'];
                travisUser.imageURL = userObj['imageURL'];
                travisUser._id = userId;

                localStorage.setItem('user', JSON.stringify(travisUser));
                // tell the navbar
                this.notify(travisUser.firstName,travisUser.imageURL);
            })
            .subscribe(info => {
            }, err => {
                console.error("Failed to fetch user info:", err);
            });
    }

    public getUserInfo() {
        let user = localStorage.getItem('user');
        console.log("getting user from cache");
        console.log(user);
        user = user != null ? user : this.user;

        if (user == null) {
            let token = localStorage.getItem('token');
            user = this.getUserFromServer(token);
        }else{
            user = JSON.parse(user) ;
        }

        if(user != null){
            this.notify(user.firstName,user.imageURL);
            return Promise.resolve(user);
        }

        return Promise.resolve(null);

}

    private getUserFromServer(token){
        let body = JSON.stringify({"token":token});
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        this.http.post("http://localhost:3000/user/lookup", body, {'headers':headers})
            .map(res => {
                console.log(res);
                let response = res.json();
                let user = response['user'];
                return user;
            })
            .subscribe(info => {
            }, err => {
                console.error("Failed to get user info:", err);
            });
    }

    public isAuthenticated() {
        if (this.user.authenticated)
            return true;
        else if (localStorage.getItem('token'))
            return true;
        return false;
    }

    public getToken() {
        if (localStorage.getItem('token'))
            return localStorage.getItem('token');
        else
            this.doLogout();
    }


    public facebookLogin(facebookResponse:Object){
        console.log(facebookResponse);
        let travisUser = new TravisUser();
        travisUser['type'] = 'Facebook';
        travisUser.userID = facebookResponse['id'];

        travisUser.imageURL = facebookResponse['picture']['data']['url'];

        travisUser.gender = facebookResponse['gender'];
        travisUser.firstName = facebookResponse['first_name'];
        travisUser.lastName = facebookResponse['last_name'];
        travisUser["email"] = facebookResponse['email'] ? facebookResponse['email']: "null";

        this.user.authenticated = true;
        this.authenticated = true;

        this.user.firstName = travisUser['firstName'];
        this.user.gender = travisUser['gender'];
        this.user.imageURL = travisUser['imageURL'];

        localStorage.setItem('user', JSON.stringify(this.user));
        this.notify(travisUser.firstName,travisUser.imageURL);
        this.sendTOServer(travisUser);
    }
}