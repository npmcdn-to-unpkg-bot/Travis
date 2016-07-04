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
        var _this = this;
        var body = JSON.stringify(trip);
        console.log(trip);
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.post("/rest/trip", body, { 'headers': headers })
            .timeout(8000, new Error('server timeout exceeded! could not create a new Trip'))
            .toPromise().then(function (res) {
            if (res) {
                var serviceResponse = {};
                if (res.status <= 299) {
                    serviceResponse['success'] = true;
                    serviceResponse['msg'] = res.text();
                }
                else if (res.status >= 400) {
                    serviceResponse['error'] = true;
                    serviceResponse['msg'] = res.text();
                    console.log(serviceResponse);
                }
                return serviceResponse;
            }
            else
                return {};
        })
            .catch(function (res) { return _this.handleError(res); });
    };
    TripService.prototype.handleError = function (res) {
        if (res.status >= 400) {
            var serviceResponse = {};
            serviceResponse['error'] = true;
            serviceResponse['msg'] = res.text();
            console.log(serviceResponse);
            return serviceResponse;
        }
        else {
            var error = res;
            var errMsg = (error.message) ? error.message :
                error.status ? error.status + " - " + error.statusText : 'Server error';
            console.error(errMsg); // log to console instead
            return {
                error: true,
                msg: "server did not respond!"
            };
        }
    };
    TripService.prototype.searchForTrip = function (searchTerm) {
        var _this = this;
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
        if (searchTerm.owner)
            query = query + "owner=" + searchTerm.owner;
        console.log("Searching for trips, query: " + query);
        return this.http.get(query, { 'headers': headers })
            .toPromise().then(function (res) {
            if (res) {
                var serviceResponse = {};
                if (res.status <= 299)
                    serviceResponse = res.json();
                else if (res.status >= 400) {
                    serviceResponse['error'] = true;
                    serviceResponse['msg'] = res.text();
                    console.log(serviceResponse);
                }
                return serviceResponse;
            }
            else
                return {};
        }).catch(function (res) { return _this.handleError(res); });
    };
    TripService.prototype.getUserTrips = function (token) {
        var _this = this;
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('token', token);
        var query = "/rest/trip/getUserTrips";
        return this.http.get(query, { 'headers': headers })
            .toPromise().then(function (res) {
            if (res) {
                var serviceResponse = {};
                if (res.status <= 299)
                    serviceResponse = res.json();
                else if (res.status >= 400) {
                    serviceResponse['error'] = true;
                    serviceResponse['msg'] = res.text();
                    console.log(serviceResponse);
                }
                return serviceResponse;
            }
            else
                return {};
        }).catch(function (res) { return _this.handleError(res); });
    };
    TripService.prototype.searchForMoreTrips = function (searchTerm) {
        var _this = this;
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        var query = "/rest/trip/searchMore?";
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
            if (res) {
                var serviceResponse = {};
                if (res.status <= 299)
                    serviceResponse = res.json();
                else if (res.status >= 400) {
                    serviceResponse['error'] = true;
                    serviceResponse['msg'] = res.text();
                    console.log(serviceResponse);
                }
                return serviceResponse;
            }
            else
                return {};
        }).catch(function (res) { return _this.handleError(res); });
    };
    TripService.prototype.rateTrip = function (trip) {
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        var query = "/rest/trip/rate";
        var body = JSON.stringify(trip);
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
    TripService.prototype.deleteTrip = function (trip, token) {
        var _this = this;
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('token', token);
        var url = "/rest/trip?" + "id=" + trip._id;
        return this.http.delete(url, { 'headers': headers })
            .toPromise().then(function (res) {
            if (res) {
                var serviceResponse = {};
                if (res.status <= 299) {
                    serviceResponse['success'] = true;
                    serviceResponse['msg'] = res.text();
                }
                else if (res.status >= 400) {
                    serviceResponse['error'] = true;
                    serviceResponse['msg'] = res.text();
                    console.log(serviceResponse);
                }
                return serviceResponse;
            }
            else
                return {};
        })
            .catch(function (res) { return _this.handleError(res); });
    };
    TripService.prototype.updateTrip = function (trip, token) {
        var _this = this;
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('token', token);
        var body = JSON.stringify(trip);
        console.log(body);
        var query = "/rest/trip?" + "id=" + trip._id;
        return this.http.put(query, body, { 'headers': headers })
            .toPromise().then(function (res) {
            if (res) {
                var serviceResponse = {};
                if (res.status <= 299) {
                    serviceResponse['success'] = true;
                    serviceResponse['msg'] = res.text();
                }
                else if (res.status >= 400) {
                    serviceResponse['error'] = true;
                    serviceResponse['msg'] = res.text();
                    console.log(serviceResponse);
                }
                return serviceResponse;
            }
            else
                return {};
        })
            .catch(function (res) { return _this.handleError(res); });
    };
    TripService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], TripService);
    return TripService;
})();
exports.TripService = TripService;
//# sourceMappingURL=trip.service.js.map