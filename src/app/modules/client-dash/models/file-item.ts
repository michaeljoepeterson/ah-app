import { DynamicFormData } from "../../notifications/models/dynamic-form-models";
import { DateEvent, IDateEvent } from "./date-event";

export const fileType = 'file';

export interface IfileItem{
    name:string;
    event?:any;
    sortOrder?:number;
    dateEvents?:IDateEvent[];
    details?:string;
    id?:string
}

export class FileItem implements IfileItem{
    name:string = null;
    //to do event type
    event?:any = null;
    type:string = fileType;
    sortOrder?:number = null;
    dateEvents?:DateEvent[] = [];
    details?:string = null;
    id?:string = null;
    ancestors?:string[] = [];
    parent?:string = null;
    
    constructor(data?:any){
        if(data){
            this.init(data);
        }
    }

    init(data:any){
        let keys = Object.keys(this);
        let dates = "dateEvents";
        if(data[dates] && data[dates].length > 0){
            this.dateEvents = data[dates].map(date => new DateEvent(date));
        }
        keys.forEach(key => {
            if(key !== dates){
                if(data[key] || data[key] === 0){
                    this[key] = data[key];
                }
            }
        });
    }

    getStatuses():string[]{
        let statuses = this.dateEvents.map(event => event.status);
        return statuses;
    }

}

export let baseFileFormData:DynamicFormData ={
    formTitle:'Create a New Patient File',
    fields:[
      {
        label:'Patient File Name'
      }
    ]
}