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
        //init empty field checkbox vals
        if(this.customField?.fieldOptions?.length > 0 && this.customField?.fieldType === fieldTypes.checkbox && !this.value){
            this.initCheckboxValues()
        }
    }
    
    initCheckboxValues(){
        this.value = [];
        this.customField.fieldOptions.forEach(option => this.value.push(false));
    }
}