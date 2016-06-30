/**
 * Created by Nadine on 6/2/16.
 */
import {Component, Injectable, Input} from '@angular/core';
import {TripService} from './trip.service';
import {MODAL_DIRECTVES, BS_VIEW_PROVIDERS} from 'ng2-bootstrap/ng2-bootstrap';
import {SELECT_DIRECTIVES} from 'ng2-select/ng2-select';
import {TagInputComponent} from '../tag-input/tag-input.component';

@Component({
    selector: 'trip',
    templateUrl: 'app/trip/trip.component.html',
    styleUrls: ['app/trip/trip.component.css', 'node_modules/ng2-select/components/css/ng2-select.css'],
    viewProviders: [BS_VIEW_PROVIDERS],
    directives: [MODAL_DIRECTVES, SELECT_DIRECTIVES, TagInputComponent],
})

export class TripComponent {

    trips:Trip[];
    tripModel:Trip;
    filesToUpload: File[];

    pictures:Picture[];
    imageInput:HTMLInputElement[];

    constructor(private tripService:TripService) {
        this.tripModel = new Trip();
        this.tripModel.cities = [];
        this.pictures = [];
        this.filesToUpload = [];
    }

    createTrip() {
        if (!this.countriesValue || this.countriesValue.length == 0){
            alert("you should choose a country before submiting");
            return;
        }
        this.tripModel.files = this.pictures;
        this.tripService.createTrip(this.tripModel);
    }

    public countriesArray:Array<string> = ['Afghanistan', 'Albania', 'Algeria', 'Andorra', 'Angola', 'Anguilla',
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

    private countriesValue:any = [];

    private _disabledV:string = '0';
    private disabled:boolean = false;

    private get disabledV():string {
        return this._disabledV;
    }

    private set disabledV(value:string) {
        this._disabledV = value;
        this.disabled = this._disabledV === '1';
    }

    public selectedCountry(value:any):void {
        console.log('Selected value is: ', value);
    }

    public removedCountry(value:any):void {
        console.log('Removed value is: ', value);
    }

    public refreshCountries(value:any):void {
        console.log("refreshCountries");
        console.log(value);
        if (value.length > 0) {
            this.countriesValue = value;
            this.tripModel.countries = value;
        } else {
            this.tripModel.countries = [];
        }
    }

    public resize (image) {
        let mainCanvas = document.createElement("canvas");
        mainCanvas.width = 100;
        mainCanvas.height = 100;
        var ctx = mainCanvas.getContext("2d");
        ctx.drawImage(image, 0, 0, mainCanvas.width, mainCanvas.height);
        return mainCanvas.toDataURL("image/jpeg");
    };

    public uploadfile(fileInput: any){
        try{
            this.imageInput = fileInput;

            let recentFile = fileInput.files[0];
            this.filesToUpload.push(recentFile);
            if (recentFile){
                if(!recentFile.type.match(/image.*/)){
                    console.log('This is  not an image! ' + recentFile.name);
                    alert('You can only upload an image file! Choose an image please' + recentFile.name);
                    return;
                }
                if(recentFile.size > 1024 * 1024 * 5){
                    alert("The file is too big! maximum size is 5 MB");
                    return;
                }

                let sumSize = 0;
                this.filesToUpload.map(file =>{
                    sumSize += file.size;
                });

                if (sumSize + recentFile.size > 1024 * 1024 * 50){
                    alert("You can't add more pics! The maximum size is 50 MB");
                    return;
                }

                //console.log(currentFile.name + " size: " + currentFile.size);
                let img = new Image();
                //img.src = window.URL.createObjectURL(currentFile);
                let pic = new Picture();

                // Create a FileReader
                let reader = new FileReader();

                // Add an event listener to deal with the file when the reader is complete
                reader.addEventListener("load", (event) => {
                    // Get the event.target.result from the reader (base64 of the image)
                    img.src = event.target.result;

                    pic.name = event.target.name;

                    // Resize the image
                    //pic.src = this.resize(img);
                    pic.src = img.src;

                }, false);

                reader.readAsDataURL(recentFile);
                this.pictures.push(pic);
                // Push the img src (base64 string) into our array that we display in our html template

            }
            else
                return;
        }catch(err){
            console.log(err);
            alert("image upload failed! try again please");
        }

    }

    public removePic(index){
        if(index == this.pictures.length - 1){
            this.imageInput.value = "";
        }
        this.pictures.splice(index,1);
        this.filesToUpload.splice(index,1);

    }
}

export class Trip {
    _id:number;
    owner:Object;
    title:string;
    dateFrom:string;
    dateTo:string;
    budget:number;
    route:string;
    //cities:string;
    cities:[string];
    countries:[string];
    tags:string;
    description:string;
    comments:Object[];
    files:Picture[];
}

export class Picture{
    name:string;
    src:Any;
}
