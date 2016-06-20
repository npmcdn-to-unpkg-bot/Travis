/**
 * Created by Nadine on 6/2/16.
 */
import { Component, Injectable } from '@angular/core';
import {TripService} from './trip.service';
import {MODAL_DIRECTVES, BS_VIEW_PROVIDERS,
    PROGRESSBAR_DIRECTIVES} from 'ng2-bootstrap/ng2-bootstrap';

@Component({
    selector: 'trip',
    templateUrl: 'app/trip/trip.component.html',
    styleUrls:  ['app/trip/trip.component.css'],
    viewProviders:[BS_VIEW_PROVIDERS],
    directives: [MODAL_DIRECTVES],
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

}

export class Trip {
    _id: number;
    owner: Object;
    title: string;
    dateFrom: string;
    dateTo: string;
    budget: number;
    route: string;
    description: string;
    
    comments: Object[];
}