/**
 * Created by Arash on 25-May-16.
 */
//These first 3 lines will be deprecated by the final release
import {Component, OnInit, Input} from "@angular/core";
import {DROPDOWN_DIRECTIVES, MODAL_DIRECTVES, BS_VIEW_PROVIDERS} from 'ng2-bootstrap/ng2-bootstrap';
import {ROUTER_DIRECTIVES, Router} from "@angular/router-deprecated";
import {Location} from "@angular/common";
import {AuthService} from './auth.service';
import {LoginComponent} from './login.component';
import {TravisUser} from "./auth_user";

@Component({
    selector: 'header',
    directives: [ROUTER_DIRECTIVES, DROPDOWN_DIRECTIVES, MODAL_DIRECTVES, LoginComponent],
    pipes: [],
    viewProviders:[BS_VIEW_PROVIDERS],
    templateUrl: 'app/navbar.component.html',
    styleUrls:  ['app/poll/poll.component.css', 'app/login.component.css'],
})

export class Navbar implements OnInit{
    user:any;
    _subscription:any;

    public status:{isopen:boolean} = {isopen: false};

    constructor(private location:Location, private router:Router, private authService:AuthService) {
        //this.newUser = authService.authMsg;
        this._subscription = authService.authChange.subscribe((value) => {
            let tempUser = value;
            console.log("notified!");
            console.log(value);
            this.user = new TravisUser();
            this.user.firstName = tempUser.firstName;
            this.user.imageURL = tempUser.imageURL;
            this.authenticated();
        });
    }

    public authenticated() {
        return this.authService.isAuthenticated();
    }

    public logout(){
        this.authService.doLogout();
    }

    ngOnInit() {
        console.log(`OnInit`);
        if (this.authenticated())
            this.getUserInfo();
    }

    public getUserInfo(){
        console.log("calling get user info from navbar");
        this.authService.getUserInfo().then(user => {
            console.log("Then getting user from service");
            this.user = user;
            console.log(this.user);
        }
        );
    }
    public toggled(open:boolean):void {
        console.log('Dropdown is now: ', open);
    }

    public toggleDropdown($event:any):void {
        console.log($event);
        this.status.isopen = !this.status.isopen;
    }

    private dropdownUserMenu($event:any):void {
        $event.preventDefault();
        $event.stopPropagation();
        this.status.isopen = !this.status.isopen;
    }
}