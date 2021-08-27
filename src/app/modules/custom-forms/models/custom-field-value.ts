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
        if(data instanceof CustomField){
            this.parentField = data;
            this.id = null;
        }
        if(data.value && this.parentField.fieldType === fieldTypes.date){
            this.value.dateValue = new Date(data.value);
        }
        //init empty field checkbox vals
        if(this.parentField?.fieldOptions?.length > 0 && this.parentField?.fieldType === fieldTypes.checkbox && !this.value){
            this.initCheckboxValues()
        }
    
    }
    
    initCheckboxValues(){
        this.value.arrayValue = [];
        this.parentField.fieldOptions.forEach(option => this.value.arrayValue.push(false));
    }

    initDate(value?:any){
        this.value.dateValue = !value ? new Date() : new Date(value);
    }

    setValue(value:any){
        if(this.fieldType === fieldTypes.date){
            this.value.dateValue = value;
        }
        else if(this.fieldType === fieldTypes.dropdown || this.fieldType === fieldTypes.text || this.fieldType === fieldTypes.radio){
            this.value.stringValue = value;
        }
        else if(this.fieldType === fieldTypes.checkbox){
            this.value.arrayValue = value;
        }
    }

    setArrayValue(val:any,i:number){
        this.value.arrayValue[i] = val;
    }

    serialize(){
        let data = super.serialize();
        data.parentField = this.parentField?.id;
        data.parentForm = this.parentForm?.id;
        data.parentFile = this.parentFile?.id;
        return data;
    }
}