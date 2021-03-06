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
var trip_service_1 = require('./trip.service');
var ng2_bootstrap_1 = require('ng2-bootstrap/ng2-bootstrap');
var ng2_select_1 = require('ng2-select/ng2-select');
var tag_input_component_1 = require('../tag-input/tag-input.component');
var ng2_toastr_1 = require('ng2-toastr/ng2-toastr');
var auth_service_1 = require('../auth.service');
var TripComponent = (function () {
    function TripComponent(tripService, authService, toastr) {
        this.tripService = tripService;
        this.authService = authService;
        this.toastr = toastr;
        this.countriesArray = ['Afghanistan', 'Albania', 'Algeria', 'Andorra', 'Angola', 'Anguilla',
            'Antigua & Barbuda', 'Argentina', 'Armenia', 'Aruba', 'Australia', 'Austria', 'Azerbaijan', 'Bahamas',
            'Bahrain', 'Bangladesh', 'Barbados', 'Belarus', 'Belgium', 'Belize', 'Benin', 'Bermuda', 'Bhutan',
            'Bolivia', 'Bosnia & Herzegovina', 'Botswana', 'Brazil', 'British Virgin Islands', 'Brunei',
            'Bulgaria', 'Burkina Faso', 'Burundi', 'Cambodia', 'Cameroon', 'Cape Verde', 'Cayman Islands',
            'Chad', 'Chile', 'China', 'Colombia', 'Congo', 'Cook Islands', 'Costa Rica', 'Cote D Ivoire',
            'Croatia', 'Cruise Ship', 'Cuba', 'Cyprus', 'Czech Republic', 'Denmark', 'Djibouti', 'Dominica',
            'Dominican Republic', 'Ecuador', 'Egypt', 'El Salvador', 'Equatorial Guinea', 'Estonia', 'Ethiopia',
            'Falkland Islands', 'Faroe Islands', 'Fiji', 'Finland', 'France', 'French Polynesia', 'French West Indies',
            'Gabon', 'Gambia', 'Georgia', 'Germany', 'Ghana', 'Gibraltar', 'Greece', 'Greenland', 'Grenada',
            'Guam', 'Guatemala', 'Guernsey', 'Guinea', 'Guinea Bissau', 'Guyana', 'Haiti', 'Honduras',
            'Hong Kong', 'Hungary', 'Iceland', 'India', 'Indonesia', 'Iran', 'Iraq', 'Ireland', 'Isle of Man',
            'Israel', 'Italy', 'Jamaica', 'Japan', 'Jersey', 'Jordan', 'Kazakhstan', 'Kenya', 'Kuwait',
            'Kyrgyz Republic', 'Laos', 'Latvia', 'Lebanon', 'Lesotho', 'Liberia', 'Libya', 'Liechtenstein',
            'Lithuania', 'Luxembourg', 'Macau', 'Macedonia', 'Madagascar', 'Malawi', 'Malaysia', 'Maldives',
            'Mali', 'Malta', 'Mauritania', 'Mauritius', 'Mexico', 'Moldova', 'Monaco', 'Mongolia', 'Montenegro',
            'Montserrat', 'Morocco', 'Mozambique', 'Namibia', 'Nepal', 'Netherlands', 'Netherlands Antilles',
            'New Caledonia', 'New Zealand', 'Nicaragua', 'Niger', 'Nigeria', 'Norway', 'Oman', 'Pakistan',
            'Palestine', 'Panama', 'Papua New Guinea', 'Paraguay', 'Peru', 'Philippines', 'Poland', 'Portugal',
            'Puerto Rico', 'Qatar', 'Reunion', 'Romania', 'Russia', 'Rwanda', 'Saint Pierre & Miquelon', 'Samoa',
            'San Marino', 'Satellite', 'Saudi Arabia', 'Senegal', 'Serbia', 'Seychelles', 'Sierra Leone',
            'Singapore', 'Slovakia', 'Slovenia', 'South Africa', 'South Korea', 'Spain', 'Sri Lanka', 'St Kitts & Nevis',
            'St Lucia', 'St Vincent', 'St. Lucia', 'Sudan', 'Suriname', 'Swaziland', 'Sweden', 'Switzerland',
            'Syria', 'Taiwan', 'Tajikistan', 'Tanzania', 'Thailand', 'Timor L\'Este', 'Togo', 'Tonga',
            'Trinidad & Tobago', 'Tunisia', 'Turkey', 'Turkmenistan', 'Turks & Caicos', 'Uganda', 'Ukraine',
            'United Arab Emirates', 'United Kingdom', 'Uruguay', 'USA', 'Uzbekistan', 'Venezuela', 'Vietnam',
            'Virgin Islands (US)', 'Yemen', 'Zambia', 'Zimbabwe'];
        this.countriesValue = [];
        this._disabledV = '0';
        this.disabled = false;
        this.tripModel = new Trip();
        this.tripModel.cities = [];
        this.tripModel.tags = [];
        this.tripModel.countries = [];
        this.pictures = [];
        this.filesToUpload = [];
    }
    TripComponent.prototype.createTrip = function () {
        var _this = this;
        if (!this.tripModel.countries || this.tripModel.countries.length == 0) {
            alert("Please choose a country before submitting.");
            return;
        }
        if (this.tripModel.dateFrom > this.tripModel.dateTo) {
            alert("The entered dates are wrong. Time travel is not possible (if so and you have proof, please contact us!");
            return;
        }
        this.tripModel.pictures = this.pictures;
        this.tripModel.route = this.routePic;
        var token = this.authService.getToken();
        this.tripModel['token'] = token;
        console.log(this.tripModel);
        this.tripService.createTrip(this.tripModel).then(function (response) {
            if (response.warn)
                _this.toastr.warning("warning! " + response.msg);
            else if (response.success) {
                _this.toastr.success("success! " + response.msg);
                // clearing form
                // reset form
                // TODO: somehow the tags & countries do not reset themselves ...
                _this.tripModel = new Trip();
                _this.pictures = [];
                _this.imageInput.value = "";
                _this.routePicInput.value = "";
                _this.removeTripPic();
            }
            else {
                _this.toastr.error("Creating trip failed !" + response.msg);
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
    Object.defineProperty(TripComponent.prototype, "disabledV", {
        get: function () {
            return this._disabledV;
        },
        set: function (value) {
            this._disabledV = value;
            this.disabled = this._disabledV === '1';
        },
        enumerable: true,
        configurable: true
    });
    TripComponent.prototype.selectedCountry = function (value) {
        console.log('Selected value is: ', value);
    };
    TripComponent.prototype.removedCountry = function (value) {
        console.log('Removed value is: ', value);
    };
    TripComponent.prototype.refreshCountries = function (value) {
        console.log("RefreshCountries: ", value);
        if (value.length > 0) {
            this.tripModel.countries = this.transformCountries(value);
        }
        else {
            this.tripModel.countries = [];
        }
    };
    TripComponent.prototype.transformCountries = function (value) {
        if (value === void 0) { value = []; }
        var str = value.map(function (item) {
            return item.text;
        }).join(', ');
        return str.split(', ');
    };
    TripComponent.prototype.clearTags = function () {
        if (this.tripModel.tags.length > 0) {
            this.tripModel.tags = [];
        }
    };
    TripComponent.prototype.removeTripPic = function () {
        this.routePic = null;
        this.routePicInput.values = "";
    };
    TripComponent.prototype.uploadTripPic = function (fileInput) {
        var _this = this;
        this.routePicInput = fileInput;
        var recentFile = fileInput.files[0];
        console.log(fileInput);
        if (recentFile) {
            if (!recentFile.type.match(/image.*/)) {
                console.log('This is  not an image! ' + recentFile.name);
                alert('You can only upload an image file! Choose an image please' + recentFile.name);
                return;
            }
            if (recentFile.size > 1024 * 1024 * 8) {
                alert("The file is too big! maximum size is 8 MB");
                return;
            }
            var pic_1 = new Picture();
            // Create a FileReader
            var reader = new FileReader();
            // Add an event listener to deal with the file when the reader is complete
            reader.addEventListener("load", function (event) {
                // Get the event.target.result from the reader (base64 of the image)
                pic_1.src = event.target.result;
                pic_1.name = recentFile.name;
                _this.routePic = pic_1;
                // Resize the image
                //this.imageService.resizeImage(img).then(imageURL => previewPic.src = imageURL);
            }, false);
            reader.readAsDataURL(recentFile);
        }
    };
    TripComponent.prototype.uploadfile = function (fileInput) {
        try {
            this.imageInput = fileInput;
            var recentFile_1 = fileInput.files[0];
            this.filesToUpload.push(recentFile_1);
            if (recentFile_1) {
                if (!recentFile_1.type.match(/image.*/)) {
                    console.log('This is  not an image! ' + recentFile_1.name);
                    alert('You can only upload an image file! Choose an image please' + recentFile_1.name);
                    return;
                }
                if (recentFile_1.size > 1024 * 1024 * 8) {
                    alert("The file is too big! maximum size is 8 MB");
                    return;
                }
                var sumSize_1 = 0;
                this.filesToUpload.map(function (file) {
                    if (file)
                        sumSize_1 += file.size;
                });
                if (sumSize_1 + recentFile_1.size > 1024 * 1024 * 50) {
                    alert("You can't add more pics! The maximum size is 50 MB");
                    return;
                }
                var pic_2 = new Picture();
                // Create a FileReader
                var reader = new FileReader();
                // Add an event listener to deal with the file when the reader is complete
                reader.addEventListener("load", function (event) {
                    // Get the event.target.result from the reader (base64 of the image)
                    pic_2.src = event.target.result;
                    pic_2.name = recentFile_1.name;
                    // Resize the image
                    //this.imageService.resizeImage(img).then(imageURL => previewPic.src = imageURL);
                }, false);
                reader.readAsDataURL(recentFile_1);
                this.pictures.push(pic_2);
            }
            else
                return;
        }
        catch (err) {
            console.log(err);
            alert("image upload failed! try again please");
        }
    };
    TripComponent.prototype.removePic = function (index) {
        if (index == this.pictures.length - 1) {
            this.imageInput.value = "";
        }
        this.pictures.splice(index, 1);
        this.filesToUpload.splice(index, 1);
    };
    TripComponent = __decorate([
        core_1.Component({
            selector: 'trip',
            templateUrl: 'app/trip/trip.component.html',
            styleUrls: ['app/trip/trip.component.css', '/ng2-select/components/css/ng2-select.css'],
            viewProviders: [ng2_bootstrap_1.BS_VIEW_PROVIDERS],
            directives: [ng2_bootstrap_1.MODAL_DIRECTVES, ng2_select_1.SELECT_DIRECTIVES, tag_input_component_1.TagInputComponent],
        }), 
        __metadata('design:paramtypes', [trip_service_1.TripService, auth_service_1.AuthService, ng2_toastr_1.ToastsManager])
    ], TripComponent);
    return TripComponent;
}());
exports.TripComponent = TripComponent;
var Trip = (function () {
    function Trip() {
    }
    return Trip;
}());
exports.Trip = Trip;
var Picture = (function () {
    function Picture() {
    }
    return Picture;
}());
exports.Picture = Picture;
//# sourceMappingURL=trip.component.js.map