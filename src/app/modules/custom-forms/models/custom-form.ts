import { User } from "../../../models/users/user";
import { BaseModel } from "../../../models/baseModel";
import { CustomSection } from "./custom-section";

export class CustomForm extends BaseModel{
    name:string = null;
    owner:User = null;
    id:string = null;
    createdAt:Date = null;
    sections:CustomSection[] = [];

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
    }
}