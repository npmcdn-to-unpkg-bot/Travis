/**
 * Created by Arash on 04-Jun-16.
 */
import {Component, OnInit} from '@angular/core';
import {Router}            from '@angular/router-deprecated';
import {Navbar} from './navbar.component';
import {AuthService} from './auth.service'
import {DROPDOWN_DIRECTIVES} from 'ng2-bootstrap/ng2-bootstrap';
import {ROUTER_DIRECTIVES, Router} from "@angular/router-deprecated";

declare var FB:any;

@Component({
    selector: 'main-comp',
    directives: [DROPDOWN_DIRECTIVES, ROUTER_DIRECTIVES],
    templateUrl: 'app/home.component.html',
    styleUrls: ['app/app.component.css']
})
export class HomeComponent {
    constructor(private _router:Router,
                private authService:AuthService) {
    }
    
    SearchCtrl($scope, $http) {
        // $scope.url =  // The url of our search

        search () {
            console.log("SEARCH FUNCTION");
            console.log($scope.status);
            // Create the http post request the data holds the keywords
            // $http.post($scope.url, {"data": $scope.keywords}).success(function (data, status) {
            //     $scope.status = status;
            //     $scope.data = data;
            //     $scope.result = data;
            //     error(function (data, status) {
            //         $scope.data = data || "Request failed";
            //         $scope.status = status;
            //     });
            // };
        }
    }
}
