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
var imageService_service_1 = require('../imageService.service');
var TripComponent = (function () {
    function TripComponent(tripService, imageService) {
        this.tripService = tripService;
        this.imageService = imageService;
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
            'United Arab Emirates', 'United Kingdom', 'Uruguay', 'Uzbekistan', 'Venezuela', 'Vietnam',
            'Virgin Islands (US)', 'Yemen', 'Zambia', 'Zimbabwe'];
        this.countriesValue = [];
        this._disabledV = '0';
        this.disabled = false;
        this.tripModel = new Trip();
        this.tripModel.cities = [];
        this.pictures = [];
        this.picturesToUpload = [];
        this.filesToUpload = [];
        //this.filesToUpload = [];
    }
    TripComponent.prototype.createTrip = function () {
        if (!this.countriesValue || this.countriesValue.length == 0) {
            alert("you should choose a country before submiting");
            return;
        }
        this.tripModel.pictures = this.picturesToUpload;
        this.tripService.createTrip(this.tripModel);
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
        var _this = this;
        console.log("refreshCountries");
        console.log(value);
        if (value.length > 0) {
            this.countriesValue = value;
            this.countriesValue.map(function (countryVal) { return _this.tripModel.countries = countryVal.text; });
        }
        else {
            this.tripModel.countries = [];
        }
    };
    /*
    public getImage (image) {
        let mainCanvas = document.createElement("canvas");
        var ctx = mainCanvas.getContext("2d");
        ctx.drawImage(image, 0, 0);
        return mainCanvas.toDataURL("image/jpeg", 1.0);
    };



    private resize(image){
        let mainCanvas = document.createElement("canvas");
        mainCanvas.width = 100;
        mainCanvas.height = 100;
        var ctx = mainCanvas.getContext("2d");
        ctx.drawImage(image, 0, 0,mainCanvas.width,mainCanvas.height);
        return mainCanvas.toDataURL("image/jpeg", 0.5);
    }
*/
    TripComponent.prototype.uploadfile = function (fileInput) {
        var _this = this;
        try {
            this.imageInput = fileInput;
            var recentFile = fileInput.files[0];
            this.filesToUpload.push(recentFile);
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
                var sumSize = 0;
                this.filesToUpload.map(function (file) {
                    if (file)
                        sumSize += file.size;
                });
                if (sumSize + recentFile.size > 1024 * 1024 * 50) {
                    alert("You can't add more pics! The maximum size is 50 MB");
                    return;
                }
                //console.log(currentFile.name + " size: " + currentFile.size);
                var img = new Image();
                //img.src = window.URL.createObjectURL(currentFile);
                var previewPic = new Picture();
                var toBeSentPic = new Picture();
                // Create a FileReader
                var reader = new FileReader();
                // Add an event listener to deal with the file when the reader is complete
                reader.addEventListener("load", function (event) {
                    // Get the event.target.result from the reader (base64 of the image)
                    img.src = event.target.result;
                    toBeSentPic.name = recentFile.name;
                    previewPic.name = toBeSentPic.name;
                    // Resize the image
                    _this.imageService.resizeImage(img).then(function (imageURL) { return previewPic.src = imageURL; });
                    _this.imageService.getImageURL(img).then(function (imageURL) { return toBeSentPic.src = imageURL; });
                    //toBeSentPic.src = this.getImage(img);
                }, false);
                reader.readAsDataURL(recentFile);
                this.pictures.push(previewPic);
                this.picturesToUpload.push(toBeSentPic);
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
        this.picturesToUpload(index, 1);
    };
    TripComponent = __decorate([
        core_1.Component({
            selector: 'trip',
            templateUrl: 'app/trip/trip.component.html',
            styleUrls: ['app/trip/trip.component.css', 'node_modules/ng2-select/components/css/ng2-select.css'],
            viewProviders: [ng2_bootstrap_1.BS_VIEW_PROVIDERS],
            directives: [ng2_bootstrap_1.MODAL_DIRECTVES, ng2_select_1.SELECT_DIRECTIVES, tag_input_component_1.TagInputComponent],
            providers: [imageService_service_1.ImageService]
        }), 
        __metadata('design:paramtypes', [trip_service_1.TripService, imageService_service_1.ImageService])
    ], TripComponent);
    return TripComponent;
})();
exports.TripComponent = TripComponent;
var Trip = (function () {
    function Trip() {
    }
    return Trip;
})();
exports.Trip = Trip;
var Picture = (function () {
    function Picture() {
    }
    return Picture;
})();
exports.Picture = Picture;
//# sourceMappingURL=trip.component.js.map