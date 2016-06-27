/**
 * Created by Nadine on 6/2/16.
 */
import { Component, Injectable } from '@angular/core';
import {TripService} from './trip.service';
import {MODAL_DIRECTVES, BS_VIEW_PROVIDERS} from 'ng2-bootstrap/ng2-bootstrap';
import {SELECT_DIRECTIVES} from 'ng2-select/ng2-select';

@Component({
    selector: 'trip',
    templateUrl: 'app/trip/trip.component.html',
    styleUrls:  ['app/trip/trip.component.css', 'node_modules/ng2-select/components/css/ng2-select.css'],
    viewProviders:[BS_VIEW_PROVIDERS],
    directives: [MODAL_DIRECTVES, SELECT_DIRECTIVES],
})

export class TripComponent{

    trips:Trip[];
    tripModel: Trip;

    constructor(private tripService: TripService) {
        this.tripModel = new Trip();
    }

    createTrip(){
        console.log(this.tripModel);
        this.tripService.createTrip(this.tripModel);
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

    private countriesValue:any = [];

    private _disabledV:string = '0';
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
        console.log("refreshCountries");
        console.log(value);
        if (value.length > 0)
        {
            this.countriesValue = value;
            this.tripModel.countries = value;
        }
    }
}

export class Trip {
    _id: number;
    owner: Object;
    title: string;
    dateFrom: string;
    dateTo: string;
    budget: number;
    route: string;
    cities: string;
    countries: [string];
    tags: string;
    description: string;

    comments: Object[];
}