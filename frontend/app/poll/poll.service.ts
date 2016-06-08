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

var polls:Object[] = [
    {
        _id: 4,
        owner: {firstName:'Arash', imageURL:'https://pbs.twimg.com/profile_images/671726314504622082/0PqgkSEK.jpg', _id:"1234"},
        title: 'WTD in Winter',
        options: [{text: 'Moscow', vote:["1234","1234","1234"]}, {text: 'London', vote:["1234","1234","1234"]}],
        date: 'June 1',
        comments: [
            {user: {firstName:'Jen', imageURL:'http://static.tvtropes.org/pmwiki/pub/images/jenit_545.jpg', _id:"123"},text: "You should visit me if you come to London!" ,date:'June 2, 2016'},
            {user: {firstName:'Moss', imageURL:'http://static.bips.channel4.com/bips/520x390/the-it-crowd/characters/f2e6d121-d965-4a09-ab66-dbaa41290467.jpg',_id:"123"},
                text: "Go to Moscow and drink a White Russian. I want to know how to make one.", date:'June 2, 2016'}
        ]
    },
    {
        _id: 5,
        owner: {firstName:'Emma', imageURL:'https://pbs.twimg.com/profile_images/671726314504622082/0PqgkSEK.jpg', _id:"1234"},
        title: 'WWED',
        options: [{text: 'Paris', vote:["1234","1234","1234", "1", "33", "678898"]}, {text: 'Rome', vote:["1234","1234","1234"]}],
        date: 'June 6',
        comments: [{user: {firstName:'Jen', imageURL:'http://static.tvtropes.org/pmwiki/pub/images/jenit_545.jpg', _id:"123"},
            text: "You should visit me if you come to London!" ,date:'June 2, 2016'},
            {user: {firstName:'Moss', imageURL:'http://static.bips.channel4.com/bips/520x390/the-it-crowd/characters/f2e6d121-d965-4a09-ab66-dbaa41290467.jpg',_id:"123"},
                text: "Go to Moscow and drink a White Russian. I want to know how to make one.",
                date:'June 2, 2016'}
        ]
    },
    {
        _id: 5,
        owner: {
            firstName: 'Arash',
            imageURL: 'https://pbs.twimg.com/profile_images/671726314504622082/0PqgkSEK.jpg',
            _id: "1234"
        },
        title: 'June 2016 Paris or NY?',
        options: [{text: 'Paris', vote: ["1234", "1234", "1234", "3456"]}, {text: 'New York', vote: ["1234", "1234", "1234"]}],
        date: 'June 10',
        comments: [{
            user: {firstName: 'Arash', _id:"123",
            imageURL: 'http://static.tvtropes.org/pmwiki/pub/images/jenit_545.jpg'},
            text: "Great Trip!",
            date: 'June 2, 2016'
        },
            {
                user: {firstName: 'Bob', _id:"123",
                imageURL: 'https://pbs.twimg.com/profile_images/671726314504622082/0PqgkSEK.jpg'},
                text: "Go to Moscow and drink a White Russian. I want to know how to make one.",
                date: 'June 2, 2016'
            }
        ]
    },
    {
        _id: 5,
        owner: {
            firstName: 'Alex',
            imageURL: 'https://pbs.twimg.com/profile_images/671726314504622082/0PqgkSEK.jpg',
            _id: "1234"
        },
        title: 'WTD in Winter',
        options: [{text: 'Moscow', vote: ["1234"]}, {text: 'Casablanca', vote: ["1234", "1234", "1234", "23456"]}],
        date: 'March 2014',
        comments: [{
            user: {firstName: 'Arash', _id:"23456",
            imageURL: 'http://static.tvtropes.org/pmwiki/pub/images/jenit_545.jpg'},
            text: "Great Trip!",
            date: 'June 2, 2016'
        },
            {
                user: {firstName: 'Zidane', _id:"234567",
                imageURL: 'https://pbs.twimg.com/profile_images/671726314504622082/0PqgkSEK.jpg'},
                text: "Go to Moscow and drink a White Russian. I want to know how to make one.",
                date: 'June 20, 2016'
            }
        ]
    },
    {
        _id: 5,
        owner: {
            firstName: 'Rupert',
            imageURL: 'https://pbs.twimg.com/profile_images/671726314504622082/0PqgkSEK.jpg',
            _id: "1234"
        },
        title: 'WTD in Winter',
        options: [{text: 'Moscow', vote: ["1234", "1234", "1234"]}, {text: 'Casablanca', vote: ["1234", "1234", "1234", "12345", "1234555"]}],
        date: 'March 2014',
        comments: [{
            user: {firstName:"Ronaldo", _id:"7",
            imageURL: 'http://static.tvtropes.org/pmwiki/pub/images/jenit_545.jpg'},
            text: "Great Trip!",
            date: 'June 2, 2016'
        },
            {
                user: {firstName: 'Zidane', _id:"4",
                imageURL: 'https://pbs.twimg.com/profile_images/671726314504622082/0PqgkSEK.jpg'},
                text: "Go to Moscow and drink a White Russian. I want to know how to make one.",
                date: 'June 20, 2016'
            }
        ]
    },
];

@Injectable()
export class PollService {

    public getLatestPolls(){
        return new Promise<Object[]>(resolve =>
            setTimeout(()=>resolve(polls), 200) // 200m seconds
        );
    }

    public postPoll(pollObj){
        let body = JSON.stringify(pollObj);
        console.log(pollObj);
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        this.http.post("http://localhost:3000/poll/Create", body, {'headers':headers})
            .map(res => {
                console.log(res);
                let response = res.json();
                console.log(response);
            })
            .subscribe(info => {
            }, err => {
                console.error("Failed to post a poll:", err);
            });
    }

    constructor(private http:Http, private router: Router) {
    }

}