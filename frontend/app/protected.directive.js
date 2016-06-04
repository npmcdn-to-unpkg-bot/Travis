/**
 * Created by Arash on 25-May-16.
 */
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var auth_service_1 = require('./auth.service');
var router_deprecated_1 = require("@angular/router-deprecated");
var common_1 = require("@angular/common");
var ProtectedDirective = (function () {
    function ProtectedDirective(authService, router, location) {
        var _this = this;
        this.authService = authService;
        this.router = router;
        this.location = location;
        this.sub = null;
        if (!authService.isAuthenticated()) {
            this.location.replaceState('/');
            this.router.navigate(['PublicPage']);
        }
        this.sub = this.authService.subscribe(function (val) {
            if (!val.authenticated) {
                _this.location.replaceState('/');
                _this.router.navigate(['LoggedoutPage']);
            }
        });
    }
    ProtectedDirective.prototype.ngOnDestroy = function () {
        if (this.sub != null) {
            this.sub.unsubscribe();
        }
    };
    ProtectedDirective = __decorate([
        core_1.Directive({
            selector: '[protected]'
        }), 
        __metadata('design:paramtypes', [auth_service_1.AuthService, router_deprecated_1.Router, common_1.Location])
    ], ProtectedDirective);
    return ProtectedDirective;
})();
exports.ProtectedDirective = ProtectedDirective;
//# sourceMappingURL=protected.directive.js.map