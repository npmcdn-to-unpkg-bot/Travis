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
import { ToastsManager } from 'ng2-toastr/ng2-toastr';


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
    selectedOption: string;

    public isUserVoted(userId:string){
        let found = false;
        this.options.map(option =>{
            option.vote.map( v =>{
                console.log(v);
                console.log(userId);
                if(userId == v)
                    found =  option.text;
            });
        });

        return found;
    }

    public getVotes(currentOp:string){
        let votes = 0;
        this.options.map(tempOp =>{
           if (tempOp.text == currentOp){
               votes = tempOp.vote.length;
           }
        });
        return votes;
    }

    //front end only
    public upVoteOption(text:string){
        let userId = JSON.parse(localStorage.getItem('user'))["_id"];

        this.options.map(tempOp =>{
            if (tempOp.text == text){
                tempOp.vote.push(userId);
            }
        });
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

    constructor(private authService: AuthService, private pollService: PollService, public toastr: ToastsManager) {
        this.pollModel = new pollForm();
        this.polls = [];
        this.userId = localStorage.getItem('user') != undefined ? localStorage.getItem('user')['_id'] : "";
    }

    getBarType(id:number){
        let type = id % 4;
        let states = ["success","info", "warning", "danger"];
        return states[type];
    }


    submitPoll(submitedForm, pollModal){
        let ngForm = submitedForm;
        let pollModal = pollModal;

        try{
        // for creating a poll
        let options = this.pollModel.options.split('\n');
        let validOptions = [];
        options.map(option =>{
            if (option != "" && option != null)
                validOptions.push(option);
        });
        let pollObj = {token: this.authService.getToken(), title:this.pollModel.title, options:validOptions};

            this.pollService.postPoll(pollObj).then(response=>{
                if(response.warn)
                    this.toastr.warning("warning! " + response.msg);
                else if (response.success){

                    pollModal.hide();

                    this.toastr.success("Successfully created a new poll!");


                    console.log("\n RESPONSE \n");
                    console.log(response.poll);

                    let tempPoll = new Poll();
                    let poll = response.poll;

                    tempPoll.owner =  poll['owner'];
                    console.log(tempPoll.owner);
                    tempPoll.title = poll['title'];
                    tempPoll.options = poll['options'];
                    tempPoll.date =  this.formatDate(poll['date']);
                    tempPoll.comments = poll['comments'];
                    tempPoll._id = poll['_id'];

                    this.polls.unshift(tempPoll);

                    this.pollModel = new pollForm();

                    // clearing form
                    ngForm.form.controls["title"].updateValue("");
                    ngForm.form.controls["title"]['_pristine'] = true;
                    ngForm.form.controls["pollOptions"].updateValue("");
                    ngForm.form.controls["pollOptions"]['_pristine'] = true;
                }
                else{
                    this.toastr.error("Creating poll failed !" + response.msg);
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

        } catch (err) {
            console.log(err);
            this.toastr.error("posting the polls failed!");
        }
    }

    ngOnInit() {
        console.log(`OnInit poll component`);
        this.getPolls();
    }

    private getPolls(){
        this.polls = [];
        try{
            let token = this.authService.getToken();
            this.pollService.getLatestPolls(token).then(response => {
                if (!response.error){
                    let polls = response;
                    polls.map(poll=>{
                        let tempPoll = new Poll();
                        tempPoll.owner =  poll['owner'];
                        tempPoll.title = poll['title'];
                        tempPoll.options = poll['options'];
                        tempPoll.date =  this.formatDate(poll['date']);
                        tempPoll.comments = poll['comments'];
                        tempPoll._id = poll['_id'];
                        if (tempPoll.comments){
                            tempPoll.comments.map(comment =>{
                                comment.date = this.formatDate(comment.date);
                            });
                        }

                        this.polls.push(tempPoll);

                    });
                    console.log(polls);
                }else{
                    this.toastr.error("Getting the polls failed " + response.msg);
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
        } catch (err){
            this.toastr.error("getting the polls failed!");
        }

    }

    private formatDate(dateStr): string{
        let options = {
            year: "numeric", month: "short",
            day: "numeric", hour: "2-digit", minute: "2-digit"
        };
        var temp_date = new Date(dateStr);
        return temp_date.toLocaleTimeString("en-us", options);
    }

    public setPollVote(pollIndex, voteIndex){
        this.polls[pollIndex].selectedOption = this.polls[pollIndex].options[voteIndex].text;
        console.log("selected " + this.polls[pollIndex].options[voteIndex].text);
    }

    public submitVote(poll,  pollIndex){
        let votingPoll = this.polls[pollIndex];

        let userId = JSON.parse(localStorage.getItem('user'))["_id"];
        let preVote = this.polls[pollIndex].isUserVoted(userId);
        if(preVote){

            alert("You can't vote twice! you already voted for " + preVote);
            return;
        }

        if(! this.polls[pollIndex].selectedOption){
            alert("You should choose an option before voting");
            return;
        }

        try{
            // for creating a poll
            let voteObj = {token: this.authService.getToken(), poll_id:votingPoll._id,
                option:votingPoll.selectedOption};

            this.pollService.postPollVote(voteObj).then(response=>{
                if(response.warn)
                    this.toastr.warning("warning! " + response.msg);
                else if (response.success){

                    this.toastr.success("success! " + response.msg);

                    this.polls[pollIndex].upVoteOption(this.polls[pollIndex].selectedOption);
                }
                else{
                    this.toastr.error("voting to poll failed !" + response.msg);
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

        } catch (err){
            console.log(err);
            this.toastr.error("posting the polls failed!");
        }
    }


}
