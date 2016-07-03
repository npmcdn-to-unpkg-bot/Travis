"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
/**
 * Created by Nadine on 6/2/16.
 */
var core_1 = require('@angular/core');
var common_1 = require('@angular/common');
var trip_service_1 = require('../trip/trip.service');
var ng2_bootstrap_1 = require('ng2-bootstrap/ng2-bootstrap');
var ng2_select_1 = require('ng2-select/ng2-select');
var trip_component_1 = require("../trip/trip.component");
var rating_component_1 = require('../rating/rating.component');
var ng2_toastr_1 = require('ng2-toastr/ng2-toastr');
var auth_service_1 = require('../auth.service');
var MyTripsComponent = (function () {
    function MyTripsComponent(tripService, authService, toastr) {
        this.tripService = tripService;
        this.authService = authService;
        this.toastr = toastr;
        this.resultTripModel = new trip_component_1.Trip();
        this.trips = [];
        this.token = this.authService.getToken();
        this.search();
    }
    MyTripsComponent.prototype.search = function () {
        var _this = this;
        var terms = "";
        this.trips = [];
        var searchResultTrips = this.tripService.getUserTrips(this.token).then(function (trips) {
            trips.map(function (trip) {
                var tmpTrip = new trip_component_1.Trip();
                tmpTrip.owner = trip['owner'];
                tmpTrip.title = trip['title'];
                tmpTrip.tags = trip['tags'];
                tmpTrip.budget = trip['budget'];
                tmpTrip.comments = trip['comments'];
                tmpTrip.cities = trip['cities'];
                tmpTrip.countries = trip['countries'];
                tmpTrip.dateFrom = trip['dateFrom'];
                tmpTrip.dateTo = trip['dateTo'];
                tmpTrip.route = trip['route'];
                tmpTrip.description = trip['description'];
                tmpTrip.rating = trip['rating.value'];
                tmpTrip._id = trip['_id'];
                _this.trips.push(tmpTrip);
            });
        });
    };
    MyTripsComponent.prototype.ratingComponetClick = function (clickObj, trip) {
        var _this = this;
        trip.rating = clickObj.rating;
        var rating = this.tripService.rateTrip(trip).then(function (rating) {
            trip.rating = rating.value;
            _this.resultTripModel.rating = trip.rating;
            _this.ratingLabel = rating.numRates;
        });
    };
    MyTripsComponent.prototype.deleteTrip = function (trip) {
        var _this = this;
        this.tripService.deleteTrip(trip, this.token).then(function (response) {
            if (response.success) {
                _this.toastr.success(response.msg);
                _this.trips.splice(_this.trips.indexOf(trip), 1);
            }
            else {
                _this.toastr.error("Deleting trip failed !" + response.msg);
                var msg = response.msg.toLowerCase();
                if (msg && msg.indexOf('token') >= 0) {
                    setTimeout(function () {
                        _this.toastr.error("Token is not valid! Logging Out....");
                        setTimeout(function () {
                            _this.authService.doLogout();
                        }, 1000);
                    }, 2000);
                }
            }
        });
    };
    MyTripsComponent = __decorate([
        core_1.Component({
            selector: 'myTrips',
            templateUrl: 'app/user-management/myTrips.component.html',
            styleUrls: ['app/user-management/myTrips.component.css', 'app/search/search.component.css'],
            viewProviders: [ng2_bootstrap_1.BS_VIEW_PROVIDERS],
            directives: [ng2_bootstrap_1.MODAL_DIRECTVES, ng2_select_1.SELECT_DIRECTIVES, common_1.CORE_DIRECTIVES, rating_component_1.RatingComponent],
        }), 
        __metadata('design:paramtypes', [trip_service_1.TripService, auth_service_1.AuthService, ng2_toastr_1.ToastsManager])
    ], MyTripsComponent);
    return MyTripsComponent;
}());
exports.MyTripsComponent = MyTripsComponent;
//# sourceMappingURL=myTrips.component.js.map