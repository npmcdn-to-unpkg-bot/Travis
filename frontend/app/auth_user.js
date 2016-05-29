/**
 * Created by Arash on 27-May-16.
 */
"use strict";
var GoogleUser = (function () {
    function GoogleUser() {
        this._authenticated = false;
        this._expires = 0;
    }
    Object.defineProperty(GoogleUser.prototype, "image", {
        get: function () {
            return this._image;
        },
        set: function (value) {
            this._image = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GoogleUser.prototype, "gender", {
        get: function () {
            return this._gender;
        },
        set: function (value) {
            this._gender = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GoogleUser.prototype, "name", {
        get: function () {
            return this._name;
        },
        set: function (value) {
            this._name = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GoogleUser.prototype, "userId", {
        get: function () {
            return this._userId;
        },
        set: function (value) {
            this._userId = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GoogleUser.prototype, "authenticated", {
        get: function () {
            return this._authenticated;
        },
        set: function (value) {
            this._authenticated = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GoogleUser.prototype, "accessToken", {
        get: function () {
            return this._accessToken;
        },
        set: function (value) {
            this._accessToken = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GoogleUser.prototype, "expires", {
        get: function () {
            return this._expires;
        },
        set: function (value) {
            this._expires = value;
        },
        enumerable: true,
        configurable: true
    });
    return GoogleUser;
}());
exports.GoogleUser = GoogleUser;
//# sourceMappingURL=auth_user.js.map