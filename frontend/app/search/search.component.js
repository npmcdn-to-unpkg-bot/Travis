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
var router_deprecated_1 = require("@angular/router-deprecated");
var rating_component_1 = require('../rating/rating.component');
var SearchComponent = (function () {
    function SearchComponent(tripService, params) {
        this.tripService = tripService;
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
        // private countriesValue
        // :any = [];
        this.disabled = false;
        this.searchModel = new SearchTerm();
        this.searchModel.searchTerm = params.get('searchTerm');
        this.resultTripModel = new trip_component_1.Trip();
        this.trips = [];
        this.search();
    }
    Object.defineProperty(SearchComponent.prototype, "disabledV", {
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
    SearchComponent.prototype.selectedCountry = function (value) {
        console.log('Selected value is: ', value);
    };
    SearchComponent.prototype.removedCountry = function (value) {
        console.log('Removed value is: ', value);
    };
    SearchComponent.prototype.refreshCountries = function (value) {
        // this.countriesValue = value;
        if (value.length > 0) {
            this.searchModel.countries = this.itemsToString(value);
        }
        else {
            this.searchModel.countries = "";
        }
    };
    SearchComponent.prototype.itemsToString = function (value) {
        if (value === void 0) { value = []; }
        return value
            .map(function (item) {
            return item.text;
        }).join(', ');
    };
    SearchComponent.prototype.search = function () {
        var _this = this;
        var searchModel = this.searchModel;
        var terms = "";
        if (searchModel.searchTerm && typeof searchModel.searchTerm == 'string') {
            terms = searchModel.searchTerm;
            searchModel.searchTerm = terms.replace(/\s/g, ", ");
        }
        this.trips = [];
        var searchResultTrips = this.tripService.searchForTrip(searchModel).then(function (trips) {
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
        this.searchModel.searchTerm = terms.replace(", ", /\s/g);
    };
    SearchComponent.prototype.ratingComponetClick = function (clickObj, trip) {
        var _this = this;
        trip.rating = clickObj.rating;
        var rating = this.tripService.rateTrip(trip).then(function (rating) {
            trip.rating = rating.value;
            _this.resultTripModel.rating = trip.rating;
            _this.ratingLabel = rating.numRates;
        });
    };
    SearchComponent = __decorate([
        core_1.Component({
            selector: 'search',
            templateUrl: 'app/search/search.component.html',
            styleUrls: ['app/search/search.component.css', 'ng2-select/components/css/ng2-select.css'],
            viewProviders: [ng2_bootstrap_1.BS_VIEW_PROVIDERS],
            directives: [ng2_bootstrap_1.MODAL_DIRECTVES, ng2_select_1.SELECT_DIRECTIVES, common_1.CORE_DIRECTIVES, rating_component_1.RatingComponent],
        }), 
        __metadata('design:paramtypes', [trip_service_1.TripService, router_deprecated_1.RouteParams])
    ], SearchComponent);
    return SearchComponent;
})();
exports.SearchComponent = SearchComponent;
var SearchTerm = (function () {
    function SearchTerm() {
    }
    return SearchTerm;
})();
exports.SearchTerm = SearchTerm;
//# sourceMappingURL=search.component.js.map