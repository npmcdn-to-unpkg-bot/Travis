/**
 * Created by Arash on 04-Jun-16.
 */
import { Component, OnInit } from '@angular/core';
import { Router }            from '@angular/router-deprecated';
import { Navbar } from './navbar.component';
import {AuthService} from './auth.service'
import {DROPDOWN_DIRECTIVES} from 'ng2-bootstrap/ng2-bootstrap';

declare var FB: any;

@Component({
    selector: 'main-comp',
    directives: [DROPDOWN_DIRECTIVES],
    templateUrl: 'app/home.component.html',
    styleUrls:  ['app/app.component.css']
})
export class HomeComponent{
    constructor(
        private _router: Router,
        private authService: AuthService) {
    }
}