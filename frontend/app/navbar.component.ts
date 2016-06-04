/**
 * Created by Arash on 25-May-16.
 */
//These first 3 lines will be deprecated by the final release
import {Component} from "@angular/core";

import {ROUTER_DIRECTIVES, Router} from "@angular/router-deprecated";
import {Location} from "@angular/common";
import {AuthService} from './auth.service';
import {LoginComponent} from './login.component';

@Component({
    selector: 'header',
    directives: [ROUTER_DIRECTIVES, LoginComponent],
    providers: [],
    pipes: [],
    templateUrl: 'app/navbar.component.html',

})
export class Navbar {

    user:any;

    constructor(private location:Location, private router:Router, private authService:AuthService) {
    }

    public authenticated() {
        return this.authService.isAuthenticated();
    }

    public getuserInfo(){
        let user = this.authService.getUserInfo();
        this.user = {"image": user.image, "name": user.name};
    }

}