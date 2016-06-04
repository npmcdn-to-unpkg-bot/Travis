/**
 * Created by Arash on 27-May-16.
 */
export class TravisUser{
    public image:string;
    public gender:string;
    public name:string;

}

export class GoogleUser{
    private _authenticated:boolean = false;
    private _accessToken:string;
    private _expires:any = 0;
    private _userId:string;
    private _image:string;
    private _gender:string;
    private _name:string;

    get image():string {
        return this._image;
    }

    set image(value:string) {
        this._image = value;
    }

    get gender():string {
        return this._gender;
    }

    set gender(value:string) {
        this._gender = value;
    }

    get name():string {
        return this._name;
    }

    set name(value:string) {
        this._name = value;
    }
    get userId():string {
        return this._userId;
    }

    set userId(value:string) {
        this._userId = value;
    }


    get authenticated():boolean {
        return this._authenticated;
    }

    set authenticated(value:boolean) {
        this._authenticated = value;
    }

    get accessToken():string {
        return this._accessToken;
    }

    set accessToken(value:string) {
        this._accessToken = value;
    }

    get expires():any {
        return this._expires;
    }

    set expires(value:any) {
        this._expires = value;
    }


}