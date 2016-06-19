/**
 * Created by Arash on 20-May-16.
 */
// Imports for loading & configuring the in-memory web api
import { provide }    from '@angular/core';
import { XHRBackend } from '@angular/http';
import { RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS } from '@angular/router-deprecated';

// The usual bootstrapping imports
import { bootstrap }      from '@angular/platform-browser-dynamic';
import { HTTP_PROVIDERS } from '@angular/http';

import {PathLocationStrategy, HashLocationStrategy, LocationStrategy} from "@angular/common";
import {COMMON_DIRECTIVES} from '@angular/common';

import {WindowService} from './window.service';
import {AuthService} from './auth.service';


import 'rxjs/add/operator/map';

import { AppComponent }   from './app.component';
import {PollService} from "./poll/poll.service";
import {TripService} from "./trip/trip.service";

bootstrap(AppComponent, [
    HTTP_PROVIDERS,
    ROUTER_PROVIDERS,
    AuthService,
    PollService,
    TripService,
    WindowService,
    COMMON_DIRECTIVES,
    provide(LocationStrategy, {useClass: HashLocationStrategy}),
]);
