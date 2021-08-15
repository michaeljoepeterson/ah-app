import { BaseModel } from "../../../models/baseModel";
import { CustomField } from "./custom-field";
import { fieldTypes } from "../constants";

/**
 * model the custom field value
 */
export class CustomFieldValue extends BaseModel{
    value:any = null;
    customFieldId:string = null;
    customField:CustomField = null;

    constructor(data?:any){
        super();
        if(data){
            this.initFieldValue(data);
        }
    }

    initFieldValue(data:any){
        this.init(data);
        if(data.value && this.customField.fieldType === fieldTypes.date){
            this.value = new Date(data.value);
        }
    }
}