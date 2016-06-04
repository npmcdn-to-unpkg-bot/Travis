import { Component } from '@angular/core';
import { RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS } from '@angular/router-deprecated';
import { AuthService }         from './auth.service';
import {Navbar} from "./navbar.component";
import {LoginComponent} from "./login.component";
import {LoggedoutPage} from "./logged-out.component";
import {PollComponent} from "./poll/poll.component";

@Component({
    selector: 'my-app',
    template: `
    <header></header>
    <router-outlet></router-outlet>
  `,
    styleUrls: ['app/app.component.css'],
    directives: [ROUTER_DIRECTIVES, Navbar, PollComponent],
    providers: [
        ROUTER_PROVIDERS,
        AuthService,
    ]
})
@RouteConfig([
    { path: '/login',     name: 'Login',     component: LoginComponent },
    { path: '/loggedout', name: 'LoggedoutPage', component: LoggedoutPage},
    { path: '/poll', name: 'Poll', component: PollComponent},

])
export class AppComponent {

}
