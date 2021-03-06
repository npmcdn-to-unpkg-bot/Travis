import { Component, ViewContainerRef } from '@angular/core';
import { RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS } from '@angular/router-deprecated';
import {Navbar} from "./navbar.component";
import {PollComponent} from "./poll/poll.component";
import {HomeComponent} from "./home.component";
import {TripComponent} from "./trip/trip.component";
import {SearchComponent} from "./search/search.component";
import {MyTripsComponent} from "./user-management/myTrips.component";
import {LoggedInRouterOutlet} from './loggedInOutLet';

@Component({
    selector: 'travis',
    template: `
    <header></header>
    <router-outlet></router-outlet>
  `,
    providers: [ROUTER_PROVIDERS,],
    styleUrls: ['app/app.component.css'],
    directives: [LoggedInRouterOutlet, Navbar],
})
@RouteConfig([
    { path: '/', name: 'Home', component: HomeComponent, useAsDefault: true },
    { path: '/trip', name: 'Trip', component: TripComponent},
    { path: '/poll', name: 'Poll', component: PollComponent},
    { path: '/search/:searchTerm', name: 'Search', component: SearchComponent},
    { path: '/search', name: 'Search', component: SearchComponent},
    { path: '/myTrips', name: 'MyTrips', component: MyTripsComponent}
])

export class AppComponent {
    viewContainerRef:any;
    public constructor(viewContainerRef:ViewContainerRef) {
        // Need in order to catch application root view container ref
        this.viewContainerRef = viewContainerRef;
    }
}
