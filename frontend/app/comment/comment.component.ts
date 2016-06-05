/**
 * Created by Nadine on 6/2/16.
 */
import { Component, Input } from '@angular/core';


export class Comment{
    name:string;
    text:string;
    date:string;
    imageURL:string;
}


@Component({
    selector: 'comment',
    templateUrl: 'app/comment/comment.component.html',
    styleUrls:  ['app/comment/comment.component.css']
})

export class CommentComponent{
    @Input()
    comments: Comment[];

}
