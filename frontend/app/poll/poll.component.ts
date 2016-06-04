/**
 * Created by Nadine on 6/2/16.
 */
import { Component, Injectable } from '@angular/core';
import {MODAL_DIRECTVES, BS_VIEW_PROVIDERS} from 'ng2-bootstrap/ng2-bootstrap';
//
// export class Poll {
//     id: number;
//     user: string;
//     question: string;
// }
//
// poll: Poll = {
//     id: 1,
//     user: 'Emma',
//     question: 'WWED'
// };

// import { POLLS } from './poll/mockPolls';

@Component({
    selector: 'pollItem',
    templateUrl: 'app/poll/poll.component.html',
    viewProviders:[BS_VIEW_PROVIDERS],
    directives: [MODAL_DIRECTVES],
    styleUrls:  ['app/poll/poll.component.css']
})
export class PollComponent{


}
//
// polls: Poll[];
//
// @Injectable()
// export class PollService {
//     getPolls() {
//         return polls;
//     }
// }