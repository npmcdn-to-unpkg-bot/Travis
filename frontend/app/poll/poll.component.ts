/**
 * Created by Nadine on 6/2/16.
 */
import { Component, Injectable } from '@angular/core';

import { POLLS } from './mockPolls';

declare var FB: any;

@Component({
    selector: 'pollItem',
    templateUrl: 'app/poll/poll.component.html',
    styleUrls:  ['app/poll/poll.component.css']
})
export class PollComponent{
   

}
polls: Poll[];

@Injectable()
export class PollService {
    getPolls() {
        return polls;
    }
}