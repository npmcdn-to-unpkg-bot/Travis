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
import {enableProdMode} from '@angular/core';

//enableProdMode();
import {TripService} from "./trip/trip.service";
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import {ToastOptions} from "ng2-toastr/ng2-toastr";

let toastOptions = {
    toastLife: 4000,
    positionClass: 'toast-top-center',
};

bootstrap(AppComponent, [
    HTTP_PROVIDERS,
    ROUTER_PROVIDERS,
    AuthService,
    PollService,
    TripService,
    WindowService,
    COMMON_DIRECTIVES,
    ToastsManager,
    provide(LocationStrategy, {useClass: PathLocationStrategy}),
    provide(ToastOptions, { useValue: new ToastOptions(toastOptions)})
]);
