import { User } from "../../../models/users/user";
import { BaseModel } from "../../../models/baseModel"
import { CustomField } from "./custom-field";

export class CustomSection extends BaseModel{
    name:string = null;
    id:string = null;
    owner:User = null;
    createdAt:Date = null;
    ancestorSections:string[] = [];
    parentSection:string = null;
    parentForm:string = null;
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

    addNewSection(index:number){
        this.combinedChildren.splice(index,0,new CustomSection());
        
    }

    addNewField(){

    }
}