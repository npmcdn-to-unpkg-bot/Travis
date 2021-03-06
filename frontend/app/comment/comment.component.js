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
var poll_service_1 = require('../poll/poll.service');
var auth_service_1 = require('../auth.service');
var ng2_toastr_1 = require('ng2-toastr/ng2-toastr');
var Comment = (function () {
    function Comment() {
    }
    return Comment;
}());
exports.Comment = Comment;
var CommentComponent = (function () {
    function CommentComponent(authService, pollService, toastr) {
        this.authService = authService;
        this.pollService = pollService;
        this.toastr = toastr;
    }
    CommentComponent.prototype.postComment = function (cmForm) {
        var _this = this;
        var ngForm = cmForm;
        var commentObj = { token: this.authService.getToken(), text: this.commentText, pollId: this.pollid };
        this.pollService.postPollComment(commentObj).then(function (response) {
            if (response.warn)
                _this.toastr.warning("warning! " + response.msg);
            else if (response.success) {
                _this.toastr.success("success! " + response.msg);
                var tempComments = response.comments;
                if (tempComments) {
                    console.log("we got the comments");
                    _this.comments.push(tempComments.pop());
                }
                console.log(ngForm);
                // clearing form
                ngForm.form.controls["comment"].updateValue("");
            }
            else {
                _this.toastr.error("Creating comment failed !" + response.msg);
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
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array)
    ], CommentComponent.prototype, "comments", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], CommentComponent.prototype, "pollid", void 0);
    CommentComponent = __decorate([
        core_1.Component({
            selector: 'comment',
            templateUrl: 'app/comment/comment.component.html',
            styleUrls: ['app/comment/comment.component.css']
        }), 
        __metadata('design:paramtypes', [auth_service_1.AuthService, poll_service_1.PollService, ng2_toastr_1.ToastsManager])
    ], CommentComponent);
    return CommentComponent;
}());
exports.CommentComponent = CommentComponent;
//# sourceMappingURL=comment.component.js.map