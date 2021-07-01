export class DashComment{
    user:string = null;
    userImage?:string = null;
    content?:string = null;

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