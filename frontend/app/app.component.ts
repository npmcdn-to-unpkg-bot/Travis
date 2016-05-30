import { Component } from '@angular/core';
import { RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS } from '@angular/router-deprecated';
import { DashboardComponent }  from './dashboard.component';
import { HeroesComponent }     from './heroes.component';
import { HeroDetailComponent } from './hero-detail.component';
import { HeroService }         from './hero.service';
import { AuthService }         from './auth.service';
import {Navbar} from "./navbar.component";
import {LoginComponent} from "./login.component";
import {LoggedoutPage} from "./logged-out.component";

@Component({
    selector: 'my-app',
    template: `
    <h1>{{title}}</h1>
    <nav>
      <a [routerLink]="['Dashboard']">Dashboard</a>
      <a [routerLink]="['Heroes']">Heroes</a>
    </nav>
    <router-outlet></router-outlet>
  `,
    styleUrls: ['app/app.component.css'],
    directives: [ROUTER_DIRECTIVES, Navbar],
    providers: [
        ROUTER_PROVIDERS,
        HeroService,
        AuthService,
    ]
})
@RouteConfig([
    { path: '/dashboard',  name: 'Dashboard',  component: DashboardComponent, useAsDefault: true },
    { path: '/detail/:id', name: 'HeroDetail', component: HeroDetailComponent },
    { path: '/heroes',     name: 'Heroes',     component: HeroesComponent },
    { path: '/login',     name: 'Login',     component: LoginComponent },
    {path: '/loggedout', name: 'LoggedoutPage', component: LoggedoutPage},
])
export class AppComponent {
    title = 'Tour of Heroes';
}
