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
        this.countriesArray = ['Afghanistan', 'Albania', 'Algeria', 'Andorra', 'Angola', 'Anguilla',
            'Antigua & Barbuda', 'Argentina', 'Armenia', 'Aruba', 'Australia', 'Austria', 'Azerbaijan', 'Bahamas',
            'Bahrain', 'Bangladesh', 'Barbados', 'Belarus', 'Belgium', 'Belize', 'Benin', 'Bermuda', 'Bhutan',
            'Bolivia', 'Bosnia & Herzegovina', 'Botswana', 'Brazil', 'British Virgin Islands', 'Brunei',
            'Bulgaria', 'Burkina Faso', 'Burundi', 'Cambodia', 'Cameroon', 'Cape Verde', 'Cayman Islands',
            'Chad', 'Chile', 'China', 'Colombia', 'Congo', 'Cook Islands', 'Costa Rica', 'Cote D Ivoire',
            'Croatia', 'Cruise Ship', 'Cuba', 'Cyprus', 'Czech Republic', 'Denmark', 'Djibouti', 'Dominica',
            'Dominican Republic', 'Ecuador', 'Egypt', 'El Salvador', 'Equatorial Guinea', 'Estonia', 'Ethiopia',
            'Falkland Islands', 'Faroe Islands', 'Fiji', 'Finland', 'France', 'French Polynesia', 'French West Indies',
            'Gabon', 'Gambia', 'Georgia', 'Germany', 'Ghana', 'Gibraltar', 'Greece', 'Greenland', 'Grenada',
            'Guam', 'Guatemala', 'Guernsey', 'Guinea', 'Guinea Bissau', 'Guyana', 'Haiti', 'Honduras',
            'Hong Kong', 'Hungary', 'Iceland', 'India', 'Indonesia', 'Iran', 'Iraq', 'Ireland', 'Isle of Man',
            'Israel', 'Italy', 'Jamaica', 'Japan', 'Jersey', 'Jordan', 'Kazakhstan', 'Kenya', 'Kuwait',
            'Kyrgyz Republic', 'Laos', 'Latvia', 'Lebanon', 'Lesotho', 'Liberia', 'Libya', 'Liechtenstein',
            'Lithuania', 'Luxembourg', 'Macau', 'Macedonia', 'Madagascar', 'Malawi', 'Malaysia', 'Maldives',
            'Mali', 'Malta', 'Mauritania', 'Mauritius', 'Mexico', 'Moldova', 'Monaco', 'Mongolia', 'Montenegro',
            'Montserrat', 'Morocco', 'Mozambique', 'Namibia', 'Nepal', 'Netherlands', 'Netherlands Antilles',
            'New Caledonia', 'New Zealand', 'Nicaragua', 'Niger', 'Nigeria', 'Norway', 'Oman', 'Pakistan',
            'Palestine', 'Panama', 'Papua New Guinea', 'Paraguay', 'Peru', 'Philippines', 'Poland', 'Portugal',
            'Puerto Rico', 'Qatar', 'Reunion', 'Romania', 'Russia', 'Rwanda', 'Saint Pierre & Miquelon', 'Samoa',
            'San Marino', 'Satellite', 'Saudi Arabia', 'Senegal', 'Serbia', 'Seychelles', 'Sierra Leone',
            'Singapore', 'Slovakia', 'Slovenia', 'South Africa', 'South Korea', 'Spain', 'Sri Lanka', 'St Kitts & Nevis',
            'St Lucia', 'St Vincent', 'St. Lucia', 'Sudan', 'Suriname', 'Swaziland', 'Sweden', 'Switzerland',
            'Syria', 'Taiwan', 'Tajikistan', 'Tanzania', 'Thailand', 'Timor L\'Este', 'Togo', 'Tonga',
            'Trinidad & Tobago', 'Tunisia', 'Turkey', 'Turkmenistan', 'Turks & Caicos', 'Uganda', 'Ukraine',
            'United Arab Emirates', 'United Kingdom', 'Uruguay', 'Uzbekistan', 'Venezuela', 'Vietnam',
            'Virgin Islands (US)', 'Yemen', 'Zambia', 'Zimbabwe'];
        this.countriesValue = "";
        this.disabled = false;
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
                _this.countriesValue = _this.itemsToString(tmpTrip.countries);
                console.log(_this.countriesValue);
            });
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
    MyTripsComponent.prototype.updateTrip = function (trip) {
        var _this = this;
        console.log(trip);
        var tmpTrip = new trip_component_1.Trip();
        tmpTrip = trip;
        tmpTrip.countries = this.resultTripModel.countries;
        this.tripService.updateTrip(tmpTrip, this.token).then(function (response) {
            if (response.success) {
                _this.toastr.success(response.msg);
                _this.trips.splice(_this.trips.indexOf(trip), 0);
            }
            else {
                _this.toastr.error("Updating trip failed !" + response.msg);
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
    Object.defineProperty(MyTripsComponent.prototype, "disabledV", {
        get: function () {
            return this._disabledV;
        },
        set: function (value) {
            this._disabledV = value;
            this.disabled = this._disabledV === '1';
        },
        enumerable: true,
        configurable: true
    });
    MyTripsComponent.prototype.selectedCountry = function (value) {
        console.log('Selected value is: ', value);
    };
    MyTripsComponent.prototype.removedCountry = function (value) {
        console.log('Removed value is: ', value);
    };
    MyTripsComponent.prototype.refreshCountries = function (value) {
        this.countriesValue = this.itemsToString(value);
        console.log('Refreshing values: ', value);
        if (value.length > 0) {
            this.resultTripModel.countries = this.countriesValue.split(', ');
        }
        else {
            this.resultTripModel.countries = "";
        }
    };
    MyTripsComponent.prototype.itemsToString = function (value) {
        if (value === void 0) { value = []; }
        return value
            .map(function (item) {
            return item.text;
        }).join(', ');
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
})();
exports.MyTripsComponent = MyTripsComponent;
//# sourceMappingURL=myTrips.component.js.map