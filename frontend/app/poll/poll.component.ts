/**
 * Created by Nadine on 6/2/16.
 */
import { Component, Injectable } from '@angular/core';
import {MODAL_DIRECTVES, BS_VIEW_PROVIDERS} from 'ng2-bootstrap/ng2-bootstrap';
import { CommentComponent } from '../comment/comment.component';

export class Poll {
    id: number;
    userID: string;
    question: string;
    answerList: string[];
    date: string;
    comments: string[];
}


@Component({
    selector: 'pollItem',
    templateUrl: 'app/poll/poll.component.html',
    viewProviders:[BS_VIEW_PROVIDERS],
    directives: [MODAL_DIRECTVES, CommentComponent],
    styleUrls:  ['app/poll/poll.component.css'],
})

export class PollComponent{
    poll: Poll = {
        id: 1,
        userID: '12345',
        question: 'WWED',
        answerList: ['Paris', 'Rome'],
        date: 'June 6',
        comments: []
    };
}
