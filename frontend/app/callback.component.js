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
 * Created by Arash on 25-May-16.
 */
/*
 * Created with IntelliJ IDEA.
 * User: mfo
 * Date: 12/18/15
 * Time: 10:30 PM
 */
var core_1 = require("@angular/core");
var CallbackComponent = (function () {
    function CallbackComponent() {
    }
    CallbackComponent = __decorate([
        core_1.Component({
            selector: 'callback',
            directives: [],
            pipes: [],
            template: "\n<div>I'm an OAuth2 Callback</div>\n"
        }), 
        __metadata('design:paramtypes', [])
    ], CallbackComponent);
    return CallbackComponent;
}());
exports.CallbackComponent = CallbackComponent;
//# sourceMappingURL=callback.component.js.map