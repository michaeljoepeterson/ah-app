export class User{
    email:string = null;
    id:string = null;
    
    constructor(data:any){
        if(data){
            this.mapData(data);
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