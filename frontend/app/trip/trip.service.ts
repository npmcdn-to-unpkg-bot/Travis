import {Injectable, EventEmitter} from "@angular/core";
import {Http, Headers, Response} from '@angular/http'
import {Trip} from "./trip.component";

@Injectable()
export class TripService {

    constructor(private http:Http) {
    }

    public createTrip(trip:Trip) {
        let body = JSON.stringify(trip);
        console.log(trip);
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.post("/rest/trip", body, {'headers': headers})
            .timeout(8000, new Error('server timeout exceeded! could not create a new Trip'))
            .toPromise().then(res => {
                if (res) {
                    let serviceResponse = {};
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
                else return {};
            })
            .catch(res => this.handleError(res));
    }

    private handleError(res:any) {
        if (res.status >= 400) {
            let serviceResponse = {};
            serviceResponse['error'] = true;
            serviceResponse['msg'] = res.text();
            console.log(serviceResponse);
            return serviceResponse;
        } else {
            let error = res;
            let errMsg = (error.message) ? error.message :
                error.status ? `${error.status} - ${error.statusText}` : 'Server error';
            console.error(errMsg); // log to console instead
            return {
                error: true,
                msg: "server did not respond!"
            };
            //return Observable.throw(errMsg);
        }
    }

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
        if (searchTerm.owner)
            query = query + "owner=" + searchTerm.owner;
        console.log("Searching for trips, query: " + query);

        return this.http.get(query, {'headers': headers})
            .toPromise().then(res => {
                if (res) {
                    let serviceResponse = {};
                    if (res.status <= 299)
                        serviceResponse = res.json();
                    else if (res.status >= 400) {
                        serviceResponse['error'] = true;
                        serviceResponse['msg'] = res.text();
                        console.log(serviceResponse);
                    }
                    return serviceResponse;
                }
                else return {};
            }).catch(res => this.handleError(res));
    }

    public getUserTrips(token) {
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('token', token);

        var query = "/rest/trip/getUserTrips";

        return this.http.get(query, {'headers': headers})
            .toPromise().then(res => {
                if (res) {
                    let serviceResponse = {};
                    if (res.status <= 299)
                        serviceResponse = res.json();
                    else if (res.status >= 400) {
                        serviceResponse['error'] = true;
                        serviceResponse['msg'] = res.text();
                        console.log(serviceResponse);
                    }
                    return serviceResponse;
                }
                else return {};
            }).catch(res => this.handleError(res));
    }

    public searchForMoreTrips(searchTerm) {
        var headers = new Headers();
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

        return this.http.get(query, {'headers': headers})
            .toPromise().then(res => {
                if (res) {
                    let serviceResponse = {};
                    if (res.status <= 299)
                        serviceResponse = res.json();
                    else if (res.status >= 400) {
                        serviceResponse['error'] = true;
                        serviceResponse['msg'] = res.text();
                        console.log(serviceResponse);
                    }
                    return serviceResponse;
                }
                else return {};
            }).catch(res => this.handleError(res));
    }

    public rateTrip(trip) {
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        var query = "/rest/trip/rate";
        let body = JSON.stringify(trip);
        return this.http.put(query, body, {'headers': headers})
            .toPromise().then(res => {
                if (res) {
                    let response = JSON.parse(res._body);
                    return response.rating;
                } else return {};
            }).catch(this.handleError);
    }

    public deleteTrip(trip, token) {
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('token', token);

        var url = "/rest/trip?" + "id=" + trip._id;
        return this.http.delete(url, {'headers': headers})
            .toPromise().then(res => {
                if (res) {
                    let serviceResponse = {};
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
                else return {};
            })
            .catch(res => this.handleError(res));
    }
    public updateTrip(trip:Trip, token) {
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('token', token);
        let body = JSON.stringify(trip);
        console.log(body);
        var query = "/rest/trip?" + "id=" + trip._id;
        return this.http.put(query, body, {'headers': headers})
            .toPromise().then(res => {
                if (res) {
                    let serviceResponse = {};
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
                else return {};
            })
            .catch(res => this.handleError(res));
    }
}
