import { Component, OnInit } from '@angular/core';
import { Router }            from '@angular/router-deprecated';
import { NgForm,  FormBuilder, Validators }    from '@angular/common';
import { Navbar } from './navbar.component';
import {AuthService} from './auth.service'
import {DROPDOWN_DIRECTIVES, MODAL_DIRECTVES, BS_VIEW_PROVIDERS} from 'ng2-bootstrap/ng2-bootstrap';

declare var FB: any;

export class RegForm {
    public email: string;
    public password: string;
    public firstName: string;
    public lastName: string;
    public birthDate: string;
    public gender: string;
    public country: string;
}

export class LoginForm {
    public loginEmail: string;
    public loginPassword: string;
}

@Component({
    selector: 'login',
    viewProviders:[BS_VIEW_PROVIDERS],
    directives: [DROPDOWN_DIRECTIVES, MODAL_DIRECTVES],
    templateUrl: 'app/login.component.html',
    styleUrls:  ['app/login.component.css']
})
export class LoginComponent{
    public disabled:boolean = false;
    public status:{isopen:boolean} = {isopen: false};
    error: any;
    fb:any;
    loginModel:LoginForm;
    regModel:RegForm;
    regForm:any;
    loginForm: any;

    constructor(
        private _router: Router,
        private authService: AuthService, formBuilder: FormBuilder) {
        this.fb = FB;
        this.loginModel = new LoginForm();
        this.regModel = new RegForm();

        this.regForm = formBuilder.group({
            regFName: ['', Validators.required],
            regLName: ['', Validators.required],
            regEmail: ['', Validators.compose([Validators.required,
                Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$")
            ])],
            matchingPassword: formBuilder.group({
                password: ['', Validators.required],
                confirmPassword: ['', Validators.required]
            }, {validator: this.matchPassword})
        });
    }

    matchPassword(group): any {
        let password = group.controls.password;
        let confirm = group.controls.confirmPassword;

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
    }
    
    travisRegister() {
        let regObj = {};
            regObj['imageURL'] = "/UI/assets/images/user.jpg";
            regObj['lastName'] = this.regModel.lastName;
            regObj['firstName'] = this.regModel.firstName;
            regObj['email'] = this.regModel.email;
            regObj['password'] = this.regModel.password;
            regObj['country'] = this.regModel.country;
            regObj['type'] = "Travis";
            regObj['birthDate'] = this.regModel.birthDate;
            this.authService.postUserToServer(regObj);
    }

    travisLogin(){
        let obj = {};
        obj['email'] = this.loginModel.loginEmail;
        obj['password'] = this.loginModel.loginPassword;
        this.authService.logInTravis(obj);
    }

    public toggled(open:boolean):void {
        console.log('Dropdown is now: ', open);
    }

    public toggleDropdown($event:any):void {
        $event.preventDefault();
        $event.stopPropagation();
        console.log($event);
        var element = $event.target;
        console.log("TAG NAME");
        console.log(element.tagName);
        if(element.tagName == "INPUT"){
            $event.preventDefault();
            $event.stopPropagation();
        }
        this.status.isopen = !this.status.isopen;
    }

    get authenticated() {
        return this.authService.isAuthenticated();
    }

    facebookLogin(){
        var a_router = this._router;
        var a_Service = this.authService;
        var temp_facebook_obj = {};
        FB.getLoginStatus(function(response) {
            if (response.status === 'connected') {
                console.log(response.authResponse.accessToken);
                FB.api('/me', {fields: "id,first_name,last_name ,picture,gender,birthday"},
                    function(response){
                        try{
                            a_Service.facebookLogin(response,this.navigateToSearchPage);
                        }catch (err){
                            console.log(err);
                            if (! temp_facebook_obj['id'])
                                alert('Facebook authentication failed! try again');
                            else a_Service.facebookLogin(temp_facebook_obj, this.navigateToSearchPage);
                        }
                    });
            } else if (response.status === 'not_authorized') {
                // the user is logged in to Facebook,
                // but has not authenticated your app
            } else {
                FB.login(function(response){
                    if (response.status === 'connected') {
                        console.log(response.authResponse.accessToken);
                        FB.api('/me', {fields: "id,first_name,last_name ,picture,gender,birthday, email"},
                            function(response){
                                try{
                                    var facebook_response = JSON.stringify(response);
                                    console.log(facebook_response);
                                    temp_facebook_obj['auth_type'] = 'facebook';
                                    temp_facebook_obj['id'] = response['id'];
									temp_facebook_obj['email'] = response['email'];
                                    temp_facebook_obj['imageURL'] = response['picture']['data']['url'];
                                    temp_facebook_obj['gender'] = response['gender'];
                                    temp_facebook_obj['firstName'] = response['first_name'];
                                    temp_facebook_obj['lastName'] = response['last_name'];
                                    a_Service.facebookLogin(temp_facebook_obj,this.navigateToSearchPage);
                                }catch (err){
                                    console.log(err);
                                    if (! temp_facebook_obj['id'])
                                        alert('Facebook authentication failed! try again');
                                    else a_Service.facebookLogin(temp_facebook_obj,this.navigateToSearchPage);
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
                },{scope: 'email'});
            }
        });

    }

    doLogin() {
        console.log("login is called");
        this.authService.GoogleLogin();
    }

    doLogout() {
        this.authService.doLogout();
        this.navigateToSearchPage();

    }

    get userName() {
        return this.authService.getUserInfo();
    }

    /*
    get page() {
        return this.location.path().split('/')[1];
    }
    */
    private dropdownMenu($event:any):void {
        if($event.target.id == 'loginButton')
            return;
        $event.preventDefault();
        $event.stopPropagation();
        this.status.isopen = !this.status.isopen;
    }

    public navigateToSearchPage(){
        this._router.navigate(['Search']);
    }

}
