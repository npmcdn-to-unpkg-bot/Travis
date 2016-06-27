/**
 * Created by Nadine on 6/2/16.
 */
import { Component, Injectable } from '@angular/core';
import {TripService} from '../trip/trip.service';
import {MODAL_DIRECTVES, BS_VIEW_PROVIDERS} from 'ng2-bootstrap/ng2-bootstrap';
import {SELECT_DIRECTIVES} from 'ng2-select/ng2-select';

@Component({
    selector: 'search',
    templateUrl: 'app/search/search.component.html',
    styleUrls:  ['app/search/search.component.css', 'node_modules/ng2-select/components/css/ng2-select.css'],
    viewProviders:[BS_VIEW_PROVIDERS],
    directives: [MODAL_DIRECTVES, SELECT_DIRECTIVES],
})

export class SearchComponent{

    terms: string[];
    searchModel: SearchTerm;

    constructor(private tripService: TripService) {
        this.searchModel = new SearchTerm();
    }

    public citiesArray:Array<string> = ['Amsterdam', 'Antwerp', 'Athens', 'Barcelona',
        'Berlin', 'Birmingham', 'Bradford', 'Bremen', 'Brussels', 'Bucharest',
        'Budapest', 'Cologne', 'Copenhagen', 'Dortmund', 'Dresden', 'Dublin', 'Düsseldorf',
        'Essen', 'Frankfurt', 'Genoa', 'Glasgow', 'Gothenburg', 'Hamburg', 'Hannover',
        'Helsinki', 'Leeds', 'Leipzig', 'Lisbon', 'Łódź', 'London', 'Kraków', 'Madrid',
        'Málaga', 'Manchester', 'Marseille', 'Milan', 'Munich', 'Naples', 'Palermo',
        'Paris', 'Poznań', 'Prague', 'Riga', 'Rome', 'Rotterdam', 'Seville', 'Sheffield',
        'Sofia', 'Stockholm', 'Stuttgart', 'The Hague', 'Turin', 'Valencia', 'Vienna',
        'Vilnius', 'Warsaw', 'Wrocław', 'Zagreb', 'Zaragoza', 'Aberdeen', 'Abilene', 
        'Akron', 'Albany', 'Albuquerque', 'Alexandria', 'Allentown', 'Amarillo', 'Anaheim', 
        'Anchorage', 'Ann Arbor', 'Antioch', 'Apple Valley', 'Appleton', 'Arlington', 'Arvada', 
        'Asheville', 'Athens', 'Atlanta', 'Atlantic City', 'Augusta', 'Aurora', 'Austin', 
        'Bakersfield', 'Baltimore', 'Barnstable', 'Baton Rouge', 'Beaumont', 'Bel Air', 
        'Bellevue', 'Berkeley', 'Bethlehem', 'Billings', 'Birmingham', 'Bloomington', 
        'Boise', 'Boise City', 'Bonita Springs', 'Boston', 'Boulder', 'Bradenton', 'Bremerton', 
        'Bridgeport', 'Brighton', 'Brownsville', 'Bryan', 'Buffalo', 'Burbank', 'Burlington', 
        'Cambridge', 'Canton', 'Cape Coral', 'Carrollton', 'Cary', 'Cathedral City', 'Cedar Rapids', 
        'Champaign', 'Chandler', 'Charleston', 'Charlotte', 'Chattanooga', 'Chesapeake', 'Chicago', 
        'Chula Vista', 'Cincinnati', 'Clarke County', 'Clarksville', 'Clearwater', 'Cleveland', 
        'College Station', 'Colorado Springs', 'Columbia', 'Columbus', 'Concord', 'Coral Springs', 
        'Corona', 'Corpus Christi', 'Costa Mesa', 'Dallas', 'Daly City', 'Danbury', 'Davenport', 
        'Davidson County', 'Dayton', 'Daytona Beach', 'Deltona', 'Denton', 'Denver', 'Des Moines', 
        'Detroit', 'Downey', 'Duluth', 'Durham', 'El Monte', 'El Paso', 'Elizabeth', 'Elk Grove', 
        'Elkhart', 'Erie', 'Escondido', 'Eugene', 'Evansville', 'Fairfield', 'Fargo', 'Fayetteville', 
        'Fitchburg', 'Flint', 'Fontana', 'Fort Collins', 'Fort Lauderdale', 'Fort Smith', 
        'Fort Walton Beach', 'Fort Wayne', 'Fort Worth', 'Frederick', 'Fremont', 'Fresno', 'Fullerton', 
        'Gainesville', 'Garden Grove', 'Garland', 'Gastonia', 'Gilbert', 'Glendale', 'Grand Prairie', 
        'Grand Rapids', 'Grayslake', 'Green Bay', 'GreenBay', 'Greensboro', 'Greenville', 
        'Gulfport-Biloxi', 'Hagerstown', 'Hampton', 'Harlingen', 'Harrisburg', 'Hartford',
        'Havre de Grace', 'Hayward', 'Hemet', 'Henderson', 'Hesperia', 'Hialeah', 'Hickory', 
        'High Point', 'Hollywood', 'Honolulu', 'Houma', 'Houston', 'Howell', 'Huntington', 
        'Huntington Beach', 'Huntsville', 'Independence', 'Indianapolis', 'Inglewood', 'Irvine', 
        'Irving', 'Jackson', 'Jacksonville', 'Jefferson', 'Jersey City', 'Johnson City', 'Joliet', 
        'Kailua', 'Kalamazoo', 'Kaneohe', 'Kansas City', 'Kennewick', 'Kenosha', 'Killeen', 'Kissimmee', 
        'Knoxville', 'Lacey', 'Lafayette', 'Lake Charles', 'Lakeland', 'Lakewood', 'Lancaster', 'Lansing', 
        'Laredo', 'Las Cruces', 'Las Vegas', 'Layton', 'Leominster', 'Lewisville', 'Lexington', 'Lincoln', 
        'Little Rock', 'Long Beach', 'Lorain', 'Los Angeles', 'Louisville', 'Lowell', 'Lubbock', 'Macon', 
        'Madison', 'Manchester', 'Marina', 'Marysville', 'McAllen', 'McHenry', 'Medford', 'Melbourne', 
        'Memphis', 'Merced', 'Mesa', 'Mesquite', 'Miami', 'Milwaukee', 'Minneapolis', 'Miramar', 
        'Mission Viejo', 'Mobile', 'Modesto', 'Monroe', 'Monterey', 'Montgomery', 'Moreno Valley', 
        'Murfreesboro', 'Murrieta', 'Muskegon', 'Myrtle Beach', 'Naperville', 'Naples', 'Nashua', 
        'Nashville', 'New Bedford', 'New Haven', 'New London', 'New Orleans', 'New York', 'New York City', 
        'Newark', 'Newburgh', 'Newport News', 'Norfolk', 'Normal', 'Norman', 'North Charleston', 
        'North Las Vegas', 'North Port', 'Norwalk', 'Norwich', 'Oakland', 'Ocala', 'Oceanside', 
        'Odessa', 'Ogden', 'Oklahoma City', 'Olathe', 'Olympia', 'Omaha', 'Ontario', 'Orange', 
        'Orem', 'Orlando', 'Overland Park', 'Oxnard', 'Palm Bay', 'Palm Springs', 'Palmdale', 
        'Panama City', 'Pasadena', 'Paterson', 'Pembroke Pines', 'Pensacola', 'Peoria', 'Philadelphia', 
        'Phoenix', 'Pittsburgh', 'Plano', 'Pomona', 'Pompano Beach', 'Port Arthur', 'Port Orange', 
        'Port Saint Lucie', 'Port St. Lucie', 'Portland', 'Portsmouth', 'Poughkeepsie', 'Providence', 
        'Provo', 'Pueblo', 'Punta Gorda', 'Racine', 'Raleigh', 'Rancho Cucamonga', 'Reading', 'Redding', 
        'Reno', 'Richland', 'Richmond', 'Richmond County', 'Riverside', 'Roanoke', 'Rochester', 'Rockford', 
        'Roseville', 'Round Lake Beach', 'Sacramento', 'Saginaw', 'Saint Louis', 'Saint Paul', 
        'Saint Petersburg', 'Salem', 'Salinas', 'Salt Lake City', 'San Antonio', 'San Bernardino', 
        'San Buenaventura', 'San Diego', 'San Francisco', 'San Jose', 'Santa Ana', 'Santa Barbara', 
        'Santa Clara', 'Santa Clarita', 'Santa Cruz', 'Santa Maria', 'Santa Rosa', 'Sarasota', 'Savannah', 
        'Scottsdale', 'Scranton', 'Seaside', 'Seattle', 'Sebastian', 'Shreveport', 'Simi Valley', 'Sioux City', 
        'Sioux Falls', 'South Bend', 'South Lyon', 'Spartanburg', 'Spokane', 'Springdale', 'Springfield', 
        'St. Louis', 'St. Paul', 'St. Petersburg', 'Stamford', 'Sterling Heights', 'Stockton', 'Sunnyvale', 
        'Syracuse', 'Tacoma', 'Tallahassee', 'Tampa', 'Temecula', 'Tempe', 'Thornton', 'Thousand Oaks', 
        'Toledo', 'Topeka', 'Torrance', 'Trenton', 'Tucson', 'Tulsa', 'Tuscaloosa', 'Tyler', 'Utica', 'Vallejo', 
        'Vancouver', 'Vero Beach', 'Victorville', 'Virginia Beach', 'Visalia', 'Waco', 'Warren', 'Washington', 
        'Waterbury', 'Waterloo', 'West Covina', 'West Valley City', 'Westminster', 'Wichita', 'Wilmington', 
        'Winston', 'Winter Haven', 'Worcester', 'Yakima', 'Yonkers', 'York', 'Youngstown'];

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

    private citiesValue:any = [];
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
        this.countriesValue = value;
        if (value.isEmpty == false) {
            this.searchModel.countries = value;
        }
    }
    public selectedCity(value:any):void {
        console.log('Selected value is: ', value);
    }

    public removedCity(value:any):void {
        console.log('Removed value is: ', value);
    }

    public refreshCities(value:any):void {
        this.citiesValue = value;
        if (value.isEmpty == false) {
            this.searchModel.cities = value;
        }
    }

    public itemsToString(value:Array<any> = []):string {
        return value
            .map((item:any) => {
                return item.text;
            }).join(',');
    }

    public search() {
            console.log(this.searchModel);
            this.tripService.searchForTrip(this.searchModel);
    }
}

export class SearchTerm {
    _id: number;
    owner: Object;
    month: string;
    budget: number;
    countries: [string];
    cities: [string];
    searchTerm: string;
}