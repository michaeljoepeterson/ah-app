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
    filePath:string;
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
        filePath:null
    };
    name:string = null;
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
    parentField:string = null;
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
            this.parentField = data.id;
            this.id = null;
        }
        if(data.value && this.fieldType === fieldTypes.date){
            this.value.dateValue = new Date(data.value.dateValue);
        }
        //init empty field checkbox vals
        if(this.fieldOptions?.length > 0 && this.fieldType === fieldTypes.checkbox && !this.value){
            this.initCheckboxValues()
        }
    
    }
    
    initCheckboxValues(){
        this.value.arrayValue = [];
        this.fieldOptions.forEach(option => this.value.arrayValue.push(false));
    }

    initDate(value?:any){
        this.value.dateValue = !value ? new Date() : new Date(value);
    }

    setValue(value:any){
        if(this.fieldType === fieldTypes.date){
            this.value.dateValue = new Date(value);
        }
        else if(this.fieldType === fieldTypes.dropdown || this.fieldType === fieldTypes.text || this.fieldType === fieldTypes.radio){
            this.value.stringValue = value;
        }
        else if(this.fieldType === fieldTypes.checkbox){
            this.value.arrayValue = value;
        }
        else if(this.fieldType === fieldTypes.number){
            this.value.numberValue = value;
        }
        else if(this.fieldType === fieldTypes.file || this.fieldType === fieldTypes.image){
            this.value.filePath = value;
        }
    }

    setArrayValue(val:any,i:number){
        this.value.arrayValue[i] = val;
    }

    serialize(){
        let data = super.serialize();
        data.parentField = this.parentField;
        data.parentForm = this.parentForm?.id;
        data.parentFile = this.parentFile?.id;
        return data;
    }
}