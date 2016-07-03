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
    searchUserTripsModel:SearchTerm;
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
            });
        });
    }

    ratingComponetClick(clickObj: any, trip:Trip): void {
        trip.rating = clickObj.rating;
        var rating = this.tripService.rateTrip(trip).then(rating => {
            trip.rating = rating.value;
            this.resultTripModel.rating = trip.rating;
            this.ratingLabel = rating.numRates;
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
}
