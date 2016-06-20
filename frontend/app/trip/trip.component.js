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
var trip_service_1 = require('./trip.service');
var ng2_bootstrap_1 = require('ng2-bootstrap/ng2-bootstrap');
var TripComponent = (function () {
    function TripComponent(tripService) {
        this.tripService = tripService;
        this.tripModel = new Trip();
    }
    TripComponent.prototype.createTrip = function () {
        console.log(this.tripModel);
        this.tripService.createTrip(this.tripModel);
    };
    TripComponent = __decorate([
        core_1.Component({
            selector: 'trip',
            templateUrl: 'app/trip/trip.component.html',
            styleUrls: ['app/trip/trip.component.css'],
            viewProviders: [ng2_bootstrap_1.BS_VIEW_PROVIDERS],
            directives: [ng2_bootstrap_1.MODAL_DIRECTVES],
        }), 
        __metadata('design:paramtypes', [trip_service_1.TripService])
    ], TripComponent);
    return TripComponent;
}());
exports.TripComponent = TripComponent;
var Trip = (function () {
    function Trip() {
    }
    return Trip;
}());
exports.Trip = Trip;
//# sourceMappingURL=trip.component.js.map