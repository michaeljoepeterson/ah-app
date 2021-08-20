import { User } from "../../../models/users/user";
import { CustomSection } from "./custom-section";
import { CustomField } from "./custom-field";
import { BaseFormModel } from "./base-form-model";

export class CustomForm extends BaseFormModel{
    name:string = null;
    owner:User = null;
    id:string = null;
    createdAt:Date = null;
    sections:CustomSection[] = [];
    fields:CustomField[] = [];
    combinedChildren:(CustomSection|CustomField)[] = [];

    constructor(data?:any){
        super();
        if(data){
            this.initForm(data);
        }
    }

    initForm(data:any){
        this.init(data);
        if(data.createdAt){
            this.createdAt = new Date(data.createdAt);
        }
        if(data.sections){
            this.sections = data.sections.map(section => new CustomSection(section));
        }
        if(data.owner){
            this.owner = new User(data.owner);
        }
        if(data.fields){
            this.fields = data.fields.map(field => new CustomField(field));
        }
        
        this.combineChildren();
    }
}