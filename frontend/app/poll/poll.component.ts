/**
 * Created by Nadine on 6/2/16.
 */
import { Component, Injectable,OnInit } from '@angular/core';
import {CORE_DIRECTIVES} from '@angular/common';
import {MODAL_DIRECTVES, BS_VIEW_PROVIDERS,Ng2BootstrapConfig, Ng2BootstrapTheme,
    PROGRESSBAR_DIRECTIVES} from 'ng2-bootstrap/ng2-bootstrap';
import { NgForm}    from '@angular/common';
import { CommentComponent } from '../comment/comment.component';
import {PollService} from './poll.service'
import {AuthService} from '../auth.service';

export class Option{
    text: string;
    vote = [];
}

export class Poll {
    _id: number;
    owner: Object;
    title: string;
    options: Option[];
    date: string;
    comments: Object[];

    public isUserVoted(userId:string){
        this.options.map(option =>{
            option.vote.map( v =>{
                if(userId == v)
                    return option.text;
            });
        });
        return false;
    }

    public getVotes(currentOp:string){
        let votes = 0;
        console.log("getting votes for option ");
        console.log(currentOp);
        this.options.map(tempOp =>{
           console.log(tempOp.text);
            if (tempOp.text == currentOp){
               votes = tempOp.vote.length;
           }
        });
        console.log("votes: " + votes);
        return votes;
    }

    public getVotesPercentage(option:string){
        let votes = this.getVotes(option);
        return 100 * votes / this.getNumOfVotes();
    }


    public getNumOfVotes(){
        let votes = 0;
        this.options.map(tempOp =>{
            votes += tempOp.vote.length;
        });
        console.log("number of votes for " + this.title + " is: " + votes);
        return votes;
    }

}

export class pollForm {
    public title: string;
    public options: string;
}


@Component({
    selector: 'pollItem',
    templateUrl: 'app/poll/poll.component.html',
    viewProviders:[BS_VIEW_PROVIDERS],
    directives: [MODAL_DIRECTVES, CommentComponent,PROGRESSBAR_DIRECTIVES, CORE_DIRECTIVES],
    styleUrls:  ['app/poll/poll.component.css'],
})

export class PollComponent implements OnInit{
    polls:Poll[];
    pollModel:pollForm;
    userId:string;

    constructor(private authService: AuthService, private pollService: PollService) {
        this.pollModel = new pollForm();
        this.polls = [];
        this.userId = localStorage.getItem('user') != undefined ? localStorage.getItem('user')['_id'] : "";
    }

    getBarType(){
        let states = ["success","info", "warning", "danger"];
        return states[Math.floor((Math.random() * 4))];
    }

    submitPoll(){
        // for creating a poll
        let options = this.pollModel.options.split('\n');
        let validOptions = [];
        options.map(option =>{
            if (option != "" && option != null)
                validOptions.push(option);
        });
        let pollObj = {token: localStorage.getItem('token'), title:this.pollModel.title, options:validOptions};
        this.pollService.postPoll(pollObj);
    }

    ngOnInit() {
        console.log(`OnInit poll component`);
        this.getPolls();
    }

    private getPolls(){
            this.pollService.getLatestPolls().then(polls => {
                polls.map(poll=>{
                    let tempPoll = new Poll();
                    tempPoll.owner =  poll['owner'];
                    tempPoll.title = poll['title'];
                    tempPoll.options = poll['options'];
                    tempPoll.date =  poll['date'];
                    tempPoll.comments =  poll['comments'];

                    this.polls.push(tempPoll);
                });

            });
    }

}
