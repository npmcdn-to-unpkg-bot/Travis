/**
 * Created by Nadine on 6/2/16.
 */
import {Component, Injectable} from '@angular/core';
import {CORE_DIRECTIVES} from '@angular/common';
import {TripService} from '../trip/trip.service';
import {MODAL_DIRECTVES, BS_VIEW_PROVIDERS} from 'ng2-bootstrap/ng2-bootstrap';
import {SELECT_DIRECTIVES} from 'ng2-select/ng2-select';
import {SearchComponent} from '../search/search.component';
import {SearchTerm} from '../search/search.component';
import {Trip} from "../trip/trip.component";
import {RatingComponent} from '../rating/rating.component';
import {TravisUser} from "../auth_user";
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import {AuthService} from '../auth.service';


@Component({
    selector: 'myTrips',
    templateUrl: 'app/user-management/myTrips.component.html',
    styleUrls: ['app/user-management/myTrips.component.css', 'app/search/search.component.css'],
    viewProviders: [BS_VIEW_PROVIDERS],
    directives: [MODAL_DIRECTVES, SELECT_DIRECTIVES, CORE_DIRECTIVES, RatingComponent],
})

export class MyTripsComponent {
    resultTripModel:Trip;
    trips:Trip[];
    ratingLabel:string;
    countries:[];
    token: any;

    constructor(private tripService:TripService, private authService: AuthService, public toastr: ToastsManager) {
        this.resultTripModel = new Trip();
        this.trips = [];
        this.token = this.authService.getToken();
        this.search();
    }

    public search() {
        var terms:string = "";
        this.trips = [];

        var searchResultTrips = this.tripService.getUserTrips(this.token).then(trips => {
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
                this.trips.push(tmpTrip);
                this.countriesValue = this.itemsToString(tmpTrip.countries);
                console.log(this.countriesValue);
            });
        });
    }

    public deleteTrip(trip){
        this.tripService.deleteTrip(trip, this.token).then(response =>{
            if (response.success){
                this.toastr.success(response.msg);
                this.trips.splice(this.trips.indexOf(trip), 1);
            }
            else {
                this.toastr.error("Deleting trip failed !" + response.msg);
                let msg = response.msg.toLowerCase();
                if (msg && msg.indexOf('token') >=0) {
                    setTimeout(()=>{
                        this.toastr.error("Token is not valid! Logging Out....");
                        setTimeout(()=>{
                            this.authService.doLogout();
                        },1000);
                    },2000);
                }
            }
        });
    }
    public updateTrip(trip){
        console.log(trip);
        var tmpTrip = new Trip();
        tmpTrip = trip;
        tmpTrip.countries = this.resultTripModel.countries;
        this.tripService.updateTrip(tmpTrip, this.token).then(response =>{
            if (response.success){
                this.toastr.success(response.msg);
                this.trips.splice(this.trips.indexOf(trip), 0);
            }
            else {
                this.toastr.error("Updating trip failed !" + response.msg);
                let msg = response.msg.toLowerCase();
                if (msg && msg.indexOf('token') >=0) {
                    setTimeout(()=>{
                        this.toastr.error("Token is not valid! Logging Out....");
                        setTimeout(()=>{
                            this.authService.doLogout();
                        },1000);
                    },2000);
                }
            }
        });
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
        'United Arab Emirates', 'United Kingdom', 'Uruguay', 'Uzbekistan', 'Venezuela', 'Vietnam',
        'Virgin Islands (US)', 'Yemen', 'Zambia', 'Zimbabwe'];

    private countriesValue
    :any = "";

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
        this.countriesValue = this.itemsToString(value);
        console.log('Refreshing values: ', value);
        if (value.length > 0) {
            this.resultTripModel.countries = this.countriesValue.split(', ');
        } else {
            this.resultTripModel.countries = "";
        }
    }

    public itemsToString(value:Array<any> = []):string {
        return value
            .map((item:any) => {
                return item.text;
            }).join(', ');
    }
}
