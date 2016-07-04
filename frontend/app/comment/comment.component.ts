/**
 * Created by Nadine on 6/2/16.
 */
import { Component, Input } from '@angular/core';
import {PollService} from '../poll/poll.service'
import {AuthService} from '../auth.service';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';


export class Comment{


    user:Object;
    text:string;
    date:string;

}


@Component({
    selector: 'comment',
    templateUrl: 'app/comment/comment.component.html',
    styleUrls:  ['app/comment/comment.component.css']
})

export class CommentComponent{
    @Input()
    comments: Comment[];
    @Input()
    pollid:String;

    commentText:String;

    constructor(private authService: AuthService, private pollService: PollService, public toastr: ToastsManager) {
    }

    public postComment(){

        let commentObj = {token: this.authService.getToken(), text:this.commentText, pollid: this.pollid};
        	this.pollService.postPollComment(commentObj);
        	
    }
}
