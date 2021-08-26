import { BaseModel } from "../../../models/baseModel";
import { CustomField } from "./custom-field";
import { fieldTypes } from "../constants";
import { User } from "../../../models/users/user";
import { CustomForm } from "./custom-form";
import { PatientFile } from "../../client-dash/models/patient-file";

export interface IValue{
    stringValue:string;
    numberValue:number;
    arrayValue:any[];
    objectValue:any;
    dateValue:Date;
}

/**
 * model the custom field value
 */
export class CustomFieldValue extends BaseModel{
    value:IValue = {
        stringValue:null,
        numberValue:null,
        arrayValue:[],
        objectValue:null,
        dateValue:null,
    };
    customFieldId:string = null;
    customField:CustomField = null;
    name:string = null;
    id:string = null;
    owner:User = null;
    createdAt:Date = null;
    ancestorSections:string[] = [];
    parentSection:string = null;
    parentForm:CustomForm = null;
    sortOrder:number = 0;
    fieldType:string = null;
    fieldOptions:any[] = null;
    min:string = null;
    max:string = null;
    parentField:CustomField = null;
    parentFile:PatientFile = null;

    constructor(data?:any){
        super();
        if(data){
            this.initFieldValue(data);
        }
    }

    initFieldValue(data:any){
        this.init(data);
        if(data.value && this.customField.fieldType === fieldTypes.date){
            this.value.dateValue = new Date(data.value);
        }
        //init empty field checkbox vals
        if(this.customField?.fieldOptions?.length > 0 && this.customField?.fieldType === fieldTypes.checkbox && !this.value){
            this.initCheckboxValues()
        }
    }
    
    initCheckboxValues(){
        this.value.arrayValue = [];
        this.customField.fieldOptions.forEach(option => this.value.arrayValue.push(false));
    }

    initDate(value?:any){
        this.value.dateValue = !value ? new Date() : new Date(value);
    }
}