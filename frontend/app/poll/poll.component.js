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
var common_1 = require('@angular/common');
var ng2_bootstrap_1 = require('ng2-bootstrap/ng2-bootstrap');
var comment_component_1 = require('../comment/comment.component');
var poll_service_1 = require('./poll.service');
var auth_service_1 = require('../auth.service');
var Option = (function () {
    function Option() {
        this.vote = [];
    }
    return Option;
})();
exports.Option = Option;
var Poll = (function () {
    function Poll() {
    }
    Poll.prototype.isUserVoted = function (userId) {
        this.options.map(function (option) {
            option.vote.map(function (v) {
                if (userId == v)
                    return option.text;
            });
        });
        return false;
    };
    Poll.prototype.getVotes = function (currentOp) {
        var votes = 0;
        console.log("getting votes for option ");
        console.log(currentOp);
        this.options.map(function (tempOp) {
            console.log(tempOp.text);
            if (tempOp.text == currentOp) {
                votes = tempOp.vote.length;
            }
        });
        console.log("votes: " + votes);
        return votes;
    };
    Poll.prototype.getVotesPercentage = function (option) {
        var votes = this.getVotes(option);
        return 100 * votes / this.getNumOfVotes();
    };
    Poll.prototype.getNumOfVotes = function () {
        var votes = 0;
        this.options.map(function (tempOp) {
            votes += tempOp.vote.length;
        });
        console.log("number of votes for " + this.title + " is: " + votes);
        return votes;
    };
    return Poll;
})();
exports.Poll = Poll;
var pollForm = (function () {
    function pollForm() {
    }
    return pollForm;
})();
exports.pollForm = pollForm;
var PollComponent = (function () {
    function PollComponent(authService, pollService) {
        this.authService = authService;
        this.pollService = pollService;
        this.pollModel = new pollForm();
        this.polls = [];
        this.userId = localStorage.getItem('user') != undefined ? localStorage.getItem('user')['_id'] : "";
    }
    PollComponent.prototype.getBarType = function (name) {
        var len = name.length;
        len = len % 4;
        var states = ["success", "info", "warning", "danger"];
        return states[len];
    };
    PollComponent.prototype.submitPoll = function () {
        // for creating a poll
        var options = this.pollModel.options.split('\n');
        var validOptions = [];
        options.map(function (option) {
            if (option != "" && option != null)
                validOptions.push(option);
        });
        var pollObj = { token: localStorage.getItem('token'), title: this.pollModel.title, options: validOptions };
        this.pollService.postPoll(pollObj);
    };
    PollComponent.prototype.ngOnInit = function () {
        console.log("OnInit poll component");
        this.getPolls();
    };
    PollComponent.prototype.getPolls = function () {
        var _this = this;
        this.pollService.getLatestPolls().then(function (polls) {
            polls.map(function (poll) {
                var tempPoll = new Poll();
                tempPoll.owner = poll['owner'];
                tempPoll.title = poll['title'];
                tempPoll.options = poll['options'];
                tempPoll.date = poll['date'];
                tempPoll.comments = poll['comments'];
                _this.polls.push(tempPoll);
            });
        });
    };
    PollComponent = __decorate([
        core_1.Component({
            selector: 'pollItem',
            templateUrl: 'app/poll/poll.component.html',
            viewProviders: [ng2_bootstrap_1.BS_VIEW_PROVIDERS],
            directives: [ng2_bootstrap_1.MODAL_DIRECTVES, comment_component_1.CommentComponent, ng2_bootstrap_1.PROGRESSBAR_DIRECTIVES, common_1.CORE_DIRECTIVES],
            styleUrls: ['app/poll/poll.component.css'],
        }), 
        __metadata('design:paramtypes', [auth_service_1.AuthService, poll_service_1.PollService])
    ], PollComponent);
    return PollComponent;
})();
exports.PollComponent = PollComponent;
//# sourceMappingURL=poll.component.js.map