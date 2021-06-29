export const fileType = 'file';

export interface IfileItem{
    name:string;
    event?:any;
}

export class FileItem implements IfileItem{
    name:string = null;
    //to do event type
    event?:any = null;
    type:string = fileType;
    
    constructor(data?:any){
        if(data){
            this.init(data);
        }
    }

    init(data:any){
        let keys = Object.keys(this);
        keys.forEach(key => {
            if(data[key]){
                this[key] = data[key];
            }
        });
    }
}