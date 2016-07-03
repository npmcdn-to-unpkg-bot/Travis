/**
 * Created by Arash on 04-Jun-16.
 */
import {Component, OnInit} from '@angular/core';
import {Navbar} from './navbar.component';
import {AuthService} from './auth.service';
import {DROPDOWN_DIRECTIVES} from 'ng2-bootstrap/ng2-bootstrap';
import {ROUTER_DIRECTIVES, Router} from "@angular/router-deprecated";

declare var FB:any;

@Component({
    selector: 'main-comp',
    directives: [DROPDOWN_DIRECTIVES, ROUTER_DIRECTIVES],
    templateUrl: 'app/home.component.html',
    styleUrls: ['app/app.component.css']
})
export class HomeComponent {
    searchTerm:string[];

    constructor(private _router:Router,
                private authService:AuthService) {
        this.searchTerm = [];
    }
}
