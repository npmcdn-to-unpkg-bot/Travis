import { Component, ViewContainerRef } from '@angular/core';
import { RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS } from '@angular/router-deprecated';
import { AuthService }         from './auth.service';
import {Navbar} from "./navbar.component";
import {LoginComponent} from "./login.component";
import {PollComponent} from "./poll/poll.component";
import {HomeComponent} from "./home.component";
import {TripComponent} from "./trip/trip.component";
import {SearchComponent} from "./search/search.component";
import {LoggedInRouterOutlet} from './loggedInOutLet';

@Component({
    selector: 'travis',
    template: `
    <header></header>
    <router-outlet></router-outlet>
  `,
    providers: [ROUTER_PROVIDERS,
    ],
    styleUrls: ['app/app.component.css'],
    directives: [LoggedInRouterOutlet, Navbar],
})
@RouteConfig([
    { path: '/', name: 'Home', component: HomeComponent, useAsDefault: true },
    { path: '/trip', name: 'Trip', component: TripComponent},
    { path: '/poll', name: 'Poll', component: PollComponent},
    { path: '/search', name: 'Search', component: SearchComponent}
])

export class AppComponent {
    viewContainerRef:any;
    public constructor(viewContainerRef:ViewContainerRef) {
        // You need this small hack in order to catch application root view container ref
        this.viewContainerRef = viewContainerRef;
    }
}
