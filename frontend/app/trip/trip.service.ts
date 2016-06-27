import {Injectable, EventEmitter} from "@angular/core";
import {Http, Headers, Response} from '@angular/http'

@Injectable()
export class TripService {

    public createTrip(trip) {
        let body = JSON.stringify(trip);
        console.log(trip);
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        this.http.post("http://localhost:3000/rest/trip", body, {'headers': headers})
            .map(res => {
                console.log(res);
                let response = res.json();
                console.log(response);
            })
            .subscribe(info => {
            }, err => {
                console.error("Failed to post a trip:", err);
            });
    }

    constructor(private http:Http) {
    }

    public searchForTrip(searchTerm) {
        console.log("Searching for trips ...");
        console.log(searchTerm);
        let body = JSON.stringify(searchTerm);
        console.log(body);
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');

        this.http.get("http://localhost:3000/rest/trip/search", {'headers': headers})
            .map(res => {
                console.log(res);
                let response = res.json();
                console.log(response);
            })
            .subscribe(info => {
            }, err => {
                console.error("Failed to post a trip:", err);
            });
    }
}