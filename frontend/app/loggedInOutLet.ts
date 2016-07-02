 /**
   * Created by Arash on 05-Jun-16.
   */
     // src/app/LoggedInOutlet.ts

 import {Directive, Attribute, ViewContainerRef, DynamicComponentLoader} from '@angular/core';
 import {Router, RouterOutlet, ComponentInstruction} from '@angular/router-deprecated';
 import { AuthService }         from './auth.service';

     @Directive({
             selector: 'router-outlet'
 })
 export class LoggedInRouterOutlet extends RouterOutlet {
     publicRoutes: any;
     private parentRouter: Router;
     constructor(_viewContainerRef: ViewContainerRef, _loader: DynamicComponentLoader,
                 _parentRouter: Router, @Attribute('name') nameAttr: string,private authService: AuthService) {
         super(_viewContainerRef, _loader, _parentRouter, nameAttr);

         this.parentRouter = _parentRouter;
         // The Boolean following each route below
         // denotes whether the route requires authentication to view
         this.publicRoutes = {
             '/': true,
             '/search' : true,
             '': true,
         };
     }

         activate(instruction: ComponentInstruction) {
             let url = instruction.urlPath;
             if (!this.publicRoutes[url] && !this.authService.isAuthenticated()) {
                     this.parentRouter.navigateByUrl('/');
                 }
             return super.activate(instruction);
         }
 }
