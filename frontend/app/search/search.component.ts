/**
 * Created by Nadine on 6/2/16.
 */
import {Component, Injectable} from '@angular/core';
import {CORE_DIRECTIVES} from '@angular/common';
import {TripService} from '../trip/trip.service';
import {MODAL_DIRECTVES, BS_VIEW_PROVIDERS,
    Ng2BootstrapConfig, Ng2BootstrapTheme} from 'ng2-bootstrap/ng2-bootstrap';
import {SELECT_DIRECTIVES} from 'ng2-select/ng2-select';
import {TripComponent} from '../trip/trip.service';
import {Trip} from "../trip/trip.component";
import {RouteParams} from "@angular/router-deprecated";
import {RatingComponent} from '../rating/rating.component';

@Component({
    selector: 'search',
    templateUrl: 'app/search/search.component.html',
    styleUrls: ['app/search/search.component.css', 'ng2-select/components/css/ng2-select.css'],
    viewProviders: [BS_VIEW_PROVIDERS],
    directives: [MODAL_DIRECTVES, SELECT_DIRECTIVES, CORE_DIRECTIVES, RatingComponent],
})

export class SearchComponent {

    searchModel:SearchTerm;
    resultTripModel:Trip;
    trips:Trip[];
    ratingLabel:string;
    tripOwnerName: string;

    constructor(private tripService:TripService, params: RouteParams) {
        this.searchModel = new SearchTerm();
        this.searchModel.searchTerm = params.get('searchTerm');
        this.resultTripModel = new Trip();
        this.trips = [];
        this.search();
    }

    public countriesArray:Array<string> = ['Afghanistan', 'Albania', 'Algeria', 'Andorra', 'Angola', 'Anguilla',
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
        'United Arab Emirates', 'United Kingdom', 'Uruguay', 'Uzbekistan', 'USA', 'Venezuela', 'Vietnam',
        'Virgin Islands (US)', 'Yemen', 'Zambia', 'Zimbabwe'];

    // private countriesValue
    // :any = [];

    private disabled:boolean = false;

    private get disabledV():string {
        return this._disabledV;
    }

    private set disabledV(value:string) {
        this._disabledV = value;
        this.disabled = this._disabledV === '1';
    }

    public selectedCountry(value:any):void {
        console.log('Selected value is: ', value);
    }

    public removedCountry(value:any):void {
        console.log('Removed value is: ', value);
    }

    public refreshCountries(value:any):void {
        // this.countriesValue = value;
        if (value.length > 0) {
            this.searchModel.countries = this.itemsToString(value);
        } else {
            this.searchModel.countries = "";
        }
    }

    public itemsToString(value:Array<any> = []):string {
        return value
            .map((item:any) => {
                return item.text;
            }).join(', ');
    }

    public search() {
        var searchModel = this.searchModel;
        var terms:string = "";
        if (searchModel.searchTerm && typeof searchModel.searchTerm == 'string') {
            terms = searchModel.searchTerm;
            searchModel.searchTerm = terms.replace(/\s/g, ", ");
        }
        this.trips = [];
        var searchResultTrips = this.tripService.searchForTrip(searchModel).then(trips => {
            console.log(trips);
            trips.map(trip => {
                let tmpTrip = new Trip();
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
                tmpTrip.pictures = trip['pictures'];
                tmpTrip.rating = trip['rating.value'];
                tmpTrip._id = trip['_id'];
                console.log("######");
                console.log(trip);
                console.log(tmpTrip);
                this.trips.push(tmpTrip);
            });
        });
        this.searchModel.searchTerm = terms.replace(", ",/\s/g);
    }
    ratingComponetClick(clickObj: any, trip:Trip): void {
        trip.rating = clickObj.rating;
        var rating = this.tripService.rateTrip(trip).then(rating => {
            trip.rating = rating.value;
            this.resultTripModel.rating = trip.rating;
            this.ratingLabel = rating.numRates;
        });
    }
    public loadMoreTrips() {
        var searchModel = this.searchModel;
        var terms:string = "";
        if (searchModel.searchTerm && typeof searchModel.searchTerm == 'string') {
            terms = searchModel.searchTerm;
            searchModel.searchTerm = terms.replace(/\s/g, ", ");
        }
        var searchResultTrips = this.tripService.searchForMoreTrips(searchModel).then(trips => {
            trips.map(trip => {
                let tmpTrip = new Trip();
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
                tmpTrip.pictures = trip['pictures'];

                this.trips.push(tmpTrip);
            });
        });
        this.searchModel.searchTerm = terms.replace(", ",/\s/g);
    }

    public isRouteString(routeStr){
        if(routeStr){
            if (routeStr[0] == 'h' && routeStr[1] == 't' && routeStr[2] == 't' && routeStr[3] == 'p')
                return true;
            else
                return false;
        }else
            return true;
    }

}

export class SearchTerm {
    _id:number;
    owner:Object;
    dateFrom: string;
    dateTo: string;
    budget:number;
    countries:[string];
    cities:[string];
    searchTerm:string;
}