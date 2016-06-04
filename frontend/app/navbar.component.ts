/**
 * Created by Arash on 25-May-16.
 */
//These first 3 lines will be deprecated by the final release
import {Component, OnInit, Input} from "@angular/core";

import {ROUTER_DIRECTIVES, Router} from "@angular/router-deprecated";
import {Location} from "@angular/common";
import {AuthService} from './auth.service';
import {LoginComponent} from './login.component';

@Component({
    selector: 'header',
    directives: [ROUTER_DIRECTIVES, LoginComponent],
    pipes: [],
    templateUrl: 'app/navbar.component.html',

})
export class Navbar implements OnInit{
    user:any;

    constructor(private location:Location, private router:Router, private authService:AuthService) {
    }

    public authenticated() {
        return this.authService.isAuthenticated();
    }

    ngOnInit() {
        this.user = "salam";
        console.log(`OnInit`);
        if (this.authenticated())
            this.getUserInfo();
    }

    public getUserInfo(){
        console.log("calling get user info from navbar");
        this.authService.getUserInfo().then(user => {
            console.log("THen getting user from service");
            console.log(user);
            this.user = user;
            console.log(this.user);
        }
        );
        console.log("inside navbar " + this.user);
    }

}