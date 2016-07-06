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
 * Created by Arash on 05-Jun-16.
 */
/**
 * Created by Arash on 25-May-16.
 */
/*
 * Created with IntelliJ IDEA.
 * User: mfo
 * Date: 12/18/15
 * Time: 10:34 AM
 */
var core_1 = require("@angular/core");
var http_1 = require('@angular/http');
require('rxjs/Rx');
var router_deprecated_1 = require('@angular/router-deprecated');
var polls = [
    {
        _id: 4,
        owner: { firstName: 'Arash', imageURL: 'https://pbs.twimg.com/profile_images/671726314504622082/0PqgkSEK.jpg', _id: "1234" },
        title: 'WTD in Winter',
        options: [{ text: 'Moscow', vote: ["1234", "1234", "1234"] }, { text: 'London', vote: ["1234", "1234", "1234"] }],
        date: 'June 1',
        comments: [
            { user: { firstName: 'Jen', imageURL: 'http://static.tvtropes.org/pmwiki/pub/images/jenit_545.jpg', _id: "123" }, text: "You should visit me if you come to London!", date: 'June 2, 2016' },
            { user: { firstName: 'Moss', imageURL: 'http://static.bips.channel4.com/bips/520x390/the-it-crowd/characters/f2e6d121-d965-4a09-ab66-dbaa41290467.jpg', _id: "123" },
                text: "Go to Moscow and drink a White Russian. I want to know how to make one.", date: 'June 2, 2016' }
        ]
    },
    {
        _id: 5,
        owner: { firstName: 'Emma', imageURL: 'https://pbs.twimg.com/profile_images/671726314504622082/0PqgkSEK.jpg', _id: "1234" },
        title: 'WWED',
        options: [{ text: 'Paris', vote: ["1234", "1234", "1234", "1", "33", "678898"] }, { text: 'Rome', vote: ["1234", "1234", "1234"] }],
        date: 'June 6',
        comments: [{ user: { firstName: 'Jen', imageURL: 'http://static.tvtropes.org/pmwiki/pub/images/jenit_545.jpg', _id: "123" },
                text: "You should visit me if you come to London!", date: 'June 2, 2016' },
            { user: { firstName: 'Moss', imageURL: 'http://static.bips.channel4.com/bips/520x390/the-it-crowd/characters/f2e6d121-d965-4a09-ab66-dbaa41290467.jpg', _id: "123" },
                text: "Go to Moscow and drink a White Russian. I want to know how to make one.",
                date: 'June 2, 2016' }
        ]
    },
    {
        _id: 5,
        owner: {
            firstName: 'Arash',
            imageURL: 'https://pbs.twimg.com/profile_images/671726314504622082/0PqgkSEK.jpg',
            _id: "1234"
        },
        title: 'June 2016 Paris or NY?',
        options: [{ text: 'Paris', vote: ["1234", "1234", "1234", "3456"] }, { text: 'New York', vote: ["1234", "1234", "1234"] }],
        date: 'June 10',
        comments: [{
                user: { firstName: 'Arash', _id: "123",
                    imageURL: 'http://static.tvtropes.org/pmwiki/pub/images/jenit_545.jpg' },
                text: "Great Trip!",
                date: 'June 2, 2016'
            },
            {
                user: { firstName: 'Bob', _id: "123",
                    imageURL: 'https://pbs.twimg.com/profile_images/671726314504622082/0PqgkSEK.jpg' },
                text: "Go to Moscow and drink a White Russian. I want to know how to make one.",
                date: 'June 2, 2016'
            }
        ]
    },
    {
        _id: 5,
        owner: {
            firstName: 'Alex',
            imageURL: 'https://pbs.twimg.com/profile_images/671726314504622082/0PqgkSEK.jpg',
            _id: "1234"
        },
        title: 'WTD in Winter',
        options: [{ text: 'Moscow', vote: ["1234"] }, { text: 'Casablanca', vote: ["1234", "1234", "1234", "23456"] }],
        date: 'March 2014',
        comments: [{
                user: { firstName: 'Arash', _id: "23456",
                    imageURL: 'http://static.tvtropes.org/pmwiki/pub/images/jenit_545.jpg' },
                text: "Great Trip!",
                date: 'June 2, 2016'
            },
            {
                user: { firstName: 'Zidane', _id: "234567",
                    imageURL: 'https://pbs.twimg.com/profile_images/671726314504622082/0PqgkSEK.jpg' },
                text: "Go to Moscow and drink a White Russian. I want to know how to make one.",
                date: 'June 20, 2016'
            }
        ]
    },
    {
        _id: 5,
        owner: {
            firstName: 'Rupert',
            imageURL: 'https://pbs.twimg.com/profile_images/671726314504622082/0PqgkSEK.jpg',
            _id: "1234"
        },
        title: 'WTD in Winter',
        options: [{ text: 'Moscow', vote: ["1234", "1234", "1234"] }, { text: 'Casablanca', vote: ["1234", "1234", "1234", "12345", "1234555"] }],
        date: 'March 2014',
        comments: [{
                user: { firstName: "Ronaldo", _id: "7",
                    imageURL: 'http://static.tvtropes.org/pmwiki/pub/images/jenit_545.jpg' },
                text: "Great Trip!",
                date: 'June 2, 2016'
            },
            {
                user: { firstName: 'Zidane', _id: "4",
                    imageURL: 'https://pbs.twimg.com/profile_images/671726314504622082/0PqgkSEK.jpg' },
                text: "Go to Moscow and drink a White Russian. I want to know how to make one.",
                date: 'June 20, 2016'
            }
        ]
    },
];
var PollService = (function () {
    function PollService(http, router) {
        this.http = http;
        this.router = router;
    }
    PollService.prototype.getLatestPolls = function (token) {
        var _this = this;
        var headers = new http_1.Headers();
        headers.append('token', token);
        return this.http.get("/rest/poll/", { 'headers': headers })
            .timeout(8000, new Error('server timeout exceeded! could not get the polls'))
            .toPromise().then(function (res) {
            if (res) {
                var serviceResponse = {};
                if (res.status <= 299)
                    serviceResponse = res.json();
                else if (res.status >= 400) {
                    serviceResponse['error'] = true;
                    serviceResponse['msg'] = res.text();
                    console.log(serviceResponse);
                }
                console.log(serviceResponse);
                return serviceResponse;
            }
            else
                return {};
        }).catch(function (res) { return _this.handleError(res); });
    };
    PollService.prototype.handleError = function (res) {
        if (res.status >= 400) {
            var serviceResponse = {};
            serviceResponse['error'] = true;
            serviceResponse['msg'] = res.text();
            console.log(serviceResponse);
            return serviceResponse;
        }
        else {
            var error = res;
            var errMsg = (error.message) ? error.message :
                error.status ? error.status + " - " + error.statusText : 'Server error';
            console.error(errMsg); // log to console instead
            return {
                error: true,
                msg: "server did not respond!"
            };
        }
    };
    PollService.prototype.postPoll = function (pollObj) {
        var _this = this;
        var body = JSON.stringify(pollObj);
        console.log(pollObj);
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.post("/rest/poll/create", body, { 'headers': headers })
            .timeout(8000, new Error('server timeout exceeded! could not save the poll'))
            .toPromise().then(function (res) {
            if (res) {
                console.log(res);
                var serviceResponse = {};
                if (res.status <= 299) {
                    serviceResponse['msg'] = res.text();
                    serviceResponse['success'] = true;
                }
                else if (res.status >= 400) {
                    serviceResponse['error'] = true;
                    serviceResponse['msg'] = res.text();
                    console.log(serviceResponse);
                }
                return serviceResponse;
            }
            else
                return { warn: true, msg: "no Response from the server!" };
        }).catch(function (res) { return _this.handleError(res); });
    };
    PollService.prototype.postPollVote = function (pollObj) {
        var _this = this;
        var body = JSON.stringify(pollObj);
        console.log(pollObj);
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.post("/rest/poll/vote", body, { 'headers': headers })
            .timeout(8000, new Error('server timeout exceeded! could not save the poll'))
            .toPromise().then(function (res) {
            if (res) {
                console.log(res);
                var serviceResponse = {};
                if (res.status <= 299) {
                    serviceResponse['msg'] = res.text();
                    serviceResponse['success'] = true;
                }
                else if (res.status >= 400) {
                    serviceResponse['error'] = true;
                    serviceResponse['msg'] = res.text();
                    console.log(serviceResponse);
                }
                return serviceResponse;
            }
            else
                return { warn: true, msg: "no Response from the server!" };
        }).catch(function (res) { return _this.handleError(res); });
    };
    PollService.prototype.postPollComment = function (pollCommentObj) {
        var _this = this;
        var body = JSON.stringify(pollCommentObj);
        console.log(pollCommentObj);
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.post("rest/poll/Comment", body, { 'headers': headers })
            .timeout(8000, new Error('server timeout exceeded! could not save the comment'))
            .toPromise().then(function (res) {
            if (res) {
                console.log(res);
                var serviceResponse = {};
                if (res.status <= 299) {
                    var message = res.json();
                    serviceResponse['msg'] = message['msg'];
                    serviceResponse['comments'] = message['comments'];
                    serviceResponse['success'] = true;
                }
                else if (res.status >= 400) {
                    serviceResponse['error'] = true;
                    serviceResponse['msg'] = res.text();
                    console.log(serviceResponse);
                }
                return serviceResponse;
            }
            else
                return { warn: true, msg: "no Response from the server!" };
        }).catch(function (res) { return _this.handleError(res); });
    };
    PollService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http, router_deprecated_1.Router])
    ], PollService);
    return PollService;
})();
exports.PollService = PollService;
//# sourceMappingURL=poll.service.js.map