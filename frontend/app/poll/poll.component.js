"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
/**
 * Created by Nadine on 6/2/16.
 */
var core_1 = require('@angular/core');
var ng2_bootstrap_1 = require('ng2-bootstrap/ng2-bootstrap');
var comment_component_1 = require('../comment/comment.component');
var Poll = (function () {
    function Poll() {
    }
    return Poll;
}());
exports.Poll = Poll;
var PollComponent = (function () {
    function PollComponent() {
        this.poll = {
            id: 1,
            userID: '12345',
            question: 'WWED',
            answerList: ['Paris', 'Rome'],
            date: 'June 6',
            comments: []
        };
    }
    PollComponent = __decorate([
        core_1.Component({
            selector: 'pollItem',
            templateUrl: 'app/poll/poll.component.html',
            viewProviders: [ng2_bootstrap_1.BS_VIEW_PROVIDERS],
            directives: [ng2_bootstrap_1.MODAL_DIRECTVES, comment_component_1.CommentComponent],
            styleUrls: ['app/poll/poll.component.css'],
        }), 
        __metadata('design:paramtypes', [])
    ], PollComponent);
    return PollComponent;
}());
exports.PollComponent = PollComponent;
//# sourceMappingURL=poll.component.js.map