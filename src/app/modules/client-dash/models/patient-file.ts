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

export interface IFileRequest{
    name:string;
    ancestors?:string[];
    parent?:string;
}


export class PatientFile implements IfileItem{
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
    patientId:string = null;
    activityLevel:string = null;
    height:number = null;
    weight:number = null;
    heightString:string = null;
    weightString:string = null;   
     
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

    /**
     * convert object to post object for sending to server
     */
     serialize():IFileRequest{
        let obj:IFileRequest = {
            name:this.name,
            ancestors:this.ancestors,
            parent:this.parent
        }
        
        return obj;
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