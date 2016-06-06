/**
 * Created by Arash on 05-Jun-16.
 */
/**
 * Created by Arash on 25-May-16.
 */
/*
 * Created with IntelliJ IDEA.
 * User: mfo
 * Date: 12/18/15
 * Time: 10:34 AM
 */
import {Injectable, EventEmitter} from "@angular/core";
import {Http, Headers, Response} from '@angular/http'
import 'rxjs/Rx';
import {Observable} from "rxjs/Observable";
import {Router} from '@angular/router-deprecated';
import {Poll} from "./poll.component";

var polls:Poll[] = [
    {
        id: 4,
        user: 'Roy',
        question: 'WTD in Winter',
        options: ['Moscow', 'London'],
        date: 'June 1',
        comments: [{name:'Jen', imageURL:'http://static.tvtropes.org/pmwiki/pub/images/jenit_545.jpg',text: "You should visit me if you come to London!" ,date:'June 2, 2016'},
            {name:'Moss', imageURL:'http://static.bips.channel4.com/bips/520x390/the-it-crowd/characters/f2e6d121-d965-4a09-ab66-dbaa41290467.jpg', text: "Go to Moscow and drink a White Russian. I want to know how to make one.", date:'June 2, 2016'}
        ]
    },
    {
    id: 1,
    user: 'Emma',
    question: 'WWED',
    options: ['Paris', 'Rome'],
    date: 'June 6',
    comments: []
    },
    {
        id: 2,
        user: 'Arash',
        question: 'June 2016 Paris or NY?',
        options: ['Paris', 'New York'],
        date: 'June 10',
        comments: [{name:'Arash', imageURL:'https://pbs.twimg.com/profile_images/671726314504622082/0PqgkSEK.jpg',text: "Great Trip!" ,date:'20 June 2016'},
            {name:'Bob', imageURL:'https://pbs.twimg.com/profile_images/671726314504622082/0PqgkSEK.jpg', text: "I hope you die!!" ,date:'20 June'}]
    },
    {
        id: 3,
        user: 'Alex',
        question: 'WTD in Winter',
        options: ['Moscow', 'Munich'],
        date: 'March 2014',
        comments: [{name:'Arash', imageURL:'https://pbs.twimg.com/profile_images/671726314504622082/0PqgkSEK.jpg',text: "Great Trip!" ,date:'01 June 2015'},
            {name:'Bob', imageURL:'https://pbs.twimg.com/profile_images/671726314504622082/0PqgkSEK.jpg', text: "Where is my Money!!" ,date:'20 June'}
        ]
    },
    {
        id: 4,
        user: 'Rupert',
        question: 'WTD in Winter',
        options: ['Moscow', 'Munich'],
        date: 'March 2014',
        comments: [{name:'Arash', imageURL:'https://pbs.twimg.com/profile_images/671726314504622082/0PqgkSEK.jpg',text: "Great Trip!" ,date:'01 June 2015'},
            {name:'Bob', imageURL:'https://pbs.twimg.com/profile_images/671726314504622082/0PqgkSEK.jpg', text: "Where is my Money!!" ,date:'20 June'}
        ]
    },
];

@Injectable()
export class PollService {

    public getLatestPolls(){
        return new Promise<Poll[]>(resolve =>
            setTimeout(()=>resolve(polls), 200) // 200m seconds
        );
    }

    constructor(private http:Http, private router: Router) {
    }

}