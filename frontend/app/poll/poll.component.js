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
var ng2_toastr_1 = require('ng2-toastr/ng2-toastr');
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
        this.options.map(function (tempOp) {
            if (tempOp.text == currentOp) {
                votes = tempOp.vote.length;
            }
        });
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
    function PollComponent(authService, pollService, toastr) {
        this.authService = authService;
        this.pollService = pollService;
        this.toastr = toastr;
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
    PollComponent.prototype.submitPoll = function (submitedForm, pollModal) {
        var _this = this;
        var ngForm = submitedForm;
        var pollModal = pollModal;
        try {
            // for creating a poll
            var options = this.pollModel.options.split('\n');
            var validOptions = [];
            options.map(function (option) {
                if (option != "" && option != null)
                    validOptions.push(option);
            });
            var pollObj = { token: this.authService.getToken(), title: this.pollModel.title, options: validOptions };
            this.pollService.postPoll(pollObj).then(function (response) {
                if (response.warn)
                    _this.toastr.warning("warning! " + response.msg);
                else if (response.success) {
                    pollModal.hide();
                    _this.toastr.success("success! " + response.msg);
                    // clearing form
                    ngForm.form.controls["title"].updateValue("");
                    ngForm.form.controls["title"]['_pristine'] = true;
                    ngForm.form.controls["pollOptions"].updateValue("");
                    ngForm.form.controls["pollOptions"]['_pristine'] = true;
                }
                else {
                    _this.toastr.error("Creating poll failed !" + response.msg);
                    var msg = response.msg.toLowerCase();
                    if (msg && msg.indexOf('token') >= 0) {
                        setTimeout(function () {
                            _this.toastr.error("Token is not valid! Logging Out....");
                            setTimeout(function () {
                                _this.authService.doLogout();
                            }, 1000);
                        }, 2000);
                    }
                }
            });
        }
        catch (err) {
            console.log(err);
            this.toastr.error("posting the polls failed!");
        }
    };
    PollComponent.prototype.ngOnInit = function () {
        console.log("OnInit poll component");
        this.getPolls();
    };
    PollComponent.prototype.getPolls = function () {
        var _this = this;
        try {
            var token = this.authService.getToken();
            this.pollService.getLatestPolls(token).then(function (response) {
                if (!response.error) {
                    var polls = response;
                    polls.map(function (poll) {
                        var tempPoll = new Poll();
                        tempPoll.owner = poll['owner'];
                        tempPoll.title = poll['title'];
                        tempPoll.options = poll['options'];
                        tempPoll.date = _this.formatDate(poll['date']);
                        tempPoll.comments = poll['comments'];
                        if (tempPoll.comments) {
                            tempPoll.comments.map(function (comment) {
                                comment.date = _this.formatDate(comment.date);
                            });
                        }
                        _this.polls.push(tempPoll);
                    });
                }
                else {
                    _this.toastr.error("Getting the polls failed " + response.msg);
                    var msg = response.msg.toLowerCase();
                    if (msg && msg.indexOf('token') >= 0) {
                        setTimeout(function () {
                            _this.toastr.error("Token is not valid! Logging Out....");
                            setTimeout(function () {
                                _this.authService.doLogout();
                            }, 1000);
                        }, 2000);
                    }
                }
            });
        }
        catch (err) {
            this.toastr.error("getting the polls failed!");
        }
    };
    PollComponent.prototype.formatDate = function (dateStr) {
        var options = {
            year: "numeric", month: "short",
            day: "numeric", hour: "2-digit", minute: "2-digit"
        };
        var temp_date = new Date(dateStr);
        return temp_date.toLocaleTimeString("en-us", options);
    };
    PollComponent = __decorate([
        core_1.Component({
            selector: 'pollItem',
            templateUrl: 'app/poll/poll.component.html',
            viewProviders: [ng2_bootstrap_1.BS_VIEW_PROVIDERS],
            directives: [ng2_bootstrap_1.MODAL_DIRECTVES, comment_component_1.CommentComponent, ng2_bootstrap_1.PROGRESSBAR_DIRECTIVES, common_1.CORE_DIRECTIVES],
            styleUrls: ['app/poll/poll.component.css'],
        }), 
        __metadata('design:paramtypes', [auth_service_1.AuthService, poll_service_1.PollService, ng2_toastr_1.ToastsManager])
    ], PollComponent);
    return PollComponent;
})();
exports.PollComponent = PollComponent;
//# sourceMappingURL=poll.component.js.map