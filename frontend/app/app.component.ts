import { Component, ViewContainerRef } from '@angular/core';
import { RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS } from '@angular/router-deprecated';
import { AuthService }         from './auth.service';
import {Navbar} from "./navbar.component";
import {LoginComponent} from "./login.component";
import {PollComponent} from "./poll/poll.component";
import {HomeComponent} from "./home.component";


@Component({
    selector: 'travis',
    template: `
    <header></header>
    <main-comp></main-comp>
    <router-outlet></router-outlet>
  `,
    providers: [ROUTER_PROVIDERS,
    ],
    styleUrls: ['app/app.component.css'],
    directives: [ROUTER_DIRECTIVES, Navbar, PollComponent, LoginComponent],
})
@RouteConfig([
    { path: '/',     name: 'Home',     component: HomeComponent, useAsDefault: true },
    { path: '/poll', name: 'Poll', component: PollComponent},

])

export class AppComponent {
    viewContainerRef:any;
    public constructor(viewContainerRef:ViewContainerRef) {
        // You need this small hack in order to catch application root view container ref
        this.viewContainerRef = viewContainerRef;
    }
}
