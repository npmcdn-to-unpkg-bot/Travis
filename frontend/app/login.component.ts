import { Component, OnInit } from '@angular/core';
import { Router }            from '@angular/router-deprecated';
import { Navbar } from './navbar.component';
import {AuthService} from './auth.service'

declare var FB: any;

@Component({
    selector: 'login',
    templateUrl: 'app/login.component.html',
    styleUrls:  ['app/login.component.css'],
    directives: [Navbar]
})
export class LoginComponent{
    error: any;
    fb:any;

    constructor(
        private _router: Router,
        private authService: AuthService) {
        this.fb = FB;
    }

    get authenticated() {
        return this.authService.isAuthenticated();
    }

    facebookLogin(){
        FB.getLoginStatus(function(response) {
            if (response.status === 'connected') {
                console.log(response.authResponse.accessToken);
                FB.api('/me', {fields: "id,name,picture,gender,birthday"},function(response) {
                    console.log(JSON.stringify(response));
                });
            }
            else{
                FB.login(function(response){
                    // Handle the response object, like in statusChangeCallback() in our demo
                    // code
                    // .
                    console.log(response);
                    this.statusChangeCallback(response);
                });
            }
        });

    }


    statusChangeCallback(response) {
    console.log('statusChangeCallback');
    console.log(response);
    // The response object is returned with a status field that lets the
    // app know the current login status of the person.
    // Full docs on the response object can be found in the documentation
    // for FB.getLoginStatus().
    if (response.status === 'connected') {
        // Logged into your app and Facebook.
        FB.api('/me', function(response) {
            console.log(JSON.stringify(response));
        });
    } else if (response.status === 'not_authorized') {
        // The person is logged into Facebook, but not your app.
        alert("you are not logged in");
    } else {
        // The person is not logged into Facebook, so we're not sure if
        // they are logged into this app or not.
        alert("you are not logged in");
    }
}

    doLogin() {
        this.authService.doLogin();
    }

    doLogout() {
        this.authService.doLogout();
    }

    get userName() {
        return this.authService.getUserName();
    }

    /*
    get page() {
        return this.location.path().split('/')[1];
    }
    */

}
