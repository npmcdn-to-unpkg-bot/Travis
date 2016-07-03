import {Injectable, EventEmitter} from "@angular/core";

@Injectable()
export class ImageService {

    public getImageURL(image){
        return new Promise((resolve, reject) => {
            let mainCanvas = document.createElement("canvas");
            var ctx = mainCanvas.getContext("2d");
            ctx.drawImage(image, 0, 0);
            resolve(mainCanvas.toDataURL("image/jpeg", 1.0));
        });
    }

    public resizeImage(image){
        return new Promise((resolve, reject) => {
        let mainCanvas = document.createElement("canvas");
        mainCanvas.width = 100;
        mainCanvas.height = 100;
        var ctx = mainCanvas.getContext("2d");
        ctx.drawImage(image, 0, 0);
            resolve(mainCanvas.toDataURL("image/jpeg", 1.0));
        });
    }
}