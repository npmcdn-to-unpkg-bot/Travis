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
var core_1 = require("@angular/core");
var http_1 = require('@angular/http');
var TripService = (function () {
    function TripService(http) {
        this.http = http;
    }
    TripService.prototype.createTrip = function (trip) {
        var body = JSON.stringify(trip);
        console.log(trip);
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        this.http.post("/rest/trip", body, { 'headers': headers })
            .map(function (res) {
            console.log(res);
            var response = res.json();
            console.log(response);
            alert(response);
        })
            .subscribe(function (info) {
        }, function (err) {
            console.error("Failed to post a trip:", err);
        });
    };
    TripService.prototype.searchForTrip = function (searchTerm) {
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        var query = "/rest/trip/search?";
        if (searchTerm.budget)
            query = query + "budget=" + searchTerm.budget + "&";
        if (searchTerm.cities)
            query = query + "cities=" + searchTerm.cities + "&";
        if (searchTerm.countries)
            query = query + "countries=" + searchTerm.countries + "&";
        if (searchTerm.month)
            query = query + "month=" + searchTerm.month + "&";
        if (searchTerm.searchTerm)
            query = query + "searchTerm=" + searchTerm.searchTerm;
        console.log("Searching for trips, query: " + query);
        return this.http.get(query, { 'headers': headers })
            .toPromise().then(function (res) {
            if (res)
                return res.json();
            else
                return {};
        }).catch(this.handleError);
    };
    TripService.prototype.rateTrip = function (trip) {
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        var query = "/rest/trip/rate";
        var body = JSON.stringify(trip);
        console.log("trip");
        console.log(body);
        return this.http.put(query, body, { 'headers': headers })
            .toPromise().then(function (res) {
            if (res) {
                var response = JSON.parse(res._body);
                return response.rating;
            }
            else
                return {};
        }).catch(this.handleError);
    };
    TripService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], TripService);
    return TripService;
}());
exports.TripService = TripService;
//# sourceMappingURL=trip.service.js.map