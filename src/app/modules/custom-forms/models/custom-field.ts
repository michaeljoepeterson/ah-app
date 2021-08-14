import { User } from "../../../models/users/user";
import { BaseModel } from "../../../models/baseModel"

export class CustomField extends BaseModel{
    name:string = null;
    id:string = null;
    owner:User = null;
    createdAt:Date = null;
    ancestorSections:string[] = [];
    parentSection:string = null;
    parentForm:string = null;
    sortOrder:number = 0;
    fieldType:string = null;
    fieldOptions:string[] = null;
    min:string = null;
    max:string = null;
    type:string = 'field';

    constructor(data?:any){
        super();
        if(data){
            this.initField(data);
        }
    }

    initField(data:any){
        this.init(data);
        if(data.createdAt){
            this.createdAt = new Date(data.createdAt);
        }
    }

    updateField(field:CustomField){
        this.init(field);
    }
}