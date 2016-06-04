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
import {Observable} from "rxjs/Observable";
import {GoogleUser, TravisUser} from './auth_user';
import {Router} from '@angular/router-deprecated';

@Injectable()
export class AuthService {
    private oAuthCallbackUrl:string;
    private oAuthTokenUrl = "https://accounts.google.com/o/oauth2/v2/auth?" +
        "scope=https://www.googleapis.com/auth/plus.me&" +
        "redirect_uri=http://localhost:3000&" +
        "response_type=token&client_id=393670407860-jmlf11bfh5eu404k5tuoi2lsok89uqqd.apps.googleusercontent.com" +
        "&prompt=consent&" +
        "include_granted_scopes=true";
    private validationUrl  = "https://www.googleapis.com/oauth2/v3/tokeninfo?access_token=";
    private userInfoUrl = "https://www.googleapis.com/plus/v1/people/";

    private facebookURL = "https://www.facebook.com/dialog/oauth?client_id=598800500273094&redirect_uri=" +
        "http://localhost:3000&response_type=token";

    //TODO server side facebook

    private authenticated = false;
    private user:GoogleUser;
    private intervalId:any=null;
    private expires:any = 0;
    private expiresTimerId:any = null;
    private intervalLength = 1000;
    private windowHandle:any=null;

    constructor(private windows:WindowService, private http:Http, private router: Router) {
        console.log("service is created!");
        this.oAuthCallbackUrl += "&nonce=" + "ThisIsAStringRandomString!";
        this.user = new GoogleUser();
    }

    public doLogin() {
        if (this.isAuthenticated()){
            console.log("Already authenticated");
            return;
        }
        this.windowHandle = this.windows.createWindow(this.oAuthTokenUrl, 'OAuthLoginTravis');
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
                    var params = {}, queryString = href.substring(1),
                        regex = /([^&=]+)=([^&]*)/g, m;
                    while (m = regex.exec(queryString)) {
                        params[decodeURIComponent(m[1])] = decodeURIComponent(m[2]);
                    }

                    var key:any;

                    for (key in params) {
                        if (key.indexOf('access_token') >= 0) {
                            console.log(params[key]);
                            this.user.accessToken = params[key];
                            break;
                        }
                    }
                    if (this.user.accessToken) {
                        this.user.authenticated = true;
                        this.authenticated = true;
                        let now = new Date();
                        // we dont need it if user has been registered with our platform
                        //just is needed to do a login
                        this.user.expires = now.setSeconds(now.getSeconds() + Number(params['expires_in']));
                    }
                    this.windowHandle.close();
                    this.validateOAuthToken();
                }
            },500);

            //}
            }, this.intervalLength);

    }

    public doLogout() {
        this.user.authenticated = false;
        localStorage.removeItem('token_id');
        this.expiresTimerId = null;
        this.expires = 0;
        this.user.accessToken = null;
        //this.emitAuthStatus(true);
        console.log('Session has been cleared');
    }

    private validateOAuthToken(){
        var validationAccToken = this.validationUrl + this.user.accessToken;
        if (this.user.accessToken != null) {
            this.http.get(validationAccToken)
                .map(res =>
                {
                    // getting the id of the user
                    this.user.userId = res.json()['sub'];

                    //TODO
                    //query the database to get users info from ther
                    //if there is none fetch necessary info from google
                    // localstorage.setItem('token_id', 'Token from the server')
                    this.user.authenticated = true;
                    this.fetchUserInfo();
                    // register the user?
                }).
            subscribe(response => {
                console.log(response);
            }, err =>{
                console.log(err);
            });
        }
    }

    private fetchUserInfo() {
        if (this.user.accessToken != null) {
            var tempUrl = this.userInfoUrl + this.user.userId + "?access_token=" + this.user.accessToken;
            console.log(tempUrl);
            this.http.get(tempUrl)
                .map(res => {
                    console.log(res);
                    let google_user = res.json();
                    console.log(google_user);
                    this.user.name = google_user['name'];
                    this.user.gender = google_user['gender'];
                    this.user.image = google_user['image']['url'];

                    //storign in session
                    let travisUser = new TravisUser();
                    travisUser.name = google_user['name']['givenName'];
                    travisUser.image = google_user['image']['url'];

                    sessionStorage.setItem('user', JSON.stringify(travisUser));
                    this.router.navigate(['Home']);
                })
                .subscribe(info => {
                }, err => {
                    console.error("Failed to fetch user info:", err);
                });
        }
    }

    public getUserInfo() {
        let user = sessionStorage.getItem('user');
        console.log("getting user from session");
        console.log(user);
        user = JSON.parse(user);
        if (user != null)
            return Promise.resolve(user);
        else if (this.user.authenticated)
            return Promise.resolve(this.user);
        else if (localStorage.getItem('token_id')){
            let token = localStorage.getItem('token_id');
            return this.getUserFromServer(token);
        }else
            return null;
    }

    private getUserFromServer(token){
        //TODO implement!
        return null;
    }

    public isAuthenticated() {
        if (sessionStorage.getItem("user")!= null)
            return true;
        console.log("service inside isAuthenticated");
        if (this.user.authenticated)
            return true;
        else if (localStorage.getItem('token_id')){
            let token = localStorage.getItem('token_id');
            return this.getUserFromServer(token);
        }
        return false;
    }


    public socialLogin(socialObject:Object){
        console.log(socialObject);
        this.user.name = socialObject['first_name'];
        this.user.gender = socialObject['gender'];
        this.user.image = socialObject['picture'];

        //storign in session
        let travisUser = new TravisUser();
        travisUser.name = socialObject['first_name'];
        travisUser.image = socialObject['picture'];

        sessionStorage.setItem('user', JSON.stringify(travisUser));
        this.router.navigate(['Home']);
    }
}