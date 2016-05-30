/**
 * Created by Arash on 25-May-16.
 */

import {Directive, OnDestroy} from '@angular/core';
import {AuthService} from './auth.service';
import {ROUTER_DIRECTIVES, Router} from "@angular/router-deprecated";
import {Location} from "@angular/common";

@Directive({
    selector: '[protected]'
})

export class ProtectedDirective implements OnDestroy {
    private sub:any = null;

    constructor(private authService:AuthService, private router:Router, private location:Location) {
        if (!authService.isAuthenticated()) {
            this.location.replaceState('/');
            this.router.navigate(['PublicPage']);
        }

        this.sub = this.authService.subscribe((val) => {
            if (!val.authenticated) {
                this.location.replaceState('/');
                this.router.navigate(['LoggedoutPage']);
            }
        });
    }

    ngOnDestroy() {
        if (this.sub != null) {
            this.sub.unsubscribe();
        }
    }
}