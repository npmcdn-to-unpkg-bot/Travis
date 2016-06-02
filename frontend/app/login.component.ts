import { Component, OnInit } from '@angular/core';
import { Router }            from '@angular/router-deprecated';
import { Navbar } from './navbar.component';
import {AuthService} from './auth.service'
import {DROPDOWN_DIRECTIVES} from 'ng2-bootstrap/ng2-bootstrap';

declare var FB: any;

@Component({
    selector: 'login',
    directives: [DROPDOWN_DIRECTIVES],
    templateUrl: 'app/login.component.html',
    styleUrls:  ['app/login.component.css']
})
export class LoginComponent{
    public disabled:boolean = false;
    public status:{isopen:boolean} = {isopen: false};
    error: any;
    fb:any;
    constructor(
        private _router: Router,
        private authService: AuthService) {
        this.fb = FB;
    }

    public toggled(open:boolean):void {
        console.log('Dropdown is now: ', open);
    }

    public toggleDropdown($event:MouseEvent):void {
        $event.preventDefault();
        $event.stopPropagation();
        this.status.isopen = !this.status.isopen;
    }

    get authenticated() {
        return this.authService.isAuthenticated();
    }

    facebookLogin(){
        var a_Service = this.authService;
        var temp_facebook_obj = {};
        FB.login(function(response){
        if (response.status === 'connected') {
            console.log(response.authResponse.accessToken);
            FB.api('/me', {fields: "id,first_name,last_name ,picture,gender,birthday"},
                function(response){
                    try{
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
                    }catch (err){
                        console.log(err);
                        if (! temp_facebook_obj['id'])
                            alert('Facebook authentication failed! try again');
                        else a_Service.socialLogin(temp_facebook_obj);
                    }
                });
        }
        else if (response.status === 'not_authorized') {
            // The person is logged into Facebook, but not your app.
            alert('Facebook authentication failed! try again');
        } else {
            // The person is not logged into Facebook, so we're not sure if
            // they are logged into this app or not.
            alert("you are not logged in");
        }
    });
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
