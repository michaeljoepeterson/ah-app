export const fileType = 'file';

export interface IfileItem{
    name:string;
    event?:any;
    sortOrder?:number;
}

export class FileItem implements IfileItem{
    name:string = null;
    //to do event type
    event?:any = null;
    type:string = fileType;
    sortOrder?:number = null;
    
    constructor(data?:any){
        if(data){
            this.init(data);
        }
    }

    init(data:any){
        let keys = Object.keys(this);
        keys.forEach(key => {
            if(data[key] || data[key] === 0){
                this[key] = data[key];
            }
        });
    }
}