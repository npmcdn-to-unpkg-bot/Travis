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

    public postComment(cmForm){
        let ngForm = cmForm;

        let commentObj = {token: this.authService.getToken(), text:this.commentText, pollId: this.pollid};
        	this.pollService.postPollComment(commentObj).then(response=>{
            if(response.warn)
                this.toastr.warning("warning! " + response.msg);
            else if (response.success){

                this.toastr.success("success! " + response.msg);

                let tempComments = response.comments;
                if (tempComments){
                    console.log("we got the comments");
                    this.comments.push(tempComments.pop());
                }
                
                console.log(ngForm);
                // clearing form
                ngForm.form.controls["comment"].updateValue("");

            }
            else{
                this.toastr.error("Creating comment failed !" + response.msg);
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
