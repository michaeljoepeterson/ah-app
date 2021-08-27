import { BaseModel } from "../baseModel";

export class User extends BaseModel{
    email:string = null;
    
    constructor(data:any){
        super();
        if(data){
            this.init(data);
        }
    }

    mapData(data:any){
        let keys = Object.keys(this);
        keys.forEach(key => {
            if(data[key]){
                this[key] = data[key];
            }
        });
    }
}