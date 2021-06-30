export interface IDateEvent{
    date?:Date;
    status?:string;
};

export class DateEvent implements IDateEvent{
    date?:Date = null;
    status?:string = null;

    constructor(data?:any){
        if(data){
            this.init(data);
        }
    }

    init(data:any){
        let keys = Object.keys(this);
        let date = "date";
        if(data[date]){
            this.date = new Date(data[date]);
        }
        keys.forEach(key => {
            if(key !== date){
                if(data[key] || data[key] === 0){
                    this[key] = data[key];
                }
            }
        });
    }

    getStatuses(){
        return [];
    }
}