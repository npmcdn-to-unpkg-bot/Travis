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
    poll_id:String;

    commentText:String;

    constructor(private authService: AuthService, private pollService: PollService, public toastr: ToastsManager) {
    }

    public postComment(){
        console.log(this.commentText);
        let commentObj = {token: this.authService.getToken(), text:this.commentText, pollId:this.poll_id};

    }
}
