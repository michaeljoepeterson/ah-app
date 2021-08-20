import { User } from "../../../models/users/user";
import { CustomField } from "./custom-field";
import { BaseFormModel } from "./base-form-model";

export class CustomSection extends BaseFormModel{
    name:string = null;
    id:string = null;
    owner:User = null;
    createdAt:Date = null;
    ancestorSections:string[] = [];
    parentSection:string = null;
    parentForm:any = null;
    sortOrder:number = 0;
    sections:CustomSection[] = [];
    fields:CustomField[] = [];
    type:string = 'section';
    combinedChildren:(CustomSection|CustomField)[] = [];

    constructor(data?:any){
        super();
        if(data){
            this.initSection(data);
        }
    }

    initSection(data:any){
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
        if(data.parentForm){
            this.parentForm = {...data.parentForm};
        }

        this.combineChildren();
    }

    serialize():any{
        let data = super.serialize();
        data.parentForm = this.parentForm?.id;
        return data;
    }

}