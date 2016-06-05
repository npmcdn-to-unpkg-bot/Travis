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
        id: 1,
        user: 'Emma',
        question: 'WWED',
        options: ['Paris', 'Rome'],
        date: 'June 6',
        comments: []
    },
    {
        id: 2,
        user: 'Arash',
        question: 'June 2016 Paris or NY?',
        options: ['Paris', 'New York'],
        date: 'June 10',
        comments: [{ name: 'Arash', imageURL: 'https://pbs.twimg.com/profile_images/671726314504622082/0PqgkSEK.jpg', text: "Great Trip!", date: '20 June 2016' },
            { name: 'Bob', imageURL: 'https://pbs.twimg.com/profile_images/671726314504622082/0PqgkSEK.jpg', text: "I hope you die!!", date: '20 June' }]
    },
    {
        id: 3,
        user: 'Alex',
        question: 'WTD in Winter',
        options: ['Moscow', 'Munich'],
        date: 'March 2014',
        comments: [{ name: 'Arash', imageURL: 'https://pbs.twimg.com/profile_images/671726314504622082/0PqgkSEK.jpg', text: "Great Trip!", date: '01 June 2015' },
            { name: 'Bob', imageURL: 'https://pbs.twimg.com/profile_images/671726314504622082/0PqgkSEK.jpg', text: "Where is my Money!!", date: '20 June' }
        ]
    },
];
var PollService = (function () {
    function PollService(http, router) {
        this.http = http;
        this.router = router;
    }
    PollService.prototype.getLatestPolls = function () {
        return new Promise(function (resolve) {
            return setTimeout(function () { return resolve(polls); }, 200);
        } // 200m seconds
         // 200m seconds
        );
    };
    PollService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http, router_deprecated_1.Router])
    ], PollService);
    return PollService;
}());
exports.PollService = PollService;
//# sourceMappingURL=poll.service.js.map