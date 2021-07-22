export interface DynamicFormData{
    formTitle?:string;
    fields:DynamicFieldData[];
};

export interface DynamicFieldData{
    label:string;
    type?:string;
    required?:boolean;
    options?:DynamicOptionData[];
    value?:any;
}

export interface DynamicOptionData{
    display:string;
    value:any;
}

export class DynamicFieldResponses{
    value:any;
    constructor(value?:any){
        this.value = value || value === 0 || value === false ? value : null;
    }
}

export const formTypes = {
    dropdown:'dropdown',
    editor:'editor'
};