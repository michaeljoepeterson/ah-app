import { User } from "../../../models/users/user";
import { BaseModel } from "../../../models/baseModel";
import { CustomSection } from "./custom-section";
import { CustomField } from "./custom-field";
import { fieldTypes } from "../constants";

export class CustomForm extends BaseModel{
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
        
        this.combineChildren();
    }

    /**
     * combine fields and sections for rendering and sort by sortorder
     */
    combineChildren(){
        let combinedChildren = [...this.fields,...this.sections];
        combinedChildren = combinedChildren.sort((fieldA, fieldB) => {
            if(fieldA.sortOrder < fieldB.sortOrder){
                return -1;
            }
            else if(fieldA.sortOrder > fieldB.sortOrder){
                return  1;
            }
            else{
                return 0;
            }
        });
        this.combinedChildren = combinedChildren;
    }
}