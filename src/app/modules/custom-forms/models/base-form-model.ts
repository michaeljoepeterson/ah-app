import { BaseModel } from "../../../models/baseModel";

export class BaseFormModel extends BaseModel{
    sections:any[] = [];
    fields:any[] = [];
    combinedChildren:any[] = [];
    
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

    removeNewItems(){
        this.combinedChildren = this.combinedChildren.filter(child => child.id);
    }

    addSection(section:any){
        this.sections.push(section);
        this.combinedChildren.push(section);
    }

    addField(field:any){
        this.fields.push(field);
        this.combinedChildren.push(field);
    }
}