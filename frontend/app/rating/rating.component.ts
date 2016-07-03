import { Component, Input, Output, EventEmitter } from '@angular/core'

@Component({
    selector:'trip-rating',
    templateUrl:'app/rating/rating.component.html',
    styleUrls:['app/rating/rating.component.css']
})

export class RatingComponent {
    @Input() rating: number;
    @Input() itemId: number;
    @Output() ratingClick:EventEmitter<any> = new EventEmitter<any>();

    inputName:string;

    ngOnInit() {
        this.inputName = this.itemId + '_rating';
    }
    
    onClick(rating:number):void{
        this.rating = rating;
        this.ratingClick.emit({
            itemId: this.itemId,
            rating: rating
        });
        $(this).attr('disabled', 'disabled');
    }
}