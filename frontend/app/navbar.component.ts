/**
 * Created by Arash on 25-May-16.
 */
//These first 3 lines will be deprecated by the final release
import {Component} from "@angular/core";

import {ROUTER_DIRECTIVES, Router} from "@angular/router-deprecated";
import {Location} from "@angular/common";
import {AuthService} from './auth.service';


@Component({
    selector: 'navbar',
    directives: [ROUTER_DIRECTIVES],
    providers: [],
    pipes: [],
    template: `
    <nav class="navbar navbar-fixed-top navbar-dark bg-success navbar-static-top">
        <button class="navbar-toggler hidden-sm-up" type="button" data-toggle="collapse" data-target="#collapsingNavbar">
            &#9776;
        </button>
        <div class="collapse navbar-toggleable-xs" id="collapsingNavbar">
            <ul class="nav navbar-nav pull-xs-right">
                <li class="nav-item">
                    <button *ngIf="!authenticated" (click)="doLogin()" class="nav-link btn btn-danger-outline" href="#">Login</button>
                    <button *ngIf="authenticated" (click)="doLogout()" class="nav-link btn btn-success-outline" href="#">Logout {{userName}}</button>
                </li>
            </ul>
        </div>
    </nav>
    `
})
export class Navbar {
    constructor(private location:Location, private router:Router, private authService:AuthService) {
    }

    get authenticated() {
        return this.authService.isAuthenticated();
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

    get page() {
        return this.location.path().split('/')[1];
    }
}