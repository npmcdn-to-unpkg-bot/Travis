/**
 * Created by Nadine on 6/2/16.
 */
import { Component, Injectable,OnInit } from '@angular/core';
import {MODAL_DIRECTVES, BS_VIEW_PROVIDERS} from 'ng2-bootstrap/ng2-bootstrap';
import { CommentComponent } from '../comment/comment.component';
import {PollService} from './poll.service'
import {AuthService} from '../auth.service';

export class Poll {
    id: number;
    user: string;
    question: string;
    options: string[];
    date: string;
    comments: Object[];
}


@Component({
    selector: 'pollItem',
    templateUrl: 'app/poll/poll.component.html',
    viewProviders:[BS_VIEW_PROVIDERS],
    directives: [MODAL_DIRECTVES, CommentComponent],
    styleUrls:  ['app/poll/poll.component.css'],
})

export class PollComponent implements OnInit{
    polls:Poll[];

    constructor(private authService: AuthService, private pollService: PollService) {
    }


    ngOnInit() {
        console.log(`OnInit poll component`);
        this.getPolls();
    }

    private getPolls(){
            this.pollService.getLatestPolls().then(polls => this.polls = polls);
    }

}
