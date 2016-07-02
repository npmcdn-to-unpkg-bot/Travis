import {Injectable, EventEmitter} from "@angular/core";
import {Http, Headers, Response} from '@angular/http'
import {Trip} from "./trip.component";

@Injectable()
export class TripService {

    public createTrip(trip:Trip) {
        let body = JSON.stringify(trip);
        console.log(trip);
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        this.http.post("/rest/trip", body, {'headers': headers})
            .map(res => {
                console.log(res);
                let response = res.json();
                console.log(response);
                alert(response);
            })
            .subscribe(info => {
            }, err => {
                console.error("Failed to post a trip:", err);
            });
    }
    
    constructor(private http:Http) {    }

    public searchForTrip(searchTerm) {
        var headers = new Headers();
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

        return this.http.get(query, {'headers': headers})
            .toPromise().then(res => {
                if (res)
                    return res.json();
                else return {};
            }).catch(this.handleError);
    }
}